function $(el){
    var firstLetter = el.substr(0, 1);
    var name = el.substr(1);
    if (firstLetter == '#'){
        return document.getElementById(name);
    }else if(firstLetter == '.'){
        return document.getElementsByClassName(name);
    }else{
        return document.getElementsByTagName(el);
    }
}

/**
 * 版本2的动画函数，使用缓动效果(先快后慢)
 * @param obj       需要移动的标签对象
 * @param target    移动到的x位置
 */
function animation(obj, target){
    clearInterval(obj.timer);

    obj.timer = setInterval(function(){
        if (obj.offsetLeft == target.left &&
            obj.offsetTop == target.top){
            // 到达指定位置后结束移动
            clearInterval(obj.timer);
            return;
        }
        var posX = (target.left-obj.offsetLeft)/10;
        var posY = (target.top-obj.offsetTop)/10;

        if (posX>0){
            posX = Math.ceil(posX);
        }else{
           posX = Math.floor(posX);
        }
        if (posY>0){
            posY = Math.ceil(posY);
        }else{
            posY = Math.floor(posY);
        }

        obj.style.left = obj.offsetLeft + posX + 'px';
        obj.style.top = obj.offsetTop + posY + 'px';
    }, 20);
}

/**
 * 获取滚动条距离顶部和左侧的距离，兼容IE6+,Firefox,Chrome等
 */
function scroll(){
    // 判断是否有window.pageXOffset
    if (window.pageYOffset){
        return {
            top: pageYOffset,
            left: pageXOffset
        };
    }
    // 再判断是否有声明DTD
    else if(document.compatMode == 'BackCompat'){
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
    // 默认使用documentElement
    else{
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
}