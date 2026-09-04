/**
 * work.js - Work Page Specific Logic
 * Handles: Mobile menu, Gallery subcategories, Horizontal scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
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
    const tags = document.querySelectorAll(`[data-gallery="${gallery}"]`);
    tags.forEach(tag => tag.classList.remove('active'));
    if (element) element.classList.add('active');

    const header = document.getElementById(gallery + '-subheader');
    if (header) header.textContent = sub;

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
