// Content stays visible if GSAP is unavailable or reduced motion is requested.
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const entrance = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } });
    entrance
      .from('.banner_text p', { opacity: 0, y: 18 })
      .from('.banner_text h1', { opacity: 0, y: 32 }, '-=0.65')
      .from('.banner_button', { opacity: 0, y: 20 }, '-=0.6')
      .from('.header_image', { opacity: 0, duration: 1.2 }, '-=0.9');

    // Scrub ties the plane's movement to actual scroll progress.
    gsap.to('.header_image', {
      y: -45, x: 30, ease: 'none',
      scrollTrigger: { trigger: '.landing', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    function reveal(elements, trigger) {
      if (!elements.length) return;
      gsap.from(elements, {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: trigger || elements[0], start: 'top 90%', once: true }
      });
    }

    document.querySelectorAll('main article, main section').forEach(section => {
      reveal(Array.from(section.querySelectorAll(':scope > h1, :scope > h2, :scope > p')), section);
    });
    // Per-card triggers also work for long single-column layouts.
    document.querySelectorAll('.dc, .journey__card, .discover_card, .exp').forEach(card => reveal([card]));
    reveal(Array.from(document.querySelectorAll('.wanderlust_image, .wanderlust_info')), document.querySelector('.wanderlust'));
    reveal(Array.from(document.querySelectorAll('.swiper')));
    document.querySelectorAll('.footer-col').forEach(column => reveal([column]));
  });

  // Photos and font loading can change section heights after initial layout.
  if (document.readyState === 'complete') ScrollTrigger.refresh();
  else window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}