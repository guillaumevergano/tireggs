(function() {
    window.tireggs = function(options) {
        var defaults = {
            image: {
                url: '',
                width: '50px',
                height: '50px'
            },
            trigger: {
                selector: '',
                event: 'click'
            },
            position: {
                div: '',
                at: 'center center'
            },
            animation: {
                type: 'move',
                direction: 'rightleft'
            }
        };

        var settings = Object.assign({}, defaults, options);

        var elements = document.querySelectorAll(settings.trigger.selector);
        elements.forEach(function(element) {
            element.addEventListener(settings.trigger.event, function() {
                var img = new Image();
                img.src = settings.image.url;
                img.style.width = settings.image.width;
                img.style.height = settings.image.height;
                img.style.position = 'absolute';
                img.style.left = '100%'; // Déplace l'image hors de l'écran à droite

                var parent = document.querySelector(settings.position.div);
                parent.appendChild(img);

                // Animation de l'image
                setTimeout(function() {
                    if (settings.animation.type === 'move' && settings.animation.direction === 'rightleft') {
                        img.style.transition = `left 6s linear`; // Déplacement vers la gauche pendant 6 secondes
                        img.style.left = '-50%'; // Fait sortir complètement l'image à gauche
                    }
                }, 1000); // Attendre 1 seconde avant de démarrer le déplacement
            });
        });
    };
})();
