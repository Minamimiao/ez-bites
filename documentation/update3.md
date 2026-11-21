# CSCI 265 Project Update (Phase 3)

## Team name: 4 Tiny Stars

## Project/product name: EZ Bites

## Contact person and email

- Jiamiao Zhao, jiamiao.zhao@my.viu.ca *main contact*
- Mira Milat, mira.milat@my.viu.ca
- Chengan Tian, chengan.tian@my.viu.ca
- Brahmi Duklan, brahmi.duklan@my.viu.ca

## Key revisions since phase 2

During Phase 3, we substantially revised all core project documents to align with a narrower single-restaurant scope and a restructured team workflow. We transitioned from shared coding responsibilities to specialized roles, assigning development to one member and documentation to the rest of the team, while updating our standards, requirements, and design to establish a clear, testable blueprint for Phase 4 implementation. The specific updates made to each document are detailed in the subsections below.

### Changes to the Team Charter

In Phase 3, our team updated the Team Charter to reflect a clearer project scope, more focused team roles, and an updated review process. First, we updated the Project Intro section to narrow our goal from a multi-restaurant website builder to a simpler online ordering and menu management web app for a single restaurant.

We also updated the Team Roles/Responsibilities and Team Strengths/Weaknesses sections to help us work more efficiently. Instead of using the old Lead and Understudy system, we gave each member a clearer focus based on their strengths. Jiamiao is now the sole full-stack developer in charge of all frontend, backend, and database coding, as well as Git management and project management. Mira continues as the documentation lead, writer, and presenter, while Brahmi and Chengan shifted from coding roles to focus on writing documentation, preparing presentations, and helping with system specifications.

Because of these new roles, we updated our review workflow in the Team Philosophy and Deadlines and Deliverables sections. Instead of everyone reviewing each other's code, the documentation team now peer-reviews drafts in Google Docs with a final check by Mira, while Jiamiao checks code quality using automated linters and structured self-review.

### Additional Notes on Team Collaboration

* **Code Contributions:** All other team members are welcome to contribute to the codebase, provided they invest the necessary time to understand the system architecture and take ownership of the features they build.
* **Documentation Workflow:** Jiamiao will provide comprehensive, bullet-point outlines for the product documentation. The rest of the team will expand these outlines into proper document format and follow up with Jiamiao to clarify any questions or details as needed.
* **Transparency & Accessibility:** All codebases and project documents must remain transparent and accessible to the entire team. Everything should be stored in shared repositories and folders on GitHub so all members can view and track progress at any time.

### Standards document updates

In Phase 3, we updated standards.md to resolve conflicting workflows, replace vague rules with exact specifications, reflect our updated team role division (with Jiamiao as the sole developer and Mira, Brahmi, Chengan forming the documentation team), and introduce automated code quality tools.

For our Documentation Standards and Processes, we resolved a workflow conflict regarding where peer reviews happen and clarified documentation ownership. While Phase 2 stated that documentation peer reviews occurred through GitHub Pull Requests and assigned feature documentation to developers, Phase 3 clarifies that the documentation team writes feature documentation based on Jiamiao's updates, and all content drafting, peer review, and approval take place directly in Google Docs under the documentation lead (Mira). Once approved in Google Docs, the author submits a PR to the dev branch as a final integration step, where Mira verifies Markdown syntax within 24 hours before Jiamiao merges it. We also replaced vague formatting guidelines with concrete rules: we changed the image folder name from Images/ to lowercase images/, enforced consistent heading depths (H1 for titles, H2/H3 for sections), added design.md to the list of core deliverables, and introduced a docs: Pull Request title format with a summary description.

For our Coding Standards and Processes, we replaced general readability advice with concrete industry standards by adopting the Google HTML/CSS Style Guide and the Google JavaScript Style Guide, alongside explicit SQL rules. To eliminate vague formatting expectations, we mandated strict 2-space indentation without tabs and defined exact naming conventions: camelCase for variables, functions, and backend files; UPPER_SNAKE_CASE for constants; and PascalCase for React components. We also tightened the hard-coded literal exception from 0, 1, and 2 to just 0 and 1 for array indexing, clarified that standard HTML and CSS properties do not require constants, and added a rule requiring inline comments for functions containing nested loops. Furthermore, we replaced the multi-developer Lead/Understudy peer code review workflow with a sole-developer verification process for Jiamiao, introduced mandatory Automated Linters and Validators requiring all submitted code to pass the W3C HTML Validator, Stylelint (CSS), and ESLint (JavaScript) before merging, and we standardized code PR titles using feat: and fix: prefixes.

