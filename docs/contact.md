# Contact Me

I'd love to hear from you! Whether you have a question, feedback, or just want to connect, feel free to reach out.

<div class="contact-form-container">
  <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required placeholder="Your name">
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required placeholder="your.email@example.com">
    </div>

    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" id="subject" name="subject" required placeholder="What's this about?">
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="6" required placeholder="Your message here..."></textarea>
    </div>

    <div class="form-group">
      <button type="submit" class="contact-submit-button">Send Message</button>
    </div>

    <div id="form-status"></div>
  </form>
</div>

---

**Alternative ways to connect:**

- [:fontawesome-brands-github: GitHub](https://github.com/OliverOverend)
- [:fontawesome-brands-linkedin: LinkedIn](https://www.linkedin.com/in/ollyoverend/)

<style>
.contact-form-container {
  max-width: 600px;
  margin: 2rem auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--md-default-fg-color);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--md-default-fg-color--lighter);
  border-radius: 4px;
  background-color: var(--md-default-bg-color);
  color: var(--md-default-fg-color);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--md-accent-fg-color);
}

.contact-submit-button {
  background-color: var(--md-primary-fg-color);
  color: var(--md-primary-bg-color);
  border: 2px solid var(--md-primary-fg-color);
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.contact-submit-button:hover {
  background-color: var(--md-default-bg-color);
  color: var(--md-default-fg-color);
}

#form-status {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  display: none;
}

#form-status.success {
  display: block;
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  border: 1px solid #4CAF50;
}

#form-status.error {
  display: block;
  background-color: rgba(244, 67, 54, 0.1);
  color: #F44336;
  border: 1px solid #F44336;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.textContent = 'Thanks for your message! I\'ll get back to you soon.';
        status.className = 'success';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      status.textContent = 'Oops! There was a problem sending your message. Please try again.';
      status.className = 'error';
    }
  });
});
</script>
