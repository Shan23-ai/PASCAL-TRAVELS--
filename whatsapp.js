(function () {
  const phone = '254118363557';

  function createWhatsAppUrl() {
    return `https://wa.me/${phone}`;
  }

  window.PascalWhatsApp = Object.freeze({ createWhatsAppUrl });

  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('[data-whatsapp-link]');
    if (!trigger) return;
    event.preventDefault();
    const message = trigger.getAttribute('data-whatsapp-message') || 'Hello Pascal Travels, I would like to make an enquiry.';
    window.location.href = createWhatsAppUrl(message);
  });
})();
