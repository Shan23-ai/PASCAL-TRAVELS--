(function () {
  const phone = '25411836557';

  function createWhatsAppUrl(message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(String(message || ''))}`;
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
