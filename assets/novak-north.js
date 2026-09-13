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

  const scrollToTarget = (target, hash) => {
    const top = target.getBoundingClientRect().top;

    if (typeof window.theme?.scrollTo === 'function') {
      window.theme.scrollTo(top, target);
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    history.replaceState(null, '', hash);
  };

  menu.addEventListener('click', (e) => {
    const link = e.target.closest('.mobile-menu__item .mobile-navlink');
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const hash = url.hash;
    if (!hash || hash === '#' || url.pathname !== window.location.pathname) return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();

    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      document.removeEventListener('theme:drawer:close', run);
      requestAnimationFrame(() => scrollToTarget(target, hash));
    };

    document.addEventListener('theme:drawer:close', run, { once: true });
    setTimeout(run, 600);

    const drawer = menu.closest('drawer-element');
    if (drawer && typeof drawer.close === 'function') {
      drawer.close();
    } else {
      document.querySelector('.drawer__close-button')?.click();
    }
  });
};

document.addEventListener('DOMContentLoaded', initMobileMenuAnchorScroll);
document.addEventListener('shopify:section:load', initMobileMenuAnchorScroll);