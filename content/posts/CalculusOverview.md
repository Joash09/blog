+++
title = "Calculus overview"
author = ["Joash Naidoo"]
date = 2024-01-31T00:00:00+02:00
tags = ["mathematics", "calculus", "linear-algebra", "vector-calculus"]
draft = false
math = "True"
+++

University mathematics was one of the most challenging, interesting and stressful periods of my life thus far. Despite this, I have fond memories of it. For this reason have compiled a short tour of my university curriculum for my personal posterity. I will focus more on the ideas within each area as opposed to the rigorous proofs and the example problems.

<!--more-->


## Calculus fundamentals {#calculus-fundamentals}


### Derivatives {#derivatives}

The gradient or slope of a straight line is defined as \\(m=\frac{y\_2-y\_1}{x\_2-x\_1}\\). This gives a sense of how quickly a slope is increasing (i.e. the slope's rate of change). To calculate the slope of a _general_ function at a point \\(x\_1\\), choose another input \\(x\_2\\) close to \\(x\_1\\). This gives us \\(y\_1=f(x\_1)\\) and \\(y\_2=f(x\_2)\\), thus we have all the information needed to calculate the slope at \\(x\_1\\).

It is important to note that, your choice of \\(x\_2\\) is arbitrary and that there will always be some other point closer to \\(x\_1\\) which will give you an even more accurate result. It is for this reason we forego explicitly choosing a value for \\(x\_2\\) and treat this small "nudge" to the input as a concept unto itself. We assign a special term \\(dx\\) to represent small difference between \\(x\_1\\) and \\(x\_2\\) which we know is arbitrarily small (i.e. "tend to zero"). The gradient for a line mentioned previous can thus be rewritten in terms of this special \\(dx\\) concept as follows. By substituting in functions, we can compute their respective derivative functions using this formula. In practice however, it is more common to use a table of derivatives to look up a derivative common expressions.

\\[
\frac{dy}{dx} = \lim\_{dx \to 0} \frac{f(x+dx)-f(x)}{dx}
\\]


#### A note on notation {#a-note-on-notation}

There are 3 common notations for differentiation. Leibniz, Lagrange and Newton's.

| Leibniz  | \\(\frac{dy}{dx}\\), \\(\frac{d^2y}{{dx}^2}\\), ... , \\(\frac{d^ny}{{dx^n}}\\) |
|----------|---------------------------------------------------------------------------------|
| Lagrange | \\(y'\\), \\(y''\\), ..., \\(y^n\\)                                             |
| Newton   | \\(\dot y\\), \\(\ddot y\\), ...                                                |

Additionally with Leibniz's notation, \\(\frac{dy}{dx}\\) represents the actual derivative of \\(y\\) with respect to \\(x\\). \\(\frac{d}{dx}f(x)\\) is the notation used to instruct the reader to find the derivative of the function \\(f(x)\\). We could be more explicit with latter notation as follows:

\\[
y = f(x)
\\]
\\[
\frac{dy}{dx} = \frac{d}{dx}f(x)
\\]

Most of the time differentiation is treated more of algebraic problem.


### Integration {#integration}

Integration is a useful mathematical tool for problems which involve breaking up some geometry or function domain into arbitrarily small pieces and finding the collective weighted sum of all the pieces. One such application of integration is finding the area under the curve. Given some arbitrary curve, it is useful to first break the domain of the curve up into \\(n\\) segments. For each segment, draw a rectangle whose length extends to the curve and whose width is the size of the segment you have decided. The area is then approximately the sum of all the areas of the rectangles. The smaller the segments, the better your approximation will be. We can apply the same concept introduced in derivatives for small "nudges" of the input to obtain smaller and smaller segments, and hence approach the true area. This is the Riemann sum definition for the integral calculating the area under a curve.

\\[
A = \int\_a^b f(x) dx = \lim\_{dx \rightarrow \infty}\sum\_{i=a}^{dx} [f(a + dx \cdot i) \cdot dx]
\\]

Common techniques for integration include:

-   Integration by parts
-   U-substitution


#### Generalized area between two curves {#generalized-area-between-two-curves}

When calculating the area under a curve, there has been an implicit assumption that we are calculating the area under the curve with the x-axis \\(y = 0\\) as a boundary. We can be more explicit by defining another function for the lower boundary.

\\[
A = \int^{b}\_{a} (\text{upper function} - \text{lower function}) dx
\\]


### Fundamental Theorem of Calculus {#fundamental-theorem-of-calculus}

It should not be taken for granted that the integration is merely the anti-derivative of a function. For any function \\(f(x)\\) we can approximate the area under the curve as the sum of rectangles whose height is the value of the function at that point and whose width is \\(dx\\) (i.e. an arbitrarily small change to the input \\(x\\)). If \\(dx\\) is small enough then,

The relationship between the derivative of a function and the area under a function

The notation behind the area under a slope and the slope of the tangent line for a point on a curve (derivative) are related through the _fundamental theorem of calculus_.

\\[
f(b)-f(a) = \int\_a^b f'(t)dx
\\]


### Applications of derivatives {#applications-of-derivatives}


#### Graphing functions {#graphing-functions}

I always felt there was a bit of an art to graphing function as there were always certain tricks you needed to remember, especially if the function is not a simple polynomial. Despite this, here some steps which should get you going.

-   Find the y-intercept \\(y = f(0)\\)
-   Find the limit of the function at negative infinity \\(\lim\_{x \rightarrow -\infty} f(x)\\) and positive infinity \\(\lim\_{x \rightarrow +\infty} f(x)\\)
-   Find the limit of the function at "interesting" points. If applicable, where the denominator is zero. We can make use of **L'Hopital's** rule for evaluating difficult limits like this. If the function in the form \\(\frac{f( c)}{g( c)}\\) satisfies \\(\lim\_{x \rightarrow c}f(x) = 0\\) and \\(\lim\_{x \rightarrow c}g(x) = 0\\), then if \\(\lim\_{x \rightarrow c}\frac{f(x)}{g(x)} = \lim\_{x \rightarrow c}\frac{f'(x)}{g'(x)}\\)
-   Find roots of the function by solving \\(f(x) = 0\\). If it is a difficult function, consider using the **Newton-Raphson** method discussed below which makes use of the derivative of the function
-   Find local maxima and minima by solving \\(f'(x) = 0\\). We will know if the function is concave up or down if \\(f'( c) = 0\\) and \\(f''( c) > 0\\) or if \\(f''( c) < 0\\) respectively.
-   Find the inflection points of the function by solving \\(f''(x) = 0\\)


#### Taylor series {#taylor-series}

A function is linear if it has the following two useful properties.

\\[
f(\alpha x) = \alpha f(x)
\\]
\\[
f(a + b) = f(a) + f(b)
\\]

Polynomials are linear in nature and working with them is often easier than dealing with non-linear functions such as the trigonometric functions. As such we prefer to **approximate** a non-linear functions as a linear polynomials. This polynomial approximation is referred to as the Taylor series of a function. The Taylor series is heavily reliant on the derivative information of the function at a specific point.

For instance, consider approximating a function around the y-intercept of an arbitrary function \\(f(x)\\). Starting with the generalized form of a polynomial \\(a\_0+a\_1x+a\_2x^2\\), we should first ensure the approximation and value of the function match at \\(x=0\\). This means we must solve \\(f(0) = a\_0 + a\_1(0) + a\_2(0)^2\\) and hence providing the \\(a\_0\\) term. Second the slope of the approximation should match the slope of the function at that same point. This know means we must solve \\(f'(0) = a\_1 + 2a\_2(0)\\) where the left hand side and right hand sides of the equation are the derivatives of the function and polynomial approximation respectively. We can continue this process for the second derivative too, solving for higher powers of x in our polynomial approximation and hence making our approximation more accurate. Solving for higher powers provides us with the following general formula. Bear in mind, the point at which we approximate does not need to be at the origin (i.e. \\(x=0\\)). You can pick any point \\(a\\), the formula will just shift the approximation accordingly.

\\[
f(a) + \frac{f'(a)}{1!}(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + ... = \sum\_{i=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n
\\]

It is worth taking note, Taylor series approximation is not our only method for approximating functions. Fourier series, deep neural networks and even Pade approximations are other tools that are used for function approximation.


#### Newton-Raphson method {#newton-raphson-method}

This is a simple recursive algorithm for finding the real roots of a function \\(f(x)\\). The algorithm is recursive, meaning we should apply the formula multiple times over to get more accurate results. The algorithm begins with an initial guess \\(x\_0\\), following which we can get better and better approximation for the roots of \\(f(x)\\). A result is not guaranteed if the initial guess is at a local minima or maxima (i.e. the derivative of the function at the guess is zero).

\\[
x\_{n+1} = x\_n - m\frac{f(x\_n)}{f'(x\_n)}
\\]


### Related rates of change and implicit differentiation {#related-rates-of-change-and-implicit-differentiation}

Up until now we have only discussed finding the derivative of a single variable _function_. Let us now consider modeling problems whereby _multiple_ related single input functions in an _expression_. The problem of a ladder sliding down a wall is the most famous introductory example to this topic. As the ladder slides down the wall the vertical height \\(y(t)\\) decreases, yet at the same time the horizontal distance \\(x(t)\\) from the wall increases. The height and vertical distance are related to the length of the ladder \\(l\\) by the Pythagorean theorem \\(y(t)^2 + x(t)^2 = l^2\\). If we wanted to find an exact expression or the rate of change of the vertical length of the wall. We can employ the technique of **implicit differentiation** which effectively is the derivative **chain rule** as follows. From there it is easy to make \\(\frac{dx}{dt}\\) the subject of the formula.

\\[
\frac{d}{dt} l^2 = \frac{d[x(t)^2 + y(t)^2]}{dt}
\\]
\\[
0 = 2x(t)\frac{dx}{dt} + 2y(t)\frac{dy}{dt}
\\]


### Partial differentiation {#partial-differentiation}

I began this write up by looking at derivatives of a single variable function. The previous section extended derivatives to multiple functions related in an expression. This section will look at derivatives for functions which have more than one input variables. The intuition behind a partial derivative is simple: finding the rate of change of a function in the direction of a single chosen variable. The definition of a partial derivative is a simple extension of the derivative for a single variable function. A small "nudge" is applied to the variable in question, whilst the other variable inputs remain fixed. Note the notation for a partial derivative in the following definitions.

\\[
\frac{\partial f}{\partial x} = f\_x(x,y) = \lim\_{dx \rightarrow 0}\frac{f(x+dx,y) - f(x,y)}{dx}
\\]
\\[
\frac{\partial f}{\partial y} = f\_y(x,y) = \lim\_{dy \rightarrow 0}\frac{f(x,y+dy) - f(x,y)}{dy}
\\]


## Double and triple integrals {#double-and-triple-integrals}


### Find the mass of a surface {#find-the-mass-of-a-surface}

As mentioned previously, we use integration is a tool we used for summing up arbitrarily small parts. The following equation we will use integration to find the mass of surface \\(R\\), given the density function \\(f(x,y)\\). We use \\(R\\) as an abstraction since the bounds of the surface \\(R\\) can get quite complex. When doing a calculation, we must find expressions of the lower and upper bounds.  \\(dA\\) are the arbitrarily small areas we are summing over. Using Cartesian coordinates this equates to \\(dx \cdot dy\\).

\\[
V = \iint\_R f(x,y) \\,dA = \int^{y\_2}\_{y\_1} \int^{x\_2(y)}\_{x\_1(y)} f(x, y) dxdy
\\]


### Volume under a surface {#volume-under-a-surface}

Another interpretation for the double integral is finding the volume under a surface to the xy-plane.

\\[
V = \iint f(x,y) dx dy
\\]


### Calculating volumes by rotation and the washer method {#calculating-volumes-by-rotation-and-the-washer-method}

\\[
V = \int^{a}\_{b} A(x) dx
\\]
where...
\\[
A(x) = \pi r^2 = \pi (r\_{\text{outer}} - r\_{\text{inner}})^2
\\]


### Generalized volumes {#generalized-volumes}

When discussing the volume under a surface, there was an implicit assumption that the lower bound of the volume was the $xy$-axis. Using a triple integral we can calculate any generalized volume.

\\[
V = \iiint\_V f(x,y) \\,dV
\\]


## 3D geometries {#3d-geometries}


### Coordinate systems {#coordinate-systems}

Up until now coordinates on a plane have been expressed in terms of its \\(x\\) and \\(y\\) positions. If we wanted to express a point in 3D space we simply introduced a \\(z\\) axis. Expressing points in space this way is referred to as Cartesian coordinates. It is not the only way one can express a point in space. Certain coordinate systems, make it easier to describe geometries in 2D or 3D space. For example, the equation for a circle in Cartesian coordinates is \\(x^2+y^2=r^2\\), whereas in polar coordinates it is simply \\(r=f(\theta)\\).

| Name                    | Description                                                                                                                                                                                                                                |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cartesian coordinates   | We have been describing points in \\(R^2\\) and \\(R^3\\) space using their x, y and if needed z components in this coordinate system                                                                                                      |
| Polar coordinates       | Using the magnitude (distance from the origin) and angle \\(\theta\\) from a reference line passing through the origin (e.g. the x-axis) we define any point in \\(R^2\\) space.                                                           |
| Spherical coordinates   | Similarly with polar coordinates, if we introduce a angle from the z-axis in \\(R^3\\) along with magnitude and angle from the x-axis, we can define any point in \\(R^3\\) space                                                          |
| Cylindrical coordinates | Consider a cylinder centered at the origin. By defining the radius \\(p\\), the angle (azimuth) from a reference line passing through the origin \\(\varphi\\) and finally the height \\(z\\), we can define any point in \\(R^3\\) space. |


### Euclidean vectors {#euclidean-vectors}

Vectors take on different interpretations across different disciplines. In this section we are looking at Euclidean vectors which graphically are illustrated as arrows on a plane with head and a tail. The vector is written with the Cartesian coordinates of the arrow head and it is implied that the tail of the vector lies at the origin. Below is also a summary of the operations used when working with vectors.

\\[
\vec{A} = \begin{bmatrix} A\_x \\\ A\_y \\\ A\_z \end{bmatrix}
\\]

| Operation             | Description                                                                                                                                                                                                                                                                                 | Formula                                                                                                                                                                                                                   |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Vector addition       | Adding two vectors is can be visualized as joining the head of one of the vectors to the tail of the other. The sum between those two vectors is the vector which stretches from the tail of the first vector to the head of the second                                                     | \\(\vec{A} + \vec{B} = \begin{bmatrix} A\_x + B\_x \\\ A\_y + B\_y \\\ \vdots\end{bmatrix}\\)                                                                                                                             |
| Scalar multiplication | Simply stretches/scales a single vector by the magnitude of the scalar input.                                                                                                                                                                                                               | \\(\lambda \vec{A} = \begin{bmatrix}\lambda A\_x \\\ \lambda A\_y \\\ \vdots \end{bmatrix}\\)                                                                                                                             |
| Transpose             | Convert a column vector into a row vector. There isn't any intuitive reason to use row vectors over column vectors, but we will soon see the transpose operation is necessary for vector multiplication. Material on linear algebra prefer column vectors for representing points in space. | \\(\vec{A^T} = \begin{bmatrix} A\_x \\\ A\_y \\\ \vdots \end{bmatrix}^T = \begin{bmatrix}A\_x & A\_y & \dots\end{bmatrix}\\)                                                                                              |
| Inner product         | The inner product is one method by which we can multiply to vectors together.                                                                                                                                                                                                               | \\(\langle\vec{A}, \vec{B}\rangle = \vec{A^T} \cdot \vec{B} = \begin{bmatrix}A\_1 & A\_2 & \dots & A\_n \end{bmatrix}\cdot\begin{bmatrix}B\_1 \\\ B\_2 \\\ \vdots \\\ B\_n \end{bmatrix} = \sum\_{i=1}^{n}{A\_i}{B\_i}\\) |
| Norm                  | Provides the magnitude of the vector.                                                                                                                                                                                                                                                       | \\(\mid \mid \vec{A} \mid \mid = \sqrt{\langle \vec{A}, \vec{A} \rangle} = \sqrt{A^TA}\\)                                                                                                                                 |
| Angle                 | Extract the angle between two vectors                                                                                                                                                                                                                                                       | \\(\angle(\vec{A},\vec{B}) = \arccos\frac{\langle\vec{A},\vec{B}\rangle}{\mid\mid\vec{A} \mid \mid \mid \mid \vec{B}\mid\mid}\\)                                                                                          |
| Dot product           | As mentioned previously this is the _inner product_ but specifically for vectors in the real vector space \\(R^n\\)                                                                                                                                                                         | \\(\vec{A} \cdot \vec{B} = \mid{A}\mid\mid{B}\mid\cos{\theta}\\)                                                                                                                                                          |
| Cross product         | In 3D space, find the vector perpendicular to the plane of the two vectors, whose magnitude is equal to the product of the two magnitude                                                                                                                                                    | \\(\vec{A}\times\vec{B} = \mid{A}\mid\mid{B}\mid\sin{\theta}\\)                                                                                                                                                           |


### Vector independence {#vector-independence}


### Basis vectors {#basis-vectors}

This is simple concept. In the Cartesian coordinate system, the unit vectors are vectors with a length of 1 and only act in a single direction. These vectors are given the special symbols \\(\boldsymbol{\hat{i}}\\), \\(\boldsymbol{\hat{j}}\\) and \\(\boldsymbol{\hat{k}}\\). These unit vectors in Cartesian coordinates act along the x, y and z axes respectively.


### Simple 3D geometries {#simple-3d-geometries}

I will now illustrate how to extend the equation of a straight line to \\(R^3\\). A function for straight line in \\(R^2\\) results in single output. In \\(R^3\\), the function for a straight line results in a vector \\(\vec{r}\\) which begins at the origin and terminates at a coordinate which lies on the line. Given a line passes through point \\(P\_0\\) and \\(P\_1\\) respectively, define a vector \\(\vec{r\_0}\\) and \\(\vec{r\_1}\\) which terminates at these points respectively. The gradient of the line \\(m\\) is vector difference between \\(\vec{r\_0}\\) and \\(\vec{r\_1}\\). Hence, any point on the line is the vector addition of \\(\vec{r\_0}\\) and some scaled value of \\(\vec{m}\\). \\(\vec{r\_0}\\) gets us from the origin to the line, then some scaled value \\(\vec{m}\\) slides us up and down the line.

\\[
\vec{r} = \vec{r\_0} + t\vec{m}
\\]

The equation for a plane is just as intuitive. Assume we have a plane with points \\(P\_0\\) and \\(P\_1\\) which lie on the plane. Just like the straight line function we can find a slope vector \\(m\\), which is the vector difference between vectors \\(r\_0\\) and \\(r\_1\\) to points \\(P\_0\\) and \\(P\_1\\) respectively. A plane is defined by its slope \\(\vec{m}\\) and its **normal** vector \\(\vec{n}\\), which is a vector which sits orthogonal to the plane. Following the definition above, the dot product between a vector and its orthogonal vector is zero.

\\[
\vec{n} \cdot (\vec{r\_1} - \vec{r\_0}) = 0
\\]


### Changing coordinate systems and the Jacobian {#changing-coordinate-systems-and-the-jacobian}

We have already looked at different types of coordinate systems. Different coordinate systems offer better ways to tackle certain problems. In order to express a geometry in a different coordinate system you must:

1.  Express your original coordinates in terms of the new ones. For example \\(x = g(u,v)\\) and \\(y = h(u,v)\\).
2.  Find the Jacobian matrix

\\[\boldsymbol{J} =
\begin{vmatrix}
\frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\\\
\frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \end{vmatrix}\\]

1.  Calculate the "correction factor" which is the determinate of the Jacobian matrix. The determinate of a matrix is discussed in more detail in the next section but the calculation is provided below.

\\[
\begin{vmatrix}
\frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\\\
\frac{\partial y}{\partial u} & \frac{\partial y}{\partial v}
\end{vmatrix} = \frac{\partial x}{\partial u}\frac{\partial y}{\partial v} - \frac{\partial x}{\partial v}\frac{\partial y}{\partial u}
\\]


## Linear algebra {#linear-algebra}

Linear algebra initially felt like a completely separate field of study compared to thinking about function slopes and areas under a curve. However, linear algebra is an abstract field of study. It is only concerned with manipulating lists ordered numbers such that linearity is conserved. We will find these ordered lists are useful for modeling physics vectors, geometries, equations etc. and hence the study of calculus can be applied once we have first built up the basic principals of linear algebra.


### Abstract vector spaces {#abstract-vector-spaces}

I previously introduced vectors as a mathematical structure for representing . Vectors are used for more than representing physical quantities that have a magnitude and direction. Examples for other interpretations of vector spaces include:

-   Complex numbers
-   Ordered list of numbers
-   Systems of linear equations
-   Function spaces


### Matrices for solving a system of equations {#matrices-for-solving-a-system-of-equations}

A system of equations can more easily represented and solved using matrices. The vector \\(\vec{x}\\) can be used to represent the unknown variables, whilst the outputs of the equations can be represented with a vector \\(\vec{y}\\). The matrix \\(A\\) can then be the coefficients corresponding to the inputs of for each of the equations. Hence a system of equations in matrix form can simply be written as follows:

\\[
A\vec{x} = \vec{y}
\\]

To solve this linear algebra equation we can create an **augemented** matrix which simply combines the columns of \\(A\\) with \\(\vec{y}\\). In this augemented form we can use **Gaussian elimination** which is the process of simplifying a matrix (or system of equations) into a form which makes it easy to solve for the unknown variables \\(x\\). This is the **row echelon** form. Which states the left most entry of every non-zero row is to the right of left most entry of the row above. All zero rows of the augmented matrix are at the bottom. **Reduced row echelon** form takes this further by adding these left-most entries must be 1. The process to get to **(reduced) row echelon** form is simple and just involves applying any linear combination of the other rows or itself until the matrix is in row-echelon format.

\\[\begin{array}{cccc|c}
1 & \* & \* & \* & \* \\\\
0 & 0 & 1 & \* & \* \\\\
0 & 0 & 0 & 1 & \* \\\\
0 & 0 & 0 & 0 & 0 \end{array}\\]


### Matrices as linear maps {#matrices-as-linear-maps}

I described vectors in the previous section. A vector space is a set of all possible vectors that can be produced by either vector addition or scalar multiplication. Simply with these operators we cannot convert a 2D vector into a higher or lower dimensional vector. Adding two 2D vectors will always produce a 2D vector and scaling a 2D vector produces a 2D vector. A linear map is mathematical operation which maps a vector in one vector space \\(R^n\\) to another vector space \\(R^m\\) whilst still preserving the properties of vector addition and scalar multiplication. With these properties we can scale, rotate and even possibly flip the geometry. Treating a matrix as a linear map, we can interpret the matrix as an **augmented** matrix which translates the \\(\hat \bf{i}\\), \\(\hat \bf{j}\\) and \\(\hat \bf{k}\\) unit vectors to the new coordinate system.


#### Determinant {#determinant}

The determinate of a matrix provides a factor by how much the area between two lines have scaled. A negative determinate indicates a transformation which flipped the coordinates.

\\[
\begin{vmatrix}
a & b \\\\
c & d
\end{vmatrix} = ad - bc
\\]


#### Cross product {#cross-product}

Finding the cross product of two vectors is a recursive process which sums the determinates of "sub-matrices". First construct a matrix, the first row representing the unit vectors, the second and third rows representing the vectors respectively. Then mark alternating plus and minus symbols on each of the elements. We can construct "sub-matrices" by eliminating a single row and column.

\\[
\vec{a} \times \vec{b} = \begin{vmatrix}
\hat{i} & \hat{j} & \hat{k}\\\\
a\_1 & a\_2 & a\_3\\\\
b\_1 & b\_2 & b\_3
\end{vmatrix} = (a\_2b\_3-a\_3b\_2)\hat{i} + (a\_3b\_1-a\_1b\_3)\hat{j}+(a\_1b\_2-a\_2b\_1)\hat{k}
\\]


#### Inverse matrix {#inverse-matrix}

Finding the inverse of a matrix simply the solution to the equation \\(AA^{-1} = I\\). We can employ the techniques of matrix augmentation and **Gaussian elimination** as discussed previously in solving systems of equations.

\\[\begin{array}{ccc|ccc}
a\_1 & a\_2 & a\_3 & 1 & 0 & 0 \\\\
b\_1 & b\_2 & b\_3 & 0 & 1 & 0 \\\\
c\_1 & c\_2 & c\_3 & 0 & 0 & 1 \end{array}\\]


#### Eigen vectors and Eigen values {#eigen-vectors-and-eigen-values}

When applying a linear transformation to the set of all input vectors, we may be interested in the vectors which do not rotate off their span but are just scaled to some values. These vectors which have this property are the eigen vectors and the magnitude by which they are scaled after the transformation is referred to the eigen value.  Intuitively, we see this in the formula below which tries to solve for a vector \\(v\\) which is only scaled by \\(\lambda\\) after a transformation \\(A\\) is applied. There are cases of linear transformations for which all the vectors in the vector space are rotated, in which case the eigen vectors and values calculated will be imaginary.

\\[
A\vec{v} = \lambda \vec{v}
\\]

Solving the above linear algebra equation above follows the same process as outlined when solving a system of equations. Rearranging the above equation, we have the following:

\\[
(A - \lambda I)\vec{v} = \vec{0}
\\]

Taking the determinate of \\(A - \lambda I\\) will produce a **characteristic polynomial** with \\(\lambda\\) being the unknown. We are looking for solutions for the above equation, so setting the characteristic polynomial equal to zero we can solve for \\(\lambda\\) hence producing our Eigen values. An example for a \\(2 \times 2\\) matrix is shown below:

\\[
\text{det}(A - \lambda I) = \begin{vmatrix} a\_1 - \lambda & a\_2 \\\ b\_1 & b\_2 - \lambda \end{vmatrix} = (a\_1 - \lambda)(b\_2 - \lambda) - (b\_1)(a\_2) = 0
\\]

With the eigen values \\(\lambda\\) solved, we can find solutions for the eigen vectors. For each eigen value we can treat \\((A = \lambda I)\vec{v} = \vec{0}\\) as a system of linear equations and use our techniques of Gaussian elimination to simplify our matrix to row-echelon form as discussed earlier to solve for \\(\vec{v}\\), our eigen vectors.


#### Diagonalization of matrix {#diagonalization-of-matrix}

A diagonal matrix is simply a matrix with non-zero elements along its diagonal as shown below. All other elements are zero. When applying a matrix to a vector as a linear transformation, a diagonal matrix is useful since it only scales the each of the vector components.

\\[D =
\begin{bmatrix}
c\_1 & \dots & 0 \\\\
\vdots & \ddots & 0 \\\\
0 & \dots & c\_n \end{bmatrix}\\]

Calculating the eigen vectors and eigen values of a matrix provides us with the information to transform the matrix into its equivalent diagonal form with the equation below, where \\(P\\) is matrix made up of the eigen vectors of \\(A\\). Only if the eigen vectors are linearly independent, can we calculate a diagonal matrix.

\\[
P^{-1}AP = D
\\]


## Vector calculus {#vector-calculus}


### Scalar field and its gradient {#scalar-field-and-its-gradient}

The terminology of a "field" is not something new. We have dealt with scalar fields already, which are simply functions which for every point in space produces some scalar value. Recall how we modeled surfaces in \\(R^3\\) space. Scalar fields are useful when assigning a scalar value to points in space. For example temperatures or pressure in \\(R^2\\) or \\(R^3\\) space. Notation wise, nothing changes.

Finding the gradient of a scalar field is simply taking the partial derivative of the scalar function with respect to each direction. The output of the gradient operation if a vector which points up along the steepest "hill" of the function. The \\(\nabla\\) symbol (pronounced "nabla") is introduced as a shorthand to instruct you to perform this operation. It is important to note, that gradient at every point of the scalar function will produce a vector field, which is discussed further on.

\\[
\nabla f = \frac{\partial f}{\partial x} \hat{i} + \frac{\partial f}{\partial y} \hat{j}+ \frac{\partial f}{\partial z} \hat{k}
\\]


### Lines and line integrals of scalar fields {#lines-and-line-integrals-of-scalar-fields}

As mentioned at the beginning, integrals are mathematical tools useful for summing up arbitrarily small sections. The area under a curve is calculated as the weighted sum of arbitrarily small rectangles under the curve. The "weights" in this case is the height of the rectangle (i.e. the value of the function at that point). A line integral represents the weighted sum of arbitrarily small sections along an arbitrary line. In \\(R^3\\) the line integral can be visualized as the area of the "curtain" or cross-section of the surface along the line.

A line in \\(R^3\\) is represented by the symbol \\(C\\) with arbitrarily small sections \\(ds\\). Each point on the line is represented by some point on the xy plane or by a vector \\(\vec{r}\\) and hence the weights in this weighted sum is \\(f(x,y)\\) or \\(f(\vec{r})\\) respectively. To find the line integral between two points \\(a\\) and \\(b\\) we will first parameterize the curve and following the Pythagorean theorem \\(ds = \sqrt{\frac{dx}{dt} + \frac{dy}{dt}}\\). In vector notation this is notation is simplified with the _norm_ operator. I include both notations below.

\\[
\int\_{C}^{} f(x,y) ds = \int\_{a}^{b} f(g(t), h(t)) \sqrt{\frac{dx}{dt} + \frac{dy}{dt}} dt
\\]

\\[
\int\_{C}^{} f(\vec{r}) ds = \int\_{a}^{b} f(\vec{r}(t)) \mid\vec{r'}(t)\mid dt
\\]

The are 2 categories for the types of lines, we will encounter. The first is whether the line is simple or not. A simple line is simply a line which does not cross over itself. The second category is whether the line is closed. A closed line ends where it started. Any combination of these two categories classifies a line.

Furthermore, should a line enclose a region of space \\(D\\). We can classify whether that region is simply connected or not.


### Vector field {#vector-field}

Following scalar fields, a vector field is a function which for every point in space and produces a vector. Vector fields have a natural affinity to modeling physical phenomena such as fluid flow, heat flow and electromagnetic fields. The following sections on divergence and curl will rely heavily on our intuition of fluid flow. Furthermore vector fields also have applications in roughly determining the effects of initial conditions on systems of differential equations.

We denote vector field functions with a bold symbol. Vector fields are functions which for every point in space produces a vector. We will not use the column vector notation for the resulting vector and we will no longer have the assumption the vector begins at the origin. Instead this resulting vector can be described by the weighted sum of the \\(\hat{i}\\), \\(\hat{j}\\) and \\(\hat{k}\\) unit vectors. The weights in each direction is calculated by introducing the _scalar_ functions \\(P\\), \\(Q\\) and \\(R\\).

\\[
\boldsymbol{F}(x,y,z) = P(x,y,z) \hat{i} + Q(x,y,z) \hat{j} + R(x,y,z) \hat{z}
\\]

Similarly to the scalar field, the gradient of the a vector field is calculated by applying the partial derivative on the scalar functions which make up the vector field.

\\[
\text{grad} \boldsymbol{F} = \nabla \boldsymbol{F} = (\frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z}) = \frac{\partial}{\partial x}{\hat{i}} + \frac{\partial}{\partial y}{\hat{j}} + \frac{\partial}{\partial z}{\hat{k}}
\\]


### Divergence {#divergence}

I introduced vector fields as useful tools for modeling fluid flow. Intuitively if a fluid flow there are regions of sources (points where the vectors generally diverge) and sinks (points where vectors converge). The divergence of a vector field is simply the sum of the partial derivatives at a point. If the scalar result is positive, there is overall divergence at that point. Conversely, if the result is negative, there is overall convergence at that point.

\\[
div \boldsymbol{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}
\\]

The notation of divergence however is commonly written as the dot product of the \\(nabla\\) (i.e. gradient) operator and the vector field itself. In this notation we treat the \\(\nabla\\) operator as a standalone vector \\(\nabla = [\frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z}]\\). If we continue with the mechanical steps of applying the dot product we return to the same result.

\\[
\nabla \cdot \boldsymbol{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}
\\]


### Curl {#curl}

An intuitive explanation for curl is simply picturing how a small paddle would rotate if placed in a fluid (represented by a vector field). The
Positive refers to anti-clockwise rotation.

Similarly to divergence, the notation for curl treats the \\(\nabla\\) operator as a standalone vector.

\\[
\nabla \times \boldsymbol{F} = \begin{vmatrix}\hat{i} & \hat{j} & \hat{k} \\\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\\ F\_x & F\_y & F\_z \end{vmatrix}
\\]


### Line integrals of vector fields {#line-integrals-of-vector-fields}

We will now extend the line integral of a scalar field to a vector field. In a vector field, the integral is the weighted sum of small sections along a line \\(C\\), and unlike the scalar field, we will multiply the vector weights using the dot product to each point (represented by a vector) in space. We will use the same vector notation as before.

\\[
\int^{}\_{C} f(\vec{r}) ds = \int^{b}\_{a} f(\vec{r(t)}) \mid\vec{r'}(t)\mid dt
\\]


### Conservative vector fields and fundamental theorem of line integrals (path independence) {#conservative-vector-fields-and-fundamental-theorem-of-line-integrals--path-independence}

Recall, the calculating the gradient of a scalar field (function) produces a vector field. Working backwards, a vector field \\(\boldsymbol{F}\\) is classified as **conservative** if we can find a such function \\(f\\) whose gradient operation produces \\(\boldsymbol{F}\\). Such a function \\(f\\) is also known as the **potential** function for vector field \\(\boldsymbol{F}\\).

\\[
\nabla f = \frac{\partial f}{\partial x}\hat{i} + \frac{\partial f}{\partial y}\hat{j}+ \frac{\partial f}{\partial z} \hat{k} = P\hat{i} + Q\hat{j} + R\hat{k} = \boldsymbol{F}
\\]

Similarly, to the fundamental theorem of calculus, the line integral for a line \\(C\\) defined by \\(\vec{r}(t)\\) in a conservative vector field \\(\boldsymbol{F} = \nabla f\\) is simply the difference between the value at beginning \\(a\\) and end \\(b\\) of the line within a potential function \\(f\\). This is significant since we are only concerned with the start and end points of the line \\(C\\), and hence the path \\(C\\) takes to reach its end is irrelevant, hence path independence.

\\[
\int\_{C}^{}\nabla f \cdot d\vec{r} = f(\vec{r}(b)) - f(\vec{r}(a))
\\]

Here are a few additional observations for conservative vector fields:

-   the line integral for a closed line in a conservative vector field is \\(0\\).
-   the curl for a vector field \\(\boldsymbol{F}\\) is zero, by definition. (\\(\nabla \times \boldsymbol{F} = \vec{0}\\))


### Surface integrals and flux {#surface-integrals-and-flux}

The surface integral is simply the weighted (weights determined by scalar function \\(f(x,y,z)\\)) sum at each point along a parameterized surface \\(S = \vec{r}(s,t)\\). Naturally, the smaller the size of our surfaces are the more accurate our result. Thus remembering our general intuition, we turn to integration when finding the weighted sum small surfaces. However, also recall surfaces are curved. It is easier to work with the area of a surface, than the surface itself. To convert from the surface \\(S\\) to an area \\(D\\) simply project the surface onto a plane (e.g. what shadow does the surface give on the \\(xy\\) plane). We must also correct for the loss of information from the projection by adding a correcting factor, as shown below.

\\[
\iint^{}\_{S}f(x,y,z) dS = \iint^{}\_{D} f(\vec{r}(s, t)) \mid\mid \frac{\partial \vec{r}}{\partial x} \times \frac{\partial \vec{r}}{\partial t} \mid\mid dA
\\]

We can also extend the surface integral of a scalar field (i.e. function) to a vector field, which is more commonly referred to as flux. The only difference is the weighted sum is now we multiply the vectors at each point of the vector field \\(\boldsymbol{F}\\) by the normal vector \\(\vec{n}\\) of the surface \\(dS\\) at a point.


### Green's theorem (Divergence theorem) {#green-s-theorem--divergence-theorem}

It is intuitive for a field in \\(R^2\\), that the net flux (field) passing through the closed line \\(C\\), is dependent on the divergence (i.e. sources and sinks) of the field within its enclosed region \\(D\\). Expressed formulaically below where \\(\hat{\boldsymbol{n}}\\) is the normal vector at each part of the line \\(C\\). Notice that by relating a line integral to the double integral makes it easier to compute certain types of line integral problems. From experience, calculating a line integral is typically more mechanical than calculating a double integral.

\\[
\oint^{}\_{C} (\boldsymbol{F} \cdot \hat{\boldsymbol{n}}) ds = \iint^{}\_{D} (\nabla \cdot \boldsymbol{F}) dA
\\]

Expanded out, we get the following:

\\[
\oint^{}\_{C} (Ldx + Mdy) = \iint^{}\_{D} (\frac{\partial M}{\partial x} - \frac{\partial L}{\partial y}) dxdy
\\]

We can also extend Green's theorem to \\(R^3\\) by thinking about the closed surface \\(S\\) and its enclosed volume \\(V\\).

\\[
\oiint^{}\_{S} \boldsymbol{F} \cdot \hat{\boldsymbol{n}} dS = \iiint^{}\_{V} \nabla \cdot \boldsymbol{F} dV
\\]


### Stoke's Theorem {#stoke-s-theorem}

Similarly to how Green's theorem related the closed line integral of \\(C\\) to the divergence of its enclosed region \\(D\\), so does Stoke's theorem relate the line integral of \\(C\\) to the curl of its enclosed _surface_ \\(S\\).

\\[
\int^{}\_{C} \boldsymbol{F} \cdot d\vec{r} = \iint^{}\_{S} \nabla \times \boldsymbol{F} \cdot d\vec{S}
\\]


## Differential equations {#differential-equations}

No other mathematical tool is as prevalent in describing physical phenomena as differential equations. Often it is easier to describe a measure with respect to how it changes. Newton's second law of motion is an example of a differential equation. Differential equation problem try to find an unknown function which satisfies an equation and is conceptually slightly different than solving unknown variables in traditional equations.

\\[
F = m \frac{d^2}{{dt}^2} x(t)
\\]

Differential equations unfortunately are difficult to solve and there is no guarantee a solution exists. Differential equation problems fall into Ordinary Differential Equations (discussed in this section) and Partial Differential Equations (discussed in the next section). Ordinary differential equations are made up of functions which are dependent on a single variable. We can further divide ODE's into their own classes depending on the order of the equation.


### First order {#first-order}

Ensure the equation is in the standard form:

\\[
\frac{dy}{dt} + b(t)y = c(t)
\\]

The goal is to find the function that defines \\(y\\) (i.e. \\(y = y(t)\\)) such that the equation is true. The following process was developed to solve a first order linear equation. The first step is to introduce a new function \\(u(t)\\) which is referred to as the _integrating factor_.

\\[
u(t)\frac{dy}{dt} + u(t)b(t)y = u(t)c(t)
\\]

Now assume \\(u(t)b(t) = u'(t)\\), thus we can rewrite the equation as:

\\[
u(t)\frac{dy}{dt} + u'(t)y = u(t)c(t)
\\]

Remember the product rule \\(\frac{d}{dt}[f(t)y(t)] = f'(t)y(t) + f(t)y'(t)\\). We can thus replace the left hand side of the equation as follows:

\\[
\frac{d}{dt}[u(t)y(t)] = u(t)c(t)
\\]

Integrating both sides, and making y(t) the subject of the equation results in the following general solution to the problem. All we have to do now is find \\(u(t)\\).

\\[
u(t)y(t) + c = \int u(t)c(t)dt
\\]
\\[
y(t) = \frac{\int u(t)c(t)dt - c}{u(t)}
\\]

To determinate u(t) we must return to the first assumption made \\(u(t)b(t) = u'(t)\\). Solving for \\(u(t)\\) is done as follows.

\\[
\frac{u'(t)}{u(t)} = p(t)
\\]

\\[
ln\mid{u(t)}\mid = \int p(t) dt
\\]

Finally...
\\[
u(t) = e^{\int p(t) dt}
\\]


### Separable equations {#separable-equations}

Separable differential equations are in the form:

\\[
Ny(x)\frac{dy}{dx} = M(x)
\\]

I stressed earlier, \\(dx\\) and \\(dy\\) are really variables for small nudges in both the x and y directions respectively. We treat them as variables, by rearranging the equation and integrating both sides as follows. From there rearrange the terms to find an explicit solution in the form \\(y=y(x)\\). However recall, rearranging the equation as follows will limit the domain of \\(x\\) as \\(dx\\) cannot be \\(0\\).

\\[
N(y) dy = M(x) dx
\\]

\\[
\int^{}\_{} N(y) dy = \int^{}\_{} M(x) dx
\\]


### Second order {#second-order}

{{< callout >}}
Work in progress...
{{< /callout >}}


### The Laplace transform {#the-laplace-transform}

{{< callout >}}
Work in progress...
{{< /callout >}}


## Helpful resources {#helpful-resources}

-   [Paul's Online Notes](https://tutorial.math.lamar.edu/)
-   [3Brown1Blue Calculus Video Series](https://www.3blue1brown.com/topics/calculus)
-   [3Brown1Blue Linear Algebra Series](https://www.3blue1brown.com/topics/linear-algebra)
