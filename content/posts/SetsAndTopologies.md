+++
title = "Introduction to sets and topologies"
author = ["Joash Naidoo"]
date = 2024-04-24T00:00:00+02:00
tags = ["mathematics", "set-theory", "topology", "homotopy", "compactness"]
draft = false
math = "True"
+++

Modern physics relies on foundational mathemetical structures to describe nature. Topological spaces and sets are two of these fondational structures. Here I will outline topological spaces, how they are constructed from sets and some useful properties to describe them. This is the first in my collection of notes from the lecture series: "Geometrical Anatomy of Theorectical Physics" by Frederick Schuller.

<!--more-->

{{< youtube 1wyOoLUjUeI >}}


## Defining a set {#defining-a-set}

As physicists are interested in the fundamental structures which make up the universe, so to is mathematics interested in the most fundamental notions in logic from which all of mathematics can is built. A common starting point is the Zermelo-Frankel (ZF) axiomatic set theory.

To begin, it is not productive to ask yourself, "what is a set?" A set is simply defined by the following axioms, any analogies used to describe a set is dangerous since it may impose additional structure that simply isn't there. For example, it isn't correct to think of a set as collection of numbers, since you already have a notion of the order of numbers and how to add certain numbers together.


### Element relation {#element-relation}

In set theory, there is a postulate (assumed truth) that there is a relationship between two variables represented by the symbol \\(\in\\). Most of us have the intuition of elements beloinging to a set, however for the purposes of this text it is best to forego these intuitions and see how the following axioms describe the "\\(\in\\)" relationship.


### Axioms {#axioms}

| Axiom                | Description                                                                                                                                                                                                                                            | Formal representation or example                                                                                                          |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Axiom of Empty set   | There exists a set which contains no elements. It is a theorem that only one such "empty" set exists                                                                                                                                                   | \\(\exists x: \forall y: y  \notin x\\)                                                                                                   |
| Axiom of Pair sets   | Let \\(x\\) and \\(y\\) be sets. Then there exists a set \\(m\\) which contains as its elements _precicously_ the sets \\(x\\) and \\(y\\). i.e. \\(m\\) is \\(\Set {x, y}\\)                                                                          | \\(\forall x: \forall y: \exists m: \forall u: (u \in m \leftrightarrow u = x \lor u = y)\\)                                              |
| Axiom of Union sets  | Let \\(x\\)                                                                                                                                                                 be a set. There exists a set whose elements are precisly the elements of x | \\(\exists y: \forall u: (u \in y \land u \in x)\\)                                                                                       |
| Axiom of Replacement | Introducing a functional relation \\(R\\). The image of \\(m\\) made by \\(R\\) is a set.                                                                                                                                                              | &forall; x: &exist;! y: R(x,y)                                                                                                            |
| Axiom of Power sets  | Given a set \\(m\\) then there exists a set \\(\mathcal{P}(m)\\) whose elements are the subsets of \\(m\\). It includes the empty set \\(\emptyset\\) and the set itself \\(m\\)                                                                       | e.g. \\(\mathcal{P}(\Set {a, b, c}) = \Set {\emptyset, \Set {a}, \Set {b}, \Set {c}, \Set {a,b}, \Set {b,c}, \Set {a,c}, \Set {a,b,c}}\\) |
| Axiom of Infinity    | There exists a set that contains the empty set and with every one of its elements \\(y\\) it also contains \\(\Set{y}\\) as an element. A direct consequence of this set is the construction of the whole numbers \\(\N\\).                            | \\(\Set{\emptyset, \Set{\emptyset}, \Set{\Set{\emptyset}}, \Set{\Set{\Set{\emptyset}}}, \dots}\\)                                         |
| Axiom of choice      | This is one most popular axioms in modern mathemetics however needed for proving vector spaces have a basis.                                                                                                                                           |                                                                                                                                           |
| Axiom of fondation   | Every non-empty set x contains element \\(y\\) that has non of its elements in common with \\(x\\). This axiom avoids self referential paradoxes such as the famous "set of all sets which do not contain themselves"                                  | \\(\nexists x \in x\\)                                                                                                                    |


