(function () {
  if (window.howItWorkLineInit) return;
  window.howItWorkLineInit = true;

  function initHowItWorkLine(root) {
    if (!root || root.dataset.lineReady === 'true') return;
    root.dataset.lineReady = 'true';

    var fillEl = root.querySelector('[data-line-fill]');
    var trackEl = root.querySelector('.how-it-work_line-track');
    var markers = root.querySelectorAll('[data-step-marker]');

    if (!fillEl || !trackEl) return;

    var ticking = false;

    function update() {
      ticking = false;

      var trackRect = trackEl.getBoundingClientRect();
      var viewportH = window.innerHeight || document.documentElement.clientHeight;

      /* Starts filling only when the section has moved further up the screen */
      var triggerLine = viewportH * 0.65;

      var percent = (triggerLine - trackRect.top) / trackRect.height;
      percent = Math.max(0, Math.min(1, percent));

      root.style.setProperty('--line-fill', percent);

      markers.forEach(function (marker) {
        var icon = marker.querySelector('.how-it-work_step-marker-icon');
        var target = icon || marker;

        var iconRect = target.getBoundingClientRect();
        var iconCenter = iconRect.top + (iconRect.height / 2);

        marker.classList.toggle('is-filled', iconCenter <= triggerLine);
      });
    }

    function onScroll() {
      if (ticking) return;

      window.requestAnimationFrame(update);
      ticking = true;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    update();
  }

  function initAll() {
    document
      .querySelectorAll('[data-how-it-work-line]')
      .forEach(initHowItWorkLine);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  document.addEventListener('shopify:section:load', function (event) {
    event.target
      .querySelectorAll('[data-how-it-work-line]')
      .forEach(function (el) {
        el.dataset.lineReady = 'false';
        initHowItWorkLine(el);
      });
  });
})();