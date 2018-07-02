/*
* @author:Angel  Date:2018.01.03
* @轮播DIV容器，container
* @轮播箭头容器，arrowContainer     若无轮播箭头 则传undefined
* @轮播圆点UL活动样式，pointStyle   若不需要轮播圆点则传undefined
* @图片自动切换的时间2000ms，time
* @图片轮播动画的速度20,speed
* 轮播结构                          CSS：container position:relative;
                                        overflow:hidden;
    <ul class="img">                   图片Ul    position：absolute;
        <li><img src="";></li>         width：自动生成
    </ul>                             图片li    float:left;
    <ul class="point">
    </ul>
    <ul class="arrow">
        <li class="left"><</li>
        <li class="right">></li>
    </ul>
</div>
 */
function carousel(container, arrowContainer, pointStyle, time, speed) {
    var ul = container.children[0];//图片ul
    var index = 0;//记录图片索引
    var newLi = ul.children[0].cloneNode(true);//在最后一幅图后面添加第一幅图 形成无缝轮播
    ul.appendChild(newLi);
    var liS = ul.children;//所有图片的集合
    ul.style.width = liS.length * 100 + '%';//图片总宽度
    /*判断是否需要圆点*/
    if (pointStyle != undefined) {
        var point = container.children[1];//小圆点ul
        //根据图片数量生成小圆点，初始化轮播圆点状态
        for (var i = 1; i < liS.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = i;
            point.appendChild(li);
        }
        var points = point.children;
        light();
        /*
        * 圆点点击更换图片
        */
        for (var j = 0; j < points.length; j++) {
            points[j].index = j;
            points[j].onclick = function () {
                index = this.index;
                caranimate(ul, -index * container.offsetWidth, speed);
                light();
            };
        }

        /*
        * 圆点样式改变函数
        */
        function light() {
            for (var i = 0; i < points.length; i++) {
                points[i].className = "";
            }
            index > (points.length - 1) ? points[0].className = pointStyle : points[index].className = pointStyle;
        }
    }

    /*
    * 右键头函数
    */

    function rightPlay() {
        index++;
        if (index > liS.length - 1) {
            ul.style.left = 0;
            index = 1;
        }
        caranimate(ul, -index * container.offsetWidth, speed);
        pointStyle == undefined ? '' : light();
    }

    /*
    * 左键头函数
    */

    function leftPlay() {
        index--;
        if (index < 0) {
            ul.style.left = -(liS.length - 1) * container.offsetWidth + "px";
            index = liS.length - 2;
        }
        caranimate(ul, -index * container.offsetWidth, speed);
        light();
    }

    /*判断是否需要左右箭头*/
    if (arrowContainer != undefined) {
        var left = arrowContainer.children[0];//左箭头
        var right = arrowContainer.children[1];//右箭头
        left.onclick = leftPlay;
        right.onclick = rightPlay;
    }



    /*
    * 自动轮播函数
    */
    container.timer = setInterval(rightPlay, time);
    container.onmouseover = function () {
        clearInterval(container.timer);
    };
    container.onmouseout = function () {
        clearInterval(container.timer);
        container.timer = setInterval(rightPlay, time);
    };
}
//鼠标悬停 时候，显示 左右箭头：

/*
* @水平动画函数
* @运动对象，obj
* @运动目标位置，target
* @运动速度,speed
*
 */
function caranimate(obj, target, sp) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speeds = (obj.offsetLeft > target ? -sp : sp);
        if (Math.abs(obj.offsetLeft - target) < sp) {
            obj.style.left = target + "px";
            clearInterval(obj.timer);
        } else {
            obj.style.left = obj.offsetLeft + speeds + "px";
        }
    }, 20)

}

/*----------function carousel end------------*/
/**
 * 版本2动画函数，使用缓动效果(先快后慢)
 * @param obj       需要移动的标签对象
 * @param target    移动到的位置{top:scroll().top + 80,left:div.offsetLeft}
 */
/*
function animationXY(obj, target){
    clearInterval(obj.timer);

    obj.timer = setInterval(function(){
        if (obj.offsetLeft == target.left &&
            obj.offsetTop == target.top){
            clearInterval(obj.timer);
            return;
        }

        var posX = (target.left-obj.offsetLeft)/10;
        var posY = (target.top-obj.offsetTop)/10;

        posX>0? posX = Math.ceil(posX): posX = Math.floor(posX);
        posY>0?posY = Math.ceil(posY):  posY = Math.floor(posY);

        obj.style.left = obj.offsetLeft + posX + 'px';
        obj.style.top = obj.offsetTop + posY + 'px';
    }, 20);
}




*/



