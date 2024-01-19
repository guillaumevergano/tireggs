var tireggs = (function() {
    return function(options) {
        var defaults = {
            image: {
                url: "https://i.pinimg.com/originals/e5/ed/fe/e5edfe1c50f45d9858e99de0d890606a.gif",
                width: "50px",
                height: "50px",
                background: 'cover'
            },
            trigger: {
                selector: "",
                event: "click",
            },
            position: {
                fullscreen: false,
                at: "center center",
            },
            animation: {
                type: "move",
                direction: "rightleft",
            },
            apparition: {
                type: "fade",
                duration: 1000,
            },
            disparition: {
                concept: 'auto',
                type: 'fade',
                durationtoauto: 5000
            }
        };

        var settings = Object.assign({}, defaults, options);

        var elements = document.querySelectorAll(settings.trigger.selector);
        elements.forEach(function(element) {
            if (settings.trigger.event === 'click') {
                element.addEventListener('click', function() {
                    triggerAnimation(settings);
                });
            } else if (settings.trigger.event === 'hover') {
                element.addEventListener('mouseenter', function() {
                    triggerAnimation(settings);
                });
            } else if (settings.trigger.event === 'instant') {
                triggerAnimation(settings);
            }
        });

        function triggerAnimation(settings) {
            var img = new Image();
            img.src = settings.image.url;
            img.style.width = settings.image.width;
            img.style.height = settings.image.height;
            img.style.background = settings.image.background; // code pour 'background'
            img.style.position = 'fixed';
            img.style.zIndex = "9999999999999";

            var parent = document.querySelector('body');
            parent.style.display = 'flex'; ///  nouvelle ajout display : flex

            if (settings.position.fullscreen) { /// code pour 'fullscreen' 
                img.style.width = '100vw';
                img.style.height = '100vh';
                parent.style.overflow = 'hidden';
            } else {
                parent.style.overflow = 'auto';
            }

            parent.appendChild(img);

            switch (settings.position.at) {
                case 'center center':
                    img.style.top = `calc(50% - ${settings.image.height} / 2)`;
                    img.style.left = `calc(50% - ${settings.image.width} / 2)`;
                    break;
                case 'center right':
                    img.style.top = `calc(50% - ${settings.image.height} / 2)`;
                    img.style.right = '0';
                    break;
                case 'center left':
                    img.style.top = `calc(50% - ${settings.image.height} / 2)`;
                    img.style.left = '0';
                    break;
                case 'right center':
                    img.style.top = `calc(50% - ${settings.image.height} / 2)`;
                    img.style.right = '0';
                    img.style.transform = 'translateY(-50%)';
                    break;
                case 'left center':
                    img.style.top = `calc(50% - ${settings.image.height} / 2)`;
                    img.style.left = '0';
                    img.style.transform = 'translateY(-50%)';
                    break;

                default:
                    break;
            }

            var startValue = '100%';
            var endValue = '-100%';
            var property = 'left';

            switch (settings.animation.direction) {
                case 'rightleft':
                    startValue = '100%';
                    endValue = '-100%';
                    property = 'left';
                    break;
                case 'leftright':
                    startValue = '-100%';
                    endValue = '100%';
                    property = 'left';
                    break;
                case 'bottomtop':
                    startValue = '100%';
                    endValue = '-100%';
                    property = 'top';
                    break;
                case 'topbottom':
                    startValue = '-100%';
                    endValue = '100%';
                    property = 'top';
                    break;
                case 'none':
                    startValue = '0';
                    endValue = '0'; // Si direction est "none", aucun mouvement n'est appliqué
                    property = 'center'; // Peut être n'importe quelle propriété, car le mouvement est nul
                    break;

                default:
                    break;
            }

            img.style[property] = startValue;

            if (settings.animation.type === 'fixed') {
                setTimeout(function() {
                    img.style.transition = `left ${settings.apparition.duration / 1000}s linear, opacity ${settings.apparition.duration / 1000}s linear`;
                    img.style[property] = '0';
                    img.style.opacity = '0';

                    setTimeout(function() {
                        img.remove();
                    }, settings.apparition.duration);
                }, 3000);
            } else {
                setTimeout(function() {
                    img.style.transition = `${property} ${settings.apparition.duration / 1000}s linear`;
                    img.style[property] = '0';

                    setTimeout(function() {
                        img.style.transition = `${property} ${settings.apparition.duration / 1000}s linear`;
                        img.style[property] = endValue;

                        setTimeout(function() {
                            img.remove();
                        }, settings.apparition.duration * 2);
                    }, 0);
                }, 0);
            }

            if (settings.disparition.concept === 'auto') {
                // Si le concept de disparition est 'auto'
                setTimeout(function() {
                    if (settings.disparition.type === 'fade') {
                        // Si le type d'animation est 'fade'
                        img.style.transition = `opacity ${settings.disparition.durationtoauto / 1000}s linear`;
                        img.style.opacity = '0';

                        setTimeout(function() {
                            img.remove();
                        }, settings.disparition.durationtoauto);
                    } else if (settings.disparition.type === 'none') {
                        // Si le type d'animation est 'none', simplement retirer l'image
                        img.remove();
                    }
                }, 3000);// Attendre 3000 ms (3 secondes) avant de déclencher la disparition automatique
            } else if (settings.disparition.concept === 'close'){
                // après : Ajoute la logique pour afficher une croix (x) et permettre la fermeture
                var closeButton = document.createElement('div');
                closeButton.innerHTML = '<a id="closeButton" style="display: none;"><img src="images/croix.png" style="width: 20px; height: 20px; cursor: pointer;"></a>'; // Code HTML pour la croix (x)
                closeButton.style.position = 'absolute';
                closeButton.style.top = '0';
                closeButton.style.right = '0';
                closeButton.style.cursor = 'pointer';

                closeButton.addEventListener('click', function() {
                    img.remove();
                });

                img.appendChild(closeButton);
            }
            
        }
    };
})();
