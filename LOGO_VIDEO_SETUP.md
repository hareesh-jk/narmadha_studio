# Logo and Video Setup Guide

## Adding Your Logo

1. Place your logo file in the `public` folder:
   - Recommended formats: PNG (with transparency) or SVG
   - Recommended name: `logo.png` or `logo.svg`
   - Recommended size: At least 200px width, transparent background

2. The logo will automatically appear in:
   - Navigation bar (top left)
   - Footer
   - Admin dashboard sidebar
   - Social media previews (Open Graph)

3. If the logo file is not found, the system will automatically fall back to a camera icon.

## Adding Your Video

1. Place your video file in the `public` folder:
   - Recommended format: MP4 (H.264 codec)
   - Recommended name: `video.mp4`
   - Recommended resolution: 1920x1080 (Full HD)
   - Keep file size reasonable (< 10MB recommended)

2. The video will automatically play as background in:
   - Hero section (homepage)

3. If the video file is not found, the system will automatically fall back to a background image.

## Alternative: Using Custom Image for Hero

If you prefer a custom hero image instead of video:

1. Place your image in `public/hero-bg.jpg`
2. The system will use this image if video is not available
3. Recommended size: 1920x1080px or larger
4. Recommended format: JPG or WebP

## File Structure

```
public/
  ├── logo.png          # Your studio logo
  ├── video.mp4         # Hero background video (optional)
  ├── hero-bg.jpg       # Hero background image (fallback)
  └── favicon.ico       # Browser favicon
```

## Notes

- All files in the `public` folder are served statically
- Use optimized images/videos for better performance
- The logo should work well on both light and dark backgrounds
- Video should be muted and loop for best user experience

