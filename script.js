document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    const megaMenus = document.querySelectorAll('.mega-menu-wrapper');
    const navWrapper = document.querySelector('.main-nav-wrapper');
    let timeoutId;
    
    function closeAllMenus() {
        megaMenus.forEach(menu => menu.classList.remove('active'));
        // Remueve la clase que mantiene la línea encendida de todas las categorías
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
            
            // Cierra otros menús antes de abrir el nuevo
            closeAllMenus();
            
            const targetMenu = document.getElementById(targetId);
            if (targetMenu) {
                targetMenu.classList.add('active');
                // Añade la clase a la palabra actual para que la línea se quede fija
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
});