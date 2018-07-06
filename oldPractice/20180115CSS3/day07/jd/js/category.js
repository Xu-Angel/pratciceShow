window.onload = function(){
    goBack();
    swipe('.jd_cate_left');
    swipe('.jd_cate_right .mask');
    addTipEvent('.jd_cate_left ul');
};

function swipe(str){
    var parent = document.querySelector(str);
    var ul = parent.querySelector('ul');
    //var h = parent.offsetHeight;
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
            //ul.style.transform = 'translateY(' + ul.currentY + 'px)';
            jd.setTransform(ul, ul.currentY, 'y');
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
        //ul.style.transform = 'translateY(' + ul.currentY + 'px)';
        jd.setTransform(ul, ul.currentY, 'y');
    });
}

function addTipEvent(str){
    // 方式二
    jd.tip(document.querySelector(str), function(){
        var li = event.target.parentNode; // 触摸a标签
        var ul = li.parentNode;
        var lies = ul.children;
        for (var i=0;i<lies.length;i++){
            lies[i].className = '';
            lies[i].index = i;
        }
        li.className = 'now';
        var y = -li.index * li.offsetHeight;
        var minPosition = ul.parentNode.offsetHeight - ul.offsetHeight;
        if (y < minPosition){
            y = minPosition;
        }
        ul.currentY = y;
        jd.addTransition(ul);
        jd.setTransform(ul, y, 'y');
    });

    // 方式一
    /*var ul = document.querySelector(str);
    var children = ul.children;

    var minPosition = ul.parentNode.offsetHeight - ul.offsetHeight;
    // 给li添加上轻触事件
    for(var i=0;i<children.length;i++){
        (function(k){
            var that = children[k];
            jd.tip(that, function(){
                for (var j=0;j<children.length;j++){
                    children[j].className = '';
                    //children[j].style.borderRight = '1px solid #CCCCCC';
                }
                that.className = 'now';
                var y = -k*that.offsetHeight;
                if (y < minPosition) {
                    y = minPosition;
                }
                ul.style.transform = 'translateY(' + y + 'px)';
                jd.setTransform(ul, y, 'y');
                ul.currentY = y;
                jd.addTransition(ul);
                event.stopPropagation();    // 禁止把事件传递到ul的touchend
            });
        })(i);
    }*/
}

function goBack() {
    var iconBack = document.querySelector('.icon_back');
    iconBack.addEventListener('click', function () {
        iconBack.setAttribute('href', 'javascript:;');
        // 负数往前，正数往后
        history.go(-1);
    });
}