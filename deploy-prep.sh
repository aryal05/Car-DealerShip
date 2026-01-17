#!/bin/bash

echo "🚀 Aryals Dealer - Deployment Preparation"
echo "=========================================="

# Check if required tools are installed
echo ""
echo "📋 Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version) installed"
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm $(npm --version) installed"
else
    echo "❌ npm not found"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    echo "✅ Git $(git --version) installed"
else
    echo "⚠️ Git not found. You'll need Git to deploy to Vercel/Railway"
fi

echo ""
echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd ../backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🏗️ Building frontend for production..."
cd frontend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create a GitHub repository and push your code:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin <your-repo-url>"
echo "   git push -u origin main"
echo ""
echo "2. Deploy backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub repo"
echo "   - Set root directory to 'backend'"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "3. Deploy frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import GitHub repo"
echo "   - Set root directory to 'frontend'"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
