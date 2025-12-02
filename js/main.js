// Main JavaScript file for Portfolio Website
// Handles general functionality and initialization

'use strict';

// DOM Ready Function
function domReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// Initialize all functionality
domReady(function() {
    console.log('Portfolio website initialized');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize contact form if on contact page
    if (document.querySelector('.contact-form')) {
        initContactForm();
    }
    
    // Initialize project filtering if on projects page
    if (document.querySelector('.filter-buttons')) {
        initProjectFiltering();
    }
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Add loading animations
    initLoadingAnimations();
    
    // Initialize lazy loading for images
    initLazyLoading();

    // Initialize theme switching
    initTheme();
});

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading Animations
function initLoadingAnimations() {
    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
// Theme initialization and toggling
function initTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    const initial = saved ? saved : (prefersDark ? 'dark' : 'light');
    setTheme(initial, false);
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', initial === 'dark');
        updateThemeToggleIcon(initial);
        toggle.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(next, true);
            toggle.setAttribute('aria-pressed', next === 'dark');
            updateThemeToggleIcon(next);
        });
    }
}

function updateThemeToggleIcon(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function setTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem('theme', theme);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

// Contrast check utility (logs in dev)
function contrastRatio(hex1, hex2) {
    function toRgb(hex) {
        const m = hex.replace('#','');
        const bigint = parseInt(m.length === 3 ? m.split('').map(d=>d+d).join('') : m, 16);
        return [(bigint>>16)&255, (bigint>>8)&255, bigint&255];
    }
    function luminance([r,g,b]) {
        [r,g,b] = [r,g,b].map(v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
        return 0.2126*r + 0.7152*g + 0.0722*b;
    }
    const L1 = luminance(toRgb(hex1));
    const L2 = luminance(toRgb(hex2));
    const lighter = Math.max(L1, L2), darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}
// Monitoring: initialize Sentry if available and collect Web Vitals if loaded
domReady(function(){
    if (window.Sentry && window.SENTRY_DSN) {
        window.Sentry.init({ dsn: window.SENTRY_DSN, tracesSampleRate: 0.2 });
    }
    if (window.webVitals) {
        const logMetric = ({ name, value }) => {
            console.log('WebVital', name, value);
            if (window.Sentry) {
                window.Sentry.captureMessage(`WebVital ${name}: ${value}`, { level: 'info' });
            }
        };
        window.webVitals.getCLS(logMetric);
        window.webVitals.getFID(logMetric);
        window.webVitals.getLCP(logMetric);
        window.webVitals.getFCP(logMetric);
        window.webVitals.getTTFB(logMetric);
    }
});
