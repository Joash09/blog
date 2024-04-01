---
author:
- Joash Naidoo
date: "2023-01-05T00:00:00+02:00"
draft: false
title: Jispy, my Lisp intepreter ported to WebAssembly
---

## The interpreter

{{< jispy-webassembly >}}

## What is Lisp?
Firstly, what is Lisp? Lisp is simple yet powerful family of programming languages. There are two main concepts which make up the language: expressions and lists.

### S-Expressions
We mainly use S-Expressions which are simply expressions which we expect the interpreter to evaluate.
Expressions are expressed denoted by parenthesis. For example "()" is an empty expression.
The structure of an expression follows Polish notation and is in the form (&lt;operator&gt; &lt;list of operands&gt;).
For instance 2+6 is expressed as (+ 2 6)

Expressions can be nested.
For instance (2 * 4) + 6 - 2 is expressed as (- (+ (* 2 4) 6) 2)
This is confusing at first, but becomes far more intuitive over time as it does not allow for any ambiguity regarding the order of operations.

### Q-Expressions
Another powerful feature not found in other mainstream languages is quoted expressions.
These expressions are not evaluated but just treated as data.
It is then possible to later evaluate the data as if it were code, hence bluring the difference between data and code.
We can create q-expressions with curly braces e.g. {{ '{ 1 2 3 4 }'}}
Alternatively using the list function. (list 1 2 3 4)
If we want to evaluate a q-expression: (eval {{ '{+ 2 3}' }})

### Variables
Variables are a common feature of any programming language as is also implemented here. The variables you can define are immutable: meaning they don't change state over time. This is a limitation as can't perform imperative programming however they are still useful in functional programming. You can declare a variable x with value of 2 as such:
def {{ '{x}' }} 2

### Functions
Functional programmers say this is all you need to create a model of computation...
At its core, functions are define using lambda functions (i.e. functions without a name). We can then use the def keyword to assign a name to the function which can be called later.
{{ 'def { func_name } (lambda {&lt;args list&gt;} {&lt;body&gt;})' }}
For example {{ 'def { square } (lambda { x } {* x x})'  }} defines a square function and can be called as (square 2)

### Still to come
As it stands, Jispy is not fully complete. I will be adding conditionals (if else statements) and support for strings.

## Detailed list of builtin functions

| Function       | Description                                                     | Examples                          |
| --- | --- | --- |
| +, -, \*, /, ^ | Mathematical functions                                          | (+ 2 3)                           |
| list           | Create list of Q-Expressions                                    | (list + 1 2)                      |
| eval           | Evaluate Q-Expression as S-Expression                           | (eval {+ 2 3})                    |
| head           | Return first element of Q-expression                            | head { 1 2 3 }                    |
| tail           | Return last element of Q-expression                             | tail {1 2 3}                      |
| lambda         | Create anonymous function                                       | (lambda {x} (* x x x))            |
| def            | Assign variable name to number, Q-expression or lambda function | def {cube} (lambda {x} (* x x x)) |
