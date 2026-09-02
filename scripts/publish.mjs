import { Blob } from "node:buffer";
import process from "node:process";
import { packTemplate, templates } from "./templates.mjs";

const endpoint = String(process.env.AGENTS24_TEMPLATE_PUBLISH_URL || "").replace(/\/$/, "");
const token = String(process.env.AGENTS24_TEMPLATE_PUBLISHER_TOKEN || "");
const commit = String(process.env.GITHUB_SHA || "");
const runNumber = Number(process.env.GITHUB_RUN_NUMBER || "0");
if (!endpoint || !token || !/^[0-9a-f]{40}$/.test(commit) || !Number.isSafeInteger(runNumber) || runNumber < 1) {
  throw new Error("Publishing environment is incomplete.");
}

const body = new FormData();
const entries = [];
for (const template of templates().filter((item) => item.metadata.active)) {
  const { archive, sha256 } = packTemplate(template);
  entries.push({
    ...template.metadata,
    archive_sha256: sha256,
  });
  body.append("files", new Blob([archive], { type: "application/zip" }), `${template.metadata.id}.agents24.zip`);
}
body.set("metadata", JSON.stringify({ source_commit: commit, source_sequence: runNumber, templates: entries }));
const response = await fetch(`${endpoint}/internal/templates/releases`, {
  method: "POST",
  headers: { "X-Template-Publisher-Token": token },
  body,
});
if (!response.ok) throw new Error(`Catalog publication failed with HTTP ${response.status}`);
process.stdout.write(`${entries.length} official templates published atomically\n`);
