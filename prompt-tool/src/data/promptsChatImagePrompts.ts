// ============================================================
// prompts.chat 图像生成提示词数据
// ============================================================
//
// 最后更新时间: 2026-08-08T19:27:42.342Z
// 数据来源: https://prompts.chat/?type=image
// 提示词数量: 6
//
// 按模型分类:
//   - Midjourney: 3 条
//   - DALL-E 3: 2 条
//   - Stable Diffusion: 1 条
//
// 注意: 此文件由 scripts/fetch-prompts-chat-images.js 自动生成
//       手动修改可能会被覆盖
//
// ============================================================

import { Prompt } from '@/lib/types';

// 从 prompts.chat 同步的图像生成提示词
export const PROMPTS_CHAT_IMAGE_PROMPTS: Prompt[] = [
  {
    id: "pc-img-aesthetic-sunset",
    name: "Aesthetic Sunset",
    nameZh: "唯美日落",
    description: "为图片添加正确的光照和日落效果，推荐使用 Gemini",
    content: `8K ultra hd aesthetic, romantic, sunset, golden hour light, warm cinematic tones, soft glow, cozy winter mood, natural candid emotion, shallow depth of field, film look, high detail.`,
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
    content: `Transform the subject in the reference image into a LEGO minifigure–style character.

Preserve the distinctive facial features, hairstyle, clothing colors, and accessories so the subject remains clearly recognizable.

The character should be rendered as a classic LEGO minifigure with:
- A cylindrical yellow (or skin-tone LEGO) head
- Simple LEGO facial expression (friendly smile, dot eyes or classic LEGO eyes)
- Blocky hands and arms with LEGO proportions
- Short, rigid LEGO legs

Clothing and accessories should be translated into LEGO-printed torso designs (simple graphics, clean lines, no fabric texture).

Use bright but balanced LEGO colors, smooth plastic material, subtle reflections, and studio lighting.

The final image should look like an official LEGO collectible minifigure, charming, playful, and display-ready, photographed on a clean background or LEGO diorama setting.`,
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
    content: `Act as a Master 3D Character Artist and Photogrammetry Expert. Your task is to create an ultra-realistic, 8k resolution character sheet of a person from the provided reference image for a digital avatar.

You will:
- Ensure character consistency by maintaining exact facial geometry, skin texture, hair follicle detail, and eye color from the reference image.
- Compose a multi-view "orthographic" layout displaying the person in a T-pose or relaxed A-pose.

Views Required:
1. Full-body Front view.
2. Full-body Left Profile.
3. Full-body Right Profile.
4. Full-body Back view.

Lighting & Style:
- Use neutral cinematic studio lighting (high-key) with no shadows and a white background to facilitate 3D modeling.
- Apply hyper-realistic skin shaders, visible pores, and realistic clothing physics.

Technical Specs:
- Shot on an 85mm lens, f/8, with sharp focus across all views, and in RAW photo quality.

Constraints:
- Do not stylize or cartoonize the output. It must be an exact digital twin of the source image.`,
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
    content: `A movie-quality snapshot of a dystopian future. Amidst the wet, debris-strewn streets, a netrunner urgently interacts with neural tech, capturing the tension of high-tech low-life society.

Cinematic lighting with:
- Neon blue and pink rim lights
- Wet street reflections
- Holographic displays in background
- Cybernetic enhancements visible
- Rain and atmospheric fog

Style: Cyberpunk, Blade Runner inspired, ultra-photorealistic, shot on Arri Alexa, shallow depth of field.`,
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
    content: `A cinematic 9:16 vertical video in a Pixar-style tone of a joyful group of cartoonish dogs playing golf on a bright, colorful golf course. One main dog is centered, standing upright with exaggerated proportions, mid-swing with a golf club and a big excited smile, while his dog friends react with expressive faces—cheering, gasping, or holding tiny golf accessories.

Style specifications:
- Smooth, playful character animation with subtle squash-and-stretch
- Warm, vibrant lighting, soft shadows
- Rich saturated colors
- Background slightly blurred with stylized trees and clouds
- Smooth slow zoom in

No text overlay, no humans — focus only on the dogs and their fun, heartwarming golf moment.

Quality: Crisp details, expressive eyes, and a lighthearted Pixar-like charm.`,
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
    content: `Cinematic close-up of a mysterious bartender pouring a glowing green liquid into a glass, heavy smoke rising, dark cocktail bar background, 4k, hyper-realistic, slow motion.

Technical specifications:
- Shot on 85mm lens, f/1.4
- Shallow depth of field
- Dramatic backlighting
- Smoke and atmosphere
- Rich color grading

Style: Luxury cocktail photography, James Bond inspired, moody and sophisticated.`,
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

// 按模型分类的提示词
export const IMAGE_PROMPTS_BY_MODEL: Record<string, Prompt[]> = {
  midjourney: PROMPTS_CHAT_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'midjourney'),
  dalle: PROMPTS_CHAT_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'dalle'),
  'stable-diffusion': PROMPTS_CHAT_IMAGE_PROMPTS.filter(p => p.imagePromptMetadata?.model === 'stable-diffusion')
};
