#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy the portfolio to GitHub Pages

echo "🚀 Portfolio Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    # Get commit message from user or use default
    if [ -z "$1" ]; then
        echo "💬 Enter commit message (or press Enter for default):"
        read commit_message
        if [ -z "$commit_message" ]; then
            commit_message="Update portfolio website"
        fi
    else
        commit_message="$1"
    fi
    
    # Commit changes
    echo "💾 Committing changes: $commit_message"
    git commit -m "$commit_message"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🌐 No remote origin found."
    echo "Please add your GitHub repository URL:"
    echo "git remote add origin https://github.com/amandii001/portfolio-mihara.git"
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo ""
echo "🌍 To enable GitHub Pages:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/' folder"
echo "5. Click Save"
echo ""
echo "Your site will be available at: https://amandii001.github.io/portfolio-mihara/"
