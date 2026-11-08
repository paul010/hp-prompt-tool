import { createHash } from 'node:crypto';
import { loadPrompts } from './data-loader';
import {
  FEATURED_DATA_ANALYSIS_PROMPTS, FEATURED_CONTENT_CREATION_PROMPTS,
  FEATURED_LEARNING_GROWTH_PROMPTS, FEATURED_PRESENTATION_PROMPTS,
} from '@/data/curatedPrompts';
import type { Prompt } from './types';

let catalogue: Promise<{ prompts: Prompt[]; version: string }> | undefined;
export function getPromptCatalog() {
  if (!catalogue) {
    catalogue = loadPrompts().then(loaded => {
      const prompts = [
        ...FEATURED_DATA_ANALYSIS_PROMPTS, ...FEATURED_CONTENT_CREATION_PROMPTS,
        ...FEATURED_LEARNING_GROWTH_PROMPTS, ...FEATURED_PRESENTATION_PROMPTS, ...loaded,
      ];
      const version = createHash('sha256').update(JSON.stringify(prompts)).digest('hex').slice(0, 20);
      return { prompts, version };
    }).catch(error => { catalogue = undefined; throw error; });
  }
  return catalogue;
}
