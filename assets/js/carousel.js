// ========================================
// SIMPLE CAROUSEL (Vanilla JS)
// ========================================
// Lightweight carousel for simple slideshows
// ~150 lines of code, no dependencies

(function() {
    'use strict';

    class SimpleCarousel {
        constructor(container) {
            this.container = container;
            this.slides = container.querySelectorAll('.carousel-item');
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.config = {
                autoplay: container.dataset.autoplay === 'true',
                autoplayDelay: parseInt(container.dataset.autoplayDelay) || 3000,
                loop: container.dataset.loop !== 'false',
                transition: container.dataset.transition || 'fade'
            };
            
            if (this.slides.length === 0) return;
            
            this.init();
        }

        init() {
            // Show first slide
            this.showSlide(0);
            
            // Bind navigation buttons
            this.bindNavigation();
            
            // Bind keyboard navigation
            this.bindKeyboard();
            
            // Bind touch gestures
            this.bindTouch();
            
            // Initialize pagination
            this.initPagination();
            
            // Start autoplay if enabled
            if (this.config.autoplay) {
                this.startAutoplay();
            }
            
            // Pause on hover
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }

        showSlide(index) {
            // Update current index
            this.currentIndex = index;
            
            const totalSlides = this.slides.length;
            
            // Handle loop
            if (!this.config.loop) {
                if (index < 0) index = 0;
                if (index >= totalSlides) index = totalSlides - 1;
                this.currentIndex = index;
            } else {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;
                this.currentIndex = index;
            }

            // Hide all slides
            this.slides.forEach((slide, i) => {
                if (this.config.transition === 'fade') {
                    slide.style.opacity = i === this.currentIndex ? '1' : '0';
                    slide.style.display = 'block';
                } else {
                    slide.style.display = i === this.currentIndex ? 'block' : 'none';
                }
            });

            // Update pagination
            this.updatePagination();
        }

        next() {
            let newIndex = this.currentIndex + 1;
            if (newIndex >= this.slides.length) {
                newIndex = this.config.loop ? 0 : this.slides.length - 1;
            }
            this.showSlide(newIndex);
            
            // Reset autoplay
            if (this.config.autoplay) {
                this.restartAutoplay();
            }
        }

        prev() {
            let newIndex = this.currentIndex - 1;
            if (newIndex < 0) {
                newIndex = this.config.loop ? this.slides.length - 1 : 0;
            }
            this.showSlide(newIndex);
            
            // Reset autoplay
            if (this.config.autoplay) {
                this.restartAutoplay();
            }
        }

        goTo(index) {
            this.showSlide(index);
            
            // Reset autoplay
            if (this.config.autoplay) {
                this.restartAutoplay();
            }
        }

        bindNavigation() {
            const nextBtn = this.container.querySelector('.carousel-next');
            const prevBtn = this.container.querySelector('.carousel-prev');
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.next());
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.prev());
            }
        }

        bindKeyboard() {
            // Only bind if container is focused
            this.container.addEventListener('keydown', (e) => {
                if (e.target === this.container || e.target.closest('.carousel')) {
                    if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.next();
                    } else if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.prev();
                    }
                }
            });
        }

        bindTouch() {
            let startX = 0;
            let startY = 0;
            let distX = 0;
            let distY = 0;

            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            this.container.addEventListener('touchmove', (e) => {
                if (!startX || !startY) return;
                
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                distX = startX - touchX;
                distY = startY - touchY;
            });

            this.container.addEventListener('touchend', (e) => {
                if (!startX || !startY) return;
                
                // Calculate swipe distance
                const absDistX = Math.abs(distX);
                const absDistY = Math.abs(distY);
                
                // Determine if horizontal swipe
                if (absDistX > absDistY && absDistX > 50) {
                    if (distX > 0) {
                        this.next(); // Swipe right = next
                    } else {
                        this.prev(); // Swipe left = prev
                    }
                }
                
                // Reset
                startX = 0;
                startY = 0;
                distX = 0;
                distY = 0;
            });
        }

        initPagination() {
            const paginationContainer = this.container.querySelector('.carousel-pagination');
            if (!paginationContainer) return;

            // Create dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.dataset.index = index;
                dot.addEventListener('click', () => this.goTo(index));
                paginationContainer.appendChild(dot);
            });

            this.updatePagination();
        }

        updatePagination() {
            const dots = this.container.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('carousel-dot--active', index === this.currentIndex);
            });
        }

        startAutoplay() {
            if (!this.config.autoplay) return;
            
            this.pauseAutoplay();
            
            this.autoPlayInterval = setInterval(() => {
                this.next();
            }, this.config.autoplayDelay);
        }

        pauseAutoplay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }

        restartAutoplay() {
            this.pauseAutoplay();
            
            if (this.config.autoplay) {
                this.startAutoplay();
            }
        }

        destroy() {
            this.pauseAutoplay();
            
            // Remove event listeners
            this.container.removeEventListener('mouseenter', this.pauseAutoplay);
            this.container.removeEventListener('mouseleave', this.startAutoplay);
        }
    }

    // Initialize all carousels when DOM is ready
    const initCarousels = () => {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(container => {
            new SimpleCarousel(container);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }

    // Export for global use
    window.SimpleCarousel = SimpleCarousel;

})();

