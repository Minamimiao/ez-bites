# EZ-Bites Git Workflow

**Repository:** https://github.com/Minamimiao/ez-bites

## Branch Rules

- **`main`** — Stable, production-ready code. Changes are released here after testing.
- **`dev`** — Shared development branch for integrating and testing features.
- **`feature/<name>`** — Each teammate creates a separate branch from `dev` for their task.
- **Do not push directly to `main` or `dev`. Use Pull Requests (PRs).**

## Steps for Every Teammate

### 1. Clone the repository (first time only)

```bash
git clone -b dev https://github.com/Minamimiao/ez-bites.git
cd ez-bites
```

### 2. Start a feature branch

```bash
git switch dev
git pull origin dev
git switch -c feature/order-api
```

Replace `feature/order-api` with a name describing your task.

### 3. Commit and push your work

```bash
git status
git add .
git commit -m "feat: implement order API"
git push -u origin HEAD
```

Review your changed files before committing. **Never commit passwords, API keys, or `.env` files.**

### 4. Open a Pull Request into `dev`

On GitHub: **Pull requests → New pull request**

- **Base:** `dev`
- **Compare:** your `feature/...` branch

Request a teammate's review. Merge after approval and testing.

### 5. Release tested changes to `main`

When the team agrees that `dev` is stable, open another Pull Request:

- **Base:** `main`
- **Compare:** `dev`

Review and merge to release. **Do not merge every feature to `main` immediately.**

## Before Starting Your Next Task

```bash
git switch dev
git pull origin dev
git switch -c feature/next-task
```

**Workflow:** `dev` → `feature/...` → PR to `dev` → test/review → PR to `main`.
