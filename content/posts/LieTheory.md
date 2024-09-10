+++
title = "Lie theory"
author = ["Joash Naidoo"]
date = 2024-09-09T00:00:00+02:00
tags = ["mathematics", "group-theory", "manifolds", "symmetry", "Lie-theory", "physics"]
draft = false
math = "True"
+++

Lie theory marries manifolds to group theory. Groups are mathematical structures used to describe symmetries. Note, symmetries extend beyond our initial intuition of discrete rotations and reflections of shapes. Instead symmetries describe phenomena which do not change the outcome of an experimental observation. For example an experiment done today should have the same result if done tomorrow. By treating groups as manifolds we can model _continuous_ symmetries and use our tools of differential geometry to describe these groups.

<!--more-->

This the fourth writeup in my collection of notes from the lecture series: "Geometric Anatomy of Theoretical Physics" by Frederick Schuller.

{{< youtube mJ8ZDdA10GY >}}


## Lie groups {#lie-groups}

Although I have spent quite a few words on "symmetries", I find it is best to study groups abstractly and only then see how groups can be applied to represent symmetries. Beginning with a set \\(G\\), a group \\((G, \bullet)\\) is a set equipped with a single operation.

One example of a group is the general Lie group \\(GL(n, \R)\\). The general linear group is constructed from the set of endomorphisms (linear maps taking a vector from space to another vector in the same space) equipped with the composition of maps operation. The set is restricted to linear maps whose determinant is non-zero.

\\[ G \coloneqq \Set{ \phi: \R^n \xrightarrow{\sim} \R^n | det(\phi) \not = 0}\\]

A subgroup of \\(GL(n, \R)\\) is the special linear group \\(SL(n, \R)\\) which adds an additional restriction that the determinant of the transformation is one. Another subgroup of \\(GL(n, \R)\\) is the orthogonal group \\(SO(n, \R)\\), which is the set of transformations which also preserve the Euclidean inner product. Subgroups is an important theme in the study of groups and will be explored later.

There is a type of group which is of particular interest to us, namely: A Lie group. A Lie group, is first and foremost a group. A Lie group is also a group which can be represented as a smooth manifold. This may seem odd at first even when considering smooth manifolds are abstract structures (i.e. just a sets equipped with a topology and a smooth atlas). It helped me considering manifolds are useful for representing **continuous** transformations. An example is the continuous rotations group \\(SO(3)\\) in \\(\R^3\\) and is represented as solid sphere manifold. Each point will lie on some axis of the sphere, and hence correspond to some angle rotation along that axis. The distance away from that axis represents the angle of rotation. Hence each point on this manifold represents some rotation operation. By considering groups as manifolds, we can also apply the differential geometry tools made available to us.

The vector field of an example \\(SO(3)\\) Lie group (i.e. the rotations in \\(\R^3\\)) may indicate the velocities of various rotations. Recall, a point on Lie group manifold represents some rotation operation, and the tangent space at a point can have the interpretation of all the possible velocities of possible curves through that point.


## Left translation operation {#left-translation-operation}

For any (Lie) group, we can define a left translation map \\(l\_g\\)  which fixes an element \\(g \in G\\) and applies it after any element \\(h \in G\\). Although the notation is strange, simply keep in mind we are studying the behaviour of a function which applies \\(g\\) after any other element in the group. It doesn't matter what \\(h\\) is in the study of this function \\(l\_g\\). For intuition, also consider \\(l\_g\\) produces a manifold isomorphic to \\(G\\) and we will see later which properties can be pushed forward or pulled back between these two manifolds.

\\[l\_g: G \rightarrow G\\]
\\[h \mapsto l\_g(h) \coloneqq g \cdot h\\]


## Push forward and pull back for \\(l\_g\\) {#push-forward-and-pull-back-for-l-g}

Recall, for a given map \\(\phi: M \rightarrow N\\), we can infer properties between the two manifolds. \\(l\_g\\) is such a map. First we can define a pull back map \\(l\_{g^{\*}}\\) which, given knowledge of the covectors for points in \\(N\\), allows us to infer to the covectors at the mapped point in \\(M\\). We were able to extend this pull-back map, such that the covector field in \\(N\\) can tell us about the covector field in \\(M\\). Notice, we can't simply extend the push forward map \\(l\_{g\_{\*}}\\) in the same way. We can't push a vector field acting in \\(M\\) to \\(N\\) the same way we can push the vector at a point in \\(M\\) to \\(N\\). A vector field can only be pushed to \\(N\\) if the map \\(\phi\\) is smooth and diffeo.


