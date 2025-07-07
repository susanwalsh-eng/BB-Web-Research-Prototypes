#!/bin/bash

# Build script for local testing
# This script builds both prototypes and organizes them for static deployment

echo "🚀 Building BB Web Research Prototypes for local testing..."

# Build Prototype 1
echo "📦 Building Prototype 1..."
cd "BB Web - Research - July 2025/prototype-1"
npm ci
LOCAL=1 NODE_ENV=production npm run build
cd ../..

# Build Prototype 2
echo "📦 Building Prototype 2..."
cd "BB Web - Research - July 2025/prototype-2"
npm ci
LOCAL=1 NODE_ENV=production npm run build
cd ../..

# Prepare deployment artifact
echo "🚀 Assembling artifact..."

# Clean previous dist
rm -rf dist

# Create the final directory structure for local testing
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

# Merge _next assets from both prototypes to root level
echo "🔗 Merging assets from both prototypes..."
mkdir -p "dist/_next"

# Copy assets from prototype 1
if [ -d "dist/BB Web - Research - July 2025/prototype-1/_next" ]; then
    echo "   📋 Copying Prototype 1 assets..."
    cp -r "dist/BB Web - Research - July 2025/prototype-1/_next/"* "dist/_next/"
fi

# Copy assets from prototype 2 (will merge with prototype 1 assets)
if [ -d "dist/BB Web - Research - July 2025/prototype-2/_next" ]; then
    echo "   📋 Merging Prototype 2 assets..."
    cp -r "dist/BB Web - Research - July 2025/prototype-2/_next/"* "dist/_next/"
fi

echo "✅ Build complete!"
echo "📂 Files ready in dist/ directory"
echo "🌐 Run 'npm run serve' to test locally" 