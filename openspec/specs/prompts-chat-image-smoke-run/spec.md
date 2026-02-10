## ADDED Requirements

### Requirement: Execute bounded smoke run for prompts.chat image flow
The system SHALL provide a smoke-run procedure over a bounded prompts.chat sample that verifies image metadata ingestion, storage, and UI rendering behavior.

#### Scenario: Smoke run is executed on sample dataset
- **WHEN** a smoke run is started for a defined prompts.chat sample set
- **THEN** the run reports pass/fail results for ingestion, persistence, and UI rendering checkpoints

### Requirement: Validate fallback behavior in smoke run
The smoke run MUST include at least one case where image metadata is missing or an image load fails, and verify fallback behavior remains functional.

#### Scenario: Smoke run includes missing/broken image case
- **WHEN** the smoke run processes a prompt without valid image retrieval
- **THEN** the run marks fallback validation as passed only if prompt content remains available and no blocking UI failure occurs

### Requirement: Produce actionable smoke-run output
The smoke-run output SHALL include failed prompt identifiers and failure stage so issues can be triaged quickly.

#### Scenario: One or more checkpoints fail
- **WHEN** any sample prompt fails ingestion, metadata persistence, or rendering checks
- **THEN** the smoke-run report lists prompt identifiers with the failed checkpoint category
