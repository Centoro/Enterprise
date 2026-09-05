// =====================================================
// CENTORO ENTERPRISE - COMPLETE SCRIPT
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ─── MOBILE MENU TOGGLE ──────────────────────────────────────
    console.log('Initializing mobile menu...');
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuClose = document.querySelector('.mobile-menu-close');
    
    if (menuToggle && mobileNav) {
        // Open menu
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
    } else {
        console.error('❌ Mobile menu elements not found!');
    }
    
    // ─── FEATURED WORK LIGHTBOX ──────────────────────────────────
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
    
    // ─── AUTH TABS ──────────────────────────────────────────────────
    window.switchAuthTab = function(tab) {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const tabs = document.querySelectorAll('.auth-tab');
        
        if (!loginForm || !registerForm) return;
        
        tabs.forEach(t => t.classList.remove('active'));
        
        if (tab === 'login') {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            if (tabs[0]) tabs[0].classList.add('active');
        } else {
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
            if (tabs[1]) tabs[1].classList.add('active');
        }
    };
    
    // ─── BEAT STORE FILTERS ──────────────────────────────────────
    window.filterBeats = function(genre, element) {
        const cards = document.querySelectorAll('.beat-card');
        const filters = document.querySelectorAll('.filter-btn');
        
        filters.forEach(btn => btn.classList.remove('active'));
        if (element) element.classList.add('active');
        
        cards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre') || '';
            if (genre === 'All' || cardGenre === genre) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
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
    
    // ─── SERIES SEARCH ──────────────────────────────────────────
    window.searchAllSeries = function() {
        const input = document.getElementById('seriesSearch');
        if (!input) return;
        const filter = input.value.toLowerCase();
        const cards = document.querySelectorAll('.drop-card, .monthly-card');
        cards.forEach(card => {
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            const artist = (card.getAttribute('data-artist') || '').toLowerCase();
            const desc = (card.getAttribute('data-desc') || '').toLowerCase();
            const text = title + ' ' + artist + ' ' + desc;
            card.style.display = text.indexOf(filter) > -1 ? '' : 'none';
        });
    };
    
    // ─── PORTAL SEARCH ──────────────────────────────────────────
    window.searchPortalContent = function(query) {
        const cards = document.querySelectorAll('.beat-card, .drop-card, .monthly-offer-card, .library-item, .contract-card');
        const searchTerm = query.toLowerCase().trim();
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (searchTerm === '' || text.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Also search in tables
        const tableRows = document.querySelectorAll('.purchases-table tbody tr');
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (searchTerm === '' || text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };
    
    // ─── SERIES POPUP ────────────────────────────────────────────
    window.openSeriesPopup = function(card) {
        const type = card.getAttribute('data-type');
        const title = card.getAttribute('data-title');
        const cover = card.getAttribute('data-cover');
        const overlay = document.getElementById('seriesPopupOverlay');
        
        if (!overlay) {
            console.error('Series popup overlay not found');
            return;
        }
        
        const popupTitle = document.getElementById('popupTitle');
        const popupImage = document.getElementById('popupImage');
        const popupBadge = document.getElementById('popupBadge');
        const popupSub = document.getElementById('popupSubDescription');
        const popupMeta = document.getElementById('popupMeta');
        const popupActions = document.getElementById('popupActions');
        const popupAudioDeck = document.getElementById('popupAudioDeck');
        
        if (popupTitle) popupTitle.textContent = title || 'Untitled';
        if (popupImage) popupImage.src = cover || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3C/svg%3E';
        
        if (type === 'audio') {
            if (popupBadge) { popupBadge.textContent = 'AUDIO'; popupBadge.style.background = '#FFC107'; popupBadge.style.color = '#1a1a1a'; }
            
            const artist = card.getAttribute('data-artist') || 'Unknown';
            const bpm = card.getAttribute('data-bpm') || '--';
            const key = card.getAttribute('data-key') || '--';
            const duration = card.getAttribute('data-duration') || '0:00';
            
            if (popupSub) popupSub.textContent = artist + ' • ' + bpm + ' BPM • ' + key;
            
            if (popupMeta) {
                popupMeta.innerHTML = `
                    <div class="popup-meta-item"><i class="fas fa-user"></i><div><span class="meta-label">Artist</span><span class="meta-value">${artist}</span></div></div>
                    <div class="popup-meta-item"><i class="fas fa-drum"></i><div><span class="meta-label">BPM</span><span class="meta-value">${bpm}</span></div></div>
                    <div class="popup-meta-item"><i class="fas fa-music"></i><div><span class="meta-label">Key</span><span class="meta-value">${key}</span></div></div>
                    <div class="popup-meta-item"><i class="fas fa-clock"></i><div><span class="meta-label">Duration</span><span class="meta-value">${duration}</span></div></div>
                `;
            }
            
            if (popupAudioDeck) popupAudioDeck.style.display = 'block';
            
            if (popupActions) {
                popupActions.innerHTML = `
                    <button class="popup-btn popup-btn-primary" onclick="downloadTrack('${title}')"><i class="fas fa-download"></i> DOWNLOAD</button>
                    <button class="popup-btn popup-btn-secondary" onclick="closeSeriesPopup()">CLOSE</button>
                `;
            }
        } else if (type === 'service') {
            if (popupBadge) { popupBadge.textContent = 'SERVICE'; popupBadge.style.background = '#2563EB'; popupBadge.style.color = '#fff'; }
            
            const desc = card.getAttribute('data-desc') || '';
            const discount = card.getAttribute('data-discount') || '';
            const slots = card.getAttribute('data-slots') || '';
            
            if (popupSub) popupSub.textContent = desc;
            
            if (popupMeta) {
                popupMeta.innerHTML = `
                    <div class="popup-meta-item"><i class="fas fa-tag"></i><div><span class="meta-label">Discount</span><span class="meta-value">${discount}</span></div></div>
                    <div class="popup-meta-item"><i class="fas fa-ticket-alt"></i><div><span class="meta-label">Slots</span><span class="meta-value">${slots}</span></div></div>
                `;
            }
            
            if (popupAudioDeck) popupAudioDeck.style.display = 'none';
            
            if (popupActions) {
                popupActions.innerHTML = `
                    <button class="popup-btn popup-btn-blue" onclick="location.href='portal.html'"><i class="fas fa-gift"></i> CLAIM OFFER</button>
                    <button class="popup-btn popup-btn-secondary" onclick="closeSeriesPopup()">CLOSE</button>
                `;
            }
        } else if (type === 'image') {
            if (popupBadge) { popupBadge.textContent = 'PAST FEATURE'; popupBadge.style.background = '#999'; popupBadge.style.color = '#fff'; }
            
            const desc = card.getAttribute('data-desc') || '';
            if (popupSub) popupSub.textContent = desc;
            
            if (popupMeta) {
                popupMeta.innerHTML = `
                    <div class="popup-meta-item"><i class="fas fa-calendar"></i><div><span class="meta-label">Month</span><span class="meta-value">${title}</span></div></div>
                    <div class="popup-meta-item"><i class="fas fa-briefcase"></i><div><span class="meta-label">Service</span><span class="meta-value">${desc}</span></div></div>
                `;
            }
            
            if (popupAudioDeck) popupAudioDeck.style.display = 'none';
            
            if (popupActions) {
                popupActions.innerHTML = `
                    <button class="popup-btn popup-btn-secondary" onclick="closeSeriesPopup()">CLOSE</button>
                `;
            }
        }
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.closeSeriesPopup = function() {
        const overlay = document.getElementById('seriesPopupOverlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // ─── CONTRACT POPUP ────────────────────────────────────────────
    window.openContractPopup = function(btn) {
        const card = btn.closest('.contract-card');
        if (!card) return;
        
        const beat = card.getAttribute('data-beat') || 'Beat';
        const type = card.getAttribute('data-type') || 'lease';
        const overlay = document.getElementById('contractPopupOverlay');
        
        if (!overlay) return;
        
        const title = document.getElementById('contractPopupTitle');
        const beatName = document.getElementById('contractPopupBeat');
        const rights = document.getElementById('contractPopupRights');
        
        overlay.classList.add('active');
        if (title) title.textContent = type === 'exclusive' ? 'Exclusive License Agreement' : 'Beat License Agreement';
        if (beatName) beatName.textContent = `Beat: ${beat}`;
        if (rights) {
            if (type === 'exclusive') {
                rights.textContent = 'The Licensor grants the Licensee an exclusive license to use the beat for unlimited commercial and non-commercial purposes.';
            } else {
                rights.textContent = 'The Licensor grants the Licensee a non-exclusive license to use the beat for commercial and non-commercial purposes subject to the terms below.';
            }
        }
        
        document.body.style.overflow = 'hidden';
    };
    
    window.closeContractPopup = function() {
        const overlay = document.getElementById('contractPopupOverlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // ─── LEASE POPUP ──────────────────────────────────────────────
    window.openLeasePopup = function(beat, type, price) {
        const overlay = document.getElementById('leasePopupOverlay');
        if (!overlay) return;
        
        const title = document.getElementById('leasePopupTitle');
        const beatName = document.getElementById('leasePopupBeat');
        const payBtn = document.getElementById('leasePayBtn');
        
        overlay.classList.add('active');
        if (title) title.textContent = type === 'exclusive' ? 'Exclusive License' : 'Lease Agreement';
        if (beatName) beatName.textContent = `Beat: ${beat}`;
        if (payBtn) payBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> PAY R${price}`;
        
        document.body.style.overflow = 'hidden';
    };
    
    window.closeLeasePopup = function() {
        const overlay = document.getElementById('leasePopupOverlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    window.switchLeaseType = function(type) {
        const btns = document.querySelectorAll('.lease-type-btn');
        const rightsList = document.getElementById('leaseRightsList');
        const payBtn = document.getElementById('leasePayBtn');
        
        btns.forEach(btn => btn.classList.remove('active'));
        
        if (type === 'lease') {
            if (btns[0]) btns[0].classList.add('active');
            if (rightsList) {
                rightsList.innerHTML = `
                    <li><i class="fas fa-check"></i> Up to 10,000 streams</li>
                    <li><i class="fas fa-check"></i> 1 music video</li>
                    <li><i class="fas fa-check"></i> Radio play permitted</li>
                    <li><i class="fas fa-check"></i> Non-exclusive use</li>
                    <li><i class="fas fa-check"></i> Centoro retains ownership</li>
                    <li><i class="fas fa-times"></i> Beat stays in store</li>
                `;
            }
            if (payBtn) {
                payBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> PAY R450`;
            }
        } else {
            if (btns[1]) btns[1].classList.add('active');
            if (rightsList) {
                rightsList.innerHTML = `
                    <li><i class="fas fa-check"></i> Unlimited streams</li>
                    <li><i class="fas fa-check"></i> Unlimited music videos</li>
                    <li><i class="fas fa-check"></i> Full ownership transfer</li>
                    <li><i class="fas fa-check"></i> Beat removed from store</li>
                    <li><i class="fas fa-check"></i> 100% rights to master recording</li>
                `;
            }
            if (payBtn) {
                payBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> PAY R2,500`;
            }
        }
    };
    
    window.selectPayment = function(method) {
        const btns = document.querySelectorAll('.lease-payment-btn');
        btns.forEach(btn => btn.classList.remove('selected'));
        
        const target = Array.from(btns).find(btn => {
            const text = btn.textContent.toLowerCase();
            return text.includes(method.toLowerCase());
        });
        if (target) target.classList.add('selected');
    };
    
    window.processPayment = function() {
        alert('Payment processing... This would connect to Yoco/PayFast.');
        closeLeasePopup();
    };
    
    // ─── PURCHASE DETAIL POPUP ──────────────────────────────────
    window.openPurchaseDetail = function(type) {
        const overlay = document.getElementById('purchaseDetailOverlay');
        if (!overlay) return;
        
        const title = document.getElementById('purchaseDetailTitle');
        const body = document.getElementById('purchaseDetailBody');
        
        overlay.classList.add('active');
        
        const data = {
            total: { title: 'Total Spent', content: 'Your total spending across all purchases is <strong>R2,950</strong>.' },
            spent: { title: 'Total Spent', content: 'You have spent <strong>R2,950</strong> on beats and services.' },
            beats: { title: 'Beats Owned', content: 'You own <strong>2</strong> beats:<br>• Summer Vibes (Lease, R450)<br>• Night Ride (Exclusive, R2,500)' }
        };
        
        if (title) title.textContent = data[type]?.title || 'Purchase Details';
        if (body) body.innerHTML = data[type]?.content || 'No details available.';
        
        document.body.style.overflow = 'hidden';
    };
    
    // ─── PROJECT POPUP ────────────────────────────────────────────
    window.openProjectPopup = function(btn) {
        const card = btn.closest('.project-card');
        if (!card) return;
        
        const overlay = document.getElementById('projectPopupOverlay');
        if (!overlay) return;
        
        const title = document.getElementById('projectPopupTitle');
        const desc = document.getElementById('projectPopupDesc');
        const badge = document.getElementById('projectPopupBadge');
        const image = document.getElementById('projectPopupImage');
        const meta = document.getElementById('projectPopupMeta');
        const files = document.getElementById('projectPopupFiles');
        
        overlay.classList.add('active');
        
        if (title) title.textContent = card.querySelector('h3')?.textContent || 'Project';
        if (desc) desc.textContent = card.querySelector('p')?.textContent || '';
        if (badge) badge.textContent = card.querySelector('.project-type')?.textContent || 'PROJECT';
        if (image) image.src = card.getAttribute('data-cover') || '';
        
        if (meta) {
            const status = card.querySelector('.project-status')?.textContent || 'In Progress';
            meta.innerHTML = `
                <div class="project-popup-meta-item">
                    <span class="meta-label">Status</span>
                    <span class="meta-value">${status}</span>
                </div>
                <div class="project-popup-meta-item">
                    <span class="meta-label">Type</span>
                    <span class="meta-value">${card.querySelector('.project-type')?.textContent || 'Project'}</span>
                </div>
            `;
        }
        
        if (files) {
            const fileItems = card.querySelectorAll('.file-item');
            let filesHtml = '<h4>Files</h4>';
            fileItems.forEach(item => {
                filesHtml += item.outerHTML;
            });
            files.innerHTML = filesHtml;
        }
        
        document.body.style.overflow = 'hidden';
    };
    
    window.closeProjectPopup = function() {
        const overlay = document.getElementById('projectPopupOverlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // ─── PORTAL POPUP ────────────────────────────────────────────
    window.openPortalPopup = function(btn) {
        const card = btn.closest('.portal-box');
        if (!card) return;
        
        const overlay = document.getElementById('portalPopupOverlay');
        if (!overlay) return;
        
        const title = document.getElementById('portalPopupTitle');
        const desc = document.getElementById('portalPopupDesc');
        const badge = document.getElementById('portalPopupBadge');
        const icon = document.getElementById('portalPopupIcon');
        const features = document.getElementById('portalPopupFeatures');
        const actions = document.getElementById('portalPopupActions');
        const link = card.getAttribute('data-link') || '#';
        
        overlay.classList.add('active');
        
        if (title) title.textContent = card.querySelector('h3')?.textContent || 'Portal';
        if (desc) desc.textContent = card.querySelector('p')?.textContent || '';
        if (badge) badge.textContent = 'PORTAL';
        if (icon) {
            const iconClass = card.querySelector('.portal-box-icon i')?.className || 'fa fa-briefcase';
            icon.innerHTML = `<i class="${iconClass}"></i>`;
        }
        
        if (features) {
            features.innerHTML = `
                <ul>
                    <li><i class="fas fa-check"></i> Secure access to your content</li>
                    <li><i class="fas fa-check"></i> 24/7 availability</li>
                    <li><i class="fas fa-check"></i> Private and confidential</li>
                </ul>
            `;
        }
        
        if (actions) {
            actions.innerHTML = `
                <a href="${link}" class="primary"><i class="fas fa-arrow-right"></i> GO TO ${title?.textContent?.toUpperCase() || 'PORTAL'}</a>
                <button class="secondary" onclick="closePortalPopup()">CLOSE</button>
            `;
        }
        
        document.body.style.overflow = 'hidden';
    };
    
    window.closePortalPopup = function() {
        const overlay = document.getElementById('portalPopupOverlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // ─── PACK POPUP ────────────────────────────────────────────────
    window.openPackPopup = function(btn) {
        const card = btn.closest('.beat-card');
        if (!card) return;
        
        const overlay = document.getElementById('packPopupOverlay');
        if (!overlay) return;
        
        const title = document.getElementById('packPopupTitle');
        const image = document.getElementById('packPopupImage');
        const badge = document.getElementById('packPopupBadge');
        const sub = document.getElementById('packPopupSub');
        const meta = document.getElementById('packPopupMeta');
        const samples = document.getElementById('packSamplesList');
        const actions = document.getElementById('packPopupActions');
        
        overlay.classList.add('active');
        
        const packTitle = card.getAttribute('data-title') || 'Pack';
        const packSamples = card.getAttribute('data-pack-samples') || '';
        const genre = card.getAttribute('data-genre') || '';
        const bpm = card.getAttribute('data-bpm') || '';
        const key = card.getAttribute('data-key') || '';
        const duration = card.getAttribute('data-duration') || '';
        const cover = card.getAttribute('data-cover') || '';
        
        if (title) title.textContent = packTitle;
        if (image) image.src = cover || '';
        if (badge) badge.textContent = 'BEAT PACK';
        if (sub) sub.textContent = genre + ' • ' + bpm + ' BPM • ' + key + ' • ' + duration;
        
        if (meta) {
            meta.innerHTML = `
                <div class="pack-popup-meta-item"><i class="fas fa-tag"></i><span>${genre}</span></div>
                <div class="pack-popup-meta-item"><i class="fas fa-drum"></i><span>${bpm} BPM</span></div>
                <div class="pack-popup-meta-item"><i class="fas fa-music"></i><span>${key}</span></div>
                <div class="pack-popup-meta-item"><i class="fas fa-clock"></i><span>${duration}</span></div>
            `;
        }
        
        if (samples) {
            const sampleList = packSamples.split(',').filter(s => s.trim());
            let html = '';
            sampleList.forEach(sample => {
                html += `
                    <div class="pack-sample-item">
                        <button class="pack-sample-play"><i class="fas fa-play"></i></button>
                        <div class="pack-sample-info">
                            <h4>${sample.trim()}</h4>
                            <p>${genre} • ${bpm} BPM</p>
                        </div>
                        <button class="pack-sample-buy" onclick="openLeasePopup('${sample.trim()}', 'lease', 450)">BUY</button>
                    </div>
                `;
            });
            samples.innerHTML = html;
        }
        
        if (actions) {
            actions.innerHTML = `
                <button class="primary" onclick="openLeasePopup('${packTitle}', 'lease', 450)"><i class="fas fa-shopping-cart"></i> LEASE R450</button>
                <button class="primary" onclick="openLeasePopup('${packTitle}', 'exclusive', 2500)" style="background:#8B5CF6;"><i class="fas fa-crown"></i> EXCLUSIVE R2,500</button>
                <button class="secondary" onclick="closePackPopup()">CLOSE</button>
            `;
        }
        
        document.body.style.overflow = 'hidden';
    };
    
    window.closePackPopup = function() {
        const overlay = document.getElementById('packPopupOverlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // ─── UTILITY FUNCTIONS ──────────────────────────────────────
    window.downloadTrack = function(title) {
        alert('Downloading: ' + title);
    };
    
    window.togglePopupPlay = function() {
        const btn = document.getElementById('popupDeckPlay');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-play')) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    btn.classList.add('playing');
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    btn.classList.remove('playing');
                }
            }
        }
    };
    
    window.seekPopupAudio = function(event) {
        const bar = event.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        const fill = document.getElementById('popupDeckProgressFill');
        if (fill) fill.style.width = (percent * 100) + '%';
    };
    
    // ─── CLICKABLE SERIES BOXES ────────────────────────────────
    document.querySelectorAll('.clickable-series-box').forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            
            const type = this.getAttribute('data-type');
            
            if (type === 'audio' || type === 'service' || type === 'image') {
                openSeriesPopup(this);
            } else if (type === 'project') {
                const viewBtn = this.querySelector('.project-btn:first-child');
                if (viewBtn) {
                    openProjectPopup(viewBtn);
                }
            } else if (type === 'pack') {
                openPackPopup(this);
            } else if (type === 'portal') {
                openPortalPopup(this);
            }
        });
    });
    
    // ─── DASHBOARD DROP PLAY BUTTONS ──────────────────────────────
    document.querySelectorAll('.dashboard-drop-play, .drop-play, .beat-preview').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-play')) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            }
        });
    });
    
    // ─── DASHBOARD MINI PLAYER ──────────────────────────────────
    const miniPlayBtn = document.getElementById('mini-play-btn');
    if (miniPlayBtn) {
        miniPlayBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-play')) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            }
        });
    }
    
    // ─── STORE PLAYER ────────────────────────────────────────────
    const storePlayBtn = document.getElementById('store-play-btn');
    if (storePlayBtn) {
        storePlayBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-play')) {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                } else {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            }
        });
    }
    
    // ─── VOLUME CONTROLS ──────────────────────────────────────────
    document.querySelectorAll('.volume-slider, .store-volume-slider').forEach(slider => {
        slider.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const fill = this.querySelector('.volume-fill, .store-volume-fill');
            if (fill) fill.style.width = (percent * 100) + '%';
        });
    });
    
    // ─── PROGRESS BAR CLICK ──────────────────────────────────────
    document.querySelectorAll('.progress-bar, .store-progress-bar, .mini-progress-bar').forEach(bar => {
        bar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const fill = this.querySelector('.progress-fill, .store-progress-fill, .mini-progress-fill');
            if (fill) fill.style.width = (percent * 100) + '%';
        });
    });
    
    // ─── GLOBAL CLOSE ON CLICK OUTSIDE ─────────────────────────
    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileNav.style.display = '';
                document.body.style.overflow = '';
                console.log('Menu closed by clicking outside');
            }
        }

        const overlays = [
            document.getElementById('seriesPopupOverlay'),
            document.getElementById('contractPopupOverlay'),
            document.getElementById('leasePopupOverlay'),
            document.getElementById('purchaseDetailOverlay'),
            document.getElementById('projectPopupOverlay'),
            document.getElementById('portalPopupOverlay'),
            document.getElementById('packPopupOverlay'),
            document.getElementById('lightbox')
        ];

        overlays.forEach(overlay => {
            if (overlay && overlay.classList.contains('active') && e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ─── CLOSE ON ESCAPE KEY ────────────────────────────────────
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNav.style.display = '';
                document.body.style.overflow = '';
            }
            window.closeLightbox();
            window.closeSeriesPopup();
            window.closeContractPopup();
            window.closeLeasePopup();
            window.closeProjectPopup();
            window.closePackPopup();
            window.closePortalPopup();
        }
    });

    console.log('✅ Centoro Enterprise - All Scripts Loaded!');
});

// ─── CLOSE FUNCTIONS (Global scope for inline onclick) ──────────
window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.closeContractPopup = function() {
    const overlay = document.getElementById('contractPopupOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.closeLeasePopup = function() {
    const overlay = document.getElementById('leasePopupOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.closeProjectPopup = function() {
    const overlay = document.getElementById('projectPopupOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.closePackPopup = function() {
    const overlay = document.getElementById('packPopupOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.closePortalPopup = function() {
    const overlay = document.getElementById('portalPopupOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.closeSeriesPopup = function() {
    const overlay = document.getElementById('seriesPopupOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.downloadContractPDF = function() {
    alert('PDF download starting...');
};

// =====================================================
// PORTAL SIDEBAR FUNCTIONS
// =====================================================

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('portalLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

// Show Dashboard (Logged In View)
function showDashboard() {
    const authContainer = document.getElementById('authContainer');
    const portalDashboard = document.getElementById('portalDashboard');
    if (authContainer) authContainer.style.display = 'none';
    if (portalDashboard) portalDashboard.style.display = 'block';
    updateProfileInfo();
}

// Show Login (Logged Out View)
function showLogin() {
    const authContainer = document.getElementById('authContainer');
    const portalDashboard = document.getElementById('portalDashboard');
    if (authContainer) authContainer.style.display = 'block';
    if (portalDashboard) portalDashboard.style.display = 'none';
}

// Login Function
function loginUser() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    
    if (email && password && email.value && password.value) {
        localStorage.setItem('portalLoggedIn', 'true');
        localStorage.setItem('portalUser', JSON.stringify({ 
            email: email.value, 
            name: 'John Doe',
            initials: 'JD'
        }));
        alert('Login successful! Welcome back!');
        showDashboard();
        const defaultLink = document.querySelector('.sidebar-link.active');
        if (defaultLink) {
            navigateTo('dashboard');
        }
    } else {
        alert('Please enter your email and password.');
    }
}

// Register Function
function registerUser() {
    const name = document.getElementById('reg-name');
    const email = document.getElementById('reg-email');
    const password = document.getElementById('reg-password');
    const confirm = document.getElementById('reg-confirm');
    
    if (!name || !email || !password || !confirm || !name.value || !email.value || !password.value || !confirm.value) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password.value !== confirm.value) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.value.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
    }
    
    const initials = name.value.split(' ').map(n => n[0]).join('').toUpperCase();
    
    localStorage.setItem('portalLoggedIn', 'true');
    localStorage.setItem('portalUser', JSON.stringify({ 
        name: name.value, 
        email: email.value,
        initials: initials
    }));
    alert('Account created successfully! Welcome ' + name.value + '!');
    showDashboard();
    const defaultLink = document.querySelector('.sidebar-link.active');
    if (defaultLink) {
        navigateTo('dashboard');
    }
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('portalLoggedIn');
        localStorage.removeItem('portalUser');
        showLogin();
        alert('You have been signed out.');
    }
}

// Update Profile Info in Sidebar
function updateProfileInfo() {
    const userData = localStorage.getItem('portalUser');
    if (userData) {
        const user = JSON.parse(userData);
        
        const initialsEl = document.getElementById('profileInitials');
        const nameEl = document.getElementById('profileName');
        const emailEl = document.getElementById('profileEmail');
        const welcomeName = document.getElementById('welcomeName');
        
        if (initialsEl) {
            initialsEl.textContent = user.initials || 'JD';
        }
        if (nameEl) {
            nameEl.textContent = user.name || 'John Doe';
        }
        if (emailEl) {
            emailEl.textContent = user.email || 'john.doe@email.com';
        }
        if (welcomeName) {
            welcomeName.textContent = user.name || 'John Doe';
        }
    }
}

// Toggle sidebar on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('portalSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Navigate to pages
function navigateTo(page) {
    const pages = {
        'dashboard': 'dashboard.html',
        'projects': 'client-portal.html',
        'friday': 'library.html',
        'monthly': 'monthly-library.html',
        'beatstore': 'beatstore.html',
        'samplestore': 'samplestore.html',
        'purchases': 'purchases.html',
        'contracts': 'contracts.html',
        'settings': 'settings.html'
    };
    
    if (pages[page]) {
        window.location.href = pages[page];
    }
}

// Load page content (for sidebar navigation)
function loadPage(page, element) {
    // Remove active class from all links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (element) {
        element.classList.add('active');
    }
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('portalSidebar');
        if (sidebar) sidebar.classList.remove('active');
    }
    
    // Navigate to the actual page
    navigateTo(page);
}

// =====================================================
// BUTTON FUNCTIONS FOR MONTHLY LIBRARY
// =====================================================

function bookNow() {
    window.location.href = 'contact.html';
}

function viewVoucher() {
    alert('Voucher code: MM-MAR-2026-7X9K');
}

// =====================================================
// BUTTON FUNCTIONS FOR BEAT STORE
// =====================================================

function leaseBeat(beatName) {
    alert('Leasing: ' + beatName + ' for R450');
    window.location.href = 'beatstore.html';
}

function exclusiveBeat(beatName) {
    alert('Exclusive purchase: ' + beatName + ' for R2,500');
    window.location.href = 'beatstore.html';
}

function buySample(sampleName, price) {
    alert('Purchasing: ' + sampleName + ' for R' + price);
    window.location.href = 'samplestore.html';
}

// =====================================================
// BUTTON FUNCTIONS FOR PROJECTS
// =====================================================

function viewProject(projectName) {
    alert('Viewing project: ' + projectName);
    window.location.href = 'client-portal.html';
}

// =====================================================
// BUTTON FUNCTIONS FOR PURCHASES
// =====================================================

function downloadPurchase(beatName) {
    alert('Downloading: ' + beatName);
}

// =====================================================
// BUTTON FUNCTIONS FOR CONTRACTS
// =====================================================

function viewContract(beatName) {
    alert('Viewing contract for: ' + beatName);
    window.location.href = 'contracts.html';
}

function downloadContract(beatName) {
    alert('Downloading PDF contract for: ' + beatName);
}

// =====================================================
// BUTTON FUNCTIONS FOR SETTINGS
// =====================================================

function saveProfile() {
    alert('Profile updated successfully!');
}

function savePayment() {
    alert('Payment details updated successfully!');
}

function downloadData() {
    if (confirm('Are you sure you want to download all your data?')) {
        alert('Downloading your data...');
    }
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
        alert('Account deletion request submitted.');
    }
}

// ─── PORTAL SEARCH FUNCTION ──────────────────────────────────
function searchPortalContent(query) {
    const cards = document.querySelectorAll('.beat-card, .drop-card, .monthly-offer-card, .library-item, .contract-card');
    const searchTerm = query.toLowerCase().trim();
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (searchTerm === '' || text.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Also search in tables
    const tableRows = document.querySelectorAll('.purchases-table tbody tr');
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (searchTerm === '' || text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
