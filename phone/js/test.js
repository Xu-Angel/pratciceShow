var animateElements = {
  '.screen-1' : [
  '.screen-1__title',
  '.screen-1__phone',
  '.screen-1__shadow'
  ],
  '.screen-2' : [
  '.screen-2__title',
  '.screen-2__subtitle',
  '.screen-2__phone',
  '.screen-2__point_i_1',
  '.screen-2__point_i_2',
  '.screen-2__point_i_3'
  ],
  '.screen-3' : [
  '.screen-3__title',
  '.screen-3__subtitle',
  '.screen-3__phone',
  '.screen-3__features'
  ],
  '.screen-4' : [
  '.screen-4__title',
  '.screen-4__subtitle',
  '.screen-4__phone__item_i_1',
  '.screen-4__phone__item_i_2',
  '.screen-4__phone__item_i_3',
  '.screen-4__phone__item_i_4'
  ],
  '.screen-5' : [
  '.screen-5__title',
  '.screen-5__subtitle',
  '.screen-5__phone'
  ],
}
var isAnimateInit = false,
    isAnimateDown = false;


function screenAnimate(screenCls){

    var screen = document.querySelector(screenCls),
        screenElements = animateElements[screenCls];

  screen.onclick = function(){

    if (isAnimateInit === false) {

      for (var i = 0; i < screenElements.length; i++) {
        
        var element = document.querySelector(screenElements[i]),
            basicCls = element.className;

            element.className += ' ' + screenElements[i].slice(1) + '_animate_init';

      }

      isAnimateInit = true;
      return;

    }

    if (isAnimateDown === false) {

      for (var i = 0; i < screenElements.length; i++) {
        
        var element = document.querySelector(screenElements[i]),
            basicCls = element.className;

            element.className = basicCls.replace('_animate_init','_animate_down');

      }

      isAnimateDown = true;
      return;

    }

    if (isAnimateDown === true) {

      for (var i = 0; i < screenElements.length; i++) {
        
        var element = document.querySelector(screenElements[i]),
            basicCls = element.className;

            element.className = basicCls.replace('_animate_down','_animate_init');

      }

      isAnimateDown = false;
      return;

    }

  }

}

for(k in animateElements){
  screenAnimate(k);
}