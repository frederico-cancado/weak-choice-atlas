# Weak Choice Atlas

A searchable atlas of weak forms of the axiom of choice, with an interactive
implication graph, proof references, and separating models.

Created and maintained by **Frederico Cançado**.

## Use the atlas

Select a principle to read its definition, or an arrow to read its evidence.
The comparison tool finds compatible implication paths and supporting
countermodels. Switch ZF/ZFA explicitly. Recent source-dependent and
preliminary results are off by default and can be included with a toggle.
Hidden research relationships are flagged in the graph and principle panels.
The Finite choice & colourings view includes AC₂ ⇔ G₂, BPI ⇔ Gₙ for each fixed finite n≥3, and BPI ⇒ finite-fiber Hall ⇒ AC_fin. Countable choice ⇒ CUC ⇒ choice for countable families of countable sets is recorded. The Infinite sets & ultrafilters view shows NDS ⇒ Dedekind infinitude ⇒ no amorphous sets, the failure of no amorphous sets to imply either stronger principle, and the failure of no-amorphous to imply any nonprincipal ultrafilter. Algebraic closures have a dedicated view with BPI implications.

The Small violations & coding view includes SVC, its fixed-seed versions,
and their connections to PP and KWP.
The Order extension & choice view collects OEP, OP and BPI alongside the
report’s separating models. Recent OEP/BPI claims link to the pinned report.

Choose Auto, Light or Dark in the header; the theme preference is saved on
this device. On phones the atlas automatically uses Graph, Principles and
Details tabs, with touch-sized controls and a list alternative to the graph.

Current edition: 103 statement/family records, 164 relationships, and 19 models.
The catalogue is broader than the initial relationship collection. Missing
edges mean **not recorded**, not a claim of independence or openness.

The OpenAI model card includes Cançado’s six recorded follow-up results directly in its truth-value table: FB, NDS, finite cardinal antichains and OP hold; OEP and BPI fail. Each follow-up row shows his name, preliminary status and a link to its source, in both the model listing and the full model page. The construction remains attributed to OpenAI.

## Choose your graph

The default **Types of choice** view includes AC, AC_WO, CC, DC, finite-fiber choice, AC₂, AC₃, AC₄, Multiple Choice and related restrictions. Topic presets contain at least eleven nodes with current settings; their exact node lists are in `selection.mjs`. They are editorial starting points, not a ranking of mathematical importance. The selected theory and evidence settings filter arrows, not arbitrary isolated nodes.

Open **Choose axioms & graph settings** to select individual entries, include AC equivalents, or expand by one or two steps of recorded relationships. **Only chosen axioms** means exactly the selection. Connection expansion finds adjacent records; it never treats a chain of nonimplications as a deduction. Previously omitted catalogue entries are available in the picker. Choose **All default graph axioms** for a larger overview. **Wider graph** hides the principle list while keeping the evidence panel.

Clicking an axiom in the graph or catalogue opens its details while keeping the current graph selection. Enable **Neighbors of the selected principle** above the graph, choose **Around the selected principle** from Graph view, or use the explicit **Focus graph** button to enter neighbors mode. While enabled, selecting another axiom updates its complete neighborhood. Turning the checkbox off restores the previous topic or custom selection, connection depth, AC visibility settings, and arrow filters. A direct neighbors permalink has the default Types of choice graph as its return view.

Neighbors mode includes both directions of recorded nonimplication and equivalent formulations. Stronger axioms appear above, consequences below, and proven incomparable axioms on the sides. Comparisons not established in the atlas occupy a separate labeled area. Equivalent formulations are placed to shorten neighboring arrows. Focus preserves all direct neighbors even when ordinary graph filters would hide them; select two connection steps for a wider neighborhood. The separate **Only the selected axiom’s arrows** checkbox retains every node in an ordinary graph while showing only the arrows touching the selected axiom; it does not enable neighbors mode. Implication arrows with an alternative displayed proof path are omitted, while nonimplications and necessary joint premises are preserved. **Save this graph** stores its exact nodes and evidence settings on the current device; **Graph permalink** encodes the custom selection in the URL. The same permalink restores the same settings, regardless of the previous graph.

