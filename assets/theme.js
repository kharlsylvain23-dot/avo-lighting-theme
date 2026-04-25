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

    // PDP: gallery thumbnail switching
    var mainImg = document.getElementById('pdp-main-img');
    document.querySelectorAll('.pdp__thumb').forEach(function (t) {
      t.addEventListener('click', function () {
        document.querySelectorAll('.pdp__thumb').forEach(function (x) { x.setAttribute('aria-current', 'false'); });
        t.setAttribute('aria-current', 'true');
        if (mainImg && t.dataset.img) mainImg.src = t.dataset.img;
      });
    });

    // PDP: qty stepper
    document.querySelectorAll('[data-qty-step]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var input = btn.parentElement.querySelector('[data-qty-input]');
        if (!input) return;
        var step = parseInt(btn.dataset.qtyStep, 10);
        var min = parseInt(input.min || '1', 10);
        var max = parseInt(input.max || '99', 10);
        var v = Math.max(min, Math.min(max, (parseInt(input.value || '1', 10) + step)));
        input.value = v;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

    // PDP: variant swatches mirror the hidden <select> + submit form variant id
    document.querySelectorAll('.pdp__swatch[data-option-index]').forEach(function (s) {
      s.addEventListener('click', function () {
        var idx = s.dataset.optionIndex;
        var val = s.dataset.optionValue;
        // toggle pressed state in the same group
        s.parentElement.querySelectorAll('.pdp__swatch').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        s.setAttribute('aria-pressed', 'true');
        // mirror to the hidden select so the form submits the right option
        var select = document.querySelector('[data-option-select="' + idx + '"]');
        if (select) {
          select.value = val;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
    // demo (no product) swatches: pure visual toggle
    document.querySelectorAll('.pdp__swatch:not([data-option-index])').forEach(function (s) {
      s.addEventListener('click', function () {
        s.parentElement.querySelectorAll('.pdp__swatch').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        s.setAttribute('aria-pressed', 'true');
      });
    });

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
