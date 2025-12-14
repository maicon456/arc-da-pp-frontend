# Git Repository Setup Guide

This guide will help you prepare the ArcnetAI project for Git version control.

## 📋 Pre-commit Checklist

Before initializing Git, make sure:

- [ ] All sensitive files are in `.gitignore`
- [ ] No `.env.local` or private keys are committed
- [ ] All dependencies are listed in `package.json`
- [ ] README.md is up to date

## 🚀 Initial Setup

### 1. Initialize Git Repository

```bash
cd arc-da-pp-frontend
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "feat: initial commit - ArcnetAI DApp"
```

### 4. Add Remote Repository

```bash
# Replace with your repository URL
git remote add origin https://github.com/your-username/arcnetai.git
```

### 5. Push to Remote

```bash
git branch -M main
git push -u origin main
```

## 📝 Recommended Git Workflow

### Branch Naming Convention

- `main` - Production-ready code
- `develop` - Development branch
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/documentation-update` - Documentation changes

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

**Examples:**
```bash
git commit -m "feat(agents): add agent creation dialog"
git commit -m "fix(marketplace): resolve token purchase error"
git commit -m "docs(readme): update installation instructions"
```

## 🔒 Security Checklist

Before pushing, ensure:

- [ ] No `.env.local` files are committed
- [ ] No private keys in code
- [ ] No hardcoded secrets
- [ ] `.gitignore` includes all sensitive files

## 📦 Files to Review Before First Commit

Check these files don't contain sensitive information:

- `scripts/*.js` - Check for hardcoded private keys
- `*.env*` - Should be in `.gitignore`
- `package.json` - Review scripts for secrets
- Any config files with API keys

## 🎯 Quick Start Commands

```bash
# Initialize and setup
git init
git add .
git commit -m "feat: initial commit"

# Connect to remote (replace URL)
git remote add origin https://github.com/your-username/arcnetai.git
git branch -M main
git push -u origin main
```

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Ready to commit?** Make sure you've reviewed all files and removed any sensitive information!

