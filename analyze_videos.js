const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = 'AIzaSyBo0l-vECV6pgfUGmHaGdohV3lkR5zLTdo';
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const CONTENT_DIR = '/Users/mikesm4/Documents/Mikes work/Github/trash-collecting-biz-website/Content/drive-download-20260116T184536Z-1-001';

async function analyzeVideo(videoPath) {
  try {
    console.log(`\n📹 Analyzing: ${path.basename(videoPath)}`);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Read video file
    const videoData = fs.readFileSync(videoPath);
    const base64Video = videoData.toString('base64');
    
    // Get file extension to determine MIME type
    const ext = path.extname(videoPath).toLowerCase();
    const mimeType = ext === '.mov' ? 'video/quicktime' : 'video/mp4';
    
    const prompt = `Analyze this video and provide:
1. What type of service/job is shown? (e.g., junk removal, garage cleanout, landscaping, tree trimming, demolition, etc.)
2. Brief description of what's happening in the video
3. Is this a "before" or "after" shot, or both?
4. What makes this video good for a business website gallery?
5. Suggested title/caption for this video

Be concise and specific.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Video,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    console.log(`✅ Analysis complete:\n${text}\n`);
    return {
      filename: path.basename(videoPath),
      analysis: text
    };
  } catch (error) {
    console.error(`❌ Error analyzing ${path.basename(videoPath)}:`, error.message);
    return {
      filename: path.basename(videoPath),
      error: error.message
    };
  }
}

async function main() {
  const files = fs.readdirSync(CONTENT_DIR);
  const videoFiles = files.filter(f => f.toLowerCase().endsWith('.mov'));
  
  console.log(`Found ${videoFiles.length} video files\n`);
  
  const results = [];
  
  // Analyze each video (skip duplicates)
  const uniqueVideos = [];
  for (const file of videoFiles) {
    const baseName = file.replace(/\(1\)\.MOV$/, '.MOV');
    if (!uniqueVideos.includes(baseName)) {
      uniqueVideos.push(baseName);
      if (file.endsWith('(1).MOV')) continue; // Skip duplicates
      const fullPath = path.join(CONTENT_DIR, file);
      const result = await analyzeVideo(fullPath);
      results.push(result);
      
      // Add delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Save results
  const outputPath = path.join(CONTENT_DIR, 'video_analysis_results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${outputPath}`);
}

main().catch(console.error);
