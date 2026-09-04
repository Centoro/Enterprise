/**
 * work.js - Work Page Specific Logic
 * Handles: Mobile menu, Gallery subcategories, Horizontal scrolling, Lightbox
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initLightbox();
});

/**
 * 1. Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuClose = document.querySelector('.mobile-menu-close');

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        mobileNav.classList.toggle('active');
        if (mobileNav.classList.contains('active')) {
            mobileNav.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            mobileNav.style.display = '';
            document.body.style.overflow = '';
        }
    });

    if (menuClose) {
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            mobileNav.classList.remove('active');
            mobileNav.style.display = '';
            document.body.style.overflow = '';
        });
    }

    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileNav.style.display = '';
                document.body.style.overflow = '';
            }
        }
    });
}

/**
 * 2. Gallery Subcategory Switching
 */
window.switchSubcategory = function(gallery, sub, element) {
    // Update active tag
    const tags = document.querySelectorAll(`[data-gallery="${gallery}"]`);
    tags.forEach(tag => tag.classList.remove('active'));
    if (element) element.classList.add('active');

    // Update subheader text
    const header = document.getElementById(gallery + '-subheader');
    if (header) header.textContent = sub;

    // NOTE: In a real implementation, you would fetch/load new images here 
    // based on the 'gallery' and 'sub' parameters.
    console.log(`Loaded ${sub} for ${gallery}`);
};

/**
 * 3. Gallery Horizontal Scrolling
 */
window.scrollGallery = function(gridId, amount) {
    const grid = document.getElementById(gridId);
    if (grid) {
        grid.scrollBy({ left: amount, behavior: 'smooth' });
    }
};

/**
 * 4. Lightbox Functionality
 */
let currentLightboxImages = [];
let currentLightboxIndex = 0;

function initLightbox() {
    // Add click listeners to all gallery items to open lightbox
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const grid = this.closest('.gallery-grid');
            if (!grid) return;
            
            // Gather all images in this specific grid
            currentLightboxImages = Array.from(grid.querySelectorAll('.gallery-item img')).map(img => img.src);
            currentLightboxIndex = Array.from(grid.querySelectorAll('.gallery-item')).indexOf(this);
            
            openWorkLightboxByIndex(currentLightboxIndex);
        });
    });
}

window.openWorkLightbox = function(element) {
    // Fallback if called directly via inline onclick
    const img = element.querySelector('img');
    if (!img) return;
    
    const grid = element.closest('.gallery-grid');
    currentLightboxImages = Array.from(grid.querySelectorAll('.gallery-item img')).map(i => i.src);
    currentLightboxIndex = Array.from(grid.querySelectorAll('.gallery-item')).indexOf(element);
    
    openWorkLightboxByIndex(currentLightboxIndex);
};

function openWorkLightboxByIndex(index) {
    const lightbox = document.getElementById('work-lightbox');
    const lightboxImg = document.getElementById('work-lightbox-img');
    const counter = document.getElementById('work-lightbox-counter');
    
    if (lightbox && lightboxImg && currentLightboxImages.length > 0) {
        lightboxImg.src = currentLightboxImages[index];
        if (counter) counter.textContent = `${index + 1} / ${currentLightboxImages.length}`;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeWorkLightbox = function() {
    const lightbox = document.getElementById('work-lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.prevWorkImage = function() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        openWorkLightboxByIndex(currentLightboxIndex);
    }
};

window.nextWorkImage = function() {
    if (currentLightboxIndex < currentLightboxImages.length - 1) {
        currentLightboxIndex++;
        openWorkLightboxByIndex(currentLightboxIndex);
    }
};

// Close lightbox on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWorkLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevWorkImage();
    } else if (e.key === 'ArrowRight') {
        nextWorkImage();
    }
});
