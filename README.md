# Agents24 Templates

Last Updated: 2026-09-02

Official, UI-independent Agents24 Resource Package templates consumed by Agents24 onboarding and `create-agents24-app`.

Templates are maintained under `templates/<id>/`. Each release has immutable semantic-versioned package bytes. Pull requests validate every package; a successful merge to `main` publishes changed releases to the Agents24 registry.

## Local verification

```bash
pnpm install
pnpm verify
```

Publishing requires `AGENTS24_TEMPLATE_PUBLISH_URL` and `AGENTS24_TEMPLATE_PUBLISHER_TOKEN`. Never place credentials inside a template.
