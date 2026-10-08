import assert from "node:assert/strict";
import { isAbsolute } from "node:path";
import { assertSafeTemplate, packTemplate, templates } from "./templates.mjs";

const items = templates();
const active = items.filter((item) => item.metadata.active);
if (!items.length || active.length > 3) throw new Error("The launch catalog supports at most three active templates.");
const cliIndex = process.argv.indexOf("--cli");
const cli = cliIndex >= 0 ? process.argv[cliIndex + 1] : undefined;
if (cliIndex >= 0 && (!cli || !isAbsolute(cli))) throw new Error("--cli requires an absolute installed CLI entry point.");
for (const template of items) {
  assertSafeTemplate(template);
  const result = packTemplate(template, { cli });
  const repeated = packTemplate(template, { cli });
  assert.equal(result.sha256, repeated.sha256, `${template.metadata.id}: package output must be deterministic`);
  assert.deepEqual(result.archive, repeated.archive, `${template.metadata.id}: package bytes must be deterministic`);
  process.stdout.write(`${template.metadata.id}@${template.metadata.version} ${result.sha256}\n`);
}
