document.addEventListener('DOMContentLoaded', () => {
    const promoItems = document.querySelectorAll('.carousel-item');
    if (promoItems.length > 0) {
        let currentPromoIndex = 0;
        setInterval(() => {
            promoItems[currentPromoIndex].classList.remove('active');
            currentPromoIndex = (currentPromoIndex + 1) % promoItems.length;
            promoItems[currentPromoIndex].classList.add('active');
        }, 6000); 
    }

    const categories = document.querySelectorAll('.category');
    const megaMenus = document.querySelectorAll('.mega-menu-wrapper');
    const navWrapper = document.querySelector('.main-nav-wrapper');
    let timeoutId;
    
    function closeAllMenus() {
        megaMenus.forEach(menu => menu.classList.remove('active'));
        categories.forEach(c => c.classList.remove('active-category'));
    }
    
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            const targetId = category.getAttribute('data-target');
            if (!targetId) {
                closeAllMenus();
                return;
            }
            
            closeAllMenus();
            
            const targetMenu = document.getElementById(targetId);
            if (targetMenu) {
                targetMenu.classList.add('active');
                category.classList.add('active-category');
            }
        });
    });
    
    navWrapper.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
            closeAllMenus();
        }, 150);
    });
    
    megaMenus.forEach(menu => {
        menu.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
        });
    });
    
    const btnAcepto = document.getElementById('btnAcepto');
    if (btnAcepto) {
        btnAcepto.addEventListener('click', () => {
            document.getElementById('cookieWrapper').style.display = 'none';
        });
    }

    const heroTrack = document.getElementById('heroTrack');
    const heroPrevBtn = document.getElementById('heroPrevBtn');
    const heroNextBtn = document.getElementById('heroNextBtn');
    let currentHeroSlide = 0;
    const totalHeroSlides = 5;
    let heroDirection = 1;
    let heroInterval;

    function updateHeroCarousel() {
        if (!heroTrack) return;
        heroTrack.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        
        if (heroPrevBtn) {
            if (currentHeroSlide === 0) {
                heroPrevBtn.classList.add('arrow-hidden');
            } else {
                heroPrevBtn.classList.remove('arrow-hidden');
            }
        }
        
        if (heroNextBtn) {
            if (currentHeroSlide === totalHeroSlides - 1) {
                heroNextBtn.classList.add('arrow-hidden');
            } else {
                heroNextBtn.classList.remove('arrow-hidden');
            }
        }
    }

    function nextHeroSlideAuto() {
        if (heroDirection === 1) {
            if (currentHeroSlide < totalHeroSlides - 1) {
                currentHeroSlide++;
            } else {
                heroDirection = -1;
                currentHeroSlide--;
            }
        } else {
            if (currentHeroSlide > 0) {
                currentHeroSlide--;
            } else {
                heroDirection = 1;
                currentHeroSlide++;
            }
        }
        updateHeroCarousel();
    }

    function startHeroInterval() {
        clearInterval(heroInterval);
        heroInterval = setInterval(nextHeroSlideAuto, 7000);
    }

    if (heroPrevBtn && heroNextBtn && heroTrack) {
        heroPrevBtn.addEventListener('click', () => {
            if (currentHeroSlide > 0) {
                currentHeroSlide--;
                heroDirection = -1;
                updateHeroCarousel();
                startHeroInterval();
            }
        });

        heroNextBtn.addEventListener('click', () => {
            if (currentHeroSlide < totalHeroSlides - 1) {
                currentHeroSlide++;
                heroDirection = 1;
                updateHeroCarousel();
                startHeroInterval();
            }
        });

        startHeroInterval();
    }
});