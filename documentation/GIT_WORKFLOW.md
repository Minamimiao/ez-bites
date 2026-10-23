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

### 3. Continue an existing task (do not create the branch again)

If you already created the feature branch, switch back to it:

```bash
git switch feature/order-api
```

**Use `git switch -c` only for a new branch.** Use `git switch` to resume an existing branch. If the branch has never been pushed, skip `git pull`.

### 4. Continue an Existing Task & Keep Your Feature Branch Updated

Before continuing work, update your local `dev` and merge it into your existing feature branch.

Commit unfinished changes first
```bash
git add .
git commit -m "feat: implement order API"
```
then run:

```bash
git switch dev
git pull --ff-only origin dev
git switch feature/order-api
git merge dev
```
Replace `feature/order-api` with your branch name. Use `git switch -c` only when creating a new branch.
Resolve any conflicts, complete the merge, and test your changes before pushing. 

### 4.2 Handle Merge Conflicts

If the merge succeeds, no extra commit is needed.

If Git reports conflicts:

1. Run `git status` to identify the conflicted files.
2. Open those files, combine the changes correctly, and remove the conflict markers (`<<<<<<<`, `=======`, and `>>>>>>>`).
3. Save the files and complete the merge:

```bash
git add .
git commit -m "merge: resolve conflicts with dev"
```

Ask Jiamiao for help if you are unsure which changes to keep.



### 4.2 Push Your Feature Branch:

After the merge is complete, test the combined changes, then push:

```bash
git push -u origin HEAD
```


Review your changed files before committing. **Never commit passwords, API keys, or `.env` files.**

### 5. Open a Pull Request into `dev`

On GitHub: **Pull requests → New pull request**

- **Base:** `dev`
- **Compare:** your `feature/...` branch

Request a teammate's review. Merge after approval and testing.

### 6. Release tested changes to `main`

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
