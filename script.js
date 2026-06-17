/* ============================================
   FES HealthTech — Main JavaScript v2.2
   يختص فقط بتفاعلات الصفحة الرئيسية.
   كل ما يتعلق بالنافبار/الفوتر في components.js
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
    // Only clone once (check if already cloned)
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
  // INTERACTIVE SIMULATOR TABS
  // ════════════════════════════════════════
  function initSimulator() {
    const tabs = document.querySelectorAll('.l-sim-tab-btn');
    const views = document.querySelectorAll('.l-sim-view');
    if (!tabs.length || !views.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        if (!targetId) return;

        // Reset active tab button
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Reset active view
        views.forEach(v => {
          v.classList.remove('active');
          if (v.id === targetId) {
            v.classList.add('active');
          }
        });
      });
    });
  }

  // ════════════════════════════════════════
  // 3D CARD PERSPECTIVE TILT
  // ════════════════════════════════════════
  function initCardTilt() {
    const cards = document.querySelectorAll('.c-suite-card, .c-platform-card, .c-investor-card, .c-segment-card, .c-advisory-card');
    if (!cards.length) return;
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotX = ((y - midY) / midY) * 5; // max 5 degrees rotation
        const rotY = ((midX - x) / midX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ════════════════════════════════════════
  // EHR JSON TERMINAL SIMULATOR
  // ════════════════════════════════════════
  function initTerminalTyper() {
    const body = document.getElementById('terminalBody');
    if (!body) return;

    const payload = `{
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "pat-08421",
        "active": true,
        "name": [{ "use": "official", "text": "ANONYMOUS_PATIENT" }]
      }
    },
    {
      "resource": {
        "resourceType": "Observation",
        "status": "final",
        "code": {
          "coding": [{ "system": "http://loinc.org", "code": "6281-9" }]
        },
        "valueQuantity": {
          "value": 5.4,
          "unit": "mEq/L"
        }
      }
    }
  ]
}`;

    function highlightJSON(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
          let cls = 'json-number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'json-key';
            } else {
              cls = 'json-string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'json-bool';
          } else if (/null/.test(match)) {
            cls = 'json-null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    let charIndex = 0;
    const speed = 10;
    body.innerHTML = '';

    function type() {
      if (charIndex < payload.length) {
        const currentText = payload.substring(0, charIndex + 1);
        body.innerHTML = highlightJSON(currentText) + '<span class="terminal-cursor" style="color:#10B981;font-weight:bold;animation:blink 1s infinite;">_</span>';
        charIndex += 3;
        setTimeout(type, speed);
      } else {
        body.innerHTML = highlightJSON(payload) + '\n\n<span class="c-pulse-dot" style="margin-right:8px;vertical-align:baseline;"></span><span style="color:#10B981;font-weight:bold;margin-left:6px;">✓ Integration Active (200 OK)</span>';
        setTimeout(() => {
          charIndex = 0;
          type();
        }, 12000);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(body);
  }

  // ════════════════════════════════════════
  // INIT
  // ════════════════════════════════════════
  function init() {
    createParticles();
    initMarquee();
    initReveal();
    initSmoothScroll();
    initSimulator();
    initCardTilt();
    initTerminalTyper();
    console.log('🚀 FES HealthTech v3.1 — B2B premium page script loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
