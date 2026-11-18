# Agents24 Templates

Last Updated: 2026-11-18

Official, UI-independent Agents24 Resource Package templates consumed by Agents24 onboarding and `create-agents24-app`.

Templates are maintained under `templates/<id>/`. Each release has immutable semantic-versioned package bytes. Pull requests validate every package; a successful merge to `main` publishes changed releases to the Agents24 registry.

## Local verification

```bash
pnpm install
pnpm verify
```

Publishing requires `AGENTS24_TEMPLATE_PUBLISH_URL` and `AGENTS24_TEMPLATE_PUBLISHER_TOKEN`. Never place credentials inside a template.

## Release candidates

Deep Research 1.1.0 and Customer Support 1.0.1 preserve their template IDs and resource keys. Both are selected for the next catalog publication after the platform installer update. Existing installations retain their original releases.

Deep Research uses an Orchestrator, bounded self-forking Researchers, and a non-delegating independent Critic. The parent owns follow-up conversation and background lifetime. Users retain inspection, interruption, and cancellation controls. Background work requires an explicit user request and never produces an unsolicited parent response. Root defaults are three child levels, four active slices, and 32 creations, subject to lower organization policy.

Customer Support stays single-agent with delegation disabled and an initially empty knowledge store. Neither template ships credentials or corpus content.

For unpublished platform contracts, run `pnpm dev:agents24 --smoke --verify-templates /absolute/path/to/agents24-templates` from the platform repository. This uses a fresh installed CLI from the coordinated local package train; the repository's older published CLI is not evidence for the new schema. Do not use workspace links or copy built package files.

The verifier pins CLI 0.3.27 and both releases require generator 0.2.33. Both ingestion graphs use `file_source → document_extract → structure chunking → embedding → indexing`. The Agents24 PostgreSQL onboarding test verifies installation and publication of both packages with their declared primary Agents. The registry workflow publishes these versions to the production catalog.
