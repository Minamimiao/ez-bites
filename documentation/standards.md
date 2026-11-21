# CSCI 265 Team Standards and Processes

## Team name: 4 Tiny Stars

## Project/product name: EZ Bites

## Key contact person and email

- Jiamiao Zhao, jiamiao.zhao@my.viu.ca *main contact*
- Mira Milat, mira.milat@my.viu.ca
- Chengan Tian, chengan.tian@my.viu.ca
- Brahmi Duklan, brahmi.duklan@my.viu.ca

## Document structure

In this document, we will be addressing three core areas of standards and processes:
 - Documentation standards and processes
 - Coding standards and processes
 - Version control standards and processes

Each section includes a discussion of how those standards/processes will be enforced, and how they will be reviewed for potential updates if/as needed.

## Documentation standards and processes

### 1. File Structure and Location
 
Documentation in draft form will be collaboratively worked on in Markdown format within a Google Doc (located in the shared team Google Drive folder). All team members are welcome and encouraged to contribute to any document. Once documents are finalized (approved by the documentation lead, Mira), they will be submitted to our team project repository.
 
A 'documentation' directory will be maintained at the top level of the team project repository. Within that directory, we will maintain the core project documentation files. This list will be updated as the project progresses:
- 'proposal.md': the preliminary proposal deliverable
- 'charter.md': the team charter deliverable
- 'standards.md': the standards and processes deliverable
- 'update.md': the project update deliverable
- 'requirements.md': the product requirements deliverable
- 'design.md': the product design deliverable

An 'images' subdirectory will be maintained within the documentation directory. All images referenced in the .md files will be located there. 

All document drafts and updates that have been finalized in Google Docs must be saved into the corresponding .md files and submitted via a Pull Request to the dev branch at least **48 hours before** the official project phase deadline to allow sufficient time for final verification and merging.

Pull Requests for documentation must follow the format 'docs: brief description of changes' (for example, 'docs: update section 2 of standards.md'). Each Pull Request must also include a brief summary of the changes in its description.

### 2. General Principles and File Format

Documents must follow the structure and layout provided in the sample documents (on the course website). Any additional sections added as the project progresses must maintain consistent heading and formatting choices for a uniform look and feel. All project documentation must be written in plain text formats (Markdown).

Assets such as diagrams or images must be placed in the 'images' subdirectory with descriptive, lowercase, underscore-separated filenames (for example, 'architecture_diagram.png'). All images must use relative paths (for example, `![alt text](images/filename.png)`).

High standards of spelling, punctuation, and grammar are expected across all documents. All documents must maintain consistent heading depth (H1 for title, H2/H3 for sections) and clean Markdown spacing.

### 3. Spelling and Grammar Checking

Team members will use spelling and grammar checking tools, such as Grammarly or Google Docs. Each member is responsible for proofreading their own work before submitting it for team review in Google Docs. The documentation lead (Mira) will conduct a final proofreading check prior to approving the draft for repository submission.

Technical terminology, naming conventions, and abbreviations will be used consistently across documents, matching the naming conventions used in the codebase and product requirements.

### 4. Document Maintenance and Authorship

Documenting new features is the responsibility of the documentation team (Mira, Brahmi, Chengan), based on the implementation updates and specifications provided by the lead developer (Jiamiao).

When multiple team members write different sections of a document, the team works together in Google Docs to draft, review, and format all parts into a single unified version. All additions or modifications must be reviewed and refined by team members in Google Docs to ensure clarity and content accuracy.

Once the content is finalized and approved by the documentation lead (Mira) in Google Docs, the author is responsible for saving it into the corresponding .md file and submitting a Pull Request to the dev branch.

Since peer review and content approval are completed in Google Docs, the PR serves as the final repository integration step. Mira will perform a final verification of the Markdown syntax and relative image paths within 24 hours, after which Jiamiao will perform the final merge into dev.

Phase 2 will serve as a trial run for our documentation standards and processes. The team will discuss how effectively these standards and processes worked and identify any necessary revisions.

