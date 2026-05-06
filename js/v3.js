/* ==========================================
   EXP立川 LP v3 - JavaScript
========================================== */

(function() {
    'use strict';

    // ─── DOM Ready ───
    document.addEventListener('DOMContentLoaded', function() {
        initHeader();
        initHamburger();
        initSmoothScroll();
        initFAQ();
        initLightbox();
        initPageTop();
        initScrollAnimation();
    });

    /* ─── Header scroll effect ─── */
    function initHeader() {
        const header = document.getElementById('v3Header');
        if (!header) return;

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 20) {
                        header.classList.add('is-scrolled');
                    } else {
                        header.classList.remove('is-scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /* ─── Hamburger menu ─── */
    function initHamburger() {
        const hamburger = document.getElementById('v3Hamburger');
        const nav = document.getElementById('v3Nav');
        if (!hamburger || !nav) return;

        hamburger.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('is-open');
            hamburger.classList.toggle('is-open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('is-open');
                hamburger.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        // Close on resize (when going from mobile to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 960) {
                nav.classList.remove('is-open');
                hamburger.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    }

    /* ─── Smooth scroll ─── */
    function initSmoothScroll() {
        const headerOffset = 72;

        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 20;
                    window.scrollTo({ top: targetPos, behavior: 'smooth' });
                }
            });
        });
    }

    /* ─── FAQ accordion ─── */
    function initFAQ() {
        const items = document.querySelectorAll('.v3-faq__item');
        items.forEach(function(item) {
            const btn = item.querySelector('.v3-faq__q');
            if (!btn) return;

            btn.addEventListener('click', function() {
                const isOpen = item.classList.contains('is-open');

                // Close all
                items.forEach(function(other) {
                    other.classList.remove('is-open');
                    const b = other.querySelector('.v3-faq__q');
                    if (b) b.setAttribute('aria-expanded', 'false');
                });

                // Toggle current
                if (!isOpen) {
                    item.classList.add('is-open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ─── Lightbox ─── */
    function initLightbox() {
        const lightbox = document.getElementById('v3Lightbox');
        const lightboxImg = document.getElementById('v3LightboxImg');
        const lightboxCaption = document.getElementById('v3LightboxCaption');
        if (!lightbox || !lightboxImg) return;

        const closeBtn = lightbox.querySelector('.v3-lightbox__close');
        const overlay = lightbox.querySelector('.v3-lightbox__overlay');

        const captionMap = {
            'personal-cover':     'GUIDEBOOK — ご本人様向け表紙',
            'organization-cover': 'GUIDEBOOK — 事業所向け表紙',
            'content-page1':      'GUIDEBOOK — アセスメント結果',
            'content-page2':      'GUIDEBOOK — 基本アセスメント結果'
        };

        document.querySelectorAll('.v3-guidebook__cover').forEach(function(cover) {
            cover.addEventListener('click', function() {
                const img = this.querySelector('img');
                const type = this.getAttribute('data-guidebook');
                if (!img) return;

                lightboxImg.setAttribute('src', img.getAttribute('src'));
                lightboxImg.setAttribute('alt', img.getAttribute('alt') || '');
                if (lightboxCaption) {
                    lightboxCaption.textContent = captionMap[type] || '';
                }

                lightbox.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (overlay)  overlay.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }

    /* ─── Page top button ─── */
    function initPageTop() {
        const btn = document.getElementById('v3PageTop');
        if (!btn) return;

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 400) {
                        btn.classList.add('is-visible');
                    } else {
                        btn.classList.remove('is-visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ─── Scroll-triggered fade in ─── */
    function initScrollAnimation() {
        const targets = document.querySelectorAll(
            '.v3-section__head, ' +
            '.v3-about__layout, ' +
            '.v3-about__card, ' +
            '.v3-about__note, ' +
            '.v3-strength, ' +
            '.v3-staff, ' +
            '.v3-flow__item, ' +
            '.v3-schedule__item, ' +
            '.v3-case__card, ' +
            '.v3-recommend__card, ' +
            '.v3-faq__item, ' +
            '.v3-download__card, ' +
            '.v3-contact'
        );

        if (!('IntersectionObserver' in window)) {
            // Fallback: just show everything
            targets.forEach(function(el) { el.classList.add('is-visible'); });
            return;
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        });

        targets.forEach(function(el) {
            el.classList.add('v3-fade-in');
            observer.observe(el);
        });
    }

})();