## Left-invariant vector fields {#left-invariant-vector-fields}

Given a Lie group \\((G, \bullet)\\) a vector field \\(X\\) on \\(G\\) is **left-invariant** if the vector field remains the same after it is pushed forward by \\(l\_{g^{\*}}\\).

\\[ X = l\_{g^{\*}}X \\]

More practically, when thinking of the tangent vectors individually at a point \\(h\\) or acting on some smooth function \\(f \in C^{\infty}(G)\\) we can use the definitions below. In both cases, the push forward of tangent vector at a point \\(h\\), is equivalent to the tangent vector after just applying a transformation \\(g\\) after \\(h\\). Note that the set of all left-invariant vector fields on \\(G\\) is given the symbol \\(L(G)\\) and naturally \\(L(G)\\) is a subset of the set of all vector fields \\(\Gamma(TG)\\).

\\[\forall h \in G: l\_{g\*}(X\_h) = X\_{gh}\\]
\\[\forall f \in C^{\infty}(G): X(f \circ l\_g) = (Xf)\circ l\_g\\]
\\[L(G) \subset \Gamma(TG) \\]

As shown in the previous post, a set of vector fields can be made into an algebra by introducing the bilinear **commutator** operation. Similarly we can equip the set of left-invariant vector fields \\(L(G)\\) with the same **commutator** operation. However, we will label this operation the **adjoint**. Thus the adjoint is simply an operation which measures the commutativity of two vectors (i.e. derivative operators) belonging to a left-invariant vector field. Although the notation may look strange, keep in mind it allows us to study the _general_ behaviour of the operator irrespective of the operands.

\\[ad: L \xrightarrow{\sim} L\\]
\\[ad(h) \coloneqq [h,\cdot] \quad h \in L\\]


## Lie algebras {#lie-algebras}

Recall an algebra is a vector space equipped with "product" operation. The vector space in question is the tangent vector space at a point on the Lie group. This vector space is equipped with a Lie bracket \\(\llbracket \cdot, \cdot \rrbracket\\) to become a Lie algebra.
The Lie bracket has the following properties:

1.  Bilinear
2.  Anti-symmetric
    \\[ \llbracket x, y \rrbracket = - \llbracket y, x \rrbracket \\]
3.  Jacobi identity
    \\[ \llbracket x, \llbracket y, z \rrbracket \rrbracket + \llbracket y, \llbracket x, z\rrbracket \rrbracket + \llbracket z, \llbracket x, y \rrbracket \rrbracket = 0 \\]

It is important to note that the Lie bracket is different to the "commutator" bracket of vector fields, but we will try to define the Lie bracket in terms of the commutator of vector fields.

Finally a Lie algebra is differentiated from the Lie group by being written in lower case Fraktur font. For example the Lie group \\(SO(3, \R)\\) has corresponding Lie algebra \\(\frak{so}(3, \R)\\).


## Isomorphism between vector fields on Lie groups and vectors in Lie algebra {#isomorphism-between-vector-fields-on-lie-groups-and-vectors-in-lie-algebra}

There is an equivalence between thinking of a vector field or simply thinking about the tangent space at the identity operation of a Lie group.

\\((L(G), [\cdot, \cdot]) \cong (T\_eG, \llbracket \cdot, \cdot \rrbracket)\\)

To shift between these two spaces, we can introduce the **exponentiation** map.


## Classifying Lie subgroups and subalgebras {#classifying-lie-subgroups-and-subalgebras}

As we will see in the following sections, an important theme in group theory is to study the subgroups (and respective subalgebras) of a Lie group. The goal is be able to decompose a Lie algebra into a "product" of simple Lie algebras and subalgebras.


### Ideals of a ring {#ideals-of-a-ring}

