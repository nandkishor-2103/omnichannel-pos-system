# GitHub Workflow Guide

## Project

Omnichannel POS & Inventory Management System

---

# Purpose of This Document

This document defines the complete GitHub workflow, branching strategy, commit rules, and collaboration standards for all team members.

All teammates must strictly follow this workflow to maintain:
- clean commit history
- professional collaboration
- proper version control
- internship evaluation standards

---

# Team Workflow Overview

We follow:

- GitHub Flow
- Feature Branch Workflow
- Pull Request Based Development

No teammate is allowed to push directly into:
- `main`
- `develop`

---

# Main Branches

| Branch | Purpose |
|---|---|
| `main` | Stable production-ready code |
| `develop` | Active development branch |

---

# Feature Branch Naming Convention

Every new feature must be developed in its own branch.

## Branch Format

```txt
feature/<feature-name>
```

---

# Examples

## Authentication

```bash
git checkout -b feature/auth
```

## Product APIs

```bash
git checkout -b feature/products
```

## Inventory Module

```bash
git checkout -b feature/inventory
```

## POS Frontend

```bash
git checkout -b feature/pos-ui
```

## Docker Setup

```bash
git checkout -b feature/docker-setup
```

---

# Important Rules

## NEVER WORK DIRECTLY ON `main`

❌ Wrong

```bash
git checkout main
```

Coding directly on `main`.

---

## ALWAYS CREATE FEATURE BRANCHES

✅ Correct

```bash
git checkout develop

git pull origin develop

git checkout -b feature/auth
```

---

# Daily Development Workflow

Every teammate must follow this workflow daily.

---

# STEP 1 — Switch to develop

```bash
git checkout develop
```

---

# STEP 2 — Pull Latest Code

```bash
git pull origin develop
```

This ensures your local code is updated.

---

# STEP 3 — Create Feature Branch

```bash
git checkout -b feature/<feature-name>
```

Example:

```bash
git checkout -b feature/auth
```

---

# STEP 4 — Start Development

Do your coding work.

Examples:
- APIs
- frontend components
- docker setup
- testing
- schemas

---

# STEP 5 — Check Changed Files

```bash
git status
```

---

# STEP 6 — Add Files

```bash
git add .
```

---

# STEP 7 — Commit Changes

```bash
git commit -m "feat: add login api"
```

---

# Commit Message Rules

We follow Conventional Commits.

---

# Commit Format

```txt
<type>: <short-description>
```

---

# Allowed Commit Types

| Type | Purpose |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting changes |
| `refactor` | Code restructuring |
| `test` | Test related changes |
| `chore` | Setup/config changes |

---

# Commit Examples

## Feature

```bash
git commit -m "feat: add jwt authentication"
```

## Bug Fix

```bash
git commit -m "fix: resolve product validation bug"
```

## Documentation

```bash
git commit -m "docs: add api documentation"
```

## Refactor

```bash
git commit -m "refactor: optimize redis caching logic"
```

## Setup

```bash
git commit -m "chore: setup docker compose"
```

---

# Commit Rules

## Good Commit Messages

✅ Good

```txt
feat: add user schema
```

✅ Good

```txt
fix: resolve login token issue
```

---

## Bad Commit Messages

❌ Bad

```txt
update code
```

❌ Bad

```txt
changes
```

❌ Bad

```txt
fixed bug
```

---

# Recommended Commit Frequency

Every teammate should:
- commit small changes frequently
- avoid huge commits
- commit at least 3–5 times during active work sessions

---

# STEP 8 — Push Branch

```bash
git push -u origin feature/<feature-name>
```

Example:

```bash
git push -u origin feature/auth
```

---

# STEP 9 — Create Pull Request (PR)

Go to GitHub repository.

Click:
- Compare & Pull Request

---

# Pull Request Title Format

```txt
feat: implement authentication module
```

---

# Pull Request Description Template

```md
## Changes
- Added login API
- Added register API
- Added JWT authentication

## Testing
- Tested using Postman
- Login working properly
```

---

# STEP 10 — Team Review

Another teammate must:
- review the code
- suggest improvements
- approve PR

---

# STEP 11 — Merge Into develop

After approval:
- Merge Pull Request

---

# STEP 12 — Delete Feature Branch

After merging:

## Delete Local Branch

```bash
git branch -d feature/<feature-name>
```

## Delete Remote Branch

```bash
git push origin --delete feature/<feature-name>
```

---

# Workflow Example

## Start Work

```bash
git checkout develop

git pull origin develop

git checkout -b feature/products
```

---

## After Coding

```bash
git add .

git commit -m "feat: add product schema"

git push -u origin feature/products
```

---

## Create Pull Request

- Open GitHub
- Create PR
- Add description
- Request review

---

# Merge Strategy

## Feature Branch → develop

All features merge into:
```txt
develop
```

---

## develop → main

Only stable tested code should move into:
```txt
main
```

---

# Branch Protection Rules

The following branches are protected:
- `main`
- `develop`

Rules:
- PR required
- approval required
- no force push
- no direct commits

---

# Rules for All Teammates

## MUST DO

✅ Pull latest code before starting work
✅ Create feature branches
✅ Use meaningful commit messages
✅ Create Pull Requests
✅ Review teammates' PRs
✅ Push code daily

---

## NEVER DO

❌ Push directly to main
❌ Push broken code
❌ Create huge commits
❌ Commit secrets or `.env` files
❌ Ignore merge conflicts

---

# Handling Merge Conflicts

If conflict happens:

## Pull latest develop

```bash
git checkout develop

git pull origin develop
```

---

## Return to Feature Branch

```bash
git checkout feature/<feature-name>
```

---

## Merge develop into feature branch

```bash
git merge develop
```

Resolve conflicts manually.

Then:

```bash
git add .

git commit -m "fix: resolve merge conflicts"
```

---

# Important Security Rules

Never commit:
- `.env`
- API keys
- JWT secrets
- database passwords

These must remain in environment variables.

---

# Repository Structure

```txt
omnichannel-pos-system/
│
├── apps/
│   ├── client/
│   └── server/
│
├── docs/
│   └── github-workflow.md
│
├── docker/
│
├── .github/
│   └── workflows/
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

# Final Notes

This workflow is mandatory for all teammates.

Following this workflow ensures:
- professional repository history
- smooth collaboration
- proper evaluation eligibility
- enterprise-grade development standards
