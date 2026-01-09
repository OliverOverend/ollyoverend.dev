# My Bookmarks

Save your favorite blog posts for easy access later. Bookmarks are stored locally in your browser.

<div id="bookmarks-list"></div>

<style>
.bookmark-button-container {
  margin: 1rem 0;
}

.bookmark-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 2px solid var(--md-accent-fg-color);
  color: var(--md-accent-fg-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
}

.bookmark-button:hover {
  background-color: var(--md-accent-fg-color);
  color: var(--md-primary-bg-color);
}

.bookmark-button.bookmarked {
  background-color: var(--md-accent-fg-color);
  color: var(--md-primary-bg-color);
}

.bookmark-button svg {
  flex-shrink: 0;
}

.bookmark-feedback {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--md-accent-fg-color);
  color: var(--md-primary-bg-color);
  padding: 1rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 1000;
}

.bookmark-feedback.show {
  opacity: 1;
  transform: translateY(0);
}

.bookmarks-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.bookmark-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: var(--md-code-bg-color);
  border-radius: 8px;
  border: 1px solid var(--md-default-fg-color--lightest);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.bookmark-item:hover {
  border-color: var(--md-accent-fg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bookmark-content {
  flex: 1;
}

.bookmark-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.bookmark-item h3 a {
  color: var(--md-default-fg-color);
  text-decoration: none;
}

.bookmark-item h3 a:hover {
  color: var(--md-accent-fg-color);
}

.bookmark-date {
  margin: 0;
  font-size: 0.85rem;
  color: var(--md-default-fg-color--light);
}

.remove-bookmark {
  background: transparent;
  border: none;
  color: var(--md-default-fg-color--light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.remove-bookmark:hover {
  background-color: var(--md-default-bg-color--lighter);
  color: var(--md-typeset-a-color);
}

.no-bookmarks {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--md-default-fg-color--light);
  font-style: italic;
}

@media (max-width: 600px) {
  .bookmark-feedback {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
}
</style>
