"use strict"
var spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
    // Получение обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item,index,self) {  
        return !item.dataset.spollers.split(',')[0]; 
    })
    // Инициализация обычных спойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular)
    }

    // Получение спойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item,index,self) {  
        return item.dataset.spollers.split(',')[0]; 
    })
    if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(',');
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
            breakpoint.item = item;
            breakpointsArray.push(breakpoint)
        });

        // Получаем уникальные брейкпоинты
        let mediaQuaries = breakpointsArray.map(function (item) {  
            return '(' + item.type + '-width: ' + item.value +'px),' + item.value + ',' + item.type
        })
        mediaQuaries = mediaQuaries.filter(function (item,index,self) {  
            return self.indexOf(item) === index;
        })

        mediaQuaries.forEach(breakpoint=>{
            const paramsArray = breakpoint.split(',');
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Обьекты с нужным условием
            const spollersArray = breakpointsArray.filter(function (item) {  
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            })
            // Собыите
            matchMedia.addListener(function () {  
                console.log(1);
                initSpollers(spollersArray,matchMedia)
            })
            initSpollers(spollersArray,matchMedia)
        })
    }
    function initSpollers(spollersArray,matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener('click',setSpollerAction)
            } else {
                spollersBlock.classList.remove('init');
                initSpollerBody(spollersBlock,false);
                spollersBlock.removeEventListener('click',setSpollerAction)
            }
        })

        // Работа с контентом
        function initSpollerBody(spollersBlock,hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length > 0) {
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('.active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex",'-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                })
            }
        }


        function setSpollerAction(e) {
            const el = e.target;
            if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]') ) {
                const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]')
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
                if (!spollersBlock.querySelectorAll('.slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('active')) {
                        hideSpollerBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle('active');
                    slideToggle(spollerTitle.nextElementSibling,500)
                }
                
                e.preventDefault();
            }
        }

        function hideSpollerBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller].active');
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove('active');
                slideUp(spollerActiveTitle.nextElementSibling,500)
            }
        }
    }



}

let slideUp = (target,duration = 500 ) => {
    if (!target.classList.contains('slide')) {
        target.classList.add('slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout( () => {
            target.hidden = true;
            target.style.removeProperty('height'); /* [9] */
            target.style.removeProperty('padding-top');  /* [10.1] */ 
            target.style.removeProperty('padding-bottom');  /* [10.2] */ 
            target.style.removeProperty('margin-top');  /* [11.1] */ 
            target.style.removeProperty('margin-bottom');  /* [11.2] */ 
            target.style.removeProperty('overflow');  /* [12] */ 
            target.style.removeProperty('transition-duration');  /* [13.1] */ 
            target.style.removeProperty('transition-property');  /* [13.2] */ 
            target.classList.remove('slide');
          }, duration);
    }
}
let slideDown = (target,duration = 500 ) => {
    if (!target.classList.contains('slide')) {
        target.classList.add('slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight; /* [3] */
        target.style.overflow = 'hidden';
        target.style.height = 0; /* [4] */
        target.style.paddingTop = 0; /* [5.1] */
        target.style.paddingBottom = 0; /* [5.2] */ 
        target.style.marginTop = 0; /* [6.1] */ 
        target.style.marginBottom = 0; /* [6.2] */ 
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";  /* [9.1] */ 
        target.style.transitionDuration = duration + 'ms'; /* [9.2] */
        target.style.height = height + 'px'; /* [10] */
        target.style.removeProperty('padding-top'); /* [11.1] */ 
        target.style.removeProperty('padding-bottom'); /* [11.2] */ 
        target.style.removeProperty('margin-top'); /* [12.1] */ 
        target.style.removeProperty('margin-bottom'); /* [12.2] */
        window.setTimeout( () => {
            target.style.removeProperty('height'); /* [13] */
            target.style.removeProperty('overflow'); /* [14] */
            target.style.removeProperty('transition-duration'); /* [15.1] */
            target.style.removeProperty('transition-property'); /* [15.2] */
            target.classList.remove('slide');
          }, duration);
    }
}
let slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
}