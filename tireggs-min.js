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
                type: 'move', // Par défaut, l'effet d'animation est défini sur 'move'
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
                        img.style.transition = 'opacity 1s linear';
                        img.style[property] = '0';
                        img.style.opacity = '0';

                        setTimeout(function() {
                            img.remove();
                        }, 1000);
                    }, 3000);
                } else {
                    setTimeout(function() {
                        img.style.transition = `${property} 6s linear`;
                        img.style[property] = '100%';

                        setTimeout(function() {
                            img.style.transition = `${property} 4s linear`;
                            img.style[property] = endValue;

                            setTimeout(function() {
                                img.remove();
                            }, 9000);
                        }, 2000);
                    }, 0);
                }
            });
        });
    };
})();
