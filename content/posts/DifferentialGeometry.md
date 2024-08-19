+++
title = "Differential Geometry"
author = ["Joash Naidoo"]
date = 2024-08-19T00:00:00+02:00
tags = ["mathematics", "differential-geometry", "manifolds", "linear-algebra", "vector-calculus", "vector-fields", "differential-forms"]
draft = false
math = "True"
+++

Differential geometry as the name suggests expands fundamental ideas of calculus and applies them to more complex geometric spaces. The ideas expressed in differential geometry have far reaching applications in physics since the subject matter will refine our intuition around coordinate systems and enable us to describe physics phenomena in a coordinate free manner. Applications include Einstein's general relativity and particle physics. This write up explores these prerequiste mathematical tools.

<!--more-->

This is my third writeup in my collection of notes from the lecture series: “Geometric Anatomy of Theoretical Physics” by Frederick Schuller

{{< youtube UPGoXBfm6Js >}}


## Smoothness {#smoothness}

Smoothness is a familiar property of curves first seen when introduced to functions in \\(\R^2\\). Curves fall into a classes of smoothness classifications. A curve belongs to \\(C^0\\) if it is continuous throughout. In elementary calculus, a function is continuous if there are no jumps or holes in the function. In terms of topology, recall for a map \\(\phi: M \rightarrow N\\) between two topological spaces \\((M, \mathcal{O}\_M)\\) and \\((N, \mathcal{O}\_N)\\) is continuous if for every open subset in \\(\mathcal{O}\_V\\) (i.e. target space) the pre-image is an open subset in \\(\mathcal{O}\_M\\) (i.e. domain). Formally:

\\[\forall V \in \mathcal{O}\_N : \text{preimg}\_{\phi}(V) \in \mathcal{O}\_M\\]

A curve is \\(C^1\\) if it is \\(C^0\\) and if the derivative of the curve is continuous. In general, a curve is \\(C^k\\) if the $k$-th derivative of the curve is continuous. However, for future notation, we will deal with \\(C^{\infty}\\) curves, for which any derivative of the curve is continuous.


## Smooth manifolds {#smooth-manifolds}

A manifold is a smooth manifold if and only if:

-   For any two charts \\((U, \phi)\\) and \\((V, \psi)\\) in the atlas of \\(M\\), the transition function \\(\psi \circ \phi^{-1}\\) between the two charts is smooth
-   For a function acting on the manifold \\(f: M \rightarrow \R\\), the transistion function \\(f \circ \phi^{-1}\\) from the chart to the image of f is smooth

Hence the set of smooth functions acting on the manifold are denoted as:

\\[C^{\infty}(M) = \Set{f: M \rightarrow \R | f \text{ is smooth}}\\]

This set \\(C^{\infty}(M)\\) can be made into a **module** (analogous to a vector space except the undelying set is a module and not a field) by defining the following pointwise addition and s-multiplication operations. Recall

\\[ (\lambda \cdot f)(p) \coloneqq \lambda \cdot f(p)\\]
\\[ (f+g)(p) \coloneqq f(p) +\_{\R} g(p) \\]


## Tangent space on a manifold {#tangent-space-on-a-manifold}

There are two ways to thinking about a tangent space on manifold. The first conisders the tangent space at a point \\(p\\) for a manifold \\(M\\) is simply the collection vectors representing possible velocities for various smooth curves \\(\gamma\\) through the point \\(p\\). The second is to construct a derivation from the vector space \\((C^{\infty}(M), +, \cdot, \bullet)\\).

