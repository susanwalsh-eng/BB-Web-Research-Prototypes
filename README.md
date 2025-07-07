# BB Web Research Prototypes - July 2025

A comprehensive business banking dashboard application featuring two prototype iterations for user research and testing.

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (required for Next.js 15)
- Git

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/monzo/BB-Web-Research-Prototypes.git
   cd BB-Web-Research-Prototypes
   ```

2. **Install dependencies for both prototypes:**

   ```bash
   npm run install:all
   ```

3. **Run prototypes locally:**

   ```bash
   # Run Prototype 1 (http://localhost:3000)
   npm run dev:prototype1

   # Run Prototype 2 (http://localhost:3001) - in another terminal
   npm run dev:prototype2
   ```

4. **Access the landing page:**
   - Open `BB Web - Research - July 2025/index.html` in your browser
   - Enter password: `forest2025`

### Alternative: Run Individual Prototypes

```bash
# Prototype 1
cd "BB Web - Research - July 2025/prototype-1"
npm install
npm run dev

# Prototype 2
cd "BB Web - Research - July 2025/prototype-2"
npm install
npm run dev
```

## 🌐 GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages in your repository settings:**

   - Go to Settings → Pages
   - Source: "GitHub Actions"

2. **Push to main branch:**

   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **GitHub Actions will automatically:**
   - Build both prototypes
   - Deploy to GitHub Pages
   - Make your app available at: `https://yourusername.github.io/BB-Web-Research-Prototypes/`

### Manual Deployment

```bash
# Build for GitHub Pages
npm run build

# The built files will be in the 'dist' directory
# Upload the contents of 'dist' to your GitHub Pages or any static hosting
```

## 📁 Project Structure

```
BB-Web-Research-Prototypes/
├── index.html                          # Main redirect page
├── BB Web - Research - July 2025/
│   ├── index.html                      # Prototype selector (password protected)
│   ├── prototype-1/                    # Next.js app - Original dashboard
│   └── prototype-2/                    # Next.js app - Enhanced with Suggested Actions
├── build-for-github-pages.sh           # Build script for deployment
├── .github/workflows/deploy.yml        # GitHub Actions workflow
└── package.json                        # Root package.json with convenience scripts
```

## 🎯 Prototypes Overview

### Prototype 1 - Original Dashboard

- Complete banking dashboard with sidebar navigation
- Payment requests with contextual card interactions
- Scheduled payments and cash flow metrics
- Invoice management and payment tools

### Prototype 2 - Enhanced Features

- "Forest Wines 2" branding
- Suggested Actions component with transport controls
- Horizontal scrolling cards with status indicators
- Improved UI interactions and contextual integration

## 🛠️ Available Scripts

| Script                   | Description                              |
| ------------------------ | ---------------------------------------- |
| `npm run install:all`    | Install dependencies for both prototypes |
| `npm run dev:prototype1` | Start Prototype 1 development server     |
| `npm run dev:prototype2` | Start Prototype 2 development server     |
| `npm run build`          | Build both prototypes for production     |
| `npm run serve`          | Serve built files locally on port 8000   |
| `npm run clean`          | Clean all build artifacts                |

## 🔧 Technical Details

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Deployment**: Static export optimized for GitHub Pages
- **Password**: `forest2025` (configurable in index.html)

## 🚨 Troubleshooting

### Node.js Version Issues

If you see "Node.js version X.X.X is required" errors:

1. **Check your Node.js version:**

   ```bash
   node --version
   ```

2. **Update Node.js to version 18+:**

   - Visit [nodejs.org](https://nodejs.org/)
   - Or use nvm: `nvm install 18 && nvm use 18`

3. **Alternatively, use the GitHub Actions deployment** (which uses Node 18 automatically)

### Local Development Issues

- Make sure ports 3000 and 3001 are available
- Clear browser cache if styles don't load correctly
- Check that all dependencies are installed with `npm run install:all`

## 🔐 Security Note

The prototypes include basic password protection (`forest2025`) for research purposes. This is client-side only and not secure for production use.

## 📄 License

Private repository - Monzo Bank Limited

---

**Live Demo**: https://yourusername.github.io/BB-Web-Research-Prototypes/  
**Last Updated**: January 2025
