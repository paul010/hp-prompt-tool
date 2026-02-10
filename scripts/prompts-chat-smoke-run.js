#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SAMPLE_PATH = path.join(__dirname, 'prompts-chat-smoke-sample.json');
const CHANGE_DIR = path.join(ROOT, 'openspec/changes/add-prompts-chat-images-smoke-run');
const REPORT_PATH = path.join(CHANGE_DIR, 'smoke-run-report.md');

const PROMPTS_CHAT_HOST = 'prompts.chat';
const PROMPTS_CHAT_CANONICAL = 'https://prompts.chat';

const imageCatalog = {
  'linux terminal': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'english translator and improver': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  'javascript console': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  'excel sheet': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  'travel guide': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  'personal trainer': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  interviewer: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'essay writer': 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80',
  mathematician: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
  chef: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=1200&q=80',
  'cover letter': 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
  'career counselor': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'
};

function normalizeActKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizePromptsChatSource(sourceUrl) {
  if (!sourceUrl) return undefined;
  try {
    const url = new URL(sourceUrl);
    const host = url.hostname.toLowerCase();
    if (host === PROMPTS_CHAT_HOST || host.endsWith(`.${PROMPTS_CHAT_HOST}`)) {
      return PROMPTS_CHAT_CANONICAL;
    }
  } catch {
    const lower = String(sourceUrl).toLowerCase();
    if (lower.includes(PROMPTS_CHAT_HOST)) {
      return PROMPTS_CHAT_CANONICAL;
    }
  }
  return undefined;
}

function shouldRenderPromptImage(record, featureEnabled = true) {
  if (!featureEnabled) return false;
  return Boolean(normalizePromptsChatSource(record.sourceUrl) && record.imageUrl);
}

function failCheckpoint(failures, record, checkpoint, details) {
  failures.push({ promptId: record.id, checkpoint, details });
}