## Coding standards and processes

### 1. General Principles

**Readability and Simplicity:** Write clean and clear code. Use self-explanatory variable and function names so other team members can easily read and understand your logic. Keep functions small and focused on a single task.

**Strict Architecture Boundaries:** The React frontend must never connect directly to the PostgreSQL database. All database reads and writes must go through our Node.js / Express backend API.

**Error Handling and Stability:** Both frontend and backend must properly handle potential errors (for example, missing inputs, or database connection issues).

**Controlled Branch Integration:** Direct pushes to the main or dev branches are prohibited. All code changes implemented by the sole developer (Jiamiao) must be submitted via Pull Requests from feature branches and pass automated validation checks and self-review before merging into dev.

### 2. Code Style and Formatting Guidelines

All code submitted for the project must adhere to the following style and formatting standards to ensure readability and maintainability.

**Base Style Guides (Google Style Guides):**
To maintain industry-standard code quality, our codebase follows the **Google Style Guides** as our foundation:
- **HTML & CSS:** Follow the [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html). Use lowercase for all element names, attributes, and CSS selectors. Always use double quotes (") for HTML attribute values and single quotes (') for CSS values. Omit optional closing tags only when permitted by HTML5 standards, and avoid inline CSS styles (style="...") in HTML files.
- **JavaScript:** Follow the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html). Always use 'const' by default, and use 'let' only when a variable needs to be reassigned (never use 'var'). Always end statements with semicolons (;), use single quotes (') for strings, and use strict equality ('===' and '!=='). Use arrow functions for callbacks and functional components in React.
- **SQL (PostgreSQL):** Use 'UPPERCASE' for SQL keywords (for example, SELECT, FROM, WHERE, INSERT INTO) and 'snake_case' for table and column names (for example, user_id, created_at) to ensure clarity in database queries.

**Indentation:** Use consistent 2-space indentation across all HTML, CSS, and JavaScript files. Do not mix tabs and spaces.

**Identifiers:** All names used in the program (variables, functions, parameters, constants) must be meaningful and clearly represent their intended purpose (for example, use 'circleRadius' instead of vague words like 'data').

**Naming Conventions:**
- Variables & Functions: Use 'camelCase' (for example, 'getUserData').
- Constants: Use 'UPPER_SNAKE_CASE' (for example, 'MAX_LIMIT').
- React Components: Use 'PascalCase' (for example, 'UserProfile.jsx').
- Backend Files & Utilities: Use 'camelCase' (for example, 'authController.js').

**Constants:** Avoid hard-coded numbers or strings in code (except for standard 0 or 1 indexes, such as getting the first item of an array like items[0]). Use named constants instead (for example, 'const PI = 3.1415'). JavaScript code must follow this rule directly. Standard UI text and regular HTML/CSS properties do not require constants.

**Comments:**
- Every file and major module/component must begin with a brief comment describing its content.
- Complex algorithms, non-obvious business logic, or edge cases must include brief explanatory comments. Functions containing nested loops must include inline comments explaining the logic.
- Self-explanatory variables and functions with clear, meaningful names do not require redundant inline comments.
- Logical blocks of code must have brief comments explaining their general purpose to ensure long-term maintainability and clarity for the team.

**Automated Linters and Validators:** To reduce individual style variability and eliminate reliance solely on personal habits, all code submitted to the repository must pass syntax validation and static code analysis:
- HTML: Validated for syntactical correctness using W3C's HTML validator standards.
- CSS: Linted for formatting and code quality using Stylelint.
- JavaScript: Linted for bugs, style, and syntax errors using ESLint.

### 3. Sole-Developer Verification & Merge Workflow

- Since Jiamiao is solely responsible for all frontend (React + Vite), backend (Node.js + Express), and database (PostgreSQL) implementation, code PRs do not require peer code review from the documentation team.
- Before merging any code PR into dev, Jiamiao must complete a structured self-review against all style guidelines, verify functionality, and ensure all automated linters/validators pass.

**Submission Deadlines:** All code Pull Requests for a given phase must be completed and merged into dev at least 48 hours before the official project phase deadline to allow sufficient time for team testing and documentation alignment.

**PR Formatting and Submission Rules:** Pull Requests for code changes must follow the format 'feat: brief description of changes' for new features or 'fix: brief description of changes' for bug fixes (for example, 'feat: add user login API endpoint'). Each Pull Request must include a brief summary of the changes in its description to help the documentation team track new features and updates. Pull requests should remain concise (focused on a single feature or bug fix).

**Self-Testing and Pre-checks:** Before merging a Pull Request, Jiamiao must thoroughly test the code locally to ensure it runs without errors and follows all formatting rules. All code pushed to GitHub must pass the required validators and linters (W3C HTML validator, Stylelint for CSS, ESLint for JS) prior to merging.

### 4. Updates and Refinements

Additional adjustments can be made after Phase 2 as the team evaluates how effectively these coding standards and merge processes worked during early implementation.

## Version control standards and processes

**Repository:** https://github.com/Minamimiao/ez-bites

### 1. Repository Structure

```text
ez-bites/
├── frontend/        # React interface and styles
├── backend/         # Express API and database configuration
└── documentation/   # Project guides and team standards
```

| Branch | Purpose |
| --- | --- |
| `feature/<name>` | Individual feature/bug-fix tasks (developer) |
| `docs/<name>` | Documentation updates and Markdown submissions (documentation team) |
| `dev` | Shared integration and staging/testing |
| `main` | Stable version for release or grading |

### 2. Git Workflow

1. **Clone:** Clone the repository and start from the latest dev.
2. **Create a new branch:** Create feature/<name> (for code) or docs/<name> (for documentation) from dev for your task.
3. **Commit and update:** Make and test your changes.
4. **Pull and push:** Fetch/pull the latest changes and merge dev into your working branch (feature/<name> or docs/<name>) before pushing it to GitHub.
5. **Pull request:** Open a PR from your branch into dev. For documentation PRs, Mira verifies Markdown syntax within 24 hours; for code PRs, Jiamiao completes linter checks and self-review. Jiamiao performs all final merges into dev.
6. **Test:** Jiamiao and the team test the deployed application and verify documentation consistency in dev.
7. **Release:** Open a PR from dev into main. After review and testing, Jiamiao merges it for release or grading.

### 3. Steps for Team Members

For detailed commands and steps, please refer to ez-bites/documentation/GIT_WORKFLOW.md

### 4. Responsibilities and Branch Rules

**TEAM MEMBERS SHOULD NEVER DIRECTLY EDIT OR PUSH TO THE MAIN OR DEV BRANCHES. ALWAYS USE PULL REQUESTS.**

- Jiamiao maintains the repository settings, branch protections, and performs final PR merges into dev and main.
- Jiamiao develops all application code on feature/<name> branches and tests changes; documentation team members (Mira, Brahmi, Chengan) submit finalized Markdown documentation via docs/<name> branches.
- Documentation PRs must be approved by the documentation lead (Mira) prior to Jiamiao merging them into dev.
- Jiamiao deletes finished feature and docs branches after merging. Keep main and dev.

### 5. Commit Standards
- No single commit should ever alter more than 200 lines of code.
- Commit titles should clearly and specifically identify the nature of the change made.
- Separate commits should be used to resolve separate issues.
- The commit body should clearly explain the impact of the change from a behavioural aspect (how does the product look/act differently as a result of this commit).

### 6. Standards Enforcement

We enforce these standards through automated linters/validators, documentation peer reviews in Google Docs, Mira's Markdown verification, and Jiamiao's final repository verification.

Before submitting a PR, each member checks their branch name, commit messages, formatting, and files being committed. Members should raise issues when they notice inconsistencies between the product and documentation.

Jiamiao verifies linter results and code standards before merging code PRs, and checks documentation PR formatting alongside Mira's approval before merging into dev. Before release, the team verifies that the deployed frontend, backend, and project documentation are complete and aligned.
