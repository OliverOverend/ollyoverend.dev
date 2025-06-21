# %%
import numpy as np
from datetime import datetime

# %%
start_date = datetime(2025, 1, 1)
end_date = datetime(2025, 2, 5)
n = 2
shape = (n, 4, 5)
seed = 42
np.random.seed(seed)

# %%
days_range = (end_date - start_date).days
random_days = np.random.randint(0, days_range, shape)
start_np = np.datetime64(start_date.date(), "D")
random_dates = start_np + random_days.astype("timedelta64[D]")
print("Random Dates:\n", random_dates)

# %%
expanded = random_dates[:, :, :, None] == random_dates[:, :, None, :]
lower_tri = np.tril(np.ones((shape[-1], shape[-1]), dtype=bool), k=-1)
duplicate_mask = np.any(expanded & lower_tri, axis=-1)
filtered_dates = np.where(duplicate_mask, np.datetime64("NaT"), random_dates)
print("\nFiltered Dates (duplicates replaced by NaT):\n", filtered_dates)
