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

# Clean previous dist
rm -rf dist

# Create the final directory structure for GitHub Pages
mkdir -p "dist/BB Web - Research - July 2025/prototype-1"
mkdir -p "dist/BB Web - Research - July 2025/prototype-2"

# Copy main index files if they exist
if [ -f index.html ]; then cp index.html dist/; fi
if [ -f "BB Web - Research - July 2025/index.html" ]; then
    cp "BB Web - Research - July 2025/index.html" "dist/BB Web - Research - July 2025/"
fi

# Copy built prototypes
echo "📋 Copying Prototype 1..."
cp -r "BB Web - Research - July 2025/prototype-1/out/"* "dist/BB Web - Research - July 2025/prototype-1/"

echo "📋 Copying Prototype 2..."
cp -r "BB Web - Research - July 2025/prototype-2/out/"* "dist/BB Web - Research - July 2025/prototype-2/"

echo "✅ Build complete!"
echo "📂 Files ready in dist/ directory"
echo "🌐 Ready for GitHub Pages deployment" 