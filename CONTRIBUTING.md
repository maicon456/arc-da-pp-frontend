# Contributing Guide

Thank you for considering contributing to ArcnetAI! This document provides guidelines for contributions.

## 🚀 How to Contribute

### 1. Fork and Clone

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/your-username/arcnetai.git
cd arcnetai
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature
# or
git checkout -b fix/your-bugfix
```

### 4. Make Your Changes

- Follow existing code patterns
- Add tests when appropriate
- Keep commits small and descriptive
- Use clear commit messages

### 5. Test Your Changes

```bash
pnpm dev
# Test manually in browser
pnpm build
# Verify build works
```

### 6. Commit and Push

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature
```

### 7. Open a Pull Request

- Clearly describe what your PR does
- Reference related issues
- Add screenshots if applicable

## 📝 Code Standards

### TypeScript

- Use TypeScript for all new files
- Avoid `any` - use specific types
- Add types for component props

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use descriptive names

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Maintain visual consistency

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance tasks

## 🐛 Reporting Bugs

1. Check if the bug has already been reported
2. Create an issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment information

## 💡 Suggesting Features

1. Check if the feature has already been suggested
2. Create an issue with:
   - Detailed description
   - Use cases
   - Expected benefits

## ✅ Checklist before Submitting PR

- [ ] Code follows project standards
- [ ] Tests pass (if any)
- [ ] Build works without errors
- [ ] Documentation updated (if needed)
- [ ] Commits follow Conventional Commits
- [ ] PR has clear description

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Wagmi Docs](https://wagmi.sh)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Arc Network Docs](https://docs.arc.network)

Thank you for contributing! 🎉
