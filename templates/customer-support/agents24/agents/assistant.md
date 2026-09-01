---
schema: agents24.agent/v1
name: Customer Support Agent
description: Answers questions using the managed knowledge base when relevant.
model: $models.primary
instructions:
  - ../skills/rag-retrieval.md
tools:
  - kind: rag
    uses: ../rag/knowledge.yaml
---

You are a helpful customer support assistant. Help users clearly, courteously, and efficiently.
