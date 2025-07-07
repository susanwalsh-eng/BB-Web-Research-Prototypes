#!/bin/bash

# Build script for GitHub Pages deployment
# This script builds both prototypes and organizes them for static deployment

echo "🚀 Building BB Web Research Prototypes for GitHub Pages..."

# Create output directory
mkdir -p dist

# Copy main index.html
cp index.html dist/

# Copy the main research folder structure
cp -r "BB Web - Research - July 2025/index.html" dist/
mkdir -p "dist/BB Web - Research - July 2025"
cp "BB Web - Research - July 2025/index.html" "dist/BB Web - Research - July 2025/"

# Build Prototype 1
echo "📦 Building Prototype 1..."
cd "BB Web - Research - July 2025/prototype-1"
NODE_ENV=production npm run build
cd ../..

# Build Prototype 2
echo "📦 Building Prototype 2..."
cd "BB Web - Research - July 2025/prototype-2"
NODE_ENV=production npm run build
cd ../..

# Copy built prototypes to dist
echo "📋 Copying built prototypes..."
mkdir -p "dist/BB Web - Research - July 2025/prototype-1"
mkdir -p "dist/BB Web - Research - July 2025/prototype-2"

cp -r "BB Web - Research - July 2025/prototype-1/out/"* "dist/BB Web - Research - July 2025/prototype-1/"
cp -r "BB Web - Research - July 2025/prototype-2/out/"* "dist/BB Web - Research - July 2025/prototype-2/"

# Create .nojekyll file for GitHub Pages
touch dist/.nojekyll

echo "✅ Build complete! Files are in the 'dist' directory"
echo "📁 Structure:"
echo "   dist/"
echo "   ├── index.html (main redirect)"
echo "   ├── BB Web - Research - July 2025/"
echo "   │   ├── index.html (prototype selector)"
echo "   │   ├── prototype-1/ (built Next.js app)"
echo "   │   └── prototype-2/ (built Next.js app)"
echo "   └── .nojekyll"
echo ""
echo "🌐 Ready for GitHub Pages deployment!" 