# Performance & Caching Strategy

## Overview
This document describes the performance optimizations and caching strategy for ollyoverend.dev.

## Implemented Optimizations

### 1. Analytics
- **Tool**: Plausible Analytics (privacy-friendly)
- **Script**: Commented in `docs/html/main.html` - uncomment when configured
- **Size**: ~1KB (minimal impact)
- **Privacy**: No cookies, GDPR-compliant

### 2. Resource Loading
- **Preconnect**: Added for Google Fonts to establish early connections
- **DNS Prefetch**: Added for external domains to reduce DNS lookup time
- **Font Display**: Set to `swap` to prevent invisible text during font loading

### 3. Image Optimization
- **Guidelines**: See [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md)
- **CSS**: Added `content-visibility: auto` for lazy loading hints
- **Layout Shift**: Prevented with proper width/height attributes

### 4. Performance Monitoring
- **Script**: `docs/javascripts/performance.js`
- **Metrics Tracked**:
  - Largest Contentful Paint (LCP)
  - First Input Delay (FID)
  - Cumulative Layout Shift (CLS)
  - Time to First Byte (TTFB)
  - Page Load Time
- **Integration**: Automatically sends metrics to Plausible Analytics

## Caching Strategy

### GitHub Pages Limitations
GitHub Pages provides default caching headers:
- Static assets: Cached for 10 minutes
- HTML files: Revalidated on each request

### Recommended Caching (for future CDN)
See `docs/_headers` file for optimal caching configuration:
- **Static assets** (CSS, JS, images, fonts): 1 year with immutable flag
- **HTML files**: No caching, always revalidate

### Future Improvements
Consider migrating to:
- **Cloudflare Pages**: Better caching control + CDN
- **Netlify**: Custom headers support + edge functions
- **Vercel**: Edge caching + serverless functions

## Performance Budgets

### Page Weight Targets
- Initial HTML: < 50KB
- Total CSS: < 100KB
- Total JS: < 150KB
- Total Images: < 500KB per page

### Core Web Vitals Targets
- **LCP**: < 2.5s (Good)
- **FID**: < 100ms (Good)
- **CLS**: < 0.1 (Good)
- **TTFB**: < 600ms (Good)

## Monitoring

### Tools
1. **Plausible Analytics**: Custom events for Web Vitals
2. **Browser DevTools**: Network and Performance tabs
3. **Lighthouse**: Automated performance audits
4. **WebPageTest**: Detailed performance analysis

### Regular Checks
- Run Lighthouse audit monthly
- Monitor Web Vitals in Plausible dashboard
- Check page weight after adding new content

## Quick Wins Checklist
- [x] Add resource hints (preconnect, dns-prefetch)
- [x] Enable font-display: swap
- [x] Add performance monitoring script
- [x] Document image optimization guidelines
- [x] Configure analytics (ready to enable)
- [ ] Optimize existing images to WebP format
- [ ] Add service worker for offline support
- [ ] Consider moving to CDN for better caching
