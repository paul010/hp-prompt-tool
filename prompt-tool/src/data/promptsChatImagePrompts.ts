// ============================================================
// prompts.chat 图像生成提示词数据
// ============================================================
//
// 最后更新时间: 2026-02-26T23:28:26.665Z
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
    contentZh: `8K 超高清美学风格，浪漫，日落，黄金时刻光照，温暖的电影色调，柔和光晕，舒适的冬日氛围，自然真实的情感，浅景深，电影质感，高细节。`,
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
    contentZh: `将参考图中的主体转换为乐高人偶风格的角色。

保持独特的面部特征、发型、服装颜色和配饰，使主体保持清晰可辨认。

角色应渲染为经典乐高人偶，具有以下特征：
- 圆柱形黄色（或肤色乐高）头部
- 简单的乐高面部表情（友好的微笑、点状眼睛或经典乐高眼睛）
- 乐高比例的块状手和手臂
- 短而僵硬的乐高腿

服装和配饰应转换为乐高印刷的躯干设计（简单图形、干净线条、无织物纹理）。

使用明亮但平衡的乐高颜色、光滑的塑料材质、微妙的反射和摄影棚灯光。

最终图像应看起来像官方乐高收藏人偶，迷人、俏皮、适合展示，在干净的背景或乐高立体模型场景中拍摄。`,
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
    contentZh: `担任首席 3D 角色艺术家和摄影测量专家。您的任务是从提供的参考图像创建一个超写实、8k 分辨率的人物角色表，用于数字头像。

您将：
- 通过保持参考图像中的精确面部几何结构、皮肤纹理、毛囊细节和眼睛颜色来确保角色一致性。
- 构建多视图 \"正交\" 布局，以 T 形姿势或放松的 A 形姿势展示人物。

所需视图：
1. 全身正面视图。
2. 全身左侧视图。
3. 全身右侧视图。
4. 全身背面视图。

灯光与风格：
- 使用中性电影摄影棚灯光（高调），无阴影，白色背景，便于 3D 建模。
- 应用超写实皮肤着色器、可见毛孔和逼真的服装物理效果。

技术规格：
- 使用 85mm 镜头、f/8 光圈拍摄，所有视图清晰对焦，RAW 照片质量。

限制条件：
- 不要风格化或卡通化输出。它必须是源图像的精确数字孪生。`,
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
    contentZh: `电影质量的反乌托邦未来快照。在潮湿、遍布碎片街道上，一名网络黑客紧急与神经技术交互，捕捉高科技低生活社会的紧张感。

电影灯光效果：
- 霓虹蓝色和粉色轮廓光
- 潮湿街道的反射
- 背景中的全息显示屏
- 可见的赛博增强植入物
- 雨水和大气雾效

风格：赛博朋克，灵感来自《银翼杀手》，超写实主义，使用 Arri Alexa 拍摄，浅景深。`,
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
    contentZh: `皮克斯风格的 9:16 竖版视频，一群快乐的卡通狗在明亮多彩的高尔夫球场上打高尔夫。一只主狗居中，直立站姿，比例夸张，正在挥杆，带着兴奋的大大笑容，而它的狗友们用富有表情的脸做出反应——欢呼、惊叹或拿着微小的高尔夫配件。

风格要求：
- 平滑、俏皮的角色动画，带有微妙的挤压和拉伸效果
- 温暖、充满活力的光线，柔和的阴影
- 丰富饱和的色彩
- 背景略微模糊，有风格化的树木和云朵
- 平滑的缓慢推入

无文字叠加，无人类——只关注狗狗们和它们有趣、温馨的高尔夫时刻。

质量：清晰的细节，富有表情的眼睛，轻松愉快的皮克斯式魅力。`,
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
    contentZh: `电影感特写镜头，一位神秘的调酒师将发光的绿色液体倒入杯中，浓重的烟雾升起，黑暗的鸡尾酒酒吧背景，4K，超写实，慢动作。

技术规格：
- 使用 85mm 镜头拍摄，f/1.4 光圈
- 浅景深
- 戏剧性背光
- 烟雾和氛围
- 丰富的色彩调色

风格：奢华鸡尾酒摄影，灵感来自詹姆斯·邦德，情绪化且精致。`,
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
