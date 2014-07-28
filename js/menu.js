
(function(w) {
    'use strict';

    var d = w.document,
        menuButton = d.querySelector('.js-menu-button'),
        appContainer = d.querySelector('.js-app-container'),
        app = d.querySelector('.js-app'),
        fc = new FastClick(d.body);

    menuButton.addEventListener('click', function(e) {
        var cl = appContainer.classList;
        if (cl.contains('slideIn')) {
            cl.remove('slideIn');
            cl.add('slideOut');
        } else {
            cl.remove('slideOut');
            cl.add('slideIn');
        }
    });

    var animationStartHandler = function(e) {
        //console.log("Animation Start");
    };

    var animationEndHandler = function(e) {
        //console.log("Animation End");
    };

    appContainer.addEventListener('webkitAnimationStart', animationStartHandler, false);
    appContainer.addEventListener('animationstart', animationStartHandler, false);

    appContainer.addEventListener('webkitAnimationEnd', animationEndHandler, false);
    appContainer.addEventListener('animationend', animationEndHandler, false);


}(this));
