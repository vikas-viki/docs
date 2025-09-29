# AI Hiring System — Challenges & Detailed Solutions

## 1. How do you handle hallucinations (AI losing context)?
**Problem:** LLMs drift/ invent facts, breaking interview trust.

**Patterns & techniques**
- RAG (Retrieval-Augmented Generation): chunk -> embed -> vector DB -> retrieve top-k -> include in prompt.
- Context caching + summarization: store compact session summaries and use them in prompts.
- Output schema + validation (JSON Schema).
- Verifier pass (lower-temp/deterministic model) to check claims.
- Confidence tagging and evidence references.

**Implementation notes**
- Chunk size: ~500–2000 tokens; overlap 10–20%.
- Retriever k: 3–10.
- Vector DB: FAISS/Milvus/Pinecone.
- Session store: Redis (fast) + Postgres/S3 (durable).

**Pipeline**
1. Embed user turn → query vector DB → top-k chunks.
2. Build prompt: system rules + session summary + chunks + turn.
3. Call LLM (temp=0 for factual outputs).
4. Validate JSON schema; if invalid → retry or fallback.
5. Update summary and persist.

---

## 2. How do you ensure fault tolerance if an error occurs mid-interview?
**Problem:** Worker crashes or network issues mid-session.

**Patterns & techniques**
- Stateless workers + stateful stores (Redis/Postgres/Kafka).
- Checkpointing and snapshots.
- Event-sourcing for full auditability + periodic snapshots for fast restore.
- Idempotency (per-turn UUIDs) and deduplication.
- Circuit breakers, bulkheads, DLQ.
- Graceful shutdown and draining.

**Resume flow**
1. Persist events to append-only log.
2. Snapshot every N events.
3. On failure, spawn worker → apply latest snapshot → replay events after snapshot → resume.
4. Use optimistic locking/versioning.

**Observability**
- Tracing (OpenTelemetry), metrics (Prometheus), logging (ELK).
- Chaos testing (inject failures).

---

## 3. You have 1 API key at max 100 req/sec; how do you handle 1000 concurrent requests?
**Problem:** Provider rate limit vs real incoming demand.

**Patterns & techniques**
- Queue + worker throttling (backpressure).
- Token-bucket/Leaky-bucket distributed rate limiter (Redis-backed).
- Key pooling / multi-account sharding (if allowed by provider).
- Batching & caching responses.
- Local fallbacks: deterministic code or local models for cheap tasks.
- Prioritization (premium vs batch/async interviews).

**Architecture**
- API Gateway -> Priority admission -> Message Queue -> Worker pool -> LLM (throttled).

**Degradation**
- If over capacity: move some sessions to asynchronous/record-only mode or show wait with transparency.

---

## 4. How do you handle evaluation of the interview?
**Problem:** Need consistent, fair, explainable scoring.

**Patterns & techniques**
- Two-stage: automated scoring + human review for borderline/appeal cases.
- Rubric-driven scoring: clearly defined dimensions & weights.
- Ensemble evaluations: multiple models or model + deterministic checks.
- Persist full audit trail (transcript, model versions, prompts, rationale).

**Fairness & calibration**
- Anonymize PII during automatic scoring.
- Periodic calibration sessions with human graders.
- Use human feedback to retrain/tune evaluator models.

**Output**
- Structured JSON: `scores`, `rationale`, `evidence_refs`.
- Persist for audit and appeals.

---

## 5. How do you scale this architecture?
**Problem:** Run thousands of interviews reliably and cost-effectively.

**Patterns & techniques**
- Event-driven microservices + queues.
- Stateless LLM orchestrators; state in Redis/Postgres.
- Worker pools that handle N sessions each.
- Autoscaling based on queue depth / custom metrics.
- Use microVMs/containers with warm pools; spot instances for cost saving.
- Multi-region for latency + DR.

**Components**
- Frontend → API Gateway → Session Manager → Queue → Retriever → LLM Workers → Evaluator → Transcript Store → HR Dashboard → Monitoring

**Scaling rules example**
- If queue_depth > 50 for 60s → +10 workers.
- If avg_latency > threshold → add workers / increase parallelism.
- If queue_depth < 10 for 5m → scale down.

**Security & ops**
- Secrets management, encryption, SLOs, tracing, logging.
- CI/CD with canary/blue-green deployments.

