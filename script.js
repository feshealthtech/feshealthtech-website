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
  // HERO INTERACTIVE DEMO WIDGET
  // ════════════════════════════════════════
  function initHeroWidgetDemo() {
    const tabs = document.querySelectorAll('.c-demo-tab');
    const panels = document.querySelectorAll('.c-demo-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });

    // Slider demo calculation
    const slider = document.getElementById('demoWeightInput');
    const textVal = document.getElementById('weightValText');
    const bmrVal = document.getElementById('demoBmrVal');
    const tdeeVal = document.getElementById('demoTdeeVal');

    if (slider && textVal && bmrVal && tdeeVal) {
      slider.addEventListener('input', (e) => {
        const weight = parseInt(e.target.value, 10);
        textVal.textContent = weight + ' كجم';
        // Mifflin-St Jeor estimate
        const bmr = Math.round(10 * weight + 6.25 * 175 - 5 * 30 + 5);
        const tdee = Math.round(bmr * 1.375);
        bmrVal.textContent = bmr.toLocaleString('en-US');
        tdeeVal.textContent = tdee.toLocaleString('en-US');
      });
    }
  }

  // ════════════════════════════════════════
  // PIPELINE INFRASTRUCTURE INTERACTIVE NODES
  // ════════════════════════════════════════
  function initPipelineNodes() {
    const nodes = document.querySelectorAll('.c-pipe-node');
    const inspectors = document.querySelectorAll('.c-inspector-content');
    if (!nodes.length || !inspectors.length) return;

    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const targetId = node.dataset.node;
        nodes.forEach(n => n.classList.remove('active'));
        inspectors.forEach(i => i.classList.remove('active'));
        node.classList.add('active');
        const targetInspector = document.getElementById(targetId);
        if (targetInspector) targetInspector.classList.add('active');
      });
    });
  }

  // ════════════════════════════════════════
  // MURSHID MOCKUP TAB SWITCHER
  // ════════════════════════════════════════
  function initMockupTabs() {
    const tabs = document.querySelectorAll('.c-mockup-tab');
    const panels = document.querySelectorAll('.c-mockup-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.mock;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  }

  // ════════════════════════════════════════
  // MOUSE SPOTLIGHT GLOW ON CARDS
  // ════════════════════════════════════════
  function initSpotlightGlow() {
    const cards = document.querySelectorAll('.c-tech-card, .c-moat-card, .c-vision-card, .c-adv-card, .c-pipe-node, .c-hero-demo-widget, .c-app-mockup');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
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
    initHeroWidgetDemo();
    initPipelineNodes();
    initMockupTabs();
    initSpotlightGlow();
    console.log('🚀 FES HealthTech v3.4 — Masterpiece Homepage Complete');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
