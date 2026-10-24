# CSCI 265 Team Standards and Processes (Phase 2)

## Team name: 4 Tiny Stars

## Project/product name: EZ Bites

## Key contact person and email

- Jiamiao Zhao, jiamiao.zhao@my.viu.ca *main contact*
- Mira Milat, mira.milat@my.viu.ca
- Chengan Tian, chengan.tian@my.viu.ca
- Brahmi Duklan, brahmi.duklan@my.viu.ca

## Document structure

In this document we will be addressing three core areas of standards and processes:
 - Documentation standards and processes
 - Coding standards and processes
 - Version control standards and processes

Each section includes discussion of how those standards/processes will be enforced, and how they will be reviewed for potential updates if/as needed.

## Documentation standards and processes

### 1. File Structure and Location
 
Documentation in draft form will be collaboratively worked on in a Google Doc. All team members are welcome and encouraged to contribute to any document. Once documents are finalized, they will be submitted to our team project repository.
 
A 'documentation' directory will be maintained at the top level of the team project repository. Within that directory, we will maintain the core project documentation files. This list will be updated as the project progresses:
- 'proposal.md': the preliminary proposal deliverable
- 'charter.md': the team charter deliverable
- 'standards.md': the standards and processes deliverable
- 'update.md': the project update deliverable
- 'requirements.md': the product requirements deliverable


An ‘Images’ subdirectory will be maintained within the documentation directory. All images referenced in the .md files will be located there. 

All document drafts and updates must be submitted via a Pull Request at least **48 hours before** the official project phase deadline to allow sufficient time for peer review and feedback.

### 2. General Principles and File Format
Documents must follow the structure and layout provided in the sample documents. Any additional sections added as the project progresses must maintain consistent heading and formatting choices for a uniform look and feel. All project documentation must be written in plain text formats (Markdown).

All documentation files must be stored in the documentation directory of the project repository. Assets such as diagrams or images must be placed in a dedicated subdirectory with descriptive filenames (for example, 'architecture_diagram.png').

High standards of spelling, punctuation, and grammar are expected across all documents.
### 3. Spelling and Grammar Checking
Team members will use spelling and grammar checking tools, such as Grammarly or Google Docs.
Each member is responsible for proofreading their own work before submitting it for review.
Technical terminology, naming conventions, and abbreviations will be used consistently across documents.


### 4. Document Maintenance and Authorship
Documenting new features is the responsibility of the developer implementing the feature.

When multiple team members write different sections of a document, the team works together to merge and format all parts into a single unified draft. 
All documentation additions or modifications must go through a peer review process via a Pull Request to ensure accuracy and clarity.

During the peer review process reviewers will check for readability, make sure the document is cohesive visually, and check the Markdown formatting. Final documentation checks and polishing will be done by the documentation lead (Mira).

Phase 2 will serve as a trial run for our documentation standards and processes. The team will discuss how effectively these standards and processes worked and identify any necessary revisions.

## Coding standards and processes

### 1. General Principles

**Readability and Simplicity:**
Write clean and clear code. Use self-explanatory variable and function names so other team members can easily read and understand your logic.
Keep functions small and focused on a single task.

**Strict Architecture Boundaries:**
The React frontend must never connect directly to the PostgreSQL database.
All database reads and writes must go through our Node.js / Express backend API.

**Error Handling and Stability:**
Both frontend and backend must properly handle potential errors (for example, missing inputs, or database connection issues).

**Mandatory Peer Reviews:**
No single team member can push or merge code directly to the development branch (dev).
Every piece of code must be submitted by creating a Pull Request and approved by at least one team member before merging.

### 2. Code Style and Formatting Guidelines

All code submitted for the project must adhere to the following style and formatting standards to ensure readability and maintainability.

**Indentation:** Use clear and consistent indentation for all code blocks.

**Identifiers:** All names used in the program (variables, functions, parameters, constants) must be meaningful and clearly represent their intended purpose (for example, use 'circleRadius' instead of vague words like 'data').

