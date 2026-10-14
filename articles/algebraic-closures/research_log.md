# Algebraic closures without choice: research record

**Consolidated research edition — a pure-ZF countermodel was obtained.**

**Frederico Cançado · 14 October 2026 · preliminary research record**

This companion record preserves mathematical arguments, unsuccessful routes, and changes in the status of the investigation. The article and technical supplement provide the consolidated proofs. References below to intermediate working filenames are historical references; those files are not separate dependencies of the article. Internal audits used AI assistance and are not external peer review or formal verification.

This is a mathematical research record: definitions, arguments, evidence, unsuccessful approaches, and remaining obligations. It is not a transcript of private internal deliberation. The accompanying PDF contains the consolidated positive proofs. No claim of historical novelty is made for independently derived results.

## 1. The question and its conventions

The default foundation is **pure ZF**, without the Axiom of Choice. Results allowing atoms are explicitly marked **ZFA**. This distinction changes which countermodels answer the original implication questions.

An algebraic closure of a field \(K\) is a pair \((L,i)\), with \(i:K\hookrightarrow L\), such that \(L\) is algebraically closed and algebraic over \(i(K)\).

- **E:** every field has an algebraic closure.
- **U:** whenever \((L,i)\) and \((M,j)\) are algebraic closures of the same field \(K\), there is a field isomorphism \(h:L\to M\) satisfying \(h\circ i=j\).

Uniqueness means uniqueness up to a base-compatible isomorphism. It does not mean that the isomorphism itself is unique. We do not replace “algebraic and algebraically closed” by a different minimality convention.

The requested early-stop condition was a counterexample or equivalence proof. Initial countermodels worked only in ZFA, so the investigation continued under the default pure-ZF interpretation. The final construction is a direct pure symmetric extension satisfying **ZF + DC + E + not U + not AC_fin + not BPI**. It meets that stopping condition without transferring an atom model. The opposite implication U implies E remains unresolved here in pure ZF. Earlier checkpoint sections below are retained as a chronological research record; the final status table and Sections 29 onward supersede their provisional status claims.

## 2. Status table

| Assertion | Status in this investigation | Foundation and qualification |
|---|---|---|
| BPI implies E and U | Proved; known attribution to Banaschewski | ZF |
| E and U together imply choice for arbitrary families of nonempty finite sets | Proved and independently audited | ZF and ZFA |
| E and U together imply extension of linear functionals over finite fields | Proved and independently audited | ZF and ZFA |
| E and U together imply finite-consistency compactness for finite-field linear equations | Proved | ZF and ZFA |
| E and U imply extension of characters into \(\mathbb Q/\mathbb Z\) when the quotient is torsion | Proved | ZF and ZFA |
| U is equivalent to a restricted tensor-product prime-ideal principle | Proved | Only tensors of two existing closures over a common base |
| U is equivalent to a restricted finite inverse-limit principle | Proved | The canonical systems of finite splitting-field isomorphisms |
| Under E, U is equivalent to finite-torsor compactness T and finite-group projection principle P | Proved and independently audited | ZF; E is retained |
| U implies linear and torsion-character extension for linearly ordered generating families | Proved and independently audited | ZF; no E assumption |
| U implies finite choice on surjective images of linearly orderable sets | Proved | ZF; covering hypothesis retained |
| U implies additive infinite parity and a non-Baire subset of Cantor space | Proved | ZF |
| E plus finite choice is equivalent to root-selected closure existence | Proved | Root selector is part of the witness |
| E plus finite choice is equivalent to prime ideals in the canonical complete-splitting algebras | Proved | This is not a full BPI equivalence |
| Every algebraic extension of a well-orderable field is well-orderable iff well-orderably indexed finite choice | Proved | ZF; countable analogue also proved |
| Conditional uniqueness over countable bases iff countable finite choice | Proved **assuming E** | The assumption E is retained in the converse |
| U with failure of E | Verified countermodel | Basic Fraenkel model of ZFA |
| E with failure of U | Verified countermodel | Cyclic Frobenius model of ZFA; failure already over a finite field |
| E + DC with failure of U and of MC | Verified countermodel | Free-group small-index permutation model of ZFA |
| U + DC with failure of E, finite choice, and MC | Verified countermodel | Countable-support full-symmetric model of ZFA |
| U plus dual KWP*_1, or SVC with a linearly ordered seed, implies AC_fin | Proved | ZF; additional covering hypothesis retained |
| Elementary-abelian restriction of P iff finite-field linear compactness | Proved | ZF; prime fixed |
| Fixed finite-group coset compactness iff the corresponding restricted torsor principle | Proved | ZF; fixed finite H retained |
| E implies U in pure ZF | Refuted by an audited relative model construction | Pure ZF + DC + E + not U; relative to ZFC |
| U implies E in pure ZF | Unresolved here | Neither proof nor simultaneous pure-ZF countermodel established |
| E implies finite choice or BPI | Refuted by the same pure model | Even in ZF + DC |
| U alone equivalent to BPI | Unresolved here | Historical matrix entries do not settle current status |

“Verified” in this record means that the mathematical argument was checked explicitly, including independent parallel audits. It does not mean formal proof-assistant verification, publication, or validation of an infinite theorem by computation.

## 3. Choice principles and the first upper bound

**BPI** is the Boolean Prime Ideal Theorem, equivalently the ultrafilter extension principle or propositional compactness. **AC_fin** is choice for arbitrary families of nonempty finite sets. **AC_fin^WO** restricts the family index set to a well-orderable set; **AC_omega^fin** restricts it to a countable set. **MC**, Multiple Choice, selects a nonempty finite subset of each member of any family of nonempty sets.

The first verified chain is

\[
\mathrm{BPI}\ \Longrightarrow\ E\wedge U\ \Longrightarrow\ \mathrm{AC}_{\mathrm{fin}}.
\]

The left implication is a known theorem of Banaschewski. The right implication was derived and checked in this investigation; no novelty assertion follows from that description.

### 3.1 A simultaneous splitting construction

For each monic positive-degree \(f\in K[T]\), introduce variables \(x_{f,1},\ldots,x_{f,n}\), where \(n=\deg f\). In their polynomial ring impose the coefficient equations

\[
f(T)=\prod_{j=1}^{n}(T-x_{f,j}).
\]

The generated ideal is proper. Any finite proposed expression for 1 in the ideal involves finitely many defining relations. Those finitely many polynomials have a finite splitting field in ZF, and finitely many root enumerations suffice to evaluate the expression and obtain a contradiction.

BPI places the proper ideal in a prime ideal. The resulting quotient is an algebraic domain over \(K\); its fraction field is algebraic over \(K\) and splits every polynomial over \(K\). Such an extension is algebraically closed: if a further algebraic root were adjoined, an annihilating polynomial over \(K\) would already split, forcing that root to belong to the extension.

The proof uses one simultaneous prime-ideal application. It avoids silently iterating an existential root-adjoining assertion through countably many stages.

### 3.2 Compactness for coherent finite isomorphisms

Given two existing closures \(L,M\) of \(K\), let \(L_f,M_f\) be the subfields generated by all roots of a monic polynomial \(f\), and put

\[
H_f=\operatorname{Iso}_K(L_f,M_f).
\]

Each \(H_f\) is finite and nonempty by finite algebra. If \(f\mid g\), restriction \(H_g\to H_f\) is onto. To verify this correctly, extend a given isomorphism into the **full algebraically closed target M**, then use the root factorization of \(g\) to identify its image as \(M_g\). It would be incorrect to apply the extension theorem directly to \(M_g\) as though it were algebraically closed.

Propositional compactness chooses a compatible family. Its union is the required isomorphism. Choosing an arbitrary member of each \(H_f\) would not suffice: compatibility is an additional condition.

## 4. The finite-choice lower bound

Let \((A_i)_{i\in I}\) be any family of nonempty finite sets, and set \(n_i=|A_i|\). Use disjoint tags and form

\[
L=\mathbb Q(x_{i,a}:a\in A_i,i\in I),\qquad
L'=\mathbb Q(y_{i,j}:1\le j\le n_i,i\in I).
\]

For each block, take all elementary symmetric functions of its variables. These are defined by sums over finite subsets, without enumerating the block. Let \(K\subseteq L\) and \(K'\subseteq L'\) be the fields generated by the corresponding symmetric coefficients.

The symmetric coefficient families are algebraically independent. Every purported relation involves finitely many finite blocks. Enumerate only those blocks, apply the leading-monomial argument for elementary symmetric functions, and observe that the triangular exponent map is injective. This is finite choice already provable in ZF, not a simultaneous enumeration over \(I\).

