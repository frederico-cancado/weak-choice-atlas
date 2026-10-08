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
The Small violations & coding view includes SVC, its fixed-seed versions,
and their connections to PP and KWP.
The Order extension & choice view collects OEP, OP and BPI alongside the
report’s separating models. Recent OEP/BPI claims link to the pinned report.

Choose Auto, Light or Dark in the header; the theme preference is saved on
this device. On phones the atlas automatically uses Graph, Principles and
Details tabs, with touch-sized controls and a list alternative to the graph.

Initial edition: 88 statement/family records, 64 relationships, and 3 models.
The catalogue is broader than the initial relationship collection. Missing
edges mean **not recorded**, not a claim of independence or openness.

## Run locally

Serve this directory with any static HTTP server, for example:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`. There is no build step, package installation,
account system, database, or application server. Relative asset paths and
hash routes work under a GitHub Pages project URL.

## Check the data and reasoning engine

With Node.js installed, run `node verify.mjs`. The check covers source/model
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