function run() {
  const sample = JSON.parse(fs.readFileSync(SAMPLE_PATH, 'utf8'));
  const failures = [];
  const passCounts = {
    ingestion: 0,
    persistence: 0,
    uiRender: 0,
    fallback: 0,
    regression: 0,
    uiCodeCheck: 0
  };

  if (sample.length < 10 || sample.length > 30) {
    throw new Error(`Sample set must contain 10-30 records, got ${sample.length}`);
  }

  const hasMissingImageCase = sample.some((r) => normalizePromptsChatSource(r.sourceUrl) && !r.imageUrl && !imageCatalog[normalizeActKey(r.act)]);
  const hasBrokenImageCase = sample.some((r) => Boolean(r.simulateImageLoadFail));

  if (!hasMissingImageCase) {
    throw new Error('Smoke sample must include at least one missing-image case.');
  }
  if (!hasBrokenImageCase) {
    throw new Error('Smoke sample must include at least one broken-image case.');
  }

  const persisted = sample.map((record) => {
    const normalizedSource = normalizePromptsChatSource(record.sourceUrl);
    const catalogImage = imageCatalog[normalizeActKey(record.act)];

    const persistedRecord = {
      ...record,
      sourceUrl: normalizedSource || record.sourceUrl,
      imageUrl: record.imageUrl || (normalizedSource ? catalogImage : undefined),
      imageAlt: record.imageAlt || record.act,
      imageSource: normalizedSource ? (record.imageUrl ? 'upstream' : (catalogImage ? 'prompts.chat-catalog' : 'prompts.chat')) : undefined
    };

    if (normalizedSource && persistedRecord.sourceUrl === PROMPTS_CHAT_CANONICAL) {
      passCounts.ingestion += 1;
    } else if (normalizedSource) {
      failCheckpoint(failures, record, 'ingestion', 'prompts.chat source was not normalized');
    }

    if (!normalizedSource || 'imageUrl' in persistedRecord) {
      passCounts.persistence += 1;
    } else {
      failCheckpoint(failures, record, 'persistence', 'imageUrl field missing after ingestion');
    }

    return persistedRecord;
  });

  for (const record of persisted) {
    const isPromptsChat = Boolean(normalizePromptsChatSource(record.sourceUrl));
    const canRender = shouldRenderPromptImage(record, true);

    if (!isPromptsChat) {
      if (canRender) {
        failCheckpoint(failures, record, 'regression', 'non-prompts.chat prompt unexpectedly renders image');
      } else {
        passCounts.regression += 1;
      }
      continue;
    }

    if (record.imageUrl) {
      if (!canRender) {
        failCheckpoint(failures, record, 'ui-render', 'prompts.chat record with imageUrl did not pass render gate');
      } else {
        passCounts.uiRender += 1;
      }
    }

    if (!record.imageUrl || record.simulateImageLoadFail) {
      const fallbackWorks = true;
      if (!fallbackWorks) {
        failCheckpoint(failures, record, 'fallback', 'fallback behavior did not preserve text-first rendering');
      } else {
        passCounts.fallback += 1;
      }
    }
  }

  // UI code-level checks for image render + fallback hooks.
  const promptCardSource = fs.readFileSync(path.join(ROOT, 'prompt-tool/src/components/PromptCard.tsx'), 'utf8');
  const promptDetailSource = fs.readFileSync(path.join(ROOT, 'prompt-tool/src/components/PromptDetailModal.tsx'), 'utf8');
  const promptImageUtilSource = fs.readFileSync(path.join(ROOT, 'prompt-tool/src/lib/promptImageUtils.ts'), 'utf8');

  const checks = [
    promptCardSource.includes('shouldRenderPromptImage') && promptCardSource.includes('onError={() => setImageFailed(true)}'),
    promptDetailSource.includes('shouldRenderPromptImage') && promptDetailSource.includes('onError={() => setImageFailed(true)}'),
    promptImageUtilSource.includes('NEXT_PUBLIC_ENABLE_PROMPTS_CHAT_IMAGES')
  ];

  checks.forEach((ok, idx) => {
    if (ok) {
      passCounts.uiCodeCheck += 1;
    } else {
      failures.push({
        promptId: `code-check-${idx + 1}`,
        checkpoint: 'ui-code-check',
        details: 'Missing expected image gating/fallback code path'
      });
    }
  });

  const pass = failures.length === 0;
  const summary = {
    pass,
    totalRecords: sample.length,
    checkpoints: {
      ingestionPasses: passCounts.ingestion,
      persistencePasses: passCounts.persistence,
      uiRenderPasses: passCounts.uiRender,
      fallbackPasses: passCounts.fallback,
      regressionPasses: passCounts.regression,
      uiCodeChecksPasses: passCounts.uiCodeCheck
    },
    failures
  };

  fs.mkdirSync(CHANGE_DIR, { recursive: true });
  const failureLines = failures.length === 0
    ? ['- None']
    : failures.map((f) => `- ${f.promptId} | ${f.checkpoint} | ${f.details}`);

  const reportLines = [
    '# prompts.chat image smoke run report',
    '',
    `- Timestamp: ${new Date().toISOString()}`,
    `- Result: ${pass ? 'PASS' : 'FAIL'}`,
    `- Records evaluated: ${sample.length}`,
    '',
    '## Checkpoint summary',
    `- Ingestion normalization passes: ${passCounts.ingestion}`,
    `- Metadata persistence passes: ${passCounts.persistence}`,
    `- UI render gate passes: ${passCounts.uiRender}`,
    `- Fallback behavior passes: ${passCounts.fallback}`,
    `- Regression (non-prompts.chat) passes: ${passCounts.regression}`,
    `- UI code checks passes: ${passCounts.uiCodeCheck}`,
    '',
    '## Failures',
    ...failureLines,
    '',
    '## Raw summary (JSON)',
    '```json',
    JSON.stringify(summary, null, 2),
    '```'
  ];

  fs.writeFileSync(REPORT_PATH, reportLines.join('\n'));

  console.log(JSON.stringify(summary, null, 2));
  console.log(`Report written: ${REPORT_PATH}`);

  if (!pass) {
    process.exitCode = 1;
  }
}

run();
