# Agents24 Templates

Last Updated: 2026-10-08

Official, UI-independent Agents24 Resource Package templates consumed by Agents24 onboarding and `create-agents24-app`.

Templates are maintained under `templates/<id>/`. Each release has immutable semantic-versioned package bytes. Pull requests validate every package; a successful merge to `main` publishes changed releases to the Agents24 registry.

## Local verification

```bash
pnpm install
pnpm verify
```

Publishing requires `AGENTS24_TEMPLATE_PUBLISH_URL` and `AGENTS24_TEMPLATE_PUBLISHER_TOKEN`. Never place credentials inside a template.

## Unreleased delegation candidates

Deep Research 1.1.0 and Customer Support 1.0.1 preserve their template IDs and resource keys. They are inactive candidates, not catalog publications or changes to existing installations. Activate only after the coordinated runtime/package release and full local runtime qualification. The generator compatibility floor must be rechecked against the exact release train before publication.

Deep Research uses an Orchestrator, bounded self-forking Researchers, and a non-delegating independent Critic. The parent owns follow-up conversation and background lifetime. Users retain inspection, interruption, and cancellation controls. Background work requires an explicit user request and never produces an unsolicited parent response. Root defaults are three child levels, four active slices, and 32 creations, subject to lower organization policy.

Customer Support stays single-agent with delegation disabled and an initially empty knowledge store. Neither template ships credentials or corpus content.

For unpublished platform contracts, run `pnpm dev:agents24 --smoke --verify-templates /absolute/path/to/agents24-templates` from the platform repository. This uses a fresh installed CLI from the coordinated local package train; the repository's older published CLI is not evidence for the new schema. Do not use workspace links or copy built package files.

2026-09-14 qualification: both candidates compile in the platform backend, deterministic archive verification passes, and all three generated-app install/build/HTTP smokes pass. The new candidates have not yet passed local installation/publication and live multi-agent runtime acceptance. Customer Support archive SHA-256: `2ad7804c57629279244182532f3524942e5f1df7f38cbf1afa10a8e378923ef8`; Deep Research: `8f5a4d78b5aabac5e78826c6d0873aa32cc441a549c505c251b543b52994ebb4`. No catalog publication occurred.

## Coordinated platform train — 2026-10-08

The verifier pins CLI 0.3.27 and candidates require generator 0.2.33. Both template ingestion graphs use `file_source → document_extract → structure chunking → embedding → indexing`; retired loaders and implicit mixed input routing are omitted. Candidates remain inactive until their existing runtime qualification requirements pass.
