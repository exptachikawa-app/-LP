// ==========================================
// ハンバーガーメニュー制御
// ==========================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

// ハンバーガーメニューのクリックイベント
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    
    // body のスクロールを制御
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// ナビゲーションリンクをクリックしたらメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ==========================================
// スムーススクロール
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // "#" だけの場合はトップへスクロール
        if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        // その他のアンカーリンク
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// FAQアコーディオン
// ==========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // 他のすべてのFAQを閉じる
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // クリックされたFAQを開閉
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ==========================================
// ページトップボタン
// ==========================================
const pageTopBtn = document.getElementById('pageTop');

// スクロール位置に応じてボタンを表示/非表示
const togglePageTopBtn = () => {
    if (window.pageYOffset > 300) {
        pageTopBtn.classList.add('visible');
    } else {
        pageTopBtn.classList.remove('visible');
    }
};

// スクロールイベント（デバウンス処理）
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(togglePageTopBtn, 100);
});

// ページトップボタンのクリックイベント
pageTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// スクロールアニメーション（Intersection Observer）
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // 一度表示したら監視を解除（パフォーマンス向上）
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// アニメーション対象の要素を監視
const animateElements = document.querySelectorAll(`
    .about-card,
    .strength-card,
    .staff-profile,
    .flow-item,
    .recommend-card,
    .faq-item
`);

animateElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// ==========================================
// ヘッダーのスクロール時の挙動
// ==========================================
let lastScrollTop = 0;
const header = document.getElementById('header');

const handleHeaderScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール位置が一定以上の場合、ヘッダーに影を追加
    if (scrollTop > 50) {
        header.style.boxShadow = '0 2px 15px rgba(255, 152, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(255, 152, 0, 0.2)';
    }
    
    lastScrollTop = scrollTop;
};

// スクロールイベント（デバウンス処理）
let headerScrollTimeout;
window.addEventListener('scroll', () => {
    if (headerScrollTimeout) {
        clearTimeout(headerScrollTimeout);
    }
    headerScrollTimeout = setTimeout(handleHeaderScroll, 50);
});

// ==========================================
// 初期実行
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // ページトップボタンの初期状態
    togglePageTopBtn();
    
    // ヘッダーの初期状態
    handleHeaderScroll();
});

// ==========================================
// 外部リンクに rel 属性を追加（セキュリティ対策）
// ==========================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
    }
});