The Types of choice category includes AC, CC, DC, fixed-size and finite-fiber choice, and Multiple Choice (finite nonempty selections, equivalent to AC over ZF). Its expandable note gives the Mostowski–Gauntt–Truss ACₘ/ACₙ criterion and distinguishes exactly n elements from at most n. For each fixed n≥3, C_n and C_(n−1) are incomparable over ZF and ZFA, assuming consistency; C_1 is a theorem. The concrete graph includes AC₂ ⇔ AC₄ and both nonimplications between AC₂ and AC₃, with classical sources and separate atom/pure-set witnesses. No parameterized AC_n family is silently instantiated at a different n.

## Permutation models

The five ZFA models have separate **A / G / 𝓕** construction panels: basic Fraenkel, second Fraenkel (fixed pairs), ordered Mostowski, countable-support Fraenkel N12(ℵ₁), and cyclic triples N2*(3). Atom sizes and support bounds are external, in the ground model. The introduction explains Jech–Sochor bounded transfer and why ZFA results are not automatically ZF results. Link directly to `#models?theory=ZFA&research=0`. Model properties retain their own sources or labeled elementary arguments.

## Complete relationship profiles

Click a principle to see its relationship groups, or choose **Open full view** for a searchable comparison with every other catalogue entry. Profiles include graph-hidden definitions and provide incoming implications, consequences, equivalences, mutual nonimplications, and unanswered directions. Each list groups equivalent formulations into expandable classes, preferring AC and BPI as representatives. Search also finds formulations inside collapsed classes. Empty relationship and catalogue groups are omitted. Transitive implications include their complete recorded proof paths; expanding a comparison displays evidence separately for each direction.

**Unknown / not recorded** means the atlas lacks evidence for a direction under the selected ZF/ZFA and research settings. It is not an assertion of mathematical openness. A known implication with an unanswered converse appears in both the implication group and the unanswered group. The CSB, ordinal-trichotomy, finite-index-choice and finite-Hall theorem entries have been removed.

The **PP, CSB* & WPP** view displays PP ⇒ CSB* ⇒ WPP ⇒ AC_WO ⇒ DC. OpenAI’s explicit CSB* and WPP nonimplications to AC retain its attribution and recent-source status. The BPI/CSB* comparison distinguishes the classical Cohen-model direction from Cançado’s preliminary reverse separation.

SVC(A) in OpenAI’s model uses its particular non-well-orderable seed A. Literal finite nonzero seeds and omega give AC-equivalent versions, recorded in a separate SVC(W) entry. The model supplies existential SVC, without asserting SVC(S) for every possible fixed parameter S.

The AC-equivalence catalogue includes the maximal antichain principle, Kuratowski’s chain-union maximal principle, and LW (linearly orderable sets are well-orderable). Definitions distinguish incomparable order antichains from incompatible forcing antichains, and ZF reversals from those valid with atoms. Historical notes cover these principles and Zorn, Hausdorff, Teichmüller–Tukey, and well-ordering, with references and source-access limitations.

## Catalogue groups and graph scope

The catalogue separates **equivalent to AC**, **known not equivalent to AC**, and **unresolved / to verify**. These are ZF classifications. The last group explicitly distinguishes a documented open question, a parameter-dependent family, and a record that the atlas has not yet classified. Cited preprint-supported classifications remain visibly marked even when recent graph arrows are hidden.

AC equivalents have standalone pages with hypotheses and proof references. AC is included by default as a graph reference; other equivalents can be enabled in the graph settings. The reasoning records are retained for comparison and citation. The earlier 11 retained candidates remain in default graph navigation. Other retained entries remain outside default topic selection, but every catalogue entry can be selected explicitly. Retained item 10, choice for linearly orderable index sets, remains in the AC-equivalence catalogue. DC on the reals has been removed at the maintainer’s request.

