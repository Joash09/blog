+++
title = "Vector Spaces to Exterior Algebra"
author = ["Joash Naidoo"]
date = 2024-08-10T00:00:00+02:00
tags = ["mathematics", "fields", "linear-maps", "tensors", "linear-algebra", "exterior-algebra"]
draft = false
math = "True"
+++

When taught linear algebra in high school or university, you begin to formulate a notion that a vector is an array of elements which we use to represent "arrows" in 2 or 3 dimensional space and matricies as two dimensional arrays performing linear transformations on these vectors, scaling or rotating them. These are introductory interpretations of vectors and linear transformations. Mathematicians treat these structures in a far more abstract sense. In this writeup I try refine my inituition what a vector space actually is.

<!--more-->

This is my second writeup in my collection of notes from the lecture series: "Geometric Anatomy of Theoretical Physics" by Frederick Schuller as well as additional material by [Sergei Winitzki](https://github.com/winitzki/linear-algebra-book).

{{< youtube 4l-qzZOZt50 >}}


## Fields {#fields}

Before discussing vectors and vector spaces, I must first introduce the underlying structures. I introduced one of the most fundamental structures in my previous post, Zermelo-Frankel's axiomatic set theory. I will not repeat the axioms here, it suffices to say it is the weakest structure in mathematics. When thinking about sets it is not worth even thinking about what goes in a set. It may be objects, actions, numbers, other sets, the empty element etc. A set is simply defined by the axioms.

From a set, we can add a little more structure by equipping a set with the operations of addition and multiplication. If these operations (i.e. "maps" between the elements of the set) obey the following properties, we can classify the set as a field. Two important sets which classify as fields are namely: \\(\R\\) and \\(\cnums\\). Sets such as the set of integers \\(\Z\\) are not fields, since an inverse element cannot be found for all integers, such that inverse element itself is in the set of integers. For example the inverse of 2 is \\(\frac{1}{2} \notin \Z\\). See the properties required for a field below.

<!--list-separator-->

-  Addition

    \\[+ : K \times K \rightarrow K\\]

    | Property        | Description                                                                                                                                | Addition                                                                                   |
    |-----------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
    | Commutativity   | Order in which elements are applied to operator does not matter                                                                            | \\(v + w = w + v\\)                                                                        |
    | Associativity   | Order in which _operations_ are applied does not matter                                                                                    | \\((u + v) + w = u + (v + w)\\)                                                            |
    | Neutral element | There exists an element in vector space \\(V\\) which under the + operation does not change any other elements and is given symbol \\(0\\) | \\(\exists \underbrace{0}\_{\text{just a symbol}} \in V: \forall v \in V: v + 0 = v\\)     |
    | Inverse element | There exists an element in vector space which under the + operation produces the neutral element and is given symbol \\(-v\\)              | \\(\forall v \in V: \exists \underbrace{-v}\_{\text{just a symbol}} \in V: v + (-v) = 0\\) |

<!--list-separator-->

-  Multiplication

    \\[\cdot : K \times K \rightarrow K\\]

    | Property      | Multiplication                                              |
    |---------------|-------------------------------------------------------------|
    | Associativity | \\(\lambda \cdot (u \cdot v) = (\lambda \cdot u) \cdot v\\) |
    | Distributive  | \\((\lambda + u) \cdot v = \lambda \cdot v + u \cdot v\\)   |
    | Distributive  | $&lambda; &sdot; v + u &sdot; v = (&lambda; + u) &sdot; v $ |
    | Unit          | \\(1 \cdot v = v\\)                                         |


## Vector spaces and linear maps {#vector-spaces-and-linear-maps}

A vector space is constructed with the triple \\((V, +, \cdot)\\). \\(V\\) is a set whose elements correspond to a field \\(K\\) described above. Most of the time assume the field \\(K\\) is simply \\(\R\\). The addition and s-multiplication operations are maps and are defined below. It is vital to consider that addition operator in a vector space is different to the addition operator in a field. One set of these operations acts on elements of the vector space (i.e. vectors); the other set of operations acts on the elements within the field. Furthermore, the addition and s-multiplication operators for the vector space are defined in terms of the addition and multiplication operators for the underlying field.

\\[+: V \times V \rightarrow V\\]
\\[\cdot: K \times V \rightarrow V\\]

Mathematics is interested in structure preserving maps. One such map is a linear map. Consider \\(\phi: V \rightarrow W\\) which maps \\((V, +\_{V}, \cdot\_{V})\\) to \\((W, +\_{W}, \cdot\_{W})\\). This map is considered linear if the following conditions hold:

\\[\phi(v\_1+\_{V}v\_2) = \phi(v\_1) +\_{W} \phi(v\_2)\\]
\\[\phi(\lambda \cdot\_{V} v) = \lambda \cdot\_{W} \phi(v)\\]


## Vectors versus vector spaces {#vectors-versus-vector-spaces}

Until know I have only defined a vector space. You may still be tempted to ask "what is a vector?" for which the only response is that a vector is an element of a vector space. If you are still unsatisfied with that answer, it may be because of undergraduate training, vectors become synonymous with arrays of numbers which we can then represent as arrows. But this is a limiting intuition of what a vector is and its range of applications, evident by how vectors can represent functions, polynomials, operators etc. Notice up until now, I haven't explicitly described a vector as collection of real numbers. It is meaningless to talk about a vector without keeping in mind the vector space. And we must think of vector spaces as _any_ set of mathematical objects for which we define addition and s-multiplication operations, upon which we can define linear maps. This general intuition about vectors without thinking about arrays of numbers and arrows, allows us to naturally model the aforementioned functions, polynomials and operators as vectors.


## Dual vector spaces {#dual-vector-spaces}

With all being said, consider a vector space \\(V\\) (the full notation is \\((V, +, \cdot)\\)). All linear maps taking elements from \\(V\\) and mapping them to underlying field \\(K\\) is called the dual vector space. Remember all these transformation can make up a set for which we can define addition and s-multiplication operations for. The formal construction for the dual vector space is as follows, where \\(K\\) can be any field (e.g. \\(\R\\)):

\\[V\* \coloneqq \Set {\phi: V \xrightarrow{\sim} K}\\]

The concept of a dual vector space should already be familiar to you. Consider the dot product between two vectors produces a single number \\(\in \R\\). The first element inserted into the dot product operation is in fact an element of the dual vector space, also known as a **covector**. It is important to start distinguishing between vectors in a vector space, covectors and linear transformations. In elementary linear algebra it was all represented by matrices and vectors. However just becasue they look the same as vectors or matricies, doesn't mean we can treat them the same.


## Sets of linear maps {#sets-of-linear-maps}

This section is simply terminology. The set of all linear maps from one vector space \\(V\\) to another \\(W\\) is called **homomorphic**. The dual space \\(V\*\\) is the homomorphic set of all linear maps from \\(V\\) to the underlying field \\(K\\). The set of all linear maps from vector space \\(V\\) to itself is **endomorphic**. See below for the formal notation.

\\[\text{Hom}(V, W) \coloneqq \Set { f| V \xrightarrow{\sim} W}\\]
\\[V\* \coloneqq \Set { f |  V \xrightarrow{\sim} K}\\]
\\[\text{End}(V) \coloneqq \Set {f | V \xrightarrow{\sim} V}\\]


## Tensors and the tensor product {#tensors-and-the-tensor-product}

General multilinear map, taking a combination of vectors \\(V\\) and covectors \\(V\*\\) of the underlying field \\(K\\). Nothing more, nothing else. It is a simple definition. Thus the domain for a $p \choose q$-tensor \\(T\\) is defined as follows.

\\[T \colon \underbrace{V\* \times \dots \times V\*}\_{p \text{ times}} \times \underbrace{V \times \dots \times V}\_{q \text{ times}} \xrightarrow{\sim} K\\]

The tensor product is another source for unnecessary confusion, since it is an operation that is defined by the set it creates. It is easier to simply think of the tensor product expansion as simply a symbol which produces a set of tensors as opposed to an operation.

\\[T^p\_q \equiv \underbrace{V \otimes \dots \otimes V \otimes V\* \otimes \dots \otimes V\*}\_{\text{just a symbol}} = \Set{T | T \text{ is a }{p \choose q}\text{ tensor}}\\]


## (Hamel) Basis and vector components {#hamel--basis-and-vector-components}

I have left this section until last to emphasize vectors and linear maps should not be thought about in terms of their components. Instead they must be thought of in a coordinate free way. However, since I have discussed the abstract notions of vector spaces it is time to find out how vectors become "arrays of numbers."

If for every vector in a vector space can be written as a linear combination from the vectors within the set, then that vector space is said to have a basis. The linear combination is then referred to as the components of the vector with respect to the basis, and is finally where our initial training of vectors being arrays of numbers comes from.

In physics representing a vector as an array of numbers implies we have already chosen a basis (i.e. a coordinate system). Hence the following rule of thumb.

_Gentlemen do not choose a basis when they don't have to._


## Dirac (Bra-ket) notation {#dirac--bra-ket--notation}

At this point, I can also introduce the exciting notation of commonly used in quantum mechanics but is simply a notation when expressing vectors and covectors. A vector is represented as \\(\ket{\psi}\\) and linear map acting on a vector is \\(\bra{\phi}\\). Hence \\(\braket{\phi|\psi} \in K\\) where \\(K\\) is the underlying field which makes up the vector space. In quantum mechanics the underlying field is the set of complex numbers \\(\cnums\\) unlike the set of real numbers \\(\R\\) more commonly used.


## Algebras {#algebras}

We can add more structure to a vector space by defining a "blob" operation which maps two elements of a vector space to another element within the same vector space, otherwise known as a **bilinear map**. The domain of a bilinear map is given as \\(\bullet: V \times V \rightarrow V\\).


## Derivations {#derivations}

Introducing an operation on an algebra which translates to the Liebniz's rule ("product" rule introduced early on in calculus).

\\[ D(ab) = aD(b) + D(a)b \quad \text{where }D\text{ is an operator acting on elements a and (or) b in vector space } V\\]


## Exterior algebra {#exterior-algebra}

Until now, I have not introduced the typical concepts of the determinate or cross products commonly seen in linear algebra classes. When first introduced to these concepts, these operations seem purely formulaic and their applications seem rigid and specific to \\(\R^2\\) or \\(\R^3\\). However here I would like to provide a deeper motivation to thinking about these operations.

First, begin by recognizing the determinate and cross product operations as forms of a more general "area" function. The goal is to study the "algebraic" properties of this area function so it can be extended to higher dimensions. The first of which is **anti-symmetry**. Consider the introductory example of calculating the area of a parallelogram spanned by two vectors if represented by arrows. It is easy to prove the area of a parallelogram is \\(A\_{\text{parallelogram}} = |\vec{a}||\vec{b}|\sin \theta\\) where \\(\theta\\) is the angle measured between the two vectors. However. this function is a non-linear function. For example \\(A\_{\text{parallelogram}}(2\vec{a},\vec{b}) = 2A\_{\text{parallelogram}}(\vec{a},\vec{b}) = A\_{\text{parallelogram}}(-2\vec{a},\vec{b})\\). We can make the area function _linear_ if we include orientation. This is motivation for antisymetry, since orientation is encoded in the area function the order of the two vectors given to the area function matters. By "orientation" I mean, including the "sign" of the area function that depends if the angle between the two vectors is measured in an anti-clockwise or clockwise direction.

\\[A\_{anti-symmetric} = \pm |a||b|\sin\theta\\]

Ignoring the details of the function itself, we show the following obseravtions of the anti-symmetry property. This area function is useful enough it gets its own symbol \\(\wedge\\) referred to as the "wedge" product or alternatively, the exterior product. I provide the properties using both notations.

| Description                                                                                                          | Function Notation                                                              | Wedge Notation                                                                             |
|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Anti-symmetric function. Order matters.                                                                              | \\[A(\vec{a}, \vec{b}) = - A(\vec{b}, \vec{a})\\]                              | \\[ \vec{a} \wedge \vec{b} = - \vec{b} \wedge \vec{a}\\]                                   |
| Area of basis vectors is intuitively 1                                                                               | \\[A(\vec{e\_1}, \vec{e\_2}) = 1\\]                                            | \\[ \vec{e\_1} \wedge \vec{e\_2} = 1 \\]                                                   |
| Area of vectors spanning the same line is inituively 0. Useful for investigating linear independence between vectors | \\[A(\vec{e\_1}, \vec{e\_1}) = 0 \\]                                           | \\[ \vec{e\_1} \wedge \vec{e\_2} = 0\\]                                                    |
| Linear scaling                                                                                                       | \\[A(\lambda \vec{a}, \vec{b}) = \lambda A(\vec{a}, \vec{b})\\]                | \\[(\lambda \vec{a}) \wedge \vec{b} = \lambda(\vec{a}\wedge\vec{b})\\]                     |
| Linear addition                                                                                                      | \\[A(\vec{a} + \vec{b}, \vec{c}) = A(\vec{a}, \vec{c}) + A(\vec{b},\vec{c})\\] | \\[(\vec{a} + \vec{b}) \wedge \vec{c} = \vec{a} \wedge \vec{c} + \vec{b} \wedge \vec{c}\\] |

Using this new function and aforementioned properties whilst assuming a basis \\(\vec{e\_1}\\) and \\(\vec{e\_2}\\) for vectors \\(\vec{a}\\) and \\(\vec{b}\\) in \\(\R^2\\), the new area function taking two vectors in \\(\R^2\\) has the following general solution. Notice how it is the same result as the determinate of a matrix whose columns correspnd to vectors \\(\vec{a}\\) and \\(\vec{b}\\).

\\[
\begin{align\*}
\vec{a} \wedge \vec{b} = A(\vec{a},\vec{b}) &= A(\alpha\_1\vec{e\_1} + \beta\_1\vec{e\_2}, \alpha\_2\vec{e\_1} + \beta\_2\vec{e\_2}) \\\\
&= \alpha\_1\beta\_2A(\vec{e\_1}, \vec{e\_2}) + \alpha\_2\beta\_2A(\vec{e\_2}, \vec{e\_1}) \\\\
&= \alpha\_1\beta\_2 - \alpha\_2\beta\_1
\end{align\*}\\]

Now the area function between two vectors in \\(\R^3\\) is extended as follows. Take note of the additional "wedge" products between the basis vectors in the result (e.g. \\(\vec{e\_1} \wedge \vec{e\_2}\\)). These wedge products is the result correspond to the components of a new basis vector produced by this area function. Hence, two vectors \\(\vec{a}\\) and \\(\vec{b}\\) in \\(\R^3\\) produce area vector which lies outside of vector space spanned by the two vectors.

\\[\vec{a} \wedge \vec{b} = (a\_1b\_2 - a\_2b\_1)(\vec{e\_1} \wedge \vec{e\_2}) + (a\_3b\_1 - a\_1b\_3)(\vec{e\_3} \wedge \vec{e\_1}) + (a\_2b\_3-a\_3b\_2)(\vec{e\_2} \wedge \vec{e\_3})\\]

In \\(\R^3\\) the area function looks like the sum of areas "projected" onto the coordinate planes. In general two vectors in $\R^n$-dimensional space, will have \\(\frac{n(n-1)}{2}\\) coordinate planes and hence resulting area vector will have $\frac{n(n-1)}{2}$-dimensions. Naturally \\(\R^2\\) and \\(\R^3\\) have 1 and 3 coordinate planes respectively. The additional wedge products in the area function above are called **bivectors**. They generalize these coordinate plane quantities. In \\(\R^2\\) the bivector has a dimension of 0, hence is simply a scalar. Finally, the space of the exterior product on any two \\(\R^n\\) vectors has the symbol \\(\wedge^2 V\\).

The area operation can also extend to \\(k\\) number of vectors (i.e. \\(\wedge^k V\\)). In this case the dimension / basis components / number of coordinate projections of the space \\(\wedge^kV\\) is \\(N \choose k\\).
