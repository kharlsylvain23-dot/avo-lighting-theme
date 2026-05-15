/* ==========================================================================
   Avo Lighting — Theme JavaScript
   ========================================================================== */

(function() {
  'use strict';

  /* ---------- Hero Add to Cart (AJAX) ---------- */
  const heroForm = document.getElementById('hero-add-form');
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = document.getElementById('hero-add-btn');
      const btnText = btn.querySelector('.btn-text');
      const btnLoading = btn.querySelector('.btn-loading');
      const btnSuccess = btn.querySelector('.btn-success');

      btn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';

      var formData = new FormData(heroForm);
      var body = {};
      formData.forEach(function(v, k) { body[k] = v; });

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ items: [{ id: Number(body.id), quantity: Number(body.quantity) }] })
      })
      .then(function(res) {
        if (!res.ok) throw new Error('Add to cart failed');
        return res.json();
      })
      .then(function() {
        btnLoading.style.display = 'none';
        btnSuccess.style.display = 'inline';

        // Update cart count in header
        fetch('/cart.js').then(function(r) { return r.json(); }).then(function(cart) {
          var badge = document.querySelector('.cart-count');
          if (badge) { badge.textContent = cart.item_count; badge.style.display = cart.item_count > 0 ? '' : 'none'; }
        });

        setTimeout(function() {
          btnSuccess.style.display = 'none';
          btnText.style.display = 'inline';
          btn.disabled = false;
        }, 2000);
      })
      .catch(function() {
        btnLoading.style.display = 'none';
        btnText.style.display = 'inline';
        btn.disabled = false;
        window.location.href = '/cart';
      });
    });
  }

  /* ---------- Hero Gallery (multi-image thumbnails) ---------- */
  const heroGallery = document.getElementById('hero-gallery');
  if (heroGallery) {
    const slides = heroGallery.querySelectorAll('.hero-gallery-slide');
    const thumbs = heroGallery.querySelectorAll('.hero-thumb');

    thumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        var idx = parseInt(thumb.getAttribute('data-slide'), 10);
        slides.forEach(function(s) { s.classList.remove('active'); });
        thumbs.forEach(function(t) { t.classList.remove('active'); });
        if (slides[idx]) slides[idx].classList.add('active');
        thumb.classList.add('active');
      });
    });
  }

  /* ---------- Mobile Menu Toggle ---------- */
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  /* ---------- Product Thumbnails ---------- */
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.getElementById('product-main-image');

  if (thumbnails.length && mainImage) {
    thumbnails.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        thumbnails.forEach(function(t) { t.classList.remove('active'); });
        thumb.classList.add('active');
        mainImage.src = thumb.getAttribute('data-image-url');
        mainImage.alt = thumb.querySelector('img').alt;
      });
    });
  }

  /* ---------- Quantity Selectors ---------- */
  document.querySelectorAll('.quantity-selector').forEach(function(selector) {
    const minus = selector.querySelector('.qty-minus');
    const plus = selector.querySelector('.qty-plus');
    const input = selector.querySelector('.qty-input');

    if (minus && plus && input) {
      minus.addEventListener('click', function() {
        const val = parseInt(input.value, 10) || 1;
        if (val > 1) input.value = val - 1;
      });

      plus.addEventListener('click', function() {
        const val = parseInt(input.value, 10) || 1;
        input.value = val + 1;
      });

      input.addEventListener('change', function() {
        if (parseInt(input.value, 10) < 1 || isNaN(parseInt(input.value, 10))) {
          input.value = 1;
        }
      });
    }
  });

  /* ---------- Variant Selector (Product Page) ---------- */
  const productJson = document.getElementById('product-json');
  if (productJson) {
    try {
      const product = JSON.parse(productJson.textContent);
      const optionSelects = document.querySelectorAll('.product-option-select');
      const variantInput = document.querySelector('[data-variant-id]');
      const priceEl = document.querySelector('[data-product-price]');
      const addToCartBtn = document.querySelector('.btn-add-to-cart');

      if (optionSelects.length && variantInput) {
        optionSelects.forEach(function(select) {
          select.addEventListener('change', function() {
            const selectedOptions = [];
            optionSelects.forEach(function(s) {
              selectedOptions.push(s.value);
            });

            // Find matching variant
            const variant = product.variants.find(function(v) {
              return v.options.every(function(opt, i) {
                return opt === selectedOptions[i];
              });
            });

            if (variant) {
              variantInput.value = variant.id;

              // Update URL without reload (for dropshipping link sharing)
              const url = new URL(window.location.href);
              url.searchParams.set('variant', variant.id);
              window.history.replaceState({}, '', url.toString());

              // Update price display
              if (priceEl) {
                let priceHtml = '';
                if (variant.compare_at_price && variant.compare_at_price > variant.price) {
                  priceHtml += '<span class="price-compare">' + formatMoney(variant.compare_at_price) + '</span>';
                  priceHtml += '<span class="price-badge">Sale</span>';
                }
                priceHtml += '<span class="price-current">' + formatMoney(variant.price) + '</span>';
                priceEl.innerHTML = priceHtml;
              }

              // Update button state
              if (addToCartBtn) {
                if (variant.available) {
                  addToCartBtn.disabled = false;
                  addToCartBtn.textContent = 'Add to Cart';
                } else {
                  addToCartBtn.disabled = true;
                  addToCartBtn.textContent = 'Sold Out';
                }
              }

              // Update main image to variant image
              if (variant.featured_image && mainImage) {
                mainImage.src = variant.featured_image.src;
                mainImage.alt = variant.featured_image.alt || product.title;
              }
            }
          });
        });
      }
    } catch (e) {
      // Product JSON parse failed — page still works
    }
  }

  /* ---------- Collection Sort ---------- */
  const sortSelect = document.querySelector('[data-sort-select]');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

  /* ---------- Money Formatter ---------- */
  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

})();

/* AVO PRODUCT PAGE JS */
document.addEventListener('DOMContentLoaded', function () {
  var variantSelect = document.getElementById('ProductVariant');
  var price = document.getElementById('ProductPrice');

  if (variantSelect && price) {
    variantSelect.addEventListener('change', function () {
      var selected = variantSelect.options[variantSelect.selectedIndex];
      if (selected && selected.dataset.price) {
        price.textContent = selected.dataset.price;
      }
    });
  }

  document.querySelectorAll('button[name="checkout"]').forEach(function (button) {
    button.addEventListener('click', function () {
      var form = button.closest('form');
      if (!form) return;

      setTimeout(function () {
        window.location.href = '/checkout';
      }, 500);
    });
  });
});
