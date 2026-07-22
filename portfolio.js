document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

  const form = document.querySelector('#contactForm');
  const status = document.querySelector('.form-status');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const button = form.querySelector('button');
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (button) {
        button.disabled = true;
        button.textContent = 'Envoi...';
      }

      if (status) {
        status.textContent = 'Envoi en cours...';
      }

      const serviceID = 'service_4pk8o8f';
      const templateID = 'template_3s92oej';
      const publicKey = 'u-eaQHo5Jj5NhZcf2';

      emailjs.send(serviceID, templateID, {
        from_name: name,
        from_email: email,
        message: message
      }, publicKey)
        .then(() => {
          if (status) {
            status.textContent = 'Message envoyé avec succès !';
          }
          form.reset();
          if (button) {
            button.disabled = false;
            button.textContent = 'Envoyer';
          }
        })
        .catch(() => {
          if (status) {
            status.textContent = 'Échec de l’envoi. Réessayez plus tard.';
          }
          if (button) {
            button.disabled = false;
            button.textContent = 'Envoyer';
          }
        });
    });
  }
});
