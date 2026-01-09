// Add copy link functionality to headings
document.addEventListener('DOMContentLoaded', function() {
  // Select all headings with IDs (h2, h3, h4, h5, h6)
  const headings = document.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]');

  headings.forEach(heading => {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-link-button';
    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
    copyButton.setAttribute('aria-label', 'Copy link to clipboard');
    copyButton.setAttribute('title', 'Copy link');

    // Add click handler
    copyButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = window.location.origin + window.location.pathname + '#' + heading.id;

      try {
        await navigator.clipboard.writeText(url);

        // Visual feedback
        copyButton.classList.add('copied');
        copyButton.setAttribute('title', 'Copied!');

        setTimeout(() => {
          copyButton.classList.remove('copied');
          copyButton.setAttribute('title', 'Copy link');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    });

    // Insert button after heading
    heading.appendChild(copyButton);
  });
});
