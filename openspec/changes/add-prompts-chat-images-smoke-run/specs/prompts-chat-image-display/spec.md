## ADDED Requirements

### Requirement: Render associated images for prompts.chat prompts
The prompt list and prompt detail views SHALL render associated images for prompts sourced from `https://prompts.chat/` when image metadata is present.

#### Scenario: Image metadata exists for a prompts.chat prompt
- **WHEN** a user views a prompts.chat prompt that has image metadata
- **THEN** the UI displays the image together with existing prompt text and metadata

### Requirement: Preserve usability on image load failure
The UI MUST preserve core prompt readability and interaction if a prompts.chat image is unavailable, fails to load, or returns an error.

#### Scenario: Image request fails
- **WHEN** the UI fails to load a prompts.chat image
- **THEN** the image region falls back gracefully without blocking prompt title, content, or action controls

### Requirement: Do not affect non-prompts.chat rendering
The image rendering behavior SHALL be source-aware and MUST NOT change baseline rendering for prompts that are not sourced from `https://prompts.chat/`.

#### Scenario: Non-prompts.chat prompt is rendered
- **WHEN** a user views a prompt from a different source
- **THEN** the prompt follows existing rendering behavior without new prompts.chat-specific image treatment
