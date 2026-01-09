// Bookmark functionality for blog posts
(function() {
  'use strict';

  const STORAGE_KEY = 'blog-bookmarks';

  // Get all bookmarks from localStorage
  function getBookmarks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Save bookmarks to localStorage
  function saveBookmarks(bookmarks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  // Check if current page is bookmarked
  function isBookmarked(url) {
    const bookmarks = getBookmarks();
    return bookmarks.some(b => b.url === url);
  }

  // Add bookmark
  function addBookmark(url, title) {
    const bookmarks = getBookmarks();
    if (!isBookmarked(url)) {
      bookmarks.push({
        url: url,
        title: title,
        timestamp: Date.now()
      });
      saveBookmarks(bookmarks);
      return true;
    }
    return false;
  }

  // Remove bookmark
  function removeBookmark(url) {
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(b => b.url !== url);
    saveBookmarks(bookmarks);
  }

  // Toggle bookmark
  function toggleBookmark(url, title) {
    if (isBookmarked(url)) {
      removeBookmark(url);
      return false;
    } else {
      addBookmark(url, title);
      return true;
    }
  }

  // Create bookmark button
  function createBookmarkButton() {
    const currentUrl = window.location.pathname;
    const pageTitle = document.querySelector('h1')?.textContent || document.title;

    const button = document.createElement('button');
    button.className = 'bookmark-button';
    button.setAttribute('aria-label', 'Bookmark this post');

    const updateButton = (bookmarked) => {
      if (bookmarked) {
        button.classList.add('bookmarked');
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          <span>Bookmarked</span>
        `;
        button.setAttribute('title', 'Remove bookmark');
      } else {
        button.classList.remove('bookmarked');
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
          </svg>
          <span>Bookmark</span>
        `;
        button.setAttribute('title', 'Bookmark this post');
      }
    };

    updateButton(isBookmarked(currentUrl));

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const nowBookmarked = toggleBookmark(currentUrl, pageTitle);
      updateButton(nowBookmarked);

      // Show feedback
      showFeedback(nowBookmarked ? 'Post bookmarked!' : 'Bookmark removed');
    });

    return button;
  }

  // Show feedback message
  function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'bookmark-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.classList.add('show');
    }, 10);

    setTimeout(() => {
      feedback.classList.remove('show');
      setTimeout(() => feedback.remove(), 300);
    }, 2000);
  }

  // Initialize on blog posts
  function initBookmarks() {
    // Check if we're on a blog post page
    const article = document.querySelector('article');
    if (!article) return;

    // Check if page has date metadata (indicates it's a blog post)
    const hasDate = document.querySelector('time[datetime]');
    if (!hasDate) return;

    // Add bookmark button after the title
    const title = article.querySelector('h1');
    if (title) {
      const button = createBookmarkButton();
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'bookmark-button-container';
      buttonContainer.appendChild(button);
      title.parentNode.insertBefore(buttonContainer, title.nextSibling);
    }
  }

  // Render bookmarks list (for bookmarks page)
  function renderBookmarksList() {
    const container = document.getElementById('bookmarks-list');
    if (!container) return;

    const bookmarks = getBookmarks();

    if (bookmarks.length === 0) {
      container.innerHTML = '<p class="no-bookmarks">You haven\'t bookmarked any posts yet. Visit a blog post and click the bookmark button to save it here.</p>';
      return;
    }

    // Sort by most recent first
    bookmarks.sort((a, b) => b.timestamp - a.timestamp);

    const list = document.createElement('div');
    list.className = 'bookmarks-grid';

    bookmarks.forEach(bookmark => {
      const item = document.createElement('div');
      item.className = 'bookmark-item';

      item.innerHTML = `
        <div class="bookmark-content">
          <h3><a href="${bookmark.url}">${bookmark.title}</a></h3>
          <p class="bookmark-date">Saved ${new Date(bookmark.timestamp).toLocaleDateString()}</p>
        </div>
        <button class="remove-bookmark" data-url="${bookmark.url}" aria-label="Remove bookmark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      `;

      list.appendChild(item);
    });

    container.innerHTML = '';
    container.appendChild(list);

    // Add remove handlers
    container.querySelectorAll('.remove-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = btn.dataset.url;
        removeBookmark(url);
        renderBookmarksList();
        showFeedback('Bookmark removed');
      });
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initBookmarks();
    renderBookmarksList();
  });

  // Export for use in other scripts if needed
  window.BlogBookmarks = {
    getBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
})();
