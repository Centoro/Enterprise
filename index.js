/**
 * index.js - Home Page Specific Logic
 * Handles: Mobile menu toggle, Stats API fetch
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    fetchHomeStats();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuClose = document.querySelector('.mobile-menu-close');

    if (!menuToggle || !mobileNav) {
        console.error('Mobile menu elements not found');
        return;
    }

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

/**
 * Fetch Homepage Stats from API
 * Endpoint: GET /api/stats
 */
async function fetchHomeStats() {
    const downloadEl = document.getElementById('download-count');
    const fileEl = document.getElementById('file-count');
    const visitorEl = document.getElementById('visitor-count');

    // Fallback values if API fails
    const fallback = {
        downloads: '1.3k',
        files: '117',
        visitors: '3.3k'
    };

    try {
        // TODO: Replace with your actual backend endpoint
        const response = await fetch('/api/stats');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update DOM with API data
        if (downloadEl) downloadEl.textContent = data.downloads || fallback.downloads;
        if (fileEl) fileEl.textContent = data.files || fallback.files;
        if (visitorEl) visitorEl.textContent = data.visitors || fallback.visitors;

    } catch (error) {
        console.warn('Stats API unavailable, using fallback:', error);
        // Use fallback values
        if (downloadEl) downloadEl.textContent = fallback.downloads;
        if (fileEl) fileEl.textContent = fallback.files;
        if (visitorEl) visitorEl.textContent = fallback.visitors;
    }
}

/*
 * API Contract for Backend:
 * 
 * GET /api/stats
 * Response: {
 *   "downloads": "1.3k",
 *   "files": "117",
 *   "visitors": "3.3k"
 * }
 */
