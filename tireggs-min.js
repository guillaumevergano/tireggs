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
                event: 'click' // Gardons le click comme événement par défaut
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
            var img = new Image();
            img.src = settings.image.url;
            img.style.width = settings.image.width;
            img.style.height = settings.image.height;
            img.style.position = 'absolute';
            
            var parent = document.querySelector(settings.position.div);
            parent.appendChild(img);

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
