document.addEventListener('DOMContentLoaded', function() {
    const toastWrapper = document.getElementById('toastMeteoWrapper');
    const toggleButton = document.getElementById('toggle-toast');
    const meteoToastBody = document.querySelector('#meteoToast .toast-body');

    // Variables pour déplacement
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // Charger position sauvegardée
    const savedPosition = JSON.parse(localStorage.getItem('toastPosition'));
    if (savedPosition) {
        toastWrapper.style.left = savedPosition.left;
        toastWrapper.style.top = savedPosition.top;
    } else {
        // Position par défaut si pas de sauvegarde
        toastWrapper.style.left = "70%";
        toastWrapper.style.top = "20%";
    }

    toastWrapper.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseInt(window.getComputedStyle(toastWrapper).left, 10);
        initialTop = parseInt(window.getComputedStyle(toastWrapper).top, 10);
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newLeft = initialLeft + dx;
            const newTop = initialTop + dy;
            toastWrapper.style.left = `${newLeft}px`;
            toastWrapper.style.top = `${newTop}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;

            // Sauvegarder la nouvelle position
            const position = {
                left: toastWrapper.style.left,
                top: toastWrapper.style.top
            };
            localStorage.setItem('toastPosition', JSON.stringify(position));
        }
    });

    // Réduire / Agrandir
    let isCollapsed = false;
    toggleButton.addEventListener('click', () => {
        if (!isCollapsed) {
            meteoToastBody.style.display = 'none';
            toggleButton.textContent = '+';
        } else {
            meteoToastBody.style.display = 'block';
            toggleButton.textContent = '-';
        }
        isCollapsed = !isCollapsed;
    });
});
