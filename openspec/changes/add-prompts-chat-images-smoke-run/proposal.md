## Why

The current prompt presentation does not consistently include source images for entries imported from `https://prompts.chat/`, which makes it harder to validate prompt quality and user intent at a glance. We need to confirm feasibility with a focused smoke run before broad rollout.

## What Changes

- Add source-aware handling so prompts from `https://prompts.chat/` always carry an associated image reference when available.
- Update prompt display behavior to render image-first metadata for `prompts.chat` sourced content alongside existing prompt text.
- Add a smoke-run path to verify end-to-end ingestion and rendering for `prompts.chat` prompts with images.
- Define explicit fallback behavior when an expected image is missing or inaccessible.

## Capabilities

### New Capabilities
- `prompts-chat-image-association`: Ensure prompts sourced from `https://prompts.chat/` are stored with image metadata and source linkage.
- `prompts-chat-image-display`: Render associated source images in the prompt listing/detail presentation for `prompts.chat` prompts.
- `prompts-chat-image-smoke-run`: Provide a smoke test flow that validates image ingestion, persistence, and UI rendering for `prompts.chat` samples.

### Modified Capabilities
- None.

## Impact

- Affected code: prompt ingestion/import pipeline, prompt metadata model, and prompt list/detail rendering paths.
- External dependency: availability and stability of image URLs from `https://prompts.chat/`.
- Test impact: add/update smoke-run checks for source-specific prompt ingestion and image rendering.
- Operational impact: slightly higher network/storage usage due to image handling.
