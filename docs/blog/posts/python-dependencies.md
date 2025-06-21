---
categories:
  - Python
date: 2025-06-21 
tags:
  - dependencies
updated: 2025-06-21 
---

# Defining Python Dependencies

Most Python packages depend on a (often complex) collection of other Python packages to work. When releasing a Python package it is crucial to define the dependencies needed by the package, as well as the range of compatible versions.

## App

An app is a Python package that is sometimes deployed, or used directly by the user, and doesn't have to be compatible with other libraries. In order to ensure reproducibility, you should probably be pinning the top-level dependencies and the sub-dependencies (i.e. dependencies of the dependencies) using a lockfile. Since an app doesn't need to live in the same environment as other libraries, there is no requirement to define a wide range of compatible versions.

## Library

A library is a Python package that a user will probably use with other libraries in the same environment. When developing a library, I'd generally recommend not pinning dependencies if you can avoid it. Pinning can cause dependency conflicts, especially if those other libraries are not pinning the same dependency versions. A general rule of thumb is to aim for a strict lower bound, when possible. This forces your users to use a more recent version, which is generally considered to be a good thing because the code should have fewer bugs and better features available.

You might be inclined to set upper bound version constraints, however think twice before doing so. This detailed [post](https://iscinumpy.dev/post/bound-version-constraints/) explains why always capping can have a negative effect overall. Capping can make your library incompatible with libraries that have strict lower limits, and users cannot fix an over restrictive cap. However, it sometimes a valid approach; if you know that certain existing/upcoming versions are buggy, then it's probably wise to restrict those buggy versions now and aim to remove the cap quickly.
