var tireggs = (function() {
    // Création de la div parent en dehors de la fonction triggerAnimation
    var parent = document.createElement('div');
    document.body.appendChild(parent);

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
            img.style.position = 'fixed';

            if (settings.position.fullscreen) {
                // Si fullscreen est true, utilise la taille de l'écran
                parent.style.position = 'fixed';
                parent.style.top = '0';
                parent.style.left = '0';
                parent.style.width = '100%';
                parent.style.height = '100vh';
                parent.style.overflow = 'hidden';

                // Utilisation de l'image comme arrière-plan avec cover
                parent.style.backgroundImage = `url(${settings.image.url})`;
                parent.style.backgroundPosition = 'center center';
                parent.style.backgroundSize = settings.image.background;
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
            } else {
                // Si fullscreen est false, utilise la taille de la div parent
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';

                // Ajout de l'image à la div
                parent.appendChild(img);
            }

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
                        endValue = '0';
                        property = 'center';
                        break;

                    default:
                        break;
                }

                img.style[property] = startValue;

                if (settings.animation.type === 'fixed') {
                    setTimeout(function() {
                        img.style.transition = `opacity ${settings.apparition.duration / 1000}s linear`;
                        img.style.opacity = '0';

                        setTimeout(function() {
                            img.style.opacity = '1';

                            setTimeout(function() {
                                img.style.transition = `opacity ${settings.apparition.duration / 1000}s linear`;
                                img.style.opacity = '0';

                                setTimeout(function() {
                                    img.remove();
                                    parent.remove();
                                }, settings.apparition.duration);
                            }, 0);
                        }, 0);
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
                                parent.remove();
                            }, settings.apparition.duration);
                        }, 0);
                    }, 0);
                }
            
            if (settings.disparition.concept === 'auto') {
                setTimeout(function() {
                    if (settings.disparition.type === 'fade') {
                        img.style.transition = `opacity ${settings.disparition.durationtoauto / 1000}s linear`;
                        img.style.opacity = '0';
            
                        setTimeout(function() {
                            img.remove();
                            parent.remove();
                        }, settings.disparition.durationtoauto);
                    } else if (settings.disparition.type === 'none') {
                        img.remove();
                        parent.remove();
                    }
                }, 3000);
            } else if (settings.disparition.concept === 'close') {
                var closeButton = document.createElement('div');
                closeButton.innerHTML = '<a id="closeButton" style="display: none;"><img src="images/croix.png" style="width: 20px; height: 20px; cursor: pointer;"></a>';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '0';
                closeButton.style.right = '0';
                closeButton.style.cursor = 'pointer';
            
                closeButton.addEventListener('click', function() {
                    img.remove();
                    parent.remove();
                });
            
                parent.appendChild(closeButton);
            }

            document.body.appendChild(parent);
        }
    };
})();

/*///////////////////////////////////////////////////////// The contender ////////////////////////////////////////////////////////// */

