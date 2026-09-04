/**
 * about.js - About Page Specific Logic
 * Handles: Mobile menu toggle
 */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuClose = document.querySelector('.mobile-menu-close');

    if (menuToggle && mobileNav) {
        // Open menu
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

        // Close menu via X button
        if (menuClose) {
            menuClose.addEventListener('click', function(e) {
                e.preventDefault();
                mobileNav.classList.remove('active');
                mobileNav.style.display = '';
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking outside
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
});
