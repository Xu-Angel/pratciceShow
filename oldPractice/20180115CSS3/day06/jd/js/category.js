window.onload = function(){
    // goBack();
    // swipe('.jd_cate_left');
    swipe('.jd_cate_right');
};

function swipe(str){
    var parent = document.querySelector(str);
    var ul = parent.querySelector('ul');
    var h = parent.offsetHeight;
    var H = ul.offsetHeight;

    // 顶部和底部拖拽时的缓冲距离
    var distance = 100;
    // 最大定位距离
    var maxPosition = 0;
    // 最小定位距离
    var minPosition = h - H;
    var maxSwipe = distance+maxPosition;
    var minSwipe = -distance+minPosition;
    ul.currentY = 0;
console.log(parent);
    ul.addEventListener('touchstart', function(e){
        ul.startY = e.touches[0].pageY;
    });
    ul.addEventListener('touchmove', function(e){
        ul.endY = e.touches[0].pageY;
        var move = ul.endY - ul.startY;
        ul.isMove = true;
        if (ul.currentY+move< maxSwipe && ul.currentY+move> minSwipe) {
            ul.currentY += move;
            jd.removeTransition(ul);
            ul.style.transform = 'translateY(' + ul.currentY + 'px)';
        }
    });
    ul.addEventListener('touchend', function(){
        if(ul.isMove){
            if (ul.currentY>maxPosition){
                ul.currentY = maxPosition;
            }else if(ul.currentY < minPosition){
                ul.currentY = minPosition;
            }
        }
        jd.addTransition(ul);
        ul.style.transform = 'translateY(' + ul.currentY + 'px)';
    });
}

/*
function goBack(){
    var iconBack = document.querySelector('.icon_back');
    iconBack.addEventListener('click', function(){
        alert(1);
        iconBack.setAttribute('href', 'javascript:;');
        // 负数往前，正数往后
        history.go(-1);
    });
}*/