Consequently there is a specified isomorphism \(K\to K'\) matching the corresponding symmetric coefficients. Through it, view both fields as algebraic extensions of a common base. The block polynomials have exact root sets \(\{x_{i,a}:a\in A_i\}\) and \(\{y_{i,1},\ldots,y_{i,n_i}\}\).

E supplies a closure of each of the two fields. These are also closures of the common symmetric base. U supplies an isomorphism between them. For every \(i\), the unique \(a\) whose variable maps to \(y_{i,1}\) is the selected element of \(A_i\).

There are only two applications of E to two single fields. The proof does not select a family of algebraic closures.

### Exact amalgamation formulation

For these special generic pairs, compatible embeddings into a common field identify the two exact root sets and hence give a bijection \(A_i\to\{1,\ldots,n_i\}\) for each \(i\). Conversely such bijections give a base-compatible isomorphism of the rational function fields. Thus compatible amalgamation for all these pairs is exactly AC_fin.

An earlier version of the argument gave only linearly ordered or well-orderably indexed finite choice and used a choice-free real-closure theorem. The two-generic-field argument supersedes that restriction and removes that external ingredient from the finite-choice proof.

## 5. Root selection identifies a hidden strengthening of E

Define **root-selected existence** to say that every field has an algebraic closure together with a function selecting a root of every nonconstant polynomial over the base.

Over ZF, the following are equivalent:

1. E and AC_fin.
2. Root-selected existence.
3. Every canonical universal complete-splitting algebra from Section 3.1 has a prime ideal.

From E and AC_fin, choose a root from each finite root set, or choose one of the finitely many root lists counted with multiplicity and evaluate all the labelled variables.

Conversely, apply a root selector to the rational function field on the tagged union of an arbitrary finite-set family. The polynomial \(\prod_{a\in A_i}(T-x_{i,a})\) already has exactly the displayed roots in every extension. Its selected root chooses \(a\).

A prime quotient of the complete-splitting algebra is an algebraic domain over its base field, hence itself a field, and all base polynomials split. Its first labelled root variable supplies the selector.

This resolves a potential overstatement encountered early in the investigation: **E alone was not shown equivalent to prime ideals in the labelled splitting algebras.** The reverse evaluation step conceals simultaneous finite root enumeration. The exact statement includes AC_fin.

## 6. Further lower bounds by a Kummer construction

### 6.1 Extending finite-field linear functionals

Assume E and U. Let \(W\subseteq V\) be vector spaces over \(\mathbb F_p\), and let \(f:W\to\mathbb F_p\) be linear. No basis of \(V\), \(W\), or their quotient is assumed.

Set \(k=\mathbb Q(\zeta_p)\), with a specified primitive root of unity, and let

\[
\Gamma=\tfrac1p\mathbb Z^{(V)},\qquad
\pi(\gamma)=\sum_v(p\gamma(v)\bmod p)v.
\]

Put \(\Lambda=\ker\pi\) and \(\Lambda_W=\pi^{-1}(W)\), and form fraction fields of the group algebras:

\[
K=\operatorname{Frac}(k[\Lambda])\subseteq
F=\operatorname{Frac}(k[\Lambda_W])\subseteq
L=\operatorname{Frac}(k[\Gamma]).
\]

These group algebras are domains in ZF: any proposed zero-divisor computation involves finitely many coordinates and occurs in a finite-variable Laurent polynomial domain. Every monomial of \(L\) has its \(p\)th power in \(K\), so \(L/K\) is algebraic.

The rule

\[
X^\lambda\longmapsto\zeta_p^{f(\pi\lambda)}X^\lambda
\]

defines an automorphism of \(F\) fixing \(K\). E closes \(L\). That closure is also a closure of \(F\), so U extends the automorphism to it by comparing the ordinary and twisted embeddings of \(F\).

Every polynomial \(T^p-X^{p\gamma}\) already has its exact root set \(\{\zeta_p^jX^\gamma:0\le j<p\}\) in \(L\). Thus the extended automorphism gives a uniquely defined exponent \(g(\gamma)\in\mathbb F_p\). Multiplicativity makes \(g\) additive, and it vanishes on \(\Lambda\). It descends to the desired extension of \(f\) on \(V\).

### 6.2 Linear compactness, with its scope retained

For any fixed field, extension of linear functionals is equivalent in ZF to separation of a specified nonzero vector by a functional and to finite-consistency compactness for systems of linear equations.

For compactness from extension, use the free vector space on the unknowns. The coefficients of the equations span a subspace; finite consistency makes the assignment of their constants a well-defined linear functional. Extend it and evaluate the basis vectors. Conversely, prescribe additivity, scalar multiplication, and the given subspace values as a system of linear equations. Finite-dimensional linear algebra solves every finite subsystem.

Expanding coordinates in one finite basis reduces a finite-field system to its prime field. Therefore E and U imply linear compactness over every finite field.

**Source correction:** the Howard–Rubin form equivalent to BPI concerns arbitrary **polynomial** equations, not just linear equations. An informal online discussion conflated these. Herrlich–Tachtsis explicitly distinguishes them and records a ZFA separation of finite-field linear compactness from BPI. Thus the new lower bound must not be advertised as a BPI equivalence.

### 6.3 Torsion characters

The same group-algebra method proves: if \(B\subseteq A\) are abelian groups and \(A/B\) is torsion, then every homomorphism \(B\to\mathbb Q/\mathbb Z\) extends to \(A\), assuming E and U.

Use the concrete cyclotomic field \(\mathbb Q(\mu_\infty)\), the free group \(\mathbb Z^{(A)}\), and the preimages of \(0\) and \(B\). Torsion of the quotient makes the resulting large field algebraic over the intermediate field. The quotient of a monomial's image under the extended automorphism by the original monomial has a positive power equal to a prescribed root of unity; hence it is a root of unity. All roots of unity already lie in the specified cyclotomic field. Unique specification gives the character, with no simultaneous choice of exponents.

The restriction on the quotient is essential to this proof. If it is not torsion, the large field need not be algebraic over the intermediate field, so U cannot be applied to it as a closure of that base. An arbitrary automorphism lift would also not force the monomial quotient to be a root of unity. Adjoining rational powers does not repair either gap.

## 7. Exact reformulations of U

For two fixed existing closures \(L,M\) of \(K\), the following are equivalent in ZF:

1. They are isomorphic over \(K\).
2. They have compatible embeddings into a common field.
3. \(L\otimes_K M\) has a prime ideal.
4. The canonical inverse system \((\operatorname{Iso}_K(L_f,M_f))_f\) has a nonempty inverse limit.

In a common field, the two embedded closures coincide: every element of either is annihilated by a base polynomial which already splits in the other. An isomorphism supplies a prime kernel on the tensor product. A prime quotient embeds both fields into its fraction field. Restrictions and unions give the inverse-limit equivalence.

The tensor product is nonzero in ZF: use finite subextensions and their finite-dimensional tensor products. Nonzeroness does not itself supply a prime ideal.

For comparison, the unrestricted assertion that every directed inverse system of nonempty finite sets with surjective bonding maps has a point is equivalent to BPI. The reverse implication uses the sets of ultrafilters of finite Boolean subalgebras. The field systems above form a special class; no representation theorem for arbitrary such systems has been established.

### Why the most direct BPI encoding fails

Finite splitting-field isomorphism sets are torsors. Restriction is equivariant for a surjective group homomorphism, so its fibers all have the same size. The map on atoms when one atom of a two-atom Boolean algebra is split into two has fibers of sizes 1 and 2. It cannot literally be such a torsor restriction map.

Even a universal finite padding with uniform fibers is obstructed. If padded torsors mapped onto the Boolean atoms compatibly, their uniform counting probabilities would induce a strictly positive finitely additive rational probability on every Boolean algebra. Applied to the power set of \(\omega_1\), this would assign positive mass to every singleton. For each positive integer \(n\), only finitely many singletons could have mass at least \(1/n\). Their countable union would make \(\omega_1\) countable; the finite subsets here have canonical ordinal orders, so no hidden choice is needed for that contradiction.

This rules out that particular padding scheme. It does not rule out every possible field encoding of BPI.

## 8. Countability and well-orderability

ZF constructs a well-orderable closure of every well-orderable field, and a countable closure of every countable field. One direct construction well-orders the simultaneous splitting ring and deterministically grows a proper ideal, adjoining the next element precisely when properness is retained. At limits take unions. The final ideal is maximal. This uses no arbitrary-ring maximal ideal theorem and no BPI.

Two well-orderable closures are isomorphic by transfinite recursion: process the source well-order and send the next algebraic generator to the least appropriate root in the target well-order.

The following exact correspondences were checked:

- AC_fin^WO iff every algebraic extension of every well-orderable field is well-orderable.
- AC_omega^fin iff every algebraic extension of every countable field is countable.
- Assuming E, uniqueness restricted to well-orderable base fields iff AC_fin^WO.
- Assuming E, uniqueness restricted to countable base fields iff AC_omega^fin.

For the forward extension statements, choose finite orderings of the finite root sets and encode an element by its first annihilating polynomial and position in that root set. For the converse, the symmetric-coefficient construction of Section 4 gives a well-orderable or countable base whenever the original finite-set family has that kind of index set.

For a **fixed countable field K**, uniqueness of its algebraic closure is equivalent to each of: every closure is countable; every closure is well-orderable; every closure's carrier is linearly orderable. A linear order orders each finite root set; least polynomial index and root rank give a countable code.

These statements do not identify uniqueness for one specific field, such as \(\mathbb Q\), with unrestricted countable finite choice.

## 9. Purely inseparable extensions are not the obstruction

The perfect closure is canonical in ZF. In characteristic \(p\), use the direct limit of the explicitly specified Frobenius maps \(K\to K\to\cdots\). In characteristic zero leave the field unchanged. Purely inseparable roots are unique, so every existing algebraic closure contains a unique compatible copy of the perfect closure.

It follows that E and U can each be restricted to perfect base fields without changing their strength. They are respectively equivalent to existence and conditional uniqueness of separable closures: take the maximal separable subfield of an existing algebraic closure, and conversely take the canonical perfect closure of a separable closure.

U also extends embeddings between **existing** closures. Inside a target closure, the elements algebraic over the embedded smaller base form a closure of that base. U compares it to the supplied source closure. This yields automorphism extension in particular. It supplies no closure for a field not already known to have one.

## 10. First countermodel: U and failure of E in ZFA

Use the basic Fraenkel model: an infinite atom set \(A\), all permutations of \(A\), and finite supports.

The key algebraic fact is elementary. An involution of an algebraically closed field of characteristic 2 is trivial. In other characteristics, an involution fixing a specified square root of −1 is trivial. The proof in characteristic 2 uses \(\sigma(t)=t+1\), puts \(c=t^2+t\), chooses \(y^2+y=ct\), and computes that \(s=y+\sigma(y)\) is fixed with \(s^2+s=c\). Hence \(s+t\in\{0,1\}\), forcing \(t\) fixed. In other characteristics, take a moved difference \(b=a-\sigma(a)\), a square root \(y\), and derive \(\sigma(y)=\pm iy\), contradicting \(\sigma^2(y)=y\).

For any internal algebraically closed field, take a finite support for its carrier and operations, enlarged to support \(i\) when necessary. Transpositions outside this support act trivially by the involution fact. Finite permutations do too. Every arbitrary permutation fixing the support agrees on any further finite support with a finite permutation, so it also fixes every field element.

An ambient well-order of the field is consequently supported and internal. Thus all internal algebraically closed fields are well-orderable, and U follows.

The rational function field \(\mathbb Q(X_a:a\in A)\) has no closure internally: such a closure would be well-orderable and would well-order its injected copy of \(A\). The atom set has no supported well-order. Therefore E fails.

The construction is a known argument, with the uniqueness component attributed to Pincus in Howard–Rubin Note 41 and reiterated in modern Banerjee work. The supplied characteristic-two calculation avoids relying on an unstated full Artin–Schreier theorem.

## 11. Second countermodel: E and failure of U in ZFA

### 11.1 The model

In an ambient model of ZFA with choice, let the atoms carry an external copy of \(\overline{\mathbb F_p}\). Let \(g\) be Frobenius and let \(G=\langle g\rangle\cong\mathbb Z\). Use the normal filter generated by \(H_n=\langle g^n\rangle\), \(n\ge1\).

This is the finite-atom-support filter: an atom of exact degree \(n\) has stabilizer \(H_n\), and intersections correspond to least common multiples. Every hereditarily symmetric object has a finite orbit under \(G\). Every finite collection of objects has a common \(H_n\)-support. A single common support for all objects is not asserted.

### 11.2 Closures for arbitrary internal fields

Let an internal field \(K\) have common support \(H_n\) for carrier, operations, and constants. The actual ambient permutation \(g^n\) induces a locally finite automorphism \(\sigma\) of \(K\).

Using ambient choice, choose a closure \(\Omega/K\) and extend \(\sigma\) to an automorphism \(\tau\) of \(\Omega\). It is locally finite. If \(\alpha\) is algebraic over \(K\), some positive power of \(\sigma\) fixes the finitely many coefficients of a polynomial annihilating \(\alpha\). The corresponding power of \(\tau\) permutes its finite root set; a further power fixes \(\alpha\).

The supporting group is **infinite cyclic**, so declaring its generator to act as \(\tau\) imposes no additional finite-order relation.

Each finite \(H_n\)-orbit of length \(m\) can be represented by an atom orbit: an atom of degree \(nm\) has orbit length \(m\) under \(g^n\). Use ambient choice to code the new orbits of \(\Omega\setminus K\) by such orbits with distinct pure ordinal tags. A further high-rank pure tag makes the new codes disjoint from \(K\); leave \(K\) unchanged.

Transport the field operations along this equivariant coding. The new carrier, operation graphs, constants, and inclusion of \(K\) are \(H_n\)-invariant and hereditarily symmetric. They are therefore internal. Algebraicity and algebraic closedness hold internally because polynomials and their coefficient lists are finite objects, and all roots in the coded carrier are already internal elements.

This supplies a closure for **every** internal field. The external choices need not be internal; the support calculation is what makes each completed witness internal. No global internal function choosing closures is claimed.

### 11.3 Failure of uniqueness and finite choice

The atom field and the ordinary pure copy of \(\overline{\mathbb F_p}\) are closures of the same pure \(\mathbb F_p\). An internal isomorphism would have support \(H_n\). Its target is pointwise fixed by all permutations, so injectivity would force \(g^n\) to fix all atoms. An atom of degree \(n+1\) contradicts this.

Let \(D_m\) be the finite nonempty set of atoms of exact degree \(m\). The sequence \((D_m)_{m\ge1}\) is invariant. A selector supported by \(H_n\) would select in every \(D_m\) an atom fixed by \(g^n\), requiring \(m\mid n\) for every \(m\). Thus countable finite choice fails.

The complete construction received three independent mathematical audits. The general monothetic permutation-model architecture is present in Brunner–Rubin (1986); a published source for this particular universal-E argument has not been located in the checked literature. That is not evidence of novelty.

## 12. Multiple Choice explains a transfer obstruction

The cyclic model satisfies MC. For a supported family, select orbit representatives externally. For a representative member \(X\), take one \(x\in X\) externally and its finite orbit under the stabilizer of \(X\). Transport this finite subset around the family orbit. The resulting finite-subset selector is equivariant, supported, and internal.

A separate exact theorem was proved:

\[
\mathrm{MC}\quad\Longleftrightarrow\quad
\text{every set is a well-ordered union of finite sets}
\quad\Longleftrightarrow\quad
\text{every field is algebraic over a well-orderable subfield}.
\]

These equivalences hold in ZFA. The first equivalence is the classical well-ordered-cover form of Multiple Choice. For its forward direction, repeatedly remove the finite subset specified by one multiple-choice function; the recursion stops before the Hartogs ordinal of the power set. Conversely, for a tagged family take the first finite cover block meeting each fiber.

For the field direction, take the coefficients of the finite block polynomials \(\prod_{b\in B_\alpha}(T-b)\). They generate a well-orderable subfield over which all elements are algebraic. Conversely, apply the field assertion to \(\mathbb Q(t_x:x\in X)\). Each element of a well-orderable coefficient subfield has a unique least finite variable support. These supports cover \(X\), since an omitted variable would remain transcendental. The finite-support intersection identity is proved by comparing coefficients in rational-function identities.

In pure ZF, MC implies full AC. One way to see the relevant rank step is that MC well-orders every linearly ordered set, hence every power set of an ordinal. Fixing one well-order of a sufficiently large ordinal power set then permits a uniform recursion through a bounded rank hierarchy. The PDF includes this argument.

Therefore the cyclic model's **entire theory**, including MC and failure of finite choice, cannot transfer to pure ZF. This does not prove that the smaller conjunction E with failure of U is untransferable.

MC alone does not explain the existence result in ZFA. In the finite-pairs permutation model MC holds, but flipping a pair outside a closure's support contradicts the same involution lemma. The free infinite cyclic lift is the extra mechanism used in Section 11.

## 13. Earlier transfer obstruction (the final forward separation uses direct forcing)

### 13.1 Separate negative transfers do not combine the positive universals

There is a pure-ZF consistency result for failure of E, using Läuchli's construction and Pincus's transfer. There is also a pure-ZF model with a nonstandard algebraic closure of \(\mathbb Q\) that has no real-closed subfield, from Läuchli's construction and Jech–Sochor transfer, discussed by Hodges. It refutes U already over \(\mathbb Q\).

These are separate results. Neither establishes a model of U with failure of E, or E with failure of U, in pure ZF.

Jech–Sochor preservation of a bounded atom structure can preserve the particular bad field or pair of closures. E and U quantify over all fields in the target universe, including newly introduced fields. Their preservation requires another theorem with verified hypotheses.

The injectively boundable transfer formulations checked in Tachtsis's exposition have explicit cardinal bounds and quantifier forms. Failure of E starts with one bad field and can exploit a cardinal dichotomy for proposed closures. Positive E requires closures for arbitrary fields, without that same bound. Reversing the negative transfer argument is not justified.

### 13.2 Forcing names do not act on an evaluated field like atoms

The atom-model proof uses genuine permutations of the ambient membership universe, and therefore genuine automorphisms of a supported field. A forcing automorphism acts on names and moves the generic filter. It need not induce an automorphism of an evaluated field at a fixed generic.

A concrete warning is the real field: a forcing automorphism may swap names for two generic reals while preserving a name for the real field. Every field automorphism of the real numbers is nevertheless the identity, since it preserves positivity, hence order, and fixes the dense rational subfield.

There is also a precise failure of a finite-root-period shortcut for Boolean-valued names. Let a three-atom Boolean algebra have a cyclic coordinate action, and use the constant algebraic-number sheaf. A name equal to +1 on one Boolean atom and −1 on the other two solves \(T^2-1\), with invariant coefficients, but its orbit has length 3. The bound \(2!\) does not fix it. Over \(\mathcal P(\mathbb Z)\) with shift, the analogous singleton sign mixture has infinite orbit.

These examples do not disprove the existence of a better chosen equivariant root lift: the constant root 1 works in the example. They identify why the atom proof's local-finiteness inference does not carry over unchanged.

### 13.3 Gluing small closures

Every field is a directed union of finitely generated subfields, and each of those is countable and has a countable closure in ZF. To glue the closures one must choose compatible transition embeddings. U says suitable closures are isomorphic; it does not specify unique comparison maps. The resulting isomorphism groupoid is connected but can have nontrivial automorphisms.

Quotienting by all comparison maps is invalid. It would, for example, identify \(\sqrt2\) with \(-\sqrt2\) and collapse a characteristic-zero field. Likewise, extending a fixed small closure across another algebraic extension is an amalgamation problem, exactly where the missing prime-ideal or compatibility assertion reappears.

## 14. No-go arguments and exact limits

The following record distinguishes a disproved method from an unresolved theorem.

| Route | Verified obstruction or missing premise | What is not concluded |
|---|---|---|
| Apply ordinary Zorn arguments | They invoke a choice principle stronger than the stated antecedent | Neither implication E→U or U→E follows |
| Iterate existential root-adjoining steps | A sequence of witnesses may require dependent choice | The simultaneous BPI proof avoids this issue |
| Evaluate every labelled splitting variable in an arbitrary closure | Simultaneous root enumerations require finite choice | E alone has not supplied the evaluation |
| Choose one isomorphism at each finite stage | Restriction compatibility is missing | Pointwise selection does not produce an inverse-limit point |
| Apply E to \(L\otimes_KM\) | This is a ring, often with zero divisors; E applies to fields | Finding a field quotient is the missing prime-ideal step |
| Use the identity in an inverse limit of groups | Isomorphism torsors have no distinguished identity point | Group identities do not solve unpointed torsors |
| Identify all finite-set inverse systems with Galois torsors | Restriction fibers of the latter are uniform | No general realization theorem follows |
| Uniformly pad arbitrary Boolean atom systems by finite torsors | It would induce impossible strictly positive measures on all Boolean algebras | More elaborate encodings remain open |
| Promote a bad closure of \(\mathbb Q\) to E∧¬U | Universal E has not been verified in that model | A local failure of U is not the requested simultaneous countermodel |
| Promote the Fraenkel U∧¬E model to pure ZF | Preservation of global U is unproved | Atoms and pure sets must remain distinguished |
| Transfer the entire cyclic model theory | MC together with failure of finite choice is impossible in pure ZF | Transfer of only E∧¬U is not thereby ruled out |
| Extend an automorphism through a finite cyclic support group | A lift may violate the finite-order relation | The infinite cyclic support group avoids this specific obstruction |
| Evaluate raw forcing-name permutations as field automorphisms | Names and generics transform together; the real-field example disproves the naive rule | A more careful symmetric construction may still exist |
| Use a finite-root factorial bound on arbitrary Boolean names | Semilinear coordinate changes move root mixtures | This refutes that bound, not every equivariant lift |
| Extend the Kummer argument to arbitrary nontorsion quotients | Algebraicity over the intermediate base and root-of-unity range both fail | Unrestricted character extension is not proved |

There is an absolute obstruction to one particularly strong local-to-global idea: **there is no algebraic-closure functor on all fields and field embeddings with natural base embeddings, even assuming AC.** In characteristic 2 take \(K=\mathbb F_2(t)\) and the involution \(t\mapsto t+1\). Functoriality would induce an involution of the chosen algebraic closure, which the elementary lemma forces to be the identity, contradicting naturality. The characteristic-zero variant uses \(\mathbb Q(i,t)\) and \(t\mapsto-t\) fixing \(i\). This does not rule out a coherent choice for a particular directed diagram.

## 15. Source audit

Sources below are used with their exact foundational scope. Informal web discussions supplied discovery leads, not substitutes for primary mathematical evidence.

| Source | Checked material and use | Limitation |
|---|---|---|
| B. Banaschewski, *Algebraic closure without choice* (1992), [DOI](https://doi.org/10.1002/malq.19920380136) | Full three-page paper; BPI suffices for existence and uniqueness | Does not settle the converses |
| T. Jech, *The Axiom of Choice* (1973), [scanned edition](https://gwern.net/doc/math/1973-jech-theaxiomofchoice.pdf) | Theorems 9.1 and 10.13; MC/pure-ZF distinction and the failure-of-E construction/transfer | Transfer of failure of E is not transfer of U∧¬E |
| P. Howard and J. E. Rubin, *Consequences of the Axiom of Choice* (1998), [DOI](https://doi.org/10.1090/surv/059) | Forms 14, 69, 233, 241, 242; matrix legend and Note 41 | Historical catalogue; no claim that its zeros certify current openness |
| [Choiceless Grapher repository](https://github.com/ioannad/jeffrey) | Author-supplied historical matrix and form text; checked repository revision 75d800d0ac4f6ca1494cb22b19446edfac4fd979 | Repository update date is not a new theorem date |
| H. Läuchli, *Auswahlaxiom in der Algebra* (volume 37, 1962/63), [scanned volume](https://gdz.sub.uni-goettingen.de/download/pdf/PPN358147735_0037/PPN358147735_0037.pdf) | Original field chapter, printed pages 5–8, inspected from the scan | Gives the classical constructions; no global-E cyclic theorem located there |
| W. Hodges, *Läuchli's algebraic closure of Q* (1976), [DOI](https://doi.org/10.1017/S0305004100052282) | Publisher abstract and attribution checks | Full original article not obtained in this edition; do not assign the earlier transfer to Hodges |
| D. Pincus, *Zermelo–Fraenkel consistency results by Fraenkel–Mostowski methods* (1972), [DOI](https://doi.org/10.2307/2272420) | Publisher metadata and transfer context | Full original proof not obtained; no unverified transfer application asserted |
| E. Tachtsis, *The Boolean prime ideal theorem does not imply the extension of almost disjoint families to MAD families*, [DOI](https://doi.org/10.4064/ba201014-22-1) | Definitions 5.2–5.3 and Theorem 5.5 for transfer hypotheses | No demonstration that global E or U has the required form |
| A. Banerjee, *Partition models, permutations of infinite sets without fixed points, and weak forms of AC*, [arXiv](https://arxiv.org/abs/2109.05914) | Introduction and Theorem 3.3, accepted revision 2023 | Explicitly ZFA nonimplications |
| A. Banerjee and A. Gopaulsingh, *On the Erdős–Dushnik–Miller theorem without AC* (2023), [DOI](https://doi.org/10.4064/ba221221-6-6) | Section on uniqueness in further permutation models | Explicitly ZFA |
| H. Herrlich and E. Tachtsis, *On the solvability of systems of linear equations over the ring Z of integers* (2017), [primary PDF](https://cmuc.karlin.mff.cuni.cz/pdf/cmuc1702/tachtsel.pdf) | Pages 243–244 distinguish linear and polynomial compactness | The cited strict nonimplication is in ZFA |
| P. Howard and E. Tachtsis, *On vector spaces over specific fields without choice* (2013), [DOI](https://doi.org/10.1002/malq.201200049) | Exact theorem references located through the preceding primary paper | No new full-text verification claimed here |
| M. Morillon, *Linear forms and axioms of choice* (2009), [primary PDF](https://cmuc.karlin.mff.cuni.cz/pdf/cmuc0903/moril.pdf) | Names and relations among linear-extension and separation principles | The report supplies its own needed equivalence proof |
| A. Karagila, *Iterated failures of choice*, [arXiv:1911.09285](https://arxiv.org/abs/1911.09285), version 3 (2021) | Sections 5.2 and 6 on symmetric field copies and unresolved closure behavior | Does not establish universal E in the relevant exotic-closure models |
| N. Brunner and J. E. Rubin, *Permutation models and topological groups* (1986), [primary PDF](https://www.numdam.org/item/RSMUP_1986__76__149_0.pdf) | Monothetic/cyclic permutation-model architecture and finite-choice behavior | No algebraic-closure result found in the inspected text |
| T. Sander, *Existence and uniqueness of the real closure of an ordered field without Zorn's Lemma* (1991), [DOI](https://doi.org/10.1016/0022-4049(91)90110-N) | Publisher abstract confirms the choice-free real-closure theorem | Earlier finite-choice proof using it was superseded; later transfer-obstruction application remains separately labelled |

### 15.1 The matrix code correction

The checked historical matrix entries are:

| From | To | Code |
|---|---|---:|
| BPI, Form 14 | E, Form 69 | 1 |
| BPI, Form 14 | U, Form 233 | 1 |
| E, Form 69 | U, Form 233 | 0 |
| E, Form 69 | BPI, Form 14 | 0 |
| U, Form 233 | E, Form 69 | 5 |
| U, Form 233 | BPI, Form 14 | 6 |

The book's legend distinguishes ZF nonimplications (codes 3/4) from nonimplications in its atoms-allowing theory (codes 5/6). Transfers have separate markings. A code 0 records no implication status in that table. It is not by itself a certificate of current or historical pure-ZF openness. In particular, an informal statement that U does not imply E must not silently lose the ZFA qualification of its actual model proof.

### 15.2 Access and provenance notes

Several initial original-paper links returned errors or challenge pages. Such content was not treated as a paper. The Läuchli article was subsequently recovered from a public scanned journal volume and its field chapter inspected. No access-control bypass was attempted. Sources that remained available only as abstracts or through exact secondary references are labelled that way above.

## 16. Earlier deliverable checkpoint and research obligations

The report is being authored as a standalone LaTeX document, with the requested PDF and this Markdown record as the main deliverables. The current 21-page edition has been compiled twice and all pages rendered and visually inspected; the final pass has no LaTeX warnings. It remains a working research edition rather than a claim that the original stopping condition has been reached.

The native editor compiler was attempted but could not download its uncached Tectonic bundle. That was an environment/dependency failure, not evidence of a source error. Terminal compilation is an independent route; it must not be described as successful native-editor validation.

The checkpoint verification covered cross-references, bibliography entries, all rendered PDF pages, and overflow/clipping. Further edits will require a fresh artifact check. Compilation and finite computational checks are not evidence for an infinite set-theoretic theorem. The proof audits remain mathematical audits.

### Remaining research obligations

1. Continue both central implications over pure ZF, respecting the original time window unless the user accepts a ZFA early stop or a pure-ZF countermodel/equivalence is found.
2. Continue from the now-proved finite-group correspondence: test P/T implies E, U alone implies P/T, and any correspondence with a standard unrestricted choice principle.
3. Investigate whether the cyclic action can be represented by a valid symmetric-forcing construction with universal E, avoiding the name-action and Boolean-mixture gaps.
4. Investigate pure-ZF U with failure of E, and whether rank arguments yield additional consequences of U alone.
5. Keep E alone, U alone, and their conjunction separate in every choice-strength claim.
6. Incorporate any new checked results, then compile, render, inspect, and deliver the final PDF and Markdown with the exact remaining uncertainty stated.

## 17. Progress checkpoints

- **Initial phase, 14:44–15:00 UTC:** fixed conventions; checked BPI upper bound; reconstructed the basic Fraenkel countermodel; caught the ZFA/pure-ZF matrix distinction; derived restricted finite-choice consequences.
- **Second phase, approximately 15:00–15:12 UTC:** strengthened the conjunction's lower bound to full AC_fin; constructed and independently audited the cyclic Frobenius model; established exact tensor and inverse-limit formulations; drafted and compiled the first report.
- **Third phase, approximately 15:12–15:25 UTC:** added root-selected existence, perfect/separable reductions, automorphism-extension and nonfunctoriality arguments, the MC/field correspondence, and the Kummer linear-compactness and torsion-character lower bounds. Located original Läuchli scans and additional primary literature.


## 18. An exact finite-group correspondence, now proved

All inverse systems below are indexed by nonempty directed partially ordered sets. The groups and all maps are supplied as part of the data.

- **P:** for every inverse system of finite groups with surjective bonding homomorphisms, every projection from its inverse limit onto a stage group is surjective.
- **T:** every inverse system of nonempty finite torsors, with surjective compatible equivariant bonding maps and surjective bonding homomorphisms on their acting groups, has a coherent point.

A torsor is a set with a free transitive action. The group inverse limit always contains its identity family in ZF. Therefore mere nonemptiness of group inverse limits is vacuous; P requires lifting every specified coordinate element.

The checked implications are

\[
P\iff T\quad\Longrightarrow\quad U\wedge\mathrm{AC}_{\mathrm{fin}},
\qquad E\wedge U\Longrightarrow P.
\]

Consequently, **under E**, conditional uniqueness is equivalent to P and to T. The existence hypothesis is retained. Neither P implies E nor P implies BPI has been proved here.

### 18.1 From torsors to projections and back

For T implies P, fix an element at one stage. On the cofinal upper cone, its fibers are nonempty torsors under the kernels of projection to that stage. The kernel bonding maps are onto. T supplies compatible lifts. Directedness makes their extension to all indices unique, without choosing upper bounds simultaneously.

For the reverse implication, put \(Z_i=G_i\sqcup X_i\), with its two regular left orbits, and let \(H_i\) be the group of equivariant permutations of \(Z_i\). It maps onto \(C_2\) by its permutation of the two components. The quotient map \(Z_j\to Z_i\) has fibers precisely the orbits of \(\ker(G_j\to G_i)\), so every equivariant permutation descends uniquely. The resulting homomorphism \(H_j\to H_i\) is onto: for this one verification choose one point upstairs and identify both components with regular group sets; an equivariant permutation is a component permutation and two right translations, whose parameters have lifts. These are finitely many choices for one verification, not a chosen family of torsor points.

Adjoin a least stage \(C_2\). P lifts its nonidentity element to a compatible family of component exchanges. Evaluating those exchanges at the identity in each \(G_i\) gives compatible elements of \(X_i\).

Finite-bijection torsors prove T implies AC_fin. The finite splitting-field isomorphism torsors prove T implies U. In this latter proof the index ranges over finite sets of **nonzero monic polynomials**. An adversarial audit caught and repaired an earlier wording that allowed zero: zero has every field element as a root and would destroy the claimed finiteness.

### 18.2 Realizing finite-group systems by fields

For each finite group \(G_i\), let

\[
L_i=\mathbb Q(x_{i,g}:g\in G_i),\qquad K_i=L_i^{G_i},
\]

with left translation on variables. Artin's finite fixed-field theorem holds in ZF. An orbit polynomial bounds the degree of every element by \(|G_i|\); finite separable subextensions have primitive elements and hence the same bound. One independent tuple of maximal possible finite length is a basis. The finite embedding bound identifies the full Galois group with \(G_i\).

For a surjection \(\pi_{ji}:G_j\to G_i\), use the canonical embedding

\[
x_{i,g}\longmapsto\sum_{\pi_{ji}(h)=g}x_{j,h}.
\]

Disjoint supports give algebraic independence: a finite choice of one representative in each fiber proves that a polynomial-ring retraction exists. The representatives are not used to define the embedding. Fiber sums compose exactly and respect the group actions. Take the directed colimits \(K\subseteq L\); then \(L/K\) is algebraic.

A prescribed element of \(G_{i_0}\) extends to an automorphism of \(K L_{i_0}\) fixing K. The crucial check is well-definedness: each relation among the finitely many coefficients concerned occurs in a common stage j, and one lift to \(G_j\) preserves that relation. No coherent family of lifts is assumed. E supplies a closure C of L; U extends this automorphism to C by comparing the identity and twisted base embeddings. Normality preserves every stage \(L_j\). Its restrictions give uniquely specified compatible elements of the groups, proving P.

### 18.3 Why the homogeneous-space generalization is unfinished

A finite transitive group action need not be free. For a nonregular orbit X, the group of equivariant permutations of \(G\sqcup X\) cannot exchange its components, because their stabilizers differ. Even after AC_fin supplies arbitrary points at every stage, compatibility becomes membership in possibly nonnormal stabilizer cosets, rather than the torsor equalities above. This is a specific obstruction to that reduction, not a proof that no other reduction exists.

## 19. Consequences of U alone

### 19.1 A closure that does not require E

Lombardi–Roy's full primary proof establishes a real closure for every **ordered** field in ZF, with unique ordered comparison maps. For a linearly ordered set S, order finite-support exponent vectors by their last differing coordinate and order rational functions by the sign of the leading coefficient. This orders \(\mathbb Q(t_s:s\in S)\) without a well-order of S. Its real closure R gives the algebraic closure \(R(i)\).

The same field contains an embedded copy of \(\mathbb Q(\zeta_p)(t_s:s\in S)\). One primitive root suffices for the coefficient embedding; a finite norm argument verifies that the variables remain algebraically independent. The standard real algebraic numbers embed uniquely as an ordered subfield of R, so the standard cyclotomic field \(\mathbb Q(\mu_\infty)\) also embeds coherently. No family of roots of unity is independently chosen.

This removes E from the Kummer proof whenever the free-variable index set is linearly orderable. In particular:

1. Under U, every functional on a subspace of an \(\mathbb F_p\)-vector space extends if that vector space has a spanning family indexed by a linearly orderable set.
2. Under U, a character \(B\to\mathbb Q/\mathbb Z\) extends to an abelian group A with torsion quotient A/B if A has such a generating family.

The carrier of the vector space or group itself need not be linearly orderable; the supplied covering family is enough.

### 19.2 Finite choice on images of linearly ordered sets

Assume U and a surjection \(q:S\to X\) with S linearly ordered. For every finite \(D\subseteq X\) of size \(n_D>1\), form

\[
T_D=(\mathbb Z/n_D\mathbb Z)^{(D)},\qquad T=\bigoplus_D T_D.
\]

Finite tuples from S cover all labels \((D,x)\), by sending a tuple to its image set and its first image. Length followed by lexicographic order linearly orders this covering index set. The elements \(u_D=\sum_{x\in D}e_{D,x}\) generate a direct sum H of cyclic groups of orders \(n_D\). Define \(\chi(u_D)=1/n_D+\mathbb Z\), and extend this **one** character to T by the preceding U-alone theorem.

The labels \(h(e_{D,x})\), represented by \(j/n_D\) in \([0,1)\), cannot all agree: their sum would be zero, whereas it must be \(1/n_D\). The least-label fiber is a nonempty proper subset of D. Applying this specified operation finitely many times reaches a singleton and defines choices for all nonempty finite subsets of X.

Thus U implies finite choice for every family whose union is a surjective image of a linearly orderable set. One character handles all finite subsets at once; the shrinking process does not invoke dependent choice. The covering hypothesis has not been established for arbitrary sets.

### 19.3 Additive parity and failure of the Baire property

Apply the U-alone linear theorem to the linearly ordered set \(V=\mathcal P(\omega)\), viewed as an \(\mathbb F_2\)-space under symmetric difference, and extend finite-set parity. This gives

\[
h:\mathcal P(\omega)\to\mathbb F_2,\qquad
h(a\triangle b)=h(a)+h(b),\quad h(a)=|a|\bmod2\text{ for finite }a.
\]

The set \(h^{-1}(1)\) has no Baire property. Flipping one coordinate interchanges it with its complement. If it were meager, both sets would be meager. If it were comeager in a nonempty basic cylinder, flipping a coordinate outside that cylinder's finite support would make both sets comeager there. Both alternatives contradict the Baire theorem for Cantor space.

That particular Baire theorem is provable in ZF: a specified sequence of nowhere-dense sets is avoided by recursively taking the first suitable basic cylinder in a fixed enumeration, with lengths increasing. The construction has uniquely specified successors and uses no dependent choice.

An arbitrary parity function is equivalent to choosing one of the two even-finite-difference classes inside each finite-difference equivalence class. Our conclusion is stronger because the function is additive. Serafin's 2023 model shows that an arbitrary parity function need not yield a free ultrafilter, relative to an inaccessible cardinal. His theorem does not settle that converse for the stronger additive property obtained here.

### 19.4 Explicit twisted closures under the all-Baire hypothesis

If every subset of Cantor space has the Baire property, use the p=2 Kummer construction with \(V=\mathcal P(\omega)\), W the finite subsets, and finite parity f. It defines a field F, an automorphism \(\sigma\), and a choice-free closure \(C=R(i)\). An extension of \(\sigma\) to C would give the impossible parity function. Therefore

\[
(C,\iota),\qquad(C,\iota\circ\sigma)
\]

are nonisomorphic closures over the specified base F. Both F and C have linearly orderable carriers, since \(C\cong R^2\) as sets. This proves that linearly orderable carriers do not suffice for uniqueness. It does **not** establish universal E in an all-Baire model.

### 19.5 Another precise pure-ZF transfer obstruction

In pure ZF, “every algebraically closed field is well-orderable” is equivalent to AC. Every linearly ordered set injects into the choice-free closure just constructed, so that assertion makes every linearly ordered set well-orderable. In particular \(\mathcal P(\kappa)\) is well-orderable for every ordinal \(\kappa\).

For a fixed limit rank \(V_\alpha\), take its Hartogs ordinal \(\kappa\) and one well-order of \(\mathcal P(\kappa)\). A uniquely prescribed recursion orders every preceding rank: at successors pull back that fixed power-set order using the already constructed ordinal enumeration, and at limits order by first rank and then by the earlier order. This orders \(V_\alpha\), and hence every set. Consequently the basic Fraenkel model's stronger property about all algebraically closed carriers cannot transfer with failure of AC. This does not rule out transferring U itself.

## 20. Further pure-ZF model obstructions

A valid repair of the Boolean-period argument requires more than fixing polynomial coefficients. If a semilinear automorphism \(\tau\) acts on a Boolean-valued field over a complete Boolean algebra B, and \(\tau^n\) fixes **all of B pointwise** as well as the coefficients of a nonzero degree-d polynomial, then \(\tau^{n d!}\) fixes every root section. It is now an internal permutation of at most d roots. The earlier Boolean-mixture examples violate the pointwise-B hypothesis.

The fixed subalgebras \(B_n=\operatorname{Fix}(g^n)\) are complete, and their union contains the periodic Boolean elements. Locally finite closure lifts over separate \(B_n\)'s suggest a restricted construction, but their coherent amalgamation preserving the original field has not been established.

Arbitrary equivariant algebraic closures cannot simply be glued. Over Q, give one copy of Q(i) the identity action and another complex conjugation; no field can amalgamate these copies equivariantly. A stronger example survives every finite-power repair: over \(\mathbb F_p\), compare two standard algebraic closures with actions identity and Frobenius. Any common embeddings have the same image, while no positive Frobenius power fixes that image pointwise.

Compact profinite groups do not automatically repair the inner symmetry used in atom replacement. A continuous action of a compact group on a discrete set has finite orbits. The usual coordinate-moving homogeneity proof needs an element's orbit to escape every prescribed finite forbidden set. It therefore cannot work unchanged with these finite orbits. A different support topology, a noncompact group, or another coding theorem would be required.

There is also no cyclic operation \(F^n\to F\), n>1, preserving addition, multiplication, zero, and one for a field F. Such a map is a unital ring homomorphism. Cyclicity makes all coordinate idempotents have the same image c; their pairwise zero products force \(c^2=0\), while their sum forces \(nc=1\), a contradiction. Thus the cyclic averaging in the recent finite-CSP forcing theorem cannot be applied directly to full field structures.

These are obstructions to particular constructions, not impossibility theorems for the requested pure-ZF countermodels.

## 21. Updated primary-source checks

- **Lombardi–Roy (1991), Theorem 12**, [full primary article](https://www.numdam.org/article/PMB_1991____A3_0.pdf), DOI 10.5802/pmb.a-64: checked the choice-free real-closure proof; this now supports the U-alone section directly rather than relying on an abstract.
- **Geschke–Lubarsky–Rahn (2015), Theorem 10**, [author-hosted paper](https://www.math.fau.edu/people/faculty/lubarsky/choice-and-the-hat-game.pdf): the parity/Baire obstruction. Their question about a converse to free-ultrafilter implication must be read with the later correction below.
- **Serafin (2023), Theorem 8**, [arXiv:2311.07886](https://arxiv.org/abs/2311.07886): relative consistency of ZF + DC + a parity function + no free ultrafilter + no transversal for finite-difference equivalence. This concerns arbitrary, not necessarily additive, parity functions.
- **Kátay–Tóth–Vidnyánszky (2024), Theorem 1.2**, [primary text](https://arxiv.org/html/2310.00514v2): a single pure-ZF model has compactness for all finite templates admitting cyclic polymorphisms and fails BPI. Finite-field linear templates admit cyclic averaging in prime arities different from the characteristic; auxiliary partial sums encode general finite-support equations. Thus the linear-compactness lower bound alone is weaker than BPI even in pure ZF. The theorem does not assert E or U, and its finite-choice failures prevent using the model as a P/T example.

## 22. Checkpoint verification

The current 21-page PDF was compiled twice with terminal pdflatex after the latest changes. The final pass reported no undefined references, overfull boxes, underfull boxes, or other LaTeX warnings. Every page was rendered and inspected; the contents list now fits the title page, and no clipping or overlap was observed. This verifies the artifact presentation, not the mathematical theorems by computation.

The separate adversarial proof audit checked the P/T descent, surjectivity, generic-field compositum argument, finite Artin theorem, the real-closure and cyclotomic embeddings, the U-alone Kummer construction, the finite-choice shrinking argument, and the explicit ZF category proof. Its one required zero-polynomial correction is incorporated. The native editor remains unvalidated because its uncached compiler bundle could not be downloaded.

The goal remains active. The pure-ZF implication questions and the requested research window remain outstanding.


## 23. Stronger atom countermodels retaining dependent choice

Status: proof prepared and independently audited on 14 October 2026. The audit passed all stated ZFA conclusions. This is a ZFA construction. No pure-ZF transfer is asserted.

### 1. Ambient data and support filter

Work in an ambient universe of ZFA + AC. Let μ=2^aleph_0 and choose a cardinal κ>μ. Let G be the free group on the pure ordinal κ. Its cardinality is κ. Define the normal filter F to consist of every subgroup H≤G with [G:H]≤μ.

This is a proper normal filter: upward closure and conjugation preserve the index bound, and a finite intersection has index at most the product of the indices. It is countably complete because the index of an intersection of a countable family (H_n) is bounded by the cardinality of the product of the coset sets, which is at most μ^aleph_0=μ in the ambient universe. The trivial subgroup is excluded since |G|=κ>μ.

Choose the atoms A as a disjoint union, for every H in F, of one copy of the left G-set G/H. All these data form a set. G acts by left translations. Each H occurs as the stabilizer of the identity coset in its designated atom orbit. Thus F is exactly the normal filter generated by finite pointwise atom stabilizers. Every atom is symmetric. The action is faithful because free groups are residually finite and all finite-index subgroups occur.

Let N be the associated hereditarily symmetric universe. All claims below concern N, with ambient AC used solely to construct and verify its supported witnesses.

### 2. DC

Every ambient countable sequence (x_n) of elements of N belongs to N. Choose ambiently one H_n in F supporting x_n and use countable completeness to obtain H=intersection_n H_n in F. The sequence has support H, and its members and the pure natural-number tags are hereditarily symmetric.

If X,R belong to N and N says R is serial on nonempty X, the same seriality holds externally, because all elements of X are in N and membership in R is absolute. Ambient DC produces a sequence in X following R from any specified starting point. The preceding closure argument places that sequence in N. Hence N satisfies DC.

### 3. A realization lemma

Let H belong to F, and let Y be an ambient H-set such that every point stabilizer H_y has index at most μ in G. Suppose K⊆Y is H-invariant and already consists of the actual internally given objects on which H acts by atom permutations.

Then Y has an H-equivariant coded copy Y' retaining K literally, with all new elements hereditarily symmetric. To see this, choose externally an orbit representative y for each H-orbit in Y\K. The orbit H/H_y embeds equivariantly in the atom orbit G/H_y. Give its copy a distinct pure ordinal tag. Tags can have ranks greater than rank(K), so the coded new elements are disjoint from K. The full coded carrier is H-invariant. Every individual tagged atom is hereditarily symmetric, because its G-stabilizer is in F. The coding bijection need not itself belong to N; its H-equivariance is sufficient for transported H-invariant structure to belong to N.

The lemma needs no special finite-orbit condition. The index bound on each stabilizer is the relevant condition.

### 4. E for every internal field

Let K be an arbitrary field of N. Choose a common H in F supporting its carrier, operations, and constants. H acts by actual field automorphisms on K. Every subgroup of a free group is free, by the ambient Nielsen–Schreier theorem. Choose externally a free basis B of H.

Choose externally an algebraic closure Ω of K. For every b∈B choose an extension to an automorphism of Ω of its automorphism of K. The ordinary extension theorem and ambient AC permit these choices. The universal property of the free group gives an H-action on Ω extending the actual action on K. No defining relations have to be preserved beyond those of a free group.

For α∈Ω choose one nonzero polynomial over K annihilating α. A subgroup J in F contained in H fixes each of its finitely many coefficients, by intersecting their supports. The lifted J-action permutes the finite root set, so the stabilizer J_α has finite index in J. Therefore [G:J_α]≤μ, and the larger point stabilizer H_α also has index at most μ. Every Ω-element thus satisfies the realization lemma.

Realize Ω over the literal K and transport its operations. Carrier, operation graphs, constants, and base inclusion are H-invariant and hereditarily symmetric. Algebraicity and algebraic closedness hold internally: every internal polynomial has finitely many internal coefficients, and an external root in the coded field is already one of its internal elements. This is an internal algebraic closure of the arbitrary internal K. Thus N satisfies E.

### 5. Failure of U over a well-orderable pure field

Take the pure field F=Q(t_i:i<κ), and its pure multiquadratic extension L=F(sqrt(t_i):i<κ), constructed inside a pure ambient algebraic closure C_0 of F. The square classes of the independent variables are independent: any relation involves finitely many variables and follows to be trivial by their valuations, or by the finite multiquadratic degree calculation.

For each i<κ, there is an F-automorphism of L negating sqrt(t_i) and fixing all the other displayed square roots. These automorphisms generate a copy of the direct sum of κ copies of C_2, whose cardinality is κ. Send the i-th free generator of G to that automorphism and extend it externally to an automorphism of C_0. Freeness supplies a G-action on C_0 fixing F. Its image has cardinality at least κ, by restriction to L.

Every element of C_0 has a finite G-orbit, since it is algebraic over the fixed field F. Use the realization lemma with H=G, retaining F literally, to obtain an internal field C_1 that is an algebraic closure of F. The pure C_0 is also an internal closure.

If an isomorphism h:C_1→C_0 belonged to N, some H in F would support it. G acts trivially on the pure target. Equivariance and injectivity would give g(x)=x for every g∈H and x∈C_1. Hence H would be contained in the kernel of the G-action on C_1. That kernel has index at least κ>μ, incompatible with [G:H]≤μ. Thus there is no internal field isomorphism, even without requiring it to fix F. In particular U fails.

The pairs of roots of T^2−t_i in C_1 form an ordinal-indexed family with no choice function. An H-supported selector would force H to act trivially on every such pair, killing all independent sign changes and giving the same index contradiction. Therefore AC_κ^2 fails even though DC holds.

### 6. MC also fails

For i<κ, let φ_i:G→Z take the i-th free generator to 1 and all other generators to 0. Put J_i=kerφ_i. Its index is aleph_0≤μ, so A contains an orbit O_i isomorphic to the regular Z-set G/J_i. The family (O_i:i<κ) is G-invariant and belongs to N.

An internal multiple-choice function would select a nonempty finite subset of each O_i and would have a support H in F. A nonzero translation of Z cannot preserve a nonempty finite subset. Thus φ_i(H)=0 for every i. It follows that H is contained in the intersection of these coordinate kernels, which is [G,G]. The quotient G/[G,G] is free abelian of rank κ and cardinality κ, contradicting [G:H]≤μ.

Hence N satisfies E + DC + not U + not MC. This removes the specific MC-based obstruction that affected the simpler cyclic model. It does not remove the separate requirement of a valid simultaneous pure-ZF transfer theorem.

### 7. Generalization boundary and pending checks

The same construction suggests replacing μ by a cardinal with μ^lambda=μ and obtaining corresponding closure under lambda-sequences, but no broader claim is needed here. The proof uses the entire filter of subgroups with the stated index bound, not merely finite-index subgroups or a prespecified family of point stabilizers. Both the arbitrary-subgroup Nielsen–Schreier step and the universal orbit supply are essential.

The symmetric-forcing analogue remains unproved. Forcing automorphisms act semilinearly on names and Boolean values; the actual-field automorphism proof in section4 cannot be copied directly. A continuous lift with open root stabilizers would still be required.


## 24. Uniqueness with countable supports and dependent choice

14 October 2026. This independently audits the root agent's proposed strengthening of the basic Fraenkel construction. The construction passes. It is a **permutation model of ZFA**, using an ambient model with choice. No pure-ZF transfer or historical novelty is asserted.

The verified conclusions are

    ZFA + U + DC + not E + not AC_2.

In fact the same model satisfies choice for every well-ordered family of arbitrary nonempty sets (the principle often denoted AC_WO, with WO referring to the **index set**). This strengthening is proved separately below, so it cannot be confused with choice for families of well-orderable members.

### 1. Ambient data and the normal filter

Work in an ambient model M of ZFA+AC. Let A be its set of atoms, of uncountable cardinality in M, and let G=Sym(A) be the full ambient symmetric group. For an ambient at most countable S subset A, let

    Fix(S) = {g in G : g(s)=s for every s in S}.

Let F be the normal filter of subgroups consisting of those H<=G which contain Fix(S) for some such S. This is upward closed; finite intersections contain the stabilizer of the finite union; and conjugation sends Fix(S) to Fix(g[S]). It is proper because no countable S exhausts A and Fix(S) is nontrivial.

Moreover F is countably complete in M. If H_n contains Fix(S_n), choose these witnesses using ambient AC. The union S of the S_n is countable in M, and Fix(S) is contained in the intersection of the H_n.

Every atom is symmetric, since its singleton is an allowed support. The standard hereditarily symmetric universe N is therefore a model of ZFA containing every atom and every pure set of M. Here a permutation of atoms acts on actual sets by the usual rank recursion. These are genuine external automorphisms of the membership structure with atoms; there are no forcing names or evaluated-name actions in this proof.

### 2. Dependent choice

N is closed under countable sequences of its objects that exist in M. Indeed, let s:omega->N be a sequence in M. For each n choose in M a countable support S_n of s(n). Then S=union_n S_n is countable in M. Fix(S) fixes each value and every pure natural-number index, so it fixes the graph of s. Each constituent of the graph is hereditarily symmetric. Consequently s belongs to N.

Now let X and R belong to N, where X is nonempty and R is a serial relation on X. Seriality is absolute here: X has exactly the same elements in M and N, and R is the same relation on them. Ambient dependent choice gives an R-chain in X, with any prescribed initial point. Every term is in N because X is hereditarily symmetric. The preceding closure argument puts the chain itself in N. Thus N satisfies DC.

This only asserts closure under sequences present in the chosen ambient M. It does not claim closure under every sequence in an arbitrary larger metatheoretic universe. Nor does it assume that N has an internal choice function assigning supports.

### 3. Every permutation fixing S is a product of two involutions fixing S

Fix any subset S of A, and take pi in Fix(S). The assertion below is used in M, where choice is available. Decompose A minus S into the orbits of the cyclic group generated by pi, and choose one representative a_O in each orbit.

If O is finite of size n, write its points as pi^k(a_O), for k in Z/nZ. If O is infinite, write its points as pi^k(a_O), for k in Z. This exhausts all possibilities for an orbit of one permutation. In either cyclic index set define

    r(pi^k(a_O)) = pi^(-k)(a_O),
    s(pi^k(a_O)) = pi^(1-k)(a_O).

Then r^2=s^2=id and s(r(pi^k(a_O)))=pi^(k+1)(a_O). Put r=s=id on S. The orbitwise definitions produce permutations r,s of A with r,s in Fix(S), r^2=s^2=id, and pi=s r. Fixed-point orbits cause no difficulty; there n=1 and both maps are the identity.

The simultaneous choice of orbit origins is explicitly an **ambient** use of AC. We do not assert that this factorization theorem holds in arbitrary ZF or that its factors must themselves be objects of N. They are elements of the ambient group G, which is all that is required for a support argument.

### 4. The algebraic involution obstruction

For completeness, the elementary lemma used in the main report is repeated.

Let C be an algebraically closed field and sigma a field automorphism with sigma^2=id.

* If char(C) is not 2 and sigma fixes i with i^2=-1, then sigma=id. Otherwise choose a moved by sigma, put b=a-sigma(a) !=0, and choose y with y^2=b. Then (sigma(y)/y)^2=-1, so sigma(y)=epsilon*i*y for epsilon in {1,-1}. Applying sigma again, using sigma(i)=i, gives y=-y, a contradiction.
* If char(C)=2, then sigma=id. Otherwise choose a moved by sigma, put d=a+sigma(a) !=0 and t=a/d, so sigma(t)=t+1. Put c=t^2+t, fixed by sigma. Choose y with y^2+y=ct and put s=y+sigma(y), also fixed. Then s^2+s=c. Hence (s+t)^2+(s+t)=0, so s+t is 0 or 1 and fixed, forcing t fixed, a contradiction.

These calculations use only finitely many algebraic choices. They avoid any need to quote the full Artin–Schreier theorem.

### 5. Every algebraically closed field in N is well-orderable there

Let C be an algebraically closed field in N. Choose one countable support S for the carrier, operations, and constants. If the characteristic is not 2, choose one i in C with i^2=-1, and enlarge S by a countable support of i. The enlarged support is still countable.

Each g in Fix(S) acts on the actual carrier of C as a field automorphism. For every r in Fix(S) with r^2=id, its restriction to C is an automorphism of order dividing two; in characteristic different from 2 it fixes i. The lemma shows that r fixes C pointwise.

Now take any pi in Fix(S). By Section 3, pi=s r for two such involutions in Fix(S). Both fix C pointwise, so pi does as well. We conclude

    Fix(S) <= {g in G : g(c)=c for every c in C}.

This argument is made in M. It is legitimate to apply the algebraic lemma there: being a field and being algebraically closed are absolute between N and M for the supplied structure. A polynomial involves only finitely many elements of C; all such finite tuples and polynomial codes are already in N, and the same carrier supplies its roots.

Choose in M a well-order W of C. Because Fix(S) fixes every member of C, it fixes every pair in W and hence W itself. Its elements are hereditarily symmetric, so W belongs to N. Thus C is well-orderable in N.

### 6. Conditional uniqueness U

Suppose (C,j) and (D,k) are two algebraic closures of the same field K in N. Section 5 supplies countable supports S_C,S_D fixing their carriers pointwise. In M, ordinary algebraic-closure uniqueness provides an isomorphism h:C->D with h composed with j equal to k. Its graph is fixed by Fix(S_C union S_D), because that group fixes every element of both carriers. Every pair in the graph is hereditarily symmetric. Hence h belongs to N and is the required internal base-preserving isomorphism.

This also follows from the internal ZFA theorem that two well-orderable closures are base-isomorphic: recursively take the next source element and the least eligible target root. The first proof makes the support verification especially direct and does not assert an internal global selection of isomorphisms.

Therefore N satisfies U.

### 7. Failure of E and of choice for pairs

The rational function field

    K = Q(t_a : a in A)

has the canonical G-action permuting its variables. Its carrier and operations belong to N. Each rational function uses only finitely many atom labels, so its constituents are hereditarily symmetric. The map a |-> t_a is an internal injection of A into K.

There is no well-order of A in N. If W were one, let S be a countable support. There are two distinct atoms a,b outside S since A is uncountable in M. Their transposition fixes W and would be a nonidentity automorphism of a well-order, a contradiction.

If K had an algebraic closure C in N, Section 5 would well-order C internally. The composite injection A -> K -> C would induce a well-order of A, contradicting the preceding paragraph. Thus K is an explicit field with no algebraic closure in N, and N satisfies not E.

The family [A]^2 of all two-element subsets of A also belongs to N. If a choice function c on [A]^2 belonged to N, take a countable support S and two distinct a,b outside S. Their transposition fixes the argument {a,b} and fixes c, so must fix c({a,b}); but it exchanges its two possible values. Contradiction. Thus AC_2 fails, and consequently AC_fin and BPI fail.

The countability of supports is essential to DC; the uncountability of A is essential to the counterexamples. If A itself were countable in M, Fix(A) would be an allowed support and the symmetric submodel would be all of M.

### 8. Optional stronger positive statement: choice for well-ordered families

Let (X_i : i<alpha) be any family in N of nonempty sets, indexed by an ordinal alpha. Fix a countable support S for the entire family. Since all ordinal indices are pure, Fix(S) fixes each X_i setwise.

In M, fix a countably infinite reservoir B subset A minus S. For each i, use ambient AC to choose x_i in X_i and a countable support T_i of x_i. There is a permutation g_i in Fix(S) that sends T_i minus S into B: choose an injection of the countable T_i minus S into B, and extend it to a permutation of A minus S. Such an extension exists because the two complements have the same uncountable ambient cardinality as A. These choices are made in M for the set-indexed family i<alpha.

Put y_i=g_i(x_i). Since g_i fixes X_i setwise, y_i belongs to X_i. A support of y_i is g_i[T_i], which is contained in S union B. Therefore the single countable set S union B supports every y_i, and hence supports the entire function i |-> y_i. Its constituents are hereditarily symmetric, so this choice function is in N.

Consequently N satisfies choice for **every ordinal-indexed family of arbitrary nonempty sets**, and therefore for every well-ordered indexed family. This is stronger than the DC claim needed for the requested model. It does not contradict failure of AC_2, because the family [A]^2 is not asserted to have a well-orderable index set.

The model also fails Multiple Choice. Let D be the internal family of all co-countable subsets of A. (Every ambient countable subset T of A, and an enumeration of T, are supported by T, so external and internal countability agree for these subsets.) A multiple-choice function on D with countable support S would select a nonempty finite subset of A minus S. That finite subset would be invariant under every permutation fixing S, which is impossible. Thus this stronger countable-support model does not inherit the cyclic model's Multiple Choice property.

### 9. Attribution and transfer boundary

The ingredients are standard permutation-model methods, the elementary involution lemma already audited in `uniqueness_existence.md`, and the explicit two-reflection decomposition of each permutation orbit. The present note is a complete audit of their combination, with no historical priority claim.

For the standard support proof of dependent choice, compare Jech, *The Axiom of Choice* (1973), Chapter 8, Theorem 8.3 and its proof: https://gwern.net/doc/math/1973-jech-theaxiomofchoice.pdf . That theorem uses a different atom group but the same closure-of-supports mechanism. The full-symmetric countable-support construction and field argument above are proved directly here rather than attributed to that distinct model.

Together with the independently audited free-group model in `free_group_dc_model_audit.md`, the conclusion is that adding DC does not repair either implication between E and U **over ZFA**. No global E/U transfer to pure ZF follows. In particular, this model's stronger assertion that all algebraically closed fields are well-orderable cannot transfer together with failure of choice: the earlier real-closure/Hartogs argument proves that stronger assertion implies AC in pure ZF.


## 25. Refined finite-group correspondences and their limits

14 October 2026. E, U, P, and T have the meanings in `finite_group_systems.md`. No new pure-ZF separation of E and U is claimed here.

### 1. Indexing repair

In `finite_group_systems.md` and `finite_groups_section.tex`, finite splitting subfields are now indexed by finite sets of **monic positive-degree polynomials**. The zero polynomial must not be included: its root set is the whole field, so the former unrestricted wording would invalidate finiteness of that stage. This repair changes no mathematical argument after the indexing is corrected.

### 2. Exactly where E enters the generic construction

For a specified inverse finite-group system, write L for the colimit of Q(x_g:g in G_i) under the sum-over-fiber embeddings, and K for the corresponding invariant-field colimit. The proof of P uses E only to supply one algebraic closure C of L. Once C is supplied, U extends a specified automorphism of F=K L_i to C and produces the inverse-limit lift.

Thus a valid local statement is:

> If this particular generic colimit field L has an algebraic closure, then U implies surjectivity of every projection of this particular group system.

Indeed, for lifting a fixed element at stage i, only uniqueness of closures of F=K L_i is needed. The closure C of L is also a closure of F. This isolates the missing existence assumption rather than deleting it.

A general choice-free construction of closures of all these L's cannot work over ZFA: combined with U it would give P and therefore AC_fin, whereas the basic Fraenkel model satisfies U and fails AC_2. This is an obstruction to a uniform argument valid with atoms, not a proof that pure ZF cannot use Foundation in a different way.

#### Finite-stage closures do not glue automatically

Each L_i is individually well-orderable (it is a rational-function field in finitely many variables), hence has a closure in ZF. This does not choose a family of those closures or compatible embeddings. Even selecting closures separately would leave the same coherence problem: the possible embeddings of one finite normal subextension into another form nontrivial finite torsors. A directed colimit of fields requires specified commuting maps, not only the existence of maps.

#### Ordering and real closures

Each L_i is formally real; any claimed sum-of-squares contradiction in the colimit occurs at a finite stage, so L is formally real too. This does not supply a field ordering of L. An ordering of Q(x_a:a in A) restricts to a linear ordering of the distinct variable labels A. Consequently a construction that first orders arbitrary variable families has introduced a choice principle. No global ordering of the finite group carriers is available merely because every carrier is finite.

Even an arbitrary family of separately chosen field orderings on the L_i would need compatibility with the sum embeddings. A group-invariant field ordering cannot solve that problem: a nonidentity finite-order automorphism of an ordered field cannot preserve its order (iterate a strict inequality around its finite cycle). Thus the finite Galois symmetries required in the generic construction cannot all preserve one stage ordering.

A rigorous sufficient restriction is that the tagged union of all stage carriers L_i be supplied with a well-order. Then the colimit is well-orderable by least representatives and has a closure in ZF. This gives the local U=>P implication above. In fact the associated well-orderable finite constraint system can already be solved by transfinite finite-consistency recursion, so this restriction does not advance the arbitrary-set question.

### 3. P for elementary abelian groups has an exact familiar strength

Fix a prime p. Let P_p^el be P restricted to finite elementary abelian p-groups. Regard such groups canonically as vector spaces over F_p. Then, in ZF,

    P_p^el  <=> every functional on a subspace of an F_p-vector space extends
            <=> SLin(F_p).

The second equivalence is proved in `kummer_choice_lower_bound.md`; the first has a short choice-free duality proof.

#### P_p^el implies linear separation

For an arbitrary F_p-vector space V, index all finite-dimensional subspaces W by inclusion. They are finite sets because the field is finite. Put G_W=Hom(W,F_p). Restriction G_W' -> G_W is surjective by finite-dimensional linear algebra. Given v!=0, prescribe the functional v |-> 1 on span(v). P_p^el supplies a coherent family of finite-stage functionals extending it. Their union is a functional on V taking v to 1.

Linear separation implies extension of any functional f:B->F_p: if f!=0, choose b with f(b)=1 and apply separation in V/ker(f) to b+ker(f). Pull back the separating functional. For any b' in B, b'-f(b')b belongs to ker(f), so the extension agrees with f. If f=0, use the zero extension. No family of bases was chosen.

#### Linear extension implies P_p^el

For a surjective inverse system G_i of finite elementary abelian p-groups, take finite dual spaces D_i=Hom(G_i,F_p). Dual bonding maps D_i -> D_j are injective. Their directed colimit D is a vector space. A prescribed a in G_i defines evaluation at a on D_i. Extend this functional to D. Its restriction to each D_j corresponds to a unique g_j in G_j by finite-dimensional biduality. Unique specification gives the full family, and the dual bonding identities give pi_ji(g_j)=g_i. The prescribed coordinate is a.

This proof gives an alternative derivation of the finite-field linear-compactness lower bound from E+U=>P. It also pinpoints a nontrivial portion of P whose exact choice strength is already understood.

### 4. E alone fails even this restricted projection principle in the cyclic ZFA model

Use the checked cyclic Frobenius model in odd characteristic p. Its atom field A is an algebraic closure of F_p; the atom permutation g is Frobenius, and the support filter is generated by H_n=<g^n>. The model satisfies E.

Consider the invariant family

    B = {{a,-a}: a in A, a!=0}.

Every member is a two-element set. If a choice function c for B had support H_n, choose a nonzero root a of T^(p^n)+T in A. Such a root exists: this polynomial has p^n distinct roots and p^n>=3. Then g^n(a)=-a and g^n(-a)=a, so g^n fixes the pair {a,-a} while interchanging its members. This contradicts invariance of c. Hence AC_2 fails in this E-model.

For clarity, P_2^el implies AC_2 directly. Given a family of pairs, for each finite set F of indices take the affine F_2-space X_F of choices on F, whose translation vector space is G_F=F_2^F. There is a canonical vector-space homogenization

    V_F = G_F disjoint-union X_F.

The first component is a subgroup, addition of an even and an odd element is the torsor action, and x+y for x,y in X_F is the unique g with g*x=y. Choose one temporary point of X_F to verify that V_F is an elementary abelian 2-group of one higher dimension; no point enters its definition. Restriction maps induce surjective linear maps V_F' -> V_F. The component map epsilon_F:V_F -> F_2 commutes with restrictions. Applying P_2^el to the nonzero element at the empty stage gives compatible odd elements, hence a choice function for all pairs.

Therefore the cyclic model satisfies

    E + not AC_2 + not P_2^el + not SLin(F_2).

This strengthens the internal obstruction to removing U from E+U=>P. It remains a ZFA result; no pure-ZF transfer of the conjunction is asserted.

#### Even cyclic 2-group projection lifting can fail in the E-model

The same cyclic Frobenius permutation model gives a sharper group-theoretic example. Externally take C_n=Z/(2^(n+2)) with generator g of the atom permutation group acting by the group automorphism x |-> 5x. Reduction maps C_(n+1)->C_n commute with these actions. The cyclic model has enough finite atom orbits to code this entire countable diagram equivariantly, with pure tags; its carriers, group operations, and bonding maps are internal and the diagram has support G.

The element 1 mod 4 at stage zero is fixed by G. If it had an internal inverse-limit lift (x_n), that lift would be fixed by some g^m, m>=1. Each x_n is odd, and g^m-fixity would imply

    (5^m-1)x_n = 0 mod 2^(n+2).

Since x_n is invertible, 5^m-1 would be divisible by arbitrarily large powers of 2, impossible for the positive integer 5^m-1. Thus projection lifting fails even for a countable system of cyclic 2-groups in this ZFA model satisfying E. This construction has no pure-ZF transfer claim.

### 5. Fixed finite-group coset compactness

Fix one finite group H. Define C_H as the compactness principle for systems of constraints whose variables take values in H and whose allowed relations are arbitrary cosets of subgroups of H^n, for arbitrary finite n. A finite subsystem is required to be solvable. This language has relations of unbounded arity and is not itself a finite signature.

There is, however, a primary finiteness theorem which repairs this particular signature issue. Aichinger, Mayr, and McKenzie, *On the number of finite algebraic structures*, Journal of the European Mathematical Society 16 (2014), 1673–1686, DOI 10.4171/JEMS/472, prove that every clone on a finite set containing a Malcev operation is finitely related. Primary publisher page: https://ems.press/journals/jems/articles/11811 .

Apply it to the clone generated by the heap operation

    m(x,y,z)=x y^(-1) z

on H. Its invariant nonempty relations are exactly cosets of subgroups of H^n. One direction follows from (aK)(aK)^(-1)(aK)=aK; conversely, after choosing one a in a nonempty m-closed relation R, the translate a^(-1)R contains the identity and is closed under products and inverses.

Finite relatedness yields one finite relational template D_H with Pol(D_H) equal to this heap-generated clone. Every coset relation is preserved by that clone and hence, by the finite Pol–Inv theorem, has a primitive-positive definition in D_H (including equality). Empty relations can be included explicitly. After choosing one order of the single finite set H, take the least finite formula coding each such definition. This makes the translation for all arities canonical, without countably choosing definitions.

Replace each coset constraint by its finite pp gadget, with fresh auxiliary variables indexed by that constraint and formula positions. Finite satisfiability is preserved by finite choices of witnesses. A solution of the resulting finite-signature instance gives a solution of the original coset system. Conversely the defining relation(s) of D_H are heap-invariant coset relations, so C_H supplies their compactness. Thus C_H is equivalent to compactness for a particular finite template with a Malcev polymorphism.

By the Kátay–Tóth–Vidnyánszky 2024 result cited in `finite_group_systems.md`, there is a single pure-ZF model in which C_H holds for every fixed finite H but BPI fails. This alone says nothing about adding AC_fin, which fails in that model.

### 6. What fixed-group compactness can cover

A useful restricted positive result is stronger than initially expected: **C_H alone**, with no extra AC_fin, solves every torsor inverse system whose finite groups G_i are quotients of subgroups of finite powers of H.

For each i, define n_i to be the least natural number for which such a representation exists. Let P_i be the set of all triples (S,q,x), where S <= H^(n_i), q:S ->> G_i is a surjective homomorphism, and x is a point of X_i. This is a finite nonempty set, defined canonically. We do not choose a member of P_i. For every presentation p=(S,q,x) in P_i introduce one H-valued tuple variable s_(i,p) of length n_i, with the subgroup constraint s_(i,p) in S. Its represented torsor point is q(s_(i,p))*x.

Impose compatibility for every pair of presentations p at i and r at j whenever i<=j, including i=j so all presentations at one stage must represent the same point. If p=(S_i,q_i,x_i) and r=(S_j,q_j,x_j), let a_ji in G_i be the unique element with f_ji(x_j)=a_ji*x_i. The constraint says

    q_i(s_(i,p)) = pi_ji(q_j(s_(j,r))) a_ji.

Its solution relation in S_j x S_i is a right coset of the subgroup defined by the homogeneous equality q_i(t_i)=pi_ji(q_j(t_j)). Translating the second coordinate by one lift of a_ji verifies this; no lift enters the definition of the relation. Hence it is a coset relation in H^(n_j+n_i).

Every finite subsystem is solvable: choose a point at one common upper stage of its finitely many indices, restrict that point, and choose finitely many preimages under the finitely many q's involved. C_H supplies a global tuple assignment. At each stage all presentations represent the same point, so unique specification defines a coherent x_i in X_i. The all-presentations construction avoids a simultaneous choice of labels, basepoints, or group presentations.

This includes systems of elementary abelian p-groups by taking H=C_p, consistently with the exact linear-compactness correspondence in Section 3. It is a genuine restriction: a fixed finite H has a fixed exponent, and all its subgroup-power quotients have exponent dividing that exponent. An arbitrary system of finite groups can involve unbounded prime orders and need not fall into any one such class.

If the cardinalities |G_i| themselves are uniformly bounded, no compactness principle is needed: their maximal size is attained at one stage, and all maps above that stage are bijections. Choosing one torsor point there yields unique coherent lifts, then restriction gives the entire limit. Thus bounded group order is too weak a restriction to capture the unresolved issue.

No argument here obtains full T from AC_fin plus all the separate principles C_H. The remaining gap is a single mixed-domain system with no fixed finite group whose powers and quotients contain all its domains. Solving each bounded class separately supplies neither compatible solutions across those classes nor a choice function for the generally infinite sets of such solutions.

### 7. An exact fixed-variety correspondence

Let T_SP(H) restrict T to groups isomorphic to subgroups of finite powers of H; let T_HSP(H) allow quotients of such subgroups. Then

    C_H <=> T_SP(H) <=> T_HSP(H).

The forward implication to the larger class was proved in Section 6. For the reverse, start with a finitely satisfiable coset-constraint system over H. Index pairs consisting of finitely many variables and finitely many constraints on those variables. The solution set X_i is a nonempty coset of a subgroup of the finite product H^(F_i), since a nonempty intersection of cosets is a coset of the intersection of their translated subgroups. Coordinate restrictions give an inverse system, but need not be surjective.

Replace X_i by its stable image

    Y_i = intersection_(j>=i) image(X_j -> X_i).

The finite intersection property and finiteness of X_i imply Y_i is nonempty. It remains a coset: after fixing one of its points for verification, every image is a coset containing that point, and translating gives an intersection of subgroups. The restrictions Y_j -> Y_i are surjective. For y in Y_i, the inverse images of y inside the images from stages k>=j have the finite intersection property in the finite set X_j; their intersection supplies a lift in Y_j. These are separate finite arguments, not simultaneous choices of points.

The canonical group Y_i Y_i^(-1) is a subgroup of H^(F_i), acting freely and transitively on Y_i. Coordinate maps induce surjective homomorphisms between these groups. T_SP(H) supplies a coherent point, whose union solves the original constraints.

Consequently the Kátay–Tóth–Vidnyánszky pure-ZF model satisfies all these separate fixed-finite-H principles but fails full T, because full T implies AC_fin and the model fails choice for its countable family of finite prime cycles. This separates the conjunction of the fixed-H principles from unrestricted T in pure ZF. It does not settle whether adding AC_fin closes that gap.


## 26. Named weak-choice hypotheses and the unresolved rank argument

This note records proved consequences, exact hypotheses, and unresolved routes. It is a research record, not a claim that either global implication between E and U has been settled in pure ZF. Here E is universal algebraic-closure existence; U is uniqueness of supplied closures over their specified base embeddings.

### 1. The precise restricted finite-choice consequence

The previous note and `uniqueness_alone_section.tex` prove in ZF:

> Assume U. If q:S -> X is a surjection and S has a specified linear order, then the family of all nonempty finite subsets of X has a choice function.

No assumption that X itself is linearly orderable is used. The proof uses one torsion-character extension for a group generated by a linearly ordered index set. Finite tuples from S cover all labels (D,x), where D is a finite subset of X and x belongs to D. This uses finite preimage choices only to verify surjectivity, not an infinite choice of representatives.

For a family of finite sets, it is enough that its **ordinary union** has such a cover; requiring its tagged union to have a cover was unnecessarily strong. Restrict the resulting choice function on all finite subsets of the union to the given family.

For discussion only, write LC for the assertion that every set is a surjective image of a linearly orderable set. This is a descriptive abbreviation in this note, not an assertion that this is its established name. Then

    ZF proves U + LC -> AC_fin.

An exact quotient formulation of the restricted conclusion is: for every equivalence relation E on a linearly ordered S, all nonempty finite subsets of S/E admit a simultaneous selector. Every surjection yields such an equivalence relation, and the quotient map yields the converse formulation.

This is weaker in formulation than Howard–Rubin Form 293, which asserts that every quotient of a linearly orderable set is itself linearly orderable. Form 293 implies this finite-selector principle by taking least elements; no converse has been established here. Form 293 does not by its wording assert LC, and the two must not be conflated.

### 2. Verified connections to named principles

Karagila and Schilhan, *Intermediate models and Kinna–Wagner principles*, accepted manuscript dated 16 May 2025, published in Proceedings of the AMS 154 (2026), 393–403, DOI https://doi.org/10.1090/proc/17425, gives the exact conventions used below. Primary full text: https://eprints.whiterose.ac.uk/id/eprint/229337/1/kwt.pdf . Local copies are `sources/karagila-schilhan-kw.pdf` and `.txt`.

#### Small violations of choice with an ordered seed

Definition 2.1: SVC(S) says that every nonempty set X is a surjective image of S times some ordinal. (Empty-set conventions can be handled separately.) If S has a linear order, every S times ordinal has the lexicographic linear order. Consequently

    ZF proves U + SVC(S) + 'S is linearly orderable' -> AC_fin.

Only one order on the one seed S is fixed. There is no requirement to choose orders independently for an ordinal-indexed family. In particular the implication holds with S equal to the reals whenever SVC(R) is available.

This is not an implication from bare SVC: its seed is an arbitrary set and need not have a linearly ordered cover. More generally, SVC(S) plus a surjection from a linearly ordered set onto S suffices, by composing covers and taking a product with the ordinal.

#### Dual first Kinna–Wagner principle

Definition 3.1 of the same paper defines KWP*_1: every set is the image of a partial function on the power set of some ordinal. Its domain is a subset of P(alpha), so the least ordinal in the symmetric difference lexicographically linearly orders that domain. Hence

    ZF proves KWP*_1 -> LC,
    ZF proves U + KWP*_1 -> AC_fin.

The ordinary KWP_1 says that every set injects into some P(alpha), hence implies the ordering principle and AC_fin even without U. The **dual** principle is the informative additional hypothesis here. The standard implications KWP_1 -> KWP*_1 -> KWP_2 are Proposition 3.2 in the cited paper.

Goldberg's *Reinhardt cardinals in inner models* (29 July 2021), pp. 3–4, independently uses the terminology dual Kinna–Wagner principle for the surjective version: https://math.berkeley.edu/~goldberg/Papers/WeaklyReinhardtCardinals.pdf . Its large-cardinal consistency theorem is not needed for any conclusion in this note.

### 3. Why the attempted rank bootstrap does not yet prove AC_fin

The following are gaps in proposed arguments, not impossibility theorems.

1. A surjection q:S -> X does not produce a section. Its fibers can be infinite subsets of the linearly ordered S with no least element. Ordering S therefore does not order its quotient by the rule 'compare least representatives'.
2. From an order on S one cannot lexicographically order arbitrary subsets of S by their first difference: a nonempty symmetric difference need not have a least member. The construction works for P(alpha), because alpha is well-ordered, and for finite-support objects, because their relevant differences are finite. It does not extend to P(S) for a general linearly ordered S.
3. Choice on every finite subset of X does not provide choices from arbitrary nonempty subsets of X. A selector on pairs is merely a tournament and need not be transitive; a selector on all finite subsets supplies no demonstrated coherent linear order. Thus the output of the character construction is insufficient by itself to order the next powerset stage.
4. Even if separate covers of the rank levels were known to exist, putting them together at limit ranks requires a specified family of witnesses. An assertion 'each rank level has some ordered cover' cannot be silently replaced by a chosen sequence of covers. A unique definable construction would remedy this, but none has been produced.
5. The Hartogs recursion used earlier to show 'every algebraically closed field is well-orderable' implies AC had a different strong input: a **single well-order** of P(kappa), large enough to transport at every stage. Our finite-selector theorem supplies no such well-order.

Accordingly neither U -> LC nor U -> AC_fin has been proved in pure ZF. The ordered-cover consequence alone does not settle U -> E.

### 4. An additional obstruction: amorphous sets with ordered covers

ZF proves that an infinite amorphous set A has no choice function on its two-element subsets. Here is a direct proof of the pair case of a result attributed to Truss.

A choice function on [A]^2 orients the complete graph on A as a tournament. For each a, its out-neighbor set and in-neighbor set partition A minus {a}; exactly one is finite. Partition A according to which side is finite. One part B is cofinite and therefore infinite; reverse all arrows if necessary so that every a in B has only finitely many out-neighbors.

The finite out-degrees define a map B -> omega. Every map from an amorphous set to omega has finite image: an infinite subset of omega can be partitioned into two infinite sets by its increasing enumeration, and their inverse images would split B into two infinite sets. Hence these out-degrees have a common finite bound N. Choose 2N+2 distinct points of B; this is just one finite choice, which is available in ZF. The tournament on this finite set has (2N+2)(2N+1)/2 arrows, exceeding (2N+2)N, although each vertex has at most N outgoing arrows. Contradiction.

Thus our earlier theorem gives

    ZF + U proves: no amorphous set is a surjective image of a linearly orderable set.

In particular U + LC proves that there are no amorphous sets. The global theorem U -> 'no amorphous sets' is **not** asserted; it would conflict with the verified ZFA models but remains a separate pure-ZF question.

Primary corroboration for the pair-choice obstruction: Howard and Tachtsis, *On rigid relation principles in set theory without the axiom of choice*, Fundamenta Mathematicae 232 (2016), DOI https://doi.org/10.4064/fm960-12-2015, p. 211, cites Truss's theorem for each fixed n>1: https://www.impan.pl/shop/en/publication/transaction/download/product/91321 . The elementary pair proof above is sufficient here.

### 5. A pure-ZF model route with one unresolved preservation step

Karagila–Schilhan §4.1 proves that KWP*_alpha is preserved by set forcing. It then recalls Monro's set-generic extension of the basic Cohen model containing an amorphous set. Since the basic Cohen model satisfies KWP_1, Monro's extension satisfies KWP*_1 and has an amorphous set. The preceding results therefore prove that **U fails in this pure-ZF extension**.

Exact original citation from their bibliography: G. P. Monro, *On generic extensions without the axiom of choice*, Journal of Symbolic Logic 48 (1983), no. 1, 39–52.

The basic Cohen model satisfies BPI, hence E and U. For a separation E + not U by this route, one would need to prove E survives Monro's particular forcing. **No such preservation proof has been obtained.** The forcing creates new fields, so preserving closures of ground-model fields is insufficient. It is equally insufficient to note that closures exist in an ambient ZFC universe: they must belong to the intended intermediate model, with their base embeddings.

This candidate was sent to the model-construction agent for possible further analysis. The model is not listed as a verified E + not U model.

### 6. Solovay and all-Baire-property models: established and unresolved

The previous note proves that U yields an additive parity functional on P(omega), hence a subset of Cantor space without the Baire property. It constructs, in ZF, a specific field F with two supplied closures (the same algebraically closed carrier equipped with different F-embeddings) whose isomorphism would yield that functional. Therefore any model in which all subsets of Cantor space have the Baire property fails U.

No proof or primary source was found that universal E holds, or that it fails, in the Solovay model. In particular, none of the following arguments establishes E there:

* DC handles appropriate countable constructions; an arbitrary field and all its polynomial constraints need not have a countable enumeration.
* A linear order on the carrier of a field is not a field order compatible with addition and multiplication. The Lombardi–Roy real-closure theorem applies to an **ordered field**.
* A field generated by a linearly orderable family may have algebraic relations among those generators. It is not automatically a rational function field; selecting a transcendence basis is not available without justification.
* A presentation as a quotient of a polynomial ring does not embed that quotient into the known closure of a rational function field. The kernel must be respected, and a suitable compatible prime ideal or embedding is precisely additional structure.
* HOD(K), with K as one parameter, need not contain every element of K. One cannot invoke the internal axiom of choice there and assume that it has constructed a closure of the entire external field K.
* A closure chosen in an ambient ZFC extension need not be real-ordinal definable or hereditarily belong to the Solovay inner model. Finite algebraicity of individual elements does not supply a uniform coherent symmetric presentation of the closure.

These are the precise unresolved points. Ordered rational function fields have the choice-free closures already constructed; this restricted positive result neither supplies nor refutes universal E.

### 7. Status after this follow-up

New proved corollaries: U + KWP*_1 -> AC_fin; U + SVC(S) with a linearly ordered seed -> AC_fin; and U excludes amorphous sets that have linearly ordered covers. The named principles and model route have primary sources. No pure-ZF equivalence or separation between global E and global U has been established by this follow-up.


## 27. Further source audit of Boolean and transfer constructions

Research record, 14 October 2026. This records checked arguments and the precise gaps in proposed model constructions. It does not claim a pure-ZF separation of global existence E and conditional, base-compatible uniqueness U.

### 1. Current status of the Solovay/AD route

The checked argument in `uniqueness_strength.md` gives, in ZF,

> U implies an additive parity map on P(omega), hence a subset of Cantor space without the Baire property.

Consequently the hypothesis that every subset of Cantor space has the Baire property supplies a failure of U. The argument supplies two actual algebraic closures, with different specified embeddings of their common base, so it is not merely an absence of a construction of an isomorphism.

The missing statement for this route is **global E in a model having that regularity property**. Searches for E in Solovay models, under determinacy, and under the all-Baire-property hypothesis have not located a primary theorem establishing it. Nor has this investigation derived from E alone a non-Baire set. The parity argument uses an extension of a specified automorphism; that extension is exactly the step provided by U, and existence of some closure does not replace it.

Some large families of fields already have closures in ZF: in particular the rational function fields over Q on a linearly ordered set of variables used in the parity construction. This is compatible with failure of U and does not establish E for arbitrary fields in the same universe.

Primary-source lead: U. Felgner and K. Schulz, *Algebraische Konsequenzen des Determiniertheits-Axioms*, Archiv der Mathematik 42 (1984), 557–563, DOI [10.1007/BF01194054](https://link.springer.com/article/10.1007/BF01194054). Publisher metadata is verified, but the full article was not obtained. A secondary discussion attributes to it the restriction of automorphisms of C under AD; that attribution is not used here as a theorem about E or arbitrary algebraically closed fields. In particular, a statement about automorphisms of C cannot establish global existence of closures.

Historical primary warning: Robert Solovay's [14 May 2006 FOM message](https://www.fomarchive.ugent.be/2006-May/010546.html) rejects a proposed reduction from uniqueness over Q to countable finite choice at three distinct points: the proposed finite Galois groups are wrong; simultaneous field amalgamation was not justified in ZF; and taking a further algebraic closure already assumes an existence principle. This is relevant to proposed closure-encoding arguments, not evidence about the truth of E in the Solovay model.

### 2. A precise obstruction in the regular-ring literature

The primary source R. M. Raphael, *Algebraic extensions of commutative regular rings*, Canadian Journal of Mathematics 22 (1970), 1133–1155, DOI [10.4153/CJM-1970-132-4](https://doi.org/10.4153/CJM-1970-132-4), was inspected in full through the publisher PDF.

Relevant facts from the paper: ring-algebraic means essential and integral (2.1). Its algebraic closures are regular and Baer (2.12). For a regular ring, being Baer is equivalent to completeness of the Boolean algebra of idempotents (1.12). If the starting regular ring is already Baer, an essential regular extension preserves its idempotents (1.13). Thus the general ring closure theorem may complete the Boolean algebra; it is not automatically a theorem about field objects over one unchanged Boolean base.

Here is the consequence for the attempted symmetric construction. Suppose R_per is the ring of periodic sections, and its idempotents form B_per, the union of the fixed algebras B_n for the powers of the support automorphism. If B_per is incomplete, a Raphael algebraic closure of R_per necessarily has new idempotents. Therefore it cannot directly be interpreted as the required closure over that same periodic Boolean base. This is an obstruction to this use of the theorem, not a proof that no suitable weaker ring extension exists.

The incompleteness phenomenon is concrete. Let B=P(Z), with the shift action. B_per consists of the subsets of Z having some positive integral period. There are only countably many such sets, and B_per is atomless: any nonempty residue class modulo n splits into two nonempty residue classes modulo 2n. A countably infinite atomless Boolean algebra is not complete. For example, a recursively chosen sequence of nonzero pairwise disjoint elements would, in a complete algebra, yield distinct joins for all subsets of omega, contradicting countability by Cantor's theorem. Thus this completion issue is present even in the simplest shift example.

The useful finite-stage fact survives. Each B_n=Fix(beta^n) is a complete Boolean subalgebra of B, since beta^n preserves arbitrary joins. A closure constructed over B_n can retain B_n. The finite-period lemma in `pure_zf_models.md` then applies when the relevant power of the lifted action fixes the whole Boolean algebra. What remains is a coherent choice of these closures and actions across all n, together with a hereditary-symmetry coding argument. Arbitrary equivariant amalgamation fails, as the earlier Q(i) and finite-field examples show.

Another primary source, Kay Smith, *Commutative regular rings and Boolean-valued fields*, Journal of Symbolic Logic 49 (1984), 281–297, DOI [10.2307/2274110](https://doi.org/10.2307/2274110), has a verified publisher abstract announcing a category equivalence and a ring closure construction. Only the abstract was accessible. It cannot be cited as a proof that a prescribed Boolean algebra, a prescribed cyclic action, or periodic root names are preserved.

### 3. Related sheaf result: definition sensitivity

A further primary manuscript was obtained in full: Florian Pop, *Commutative regular k-rings*, Bucharest preprint no. 64 (1982), [institute-hosted scan](https://imar.ro/~increst/1982/64_1982.pdf), saved as `sources/regular-rings1982.pdf` and `.txt`.

Its final section treats closures whose map on spectra is a homeomorphism and gives sufficient topological hypotheses on the spectrum, including a covering property (Theorem 32 and Corollary 33 in the scan). This is a more restrictive closure notion than unrestricted completion of the Boolean base. The discussion explicitly treats preservation of the spectrum as an additional problem. The first chapter studies a ring with an already given locally finite automorphism action and the resulting profinite completion of that action. These statements do not yet supply an extension of an arbitrary locally finite cyclic action to a closure that still has the original spectrum.

The OCR is poor; any use of a precise theorem beyond the observations above should be checked against the scanned pages. No model conclusion has been drawn from it.

### 4. Why the quoted Pincus theorem does not yet transfer U

The local assertion that two supplied algebraic closures admit a compatible isomorphism is boundable in its parameters: the possible maps lie in a power set of their Cartesian product, and the field and closure conditions are checked in a fixed finite/omega power-set construction over the supplied data.

This does **not** make global U a boundable *statement* in the sense of the transfer theorem. The convention in Tachtsis, Definitions 5.2–5.3, is that a boundable statement is an **existential closure** of a boundable formula. Global U universally quantifies over all supplied fields and closures. Its negation has a bounded witness; its positive universal assertion does not follow from this observation.

Injective boundability allows certain universally quantified objects of size bounded in terms of an existentially supplied seed. Applying it to global U would require an actual reduction of arbitrary counterexamples to that bounded range, or some other equivalent formulation. No such reduction has been proved. Merely checking bounded versions of U, even for arbitrarily many separately chosen bounds, is not a transfer of the one global assertion.

The source is E. Tachtsis, *The Boolean prime ideal theorem does not imply the extension of almost disjoint families to maximal almost disjoint families*, DOI [10.4064/ba201014-22-1](https://doi.org/10.4064/ba201014-22-1), section 5; local copy `pincus-transfer-tachtsis.txt`. The explicitly admitted positive principles in the stated transfer theorem include BPI and countable choice. U is not listed there. This does not prove that U is nontransferable; it identifies the unfilled hypothesis in the proposed application.

### 5. Monro's forcing extension: a further candidate, no preservation theorem

The other agent found the relevant contemporary primary summary: A. Karagila and J. Schilhan, *Intermediate models and Kinna–Wagner principles*, Proceedings of the AMS 154 (2026), 393–403, accepted manuscript dated 16 May 2025, DOI [10.1090/proc/17425](https://doi.org/10.1090/proc/17425), section 4.1. The manuscript cites G. P. Monro, *On generic extensions without the axiom of choice*, Journal of Symbolic Logic 48 (1983), 39–52, DOI [10.2307/2273318](https://doi.org/10.2307/2273318).

The checked summary states that a set-generic extension of the basic Cohen model can contain an amorphous set, while retaining the dual Kinna–Wagner principle KWP*_1. The latter says every set is an image of a subset of P(alpha) for some ordinal alpha. Such a domain is linearly orderable, so the LO-cover consequence of U from `uniqueness_strength.md` would give finite choice on all sets in this extension. The separate amorphous-set argument excludes that consequence and hence excludes U.

The starting Cohen model has BPI and therefore E. This does not show E in Monro's extension. Monro's primary abstract specifically concerns failure of preservation of weak choice principles under generic extensions. Neither a general theorem that E is preserved by set forcing nor the required special preservation for Monro's forcing has been verified. Thus this is another concrete route to E+not U with exactly one unresolved preservation requirement, not an established countermodel.

### 6. Outcome of this follow-up

- No pure-ZF implication or countermodel for global E versus U was established here.
- The all-Baire-property route still gives a genuine failure of U, with global E unverified.
- The regular-ring route now has a precise additional obstruction: the available general closure theorem changes an incomplete Boolean base.
- The distinction between local boundability and the existential statement form in the quoted transfer theorem prevents a premature transfer of global U.
- Monro's extension is a useful candidate only if E preservation can be proved independently.


## 28. The 16:20 pure-forcing candidate checkpoint (superseded by Sections 29 onward)

A further candidate replaces the universal small-index atom orbits by Cohen reals while retaining the free acting group. The proposed existence proof works with full Boolean-valued field sections, prepares a small invariant relatively algebraically closed subfield, takes its small equivariant algebraic closure, and uses regular tensor amalgamation. This is designed to repair the earlier invalid arbitrary equivariant amalgamation. The full proof, including Boolean scalar extension, limit-stage fullness, and realization by hereditarily symmetric equality-class names, is under adversarial audit. It is not included among the proved PDF results.

Even if that existence argument passes, no countermodel follows until U is separately refuted. The old atom witness becomes linearly orderable when its distinct element labels are simply replaced by real codes, so it cannot be reused over its well-orderable base. Universal finite quotient coordinates also orient simple finite orbit examples. A possible Boolean cocycle/torsor route has been assigned for investigation; it is speculative.

The latest positive-proof TeX compiles cleanly to 25 pages. That enlarged edition still needs its own visual review before replacing the already inspected 21-page checkpoint PDF. Research remains active.


## 29. Final pure-ZF separation: theorem, construction, and scope

The final construction gives the relative-consistency implication

\[
\operatorname{Con}(\mathsf{ZFC})\ \Longrightarrow\
\operatorname{Con}(\mathsf{ZF}+\mathsf{DC}+E+\neg U+\neg\mathsf{AC}_{\rm fin}+\neg\mathsf{BPI}).
\]

Thus **E does not imply U in pure ZF**, even in the presence of dependent choice. The construction also refutes E implying finite choice, BPI, or the finite-torsor compactness principle T. The reverse pure-ZF implication U implies E has not been settled by this investigation. The model proof is a direct symmetric-forcing argument; it does not conjoin two separately transferred ZFA conclusions.

The relative-consistency formulation uses the usual formalization of forcing and symmetric extensions. It does not claim that consistency alone proves the existence of a transitive ground model. All choices used to build the symmetric system and its names are made in an outer ZFC universe. The internal closure and its base embedding are explicitly hereditarily symmetric.

Two agents independently audited the full Boolean existence proof; the pair obstruction was independently audited twice as well. A further joint audit revisited the cardinal bounds, Boolean base change, relative algebraic closure, source embedding, and dependent choice. The main agent checked the integrated arguments. These are independent mathematical reviews within this run, not formal proof-assistant verification or external peer review. No historical novelty claim is made.

The complete final existence argument follows. Its earlier candidate status is superseded by this section and the final audit.

## Free-group / small-index pure symmetric-forcing construction

Final audited proof note, 14 October 2026. **The specified pure symmetric model satisfies ZF + E + DC + not U + not AC_fin + not BPI, relative to an outer ZFC model.** The Boolean lifting and HS realization arguments were independently audited by both other research agents; see `free_group_boolean_lifting_independent_audit.md` and `boolean_closure_independent_audit.md`. The separate Bernoulli-pair obstruction is proved in `boolean_torsor_candidate.md` and independently checked in `boolean_torsor_independent_audit.md`. Dependent choice is proved in `free_group_forcing_dc.md` and independently audited. The combined TeX proof is `pure_zf_separation_section.tex`.

This is a proof developed and checked during the investigation, not a claim of historical novelty. It settles E implies U negatively in pure ZF. The reverse implication U implies E is not settled by this construction; the reverse model currently proved in the investigation uses atoms. Earlier candidate-stage records remain part of the research history and are superseded by this proof note.

### 1. Symmetric system

Work in an outer model of ZFC. Let mu=2^aleph_0 (more generally mu is infinite and mu^aleph_0=mu), and let G be a free group on kappa generators, kappa>mu. Let

    A = disjoint union { G/J : J <= G and [G:J] <= mu }.

The summands are tagged by J. Let P=Add(omega,A), with finite conditions, and let G act by its left action on A and trivially on omega. Let the normal filter consist of all subgroups of index at most mu. It is closed under countable intersections since mu^omega=mu. No inner wreath-product symmetry is added: the actual acting group must remain free, so that every support subgroup is free in the outer ZFC universe.

Let B=RO(P). Each b in B has a countable coordinate support: take a countable maximal antichain of finite conditions deciding b, using ccc in the outer universe. The orbit of each coordinate of A has size at most mu. Hence the orbit of b has size at most mu^omega=mu. This statement concerns the actual semilinear action on B; it does not identify a name action with an automorphism of an evaluated field.

The canonical Cohen real names r_a are pairwise distinct with Boolean truth one. They supply an equivariant family of labels for each G/J in A. Their use to encode an abstract Boolean field is described below.

### 2. Boolean lifting lemma

The following lemma is an outer-ZFC theorem, used to construct actual HS witnesses in the symmetric model.

> Suppose B is a complete ccc Boolean algebra, H is a free group acting on B, every b in B has H-orbit at most mu, and mu^omega=mu. Suppose K is a full B-valued field with an H-semilinear action on its full sections, such that every section has H-orbit at most mu. Then there is a full B-valued algebraic closure L of K, with an extending H-semilinear action, such that every full section of L has H-orbit at most mu.

The group action must preserve the Boolean-valued equality and all operations covariantly. The lemma avoids the false inference that the orbit of a root is bounded solely by its polynomial degree: arbitrary Boolean mixings of finitely many roots can have a large orbit.

### 3. Initial fields: full sections have small orbits

Take a field name in the symmetric model, with an H-support where [G:H]<=mu. After strengthening and intersecting with a condition stabilizer if needed, arrange that the Boolean unit of the restricted algebra forces the field axioms. A field is a bounded structure, so its field axioms remain true in the full forcing extension.

Each named element occurring in the hereditarily symmetric field name has an orbit of size at most mu. Any full section of the evaluated field is, modulo Boolean equality one, a mixing of such element names along a maximal antichain. The antichain is countable. The orbit of a countable mixing is bounded by the product of the orbits of the countably many constituent sections and Boolean pieces, hence by mu^omega=mu.

This gives a semilinear action on the set of full sections modulo Boolean equality one. That set can be represented using a set of names of bounded rank. Literal invariance of a chosen representative is not asserted. For the eventual embedding back into HS names, all representatives from an H-stable set of source element names can be used together.

### 4. Small invariant Boolean subalgebras

If S is an H-invariant subset of B of size at most mu, there is an H-invariant complete Boolean subalgebra B0 of B containing S and having size at most mu.

Reason: close S under countable Boolean operations through omega_1 stages. Cardinality remains at most mu because mu^omega=mu and omega_1<=mu. The resulting subalgebra is closed under countable joins calculated in B. Since B is ccc, the join of any family of its elements is the join of a countable subfamily (outer ZFC). Thus the subalgebra is complete, with joins agreeing with those in B. Invariance follows because the closure operations are canonical.

For a B0-valued structure with at most mu sections, passage to all B0-mixings preserves cardinality at most mu: maximal antichains are countable and |B0|^omega*mu^omega<=mu.

### 5. Small relative-algebraic-closure lemma

Let L be a full B-valued field with locally mu-sized H-orbits. One may first split B by the countable partition of its characteristic values. Those Boolean values are H-invariant, since characteristic is a parameter-free field property. Work on each fixed-characteristic piece and combine afterward. First make L perfect, if necessary, by adjoining the unique iterated p-th roots. Uniqueness makes this step equivariant and preserves the orbit bound: the image of a unique p-th root is the unique p-th root of the image, and a countable mixing only intersects countably many small-index stabilizers. Fix a finite set of coefficients in L.

The construction produces a complete invariant B0 of size at most mu and a full B0-valued perfect subfield A0 with at most mu sections, containing the given coefficients, such that after extension of Boolean scalars to B,

    A = A0 extended from B0 to B


embeds into L and is relatively algebraically closed in L internally in the B-valued universe.

Construction:

1. Begin with the H-orbits of the coefficient sections, together with 0 and 1. Their union has size at most mu.
2. Include all Boolean equality/operation truth values needed for the chosen sections, and all their H-translates. Close under Boolean operations as in Section 4, and close the section set under field operations, perfect roots, and all countable mixings over the current Boolean algebra.
3. For every monic polynomial of positive fixed standard degree d over the current small section field, take a finite Boolean-valued listing of all of its roots which already lie in L. Such a polynomial has at most d roots internally. Every internally nonzero polynomial is handled by locally normalizing its leading coefficient and refining the Boolean partition by its degree. The listing may have Boolean domains; fill missing entries with zero and retain the domains. The outer B-valued universe satisfies ZFC, so such finite listings are available there and can be represented by full sections and Boolean pieces.
4. Adjoin these listed sections, all their H-translates, and their Boolean domains and H-translates. There are at most mu polynomials and finitely many entries per polynomial, so the total remains at most mu because every section of L already has a small H-orbit.
5. Carry out these closure operations continuously through omega_1 stages in the outer ZFC universe. A more precise version need not make each intermediate Boolean algebra complete: at each successor include countable joins, complements, all countable mixing operations available from the preceding stage, the finite field operations, perfect roots, equality truth values, the selected finite root lists, and all H-orbits. At limit stages take unions.

Every stage has at most mu Boolean values and sections, and omega_1<=mu. At the final omega_1 union, each countable collection used by one of the closure operations lies below one earlier stage because omega_1 is regular in the outer ZFC universe. Thus the final Boolean algebra is countably complete, hence complete by ccc; the final section set is closed under all of its countable mixings, finite field operations, and perfect roots. It is a full B0-valued field of at most mu sections. Equality truth values lie in B0, so the embedding obtained by Boolean base change is the inclusion into L with its original Boolean equality, rather than an arbitrarily chosen abstract embedding. Each polynomial over the final section set appears at a bounded stage, so its finite list of roots in L has been included.

Relative algebraic closure: coefficients of any polynomial over the B-base-change A are locally coefficients from A0. Refining finitely many coefficient mixings gives a countable partition. On each piece the polynomial comes from A0, and every root it has in L is one of the selected finite root list, up to a further Boolean mixing. Hence that root is in A. All equality values between A0 sections were included in the recursion. Arbitrary B-mixings are introduced only after base change, as required.

### 6. Small equivariant closure and regular tensor amalgamation

By Section 5, choose a B0-valued algebraic closure D0 of A0 in the outer Boolean universe. It can be chosen to have at most mu full sections: internally A0 has size at most check(mu), a closure can have that size, and names for elements of check(mu) are countable B0-mixings, of which there are at most mu.

Every semilinear automorphism of A0 extends to a semilinear automorphism of D0. One way to formulate this is to twist D0 by the induced automorphism of B0 and then use the ordinary uniqueness theorem inside the outer Boolean universe. Choosing an extension for every member of a free basis of H, and using inverses, gives an action of H on D0. There are no additional relations to check. Each section of D0 has an H-orbit at most mu simply because the whole section set has size at most mu.

Extend Boolean scalars from B0 to B, obtaining D/A. Here scalar extension means adjoining all B-mixings of the B0-sections, with atomic truth values inherited through the complete embedding B0 into B. Field identities and inverses are preserved locally on finite tuples. Algebraic closedness is preserved because each fixed finite coefficient tuple is, on a countable common partition, a tuple from D0, where the relevant monic polynomial has a root. The same local argument preserves algebraicity and the specified embedding assertions. No unrestricted elementarity claim for the entire forcing universes is needed. The internal extension L/A is regular: A is perfect and relatively algebraically closed in L. To check the needed tensor claim directly, an irreducible polynomial over A cannot acquire a proper monic factor over L: the factor coefficients would be algebraic over A, hence in A. Every finite extension of perfect A is separable and simple, so its tensor product with L is a field. Taking the union over the finite subextensions of D shows that L tensor_A D is a domain. Its fraction field M is an algebraic extension of L. The compatible semilinear actions on D and L induce a canonical action on M; this does not require amalgamating two arbitrary difference fields.

The point of the relative-closure preparation is crucial. Without it, arbitrary equivariant amalgamation is false, even for the identity action and Frobenius on two copies of an algebraic closure of a finite field.

Every section of D is a countable B-mixing of sections of D0 and therefore has orbit at most mu. Every section of M is locally a finite rational expression in sections of L and D; countable fullness again preserves the bound mu. The originally designated polynomial now splits in M because its coefficients belong to A0 and D0 is algebraically closed.

The scope of these arguments is precise: scalar extension preserves the stated field-structure assertions by locality; the regularity criterion is applied internally after base change; the tensor construction is functorial for the compatible semilinear maps; and the orbit bound covers every full section, not merely field generators.

### 7. Iteration to a closure

Externally well-order all monic polynomials of positive fixed standard finite degree over the initial full B-valued field K. An internally variable degree is handled by the countable partition of its standard integer values. At each stage apply Sections 5–6 to the coefficients of the next polynomial. The small subfield is H-invariant, so the resulting extension still carries the same H action, even though the chosen polynomial need not be fixed by H.

At limit stages take the union followed by full B-mixing completion. Countable antichains imply that every resulting section is a countable mixing of earlier sections, so each section still has H-orbit at most mu. Algebraicity over K is a local internal assertion and is preserved by these mixings even if the degrees on different Boolean pieces are unbounded in omega. It is not external integrality of the ring of sections.

The recursion is set-sized. Choose an outer cardinal theta at least |B|, |H|, mu, and the initial full-section cardinality, with theta^omega=theta. There are at most theta initial polynomials, each successor field and each fullified limit has at most theta section labels, and all operations, truth values, actions and embeddings can be coded in a fixed set of sufficiently high rank. Outer choice therefore performs an ordinary set-length recursion, with no class-choice assumption.

At the end every polynomial over K splits, and the extension is algebraic over K. Internally this is an algebraic closure. A splitting algebraic extension of a field is algebraically closed; only the elementary finite-extension argument is needed for this last implication.

### 8. Realizing the resulting Boolean field with actual HS names

Suppose the Boolean lifting lemma has produced a set S of full sections with locally mu-sized H-orbits. For each H-orbit choose a representative s externally. Its stabilizer J<=H has [H:J]<=mu, and therefore [G:J]<=mu. The universal coordinate set A contains G/J. Use the restriction H/J within that coordinate orbit, and a pure ordinal tag for the chosen S-orbit, to code the section hs by

    c(hs) = (tag, r_(hJ)).

These names are H-equivariant and pairwise distinct with Boolean truth one. Different tags separate different H-orbits. The individual code names are hereditarily symmetric.

The Boolean equality on S need not be literal equality of the labels. For each s, form the name

    E_s = { c(t) with Boolean membership value [[s=t]] : t in S }.

After evaluation, E_s is the equivalence class of the label c(s) under the evaluated equality relation. Boolean truth one of reflexivity, symmetry and transitivity gives

    [[ E_s = E_t ]] = [[ s = t ]].

For the reverse inequality, c(s) belongs to E_s with truth one, so equality of the classes forces membership c(s) in E_t. Distinctness of all c-labels makes that membership truth exactly [[s=t]]. The forward inequality follows from transitivity of the Boolean equality.

Equivariance gives h(E_s)=E_(hs). Thus the stabilizer of the abstract section s supports the literal name E_s, and it has index at most mu. All names appearing inside E_s are HS. The name for the whole field is H-supported, and its operations are defined using the Boolean graphs of the abstract operations. Quotienting by equality ensures that they are well-defined after evaluation. First-order field, algebraicity and closure assertions therefore transfer from the Boolean-valued field.

For the embedding of the original field K, write its H-supported name as a set of pairs (t,b), where each t is HS and b forces t to be a member. For each such pair, let s(t,b) be the full section equal to t on b and to the zero section on the complement. The zero *section* is H-fixed, so h(s(t,b))=s(ht,hb) as normalized sections, independently of an arbitrary choice of a literal zero name. Define the embedding graph by including (t,E_(iota(s(t,b)))) with Boolean membership b, for every pair (t,b) in the source name. This is an H-supported literal name, and each of its constituent names is HS. It covers every evaluated element of K; if two representatives evaluate to the same element, Boolean equality implies equality of the corresponding E-classes, so it is a function. The same Boolean operation identities show that it is the intended field embedding. This avoids choosing one equivariant representative per equality class. Rank bounds remain set-sized because the source name and the section set S are sets.

### 9. Failure of finite choice and the pure-ZF separation

The old literal atom-coded witness cannot establish nonuniqueness here. Its base field is well-orderable, and replacing the element labels by distinct reals with ordinal tags gives a linearly orderable closure. An algebraic extension of a well-orderable field with a linearly orderable carrier is well-orderable: enumerate the base polynomials and order each finite root fiber. Universal coordinate orbits also contain all finite quotients relevant to any small orbit, allowing ordinary finite literal torsors to be oriented by their real codes.

A separate construction overcomes this obstruction by using Boolean-twisted pairs of **infinite sets of real labels**. For each free generator i, the tagged countable orbit G/ker(phi_i) supplies a two-sided sequence of Cohen reals. Partition the labels (n,e), n in Z and e in F_2, into two classes according to the interval parity of the first Cohen bits. Translation of the coordinate orbit acts on these classes by the Bernoulli parity cocycle.

The detailed proof is in `boolean_torsor_candidate.md`, with independent verification in `boolean_torsor_independent_audit.md`. Any H-supported selector for the family would produce, on a nonzero H-invariant Boolean domain, a solution of each parity cocycle. For an h with phi_i(h) nonzero, a finite condition deciding that solution is compatible with a sufficiently large translated power of itself, while the long interval parity still has a fresh Cohen bit. Forcing that parity to be odd gives a contradiction. Thus a selector's support H would lie in every ker(phi_i), hence in [G,G], of index kappa>mu. Such H is excluded by the filter.

Consequently the exact pure model has not AC_kappa^2, not AC_fin, and not BPI. The proof retains every auxiliary universal quotient coordinate, so it is compatible with the coordinate set needed in Section 8.

**Conclusion:** the independent audits of Sections 5–8 and the Bernoulli pair argument pass. Combining E with the established ZF theorem E + U implies AC_fin proves not U in this exact pure symmetric model. The separate countable-closure argument in `free_group_forcing_dc.md` gives DC. Thus the model satisfies ZF + E + DC + not U + not AC_fin + not BPI. No ZFA transfer theorem is used.

An explicit nonuniqueness witness is available over the well-orderable field F=Q(s_i,p_i:i<kappa): use the rational field L on variables x_(i,a), a in X_i, and the pure rational field Lprime on y_(i,0),y_(i,1), embedding F by the sums and products in each pair. Both are algebraic over F. E supplies a closure of L, and a ground well-orderable closure supplies a closure of Lprime. An F-isomorphism between them would select the unique a whose variable maps to y_(i,0), contradicting the Bernoulli pair argument. The full details are in `pure_zf_separation_section.tex`.

## 30. The Bernoulli pair family and its obstruction

The following is the full finite-condition proof used in the same symmetric system. Its existence premise has now been proved in Section 29; conditional wording in the development note records the separation of those two audit obligations.

## Bernoulli pair torsors in the universal-orbit Cohen model

**Status, 14 October 2026:** Complete forcing proof of failure of choice for a well-ordered family of pairs in the specific pure symmetric model below. The finite-condition core and full bookkeeping have now passed two independent audits. This does not by itself establish that the model satisfies E: that is the separate Boolean algebraic-closure construction in `free_group_forcing_route.md`. No novelty claim is made.

### 1. Exact symmetric system and coordinates

Work in an outer model M of ZFC. Fix an infinite cardinal mu with mu^omega=mu and a cardinal kappa>mu. Let G be the free group on the basis (b_i:i<kappa). Let

    F = {H <= G : [G:H] <= mu},
    A = disjoint union {G/J : J in F}.

Every summand is tagged by its subgroup J. Force with P=Fn(A x omega,2,<omega), with the coordinate-permutation action of G; let B=RO(P). Let N be the ordinary hereditarily symmetric extension for the normal filter F. This section needs only the specified permutation action, not freeness except for the final large abelian quotient.

For i<kappa, let phi_i:G -> Z be the exponent-sum homomorphism which sends b_i to 1 and the other free generators to 0. Set J_i=ker(phi_i). It has countable index, so the tagged G/J_i summand is present in A. Identify its labels a(i,n), n in Z, so

    g a(i,n) = a(i,n+phi_i(g)).

Let r_(i,n) be the canonical Cohen real at this coordinate, and let x_(i,n)=r_(i,n)(0) be its first bit. Distinct r_(i,n) are forced to be distinct. All these real names are hereditarily symmetric, since their stabilizers include J_i.

The other coordinates of A remain in the forcing throughout. The argument does not discard them or presume the selector depends only on the displayed coordinates.

### 2. Literal names for the pair of parity classes

For integers n,m put

    eta_i(n,m) = sum of x_(i,k), min(n,m) <= k < max(n,m), modulo 2.

These are Boolean-valued bits. They obey eta(n,m)+eta(m,l)=eta(n,l). Use the distinct real labels

    c_(i,n,e) = (e,r_(i,n)),    e in F_2.

Define the Boolean name E_(i,n,e) by including c_(i,m,f) with Boolean membership coefficient

    [[ f+e = eta_i(n,m) ]],       m in Z, f in F_2.

After evaluation, E_(i,n,e) is the equivalence class of c_(i,n,e) under the relation

    (n,e) ~ (m,f) iff f+e = eta_i(n,m).

There are exactly two classes. The exact Boolean equality is

    [[ E_(i,n,e) = E_(i,m,f) ]] = [[ e+f = eta_i(n,m) ]].        (1)

For completeness, the forward direction can be tested by membership of the distinct label c_(i,n,e), which belongs to its own class with truth one. The reverse direction follows from the parity cocycle identity, making membership of every label agree. All labels are forced distinct, so there is no additional identification.

For g in G and s=phi_i(g), the literal Boolean names satisfy

    g E_(i,n,e) = E_(i,n+s,e).                               (2)

In particular, J_i supports every E_(i,n,e). Its constituent real labels are HS, so every class name is HS. Define the name X_i to contain **all** E_(i,n,e), n in Z and e in F_2, with Boolean membership one. This convention is useful: g literally permutes the constituent names, so X_i is literally G-fixed. Its evaluated set has exactly two elements, E_(i,0,0) and E_(i,0,1), by (1).

The family (X_i:i<kappa), using pure ordinal indices, is a G-fixed HS name. Thus N contains this well-ordered family of pairs. It is essential that the two members are infinite sets of real labels. Merely coding a literal finite G-set by finitely many real labels would allow the real order to select a member.

### 3. Finite-condition recurrence for arbitrary coordinate permutations

**Lemma 1.** Let h be any permutation of the Cohen coordinate set A, acting trivially on the bit-coordinate omega. For every finite condition p, arbitrarily large positive integers n satisfy that p and h^n p are compatible.

**Proof.** On each finite h-orbit of A meeting the finite coordinate support of p, require n to be divisible by its length. There are only finitely many such requirements. On each infinite h-orbit meeting that support, choose integer positions for the finitely many involved coordinates. Avoid the finitely many positive differences between these positions. For all sufficiently large multiples of the finite periods, the finite-orbit coordinates are fixed and the infinite-orbit supports of p and h^n p are disjoint. Therefore their values agree wherever the two domains meet. This uses only finitely many orbit choices inside the outer ZFC proof. QED.

The lemma continues to hold with every auxiliary universal-orbit coordinate present, since p mentions only finitely many coordinates.

### 4. The parity cocycle has no Boolean selector on an invariant nonzero domain

**Lemma 2.** Fix i and h in G with m=phi_i(h) nonzero. There do not exist Boolean values a,b in B with a nonzero, h(a)=a, and, on the domain a, an equation

    b + h(b) = eta_i(0,m)                                  (3)

where addition means Boolean symmetric difference. The same conclusion holds if the analogous equation for every positive power h^n is known directly.

**Proof.** Iterating (3) on the h-invariant domain a, and using the shifted parity identity, gives

    a <= [[ b + h^n(b) = eta_i(0,nm) ]]                    (4)

for every positive n. Choose a finite condition p below a deciding b, say with p forcing b=epsilon. Such a p exists because Cohen conditions densely generate B. Then h^n p forces h^n(b)=epsilon and lies below a.

By Lemma 1 choose n arbitrarily large such that p and h^n p are compatible. Choose it also so |nm| exceeds the number of bit coordinates in dom(p) union dom(h^n p); a bound 2|dom(p)| suffices. Hence among the distinct first-bit coordinates

    (a(i,k),0),   min(0,nm) <= k < max(0,nm),

there is at least one not decided by p union h^n p. Extend their union to a finite condition q deciding the entire finite segment with parity 1. This is possible by assigning all other still-undecided segment bits arbitrarily and then setting one remaining bit to achieve odd parity.

Now q lies below a and forces b=h^n(b)=epsilon, while eta_i(0,nm)=1. This contradicts (4). QED.

This is a direct forcing argument. It uses neither an unproved assertion of ergodicity nor a raw-name action interpreted as an automorphism of the evaluated universe.

### 5. Failure of choice for the displayed family

**Proposition.** The symmetric extension N has no choice function for (X_i:i<kappa).

**Proof.** Suppose an HS name f evaluates to such a choice function in the given generic extension. Choose H in F fixing the literal name f. Let a be the ordinary Boolean truth value that f is a function with domain check(kappa), with f(i) in X_i for every i. This bounded assertion is absolute to the full forcing extension for the existing names. Its truth value belongs to the generic ultrafilter and is therefore nonzero. Since the family is G-fixed and f is H-fixed, a is H-fixed.

Fix i<kappa and set

    b_i = [[ (check(i), E_(i,0,0)) belongs to f ]].

Ordered pairs here are the usual pure definable construction. On a this is the Boolean event that f chooses the first parity class. For h in H, put m=phi_i(h). By literal equivariance,

    h^n(b_i) = [[ (check(i),E_(i,nm,0)) belongs to f ]].

Equation (1) and the fact that f selects exactly one of the two classes give, on a,

    b_i + h^n(b_i) = eta_i(0,nm)                          (5)

for every positive n. If m were nonzero, Lemma 2 would contradict (5). Therefore phi_i(h)=0 for every i<kappa and every h in H. Hence

    H <= intersection_i ker(phi_i) = [G,G].

But G/[G,G] is the free abelian group on kappa generators, of cardinality kappa. It follows that [G:H]>=kappa>mu, contradicting H in F. QED.

The argument does not assume that f depends on only countably many Cohen coordinates, although each individual Boolean value does. It handles arbitrary H of index at most mu, arbitrary nonzero Boolean domains on which f is a selector, and arbitrary additional universal quotient coordinates.

### 6. Consequences and exact remaining boundary

The proposition gives, for this pure symmetric model,

    not AC_kappa^2,

and therefore not AC_fin and not BPI. It also prevents a multiple-choice-to-single-choice argument from being applied to these infinite class members merely because they are built from reals.

If, independently, the Boolean algebraic-closure construction in `free_group_forcing_route.md` proves E in this same model, then the already established ZF theorem

    E + U -> AC_fin

gives not U. Under that additional verified premise, the model would give the desired pure-ZF counterexample E+not U. No use of a ZFA transfer theorem would be needed.

This note alone proves the obstruction to choice, conditional only on the standard specified symmetric-extension setup. The global E construction has a separate audit burden and must not be inferred from the cocycle proof.

### 7. Additional direct failure of Multiple Choice

The same model fails Multiple Choice as well, by an even simpler family of countable sets. Let O_i={r_(i,n):n in Z}. Each O_i is G-fixed, and the family indexed by kappa is HS. Suppose an H-supported name f selects a nonempty finite subset f(i) of every O_i, on a nonzero H-fixed Boolean domain a. For fixed i and h in H with m=phi_i(h) nonzero, strengthen a finite condition p<=a to decide

    f(i)={r_(i,n):n in S}

for a particular nonempty finite ground subset S of Z. This is possible because distinctness of the real names identifies every finite subset with a unique finite index set, and the full forcing extension adds no new finite subsets of the ground set Z. Choose a large positive n with p compatible with h^n p, and also with S disjoint from S+nm. The two conditions then force the same f(i) to equal two disjoint nonempty finite sets of distinct Cohen reals, a contradiction. Hence phi_i(H)=0 for every i, and the same abelianization-index contradiction applies. This yields not MC independently of the algebraic-closure construction.

This additional observation is not needed for the E versus U separation.

### 8. Independent audit status

The pure_zf_models agent independently checked Sections 2–5, including the literal names, nonzero truth domain, XOR orientation, arbitrary auxiliary coordinates, and fresh-bit count. That audit found no gap. The E construction received a separate independent audit, recorded in `boolean_closure_independent_audit.md`; the two proofs do not rely circularly on each other.

## 31. Final independent joint audit

## Final independent audit of the pure-ZF construction

Auditor: `uniqueness_strength`, 14 October 2026. This is a mathematical audit of a proposed proof, not a proof-assistant certificate, a literature-priority claim, or an assertion about the other implication.

### Conclusion and exact scope

After a second adversarial review of the Boolean closure construction, the Bernoulli-pair obstruction, and dependent choice, I found no remaining substantive gap, subject to the precise repairs and conventions below. The combined argument gives the relative-consistency implication

    Con(ZFC) => Con(ZF + DC + E + not U + not AC_fin + not BPI).

Here E says every field has an algebraic closure; U compares two supplied algebraic closures over their specified embeddings of the base field. More precisely the model fails choice for a particular ordinal-indexed family of pairs, so the conclusion does not require the full E+U => AC_fin theorem: the independently checked E+U => extension of F_2-linear functionals already gives the necessary choice for pairs.

This establishes the proposed direction E does not imply U over pure ZF, if the displayed proof is accepted. It does **not** settle U implies E over pure ZF. The latter remains separate. The ZFA constructions are not being transferred to obtain this result.

The proof is relative in the ordinary forcing/symmetric-extension sense. Starting from an appropriate ground model of ZFC gives the indicated symmetric model. The formal consistency implication uses the usual forcing proof formalization; it does not assert that mere consistency of ZFC proves existence of a transitive ground model.

### 1. Exact system

In the outer ZFC universe choose an infinite cardinal mu with mu^omega=mu and kappa>mu. Let G be free on generators indexed by kappa, let F consist of all subgroups of G of index at most mu, and put

    A = disjoint union of the tagged G/J, for J in F.

Force with finite partial functions A times omega -> 2, with G permuting A. This forcing is ccc. The filter F is normal and countably complete. Every condition has a stabilizer in F. Every Boolean value has orbit at most mu: a countable deciding antichain has countable coordinate support, and every coordinate orbit has size at most mu.

The actual group action is on Boolean values and names. No permutation of the evaluated pure universe is used. A subgroup supporting a field is free because subgroups of free groups are free in the outer ZFC universe.

### 2. Full input sections and the source embedding

For a hereditarily symmetric field name, include the carrier, operations and structure constants in its support. Choose a condition below its field-axiom truth value and intersect the support with that condition's stabilizer. Work on the resulting invariant complete Boolean interval.

A full section of the field is a countable antichain mixing of member subnames. Those member subnames have orbits at most mu, and so do the Boolean mixing coefficients. Consequently every full section, modulo equality with Boolean value one, has orbit at most mu. The full-section domain is a set: countable mixtures from a fixed set of source subnames and Boolean coefficients, followed by an equality-one quotient, suffice.

The final source embedding must use **all source name/coefficient pairs**. For each pair (sigma,b) in the original carrier name, normalize to the full section s(sigma,b) equal to sigma on b and to the field zero off b. The zero section is invariant even if no chosen literal zero name is invariant. Thus

    h s(sigma,b) = s(h sigma,h b).

If j is the constructed abstract field embedding, include (sigma,E_{j(s(sigma,b))}) with coefficient b in the embedding graph. This literal graph is supported by H; overlapping representatives agree by Boolean equality. It is total, injective and operation preserving after evaluation. No equivariant representative-selection principle is assumed. Transport of structure converts an embedding into literal containment of the original field if that convention is preferred.

### 3. Small relative algebraic closure: the decisive bookkeeping

The starting field can be canonically perfectified, separately on its invariant characteristic pieces. Unique iterated pth roots preserve the action and orbit bounds.

From the orbits of finitely many designated coefficients construct a small Boolean algebra and section set in **one continuous omega_1 recursion**. Close simultaneously under complements and countable Boolean joins, equality values, field operations and totalized inverses, perfect roots, countable mixings, finite root lists, and all H-translates. Each stage has cardinal at most mu.

For root listing, index **monic polynomials of a fixed positive finite degree** with coefficients among the current sections. Each degree-d polynomial has internally at most d existing roots. The outer Boolean-valued ZFC universe supplies at most d root sections with Boolean existence domains; fill unused entries with zero. Add the sections and domains and their H-orbits. Every newly selected section already belongs to the ambient field, so its orbit bound is available before selection.

At the omega_1 union every countable operation's arguments were present at an earlier stage. The final B0 is sigma-complete inside B, and ccc makes it a complete subalgebra with the same arbitrary joins. The final A0 is a full perfect B0-valued field with at most mu sections and with its original equality values in B0.

It is the **B-base-change A of A0**, not the small section set A0 by itself, which is relatively algebraically closed in the ambient B-valued field L. A polynomial over A is locally a polynomial over A0: refine its finitely many coefficient mixings to a countable partition, and first partition by degree when necessary. Every root in L is locally in a previously added finite root list. A further countable refinement expresses that root as a B-mixing of A0 sections. Thus it belongs to A.

This distinction avoids the false demand that a small external section ring already contain all Boolean idempotents of B. Completing only after a short recursion would be insufficient; the omega_1 simultaneous closure is essential.

### 4. Boolean base change and small equivariant closure

Complete Boolean base change preserves the first-order truths of the fixed field structures under discussion. A direct verification is enough: a finite tuple of new sections is locally an old tuple, and field/root witnesses on its pieces can be mixed. This is not a claim of unrestricted elementarity between the two forcing universes.

A0 internally has a surjection from check(mu); a closure D0 can be chosen internally of at most that size. The set of its full sections has cardinal at most mu externally: names for members of check(mu) are countable B0-antichain mixtures, and |B0|^omega times mu^omega is at most mu.

For each free generator of H, twist D0 by its Boolean automorphism, identify the twisted base via the given semilinear action, and use ordinary uniqueness of algebraic closures inside the outer Boolean universe. This gives a semilinear lift on D0. Choose the lifts externally on a free basis and extend by composition and inverses. No group relations beyond free reduction need to be satisfied.

After B-base-change, every D-section is a countable mixing of D0-sections and therefore has orbit at most mu.

### 5. Tensor step and iteration

Internally A is perfect and relatively algebraically closed in L, so L/A is regular. In particular L and the algebraic closure D/A are linearly disjoint. One elementary verification uses a primitive element for a finite separable subextension of D: a proper factor over L of its A-irreducible polynomial would have coefficients algebraic over A and in L, hence in A, a contradiction. Perfectness supplies separability.

Thus D tensor_A L is a domain internally, and its fraction field is an algebraic extension of L. The tensor and fraction-field constructions are functorial for compatible semilinear maps. They give the required H-action without any assertion about amalgamating arbitrary difference fields. All full sections are locally finite rational expressions and then countable mixtures, so the orbit bound persists. The designated polynomial splits.

Externally enumerate the monic positive-degree polynomials over the original field. At each stage use the preceding construction. The small coefficient field is H-invariant, so the chosen polynomial itself need not be H-fixed. At limits take the equivariant direct limit followed by full mixing completion. Algebraicity is an **internal** existential statement, preserved even when degrees are unbounded on a countable partition. At the end the extension is algebraic over the original field and splits its polynomials, hence is algebraically closed.

There is no need for class choice. Choose an outer cardinal theta at least the sizes of B, H, the initial sections and mu, with theta^omega=theta. Every relevant section domain and every iteration stage can be represented with cardinal at most theta. Fields, actions, embeddings and Boolean-valued relations on such coded domains form a fixed set. Well-order that set externally and use its least eligible coded witnesses during set-length recursion. Direct limits can be recoded with their canonical embeddings. This bounds the selection process in the ordinary outer ZFC universe.

### 6. Actual hereditarily symmetric names

For each H-orbit of final sections choose a representative s externally. Its stabilizer J has [H:J]<=mu, hence [G:J]<=mu. The universal coordinate set therefore contains G/J. A pure ordinal tag for the section orbit together with the Cohen real indexed by hJ gives a literal equivariant code c(hs). These codes are pairwise distinct with Boolean value one.

Set

    E_s = { (c(t), [[s=t]]) : t is a full section }.

Reflexivity, symmetry and transitivity of Boolean equality imply [[E_s=E_t]]=[[s=t]]. The reverse bound is detected by membership of c(s), using pairwise distinctness of the labels. Equivariance gives h E_s=E_{hs} literally. Therefore the stabilizer of s supports E_s and every constituent name is HS. The carrier and operation graphs are supported by H. This realizes the abstract closure as an actual field inside the symmetric extension. The source graph in Section 2 preserves the original field exactly as required.

The coding reals need not be independent of the Boolean equality coefficients. Only their forced pairwise distinctness and equivariance enter this verification.

### 7. Independent check of the Bernoulli pairs

For each free generator i use its exponent-sum homomorphism phi_i:G->Z and the tagged orbit G/ker(phi_i). It supplies Cohen reals r_{i,n}, n in Z. Let eta_i(n,m) be the parity of their first bits on the finite interval between n and m. On the labels (e,r_{i,n}), e in F_2, define equivalence by

    (n,e) equivalent to (m,f) iff e+f=eta_i(n,m).

There are exactly two classes. Including every class representative name makes the unordered pair X_i literally G-fixed. Each individual class is HS, supported by ker(phi_i). The family (X_i:i<kappa) is therefore an HS ordinal-indexed family of pairs.

If a selector name has support H, its nonzero Boolean truth domain a of being a selector is H-invariant. Let b_i say it selects the class represented at (0,0). For every h in H and every positive n, on a,

    b_i + h^n(b_i) = eta_i(0,n phi_i(h)).

If phi_i(h) is nonzero, choose a finite condition p below a deciding b_i. For any coordinate permutation h, arbitrarily large powers h^n make p compatible with h^n p: use a common multiple on the finitely many finite orbits mentioned by p and avoid the finitely many collisions on infinite orbits. This argument retains all auxiliary coordinates.

Both p and h^n p decide the two Boolean terms to the same value. For sufficiently large n the parity interval has a first bit outside their combined finite domains. Extend their union to make the interval parity odd, contradicting the displayed equation. Hence every h in H lies in every ker(phi_i), so H is contained in [G,G]. Its index is at least kappa>mu, contrary to being a support. Therefore the family has no choice function.

### 8. Why failure of pair choice implies failure of U here

The ZF Kummer argument in `kummer_choice_lower_bound.md` proves E+U implies extension of every F_2-linear functional on a subspace. This already chooses from any family of pairs: take the free F_2-vector space on the disjoint tagged union, and for each pair let s_i be the sum of its two formal basis vectors. The s_i are independent because the blocks are disjoint. Define a functional to take value one on every s_i and extend it. Exactly one basis vector in each block then has value one, giving a selector.

The Bernoulli family therefore contradicts E+U. Since Section 6 supplies E, U fails. This reasoning also gives actual nonisomorphic supplied closures by the twisted-base construction used in the Kummer proof; it is not merely a failure of choosing isomorphisms for a family.

### 9. DC: direct proof avoiding any ground-class selection concern

The note `free_group_forcing_dc.md` proves the stronger closure under external countable sequences, using the standard bounded-rank cover argument. For DC itself a shorter argument suffices and avoids selecting arbitrary ground names from an unbounded class.

Let X and R be HS names which evaluate to a nonempty set and a serial relation. In the full ZFC extension choose a sequence following R and take a ground forcing name for it. Below a condition forcing it to be such a sequence, for each n take a countable maximal antichain deciding its nth value equal to a member subname of the **fixed carrier name X**. Thus only countably many HS subnames and conditions occur. Intersect their supports and condition stabilizers; this is still in F. The resulting sequence graph name is literally fixed by that intersection and all its subnames are HS. Its evaluation is the chosen R-sequence. Hence DC holds in the symmetric extension.

This is compatible with failure of pair choice at the large well-ordered index kappa. It does not imply choice for arbitrary ordinal-indexed families.

### Verification boundary

The argument has been independently checked against the mathematical definitions and the earlier failed approaches. It relies on standard outer-ZFC forcing, symmetric extensions, Boolean-valued mixing, Nielsen-Schreier, elementary field theory, and set-sized recursion. It has not been mechanically formalized. No claim is made here that it is new or that it appears in a particular source. Any report should present the construction and its critical lemmas, rather than rely solely on the auditors' agreement. The pure-ZF implication U=>E remains unresolved by this audit.

## 32. Explicit closures witnessing failure of uniqueness

Use the ordinal-indexed family of pairs \((X_i:i<\kappa)\) in Section 30. Let

\[
F=\mathbb Q(s_i,p_i:i<\kappa),\qquad
L=\mathbb Q(x_{i,a}:i<\kappa,\ a\in X_i),\qquad
L'=\mathbb Q(y_{i,0},y_{i,1}:i<\kappa).
\]

The variables displayed in each field are algebraically independent. Embed F into L and L' by the pairwise elementary symmetric functions. In L, the images are \(s_i=\sum_{a\in X_i}x_{i,a}\) and \(p_i=\prod_{a\in X_i}x_{i,a}\). These finite symmetric expressions need no enumeration of the pairs. The blockwise algebraic-independence proof in Section 4 shows that these are embeddings. Every variable is a root of \(T^2-s_iT+p_i\), so both extensions are algebraic over their specified images of F.

E supplies a closure \(\Omega\) of L. The well-orderable field L' has a well-orderable closure \(\Omega'\) already by ZF, and one can use a ground-universe copy. Through the composite embeddings, both are closures of the same well-orderable characteristic-zero field F.

An F-isomorphism \(u:\Omega\to\Omega'\) would select, for each i, the unique \(a\in X_i\) for which \(u(x_{i,a})=y_{i,0}\). The polynomial has exactly its two displayed roots, since it splits already in L and has distinct indeterminate roots. This would be a selector for the forbidden family. Hence these supplied closures are not F-isomorphic. The conclusion concerns one specified pair of closures, not merely an inability to choose a family of isomorphisms.

Dependent choice in this model follows from ccc forcing, countable completeness of the support filter, and the fact that every condition stabilizer belongs to that filter. A direct proof is in Section 31. The general preservation statement is also [Karagila, Preserving Dependent Choice, Lemma 3.3](https://ueaeprints.uea.ac.uk/69607/1/Accepted_Manuscript.pdf), published in *Bulletin of the Polish Academy of Sciences: Mathematics* 67 (2019), 19–29, [DOI 10.4064/ba8169-12-2018](https://doi.org/10.4064/ba8169-12-2018). The full primary manuscript was checked, rather than inferred from its abstract.

## 33. How the successful construction repairs the failed routes

1. **Raw forcing-name permutations are not automorphisms of an evaluated field.** The final proof uses semilinear actions on Boolean-valued fields and subsequently constructs actual HS names.
2. **Finite polynomial degree does not bound orbits of Boolean mixtures of roots.** The final construction controls every full section, using countable mixing and \(\mu^{\aleph_0}=\mu\).
3. **A small external section ring need not contain all algebraic sections.** The small subfield is made relatively algebraically closed only after Boolean scalar extension. The polynomial \(T^2-T\) exposes the mistake in omitting this qualification.
4. **Arbitrary equivariant field amalgamation fails.** Preparing a perfect relatively algebraically closed base makes the existing field extension regular, so the tensor product with that base's closure is a domain and carries the compatible action canonically.
5. **Free generators can be lifted separately; group relations cannot be ignored.** Every support subgroup is free by outer Nielsen–Schreier. Extensions of its free generators consequently define an action without an unverified relation.
6. **Short closure bookkeeping is insufficient.** A simultaneous continuous \(\omega_1\) recursion closes both the Boolean values and the section set under every required countable operation.
7. **Abstract equivariant structures need not automatically have HS realizations.** Universal small-index Cohen orbits give labels; Boolean equality classes then give actual names, with exactly the required truth values and supports.
8. **Choosing one representative per Boolean equality class need not be equivariant.** The source embedding instead uses all original member-name/domain pairs, normalized by the canonical zero section.
9. **Literal finite real-labelled orbits are too easy to orient.** The counterexample uses two infinite equivalence classes of real labels, coupled by a parity cocycle. Lexicographic ordering of the individual reals supplies no selector for these classes.
10. **Auxiliary forcing coordinates cannot be discarded when proving nonchoice.** Finite-condition recurrence handles every coordinate in a proposed selector's deciding condition, including all universal quotient orbits.
11. **An all-Baire-property argument does not apply to this Cohen model.** The model already has non-Baire sets. The final parity obstruction is a direct Boolean forcing argument on any invariant nonzero domain.
12. **An ambient transfinite construction must remain set-sized.** A fixed \(\theta\) with \(\theta^{\aleph_0}=\theta\) bounds section domains and codes all candidate fields, actions and embeddings in a set; outer AC suffices.

## 34. Final questions that remain

- Does U imply E in pure ZF? No proof or pure-ZF countermodel was obtained. The basic Fraenkel and countable-support examples establish the negative answer only over ZFA.
- Does U alone imply finite choice, P, T, or BPI in pure ZF? The proved implications for linearly ordered covers and the named covering axioms are retained; the missing general covering/rank step was not established.
- Is E together with U equivalent to BPI? The report proves the forward implication from BPI and an exact finite-torsor correspondence under E, but no converse to BPI.
- Does AC_fin together with all separate fixed-finite-group compactness principles imply unrestricted T? The proof for one fixed group does not provide compatibility across all finite groups.
- What further standard choice principles characterize E alone? The pure countermodel rules out equivalence with BPI or finite choice. The root-selected strengthening is exactly E plus finite choice, as proved above.

These are unresolved *in this investigation*. No assertion of current literature openness follows merely from the search or the historical matrix.

## 35. Final artifact and verification record

Final artifact check completed at **2026-10-14 16:38:53 UTC**, approximately **1 hours 54 minutes** after the recorded start. The stop is based on the counterexample condition, not on expiration of ten hours.

- The standalone TeX source compiled successfully through two final consecutive passes using pdfLaTeX. The final log contains no warnings, undefined references, overfull boxes, or underfull boxes.
- The PDF has **33 pages**. Every page was rendered with Poppler and visually inspected in seventeen labelled spreads; no clipping, overlap, missing mathematical glyphs, or unreadable layout was found.
- The table of contents, theorem references, displayed formulas, and all seventeen bibliography entries were checked in the compiled document. The central pure-ZF construction is Section 14, pages 23–29.
- The Markdown contains the final status table, complete arguments, source provenance, failed approaches, repairs, and independent audit records. Earlier checkpoint uncertainty is explicitly superseded by the final sections.
- Text artifacts were checked for unexpected control characters, embedded absolute home paths, and common credential markers; none were found. SHA-256 hashes for the three deliverables are recorded in `SHA256SUMS`.
- The native editor compiler had earlier failed to download an uncached Tectonic dependency bundle. This final compilation is terminal pdfLaTeX validation, not a claim that the native compiler succeeded.
- Compilation and visual checks validate the artifacts. They do not prove the set-theoretic theorem. Mathematical verification consists of the written arguments and the independent audits described above; no external peer review or formal proof-assistant certification is claimed.

The principal user deliverables are `algebraic_closures_report.pdf` and `algebraic_closures_research_log.md`; `algebraic_closures_report.tex` is the standalone editable source. Intermediate proof notes and audit files remain in the workspace's `work` directory for resumption. The PDF is self-contained and does not require those intermediate files to compile.

The final mathematical result meets the user's counterexample early-stop condition. The opposite implication is explicitly unresolved, and the record retains the unsuccessful arguments rather than representing the entire two-direction classification as solved.
