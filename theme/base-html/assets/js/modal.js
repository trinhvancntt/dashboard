// ========================================
// MODAL COMPONENT (Vanilla JS)
// ========================================
// Simple, lightweight modal for image gallery
// No dependencies, pure vanilla JavaScript

(function() {
    'use strict';

    class Modal {
        constructor(options = {}) {
            this.modal = null;
            this.trigger = options.trigger || '.modal-trigger';
            this.closeBtn = options.closeBtn || '.modal-close';
            this.overlay = options.overlay || '.modal-overlay';
            this.bodyClass = options.bodyClass || 'modal-open';
            this.init();
        }

        init() {
            // Create modal structure if it doesn't exist
            if (!document.querySelector('.modal')) {
                this.createModal();
            }

            this.modal = document.querySelector('.modal');
            this.bindEvents();
        }

        createModal() {
            const modalHTML = `
                <div class="modal">
                    <div class="modal-overlay"></div>
                    <div class="modal-content">
                        <button class="modal-close" aria-label="Close modal">&times;</button>
                        <div class="modal-body">
                            <!-- Content will be inserted here -->
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        bindEvents() {
            // Open modal
            const triggers = document.querySelectorAll(this.trigger);
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const content = trigger.getAttribute('data-modal-content') || trigger.innerHTML;
                    const type = trigger.getAttribute('data-modal-type') || 'image';
                    this.open(content, type);
                });
            });

            // Close buttons
            const closeButtons = document.querySelectorAll(`${this.closeBtn}, ${this.overlay}`);
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => this.close());
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen()) {
                    this.close();
                }
            });

            // Prevent body scroll when modal is open
            document.addEventListener('click', (e) => {
                if (e.target.closest(this.modal) && e.target === document.querySelector(this.overlay)) {
                    this.close();
                }
            });
        }

        open(content, type = 'image') {
            this.modal = document.querySelector('.modal');
            const modalBody = this.modal.querySelector('.modal-body');
            
            // Clear previous content
            modalBody.innerHTML = '';

            // Insert content based on type
            if (type === 'image') {
                modalBody.innerHTML = `<img src="${content}" alt="" class="modal-image">`;
            } else if (type === 'html') {
                modalBody.innerHTML = content;
            } else if (type === 'gallery') {
                this.renderGallery(content);
            }

            // Show modal
            this.modal.classList.add('modal--active');
            document.body.classList.add(this.bodyClass);
            
            // Focus trap
            this.focusTrap();
        }

        renderGallery(images) {
            // If images is a string (comma-separated), split it
            const imageArray = typeof images === 'string' ? images.split(',') : images;
            
            let galleryHTML = '<div class="modal-gallery">';
            imageArray.forEach((img, index) => {
                galleryHTML += `
                    <div class="modal-gallery-item" data-index="${index}">
                        <img src="${img.trim()}" alt="Gallery image ${index + 1}" class="modal-gallery-img">
                        ${index > 0 ? '<button class="modal-gallery-nav modal-gallery-prev">‹</button>' : ''}
                        ${index < imageArray.length - 1 ? '<button class="modal-gallery-nav modal-gallery-next">›</button>' : ''}
                    </div>
                `;
            });
            galleryHTML += '</div>';

            const modalBody = this.modal.querySelector('.modal-body');
            modalBody.innerHTML = galleryHTML;

            // Initialize gallery navigation
            this.initGalleryNavigation();
        }

        initGalleryNavigation() {
            const currentIndex = 0;
            const items = this.modal.querySelectorAll('.modal-gallery-item');
            
            // Hide all but first
            items.forEach((item, index) => {
                if (index !== currentIndex) {
                    item.style.display = 'none';
                }
            });

            // Next button
            const nextBtn = this.modal.querySelector('.modal-gallery-next');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.galleryNext(items, currentIndex));
            }

            // Previous button
            const prevBtn = this.modal.querySelector('.modal-gallery-prev');
            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.galleryPrev(items, currentIndex));
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (this.isOpen() && items.length > 1) {
                    if (e.key === 'ArrowRight') this.galleryNext(items, currentIndex);
                    if (e.key === 'ArrowLeft') this.galleryPrev(items, currentIndex);
                }
            });
        }

        galleryNext(items, currentIndex) {
            const visibleItem = Array.from(items).findIndex(item => item.style.display !== 'none');
            if (visibleItem < items.length - 1) {
                items[visibleItem].style.display = 'none';
                items[visibleItem + 1].style.display = 'block';
            }
        }

        galleryPrev(items, currentIndex) {
            const visibleItem = Array.from(items).findIndex(item => item.style.display !== 'none');
            if (visibleItem > 0) {
                items[visibleItem].style.display = 'none';
                items[visibleItem - 1].style.display = 'block';
            }
        }

        close() {
            if (!this.modal) return;
            
            this.modal.classList.remove('modal--active');
            document.body.classList.remove(this.bodyClass);
            
            // Clear content after animation
            setTimeout(() => {
                const modalBody = this.modal.querySelector('.modal-body');
                if (modalBody) {
                    modalBody.innerHTML = '';
                }
            }, 300);
        }

        isOpen() {
            return this.modal && this.modal.classList.contains('modal--active');
        }

        focusTrap() {
            // Trap focus inside modal
            const focusableElements = this.modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (firstElement) firstElement.focus();
        }

        destroy() {
            if (this.modal) {
                this.modal.remove();
            }
        }
    }

    // Initialize modal when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.modal = new Modal();
        });
    } else {
        window.modal = new Modal();
    }

    // Export for global use
    window.Modal = Modal;

})();

