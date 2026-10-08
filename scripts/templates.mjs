import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { lstatSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

export const root = resolve(new URL("..", import.meta.url).pathname);
const templatesRoot = join(root, "templates");

export function templates() {
  return readdirSync(templatesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const directory = join(templatesRoot, entry.name);
      const metadata = JSON.parse(readFileSync(join(directory, "template.yaml"), "utf8"));
      if (metadata.id !== entry.name) throw new Error(`${entry.name}: metadata id must match its directory`);
      if (metadata.package_path !== "agents24") throw new Error(`${entry.name}: package_path must be agents24`);
      if (typeof metadata.active !== "boolean") throw new Error(`${entry.name}: active must be boolean`);
      return { directory, metadata };
    })
    .sort((left, right) => left.metadata.id.localeCompare(right.metadata.id));
}

export function packTemplate(template, { cli } = {}) {
  const temporary = mkdtempSync(join(tmpdir(), "agents24-template-"));
  const output = join(temporary, `${template.metadata.id}.agents24.zip`);
  try {
    const packageDirectory = join(template.directory, template.metadata.package_path);
    const command = cli ? process.execPath : "pnpm";
    const prefix = cli ? [cli] : ["exec", "agents24"];
    execFileSync(command, [...prefix, "package", "validate", packageDirectory, "--json"], { cwd: root, stdio: "pipe" });
    execFileSync(command, [...prefix, "package", "pack", packageDirectory, "--output", output, "--json"], { cwd: root, stdio: "pipe" });
    const archive = readFileSync(output);
    return { archive, sha256: createHash("sha256").update(archive).digest("hex") };
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

export function assertSafeTemplate(template) {
  const text = JSON.stringify(template.metadata);
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(template.metadata.id)) throw new Error(`${template.metadata.id}: invalid template id`);
  if (!/^\d+\.\d+\.\d+$/.test(template.metadata.version)) throw new Error(`${template.metadata.id}: invalid semantic version`);
  if (!/^[0-9a-f]{40}$/.test(template.metadata.source_commit || "0".repeat(40))) {
    throw new Error(`${template.metadata.id}: source_commit must be omitted from source metadata`);
  }
  if (/api[_-]?key|secret[_-]?key|bearer\s+[a-z0-9]/i.test(text)) throw new Error(`${template.metadata.id}: forbidden secret-like metadata`);
  const scan = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (lstatSync(path).isSymbolicLink()) throw new Error(`${template.metadata.id}: symlinks are forbidden`);
      if (entry.isDirectory()) scan(path);
      else {
        const content = readFileSync(path, "utf8");
        if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:api[_-]?key|secret[_-]?key)\s*[:=]\s*["']?[A-Za-z0-9_-]{16,}|bearer\s+[A-Za-z0-9._-]{16,}/i.test(content)) {
          throw new Error(`${template.metadata.id}: forbidden secret-like package content in ${path}`);
        }
        if (/(?:\/Users\/|\/home\/|[A-Z]:\\Users\\)/.test(content)) throw new Error(`${template.metadata.id}: local path leaked in ${path}`);
      }
    }
  };
  scan(template.directory);
}
