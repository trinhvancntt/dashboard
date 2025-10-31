// ========================================
// MAIN JAVASCRIPT FILE
// ========================================

(function() {
    'use strict';

    // ========================================
    // UTILITIES
    // ========================================
    
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
    
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    const throttle = (func, limit) => {
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
    };

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    
    const initSmoothScrolling = () => {
        const links = $$('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = $(href);
                if (!target) return;
                
                const headerHeight = $('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            });
        });
    };

    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = $$('.action-item, .cherish__item, .earth-friendly__item, .community__item, .with-people__item');
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    };

    // ========================================
    // HEADER SCROLL BEHAVIOR
    // ========================================
    
    const initHeaderScroll = () => {
        const header = $('.header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    };

    // ========================================
    // MOBILE MENU
    // ========================================
    
    const initMobileMenu = () => {
        const menuToggle = $('.header__menu-toggle');
        const nav = $('.header__nav');
        const body = document.body;
        
        if (!menuToggle || !nav) return;
        
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.contains('header__nav--open');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        const openMenu = () => {
            nav.classList.add('header__nav--open');
            menuToggle.classList.add('header__menu-toggle--open');
            body.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
        };
        
        const closeMenu = () => {
            nav.classList.remove('header__nav--open');
            menuToggle.classList.remove('header__menu-toggle--open');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        };
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = $$('.header__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    };

    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    
    const initLazyLoading = () => {
        const images = $$('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
            });
        }
    };

    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    
    // const initPerformanceOptimizations = () => {
    //     // Preload critical resources
    //     const preloadCriticalImages = () => {
    //         const criticalImages = [
    //             'images/hero-bg.jpg',
    //             'images/hero-bg-mobile.jpg'
    //         ];
            
    //         criticalImages.forEach(src => {
    //             const link = document.createElement('link');
    //             link.rel = 'preload';
    //             link.as = 'image';
    //             link.href = src;
    //             document.head.appendChild(link);
    //         });
    //     };
        
    //     // Optimize scroll events
    //     const optimizedScrollHandler = throttle(() => {
    //         // Scroll-based functionality here
    //     }, 16); // ~60fps
        
    //     window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
        
    //     // Initialize preloading
    //     preloadCriticalImages();
    // };

    // ========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================
    
    const initAccessibility = () => {
        // Skip link functionality
        const skipLink = $('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = $(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
        
        // Keyboard navigation for custom elements
        const focusableElements = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Announce dynamic content changes
        const announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };
    };

    // ========================================
    // ANALYTICS AND TRACKING
    // ========================================
    
    const initAnalytics = () => {
        // Track section views
        const sections = $$('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id;
                    // Track section view
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'section_view', {
                            'section_name': sectionName
                        });
                    }
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Track CTA clicks
        const ctaButtons = $$('.cta-button, .btn--primary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'cta_click', {
                        'button_text': button.textContent.trim(),
                        'button_location': button.closest('section')?.id || 'unknown'
                    });
                }
            });
        });
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    
    const init = () => {
        // Core functionality
        initSmoothScrolling();
        initScrollAnimations();
        initHeaderScroll();
        initMobileMenu();
        initLazyLoading();
        //initPerformanceOptimizations();
        initAccessibility();
        
        // Analytics (only in production)
        if (window.location.hostname !== 'localhost') {
            initAnalytics();
        }
        
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        console.log('Sustainability Landing Page initialized successfully');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose utilities globally if needed
    window.SustainabilityApp = {
        init,
        debounce,
        throttle
    };

})();
