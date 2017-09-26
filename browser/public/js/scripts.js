function toggleClass(elem, classToToggle) {
    function addClass(elem, classToAdd) {
        elem.className = elem.className += ' ' + classToAdd;
    }

    function removeClass(elem, classToRemove) {
        elem.className = elem.className.replace(classToRemove, '');
    }

    // console.log('elem:', elem);

    var classAlreadyExists = (elem.className.search(classToToggle) > -1);

    if (classAlreadyExists) {
        // addClass(elem, 'expanded-on-mobile');
        removeClass(elem, classToToggle);
        // addClass(elem, 'expanded-on-mobile');
    } else {
        addClass(elem, classToToggle);
        console.log('added class');
        // removeClass(elem, 'expanded-on-mobile');
        // addClass(elem, classToToggle);
    }
}

var navToggle = document.getElementById('nav-toggle');
var nav = document.getElementById('nav');
navToggle.onclick = function(e) {
    toggleClass(nav, 'condensed-on-mobile');
};