// Navigation JavaScript for Portfolio Website
// Handles mobile menu, header behavior, and navigation interactions

'use strict';

function initNavigation() {
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!header || !mobileMenuToggle || !navMenu) return;
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav__menu--active')) {
                closeMobileMenu();
            }
        });
    });
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navMenu.classList.contains('nav__menu--active')) {
            closeMobileMenu();
        }
    });
    let lastScrollY = window.scrollY;
    let ticking = false;
    function updateHeader() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    window.addEventListener('scroll', requestTick);
    updateActiveNavLink();
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenuToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    if (!mobileMenuToggle || !navMenu) return;
    const isOpen = navMenu.classList.contains('nav__menu--active');
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open mobile menu
function openMobileMenu() {
    const mobileMenuToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const body = document.body;
    if (!mobileMenuToggle || !navMenu) return;
    navMenu.classList.add('nav__menu--active');
    mobileMenuToggle.classList.add('nav__toggle--active');
    body.classList.add('menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    navMenu.setAttribute('aria-hidden', 'false');
    createMenuOverlay();
}

// Close mobile menu
function closeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const body = document.body;
    if (!mobileMenuToggle || !navMenu) return;
    navMenu.classList.remove('nav__menu--active');
    mobileMenuToggle.classList.remove('nav__toggle--active');
    body.classList.remove('menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
    removeMenuOverlay();
}

// Create menu overlay
function createMenuOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.addEventListener('click', closeMobileMenu);
    document.body.appendChild(overlay);
    
    // Add overlay styles
    setTimeout(() => overlay.classList.add('active'), 10);
}

// Remove menu overlay
function removeMenuOverlay() {
    const overlay = document.querySelector('.menu-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
    const scrollPosition = window.scrollY + headerHeight + 100;
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href === `#${currentSection}`) {
            link.classList.add('nav__link--active');
        }
    });
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const navMenu = document.querySelector('.nav__menu');
        const mobileMenuToggle = document.querySelector('.nav__toggle');
        
        if (!navMenu || !mobileMenuToggle) return;
        
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--active')) {
            closeMobileMenu();
            mobileMenuToggle.focus();
        }
        
        // Tab navigation within mobile menu
        if (navMenu.classList.contains('nav__menu--active')) {
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initKeyboardNavigation);
