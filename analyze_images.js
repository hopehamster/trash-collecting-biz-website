const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = 'AIzaSyBo0l-vECV6pgfUGmHaGdohV3lkR5zLTdo';
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const CONTENT_DIR = '/Users/mikesm4/Documents/Mikes work/Github/trash-collecting-biz-website/Content/drive-download-20260116T184536Z-1-001';

async function analyzeImage(imagePath) {
  try {
    console.log(`\n🖼️  Analyzing: ${path.basename(imagePath)}`);
    
    // Use Gemini 2.0 Flash (latest vision model for analysis)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Read image file
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');
    
    // Get file extension to determine MIME type
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.heic') mimeType = 'image/heic';
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
    const text = response.text();
    
    console.log(`✅ Analysis complete:\n${text}\n`);
    return {
      filename: path.basename(imagePath),
      analysis: text
    };
  } catch (error) {
    console.error(`❌ Error analyzing ${path.basename(imagePath)}:`, error.message);
    return {
      filename: path.basename(imagePath),
      error: error.message
    };
  }
}

async function convertHeicToJpg(heicPath) {
  try {
    const jpgPath = heicPath.replace(/\.heic$/i, '.jpg');
    console.log(`Converting ${path.basename(heicPath)} to JPG...`);
    
    // Use macOS sips command to convert HEIC to JPG
    const { execSync } = require('child_process');
    execSync(`sips -s format jpeg "${heicPath}" --out "${jpgPath}"`, { stdio: 'ignore' });
    
    console.log(`✅ Converted to ${path.basename(jpgPath)}`);
    return jpgPath;
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(heicPath)}:`, error.message);
    return null;
  }
}

async function main() {
  const files = fs.readdirSync(CONTENT_DIR);
  
  // Separate images by type
  const heicFiles = files.filter(f => f.toLowerCase().endsWith('.heic') && !f.includes('(1)'));
  const jpgFiles = files.filter(f => f.toLowerCase().match(/\.(jpg|jpeg)$/));
  
  console.log(`Found ${heicFiles.length} HEIC files and ${jpgFiles.length} JPG files\n`);
  
  const results = [];
  
  // First, convert HEIC files to JPG
  const convertedFiles = [];
  for (const heicFile of heicFiles) {
    const fullPath = path.join(CONTENT_DIR, heicFile);
    const jpgPath = await convertHeicToJpg(fullPath);
    if (jpgPath) {
      convertedFiles.push(jpgPath);
    }
  }
  
  // Analyze all images (original JPGs + converted)
  const allImages = [...jpgFiles.map(f => path.join(CONTENT_DIR, f)), ...convertedFiles];
  
  for (const imagePath of allImages) {
    const result = await analyzeImage(imagePath);
    results.push(result);
    
    // Add delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Save results
  const outputPath = path.join(CONTENT_DIR, 'image_analysis_results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${outputPath}`);
  
  // Create summary
  console.log('\n📊 SUMMARY:');
  console.log(`Total images analyzed: ${results.length}`);
  const successful = results.filter(r => r.analysis).length;
  console.log(`Successful analyses: ${successful}`);
  console.log(`Failed: ${results.length - successful}`);
}

main().catch(console.error);
