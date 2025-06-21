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

## Application

An application is a Python package meant to be used directly by users, or deployed as a standalone package. There is no requirement for an application to be compatible with other libraries. For applications, reproducibility is crucial. It is generally considered good practise to pin all dependencies and sub-dependencies using a lockfile. This helps to ensure that the same environment is used offline and in production.

## Library

A library is a Python package intended to be used alongside other libraries in a shared environment. Here, avoid pinning exact versions as it can cause conflicts if other libraries require different versions of the same dependency. 

A general rule of thumb is to aim for a strict lower bound, where possible. This forces your users to use a more recent version, which is generally considered to be a good thing because the code should have fewer bugs and better features available.

Using upper bound version constraints can make your library incompatible with libraries that have strict lower limits, and users cannot fix an over restrictive cap. However, it is sometimes a valid approach. If you know that certain existing/upcoming versions are buggy, then it's probably wise to restrict those buggy versions now and aim to remove the cap quickly.

## Further Reading

- [Should You Use Upper Bound Version Constraints?](https://iscinumpy.dev/post/bound-version-constraints/)
- [Setup vs. Requirements](https://caremad.io/posts/2013/07/setup-vs-requirement/)