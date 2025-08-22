@echo off
REM Portfolio Deployment Script for Windows
REM This script helps deploy the portfolio to GitHub Pages

echo 🚀 Portfolio Deployment Script
echo ================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Initializing...
    git init
)

REM Add all files
echo 📁 Adding files to git...
git add .

REM Check if there are changes to commit
git diff --staged --quiet
if %errorlevel% equ 0 (
    echo ✅ No changes to commit
) else (
    REM Get commit message from user or use default
    if "%1"=="" (
        echo 💬 Enter commit message (or press Enter for default):
        set /p commit_message=
        if "%commit_message%"=="" set commit_message=Update portfolio website
    ) else (
        set commit_message=%1
    )
    
    REM Commit changes
    echo 💾 Committing changes: %commit_message%
    git commit -m "%commit_message%"
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo 🌐 No remote origin found.
    echo Please add your GitHub repository URL:
    echo git remote add origin https://github.com/amandii001/portfolio-mihara.git
    pause
    exit /b 1
)

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push origin main

echo ✅ Deployment complete!
echo.
echo 🌍 To enable GitHub Pages:
echo 1. Go to your GitHub repository
echo 2. Navigate to Settings ^> Pages
echo 3. Select 'Deploy from a branch'
echo 4. Choose 'main' branch and '/' folder
echo 5. Click Save
echo.
echo Your site will be available at: https://amandii001.github.io/portfolio-mihara/
pause