### Maps between sets {#maps-between-sets}

In elementary calculus, you may recall the "ruler test" when determining whether the graph being looked at was a function. Classifications like these play an important role in mathematics. The are more fundamental classification of maps which I will outline here. However, before classifying maps it is worth introducing some terminology below and although domain/preimage and codomain/image sound similar notice the distinction.

| Term              | Description                                                             |
|-------------------|-------------------------------------------------------------------------|
| Image             | The set of all the elements                                             |
| Preimage          | The preimage is the set of inputs into the maps which produce the image |
| Domain            | The preimage of a map, exists in a larger domain space                  |
| Codomain (target) | Similarly, the image of a map exists in a larger codomain space         |


#### Injective {#injective}

Every point in the domain maps to a unique point in the target. A linear function is an example of a injective map. \\(f(x) =x^2\\) is not injective since, for example, \\(x=1\\) and \\(x=-1\\) map to the same point.


#### Surjective {#surjective}

In a surjective map, the codomain and image are the same. That is to say: the map hits every point on the codomain.


#### Bijective {#bijective}

A bijective map is a map that is both injective and surjective. In other, words every element in the domain hits one unique and every element in the target. In other words, there is a one to one pairing for all points in the domain to codomain. Bijective maps are important for describing isomorphisms (i.e. maps which preserve the structure between two spaces and is a recurrent theme in mathematics). This is obvious


### Equivalence relation {#equivalence-relation}

It should not be taken for granted when we call two "things" equivalent, we must define them rigourously. In set theory an equivalence relation between two elements of a set must obey the following axioms:

1.  Reflexive
2.  Symmetric
3.  Transistive

Given a set \\(M\\) and an equivalence relation we can define a set \\([m] \coloneqq {n \in M | m \sim n}\\). Such a set \\([m]\\) is called and equivalence class. Equivalence classes are important in homology discussed much later.


## Defining a toplogy {#defining-a-toplogy}

Following the definitions for sets, the weakest structure required to provide a notions of convergence and continuity in a set is to introduce a topology. A topology is a choice of subsets, which provide a notion of "closeness." A topology on a set \\(A\\) is a choice of subsets \\(\mathcal{O}\\) which fulfill the following axioms:

1.  \\(\empty, A \in \mathcal{O}\\)
2.  \\(U, V \in \mathcal{O} \implies \cap \Set{U, V} \in \mathcal{O}\\)
3.  \\(C \subseteq \mathcal{O} \implies \cup C \in \mathcal{O}\\)


### Common toplogies {#common-toplogies}


#### Standard {#standard}

The standard topology \\(\mathcal{O}\_{\text{s.t.}}\\) is only defined for sets with elements in \\(\R^d\\). The intuition is creating "open balls" at center \\(x \in \R^d\\) with radius \\(r\\) which correspond to the subsets chosen for the topology. All points which fall within these subsets (i.e. balls) provide the "notion of closeness" needed when constructing a topology.

\\[\forall x \in \R^d \quad{\text{for every point in set construct ball with point at center}}\\]
\\[\forall r \in \R^+\ \quad{\text{for every positive ball size}}\\]
\\[B\_r(x) \coloneqq \Set { \underbrace{y}\_{(y^i, \dots, y^d)} \in \R^d | \sqrt[2n]{\sum\_{i=1}^{d}(y^i-x^i)^{2n}} < r}\\]

There a set \\(U\\) is an element of the standard topology \\(\mathcal{O}\_{\text{s.t.}}\\) if:

\\[\forall p \in U: \exists r \in \R^{\*}\\]


#### Chaotic and discreet {#chaotic-and-discreet}

