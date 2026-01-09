# ollyoverend.dev

Personal website and technical blog built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Tech Stack

- **Static Site Generator:** MkDocs with Material theme
- **Package Manager:** uv
- **Deployment:** GitHub Pages via GitHub Actions

## Local Development

### Prerequisites

- Python 3.14+
- [uv](https://docs.astral.sh/uv/) package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/OliverOverend/ollyoverend.dev.git
cd ollyoverend.dev

# Install dependencies
uv sync

# Start development server
uv run mkdocs serve
```

The site will be available at `http://127.0.0.1:8000/`.

### PowerShell Helpers

```powershell
# Activate virtual environment
./ps1/activate.ps1

# Start development server
./ps1/serve.ps1

# Deploy to GitHub Pages
./ps1/deploy.ps1
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

Manual deployment:

```bash
uv run mkdocs gh-deploy --force
```

## Project Structure

```
ollyoverend.dev/
├── docs/                    # Site content
│   ├── index.md            # Home page
│   ├── about.md            # About page
│   ├── blog/               # Blog posts
│   ├── assets/             # Images and static files
│   ├── html/               # Custom templates
│   └── stylesheets/        # Custom CSS
├── ps1/                    # PowerShell helper scripts
├── mkdocs.yml              # MkDocs configuration
└── pyproject.toml          # Python project metadata
```

## License

Content is copyright Olly Overend. Code is MIT licensed.
