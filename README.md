# S&OP Academy

A mobile-first personal learning hub for Sales & Operations Planning (S&OP).

## Current release: Draft 0.2 — Module 01 only

This project is intentionally being developed **one module at a time**. The current application contains only **Module 01: S&OP Fundamentals**. Later modules will be added only when requested, so the learning platform grows in controlled, reviewable blocks instead of receiving the entire curriculum at once.

### Included in Module 01

- 6 topics and 18 guided lectures
- Definitions, business purpose, planning hierarchy, and related planning processes
- Unconstrained demand, constrained supply, planning horizons, product families, and data foundations
- The five-step monthly S&OP cycle, including inputs, activities, outputs, and decisions
- Roles, governance, meeting cadence, decision records, KPIs, maturity, and failure modes
- A worked three-month manufacturing case study with inventory and capacity calculations
- Lecture-level knowledge checks with explanations
- Technical glossary limited to Module 01 terminology
- Interactive concept map
- Topic completion tracking stored in browser localStorage
- Responsive desktop and mobile interface
- Reference links to ASCM/APICS, APQC, SAP, and supply-chain professional resources

### Run locally

Open `index.html` in a browser. No build step or package installation is required.

### Publish with GitHub Pages

1. Open the repository Settings.
2. Select **Pages**.
3. Under Build and deployment, choose **Deploy from a branch**.
4. Select `main` and the `/ (root)` folder, then Save.

## Current limitations

- Progress is stored locally in the browser. It does not sync between devices.
- No authentication or cloud database is connected.
- The concept map is a first-pass relationship model and is not yet a fully draggable graph.
- Lesson material is educational and generalized. Company-specific S&OP names, horizons, approval rules, and KPI definitions may differ.

## Incremental development rule

Do not populate future modules by default. Add a new module or learning block only when the user explicitly requests it. Preserve existing Module 01 content and progress behavior when expanding the application.

## Suggested next development stages

1. Review and refine Module 01 lesson content and diagrams.
2. Add personal notes and bookmarks for Module 01.
3. Improve concept-map cross-links between lessons and glossary terms.
4. Add secure cloud persistence and cross-device synchronization.
5. Add Module 02 only when requested.

## Tech

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
