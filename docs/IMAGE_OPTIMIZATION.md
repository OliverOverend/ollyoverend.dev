# Image Optimization Guidelines

## Best Practices

### 1. Image Format Selection
- **WebP**: Preferred format for modern browsers (20-30% smaller than JPEG/PNG)
- **JPEG**: Use for photographs and complex images
- **PNG**: Use for images requiring transparency
- **SVG**: Use for logos, icons, and simple graphics

### 2. Image Sizing
- Always specify `width` and `height` attributes to prevent layout shift
- Use responsive images with `srcset` for different screen sizes
- Resize images to actual display dimensions before uploading

### 3. Compression
- Use tools like:
  - [Squoosh](https://squoosh.app/) - Web-based image compression
  - [ImageOptim](https://imageoptim.com/) - macOS application
  - [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- Target compression quality: 80-85% for JPEG

### 4. Lazy Loading
- Add `loading="lazy"` attribute to images below the fold
- Example: `<img src="image.jpg" loading="lazy" alt="description">`

### 5. Performance Budgets
- Hero images: < 200KB
- Content images: < 100KB
- Thumbnails: < 50KB

## Example Implementation

```html
<!-- Responsive image with lazy loading -->
<img
  src="image-800w.webp"
  srcset="image-400w.webp 400w, image-800w.webp 800w, image-1200w.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  width="800"
  height="600"
  loading="lazy"
  alt="Descriptive alt text">
```

## Automated Optimization

### Using MkDocs Plugins
Consider adding the `mkdocs-img2fig-plugin` for automatic figure generation.

### CI/CD Integration
Add image optimization to your build pipeline to automatically compress images on commit.
