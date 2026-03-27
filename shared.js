// NexReader — Shared JS

// Custom cursor
const cd = document.getElementById('cd');
const cr = document.getElementById('cr');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cd.style.left = mx + 'px'; cd.style.top = my + 'px';
});

function animCursor() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cr.classList.add('hover'));
  el.addEventListener('mouseleave', () => cr.classList.remove('hover'));
});

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, idx) => {
    if (e.isIntersecting) {
      // stagger children with class reveal inside a reveal container
      const children = e.target.querySelectorAll(
        '.bcard, .ai-card, .pcard, .tcard, .val-card, .team-card, .format-card, .a11y-card, .priv-card, .faq-item, .tl-item, .contact-item, .how-step, .sync-device, .annot-item'
      );
      if (children.length > 0) {
        children.forEach((child, i) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(18px)';
          child.style.transition = 'opacity .6s ease, transform .6s ease';
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, i * 65);
        });
      }
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
