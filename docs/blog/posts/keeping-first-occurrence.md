---
categories:
  - Python
date:
  created: 2025-06-21
  updated: 2025-06-21
description: Learn how to efficiently keep only the first occurrence of duplicate values in NumPy arrays while preserving order.
tags:
  - numpy
  - data-processing
  - performance
---

# Keeping First Occurrences in NumPy Arrays

When working with data in NumPy, you often encounter duplicate values that need to be filtered. A common requirement is to keep only the first occurrence of each value while preserving the original order. This is particularly useful when processing time-series data, removing duplicate measurements, or deduplicating event logs.

## The Problem

Given an array with duplicate values, we want to:

1. Identify which elements are duplicates
2. Keep only the first occurrence of each value
3. Preserve the original order

For example, transforming `[1, 2, 3, 2, 1, 4]` into `[1, 2, 3, 4]`.

## The Solution

NumPy provides an efficient way to solve this using `np.unique()` with the `return_index` parameter:

```python
import numpy as np

def keep_first_occurrence(arr):
    """
    Keep only the first occurrence of each value in the array.

    Parameters
    ----------
    arr : np.ndarray
        Input array with potential duplicates

    Returns
    -------
    np.ndarray
        Array with duplicates removed, preserving order
    """
    _, unique_indices = np.unique(arr, return_index=True)
    # Sort indices to preserve original order
    return arr[np.sort(unique_indices)]


# Example usage
data = np.array([1, 2, 3, 2, 1, 4])
result = keep_first_occurrence(data)
print(result)  # Output: [1 2 3 4]
```

## How It Works

1. `np.unique(arr, return_index=True)` returns both unique values and their first occurrence indices
2. We sort these indices to maintain the original order
3. We use fancy indexing to extract elements at those positions

## Performance Considerations

This approach is efficient for NumPy arrays because it leverages vectorized operations. For very large datasets, this method scales well with O(n log n) complexity due to the sorting step.

For pure Python lists, consider using a different approach:

```python
def keep_first_occurrence_list(lst):
    """Python list version using dict to preserve order."""
    return list(dict.fromkeys(lst))
```

The dict-based approach works because Python 3.7+ dictionaries maintain insertion order, making this a clean one-liner for lists.