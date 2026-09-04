// =====================================================
// WORK PAGE SPECIFIC SCRIPT
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    // ─── MOBILE MENU TOGGLE ──────────────────────────────────────
    console.log('Initializing mobile menu...');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuClose = document.querySelector('.mobile-menu-close');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger menu clicked!');
            mobileNav.classList.toggle('active');
            if (mobileNav.classList.contains('active')) {
                mobileNav.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                mobileNav.style.display = '';
                document.body.style.overflow = '';
            }
            console.log('Menu toggled:', mobileNav.classList.contains('active') ? 'open' : 'closed');
        });
        
        if (menuClose) {
            menuClose.addEventListener('click', function(e) {
                e.preventDefault();
                mobileNav.classList.remove('active');
                mobileNav.style.display = '';
                document.body.style.overflow = '';
                console.log('Menu closed by close button');
            });
        }
    }
    
    // ─── GALLERY SCROLL ──────────────────────────────────────────
    window.scrollGallery = function(gridId, amount) {
        const grid = document.getElementById(gridId);
        if (grid) {
            grid.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };
    
    // ─── GALLERY SUBCATEGORY ────────────────────────────────────
    window.switchSubcategory = function(gallery, sub, element) {
        const container = document.getElementById(gallery + '-grid');
        const header = document.getElementById(gallery + '-subheader');
        const tags = document.querySelectorAll(`[data-gallery="${gallery}"]`);
        
        tags.forEach(tag => tag.classList.remove('active'));
        if (element) element.classList.add('active');
        
        if (header) header.textContent = sub;
        if (container) {
            console.log(`Loading ${sub} images for ${gallery}`);
        }
    };
    
    // ─── LIGHTBOX FUNCTIONS ──────────────────────────────────────
    window.openFeaturedLightbox = function(imageSrc) {
        let lightbox = document.getElementById('lightbox');
        let lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
                    <img id="lightbox-img" src="" alt="Gallery Image">
                </div>
            `;
            document.body.appendChild(lightbox);
            lightboxImg = document.getElementById('lightbox-img');
        }
        if (lightboxImg) {
            lightboxImg.src = imageSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Lightbox navigation
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;
    
    // Initialize lightbox for gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const grid = this.closest('.gallery-grid');
            if (!grid) return;
            
            currentLightboxImages = Array.from(grid.querySelectorAll('.gallery-item img')).map(img => img.src);
            currentLightboxIndex = Array.from(grid.querySelectorAll('.gallery-item')).indexOf(this);
            
            openLightboxByIndex(currentLightboxIndex);
        });
    });
    
    function openLightboxByIndex(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const counter = document.getElementById('lightbox-counter');
        
        if (lightbox && lightboxImg && currentLightboxImages.length > 0) {
            lightboxImg.src = currentLightboxImages[index];
            if (counter) counter.textContent = `${index + 1} / ${currentLightboxImages.length}`;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    window.prevImage = function() {
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            openLightboxByIndex(currentLightboxIndex);
        }
    };
    
    window.nextImage = function() {
        if (currentLightboxIndex < currentLightboxImages.length - 1) {
            currentLightboxIndex++;
            openLightboxByIndex(currentLightboxIndex);
        }
    };
    
    // Close lightbox on click outside
    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileNav.style.display = '';
                document.body.style.overflow = '';
                console.log('Menu closed by clicking outside');
            }
        }
        
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active') && e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNav.style.display = '';
                document.body.style.overflow = '';
            }
            closeLightbox();
        }
    });
    
    console.log('✅ Work Page Scripts Loaded!');
});
