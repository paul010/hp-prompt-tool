/**
 * prompts.chat 图像提示词获取脚本
 *
 * 从 prompts.chat 获取文生图提示词数据，生成本地 TypeScript 数据文件
 *
 * 使用方法:
 *   node scripts/fetch-prompts-chat-images.js
 *
 * 注意: 当前版本为 MVP，使用手动维护的示例数据。
 * 未来可扩展为自动化抓取 prompts.chat 网站。
 */

const fs = require('fs');
const path = require('path');

// 输出路径
const OUTPUT_PATH = path.join(__dirname, '../prompt-tool/src/data/promptsChatImagePrompts.ts');

// 示例图像提示词数据（从 prompts.chat 手动精选）
// 这些示例展示了图像提示词的典型结构和元数据
const SAMPLE_IMAGE_PROMPTS = [
  {
    id: "pc-img-aesthetic-sunset",
    name: "Aesthetic Sunset",
    nameZh: "唯美日落",
    description: "为图片添加正确的光照和日落效果，推荐使用 Gemini",
    content: "8K ultra hd aesthetic, romantic, sunset, golden hour light, warm cinematic tones, soft glow, cozy winter mood, natural candid emotion, shallow depth of field, film look, high detail.",
    scenario: "图像生成",
    tags: ["architecture", "creative", "image-prompt", "文生图"],
    promptType: "image",
    imagePromptMetadata: {
      model: "dalle",
      aspectRatio: "16:9",
      styleKeywords: ["aesthetic", "cinematic", "golden hour"]
    },
    imageUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Aesthetic sunset example output with golden hour lighting",
    sourceUrl: "https://prompts.chat/prompts/aesthetic-sunset",
    source: "prompts.chat",
    recommendedPlatforms: ["dalle", "midjourney"],
    forDevelopers: false,
    difficulty: "入门"
  },
  {
    id: "pc-img-lego-minifigure",
    name: "LEGO Minifigure Character",
    nameZh: "乐高人偶角色",
    description: "将参考图中的主体转换为乐高人偶风格的角色，保持可识别特征",
    content: "Transform the subject in the reference image into a LEGO minifigure–style character.\n\nPreserve the distinctive facial features, hairstyle, clothing colors, and accessories so the subject remains clearly recognizable.\n\nThe character should be rendered as a classic LEGO minifigure with:\n- A cylindrical yellow (or skin-tone LEGO) head\n- Simple LEGO facial expression (friendly smile, dot eyes or classic LEGO eyes)\n- Blocky hands and arms with LEGO proportions\n- Short, rigid LEGO legs\n\nClothing and accessories should be translated into LEGO-printed torso designs (simple graphics, clean lines, no fabric texture).\n\nUse bright but balanced LEGO colors, smooth plastic material, subtle reflections, and studio lighting.\n\nThe final image should look like an official LEGO collectible minifigure, charming, playful, and display-ready, photographed on a clean background or LEGO diorama setting.",
    scenario: "图像生成",
    tags: ["Art", "Character Development", "Games", "3D", "figurine", "文生图"],
    promptType: "image",
    imagePromptMetadata: {
      model: "midjourney",
      aspectRatio: "1:1",
      styleKeywords: ["LEGO", "minifigure", "3D render", "toy photography"]
    },
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "LEGO minifigure character transformation example",
    sourceUrl: "https://prompts.chat/prompts/lego-minifigure-character",
    source: "prompts.chat",
    recommendedPlatforms: ["midjourney", "stable-diffusion"],
    forDevelopers: false,
    difficulty: "进阶"
  },
  {
    id: "pc-img-3d-avatar",
    name: "Ultra-Realistic 3D Avatar",
    nameZh: "超写实3D头像",
    description: "创建超写实的8K分辨率角色表，用于数字头像",
    content: "Act as a Master 3D Character Artist and Photogrammetry Expert. Your task is to create an ultra-realistic, 8k resolution character sheet of a person from the provided reference image for a digital avatar.\n\nYou will:\n- Ensure character consistency by maintaining exact facial geometry, skin texture, hair follicle detail, and eye color from the reference image.\n- Compose a multi-view \"orthographic\" layout displaying the person in a T-pose or relaxed A-pose.\n\nViews Required:\n1. Full-body Front view.\n2. Full-body Left Profile.\n3. Full-body Right Profile.\n4. Full-body Back view.\n\nLighting & Style:\n- Use neutral cinematic studio lighting (high-key) with no shadows and a white background to facilitate 3D modeling.\n- Apply hyper-realistic skin shaders, visible pores, and realistic clothing physics.\n\nTechnical Specs:\n- Shot on an 85mm lens, f/8, with sharp focus across all views, and in RAW photo quality.\n\nConstraints:\n- Do not stylize or cartoonize the output. It must be an exact digital twin of the source image.",
    scenario: "图像生成",
    tags: ["Character Development", "Art", "3D", "avatar", "photorealistic", "文生图"],
    promptType: "image",
    imagePromptMetadata: {
      model: "stable-diffusion",
      aspectRatio: "2:3",
      styleKeywords: ["3D", "photorealistic", "character sheet", "studio lighting"]
    },
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ultra-realistic 3D character avatar example",
    sourceUrl: "https://prompts.chat/prompts/ultra-realistic-3d-avatar",
    source: "prompts.chat",
    recommendedPlatforms: ["stable-diffusion", "midjourney"],
    forDevelopers: true,
    difficulty: "专家"
  },
  {
    id: "pc-img-cyberpunk-portrait",
    name: "Cyberpunk Portrait",
    nameZh: "赛博朋克肖像",
    description: "创建赛博朋克风格的肖像，强调霓虹灯光和高科技低生活氛围",
    content: "A movie-quality snapshot of a dystopian future. Amidst the wet, debris-strewn streets, a netrunner urgently interacts with neural tech, capturing the tension of high-tech low-life society.\n\nCinematic lighting with:\n- Neon blue and pink rim lights\n- Wet street reflections\n- Holographic displays in background\n- Cybernetic enhancements visible\n- Rain and atmospheric fog\n\nStyle: Cyberpunk, Blade Runner inspired, ultra-photorealistic, shot on Arri Alexa, shallow depth of field.",
    scenario: "图像生成",
    tags: ["Sci-Fi", "Cyberpunk", "Portrait", "cinematic", "文生图"],
    promptType: "image",
    imagePromptMetadata: {
      model: "midjourney",
      aspectRatio: "16:9",
      styleKeywords: ["cyberpunk", "neon", "cinematic", "dystopian"]
    },
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cyberpunk portrait with neon lights example",
    sourceUrl: "https://prompts.chat/prompts/cyberpunk-portrait",
    source: "prompts.chat",
    recommendedPlatforms: ["midjourney", "stable-diffusion"],
    forDevelopers: false,
    difficulty: "进阶"
  },
  {
    id: "pc-img-pixar-style",
    name: "Pixar Style Character",
    nameZh: "皮克斯风格角色",
    description: "创建皮克斯动画风格的3D角色，色彩丰富、表情生动",
    content: "A cinematic 9:16 vertical video in a Pixar-style tone of a joyful group of cartoonish dogs playing golf on a bright, colorful golf course. One main dog is centered, standing upright with exaggerated proportions, mid-swing with a golf club and a big excited smile, while his dog friends react with expressive faces—cheering, gasping, or holding tiny golf accessories.\n\nStyle specifications:\n- Smooth, playful character animation with subtle squash-and-stretch\n- Warm, vibrant lighting, soft shadows\n- Rich saturated colors\n- Background slightly blurred with stylized trees and clouds\n- Smooth slow zoom in\n\nNo text overlay, no humans — focus only on the dogs and their fun, heartwarming golf moment.\n\nQuality: Crisp details, expressive eyes, and a lighthearted Pixar-like charm.",
    scenario: "图像生成",
    tags: ["Animation", "Pixar", "3D", "character", "cute", "文生图"],
    promptType: "image",
    imagePromptMetadata: {
      model: "dalle",
      aspectRatio: "9:16",
      styleKeywords: ["Pixar", "3D animation", "cute", "colorful"]
    },
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pixar style cute dog character example",
    sourceUrl: "https://prompts.chat/prompts/pixar-style-character",
    source: "prompts.chat",
    recommendedPlatforms: ["dalle", "midjourney"],
    forDevelopers: false,
    difficulty: "入门"
  },
  {
    id: "pc-img-cocktail-photo",
    name: "Cinematic Cocktail Photography",
    nameZh: "电影感鸡尾酒摄影",
    description: "创建具有电影感的鸡尾酒摄影作品，强调光影和氛围",
    content: "Cinematic close-up of a mysterious bartender pouring a glowing green liquid into a glass, heavy smoke rising, dark cocktail bar background, 4k, hyper-realistic, slow motion.\n\nTechnical specifications:\n- Shot on 85mm lens, f/1.4\n- Shallow depth of field\n- Dramatic backlighting\n- Smoke and atmosphere\n- Rich color grading\n\nStyle: Luxury cocktail photography, James Bond inspired, moody and sophisticated.",
    scenario: "图像生成",
    tags: ["Photography", "Food", "cocktail", "cinematic", "文生图"],
    promptType: "image",
    imagePromptMetadata: {
      model: "midjourney",
      aspectRatio: "16:9",
      styleKeywords: ["cinematic", "photography", "cocktail", "moody"]
    },
    imageUrl: "https://images.unsplash.com/photo-1572116469696-958721b7d6ca?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cinematic cocktail photography example",
    sourceUrl: "https://prompts.chat/prompts/cinematic-cocktail",
    source: "prompts.chat",
    recommendedPlatforms: ["midjourney", "dalle"],
    forDevelopers: false,
    difficulty: "进阶"
  }
];

