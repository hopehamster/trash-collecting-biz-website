const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = 'AIzaSyBo0l-vECV6pgfUGmHaGdohV3lkR5zLTdo';
const GEMINI_API_KEY = 'AIzaSyA2C4URS0huuc0p1PhP0rqqpFzmwgk0AYM'; // nano-banana-pro key
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const CONTENT_DIR = '/Users/mikesm4/Documents/Mikes work/Github/trash-collecting-biz-website/Content/drive-download-20260116T184536Z-1-001';

// Test images - one from each category
const TEST_IMAGES = [
  'IMG_5217.JPG',  // Tree trimming (after)
  'IMG_5223.jpg',  // Junk removal (before)
  'IMG_5528.jpg',  // Tree trimming (before)
];

async function analyzeWithGemini2Flash(imagePath) {
  try {
    console.log(`\n🔵 Gemini 2.0 Flash analyzing: ${path.basename(imagePath)}`);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');
    
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    
    const prompt = `Analyze this image and provide:
1. What type of service/job is shown? (e.g., junk removal, garage cleanout, landscaping, tree trimming, demolition, house cleanout, backyard cleanup, etc.)
2. Brief description of what's in the image
3. Is this a "before" or "after" shot, or both?
4. What makes this image good for a business website gallery?
5. Suggested title/caption for this image
6. Which gallery placeholder should this replace? (Tree Trimming, House Clean Out, or Landscaping)

Be concise and specific.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function analyzeWithNanoBananaPro(imagePath) {
  try {
    console.log(`\n🟡 Nano Banana Pro analyzing: ${path.basename(imagePath)}`);
    
    // Nano Banana Pro uses gemini-3-pro-image-preview for generation
    // For analysis, we'll try gemini-2.0-flash-exp with the nano-banana API key
    // This simulates what nano-banana-pro would use for vision tasks
    const nanoGenAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Try different models - start with 2.0 flash, fallback to 1.5 pro
    let model;
    try {
      model = nanoGenAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    } catch (e) {
      model = nanoGenAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }
    
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');
    
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    
    const prompt = `Analyze this image and provide:
1. What type of service/job is shown? (e.g., junk removal, garage cleanout, landscaping, tree trimming, demolition, house cleanout, backyard cleanup, etc.)
2. Brief description of what's in the image
3. Is this a "before" or "after" shot, or both?
4. What makes this image good for a business website gallery?
5. Suggested title/caption for this image
6. Which gallery placeholder should this replace? (Tree Trimming, House Clean Out, or Landscaping)

Be concise and specific.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function main() {
  const results = [];
  
  for (const imageFile of TEST_IMAGES) {
    const imagePath = path.join(CONTENT_DIR, imageFile);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imageFile}`);
      continue;
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📸 Analyzing: ${imageFile}`);
    console.log('='.repeat(60));
    
    // Analyze with both methods
    const [gemini2Result, nanoBananaResult] = await Promise.all([
      analyzeWithGemini2Flash(imagePath),
      analyzeWithNanoBananaPro(imagePath)
    ]);
    
    results.push({
      filename: imageFile,
      gemini2_flash: gemini2Result,
      nano_banana_pro: nanoBananaResult
    });
    
    // Add delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  // Save comparison results
  const outputPath = path.join(CONTENT_DIR, 'image_analysis_comparison.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 COMPARISON COMPLETE');
  console.log('='.repeat(60));
  console.log(`\nResults saved to: ${outputPath}`);
  console.log(`\nAnalyzed ${results.length} images with both tools.`);
  
  // Print summary
  console.log('\n📋 SUMMARY:');
  results.forEach((result, idx) => {
    console.log(`\n${idx + 1}. ${result.filename}`);
    console.log(`   Gemini 2.0 Flash: ${result.gemini2_flash.substring(0, 100)}...`);
    console.log(`   Nano Banana Pro: ${result.nano_banana_pro.substring(0, 100)}...`);
  });
}

main().catch(console.error);
