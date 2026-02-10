# Rollback and Ops Notes (prompts.chat images)

## Guard / Toggle

- Runtime switch: `NEXT_PUBLIC_ENABLE_PROMPTS_CHAT_IMAGES`
- Default behavior: enabled (any value except explicit `false`)
- Emergency rollback: set `NEXT_PUBLIC_ENABLE_PROMPTS_CHAT_IMAGES=false` and redeploy.

## Rollback Steps

1. Set `NEXT_PUBLIC_ENABLE_PROMPTS_CHAT_IMAGES=false` in deployment environment.
2. Redeploy application.
3. Verify prompt list/detail views still render text-only cards without image regions.
4. Run smoke command to validate non-image fallback still passes:
   - `cd prompt-tool && npm run smoke:prompts-chat-images`

## Operational Expectations

- Upstream image URLs may be unstable or temporarily unavailable.
- UI is designed to degrade gracefully when image load fails.
- Ingestion keeps optional image fields empty if source image metadata is missing.
- Non-`prompts.chat` prompts are unaffected by image rendering logic.