/**
 * 生成 TypeScript 数据文件
 */
function generateTypeScriptFile(prompts) {
  const timestamp = new Date().toISOString();
  const promptCount = prompts.length;

  // 按模型分类
  const byModel = {
    midjourney: prompts.filter(p => p.imagePromptMetadata?.model === 'midjourney').length,
    dalle: prompts.filter(p => p.imagePromptMetadata?.model === 'dalle').length,
    'stable-diffusion': prompts.filter(p => p.imagePromptMetadata?.model === 'stable-diffusion').length
  };

  return `// ============================================================
// prompts.chat 图像生成提示词数据
// ============================================================
//
// 最后更新时间: ${timestamp}
// 数据来源: https://prompts.chat/?type=image
// 提示词数量: ${promptCount}
//
// 按模型分类:
//   - Midjourney: ${byModel.midjourney} 条
//   - DALL-E 3: ${byModel.dalle} 条
//   - Stable Diffusion: ${byModel['stable-diffusion']} 条
//
// 注意: 此文件由 scripts/fetch-prompts-chat-images.js 自动生成
//       手动修改可能会被覆盖
//
// ============================================================

import { Prompt } from '@/lib/types';

// 从 prompts.chat 同步的图像生成提示词
export const PROMPTS_CHAT_IMAGE_PROMPTS: Prompt[] = [
${prompts.map(p => generatePromptEntry(p)).join(',\n')}
];

// 按模型分类的提示词
export const IMAGE_PROMPTS_BY_MODEL: Record<string, Prompt[]> = {
  midjourney: PROMPTS_CHAT_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'midjourney'),
  dalle: PROMPTS_CHAT_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'dalle'),
  'stable-diffusion': PROMPTS_CHAT_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'stable-diffusion')
};
`;
}