Non-implications use orange dashed paths, explicit ↛ badges, large click/tap targets and hover/focus emphasis. Routes follow rounded local gaps around cards; reciprocal nonimplications share one double-headed dashed edge. Clicking it shows both original statements, sources, and countermodels separately. The edge is marked as recent if either direction uses recent research. Other parallel arrows use distinct ports. Hover/focus highlights the endpoints and dims other routes. Large rows wrap instead of extending indefinitely sideways. The **Non-implications only** filter isolates them. Multiple proofs of the same directed statement share a single graph arrow, preferring the classical source; individual evidence records remain in the principle panel.

The added equivalences distinguish finite-fiber choice from multiple choice, and full Tychonoff from its compact Hausdorff version. Compactness and product nonemptiness are stated separately. Mathias’s 1967/1974 OP ↛ OEP separation is credited independently of Cançado’s additional PP-model witness.

## Run locally

Serve this directory with any static HTTP server, for example:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`. There is no build step, package installation,
account system, database, or application server. Relative asset paths and
hash routes work under a GitHub Pages project URL.

## Check the data and reasoning engine

With Node.js installed, run `node verify.mjs`, `node selection.verify.mjs`, and `node graph.verify.mjs`. For interaction regressions, install `jsdom` and `svg-path-properties` in a separate development directory and run `ATLAS_TEST_MODULES=/path/to/development node ui.verify.mjs`. These dependencies are not used by the website.

The checks cover source/model
references, conjunctions, theory isolation, research filtering, and conflicts
between entered implications and countermodels. It does not certify proofs.

## Publish on GitHub Pages

In the repository settings, select **Pages**, **Deploy from a branch**,
branch **main**, folder **/(root)**, then save. Publish the files in this
directory, including `.nojekyll`.

## Maintain the mathematics

Edit `data.json` to add principles, sources, relationships, or models. Preserve
stable IDs. Bump the asset version in HTML/module imports when changing
software or styles, so returning visitors receive the update. Catalogue
requests revalidate on load. Every relationship needs its exact statement, theory, provenance,
review status and, for separations, a model and consistency assumption.

- `principles`: definitions, aliases, source locators, parameters and notes.
- `relations`: premise list, conclusion, logical kind, applicable theories,
  proof note, citations, evidence access, and standard/recent layer.
- `models`: explicitly supported true/false values and source references;
  `permutation_construction` records atoms, group, filter, supports and source;
  `property_evidence` gives citations for specific facts and `additional_claims`
  retains separate research attribution. Comparisons cite the facts used.
- `sources`: bibliography. Original proofs and later expositions are distinct.

An equivalence may be traversed both ways. Conjunctive premises require all
members. Nonimplications are never treated as inference arrows. Countermodel
search uses a single witness with both required properties. `engine.mjs`
contains the reasoning logic; `graph.mjs` handles the interactive diagram.

Source checked does not mean independently verified. Elementary arguments
are included as explanatory proofs. No automated procedure here certifies
the mathematics or the historical originality of a result.

ZF results are not automatically imported into ZFA. Elementary records whose
displayed arguments work with atoms explicitly list both theories. No atom
model is presented as a ZF countermodel without transfer evidence.

## Credits and contributions

Inspired by [π-base](https://pi-base.org/). Important predecessors include
[Howard–Rubin](https://doi.org/10.1090/surv/059) and
[Ioanna Dimitriou’s Choiceless Grapher](https://github.com/ioannad/jeffrey).
The Howard–Rubin source files are not redistributed here.

Please open an issue with the precise formulation, base theory, and theorem
or page reference. For a nonimplication, include the model and assumptions.
Research notes: [AC-zoo-results](https://github.com/frederico-cancado/AC-zoo-results).

Developed with AI assistance. Original software: MIT. Original catalogue
text: CC BY 4.0. Linked papers retain their own terms. See the license files.

### RPP and countermodels

RPP is the Ramseyan Partition Principle for two-colorings of unordered pairs of an arbitrary infinite set; the homogeneous subset need only be infinite. The Ramsey view connects it to PP, NDS, countable choice, Dedekind infinitude, finite choice and BPI. Citations distinguish Blass’s original results from later proofs and elementary consequences.

Five additional model entries cover basic Fraenkel (ZFA), a transferred Ramsey model (ZF), Howard–Tachtsis AC_WO without NDS, Tachtsis BPI plus countable choice without NDS, and Solovay’s measurable-reals model. Transferred results are separate from their atom-model origins. Solovay’s stronger hypothesis is explicit; unrecorded truth values remain unknown. RPP also appears in the existing model tables where the recorded facts decide it.

### Revised categories and additional statements

All cardinal and partition/duality categories are collected under **Cardinal structure**. RPP is in **Combinatorics**. Dedekind infinitude, weak Dedekind infinitude (IWDI), and no amorphous sets share **Finitude**. The complete catalogue is available in the sidebar; empty categories are not displayed.

The metric sequential-continuity principle states that every sequentially continuous map between metric spaces is continuous; it is equivalent to CC over ZF (Herrlich, Theorem 2.4). Its notes distinguish pointwise real continuity from the global real-to-real theorem.

The Noetherian entry uses stabilization of ascending **sequences** of ideals in commutative rings with identity, equivalent to finite generation of every ideal. The recorded bounds are DC ⇒ N ⇒ IWDI ⇒ no amorphous sets, and N is incomparable with BPI. The reverse direction from finite generation to ACC is a ZF theorem; the included finite/cofinite Boolean-ring argument justifies N ⇒ IWDI. No equivalence N ⇔ DC is asserted. All relationships with other recorded axioms are available through the inference profiles.

Algebraic-closure existence and conditional uniqueness retain their classical BPI upper bounds. The Howard–Rubin matrix is historical: its reverse separation is in **ZFA**, and its unrecorded existence-to-uniqueness entry is not a current openness assertion. The recent research layer now includes Cançado’s 14 October 2026 preliminary pure-ZF construction separating existence from uniqueness. The reverse implication, uniqueness to existence, remains unresolved here over pure ZF.

### Algebraic closures — 14 October 2026

The preliminary article **Algebraic closures: existence without uniqueness**, by Frederico Cançado, supplies a direct pure-ZF symmetric model of DC plus existence of algebraic closures for every field, with failure of conditional uniqueness, finite choice, choice for pairs and BPI, relative to Con(ZFC). The model card records its free group, universal quotient-orbit coordinates, small-index support filter, Boolean closure construction, parity pair obstruction and exact property evidence. Its four explicit existence nonimplications and model are hidden unless recent research is enabled. They are not asserted in the ZFA view.

The same article proves the genuinely joint implication E∧U ⇒ AC_fin. It defines P as surjectivity of every projection from a surjective inverse system of finite groups, and T as existence of coherent points in compatible surjective systems of finite torsors. The recorded recent relationships are P ⇔ T, T ⇒ U, T ⇒ AC_fin, E∧U ⇒ P, and BPI ⇒ T. No E premise is discarded, and no converse to BPI ⇒ T is asserted. These finite-algebra arguments explicitly apply in both ZF and ZFA; the new separating model is pure ZF only.

The article and source locators are registered as `FC2026ALG`, version `2026-10-14.1`, pinned to commit `b3cbadd1082e3c078ba61aba68b8beccbbbd8d45`. The results are preliminary and have received internal AI-assisted mathematical audits; they are not externally peer-reviewed or formally verified. The research log and technical supplement are available beside the article in [AC-zoo-results](https://github.com/frederico-cancado/AC-zoo-results/tree/main/articles/2026-10-14-algebraic-closures).