**Constants:** Avoid hard-coded numeric or character literals (with the exception of 0, 1, and 2). Replace them with named constants whose scope covers all uses (for example, 'const PI = 3.1415;').

**Comments:**
- Every file and method must begin with a comment describing its content.
- Complex algorithms, non-obvious variable logic, or edge cases must include brief explanatory comments.
 - Self-explanatory variables and functions with clear, meaningful names do not require redundant inline comments.
- Logical blocks of code must have brief comments explaining their general purpose so that peers can easily understand and maintain the code.

### 3. Review and Approval Process
**Lead / Understudy Review:**
- Frontend code (React + Vite hosted on Vercel) must be reviewed by the Frontend Team (Mira and Chengan).
- Backend code (Node.js + Express hosted on Render) must be reviewed by the Backend Team (Jiamiao and Brahmi).
- Database changes (PostgreSQL hosted on Aiven) must be reviewed by the Database Lead (Brahmi).
- Code or revisions made directly by a lead must be reviewed by their designated understudy, and vice-versa.
- The assigned lead or understudy reviews the PR, and Jiamiao performs the final merge.

**Review Window and Deadlines:**
Reviews will be completed within **24 hours** by the assigned lead or understudy. Team members must have their proposed code and pull requests submitted at least **48 hours before any project phase deadline** to allow sufficient time for review, testing, and merging.

**Self-Testing and Pre-checks:**
Before requesting a review or opening a Pull Request, team members must thoroughly test their code locally to ensure it runs without errors and follows all formatting rules.

### 4. Updates and Refinements
Additional adjustments can be made after Phase 2 as the team evaluates how effectively these coding standards and review processes worked during early implementation.

## Version control standards and processes
### EZ-Bites Git Workflow and Standards

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
| `feature/<name>` | Individual development tasks |
| `dev` | Shared integration and staging/testing |
| `main` | Stable version for release or grading |

### 2. Git Workflow

1. **Clone:** Clone the repository and start from the latest `dev`.
2. **Create a new branch:** Create `feature/<name>` from `dev` for your task.
3. **Commit and update:** Make and test your changes.
5. **Pull and push:** Fetch/pull new changes and merge dev into feature branch before pushing your feature branch to GitHub.
4. **Pull request:** Open a PR from your feature branch into `dev`. Jiamiao reviews and merges approved changes.
5. **Test:** The team tests the combined changes in `dev`.
6. **Release:** Open a PR from `dev` into `main`. After review and testing, Jiamiao merges it for release or grading.



### 3. Steps for Team Members

For detailed commands and steps, please refer to Github/documentation/Git_workflow.

### 4. Responsibilities and Branch Rules

**TEAM MEMBERS SHOULD NEVER DIRECTLY EDIT CONTENT IN THE TESTING OR PRODUCTION BRANCHES**
**TEAM MEMBERS SHOULD NEVER DIRECTLY PUSH TO THE MAIN OR DEV BRANCHES**


- **Jiamiao** maintains the repository, documentation, branches, reviews, and merges.
- **All members** develop on their own feature branches, test changes, and update relevant documentation.
- Another team member reviews Jiamiao’s own changes.
- Do not push directly to `main` or `dev`; use pull requests.
- Keep branches focused on one task and use descriptive names.
- Resolve conflicts locally before merging. Ask Jiamiao for help when needed.
- Do not force-push shared branches or overwrite another member’s work.
- Jiamiao deletes finished feature branches after merging. Keep `main` and `dev`.

### 5. Commits standards:
 - no single commit should ever alter more than 200 lines of code
 - commit titles should clearly and specifically identify the nature of the change made
 - separate commits should be used to resolve separate issues
 - the commit body should clearly explain the impact of the change from a behavioural aspect (how does the game look/act differently as a result of this commit?)


### 6. Checking the Standards

We use **team self-policing and Jiamiao’s review**.

Before submitting a PR, each member checks the branch, commit messages, testing, documentation, and files being committed. Members should raise problems when they notice them.

Jiamiao checks these standards during review and requests corrections before merging. Before release, the team checks that the frontend and backend work together.
