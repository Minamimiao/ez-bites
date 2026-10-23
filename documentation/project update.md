\# CSCI 265 Project Update (Phase 2\)

\*\*Team name:\*\* 4 Tiny Stars    
\*\*Project/product name:\*\* EZ Bites    
\*\*Date:\*\* October 22, 2026

\*\*Contact person and email:\*\*  
\- Jiamiao Zhao — jiamiao.zhao@my.viu.ca (main contact)  
\- Mira Milat — mira.milat@my.viu.ca  
\- Chengan Tian — chengan.tian@my.viu.ca  
\- Brahmi Duklan — brahmi.duklan@my.viu.ca

\#\# Key Revisions Since Phase 1

\#\#\# Phase 2 Progress Compared to the Original Plan

\- \*\*Planned goals:\*\* Finalize the architecture, establish documentation and coding standards, and set up the GitHub repository and workflow.  
\- \*\*Current status:\*\* The React/Vite frontend, Node.js/Express backend, and PostgreSQL database are connected. The frontend can display menu data retrieved through the backend API. Our \`standards.md\` and Git workflow are established.  
\- \*\*Team coordination:\*\* We use GitHub, Trello, Discord, and weekly meetings to coordinate development.

\#\#\# Major Revisions and Technical Updates

\- \*\*Hosting:\*\* Vercel (frontend), Render (backend), and Aiven (database).  
\- \*\*Development workflow:\*\* Team members develop and test locally, then open Pull Requests following \`feature branch → dev → main\`. Vercel and Render support automated deployment.  
\- \*\*Architecture:\*\* The frontend accesses PostgreSQL through the backend API rather than connecting to the database directly.

\#\#\# Changes to Planned Features, Functionality, and Long-Term Goals

\*\*Original plan:\*\* Build a platform where multiple restaurant owners could enter their information and generate personalized restaurant websites, each with a customer site and owner dashboard.

\*\*Revised plan:\*\* Build a \*\*single-restaurant online ordering and management system\*\* with two interfaces:

\- \*\*Customer website:\*\* View the menu and restaurant information, manage a cart, place orders, track order status, and see the selected website theme.  
\- \*\*Owner dashboard:\*\* Log in, manage menu items and availability, view orders, update order statuses, edit restaurant information, and choose a website theme.  
\- \*\*Weather-based themes:\*\* The owner manually chooses \*\*Sunny\*\*, \*\*Rainy\*\*, or \*\*Cloudy\*\*. The selection is saved in PostgreSQL and changes the customer site's colors and visual effects without changing its core functions.

\*\*Outside the current scope:\*\* Multi-restaurant support, automatic website generation, fully customizable layouts, multiple restaurant-owner accounts, online payments, and automatic theme changes based on real-time weather.

The revised goal is to deliver one complete, reliable system while focusing on teamwork, testing, documentation, and integration.

\#\#\# Changes to the Assessed Risks for the Project

\| Risk \| Original \| Current \|  
\| \--- \| \--- \| \--- \|  
\| Scope Creep \| High \| Medium \|  
\| Technical Complexity \| High \| Medium \|  
\| Schedule Delay \| High \| Medium \|  
\| Team Integration \| High \| Medium \|  
\| Authentication and Security \| High \| Low \|  
\| Database Management \| High \| Medium \|

The smaller scope reduces complexity and schedule risk, but several issues still require attention:

\- \*\*Integration:\*\* Agree on API contracts, review Pull Requests, and test connected features.  
\- \*\*Database:\*\* Document and coordinate schema changes on Aiven.  
\- \*\*Security:\*\* Protect owner-only features and private order information.  
\- \*\*Order accuracy:\*\* Validate quantities, prices, and order statuses in the backend.

We will continue reviewing risks at team meetings.

\#\#\# Changes to the Team Charter

\- Team members may learn from and reuse appropriate open-source projects on GitHub, with proper credit to original authors.  
\- We follow a \*\*48-hour pre-deadline target\*\* to allow time for review and revisions.

\#\#\# Requirements Document Updates

\- Created \`requirements.md\` with an overview of the system, customer and owner features, and expected system limits.  
\- The requirements will be aligned with the revised single-restaurant scope and weather-theme feature.

\#\#\# Standards Document Updates

\- Created the initial version of \`Standards.md\`.

