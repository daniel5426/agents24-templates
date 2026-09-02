import assert from "node:assert/strict";
import { assertSafeTemplate, packTemplate, templates } from "./templates.mjs";

const items = templates();
const active = items.filter((item) => item.metadata.active);
if (!active.length || active.length > 3) throw new Error("The launch catalog supports one to three active templates.");
for (const template of items) {
  assertSafeTemplate(template);
  const result = packTemplate(template);
  const repeated = packTemplate(template);
  assert.equal(result.sha256, repeated.sha256, `${template.metadata.id}: package output must be deterministic`);
  assert.deepEqual(result.archive, repeated.archive, `${template.metadata.id}: package bytes must be deterministic`);
  process.stdout.write(`${template.metadata.id}@${template.metadata.version} ${result.sha256}\n`);
}