Are followign two topologies are the extremes in possible choices of subsets one could select when creating a topology. The chaotic toplogy is the simplest although not very useful. Simply in the chaotic toplogy, the choices of subsets for a set \\(M\\) is simply empty set and the set iteself (i.e. \\(\emptyset, \Set {M} \in \mathcal{O}\_{M(\text{chaotic})}\\)). The chaotic topology only has two subsets. On the other extreme, the discreet toplogy for set \\(M\\) includes the emtpy set and the power set of \\(M\\) (i.e. \\(\emptyset, \mathcal{P}(M) \in \mathcal{O}\_{M(\text{discreet})}\\))


#### Initial {#initial}

The initial topology is simply defined as the weakest topology needed such that all the functions on a set \\(M\\) are continuous.


### Open, closed and clopened {#open-closed-and-clopened}

Elements of a toplogy \\(\mathcal{O}\\) by definition are called _open_ sets. A subset \\(A\\) in a topological space \\((M, \mathcal{O})\\) is _closed_ if \\(M\backslash U \in \mathcal{O}\\), where \\(M\backslash U\\) is a _complement_ of M with respect to U (i.e. M without elements of U). When working with the standard topology, the ideas of open and closed become a little more intuitive. For an open subset, we can construct balls on the boudary of subset. No matter how small the balls are, there will be points contained within the ball that lie both inside and outside the subset. This is not the case for a closed subset.

It is important to note an open set is not the opposite of a closed set. If a subset \\(U\\) and its complement \\(M\backslash U\\) are elements in the topology \\(\mathcal{O}\\) it is both open and closed. Hence the new term: clopened. Shown below, is an example of two subsets \\(M\\) and \\(\empty\\) which are both open and closed that exist for any topology \\((M, \mathcal{O})\\).

\\[ M \backslash M = \empty \in \mathcal{O} \\]
\\[ M \backslash \empty = M \in \mathcal{O} \\]


### Continuity {#continuity}

Should we create a map \\(\phi: M \rightarrow N\\) between two topological spaces \\((M, \mathcal{O}\_M)\\) and \\((N, \mathcal{O}\_N)\\) is continuous if for every open subset in \\(\mathcal{O}\_V\\) (i.e. target space) the pre-image is an open subset in \\(\mathcal{O}\_M\\) (i.e. domain). Formally:

\\[\forall V \in \mathcal{O}\_N : \text{preimg}\_{\phi}(V) \in \mathcal{O}\_M\\]


### Convergence {#convergence}

A sequence \\(q \coloneqq \N \rightarrow M\\) acting on a topological space \\((M, \mathcal{O})\\) converges on a limit point \\(a \in M\\), if the image of the sequence \\(q\\) all lie in the same open neighbourhood as \\(a\\). Formally expressed below, we introduce a starting point \\(N\\) for the sequence. Thinking in terms of the standard topology, we visualize smaller and smaller balls with contain the limit point that the image of the sequence must fall into, hence convergence.

\\[\forall \underbrace{U}\_{\ni a} \in \mathcal{O}: \exists N \in \N: \forall n > N: q(n) \in U \\]

In a chaotic topology, since there is only one choice of subset in which a limit point may lie (recall the only other subset is \\(\emptyset\\)), then call elements in the sequence will converge on all other points in the subset. Hence the name "chaotic". Referring back to our notion of closeness, this single subset in which our limit point may lie makes it feel as though all elements in the set are equally close hence this result.


## Homeomorphism (Isomorphism between toplogies) {#homeomorphism--isomorphism-between-toplogies}

Another recurrent theme in mathematics is that of structure preserving maps. Often a problem is easier solved in another context and the only way to transfer the problem to the desired context is through a structure preserving maps. Common examples, would be the Laplace transform

