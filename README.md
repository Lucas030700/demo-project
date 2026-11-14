# S&OP Academy

A mobile-first personal learning hub for Sales & Operations Planning (S&OP).

## Draft 0.1

This is an early, front-end-only prototype built with plain HTML, CSS, and JavaScript. It is designed to work as a responsive website on desktop and mobile browsers.

### Included in this draft

- Dashboard with curriculum overview and learning progress
- 12-module S&OP curriculum, from fundamentals through practical case studies
- Topic-level guided lecture content and short knowledge checks
- Interactive concept map showing relationships among core S&OP disciplines
- Searchable technical glossary with 24 terms
- Progress tracking saved in the current browser using localStorage
- Responsive layout for mobile and desktop

### Run locally

Open `index.html` in a browser. No build step or package installation is required.

### Publish with GitHub Pages

1. Open the repository Settings.
2. Select **Pages**.
3. Under Build and deployment, choose **Deploy from a branch**.
4. Select `main` and the `/ (root)` folder, then Save.

The site should become available at the repository's GitHub Pages URL after deployment completes.

## Current limitations

- Progress is stored locally in the browser. It does not sync between devices.
- No authentication or cloud database is connected.
- Lesson content is starter educational material and should be expanded, reviewed, and adapted to the user's company processes.
- The concept map is a first-pass relationship model, not yet a fully draggable graph.
- No backend, AI tutor, note-taking sync, or downloadable assessments are included yet.

## Suggested next development stages

1. Refine the curriculum and expand each lecture into a comprehensive chapter with worked examples.
2. Add personal notes, bookmarks, and lesson-level completion.
3. Add richer concept relationships and clickable cross-links between lessons and glossary terms.
4. Add cloud persistence and secure cross-device synchronization.
5. Add case-study workspaces, formula practice, and assessment history.
6. Package as a Progressive Web App (PWA) for an installable mobile experience.

## Tech

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
