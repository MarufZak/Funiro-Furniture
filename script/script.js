"use strict"

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


if (isMobile.any()) {
    document.body.classList.add('touch');

    const headerArrows = document.querySelectorAll('.header__icon.icon-arrow-down');
    const headerForm = document.querySelector('.header__form');
    const headerNav = document.querySelector('.header__nav');
    const headerBurger = document.querySelector('.header__burger');
    const headerIcons = document.querySelectorAll('.header__icon.icon-arrow-down');
    if (headerArrows.length > 0) {
        for (let i = 0; i < headerArrows.length; i++) {
            const arrow = headerArrows[i];
            arrow.addEventListener('click',function () {  
                arrow.parentElement.classList.toggle('active');
            })
        }
    }




    document.body.addEventListener('click',function (e) {  
        if (!e.target.classList.contains('header__icon')) {
            for (let i = 0; i < headerArrows.length; i++) {
                const arrow = headerArrows[i];
                arrow.parentElement.classList.remove('active');
            }
        }
        if (e.target.classList.contains('header__search-icon')) {
            document.body.classList.toggle('active');
            headerForm.classList.toggle('active');
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        } else if (!e.target.classList.contains('header__form-input') && !e.target.classList.contains('header__form-icon')){
            document.body.classList.remove('active');
            headerForm.classList.remove('active');
        }
        if (e.target.classList.contains('header__burger') && e.target.classList.contains('active')) {
            if (headerIcons.length > 0) {
                headerIcons.forEach(icon => {
                    slideUp(icon.nextElementSibling,500)
                });
            }
        } else if (!e.target.classList.contains('init') && !e.target.classList.contains('header__icon') && !e.target.classList.contains('header__link')) {
            headerIcons.forEach(icon => {
                slideUp(icon.nextElementSibling,500);
            });
        }
        if (e.target.classList.contains('header__burger')) {
            headerNav.classList.toggle('active');
            headerBurger.classList.toggle('active');
        } 
    })

} else {
    document.body.classList.add('pc');
}