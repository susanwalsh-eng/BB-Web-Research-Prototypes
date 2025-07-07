#!/bin/bash

# Build script for GitHub Pages deployment
# This script builds both prototypes and organizes them for static deployment

echo "🚀 Building BB Web Research Prototypes for GitHub Pages..."

# Build Prototype 1
echo "📦 Building Prototype 1..."
cd "BB Web - Research - July 2025/prototype-1"
npm ci
NODE_ENV=production npm run build
cd ../..

# Build Prototype 2
echo "📦 Building Prototype 2..."
cd "BB Web - Research - July 2025/prototype-2"
npm ci
NODE_ENV=production npm run build
cd ../..

# Prepare deployment artifact
echo "🚀 Assembling artifact..."

# Create the final directory structure for GitHub Pages
mkdir -p "dist/BB Web - Research - July 2025/prototype-1"
mkdir -p "dist/BB Web - Research - July 2025/prototype-2"

# Copy main index files if they exist
if [ -f index.html ]; then cp index.html dist/; fi
if [ -f "BB Web - Research - July 2025/index.html" ]; then cp "BB Web - Research - July 2025/index.html" "dist/BB Web - Research - July 2025/"; fi

# Copy the built output of each prototype into the final directory
echo "📦 Copying built prototypes..."
cp -r "BB Web - Research - July 2025/prototype-1/out/." "dist/BB Web - Research - July 2025/prototype-1/"
cp -r "BB Web - Research - July 2025/prototype-2/out/." "dist/BB Web - Research - July 2025/prototype-2/"

# Prevent GitHub Pages from running Jekyll
touch dist/.nojekyll

echo "✅ Artifact ready!"
echo "📁 Structure:"
echo "   dist/"
echo "   ├── index.html (main redirect)"
echo "   ├── BB Web - Research - July 2025/"
echo "   │   ├── index.html (prototype selector)"
echo "   │   ├── prototype-1/ (built Next.js app)"
echo "   │   └── prototype-2/ (built Next.js app)"
echo "   └── .nojekyll"
echo ""
echo "🌐 Ready for deployment!" 