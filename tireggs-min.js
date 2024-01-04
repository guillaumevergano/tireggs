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

                setTimeout(function() {
                    img.style.transition = `${property} 2s linear`;
                    img.style[property] = '50%';

                    setTimeout(function() {
                        img.style.transition = `${property} 9s linear`;
                        img.style[property] = endValue;

                        setTimeout(function() {
                            img.remove();
                        }, 9000);
                    }, 2000);
                }, 0);
            });
        });
    };
})();
