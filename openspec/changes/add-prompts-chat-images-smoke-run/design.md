## Context

The app currently renders prompt text and metadata from multiple sources, with source tracking via `Prompt.source` and `Prompt.sourceUrl` in `prompt-tool/src/lib/types.ts`. There is no explicit, standardized image metadata contract for prompts, and prompt ingestion pipelines are source-agnostic for visual assets.

This change introduces source-specific behavior for prompts imported from `https://prompts.chat/`: include image metadata when available, display images consistently in list/detail views, and validate feasibility via a smoke run before broad adoption.

Constraints:
- Existing prompts without images must continue to render correctly.
- Upstream image links may be missing, unstable, or slow.
- Changes should be additive and backward compatible to avoid breaking existing prompt datasets.

## Goals / Non-Goals

**Goals:**
- Define a stable image metadata model for prompts from `prompts.chat`.
- Ensure UI surfaces images for `prompts.chat` prompts where image metadata exists.
- Provide deterministic fallback behavior when image assets are unavailable.
- Add a smoke-run workflow that verifies ingestion, persistence, and rendering end to end.

**Non-Goals:**
- Re-platforming the entire prompt ingestion system.
- Backfilling images for every historical non-`prompts.chat` source.
- Building a full image moderation/CDN pipeline in this change.

## Decisions

1. Extend prompt data model with optional image fields.
- Decision: Add optional fields such as `imageUrl`, `imageAlt`, and `imageSource` to the prompt shape.
- Rationale: Keeps backward compatibility and avoids forcing all sources to provide images.
- Alternative considered: Separate image table/object keyed by prompt ID. Rejected for now due to additional complexity for a smoke-run-first rollout.

2. Gate image behavior by source attribution.
- Decision: Apply image association/display rule only when `sourceUrl` or source mapping identifies `prompts.chat` origin.
- Rationale: Meets requirement precisely and avoids unintended behavior for other providers.
- Alternative considered: Global "show image if any" rule for all prompts. Rejected because scope is specifically `prompts.chat` and would expand validation surface.

3. Use graceful UI fallback with non-blocking image loading.
- Decision: Render image container only when metadata exists; on load failure, hide image and keep text-first prompt card/detail usable.
- Rationale: Prevents broken layout and protects core browsing flow.
- Alternative considered: Hard fail or placeholder-only for missing images. Rejected because it degrades UX and adds noise for large datasets.

4. Run smoke validation with a bounded sample set.
- Decision: Use a small fixed sample from `prompts.chat` import path (for example 10-30 prompts) and verify three checkpoints: metadata presence, persistence, and UI rendering/fallback.
- Rationale: Fast feasibility signal before scaling to all prompts.
- Alternative considered: Full dataset migration immediately. Rejected due to higher risk and longer feedback cycle.

5. Preserve existing prompt rendering contracts.
- Decision: Keep current components functional for prompts without image metadata; image is additive, not required.
- Rationale: Minimizes regression risk in list/detail components.
- Alternative considered: Make image required for all community prompts. Rejected as incompatible with existing data.

## Risks / Trade-offs

- [Upstream links break or rate-limit] -> Mitigation: use optional metadata, runtime fallback, and retry-safe importer behavior.
- [Image payload slows page rendering] -> Mitigation: lazy-load images, constrain dimensions, and avoid blocking primary content.
- [Inconsistent source attribution prevents rule application] -> Mitigation: normalize source URL matching for `prompts.chat` during ingestion.
- [Schema drift between CSV/imported records and TS types] -> Mitigation: update parsing layer and type definitions together; validate with smoke sample.
- [UI regressions in list/detail cards] -> Mitigation: targeted smoke checks for both image-present and image-missing cases.

## Migration Plan

1. Add optional image fields to prompt type and loader pipeline.
2. Update ingestion logic for `prompts.chat` records to populate image metadata when available.
3. Update prompt list/detail presentation to render images conditionally.
4. Execute smoke run on bounded sample and record pass/fail outcomes.
5. If smoke run passes, proceed to broader rollout; if not, rollback by disabling source-specific image rendering behind a feature toggle or guard.

Rollback strategy:
- Disable `prompts.chat` image rendering path (guard flag/source gate) while keeping base prompt text flow active.
- Keep additive schema fields in place since they are optional and non-breaking.

## Open Questions

- Where is the canonical image URL sourced from for each `prompts.chat` prompt (HTML scrape, API field, or curated mapping)?
- Should images be hot-linked from source or proxied/cached locally for reliability?
- Do we need copyright/attribution text rendering for sourced images in the UI?
- What is the acceptance threshold for smoke run success (e.g., >=95% image-render success excluding broken upstream links)?
