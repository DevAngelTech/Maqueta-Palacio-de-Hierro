document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    const megaMenus = document.querySelectorAll('.mega-menu');
    const navContainer = document.querySelector('.nav-container');
    let timeoutId;
    function closeAllMenus() {
        megaMenus.forEach(menu => menu.classList.remove('active'));
    }
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            const targetId = category.getAttribute('data-target');
            if (!targetId) {
                closeAllMenus();
                return;
            }
            megaMenus.forEach(menu => {
                if (menu.id !== targetId) {
                    menu.classList.remove('active');
                }
            });
            const targetMenu = document.getElementById(targetId);
            if (targetMenu) {
                setTimeout(() => {
                    targetMenu.classList.add('active');
                }, 100);
            }
        });
    });
    navContainer.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
            closeAllMenus();
        }, 300);
    });
    megaMenus.forEach(menu => {
        menu.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
        });
    });
    const btnAcepto = document.getElementById('btnAcepto');
    if (btnAcepto) {
        btnAcepto.addEventListener('click', () => {
            document.getElementById('cookieBar').style.display = 'none';
        });
    }
});