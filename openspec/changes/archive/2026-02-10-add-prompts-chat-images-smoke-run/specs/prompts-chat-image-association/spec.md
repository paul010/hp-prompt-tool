## ADDED Requirements

### Requirement: Associate prompts.chat prompts with image metadata
The ingestion pipeline SHALL attach optional image metadata to every imported prompt whose source is `https://prompts.chat/`, including canonical image URL, source attribution, and an optional alt text field.

#### Scenario: prompts.chat prompt with image metadata available
- **WHEN** a prompt record from `https://prompts.chat/` is ingested and image metadata is present
- **THEN** the stored prompt includes image metadata fields and retains source attribution to `https://prompts.chat/`

#### Scenario: prompts.chat prompt with missing image metadata
- **WHEN** a prompt record from `https://prompts.chat/` is ingested and no image metadata is available
- **THEN** the prompt is still stored successfully with empty image metadata fields and source attribution preserved

### Requirement: Normalize prompts.chat source matching
The ingestion pipeline MUST normalize source URL matching so variations of `prompts.chat` URLs are consistently identified as prompts.chat-originated records.

#### Scenario: Source URL contains path and query variations
- **WHEN** an ingested prompt source URL belongs to `prompts.chat` but includes additional path or query parameters
- **THEN** the pipeline classifies the prompt as prompts.chat source and applies image association rules