/**
 * 生成单个提示词的 TypeScript 条目
 */
function generatePromptEntry(prompt) {
  return `  {
    id: "${prompt.id}",
    name: "${prompt.name}",
    nameZh: "${prompt.nameZh}",
    description: "${escapeString(prompt.description)}",
    content: \`${prompt.content.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`,
    scenario: "${prompt.scenario}",
    tags: [${prompt.tags.map(t => `"${t}"`).join(', ')}],
    promptType: "${prompt.promptType}",
    imagePromptMetadata: ${generateMetadataEntry(prompt.imagePromptMetadata)},
    imageUrl: "${prompt.imageUrl}",
    imageAlt: "${prompt.imageAlt}",
    sourceUrl: "${prompt.sourceUrl}",
    source: "${prompt.source}",
    recommendedPlatforms: [${prompt.recommendedPlatforms.map(p => `"${p}"`).join(', ')}],
    forDevelopers: ${prompt.forDevelopers},
    difficulty: "${prompt.difficulty}"
  }`;
}

/**
 * 生成元数据条目
 */
function generateMetadataEntry(metadata) {
  if (!metadata) return 'undefined';

  const parts = [];
  parts.push(`model: "${metadata.model}"`);

  if (metadata.aspectRatio) {
    parts.push(`aspectRatio: "${metadata.aspectRatio}"`);
  }

  if (metadata.styleKeywords) {
    parts.push(`styleKeywords: [${metadata.styleKeywords.map(k => `"${k}"`).join(', ')}]`);
  }

  return `{\n    ${parts.join(',\n    ')}\n  }`;
}

/**
 * 转义字符串中的特殊字符
 */
function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

/**
 * 主函数
 */
function main() {
  console.log('🔄 Generating prompts.chat image prompts data...');
  console.log(`📊 Total prompts: ${SAMPLE_IMAGE_PROMPTS.length}`);

  // 生成 TypeScript 文件内容
  const tsContent = generateTypeScriptFile(SAMPLE_IMAGE_PROMPTS);

  // 确保目录存在
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 写入文件
  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');

  console.log('✅ Image prompts data generated successfully!');
  console.log(`📁 Output: ${OUTPUT_PATH}`);

  // 显示统计信息
  console.log('\n📈 Statistics:');
  const byModel = {
    midjourney: SAMPLE_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'midjourney').length,
    dalle: SAMPLE_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'dalle').length,
    'stable-diffusion': SAMPLE_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'stable-diffusion').length
  };

  console.log(`   Midjourney: ${byModel.midjourney} prompts`);
  console.log(`   DALL-E 3: ${byModel.dalle} prompts`);
  console.log(`   Stable Diffusion: ${byModel['stable-diffusion']} prompts`);

  console.log('\n📝 Note: This is an MVP version with manually curated sample data.');
  console.log('   Future versions will include automated fetching from prompts.chat.');
}

// 运行主函数
main();
