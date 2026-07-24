/**
 * FES HealthTech — Shared Components v2.0
 * =========================================
 * Injects navbar + footer as inline HTML strings.
 * Works with file:// protocol — no fetch() needed.
 */

(function () {
  'use strict';

  // ── Path Detection ──────────────────────────────
  // Detect if we're in /pages/ subfolder or at root
  // Works for both http:// and file:// on Windows/Mac/Linux
  const fullPath = window.location.href.toLowerCase();
  const filename = window.location.pathname.split('/').filter(Boolean).pop() || '';
  const isInPages = fullPath.includes('/pages/') || fullPath.includes('\\pages\\');
  const R = isInPages ? '../' : ''; // Root prefix for assets & links

  // ── Navbar HTML ─────────────────────────────────
  function getNavbarHTML() {
    return `
<!-- Navbar -->
<nav class="navbar" id="navbar" role="navigation" aria-label="القائمة الرئيسية">
  <div class="container nav-inner">
    <a href="${R}index.html" class="nav-logo" aria-label="FES HealthTech — الصفحة الرئيسية">
      <img src="${R}assets/logo.webp" alt="شعار FES HealthTech" width="208" height="36" fetchpriority="high" />
    </a>
 
    <ul class="nav-links" role="list">
      <li><a href="${R}index.html">الرئيسية</a></li>
      <li><a href="${R}pages/about.html">من نحن</a></li>
      <li><a href="${R}pages/portfolio.html">منتجاتنا</a></li>
      <li><a href="${R}pages/faq.html">الأسئلة الشائعة</a></li>
      <li><a href="${R}pages/research.html">الأبحاث</a></li>
      <li><a href="${R}pages/contact.html">تواصل معنا</a></li>
    </ul>
 
    <div class="nav-cta">
      <a href="${R}pages/portfolio.html" class="btn btn-outline btn-sm">استكشف منتجاتنا</a>
      <a href="${R}pages/contact.html" class="btn btn-primary btn-sm">تواصل معنا</a>
    </div>
 
    <button class="hamburger" id="hamburger" aria-label="فتح القائمة" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
 
<!-- Mobile Drawer -->
<div class="mobile-drawer" id="mobileDrawer" role="dialog" aria-label="القائمة المتنقلة">
  <div class="drawer-overlay" id="drawerOverlay"></div>
  <div class="drawer-panel">
    <div class="drawer-header">
      <img src="${R}assets/logo.webp" alt="FES HealthTech" width="162" height="28" style="height:28px;" />
      <button class="drawer-close" id="drawerClose" aria-label="إغلاق القائمة">✕</button>
    </div>
    <a href="${R}index.html" class="drawer-link">الرئيسية</a>
    <a href="${R}pages/about.html" class="drawer-link">من نحن</a>
    <a href="${R}pages/portfolio.html" class="drawer-link">منتجاتنا</a>
    <a href="${R}pages/faq.html" class="drawer-link">الأسئلة الشائعة</a>
    <a href="${R}pages/research.html" class="drawer-link">الأبحاث</a>
    <a href="${R}pages/contact.html" class="drawer-link">تواصل معنا</a>
    <div class="drawer-cta">
      <a href="${R}pages/portfolio.html" class="btn btn-outline">استكشف منتجاتنا</a>
      <a href="${R}pages/contact.html" class="btn btn-primary">تواصل معنا</a>
    </div>
  </div>
</div>`;
  }
 
  // ── Footer HTML ─────────────────────────────────
  function getFooterHTML() {
    return `
<footer class="footer" id="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
 
      <!-- Brand -->
      <div class="footer-brand">
        <img src="${R}assets/logo.webp" alt="FES HealthTech" class="footer-logo" width="185" height="32" loading="lazy" />
        <p class="footer-brand-text">
          FES HealthTech — شركة تقنيات صحية رائدة متخصصة في بناء منصات إدارة العيادات والحلول الرقمية الذكية
          للرعاية الصحية عالمياً. نؤمن بأن التكنولوجيا الجيدة تخدم الممارس الصحي ولا تُعقّد عمله.
        </p>
        <div class="footer-social">
          <div class="footer-social-link" title="X (Twitter)" role="button">𝕏</div>
          <div class="footer-social-link" title="Instagram" role="button">📸</div>
          <div class="footer-social-link" title="LinkedIn" role="button">💼</div>
          <div class="footer-social-link" title="YouTube" role="button">▶️</div>
        </div>
      </div>
 
      <!-- Company Links -->
      <div>
        <h3 class="footer-col-title">الشركة</h3>
        <ul class="footer-links">
          <li><a href="${R}index.html">الرئيسية</a></li>
          <li><a href="${R}pages/about.html">من نحن</a></li>
          <li><a href="${R}pages/portfolio.html">منتجاتنا</a></li>
          <li><a href="${R}pages/faq.html">الأسئلة الشائعة</a></li>
          <li><a href="${R}pages/research.html">الأبحاث</a></li>
          <li><a href="${R}pages/contact.html">تواصل معنا</a></li>
        </ul>
      </div>
 
      <!-- Products Links -->
      <div>
        <h3 class="footer-col-title">منتجاتنا</h3>
        <ul class="footer-links">
          <li><a href="${R}pages/portfolio.html#murshid">مرشد — إدارة عيادات التغذية</a></li>
          <li><a href="${R}pages/portfolio.html#bariatric">مساعد جراحات السمنة</a></li>
        </ul>
      </div>
 

 
    </div>
 
    <div class="footer-bottom">
      <p class="footer-copy">
        © <span id="footerYear">2026</span> FES Medical Software Technology. جميع الحقوق محفوظة.
      </p>
      <div class="footer-bottom-links">
        <a href="${R}pages/privacy.html">سياسة الخصوصية</a>
        <a href="${R}pages/terms.html">شروط الاستخدام</a>
        <a href="${R}pages/contact.html">تواصل معنا</a>
      </div>
    </div>
  </div>
</footer>`;
  }

  // ── Inject Component ─────────────────────────────
  function inject(placeholderId, html) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    // Insert HTML before the placeholder, then remove the placeholder
    el.insertAdjacentHTML('beforebegin', html.trim());
    el.remove();
  }

  // ── Navbar: Scroll Effect ────────────────────────
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once immediately
  }

  // ── Announcement Bar: Hide on scroll ────────────
  function initAnnounceBar() {
    const bar = document.getElementById('announceBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        bar.style.maxHeight = '0';
        bar.style.paddingTop = '0';
        bar.style.paddingBottom = '0';
        bar.style.overflow = 'hidden';
        document.documentElement.style.setProperty('--announce-height', '0px');
      } else {
        bar.style.maxHeight = '';
        bar.style.paddingTop = '';
        bar.style.paddingBottom = '';
        bar.style.overflow = '';
        document.documentElement.style.setProperty('--announce-height', '40px');
      }
    }, { passive: true });
  }

  // ── Mobile Drawer ────────────────────────────────
  function initDrawer() {
    const hamburger = document.getElementById('hamburger');
    const drawer    = document.getElementById('mobileDrawer');
    const overlay   = document.getElementById('drawerOverlay');
    const closeBtn  = document.getElementById('drawerClose');
    if (!hamburger || !drawer) return;

    const openDrawer = () => {
      drawer.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () =>
      drawer.classList.contains('open') ? closeDrawer() : openDrawer()
    );

    overlay  && overlay.addEventListener('click', closeDrawer);
    closeBtn && closeBtn.addEventListener('click', closeDrawer);

    // Close when any drawer link is clicked
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }

  // ── Active Nav Link ──────────────────────────────
  function initActiveNav() {
    const currentFile = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .drawer-panel a').forEach(link => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href && href !== '#' && href === currentFile) {
        link.classList.add('active');
      }
    });
  }



  // ── Scroll Reveal ────────────────────────────────
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

  // ── Cookie Consent Banner ────────────────────────
  function initCookieBanner() {
    if (localStorage.getItem('fes_cookies_accepted') === 'true') return;

    const style = document.createElement('style');
    style.textContent = `
      .cookie-banner {
        position: fixed;
        bottom: 24px;
        right: 24px;
        left: auto;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(37, 99, 235, 0.12);
        border-radius: 16px;
        padding: 20px 24px;
        box-shadow: 0 10px 30px rgba(13, 27, 42, 0.08);
        max-width: 400px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 14px;
        animation: cookieFadeUp 0.5s ease forwards;
        direction: rtl;
        text-align: right;
      }
      @media (max-width: 576px) {
        .cookie-banner {
          left: 16px;
          right: 16px;
          bottom: 16px;
          max-width: none;
          padding: 16px 20px;
        }
      }
      @keyframes cookieFadeUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .cookie-text {
        font-size: 0.88rem;
        color: #475569;
        line-height: 1.6;
        margin: 0;
      }
      .cookie-text a {
        color: #2563EB;
        font-weight: 700;
        text-decoration: underline;
      }
      .cookie-btn-group {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
      .cookie-btn {
        padding: 8px 18px;
        font-size: 0.82rem;
        font-weight: 700;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .cookie-accept {
        background: #2563EB;
        color: #fff;
        border: none;
      }
      .cookie-accept:hover {
        background: #1D4ED8;
      }
      .cookie-reject {
        background: transparent;
        color: #64748B;
        border: 1px solid rgba(100, 116, 139, 0.2);
      }
      .cookie-reject:hover {
        background: rgba(100, 116, 139, 0.05);
      }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p class="cookie-text">
        🔒 يستخدم موقعنا ملفات تعريف الارتباط الطبية لتحسين الأداء وتحليل حركة المرور. تصفحك للموقع يعني موافقتك على ذلك. لمزيد من المعلومات، اقرأ 
        <a href="${R}pages/privacy.html">سياسة الخصوصية</a>.
      </p>
      <div class="cookie-btn-group">
        <button class="cookie-btn cookie-reject" id="cookieReject">إغلاق</button>
        <button class="cookie-btn cookie-accept" id="cookieAccept">موافق</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', () => {
      localStorage.setItem('fes_cookies_accepted', 'true');
      banner.style.display = 'none';
    });
    document.getElementById('cookieReject').addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  // ── Main Init ────────────────────────────────────
  function init() {
    // 1. Inject navbar HTML
    inject('navbar-placeholder', getNavbarHTML());
 
    // 2. Inject footer HTML
    inject('footer-placeholder', getFooterHTML());
 
    // 3. Wire up behaviours (DOM is now ready)
    initNavbarScroll();
    initAnnounceBar();
    initDrawer();
    initActiveNav();
    initReveal();
    initCookieBanner();
 
    // 4. Update footer year dynamically
    const yearEl = document.getElementById('footerYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
 
    console.log('[FES] Components injected. Root prefix:', R || '(root)');
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
