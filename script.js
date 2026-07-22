/* ============================================
   FES HealthTech — Main JavaScript v3.0
   Homepage interactions only.
   Navbar/Footer handled by components.js
   ============================================ */

(function () {
  'use strict';

  // ════════════════════════════════════════
  // HERO PARTICLES
  // ════════════════════════════════════════
  function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    const count = window.innerWidth > 768 ? 40 : 20;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        --duration:${6 + Math.random() * 8}s;
        --delay:${Math.random() * 6}s;
        --travel:${100 + Math.random() * 200}px;
        width:${1 + Math.random() * 3}px;
        height:${1 + Math.random() * 3}px;
      `;
      container.appendChild(p);
    }
  }

  // ════════════════════════════════════════
  // MARQUEE — Duplicate for seamless loop
  // ════════════════════════════════════════
  function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    if (track.dataset.cloned) return;
    const items = [...track.children];
    items.forEach(item => track.appendChild(item.cloneNode(true)));
    track.dataset.cloned = 'true';
  }

  // ════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ════════════════════════════════════════
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
  }

  // ════════════════════════════════════════
  // SMOOTH SCROLL for anchor links
  // ════════════════════════════════════════
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      });
    });
  }

  // ════════════════════════════════════════
  // 3D CARD PERSPECTIVE TILT
  // ════════════════════════════════════════
  function initCardTilt() {
    const cards = document.querySelectorAll('.c-tech-card, .c-moat-card, .c-vision-card, .c-adv-card, .c-hero-card');
    if (!cards.length) return;
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotX = ((y - midY) / midY) * 4;
        const rotY = ((midX - x) / midX) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ════════════════════════════════════════
  // INIT
  // ════════════════════════════════════════
  function init() {
    createParticles();
    initMarquee();
    initReveal();
    initSmoothScroll();
    initCardTilt();
    console.log('🚀 FES HealthTech v3.0 — Homepage loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
