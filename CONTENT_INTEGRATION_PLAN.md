# Content Integration Game Plan

## 📦 Content Inventory

### Videos (.MOV files)
- **5 unique videos** (1 duplicate removed):
  1. `AQP9_XEMJjLWvDRXNvKhCzTzNTjCI26GDHVn-5Ec4RQ87btZAELn7X_xz7bAvBJ9yP5ZuZHKAJl3zIgYAJMBC-cHAbOk0YbBT68Fi9c.MOV` (4.2MB)
  2. `IMG_5420.MOV` (15MB) - **Largest file, likely main content**
  3. `IMG_5422.MOV` (6.1MB)
  4. `IMG_5423.MOV` (9.4MB)

### Images
- **1 JPG** (web-ready): `IMG_5217.JPG`
- **10 HEIC files** (need conversion):
  - IMG_5223.HEIC (duplicate)
  - IMG_5226.HEIC (duplicate)
  - IMG_5229.HEIC (duplicate)
  - IMG_5230.HEIC (duplicate)
  - IMG_5231.HEIC (duplicate)
  - IMG_5528.HEIC (duplicate)
  - IMG_5533.HEIC (duplicate)
  - IMG_5550.HEIC (duplicate)
  - IMG_5553.HEIC

## 🎯 Current Site Placeholders

### Gallery Section (6 items)
**Already filled:**
- ✅ Garage Clean Out (`gallery-garage.png`)
- ✅ Yard Clean Up (`gallery-yard.png`)
- ✅ Room Clean Out (`gallery-room.png`)

**Placeholders to fill:**
- 🔲 Tree Trimming (placeholder)
- 🔲 House Clean Out (placeholder)
- 🔲 Landscaping (placeholder)

### About Section
- 🔲 Video placeholder ready for TikTok content (currently shows "Content Coming Soon")

## 📋 Integration Strategy

### Phase 1: Video Analysis (After Cursor Restart)
**Action Required:** Restart Cursor to load video-analysis-mcp server

Once MCP server is available:
1. Analyze all 4 unique videos to understand content
2. Identify which videos are:
   - TikTok/team action videos (for About section)
   - Project showcase videos (for Gallery)
   - Before/After content
3. Determine best placement for each video

### Phase 2: Image Processing
1. **Convert HEIC → JPG/PNG**
   - Use `sips` (macOS built-in) or ImageMagick
   - Optimize for web (compress, resize if needed)
   - Remove duplicates (files with "(1)" suffix)

2. **Organize by category** (after analysis):
   - Tree trimming images
   - House/garage cleanout images
   - Landscaping images
   - Other service images

### Phase 3: Content Mapping
Based on video/image analysis, map content to:

**Gallery Section:**
- Replace 3 placeholders with real images/videos
- Consider adding video support to gallery items
- Ensure "Before & After" format where applicable

**About Section:**
- Replace video placeholder with best TikTok/team action video
- Update overlay text if needed
- Ensure video plays properly (HTML5 video or embed)

### Phase 4: Implementation
1. **Copy processed files to `images/` directory**
   - Videos: `images/videos/` (if adding video support)
   - Images: `images/gallery-*.jpg` (naming convention)

2. **Update HTML:**
   - Replace gallery placeholders with real images
   - Add video element to About section
   - Update alt text with SEO keywords + location

3. **Optimize for performance:**
   - Compress videos (if needed)
   - Lazy load images
   - Add proper video formats (MP4, WebM for compatibility)

## 🔧 Technical Tasks

### Image Conversion (HEIC → JPG)
```bash
# Using macOS sips (built-in)
for file in Content/drive-download-20260116T184536Z-1-001/*.HEIC; do
  sips -s format jpeg "$file" --out "images/$(basename "$file" .HEIC).jpg"
done
```

### Video Optimization
- Consider converting MOV to MP4 for better web compatibility
- Compress if files are too large (>10MB)
- Extract thumbnail frames for gallery previews

### HTML Updates Needed
1. Gallery section: Replace 3 placeholder divs with `<img>` tags
2. About section: Replace placeholder with `<video>` element
3. Add video controls/styling if needed
4. Update alt text for SEO

## ❓ Questions to Answer (After Video Analysis)

1. **Which video is best for About section?** (TikTok/team action)
2. **What do each image/video show?** (service type, before/after, etc.)
3. **Should we replace existing gallery images** or keep them?
4. **Do videos need to be embedded in gallery** or just About section?
5. **Any specific order/preference** for gallery items?

## 📝 Next Steps

1. ✅ Video-analysis-mcp server configured
2. ⏳ **Restart Cursor** to load MCP server
3. ⏳ Analyze videos using MCP tools
4. ⏳ Convert HEIC images to JPG
5. ⏳ Map content to placeholders
6. ⏳ Update HTML with real content
7. ⏳ Test and optimize

---

**Note:** The video-analysis-mcp server has been added to your MCP config. After restarting Cursor, we can use the `analyze_video_file` tool to properly analyze each video and understand what content we're working with.