Recall a ring is a set equipped with a multiplication operation which does not require an inverse. For any ring, we can construct a subset of the ring \\(I \subset R\\) preserving the same multiplication operation. This subset is an ideal of the ring. A simple example of a ideal for the ring of integers \\(\Z\\) is all the even numbers. The product of two even numbers will itself be an even number. For any ring there are at least two **trivial** ideals, the identity of the ring (since the product of identity, the only element of this ideal, with itself is the identity) and the ring itself.

Ideals for a ring a analogous to subgroups. I discussed earlier how \\(SL(n, \R)\\) and \\(SO(n, \R)\\) are subgroups to the Lie group \\(GL(n, \R)\\). Following this, we can extend the notion of ideals to Lie algebras. Recall the isomorphism between the Lie group and its algebra. The ideal of a Lie _algebra_ is therefore a sub-vector space (group equipped with a Lie bracket \\([\cdot, \cdot]\\)) such that \\([I, L] \subset I\\). Similarly to rings, Lie algebras have the following trivial ideals.

\\[ [\Set{0}, L] = \Set{0} \\]
\\[ [L, L] \subseteq L \\]


### Solvable groups and Lie algebras {#solvable-groups-and-lie-algebras}

Another important subgroup of a group is the commutator subgroup. Recall the commutator is a measure of how close two operations are to being commutative (i.e. abelian).

Extending this notion to algebras:

\\[\Set{0} \subset \dots \subset [[R, R], [R, R]] \subset [R, R] \\]

A trivial example of a solvable Lie algebra is an abelian algebra since by definition \\([a, a] = 0\\).


### Simple Lie groups and Lie algebras {#simple-lie-groups-and-lie-algebras}