If there exists a bijective map \\(\phi: M \rightarrow N\\) between topologies \\((M, \mathcal{O}\_M)\\) and \\((N, \mathcal{O}\_N)\\). Obviously as a bijection there is a one to one mapping between the _sets_ \\(M\\) and \\(N\\). At a set level, a bijective map is a structure preserving map between sets, thus the sets are isomorphic \\(M \cong\_{\text{set}} N\\). At a topological level, the map \\(\phi\\) is **homeomorphic** (a.k.a. "homeo") if it is continuous and inverse of map is also continuous. This means there is a one to one mapping of the open sets between the two topologies. Hence, homeomorphisms are therefore the structure preserving maps between topologies and if such "homeo" map exists, then the two topologies are (topologically) **isomorphic** (i.e. \\((M, \mathcal{O}\_M) \cong\_{\text{iso}} (N, \mathcal{O}\_N)\\)). Topological isomorphism is also referred to as a **homeomorphism**.


## Properties of topological spaces {#properties-of-topological-spaces}


### Separation properties (Hausdorff) {#separation-properties--hausdorff}

Looking at two distinct points \\(p \neq q\\) in \\((M,\mathcal{O})\\), we can classify the space into one of the following separation groups. The groups increase in their strictness. As such if a toplogy is classified as T2 they are also T1.

| Name                | Definition                                                                           | Explanation                                                                           |
|---------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| T1                  | \\(\exists p \in U \in \mathcal{O}: q \notin U\\)                                    | There exists an open neighbourhood around \\(p\\) that does not contain \\(q\\)       |
| T2 (Hausdorff)      | \\(\exists p \in U \in \mathcal{O}, q \in V \in \mathcal{O}: U \bigcap V = \empty\\) | There exists open sets around \\(p\\) and \\(q\\) respectively which do not intersect |
| T2\\(\frac{1}{2}\\) |                                                                                      | There exists a closed neighbourhood around \\(p\\) which does not contain \\(q\\)     |

It is interesting to note, by definition the chaotic topology \\((M, \Set{ \empty, M})\\) cannot even be classified as T1.


### Compactness / Paracompactness {#compactness-paracompactness}

In real analysis, a function applied to a _finite_ set will have a maximum and minimum. "Finite-ness" is useful since by breaking the ability of breaking domain of a function into finite subsets, we can conclude "global" properties of the function (i.e. there exists a maximum and minimum value). Compactness extends this idea of "finite-ness" to topological spaces which is useful to avoid issues of convergence later.

A topological space is compact if every open cover has a finite subcover. An open cover \\(C\\) is the set of subsets of \\(M\\), such that the union of all subsets include all the points in \\(M\\) (i.e. \\(\bigcup C = M\\)). Naturally, a cover may have infinite subsets or simply include subsets which are redundant for the purposes of covering all the points in \\(M\\). Hence only a finite subcover \\(\tilde C \subseteq C\\) is necessary to cover \\(M\\). Note compactness isn't interested in finding whether a finite number open subsets will cover a topological as all topological spaces can be covered by a single open subset (namely, the set \\(M\\) itself is an open subset for the toplogy of \\(M\\) by definition).

A weaker notion of compactness, is _paracompactness_. Any compact set is also paracompact. A topological space is paracompact if every cover \\(C\\) has an open refinement \\(\tilde C\\) that is _locally_ finite.

\\[\forall p \in M: \exists U \in \mathcal{O} \text{s.t. } U \bigcap \tilde U \neq \empty \\]


### Connectedness and path connectedness {#connectedness-and-path-connectedness}

A topological space is connected if there exists no two non-empty, non-intersecting open sets \\(U\\) and \\(V\\) such that \\(M = U \dot\bigcup V\\)

It follows as a theorem that a topological space is connected if and only if the \\(\empty\\) and \\(M\\) subsets are the only two subsets of topology that are both open and closed.

A topological space is path connected if for every pair of points \\(p\\) and \\(q\\) in a topological space, there exists a continuous paramterized curve \\(\gamma: [0, 1] \rightarrow\\) such that \\(\gamma(0) = p\\) and \\(\gamma(1) = q\\). Path connectedness is a stronger notion than connecteness. Hence if a topological space is path connected, it is also connected.


