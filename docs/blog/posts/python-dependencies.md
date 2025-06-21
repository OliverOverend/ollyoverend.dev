---
categories:
  - Python
date: 2025-06-21 
tags:
  - dependencies
updated: 2025-06-21 
---

# Managing Python Dependencies

Python packages often rely on a complex network of other packages to function. When publishing a Python package, it’s essential to define which dependencies are required and to specify the range of compatible versions.

## Application

An **application** is a Python package designed to be executed directly by users or deployed as a standalone service. There is no requirement for an application to be compatible with other libraries. To ensure reproducibility across development, testing, and production environments, it's best practise to **pin all dependencies and sub-dependencies** using a lockfile (e.g. `requirements.txt` or `poetry.lock`).

## Library

A **library** is a Python package meant to be used alongside other libraries within a shared environment. Unlike applications, **avoid pinning exact dependency versions** to avoid conflicts when other libraries require different versions of the same dependency. 

Instead:

- **Set a strict lower bound**: Require versions that include critical features or fixes your library depends on. This encourages users to use more recent, stable versions.
- **Avoid upper bounds unless necessary**: Overly restrictive caps can break compatibility with other libraries that have strict lower bounds. Upper bounds are justified when a known version is broken or incompatible, or an upcoming release introduces breaking changes. In such cases, aim to remove them quickly once compatibility is restored.

## Further Reading

- [Should You Use Upper Bound Version Constraints?](https://iscinumpy.dev/post/bound-version-constraints/)
- [Setup vs. Requirements](https://caremad.io/posts/2013/07/setup-vs-requirement/)