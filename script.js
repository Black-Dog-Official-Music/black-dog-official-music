// ============================================
// BLACK DOG OFFICIAL MUSIC - JAVASCRIPT
// Interazioni, animazioni e funzionalità
// ============================================

/**
 * Gestione del Menu Mobile
 */
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.navLink = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        this.navLink.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navLinks.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navLinks.classList.remove('active');
    }
}

/**
 * Gestione Animazioni AOS-like
 */
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        // Trigger iniziale
        this.checkElements();
        
        // Trigger su scroll
        window.addEventListener('scroll', () => this.checkElements());
    }

    checkElements() {
        this.elements.forEach(element => {
            if (this.isInViewport(element)) {
                this.animateElement(element);
            }
        });
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    animateElement(element) {
        if (element.classList.contains('animated')) return;
        
        const animation = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        element.style.animation = `${animation} 0.8s ease ${delay}ms forwards`;
        element.classList.add('animated');
    }
}

/**
 * Smooth Scroll per Navigation
 */
class SmoothScroll {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

/**
 * Navbar Background on Scroll
 */
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.style.boxShadow = '0 5px 30px rgba(0, 120, 212, 0.2)';
        } else {
            this.navbar.style.boxShadow = 'none';
        }
    }
}

/**
 * Gestione Hamburger Menu Animation
 */
class HamburgerAnimation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        if (this.hamburger) {
            this.setupStyles();
        }
    }

    setupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-8px, 8px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-8px, -8px);
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Parallax Effect su Hero
 */
class ParallaxHero {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        if (this.hero) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            this.hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    }
}

/**
 * Gestione Click Pulsanti Social
 */
class SocialLinks {
    constructor() {
        this.setupLinks();
    }

    setupLinks() {
        // I link sono già impostati negli href, qui aggiungiamo tracking opzionale
        document.querySelectorAll('.social-btn, .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.trackClick(btn.textContent);
            });
        });
    }

    trackClick(text) {
        // Tracciamento events (opzionale - integrare con analytics)
        console.log('Click su:', text);
    }
}

/**
 * Gestione Lazy Loading Immagini
 */
class LazyLoad {
    constructor() {
        if ('IntersectionObserver' in window) {
            this.init();
        }
    }

    init() {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Modal per Press Kit (opzionale)
 */
class PressKitModal {
    constructor() {
        this.downloadBtns = document.querySelectorAll('.download-btn');
        this.init();
    }

    init() {
        this.downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification(btn.textContent);
            });
        });
    }

    showNotification(text) {
        // Notifica che il file è stato scaricato
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1DB954;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = 'Download iniziato: ' + text;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

/**
 * Gestione Video Lazy Load
 */
class VideoLazyLoad {
    constructor() {
        this.videoWrappers = document.querySelectorAll('.video-wrapper');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadVideo(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            this.videoWrappers.forEach(wrapper => observer.observe(wrapper));
        }
    }

    loadVideo(wrapper) {
        const iframe = wrapper.querySelector('iframe');
        if (iframe && !iframe.src) {
            iframe.src = iframe.dataset.src || iframe.getAttribute('src');
        }
    }
}

/**
 * Dark Mode Toggle (opzionale)
 */
class DarkModeToggle {
    constructor() {
        this.isDarkMode = true;
        this.init();
    }

    init() {
        // Il sito è già in dark mode di default
        localStorage.setItem('theme', 'dark');
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
}

/**
 * Performance Optimization
 */
class PerformanceOptimizer {
    constructor() {
        this.optimizePerformance();
    }

    optimizePerformance() {
        // Preload critical resources
        this.preloadFonts();
        
        // Optimize scroll performance
        this.throttleScroll();
    }

    preloadFonts() {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@700;900&display=swap';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    throttleScroll() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

/**
 * Gestione Analytics
 */
class Analytics {
    constructor() {
        this.trackPageView();
        this.trackUserActions();
    }

    trackPageView() {
        // Integrare con Google Analytics o servizio tracking
        console.log('Page View:', window.location.href);
    }

    trackUserActions() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn') || target.classList.contains('link-btn')) {
                console.log('User clicked:', target.textContent);
            }
        });
    }
}

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Black Dog Official Music - Website Loaded');
    
    // Inizializza tutte le classi
    new MobileMenu();
    new ScrollAnimations();
    new SmoothScroll();
    new NavbarScroll();
    new HamburgerAnimation();
    new ParallaxHero();
    new SocialLinks();
    new LazyLoad();
    new PressKitModal();
    new VideoLazyLoad();
    new DarkModeToggle();
    new PerformanceOptimizer();
    new Analytics();

    console.log('✨ Tutti i moduli sono attivi');
});

/**
 * Gestione errori globali
 */
window.addEventListener('error', (e) => {
    console.error('Errore:', e.message);
});

/**
 * Notifica di compatibilità browser
 */
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver non supportato - usare polyfill');
}