var contendersAnims = (function () {
    var parent = document.createElement('div');
    document.body.appendChild(parent);

    return function (options) {
        var defaults = {
            image: {
                url: "https://i.pinimg.com/originals/e5/ed/fe/e5edfe1c50f45d9858e99de0d890606a.gif",
                width: "50px",
                height: "50px",
                background: 'cover'
            },
            trigger: {
                selector: ".contenders_min",
                winner: 0,
                looser: 0,
                event: "click",
                repeat: false
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
        elements.forEach(function (element) {
            if (settings.trigger.event === 'click') {
                element.addEventListener('click', function () {
                    checkAndTriggerAnimation(element);
                });
            }

            function checkAndTriggerAnimation(element) {
                var winnerId = parseInt(element.getAttribute('data-idwinner'), 10);
                var looserId = parseInt(element.getAttribute('data-idlooser'), 10);
                

                if ((winnerId === settings.trigger.winner || settings.trigger.winner == false) && (looserId === settings.trigger.looser || settings.trigger.looser == false)) {
                    triggerAnimation(settings, element);
                }

            }
        });

        function triggerAnimation(settings, element) {

            
            var winnerId = parseInt(element.getAttribute('data-idwinner'), 10);
            var looserId = parseInt(element.getAttribute('data-idlooser'), 10);
        
            var storageKey = `animationExecuted_${winnerId}_${looserId}`;
            var animationExecuted = localStorage.getItem(storageKey);
        
            if (settings.trigger.repeat || !animationExecuted) {
                var img = new Image();
                img.src = settings.image.url;
                img.style.width = settings.image.width;
                img.style.height = settings.image.height;
                img.style.position = 'fixed';

                if (settings.position.fullscreen) {
                    parent.style.position = 'fixed';
                    parent.style.top = '0';
                    parent.style.left = '0';
                    parent.style.width = '100%';
                    parent.style.height = '100vh';
                    parent.style.overflow = 'hidden';

                    parent.style.backgroundImage = `url(${settings.image.url})`;
                    parent.style.backgroundPosition = 'center center';
                    parent.style.backgroundSize = settings.image.background;
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                } else {
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';

                    parent.appendChild(img);
                }

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
                        endValue = '0';
                        property = 'center';
                        break;

                    default:
                        break;
                }

                img.style[property] = startValue;

                if (settings.animation.type === 'fixed') {
                    setTimeout(function () {
                        img.style.transition = `opacity ${settings.apparition.duration / 1000}s linear`;
                        img.style.opacity = '0';

                        setTimeout(function () {
                            img.style.opacity = '1';

                            setTimeout(function () {
                                img.style.transition = `opacity ${settings.apparition.duration / 1000}s linear`;
                                img.style.opacity = '0';

                                setTimeout(function () {
                                    img.remove();
                                    parent.remove();
                                }, settings.apparition.duration);
                            }, 0);
                        }, 0);
                    }, 3000);
                } else {
                    setTimeout(function () {
                        img.style.transition = `${property} ${settings.apparition.duration / 1000}s linear`;
                        img.style[property] = '0';

                        setTimeout(function () {
                            img.style.transition = `${property} ${settings.apparition.duration / 1000}s linear`;
                            img.style[property] = endValue;

                            setTimeout(function () {
                                img.remove();
                                parent.remove();
                            }, settings.apparition.duration);
                        }, 0);
                    }, 0);
                }

                if (settings.disparition.concept === 'auto') {
                    setTimeout(function () {
                        if (settings.disparition.type === 'fade') {
                            img.style.transition = `opacity ${settings.disparition.durationtoauto / 1000}s linear`;
                            img.style.opacity = '0';

                            setTimeout(function () {
                                img.remove();
                                parent.remove();
                            }, settings.disparition.durationtoauto);
                        } else if (settings.disparition.type === 'none') {
                            img.remove();
                            parent.remove();
                        }
                    }, 3000);
                } else if (settings.disparition.concept === 'close') {
                    var closeButton = document.createElement('div');
                    closeButton.innerHTML = '<a id="closeButton" style="display: none;"><img src="images/croix.png" style="width: 20px; height: 20px; cursor: pointer;"></a>';
                    closeButton.style.position = 'absolute';
                    closeButton.style.top = '0';
                    closeButton.style.right = '0';
                    closeButton.style.cursor = 'pointer';

                    closeButton.addEventListener('click', function () {
                        img.remove();
                        parent.remove();
                    });

                    parent.appendChild(closeButton);
                }

                document.body.appendChild(parent);

                var winnerId = parseInt(element.getAttribute('data-idwinner'), 10);
                var looserId = parseInt(element.getAttribute('data-idlooser'), 10);
                // Enregistrement dans le local storage avec les informations du gagnant et du perdant
                var storageKey = `animationExecuted_${winnerId}_${looserId}`;
                localStorage.setItem(storageKey, true);
                console.log(localStorage);
            } else {
                // Si repeat est false, vérifier dans le local storage
                
                    console.log("animation déja utiliser!!!");
                
            }
        }
    };
})();