### Homotopic curves and the fundamental group {#homotopic-curves-and-the-fundamental-group}

Most introductory material on topology often discusses how in topology sees mugs and donuts as the same. Section explain the reasoning behind this idea. Consider two parametric curves on the topological space M, such that they start and end at the same point.

\\[ \gamma: [0, 1] \rightarrow M \\]
\\[ \delta: [0, 1] \rightarrow M \\]
\\[ \gamma(0) = \delta(0) \text{ and } \gamma(1) = \delta(1) \\]

These two curves are homotopic if there exists a continuous map \\(h: [0, 1] \times [0, 1] \rightarrow M\\)
Visually, this means the two curves can be deformed into each other, hence there is an equivalence relationship between the two curves. This also means they will belong to the same equivalence class.

{{< figure src="https://upload.wikimedia.org/wikipedia/commons/7/7e/HomotopySmall.gif" class="img" >}}

However, it worth considering curves which are not homotopic. First define the set of all continuous loops \\(\mathcal{L}\\) at a point \\(p\\) on a topological space \\(M\\) and a concatenation operation \\(\*\_p\\) as follows.

\\[ \mathcal{L}\_p \coloneqq \Set{ \gamma: [0, 1] \rightarrow M | \gamma \text{ is continuous and } \gamma(0) = \gamma(1)} \\]
\\[ \*\_p : \mathcal{L}\_p \times \mathcal{L}\_p \rightarrow \mathcal{L}\_p \\]

If a hole is placed in the center of one of the loops, there is no way one loop can be deformed into the other and so the two loops will belong to two different equilavence classes. For a higher dimensional space, such as a torus, loops can be wound around the center hole or wound through the center along the outside of the torus. These two different windings also cannot be deformed into each other and so belong to two different equivalence classes. In summary, therefore, homotopy studies the "holes" of a topology.

The **fundamental** group is the set of all equivalence classes of loops constructed from the space of all loops at a point \\(p\\). A group is simply a set equipped with an operation. The operation equipped for the fundamental group is the concatenation operation.

\\[\pi\_{1, p} \coloneqq {\mathcal{L\_p} / \sim}  = \Set{ [\gamma] | \gamma \in \mathcal{L}\_p} \\]


## Construction of topological spaces from old {#construction-of-topological-spaces-from-old}

Given known topological spaces, we can contruct other topological spaces without rigoursly checking if the new space meets the topology axioms.


### Induced toplogy {#induced-toplogy}

If \\((M, \mathcal{O}\_M)\\) is a topological space and \\(N \subseteq M\\), then we can induce a new topology \\(\mathcal{O}\_N\\) as follows.

\\[\mathcal{O}\_N \coloneqq \Set{U \bigcap N | U \in \mathcal{O}\_M} \subseteq \mathcal{P}(N) \\]


### Product topology {#product-topology}

Given two topological spaces \\((M, \mathcal{O}\_M)\\) and \\((N, \mathcal{O}\_N)\\), one can construct a new topological space \\((M \times N, \mathcal{O}\_{M \times N})\\) as the cartesian product (i.e. pairs of points from both \\(M\\) and \\(N\\)) between the two topologies. \\(\mathcal{O}\_{M \times N}\\) is defined as:

\\[ U \in \mathcal{O}\_{M \times N} : \forall p \in U: \exists S \in \mathcal{O}\_M, T \in \mathcal{O}\_N: S \times T \subseteq U\\]

Product topologies will appear again when discussing simple fibres in a bundle structure (see below).


## Bundles and atlases {#bundles-and-atlases}

Bundles are another important structure we can impose on a topological space. It is the triple consisting of a total toplogy \\(E\\) and a continuous surjective map \\(\pi\\) to a "base" toplogy \\(M\\). Any time we are dealing with these three objects, we are dealing with a bundle structure. From these three objects we can also infer another object called the fibre \\(F\_p\\) at a point \\(p \in M\\) as the \\(F\_p \coloneqq preim({p})\\).
