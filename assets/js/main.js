/* ==========================================================================
   Novembre — Interactions partagées (landing pages retail design SEA)
   Scroll reveal, header state, hero text reveal, formulaire.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Header : état "scrolled" ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });
  }

  /* ---------- Hero : reveal du titre au chargement ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(function () {
      setTimeout(function () { hero.classList.add('is-revealed'); }, 150);
    });
  }

  /* ---------- Scroll reveal générique ([data-reveal]) ---------- */
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Index séquentiel pour les groupes révélés ensemble (cascade) */
  document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--reveal-index', i);
    });
  });

  /* ---------- Champs de formulaire : labels flottants ---------- */
  document.querySelectorAll('.field input, .field textarea, .field select').forEach(function (input) {
    var field = input.closest('.field');
    var sync = function () {
      var hasValue = input.tagName === 'SELECT' ? !!input.value : input.value.trim().length > 0;
      field.classList.toggle('is-active', hasValue || document.activeElement === input);
    };
    input.addEventListener('focus', sync);
    input.addEventListener('blur', sync);
    input.addEventListener('input', sync);
    sync();
  });

  /* ---------- Formulaire "Briefez-nous" : validation + simulation d'envoi ---------- */
  var briefForm = document.querySelector('#brief-form');
  if (briefForm) {
    briefForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = briefForm.querySelector('.form-status');
      var requiredFields = briefForm.querySelectorAll('[required]');
      var valid = true;

      requiredFields.forEach(function (field) {
        if (!field.value || !field.value.trim()) { valid = false; field.style.borderColor = 'var(--error)'; }
        else { field.style.borderColor = ''; }
      });

      if (!status) return;

      if (!valid) {
        status.textContent = 'Merci de compléter les champs obligatoires avant l’envoi.';
        status.classList.remove('is-success');
        status.classList.add('is-error');
        return;
      }

      status.textContent = 'Merci, votre brief est bien reçu. Notre équipe retail design vous recontacte sous 48h.';
      status.classList.remove('is-error');
      status.classList.add('is-success');
      briefForm.reset();
      briefForm.querySelectorAll('.field').forEach(function (f) { f.classList.remove('is-active'); });
    });
  }

  /* ---------- Année dynamique (footer) ---------- */
  var yearEl = document.querySelector('#current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
