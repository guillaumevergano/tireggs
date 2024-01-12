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
            },
            apparition: {
                type: 'fade',
                duration: 1000
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
            }
        });

        function triggerAnimation(settings) {
            var parent = document.querySelector(settings.position.div);
            parent.style.position = 'relative';
            parent.style.overflow = 'hidden'; // Assure que le parent ne dépasse pas sa taille

            var img = new Image();
            img.src = settings.image.url;
            img.style.width = settings.image.width;
            img.style.height = settings.image.height;
            img.style.position = 'fixed';

            parent.appendChild(img);

            var parentRect = parent.getBoundingClientRect();
            var imgRect = img.getBoundingClientRect();

            switch (settings.position.at) {
                case 'center center':
                    img.style.top = (parentRect.height - imgRect.height) / 2 + 'px';
                    img.style.left = (parentRect.width - imgRect.width) / 2 + 'px';
                    break;
                case 'center right':
                    img.style.top = (parentRect.height - imgRect.height) / 2 + 'px';
                    img.style.left = parentRect.width - imgRect.width + 'px';
                    break;
                case 'center left':
                    img.style.top = (parentRect.height - imgRect.height) / 2 + 'px';
                    img.style.left = '0';
                    break;
                case 'right center':
                    img.style.top = '0';
                    img.style.left = parentRect.width - imgRect.width + 'px';
                    break;
                case 'left center':
                    img.style.top = '0';
                    img.style.left = '0';
                    break;
                case 'right right':
                    img.style.top = parentRect.height - imgRect.height + 'px';
                    img.style.left = parentRect.width - imgRect.width + 'px';
                    break;
                case 'left left':
                    img.style.top = parentRect.height - imgRect.height + 'px';
                    img.style.left = '0';
                    break;

                // Ajoute d'autres cas selon tes besoins

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
                    endValue = '0';// Si direction est "none", aucun mouvement n'est appliqué
                    property = 'center'; // Peut être n'importe quelle propriété, car le mouvement est nul
                    break;

                default:
                    break;
            }

            img.style[property] = startValue;

            if (settings.animation.type === 'fixed') {
                setTimeout(function() {
                    img.style.transition = `opacity ${settings.apparition.duration / 1000}s linear, ${property} ${settings.apparition.duration / 1000}s linear`;
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
        }
    };
})();
