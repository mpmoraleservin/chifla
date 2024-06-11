document.addEventListener('DOMContentLoaded', function() {
    /* Hide the responsive menu when a link is clicked */
    const navLinks = document.querySelectorAll('.header__nav-item a');
    const checkbox = document.querySelector('.header__checkbox');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            checkbox.checked = false;
        });
    });

    const logo = document.querySelector('.header__logo');
    const closeNavButton = document.querySelector('.close-nav-button');

    // Cerrar el menú de navegación al hacer clic en el botón de cerrar
    closeNavButton.addEventListener('click', () => {
        checkbox.checked = false;
    });

    // Mostrar u ocultar el logo al hacer clic en el botón del menú
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            logo.style.display = 'block';
        } else {
            logo.style.display = 'none';
        }
    });


    /* Services modal display */
    const serviceContainers = document.querySelectorAll('.services__service-container .services__service');
    const modalContainers = document.querySelectorAll('.services__modal-image-container');
    
    serviceContainers.forEach((service, index) => {
        service.addEventListener('click', (event) => {
            event.stopPropagation();
            const modal = modalContainers[index];
            modal.classList.add('show');
            setTimeout(() => {
                modal.classList.add('visible');
            }, 10); // Short delay to allow the display property to take effect
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
    
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);

    const formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()));

    // fetch('URL_DEL_SERVIDOR', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: formDataJSON
    // })

    // .then(response => response.json())
    // .then(data => {
        document.getElementById('thankYouModal').style.display = 'flex';
        form.reset(); 
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
});

document.getElementById('closeModalButton').addEventListener('click', function() {
    document.getElementById('thankYouModal').style.display = 'none'; 
});