A group is simple if it is non-trivial and does _not_ contain any non-trivial ideals (i.e. can't construct any ideals from the group other than the two trivial ideals).


### Normal subgroups {#normal-subgroups}

\\[H \subset G: x \in H: xHx^{-1} = H\\]


### Levi Decomposition {#levi-decomposition}

Any finite dimensional Lie algebra can be decomposed as follows, where \\(R\\) is a **solvable** Lie subalgebra and \\(L\_1, \dots, L\_n\\) are **simple** Lie algebras.

\\[L = R \oplus (L\_1 \oplus \dots \oplus L\_n)\\]


## Killing form of a Lie algebra {#killing-form-of-a-lie-algebra}

The Killing form is a bilinear map which we will equip to a Lie algebra. It is defined abstractly, but the operation acts as a pseudo inner product for semi-simple Lie algebras.


### Inner product space of an algebra {#inner-product-space-of-an-algebra}

Recall a vector space is simply a set equipped with addition and s-multiplication operations. We have yet to describe an operation that will allow us to calculate geometric lengths and angles of vectors. Thus, one can introduce the inner product operation, a bilinear map, which will allow us to do just that. Such a map must have the following properties:

-   Linear (by definition)
-   Positive definiteness
-   Conjugate symmetry (specifically for vector spaces with an underlying \\(\cnums\\) field)

Interesting examples of inner product spaces for the tangent space of a manifold equipped with an inner product gets the name: **Riemannian manifold**. This manifold is particularly useful in describing general relativity. However, to build up to the Killing form, one must recognize we can weaken the positive definiteness property of the inner product.


### Trace operation {#trace-operation}

The trace of a matrix is an interesting operation which requires us to first consider how it is defined in terms of the matrix components, but then it proves to not rely on a basis and provides deeper insight to the eigenvalues and inner product space for that matrix (i.e. linear transformation). The trace of a matrix is given as:

\\[tr(A) = \sum^{n}\_{i=1} a\_{ii}\\]

To show the trace operation does not depend on a basis consider two similar matrices \\(A\\) and \\(B\\) with different basis. A matrix \\(B\\) is similar to \\(A\\) if there exists an invertible matrix \\(P\\) such that \\(B = P^{-1}AP\\).

\\[tr(B) = tr(P^{-1}AP) = tr(P^{-1}PA) = tr(A)\\]

Thus we see the trace \\(tr\\) is an element of the set of endomorphisms for a vector space \\(V\\) (i.e. $f: V \xrightarrow{\sim} V $). It is also trivial to show \\(tr(AB) = tr(BA)\\), thus the trace is an operation which is natural to introduce when defining operations that must be symmetric (such as the inner product). It also follows directly since \\(tr(AB) = tr(BA)\\), then that if the trace of the commutator between \\(A\\) and \\(B\\) is zero (i.e. \\(tr([A, B]) = 0\\)).


### Killing form {#killing-form}

\\[K: L \times L \xrightarrow{\sim} \cnums \\]
\\[ K(a, b) \coloneqq tr(ad(a) \circ ad(b)) \\]

Note the Killing form is symmetric \\(K(a,b) = K(b,a)\\), a property inherited by the trace operation.


## Degenerate and non-degenerate forms {#degenerate-and-non-degenerate-forms}

Recall an algebra is equipped with a bilinear form: \\(f: V \times V \xrightarrow{\sim} K\\). A non-degenerate form implies if the bilinear map maps to \\(0 \in K\\), then at least one of the arguments to the map is \\(0 \in V\\). Formerly:

\\[ \forall y \in V: f(x, y) = 0 \implies x = 0\\]

This is significant since it implies the bilinear map in _injective_. It follows, if the map does not hold the non-degeneracy property, then the map is degenerate.


### Semisimple Lie algebra {#semisimple-lie-algebra}

Using our definitions of a non-degenerate linear map, there is the following theorem: A Lie algebra is semisimple if and only if the Killing form is non-degenerate. And if the Lie algebra is semisimple, we can think of the Killing form as the pseudo-inner product acting on the Lie algebra.


## Group generators and the Cartan subalgebra {#group-generators-and-the-cartan-subalgebra}


### Generators of a group {#generators-of-a-group}

A generating set of a group, is a subset of the group equipped with the group operation which can generate every element within larger the group. Consider the set of integers equipped with the addition operation to form the group of integers. All integers could be generated from the subset \\(\Set{1}\\) equipped with addition operation (for which the inverse is \\(-1\\)).


### Cartan subalgebra {#cartan-subalgebra}

For any finite dimension Lie algebra, there exists a Cartan subalgebra \\(H\\), which is a generating subalgebra for a Lie algebra \\(L\\). The Cartan subalgebra has a basis \\(h\_1, \dots h\_m\\), which can be extended (generates) the rest of the basis vectors \\(e\_1, \dots, e\_{d-m}\\) for the entire Lie algebra. These basis vectors are the eigenvectors for any \\(ad(h)\\) where \\(h \in H\\). That is to say the commutator between vector \\(h\\) in Cartan subalgebra and basis vector \\(e\_\alpha\\) in Lie algebra will simply produce a scaled basis vector \\(\lambda\_\alpha(h) e\_\alpha\\).

\\[H \subset L\\]
\\[\underbrace{ad(h)\underbrace{e\_\alpha}\_{\text{vector (i.e. derivative operator)}}}\_{\text{commutator for 2 vectors}} = \underbrace{\lambda\_\alpha(h)}\_{\in \cnums}e\_\alpha\\]

Take note \\(\lambda\\) is a linear map \\(H \xrightarrow{\sim} \cnums\\), hence belongs to the dual of Cartan subalgebra \\(H^\*\\). The set of these linear maps is referred to as the **root set** \\(\Phi\\).

\\[ \Phi \coloneqq \Set{\lambda\_1, \dots, \lambda\_{d-m}} \subset H^\* \\]

The root set of the Cartan algebra are not linearly independent. The root set _always_ contains a linearly independent subset \\(\Pi\\) called the fundamental roots which cover the entire span of \\(H^{\*}\\) (i.e. we can find a basis for \\(H^\*\\)).

\\[\Pi \subset \Phi\\]
\\[span(\pi) = H^{\*} \quad\text{where } \pi \in \Pi\\]
\\[\forall \lambda \in \Phi: \exists n\_1, \dots, n\_f \in \N: \exists \epsilon \in \Set{-1, 1}: \lambda = \epsilon \sum^f\_{i=1}n\_i\pi\_i\\]

It is also useful to define the Killing form \\(K^\*\\) which acts on elements of the dual of the Cartan subalgebra and maps them to the underlying field, as per the aforementioned definition. This tremendously useful, since as mentioned previously, if the Killing form is positive definite and non-degenerate, then it acts as a pseudo inner product which allows us to calculate the lengths and angles between the fundamental roots (i.e. the linear independent basis vectors of the Cartan subalgebra).

\\[K^\*: H^\* \times H^\* \rightarrow \cnums\\]
\\[K^\*(\mu, v) \coloneqq K(i^{-1}(\mu), i^{-1}(v)) \quad\text{where}\\]
\\[i : H \rightarrow H^\*\\]
\\[i(h) \coloneqq K(h, \cdot)\\]


### Properties of Cartan subalgebra {#properties-of-cartan-subalgebra}

If the Lie algebra is simple, then the Cartan subalgebra \\(H\\) is abelian (i.e. \\([H, H] = 0\\))


## Weyl transformation and group {#weyl-transformation-and-group}

Recall the fundamental roots \\(\Pi\\) of a Cartan subalgebra \\(H\\) are the set of linearly independent maps to determine the eigenvalues of the remaining basis vectors of the entire Lie algebra \\(L\\). These linear maps form part of a larger set called the root set \\(\Phi\\). This section simply looks at how we can reconstruct \\(\Phi\\) given \\(\Pi\\). We will require the map \\(K^\*\\), which was introduced in the previous section, and under certain conditions, provides us with a notion of calculating lengths and angles between the fundamental roots. To reconstruct \\(\Phi\\), introduce a linear map \\(s\_\lambda\\) which takes an element in the dual of the Cartan algebra and maps it to another element in the dual of the Cartan algebra. This map is called the Weyl transformation.

\\[s\_\lambda: H^\* \rightarrow H^\*\\]
\\[s\_{\lambda}(\mu) \coloneqq \mu - 2 \frac{K^{\*}(\lambda, \mu)}{K^\*(\lambda, \lambda)}\lambda \\]

We can construct group \\(W\\) as the set of Weyl transforms for roots in the root set (i.e. \\(\lambda \in \Phi\\)) with the composition of maps as the group operator.

\\[W \coloneqq \Set{ s\_\lambda | \lambda \in \Phi }\\]
\\[\forall w \in W: \exists \pi\_1, \dots, \pi\_n \in \Pi: w = s\_{\pi\_1} \circ \dots \circ s\_{\pi\_n}\\]

Thus we see every root is produced by the action of the Weyl group and it is the "repeated action" of Weyl group generates the root space (i.e. Weyl group merely permutes the roots).

\\[\forall \lambda \in \Phi: \exists w \in W, \pi \in \Pi: \lambda = w(\pi)\\]
\\[\forall w \in W: \forall \lambda \in \Phi: w(\lambda) \in \Phi \\]


## Classifications of Lie groups via Dynkin diagrams {#classifications-of-lie-groups-via-dynkin-diagrams}

Steps to draw a Dynkin diagram:

1.  For every fundamental root, draw a circle
2.  For \\(\pi\_i, \pi\_j \in \Pi\\), draw \\(n\_{ij}\\) lines between them
3.  For \\(n\_{ij} \in \Set{2,3}\\) use \\(<\\) or \\(>\\) sign to relate them

{{< figure src="/ox-hugo/Connected_Dynkin_Diagrams.svg" >}}

From the Dynkin diagram, we can classify two Lie algebra series. The classical series includes \\(A\_l: l \geq 1\\), \\(B\_l: l \geq 2\\), \\(C\_l\\) and \\(D\_l\\). The exceptional series includes \\(E\_6\\), \\(E\_7\\), \\(E\_8\\), \\(F\_4\\) and \\(G\_2\\).


## Representation of a Lie algebra {#representation-of-a-lie-algebra}

A linear representation \\(\rho\\) of a Lie algebra is a linear map to the set of endomorphisms for a vector space \\(V\\) (i.e. maps from the vector space into itself) such that the Lie bracket is simply the commutator in the **representation space** \\(V\\).

\\[\rho: L \xrightarrow{\sim} End(V)\\]
\\[\rho(\llbracket a, b \rrbracket) = [\rho(a),\rho(b)] = a \circ b - b \circ a \\]

A single Lie algebra may have multiple representations. For example the Lie algebra \\(\frak{so}(3, \R)\\) has a representation \\(\rho: \frak{so}(3, \R) \rightarrow End(\R^3)\\) or, more famously, the spin representation \\(\frak{so}(3, \R) \rightarrow End(\cnums^2)\\).
