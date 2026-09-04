/**
 * index.js - Home Page Specific Logic
 * Handles: Mobile menu toggle, API data fetching for homepage stats
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  fetchHomeStats();
});

/**
 * 1. Mobile Menu Toggle Logic
 * Extracted and optimized from the master script.
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuClose = document.querySelector('.mobile-menu-close');

  if (!menuToggle || !mobileNav) return; // Exit if elements aren't on this page

  // Open menu
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mobileNav.classList.add('active');
    mobileNav.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });

  // Close menu via X button
  if (menuClose) {
    menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      mobileNav.classList.remove('active');
      mobileNav.style.display = '';
      document.body.style.overflow = '';
    });
  }

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      mobileNav.classList.remove('active');
      mobileNav.style.display = '';
      document.body.style.overflow = '';
    }
  });
}

/**
 * 2. Fetch Home Page Stats from API
 * Endpoint: GET /api/stats
 * Updates the DOM elements: #download-count, #file-count, #visitor-count
 */
async function fetchHomeStats() {
  const downloadEl = document.getElementById('download-count');
  const fileEl = document.getElementById('file-count');
  const visitorEl = document.getElementById('visitor-count');

  // Fallback values in case the API isn't ready yet
  const fallbackData = {
    downloads: '1.3k',
    files: '117',
    visitors: '3.3k'
  };

  try {
    // TODO: Replace '/api/stats' with your actual backend endpoint
    const response = await fetch('/api/stats');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Update DOM with fetched data (or use fallback if a specific field is missing)
    if (downloadEl) downloadEl.textContent = data.downloads || fallbackData.downloads;
    if (fileEl) fileEl.textContent = data.files || fallbackData.files;
    if (visitorEl) visitorEl.textContent = data.visitors || fallbackData.visitors;

  } catch (error) {
    console.warn('Stats API unavailable, using fallback data:', error);
    // Apply fallback values gracefully without breaking the UI
    if (downloadEl) downloadEl.textContent = fallbackData.downloads;
    if (fileEl) fileEl.textContent = fallbackData.files;
    if (visitorEl) visitorEl.textContent = fallbackData.visitors;
  }
}

/* 
 * =====================================================
 * API CONTRACT FOR BACKEND DEVELOPER
 * =====================================================
 * 
 * GET /api/stats
 * 
 * Expected Response Format (JSON):
 * {
 *   "downloads": "1.3k",
 *   "files": "117",
 *   "visitors": "3.3k"
 * }
 * 
 * Note: The frontend is designed to gracefully fall back 
 * to hardcoded values if this endpoint is not yet available.
 */
