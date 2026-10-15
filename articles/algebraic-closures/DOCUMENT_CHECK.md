# Document and publication checks

Original checks on 14 October 2026, version 2026-10-14.1.

- Main article: 13 pages; supplement: 33 pages. Both were compiled twice with pdfLaTeX, with resolved references and no remaining LaTeX warnings or overfull/underfull boxes.
- All pages of both final PDFs were rendered with Poppler and visually inspected for clipping, missing symbols, layout and reference problems. The author byline, date and PDF metadata identify Frederico Cançado and 14 October 2026. The titles contain no tool branding.
- The article retains full proofs of the pure-ZF separation, the finite-choice consequence, and the finite-group correspondence. The supplement preserves additional positive results, comparison models and obstructions. Base-compatible isomorphisms and ZF/ZFA boundaries are explicit.
- A separate internal mathematical audit checked Boolean scalar extension, the small semilinear closure construction, hereditarily symmetric realization, the parity-pair obstruction, dependent choice and the explicit witness fields. It found no substantive gap in the displayed argument. These were AI-assisted checks, not external peer review or proof-assistant verification.
- The literature review is recorded in `RELATED_ARTICLES.md`. It found no direct prior matching pure-ZF separation in the sources inspected; this is not a certification of worldwide novelty or priority.
- The two related PDFs match the SHA-256 hashes in `related-articles/manifest.json`. They are unchanged and are distributed under their authors’ verified CC BY 4.0 licenses.
- Public files were screened for credentials, private filesystem paths and account-use records. Older published reports were retained unchanged.

These checks document preparation and review scope. Rendering, compilation and checksums do not prove an infinite mathematical theorem.

## Consistency-premise correction — 15 October 2026

Version 2026-10-15.1 states the separation relative to ZF and explains Gödel's reduction Con(ZF) ⇒ Con(ZFC). The symmetric construction still uses a ZFC ground universe. The current article is 14 pages and the supplement is 33 pages; both are dated 15 October 2026.

Both revised standalone sources compiled successfully through two consecutive pdfLaTeX passes. The final logs contain no LaTeX warnings, undefined references, or overfull/underfull boxes. MuPDF extracted the corrected premise and constructibility explanation from both PDFs, and rendered all pages for layout inspection. Citation metadata, current summaries and checksums were updated. This correction does not constitute a new audit of the underlying construction.