For our Version Control Standards and Processes, we added a dedicated docs/<name> branch convention alongside feature/<name> to separate documentation and code submissions, clarified branch responsibilities between the developer and the documentation team, and cleaned up several minor inconsistencies from Phase 2, including fixing a numbering typo in the Git Workflow steps (which previously skipped step 4), correcting the workflow guide file path to ez-bites/documentation/GIT_WORKFLOW.md, changing an accidental reference from "game" to "product" in the commit body guidelines, and updating our enforcement section to include the new automated linters and validators.

### Requirements document updates

During Phase 3, our team completed the main sections of the Requirements and Specifications document. We defined the system scope, functional behaviour, user workflows, quality standards, and technical terminology to provide a clear blueprint for development.

In the Introduction and Overview section, we described EZ Bites as a lightweight restaurant ordering prototype for a single restaurant. We separated the public Customer Website from the private three-page Owner Dashboard and set clear course project boundaries.

In the Product Features and Behaviour section, we documented the detailed requirements for the Customer Website. This includes loading the saved weather theme and restaurant contact details, browsing a flat bilingual menu (with an English/French toggle that translates item names only), managing a transient in-memory shopping cart via a persistent bottom bar, and submitting tax-free pay-at-pickup orders with confirmation screens.

We also detailed all administrative features for the Owner Dashboard, which operates without login authentication for demonstration purposes. Specifically, we defined the three-page navigation covering a saved-state Restaurant Preview, manual weather theme controls (Sunny, Cloudy, Rainy), Menu Management (Create, Read, Update, and Delete operations with bilingual names, pricing, availability toggles, and historical order snapshot preservation), and a read-only Orders page with a manual refresh control.

In the User Interface and Navigation section, we created a system navigation map and visual wireframes for both the Customer Website (covering desktop and mobile layouts, the cart drawer, and the order confirmation view) and the Owner Dashboard (covering the Restaurant Preview, Menu Management and theme controls, item edit modal, and read-only Orders view), accompanied by detailed descriptions of all visible controls and screen transitions.

To show how the system works in practice, we wrote formal Use Cases and Practical Scenarios. These scenarios walk through a customer switching item languages, using the transient cart, and placing a pickup order, as well as a restaurant owner updating the weather theme, managing menu items, and reviewing incoming orders.

We also established clear Non-Functional Requirements covering responsive usability, data validation and order correctness, historical data integrity, privacy boundaries, and performance.

Finally, we added the Feature Prioritization and Glossary sections. We grouped all features into Essential, Secondary, and Out of Scope tiers to keep development on schedule, and defined product-specific and technical architecture terms.

### Design document updates

In Phase 3, we developed the core sections of the Design Document, establishing the system’s architectural boundaries, module responsibilities, and data contracts. The current draft defines a three-tier, shared-API architecture in which two independently deployed React/Vite frontends (the Customer Website and the Owner Dashboard on Vercel) communicate exclusively with a single Node.js/Express REST API (on Render) backed by an Aiven PostgreSQL database.

To preserve historical order integrity without complex table joins, the database uses three unlinked tables (menu_items, orders, and restaurant_settings). Each submitted order stores an immutable JSONB snapshot of bilingual item names, unit prices, and quantities, ensuring past records remain unaffected when menu items are later edited or permanently deleted.

The document also specifies core module behaviors and user state flows across both applications. On the customer site, the design outlines a responsive single-page layout with in-memory React state for the shopping cart, bilingual English/French menu name switching, integer-cent subtotal calculations, and dynamic theme styling (sunny, cloudy, rainy). On the owner dashboard, the design supports live customer site previews, global theme persistence, bilingual menu operations, and manual-refresh order history review, all protected by parameterized SQL queries and origin-restricted CORS rules on the API server.

To manage project scope for a controlled course demo, we explicitly documented known limitations and deliberate tradeoffs, including the absence of owner authentication, reliance on client-side price calculations without server-side re-verification, an unused order status column, and cart clearing upon checkout errors.

Finally, the draft outlines the initial transition to physical design by defining the GitHub branching workflow (feature to dev to main), repository layout, deployment configuration, and acceptance testing criteria.
