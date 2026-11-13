# Architecture decision record

The hackathon release is a dependency-light progressive web application built with semantic HTML, CSS and ES modules. Scientific calculations live in a portable pure module (`src/science.js`) with Node boundary tests. This minimizes bandwidth, cold starts, supply-chain surface and runtime cost while retaining a direct path to authenticated Supabase persistence.

## Boundaries

1. **Presentation:** semantic routes rendered by `src/app.js`; critical operations use native controls.
2. **Science:** deterministic functions validate ranges, preserve units and return a shared data-series representation.
3. **Accessibility:** live announcements, tables, described SVG, keyboard routes, visual preferences and sonification consume the same result.
4. **Persistence:** browser storage supports guest/offline notebooks and drafts; JSON export is the portability boundary.
5. **Offline:** a service worker precaches the application shell.
6. **Authenticated roadmap:** the Supabase migration defines profiles, investigations and classrooms with RLS; it is not represented as deployed.

## Security decisions

User-authored text is escaped; custom experiments use a constrained linear model rather than arbitrary expressions; CSP and same-origin policies restrict the browser; no service credential exists in the client; no diagnosis, disability document or location is collected.

Device-local persistence is private and resilient but does not synchronize. Cross-user classroom features remain gated behind verified authentication and applied RLS.
