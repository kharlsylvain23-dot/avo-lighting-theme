// Lightweight theme JS — keeps cart count fresh and progressively enhances forms.
(function () {
  'use strict';

  function refreshCartCount() {
    fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cart) {
        if (!cart) return;
        document.querySelectorAll('[data-cart-count]').forEach(function (el) {
          el.textContent = cart.item_count;
        });
      })
      .catch(function () {});
  }

  document.addEventListener('DOMContentLoaded', function () {
    refreshCartCount();

    // Dark-mode toggle
    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var next = isDark ? 'light' : 'dark';
        if (next === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        try { localStorage.setItem('theme', next); } catch (e) {}
        toggle.setAttribute('aria-pressed', String(next === 'dark'));
      });
    }

    // Open <details> FAQ items one at a time on mobile for tidiness.
    var faqs = document.querySelectorAll('.faq__list .faq__item');
    faqs.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        if (window.matchMedia('(max-width: 768px)').matches) {
          faqs.forEach(function (other) { if (other !== item) other.open = false; });
        }
      });
    });
  });

  // Refresh cart count after AJAX add events fired by apps.
  document.addEventListener('cart:updated', refreshCartCount);
})();
