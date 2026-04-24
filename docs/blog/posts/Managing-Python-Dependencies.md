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
---
# Managing Python Dependencies

Python packages often depend on other packages to function. When publishing a package, you need to declare those dependencies and specify which versions are compatible. The right approach depends critically on whether you're building an **application** or a **library** — and conflating the two is a common source of dependency headaches.

## Applications vs Libraries

An **application** is a package intended to be run directly: a web app, CLI tool, data pipeline, or service. It lives at the top of the dependency tree and typically owns its environment.

A **library** is a package intended to be imported by other code. It lives *within* someone else's environment, potentially alongside many other libraries — some of which may share your dependencies.

This distinction drives almost every decision about how to constrain versions.

## Applications: Pin Everything

Because an application owns its environment, **reproducibility is the priority**. Pin all dependencies — including transitive ones — using a lockfile.

| Tool | Lockfile |
|------|----------|
| pip | `requirements.txt` via `pip freeze` |
| uv | `uv.lock` |
| Poetry | `poetry.lock` |
| PDM | `pdm.lock` |

Commit the lockfile to version control. This guarantees that every environment — local, CI, production — installs the same versions, preventing silent breakage from upstream updates.

In `pyproject.toml`, you can still express broad constraints (e.g. `django>=4.2`) and let the lockfile handle the exact pins. Alternatively, pin directly (e.g. `django==4.2.7`) if you want the lockfile to be redundant.

## Libraries: Be Permissive

Because a library shares an environment with other packages, **compatibility is the priority**. Overly tight constraints make it harder to install your library alongside others — a problem known as [dependency hell](https://en.wikipedia.org/wiki/Dependency_hell).

### Set a Lower Bound

Always specify a minimum version that includes the features or fixes you depend on:

```toml
# pyproject.toml
dependencies = [
    "requests>=2.28.0",
]
```

This tells installers the oldest version your library is known to work with.

### Avoid Upper Bounds

Upper bounds like `requests>=2.28,<3.0` are tempting but often harmful. They cause conflicts when another library in the same environment requires `requests>=3.0`, even if your library would work fine with it.

Upper bounds are justified when:

- A specific version is known to be broken or has a critical bug affecting your library
- A major release has confirmed, breaking API changes that you haven't yet handled

If you do add an upper bound, treat it as temporary. Remove or raise it as soon as you've verified compatibility. Tools like Dependabot or Renovate can alert you to new releases.

### Don't Ship a Lockfile

Libraries should not commit a lockfile for distribution purposes. Lockfiles pin transitive dependencies, which would override the resolver's ability to find a compatible set for the end user's environment. You can still use a lockfile internally for testing, but it should not be part of what you publish.

## Quick Reference

| | Application | Library |
|---|---|---|
| **Goal** | Reproducibility | Compatibility |
| **Version style** | Exact pins (`==`) or broad + lockfile | Lower bounds (`>=`) |
| **Lockfile** | Required — commit it | Internal only — don't publish |
| **Upper bounds** | Not relevant | Avoid unless justified |

## Further Reading

- [Should You Use Upper Bound Version Constraints?](https://iscinumpy.dev/post/bound-version-constraints/)
- [Semantic Versioning](https://semver.org/)
- [PyPA: Declaring dependencies](https://packaging.python.org/en/latest/discussions/install-requires-vs-requirements/)
- [Setup vs. Requirements](https://caremad.io/posts/2013/07/setup-vs-requirement/)