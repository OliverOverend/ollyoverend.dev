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

## Should I pin dependency versions?

I'd generally recommend not pinning dependencies if the users are likely to use the package in the same environment as other packages. Pinning can cause dependency conflicts, especially if those other packages are not pinning the same dependency versions.

Even if you pin the top-level dependencies you may not be pinning the sub-dependencies (i.e. dependencies of the dependencies), as a [lockfile](https://pydevtools.com/handbook/explanation/what-is-a-lock-file/#:~:text=A%20lockfile%20is%20a%20text,different%20systems%20and%20time%20periods.) does. A lockfile helps to create a 'single source of truth' that can be reliably reproduced.

## What range of versions should I set?

If the dependencies follow [SemVer](https://semver.org/), you might be inclined to set upper bound version constraints. However, this [post](https://iscinumpy.dev/post/bound-version-constraints/) explains 'why always providing an upper limit can cause far more harm than good, even for true SemVer libraries. Libraries that pin upper limits require more frequent updates rather than less, and this approach is not scalable.'.

## Supporting Links

- [Setup vs. Requirements: Explains the difference between setup.py and requirements.txt in Python packaging.](https://caremad.io/posts/2013/07/setup-vs-requirement/)