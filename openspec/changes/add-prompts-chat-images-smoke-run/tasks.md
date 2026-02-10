## 1. Data Model and Ingestion

- [x] 1.1 Extend `Prompt` type definitions to include optional image metadata fields (`imageUrl`, `imageAlt`, `imageSource`).
- [x] 1.2 Update prompt parsing/loading logic to map image metadata fields without breaking existing non-image records.
- [x] 1.3 Implement source normalization for `prompts.chat` URL variants in ingestion.
- [x] 1.4 Add source-gated image association so `prompts.chat` records persist image metadata when available.
- [x] 1.5 Ensure `prompts.chat` records with missing image metadata are ingested successfully with empty optional fields.

## 2. Prompt Display Integration

- [x] 2.1 Update prompt list UI to conditionally render images for `prompts.chat` prompts with image metadata.
- [x] 2.2 Update prompt detail UI to conditionally render images for `prompts.chat` prompts with image metadata.
- [x] 2.3 Add image load error fallback handling to preserve text readability and action controls.
- [x] 2.4 Confirm non-`prompts.chat` prompts continue using baseline rendering behavior.

## 3. Smoke Run Flow

- [x] 3.1 Define a bounded `prompts.chat` sample set (10-30 prompts) for smoke validation.
- [x] 3.2 Implement a smoke-run command/script to validate ingestion, persistence, and UI rendering checkpoints.
- [x] 3.3 Include at least one missing/broken-image case in smoke validation and assert fallback behavior.
- [x] 3.4 Produce smoke-run output with prompt identifiers and failed checkpoint categories.

## 4. Verification and Regression Checks

- [x] 4.1 Add targeted tests or assertions for source normalization and image metadata persistence.
- [x] 4.2 Add UI checks for image-present and image-failure cases in list/detail views.
- [x] 4.3 Run a regression check to confirm prompts without image metadata still render correctly.
- [x] 4.4 Execute the smoke run and record pass/fail evidence for all checkpoints.

## 5. Rollout and Safety Controls

- [x] 5.1 Add a guard/flag path to disable `prompts.chat` image rendering if smoke or production issues are found.
- [x] 5.2 Document rollback steps and operational expectations for upstream image instability.
- [x] 5.3 Prepare implementation notes summarizing known risks, mitigations, and acceptance criteria.
