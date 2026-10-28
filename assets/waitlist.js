const QUIZ_SELECTOR = 'a[href*="#quiz-kit-key-0zTirWNDw"]';

const swapQuizButtons = () => {
    const buttons = document.querySelectorAll(QUIZ_SELECTOR);
    if (!buttons.length) return;

    const label = document.querySelector('[data-waitlist-label]')?.textContent.trim();

    buttons.forEach((btn) => {
        btn.setAttribute('data-waitlist-trigger', '');
        if (!label) return;

        const span = btn.querySelector(':scope > span');
        if (span) {
            span.textContent = label;
            return;
        }

        const textNode = Array.from(btn.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        if (textNode) textNode.textContent = label;
    });
};
document.addEventListener('DOMContentLoaded', swapQuizButtons);
document.addEventListener('shopify:section:load', swapQuizButtons);

const initWaitlistDialog = () => {
    const dialog = document.querySelector('[data-waitlist-dialog]');
    if (!dialog || dialog.hasAttribute('data-waitlist-ready')) return;
    dialog.setAttribute('data-waitlist-ready', '');

    window.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-waitlist-trigger]');
        if (!trigger) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        dialog.showModal();
    }, true);

    dialog.querySelector('[data-waitlist-close]')?.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
    });

    if (dialog.querySelector('[data-waitlist-success], .errors')) dialog.showModal();
};
document.addEventListener('DOMContentLoaded', initWaitlistDialog);