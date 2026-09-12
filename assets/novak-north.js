const initHowItWorkLine = () => {
  const roots = document.querySelectorAll('[data-how-it-work-line]');
  if (!roots.length) return;

  roots.forEach((root) => {
    if (root.dataset.lineReady === 'true') return;
    root.dataset.lineReady = 'true';

    const markers = root.querySelectorAll('[data-step-marker]');
    markers.forEach((marker, i) => marker.style.setProperty('--i', i));
    root.style.setProperty('--steps-total', markers.length);

    const enterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) root.classList.add('is-active');
      });
    }, { threshold: 0, rootMargin: '0px 0px -35% 0px' });

    const exitObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) root.classList.remove('is-active');
      });
    }, { threshold: 0 });

    enterObserver.observe(root);
    exitObserver.observe(root);
  });
};

document.addEventListener('DOMContentLoaded', initHowItWorkLine);
document.addEventListener('shopify:section:load', initHowItWorkLine);


const initMobileMenuAnchorScroll = () => {
  const menu = document.querySelector('.mobile-nav');
  if (!menu) return;
  if (menu.dataset.anchorScrollBound) return;
  menu.dataset.anchorScrollBound = 'true';

  menu.addEventListener('click', (e) => {
    const link = e.target.closest('.mobile-menu__item .mobile-navlink');
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const hash = url.hash;
    if (!hash || hash === '#' || url.pathname !== window.location.pathname) return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    document.querySelector('.drawer__close-button')?.click();

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', hash);
    }, 300);
  });
};

document.addEventListener('DOMContentLoaded', initMobileMenuAnchorScroll);
document.addEventListener('shopify:section:load', initMobileMenuAnchorScroll);