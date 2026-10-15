# Algebraic closures: existence without uniqueness

**Frederico Cançado · 15 October 2026 · version 2026-10-15.1**

[Article (14-page PDF)](algebraic_closures.pdf) · [LaTeX source](algebraic_closures.tex) · [Technical supplement (33-page PDF)](algebraic_closures_supplement.pdf) · [Supplement source](algebraic_closures_supplement.tex)

Let E mean that every field has an algebraic closure, and let U mean that any two supplied algebraic closures of a field are isomorphic over that field. The article gives a pure symmetric model establishing

**Con(ZF) ⇒ Con(ZF + DC + E + ¬U + ¬AC_fin + ¬BPI).**

The consistency premise was corrected from ZFC to ZF on 15 October 2026. Gödel's constructible-universe theorem gives Con(ZF) ⇒ Con(ZFC), after which the same symmetric construction applies. Choice is used in the construction's ground universe; the resulting model satisfies ZF.

Thus universal existence does not imply conditional uniqueness, even with dependent choice. The proof includes two nonisomorphic algebraic closures over a specified well-orderable field. A second result proves E ∧ U ⇒ AC_fin and, assuming E, identifies U with finite-group projection and finite-torsor compactness principles. Definitions and all assumptions appear in the article.

The reverse implication U ⇒ E over pure ZF is unresolved here. The standard implication BPI ⇒ E ∧ U is attributed to Banaschewski; the article does not claim a worldwide novelty certification.

## Accompanying material

- [Technical supplement](algebraic_closures_supplement.pdf): further choice consequences, restricted equivalences, ZFA comparison models, and precise obstructions to unsuccessful approaches.
- [Research record](research_log.md): mathematical development, failed approaches, and status changes; earlier provisional claims must be read with the final consolidated results.
- [Related articles and primary sources](RELATED_ARTICLES.md): annotated bibliography and verification scope.
- [Redistributed related papers](related-articles/README.md): two unchanged articles under their authors’ CC BY 4.0 licenses, with source, version and hash information.
- [Citation metadata](CITATION.cff), [document checks](DOCUMENT_CHECK.md), and [SHA-256 checksums](SHA256SUMS).
- [Website article page](https://frederico-cancado.github.io/weak-choice-atlas/articles/algebraic-closures/) and [interactive algebra view](https://frederico-cancado.github.io/weak-choice-atlas/#explore?view=algebra&research=1&theory=ZF).

## Status and reuse

This is a preliminary preprint. Preparation and internal mathematical audits used AI assistance; they are not external human peer review or proof-assistant verification. The manuscript contains the arguments themselves. The mathematical contribution is attributed to the named author; cited prior results retain their attribution.

Original text and sources are licensed under [CC BY 4.0](../../LICENSE), to the extent the contributor holds rights. Third-party PDFs retain their own authorship and licenses, as documented in `related-articles/`. No DOI is assigned. For an immutable citation, include the author, title, version and exact GitHub commit.

Compile each standalone TeX source twice with pdfLaTeX. Standard mathematics and layout packages are sufficient.