The tangent vector to the curve \\(\gamma\\) at the point \\(p \in M\\) (otherwise known as the **directional derivative operator**) is the following linear map.
\\[X\_{\gamma,p} : C^{\infty}(M) \rightarrow \R \\]
\\[ f \mapsto (f \circ \gamma)'(0)\\]

At a point \\(p\\), we can construct the set of all vectors

\\[T\_pM \coloneqq \Set{X\_{\gamma, p} | \gamma \text{ is a smooth curve through } p}\\]

Furthermore, this set \\(T\_pM\\) can be equippend with addition and s-multiplication operations to become a vector space as follows. Bare in mind for the addition operation one must still prove the resulting curve \\(\sigma\\) from the sum of curves \\(\gamma\\) and \\(\delta\\) still exists in the manifold \\(M\\).

\\[ (\lambda \odot X\_{\gamma, p})(f) \coloneqq \lambda \cdot X\_{\gamma, p}(f)\\]
\\[ (X\_{\gamma, p} \oplus X\_{\delta, p})(f) \coloneqq X\_{\gamma, p}(f) + X\_{\delta, p}(f) = X\_{\sigma,p}(f) \\]


## Differentiation on a smooth manifold {#differentiation-on-a-smooth-manifold}

In introductory calculus course, the derivative of a function gives the tangent line at a point. In the previous section we defined the tangent space a point \\(p\\) of a manifold at the space of all possible velocity vectors for curves passing through \\(p\\). With this space in mind, we can differentiate a function whose domain is a manifold. Recall manifold are smooth structures, hence small changes in the manifold (i.e. domian) with result in small changes in output of the function. Furthermore, manifolds intrinsically are "coordinate-free" structures. They are weaker structure than the real number line $x$-axis we more commonly use. We must therefore introduce a chart, to get a sense of coordinates and hence directions when taking the derivative of a function whose domain is a manifold.

Formally, consider taking \\(\text{dim}(M)\\) number of curves \\(\gamma\_{(a)}, \text{where } a = 1, \ldots, \text{dim}(M)\\) which pass through the point \\(p\\) on the manifold. Without loss of generality choose curves such that \\(p = \gamma\_a(0)\\). For each of these curves consider the map \\(x^b\\) which maps the curve to a chart such that \\((x^{b} \circ \gamma\_{a})(\lambda) = \delta^{b}\_{a}\lambda\\), where \\(\delta^{b}\_{a} = \begin{cases}1 & \text{if } a = b \\\ 0 & \text{otherwise}\end{cases}\\). In \\(\R^2\\) or \\(\R^3\\) this chart representation of these curves look like the \\(x\\),\\(y\\) and or \\(z\\) axes we are all familiar with. Using this chart representation of a smooth manifold acting as the domain of the function \\(f\\), construct the **directional derivative** as follows.

\\[\begin{align\*}
&X\_{\gamma\_{(a)},p}f\\\\
&=(f\circ\gamma\_{(a)})'(0)\\\\
&=(f\circ x^{-1}\circ x\circ\gamma\_{(a)})'(0) \quad(\text{taking curve to the chart first})\\\\
&=\partial\_{b}(f \circ x^{-1})\underbrace{(x \circ \gamma\_{(a)})(0)}\_{\text{simply } x(p)}\cdot\underbrace{(x^b \circ \gamma\_{(a)})(0)}\_{\delta^{b}\_{a} \text{ by earlier construction}} \quad(\text{applying the chain rule})\\\\
&=\partial\_{b}(f \circ x^{-1})(x(p))\cdot \delta^{b}\_{a}
\end{align\*}\\]

From here a new directional derivative symbol at a point \\(p\\) can be created as follows, where \\(a\\) represents the direction component.

\\[\bigg(\frac{\partial}{\partial x^a}\bigg)\_p \coloneqq \partial\_a(f \circ x^{-1})(x(p))\\]

Armed with this new symbol, all tangent vectors \\(X \in T\_pM\\) can be written using the directional derivative as a basis (i.e. \\(X = X^a \bigg(\frac{\partial}{\partial x^a}\bigg)\_p\\). For this to be true, an arbitary curve \\(\mu\\) on the manifold \\(M\\) must exist for which the tangent vector \\(X\\) belongs. Formally prove: \\(\exists \mu: \R \to M\\).

\\[
\begin{align\*}
X\_{\mu, p}f &= (f \circ \mu)'(0) \\\\
&= (f \circ x^{-1} \circ x \circ \mu)'(0) \\\\
&= \partial\_b (f \circ x^{-1})(x(p)) \cdot (x^b \circ \mu)'(0) \quad \text{chain rule} \\\\
&= \bigg(\frac{\partial}{\partial x^b}\bigg)\_p\underbrace{(x^b\circ \mu)'(0)}\_{X^b \in \R}
\end{align\*}\\]

Thus a tangent for any arbitary curve &mu; can be written as \\(X = X^a \bigg(\frac{\partial}{\partial x^a}\bigg)\_p\\). With this result we have also proven \\(\text{dim}(M) = \text{dim}( TM)\\) which is significant since \\(M\\) and \\(TM\\) are completely different structures.


## Vector fields and n-forms {#vector-fields-and-n-forms}

A tangent vector \\(X \in T\_pM\\). The disjoint union of all tangent spaces at a point make the entire tangent space of a manifold \\(TM \coloneqq \dot\bigcup T\_pM\\).

Let \\(\sigma\\) be a map \\(\sigma: M \to TM\\) and let \\(\pi\\) be a map \\(\pi: TM \to M\\). A vector field is simply a _section_ between a manifold \\(M\\) and its tangent space \\(TM\\) as follows. Don't let the _section_ idea confuse you. It is simply ensuring that the tangent vectors belonging to their respective points stays belonging to their respective points after all those tangent vectors are put into a new set. Bare in mind this vector field set cannot be made into a vector space. Instead it is a module over a ring and hence a basis is not guarenteed for a vector field.

\\[\Gamma( TM) \coloneqq \Set{ \sigma: M \to TM | \pi \circ \sigma = \text{id}\_{M}}\\]

There can be an arbitary number of vector fields which act on a manifold. Hence at any point on an manifold there can be any number of tangent vectors belonging to their respective vector fields. Thus we can construct a \\({0 \choose n}\\) tensor \\(\omega\\) (i.e. a multilinear map) which accepts \\(n\\) tangent vectors (no covectors) from \\(n\\) vector fields acting on a manifold and maps them to \\(\R\\). An example electromagnetic field strength tensor which is a \\({0 \choose 2}\\) tensor which acts on the electric and magnetic vector fields and outputs a single number. These tensors referred to as a differential **n-form** and are completely **anti-symmtric**. This means a swap in the order of arguments \\(X \in \Gamma( TM)\\) for \\(\omega\\) results in a sign change.

\\[\omega(X\_1, \dots, X\_n) = sgn(\pi)\omega(X\_{\pi(1)}, \dots, X\_{\pi(n)}) \quad \text{where sgn changes sign based on some permutation } \pi \text{ on the order of arguments}\\]

The set of n-forms is given the symbol \\(\Omega^n(M)\\). Since \\(C^{\infty}(M)\\) is a **ring** we can construct a **module** space of \\(\Omega^n(M)\\) (reminder a module is like a vector space but is a weaker structure since there is no inverse element for s-multiplication for a ring). The \\(\Omega^n(M)\\) modules to be a module requires a bilinear map for these $n$-forms (i.e. a map mapping two tensors to another tensor). This bilinear map to equip is the exterior product. In the previous writeup, I introduced the exterior product as an orientated anti-symmetric function. When the exterior product is applied to two vectors in \\(\R^2\\) or \\(\R^3\\) the function resembles the area spanned by the parallelogram produced by these two vectors. However, leaving behind geometric interpretation, this function was generalized algebraically to act any number of vectors in \\(\R^N\\) space.

\\[ \wedge: \Omega^n(M) \times \Omega^m(M) \rightarrow \Omega^{n+m}(M)\\]

Recall, the result of the exterior product is a **bivector** whose dimensions will differ to the original input vectors. Thus we can create a more generalised space, such that the result of the exterior product is still contained within the space as the input vectors. For a $N$-dimension manifold \\(M\\), construct the **Grassman**  algebra, \\((\Omega(M), +, \cdot, \wedge)\\):

\\[\text{Gr}(M) \equiv \Omega(M) \coloneqq \Omega^0(M) \oplus \Omega^1(M) \oplus \dots \oplus \Omega^{\text{dim}(M)}(M)\\]


## Commutator of tensor fields {#commutator-of-tensor-fields}

The commutator is an operation which tests how much the commutative property of a structure "fails" or, in other words, how much the order in which operations are applied matters. In the case of two tensor vector fields \\(X, Y \in \Gamma( TM)\\) acting on any \\(f \in C^{\infty}(M)\\), the commutator is defined as follows. Essentially finding the difference between applying the tensor operations \\(X\\) to points along the function \\(f\\) first versus applying the tensor operation \\(Y\\) first.

\\[[X, Y]f \coloneqq X(Yf) - Y(Xf) \\]


## Push forward and pull back maps {#push-forward-and-pull-back-maps}

Gven a smooth map \\(\phi\\) between two manifolds \\(M\\) and \\(N\\) such that \\(\phi: M \rightarrow N\\), we can construct a map called the **push-forward** to infer the tangent space of the target manifold \\(N\\) as follows. The push forward map is simply the directional derivative operator after first applying the map \\(\phi\\) then the function \\(f\\). This is the only linear map that can be constructed given two manifolds and a smooth map between them.

\\[\phi\_{\*}: T\_pM \rightarrow T\_{\phi(p)}M\\]
\\[X \mapsto \phi\_{\*}(X) \quad{where,}\\]
\\[\phi\_{\*}(X)f \coloneqq X(f \circ \phi)\\]

If instead you started with the cotangent space at \\(N\\) and a map \\(\phi: M \rightarrow N\\), you could infer the cotangent space back to \\(M\\) using a new map called the **pull-back**.

\\[ \phi^{\*}(\omega)(X) \coloneqq \omega(\phi\_{\*}(X))\\]

We can polish this theorem further. It is easy to see the cotangent space is simply a \\(0 \choose 1\\) tensor field (or 1-form). Thus we can generalize the pullback map to apply to $n$-forms as follows. Hence if we knew the tensor fields on \\(N\\) we can work backward to find the $n$-forms on \\(M\\). In summary **vectors** are pushed forward and $n$-forms are pulled back.

\\[ \omega \in \Omega^n(N)\\]
\\[(h^{\*}\omega)(X\_1, \dots, X\_n) \coloneqq \omega(h\_{\*}(X\_1), \dots, h\_{\*}(X\_n)) \quad \text{where } h\_\* \text{ is the aforementioned push forward}\\]


## Exterior derivative and deRham cohomology {#exterior-derivative-and-derham-cohomology}

I'll now introduce a new exterior derivative operation which acts on n-forms (i.e. tensor fields). To recap, a \\(0 \choose n\\) tensor field maps \\(n\\) vector fields acting at a point to a the underlying _field_ (i.e. \\(\R\\)). Hence the exterior derivative looks at linear approximations of $n$-forms.

\\[d: \Omega^n(M) \rightarrow \Omega^{n+1}(M)\\]
\\[(d\omega)(X\_1, \dots X\_{n+1}) \coloneqq \sum\_{i=1}^{n+1} (-1)^{i+1} X\_i(\omega(X\_1, \dots, \cancel{X\_i}, \dots X\_{n+1})) + \sum\_{i < j}^{} (-1)^{i+j}\omega([X\_i, X\_j], X\_1, \dots, \cancel{X\_i}, \cancel{X\_j}, \dots, X\_{n+1})\\]

In this general form the operation is overwhelming. We can simplfy what is happening considering a 1-form,

\\[ (d\omega)(X,Y) \coloneqq X(\omega(Y)) - Y(\omega(X)) - \omega([X,Y]) \\]

The exterior derivative is an operation which implies the following sequence:

\\[\Omega^0(M) \xrightarrow{d} \Omega^1(M) \dots \xrightarrow{d} \Omega^n(M) \xrightarrow{d} \Omega^{n+1}(M) \xrightarrow{d} \Omega^{dimM}(M)\\]

The de Rham cohomology highlights the following by property of the exterior derivative due to anti-symmetry and the cancelling out of terms.

\\[ d^2 = 0 \in \Omega^{n+2}(M)\\]


## Generalized Stoke's Theorem {#generalized-stoke-s-theorem}

In my overview of calculus writeup, I discussed Stoke's theorem which relates a line integral to the surface integral in a vector field. In the sections I discussed how to differentiate a function whose domain is a manifold and how to construct a vector field (more abstractly n-forms) on a manifold. Thus with this new machinary, I can provide a generalised definition of Stoke's theorem on a coordinate free \\(\R^N\\) manifold. The definition below equates the integral of a n-form \\(\omega\\) to the exterior derivative over the manifold \\(M\\).

\\[\int\_{\partial M} \omega = \int\_{M} d\omega\\]
