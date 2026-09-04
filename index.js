document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuClose = document.querySelector('.mobile-menu-close');

    if (menuToggle && mobileNav) {
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
    }
});
