# Architecture Documentation

## Overview
ollyoverend.dev is a static website built with MkDocs Material, deployed to GitHub Pages.

## Technology Stack

### Core Framework
- **MkDocs**: Python-based static site generator
- **MkDocs Material**: Premium theme with extensive features
- **Python**: Build tool and dependency management
- **UV**: Fast Python package installer

### Hosting & Deployment
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: CI/CD pipeline (`.github/workflows/ci.yml`)
- **Deployment**: Automatic on push to `main` branch

## Project Structure

```
ollyoverend.dev/
├── docs/                          # Source content
│   ├── blog/                      # Blog posts and configuration
│   │   ├── posts/                 # Individual blog posts
│   │   ├── index.md               # Blog landing page
│   │   └── tags.md                # Tags index
│   ├── assets/                    # Static assets
│   │   └── images/                # Image files
│   ├── html/                      # Custom HTML templates
│   │   ├── main.html              # Base template (all pages)
│   │   └── home.html              # Homepage template
│   ├── javascripts/               # JavaScript files
│   │   └── performance.js         # Web Vitals tracking
│   ├── stylesheets/               # CSS files
│   │   └── extra.css              # Custom styles and theme overrides
│   ├── index.md                   # Homepage content
│   ├── _headers                   # Caching headers configuration
│   ├── IMAGE_OPTIMIZATION.md      # Image optimization guidelines
│   └── PERFORMANCE.md             # Performance documentation
├── .github/                       # GitHub configuration
│   └── workflows/                 # GitHub Actions workflows
│       └── ci.yml                 # Build and deploy workflow
├── mkdocs.yml                     # MkDocs configuration
├── pyproject.toml                 # Python project configuration
├── uv.lock                        # Dependency lock file
├── CLAUDE.md                      # Instructions for Claude Code
├── ARCHITECTURE.md                # This file
└── README.md                      # Project readme

```

## Key Components

### 1. MkDocs Configuration (`mkdocs.yml`)
Central configuration file that defines:
- Site metadata (name, description, author)
- Theme configuration (Material theme with custom features)
- Navigation structure
- Plugins (blog, search, tags)
- Markdown extensions
- Custom CSS/JS includes

### 2. Custom HTML Templates (`docs/html/`)

#### `main.html`
- Extends base MkDocs Material template
- Applied to **all pages**
- Contains:
  - Analytics integration (Plausible, commented)
  - Resource hints (preconnect, dns-prefetch)
  - Performance optimizations

#### `home.html`
- Extends `main.html`
- Applied only to **homepage**
- Features:
  - Hero section with profile image
  - Feature cards
  - Custom styling for landing page

### 3. Styling (`docs/stylesheets/extra.css`)
- Custom color schemes for light/dark modes
- CSS variables for theming
- Responsive design rules
- Performance optimizations:
  - Font-display: swap
  - Image optimization CSS
  - Layout shift prevention

### 4. Performance Monitoring (`docs/javascripts/performance.js`)
Tracks Core Web Vitals:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **TTFB** (Time to First Byte)
- **Page Load Time**

Sends metrics to Plausible Analytics when enabled.

### 5. Blog System
- Powered by MkDocs Material blog plugin
- Posts in `docs/blog/posts/`
- Automatic tag indexing
- Pagination (5 posts per page)
- Archive with date formatting

## Performance & Analytics

### Analytics
- **Provider**: Plausible Analytics (privacy-friendly)
- **Integration**: Script tag in `main.html` (commented, ready to enable)
- **Custom Events**: Web Vitals tracking
- **Privacy**: No cookies, GDPR-compliant

### Performance Optimizations
1. **Resource Hints**: Preconnect and DNS prefetch for external domains
2. **Font Loading**: font-display: swap to prevent FOIT (Flash of Invisible Text)
3. **Image Optimization**: CSS-based lazy loading hints
4. **Monitoring**: Real-time Web Vitals tracking

### Caching Strategy
See `PERFORMANCE.md` for details.
- GitHub Pages provides default 10-minute cache for static assets
- Custom headers in `_headers` file (for future CDN migration)
- HTML files: always revalidate
- Static assets: long-term caching recommended

## Build & Deployment Pipeline

### Local Development
```bash
# Install dependencies
uv sync

# Serve locally with hot reload
mkdocs serve

# Build static site
mkdocs build
```

### CI/CD (GitHub Actions)
Workflow: `.github/workflows/ci.yml`

**Trigger**: Push to `main` branch

**Steps**:
1. Checkout repository
2. Configure Git credentials
3. Setup Python 3.x
4. Cache MkDocs Material dependencies
5. Install MkDocs Material
6. Deploy to GitHub Pages (`mkdocs gh-deploy --force`)

**Output**: Site deployed to `https://oliveroverend.github.io/ollyoverend.dev/`

## Theme Customization

### Color Schemes
Two custom schemes defined in `extra.css`:
- `custom-light`: Light mode with blue accents
- `custom-dark`: Dark mode with adjusted contrast

### Features Enabled
- Navigation tabs (sticky)
- Instant navigation (SPA-like)
- Search with suggestions
- Code copy buttons
- Header autohide
- Footer navigation
- Edit/view action buttons

## Content Management

### Adding Blog Posts
1. Create new `.md` file in `docs/blog/posts/`
2. Add frontmatter with date, title, tags
3. Write content in Markdown
4. Commit and push to `main`
5. GitHub Actions automatically builds and deploys

### Adding Pages
1. Create `.md` file in `docs/`
2. Add to `nav` section in `mkdocs.yml`
3. Commit and push

## Future Enhancements

### Performance
- [ ] Convert existing images to WebP
- [ ] Add service worker for offline support
- [ ] Implement image lazy loading plugin

### Hosting
- [ ] Consider migration to Cloudflare Pages for better caching
- [ ] Enable custom domain
- [ ] Add CDN for global performance

### Features
- [ ] RSS feed for blog
- [ ] Newsletter integration
- [ ] Dark mode toggle persistence
- [ ] Related posts suggestions

## Dependencies

### Core
- `mkdocs-material`: Theme and plugins
- `python`: Build environment
- `uv`: Package management

### Plugins (via MkDocs Material)
- Blog plugin
- Tags plugin
- Search plugin

## Configuration Files

### `mkdocs.yml`
Main configuration - see inline comments for details

### `pyproject.toml`
Python project metadata and dependencies

### `uv.lock`
Locked dependency versions for reproducible builds

## Notes
- Site uses Material for MkDocs theme with extensive customization
- All custom code is in `docs/html/` and `docs/stylesheets/`
- Performance monitoring is privacy-first and lightweight
- GitHub Pages deployment is automatic on `main` branch updates
