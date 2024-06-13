document.addEventListener('DOMContentLoaded', function() {
    // Esconder el menú responsive cuando se hace click
    const navLinks = document.querySelectorAll('.header__nav-item a');
    const checkbox = document.querySelector('.header__checkbox');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            checkbox.checked = false;
        });
    });

    const closeNavButton = document.querySelector('.close-nav-button');
    // Cerrar el menú de navegación al hacer click en el botón de cerrar
    closeNavButton.addEventListener('click', () => {
        checkbox.checked = false;
    });

    // Mostrar el modal de servicios
    const serviceContainers = document.querySelectorAll('.services__service-container .services__service');
    const modalContainers = document.querySelectorAll('.services__modal-image-container');
    
    serviceContainers.forEach((service, index) => {
        service.addEventListener('click', (event) => {
            event.stopPropagation();
            const modal = modalContainers[index];
            modal.classList.add('show');
            setTimeout(() => {
                modal.classList.add('visible');
            }, 10); 
        });
    });
    
    document.addEventListener('click', (event) => {
        const clickedElement = event.target;
        if (!clickedElement.closest('.services__modal-image-container') && !clickedElement.closest('.services__service')) {
            modalContainers.forEach((modal) => {
                modal.classList.remove('visible');
                modal.addEventListener('transitionend', () => {
                    if (!modal.classList.contains('visible')) {
                        modal.classList.remove('show');
                    }
                }, { once: true });
            });
        }
    });

    modalContainers.forEach((modal) => {
        modal.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    
        const closeButton = modal.querySelector('.close-modal-button');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('visible');
            modal.addEventListener('transitionend', () => {
                if (!modal.classList.contains('visible')) {
                    modal.classList.remove('show');
                }
            }, { once: true });
        });
    });

    // Animación del portrait
    let logos = document.querySelectorAll('.portrait-wrapper__logo-wrapper > img');
    let animationProperties = [
        {opacity: 0.5, scale: 0.3, translate: {x: 0, y: 0}},
        {opacity: 0.5, scale: 3, translate: {x: -150, y: -80}},
        {opacity: 0.5, scale: 5, translate: {x: -80, y: -80}},
        {opacity: 0.3, scale: 7, translate: {x: -40, y: -60}},
        {opacity: 0.5, scale: 7, translate: {x: -50, y: -10}},
        {opacity: 0.5, scale: 3, translate: {x: 50, y: -60}}
    ];

    logos.forEach((logo, index) => {
        let properties = animationProperties[index];
        logo.style.willChange = 'transform, opacity'; 
        logo.style.opacity = properties.opacity;
        logo.style.transform = `scale(${properties.scale}) translate3d(${properties.translate.x}px, ${properties.translate.y}px, 0)`;

        let animation = logo.animate([
            { transform: `scale(${properties.scale}) translate3d(${properties.translate.x}px, ${properties.translate.y}px, 0)`, opacity: properties.opacity },
            { transform: 'scale(1) translate3d(0, 0, 0)', opacity: 1 }
        ], { 
            duration: 1000000,
            iterations: 1
        });
        animation.pause();
    });

    window.addEventListener('scroll', () => {
        let scrollHeight = document.documentElement.scrollHeight;
        let viewportHeight = window.innerHeight;
        let scrollTop = document.documentElement.scrollTop;

        let scrollPercentage = scrollTop /  viewportHeight; 

        logos.forEach((logo) => {
            logo.getAnimations().forEach((animation) => {
                if (scrollPercentage >= 1 || scrollPercentage <= 0.01) {
                    animation.pause();
                } else {
                    animation.currentTime = animation.effect.getTiming().duration * scrollPercentage;
                    if (animation.playState !== 'running') {
                        animation.play();
                    }
                }
            });
        });
    });
    
    // Envío de formulario de contacto con AJAX
    var form = document.getElementById("contact-form");
    async function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById("contact-form-status");
        var data = new FormData(event.target);
        try {
            let response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                status.innerHTML = "Recibimos tu mensaje... Gracias!";
                document.getElementById('thankYouModal').style.display = 'flex';
                form.reset();
            } else {
                let data = await response.json();
                if (data.errors) {
                    status.innerHTML = data.errors.map(error => error.message).join(", ");
                } else {
                    status.innerHTML = "Uyyy! Hubo un problema con el formulario, inténtalo de nuevo más tarde.";
                }
            }
        } catch (error) {
            status.innerHTML = "Uyyy! Hubo un problema con el formulario, inténtalo de nuevo más tarde.";
        }
    }

    form.addEventListener("submit", handleSubmit);

    document.getElementById('closeContactModalButton').addEventListener('click', function() {
        document.getElementById('thankYouModal').style.display = 'none'; 
    });
});
