/*
* @轮播DIV容器，container
* @轮播箭头UL容器，arrowUl
* @轮播圆点UL活动样式，pointStyle
* @图片自动切换的时间2000ms，time
* @图片轮播动画的速度20,speed
* 轮播结构
<div>
    <ul class="img">
        <li><img src="";></li>
    </ul>
    <ul class="point">
    </ul>
    <ul class="arrow">
        <li class="left"><</li>
        <li class="right">></li>
    </ul>
</div>
 */
function carousel (container,arrowUl,pointStyle,time,speed){
var box = container;
var ul = box.children[0];//图片ul
var point = box.children[1];//小圆点ul
var left = arrowUl.children[0];//左箭头
var right = arrowUl.children[1];//右箭头
var index = 0;//记录图片索引
var newLi = ul.children[0].cloneNode(true);//在最后一幅图后面添加第一幅图 形成无缝轮播
ul.appendChild(newLi);
var liS = ul.children;//所有图片的集合


//根据图片数量生成小圆点，初始化轮播圆点状态
for(var i=1;i<liS.length;i++){
    var li = document.createElement('li');
    li.innerHTML = i;
    point.appendChild(li);
}
var points = point.children;
light();    //高亮索引对应圆点

/*
* 圆点样式改变函数
*/
function light() {
    for(var i=0;i<points.length;i++){
        points[i].className = "";
    }
index>(points.length-1)?points[0].className = pointStyle: points[index].className = pointStyle;
};

/*
* 圆点点击更换图片
*/
for(var j=0;j<points.length;j++){
    points[j].index = j;
    points[j].onclick = function () {
        index = this.index;
        animate(ul,-index*box.offsetWidth,speed);
        light();
    }
};

/*
* 右键头函数
*/
right.onclick = rightPlay;
function rightPlay(){
    index++;
    if(index>liS.length-1){
        ul.style.left=0;
        index = 1;
    }
    animate(ul,-index*box.offsetWidth,speed);
    light();
}

/*
* 左键头函数
*/
left.onclick = leftPlay;
function leftPlay () {
    index--;
    if(index<0){
        ul.style.left=-(liS.length-1)*box.offsetWidth+"px";
        index = liS.length-2;
    }
    animate(ul,-index*box.offsetWidth,speed);
    light();
};

/*
* 自动轮播函数
*/
box.timer = setInterval(rightPlay,time);
box.onmouseover = function () {
    clearInterval(box.timer);
};
box.onmouseout = function () {
    clearInterval(box.timer);
    box.timer = setInterval(rightPlay,time);
};

/*
* @水平动画函数
* @运动对象，obj
* @运动目标位置，target
* @运动速度,speed
*
 */
    function animate(obj,target,sp) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var speeds = (obj.offsetLeft>target?-sp:sp);
            if(Math.abs(obj.offsetLeft-target)<sp){
                obj.style.left = target+"px";
                clearInterval(obj.timer);
            }else{
                obj.style.left = obj.offsetLeft+speeds+"px";
            }
        },20)
    }
}
/*----------function carousel end------------*/
