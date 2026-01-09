---
categories:
  - Python
date:
  created: 2025-06-21
  updated: 2025-06-22
description: A practical guide to managing Python dependencies, understanding the difference between applications and libraries, and making informed decisions about version constraints.
tags:
  - dependencies
  - packaging
  - best-practices
series: Python Best Practices
series_order: 1
series_description: A comprehensive guide to Python development best practices
---

# Managing Python Dependencies

Python packages often rely on a complex network of other packages to function. When publishing a Python package, it's essential to define which dependencies are required and to specify the range of compatible versions. However, the approach you take depends critically on whether you're building an **application** or a **library**.

Understanding this distinction is key to avoiding dependency conflicts and ensuring your package works well in the broader Python ecosystem.

## Application

An **application** is a Python package designed to be executed directly by users or deployed as a standalone service. Examples include web applications (Django/Flask apps), CLI tools, data pipelines, or microservices. There is typically no requirement for an application to be compatible with other libraries in a shared environment.

### Best Practices for Applications

**Pin all dependencies and sub-dependencies** using a lockfile to ensure reproducibility across development, testing, and production environments.

Common lockfile formats:

- `requirements.txt` with `pip freeze`
- `poetry.lock` with Poetry
- `Pipfile.lock` with Pipenv
- `pdm.lock` with PDM

**Example**: A Django web application should pin exact versions like `Django==4.2.7` to ensure the same version runs in all environments, preventing unexpected breakage from dependency updates.

## Library

A **library** is a Python package designed to be used alongside other libraries within a shared environment. Examples include `requests`, `pandas`, or any package published to PyPI that other developers will import. Unlike applications, **avoid pinning exact dependency versions** to prevent conflicts when other libraries require different versions of the same dependency.

### Best Practices for Libraries

Use flexible version constraints that allow your library to coexist with others:

#### Set a Strict Lower Bound

Require versions that include critical features or fixes your library depends on. This encourages users to adopt more recent, stable versions.

**Example**: If your library uses f-strings (added in Python 3.6) and a feature from `requests` 2.25.0:

```python
# setup.py or pyproject.toml
dependencies = [
    "requests>=2.25.0",
]
```

#### Avoid Upper Bounds Unless Necessary

Overly restrictive upper bounds (like `requests>=2.25.0,<3.0.0`) can break compatibility when other libraries require newer versions. This creates dependency conflicts that prevent users from installing your library alongside others.

**When upper bounds are justified**:

- A known version is broken or has a critical bug affecting your library
- An upcoming major release introduces confirmed breaking changes
- You need time to test compatibility with a new major version

**Important**: Remove upper bounds quickly once compatibility is restored or verified. Consider using tools like `dependabot` to stay informed about new releases.

## Quick Reference

| Aspect | Application | Library |
|--------|-------------|---------|
| **Purpose** | Standalone executable | Imported by other code |
| **Version Pinning** | Pin exact versions (`==`) | Use flexible bounds (`>=`) |
| **Lockfiles** | Required (commit to repo) | Not used for distribution |
| **Upper Bounds** | Not a concern | Avoid unless necessary |
| **Examples** | Web apps, CLI tools, services | `requests`, `pandas`, utilities |

## Further Reading

- [Should You Use Upper Bound Version Constraints?](https://iscinumpy.dev/post/bound-version-constraints/)
- [Setup vs. Requirements](https://caremad.io/posts/2013/07/setup-vs-requirement/)