/**
 * 生成轮播图的框架
 * @param obj       生成轮播的容器
 * @param data      生成的图片数据
 * @param showIndicators 是否需要添加圆点
 * @param showController 是否添加左右控制器
 */
function carousel(obj, data, showIndicators, showController) {
    // 添加html代码
    // 生成图片的ul
    var html = makeImageList(data);
    // 生成圆点
    if (showIndicators) {
        html += makeIndicators(data.length);
        obj.showIndicators = true;
    }
    // 生成控制器
    if (showController){
        html += makeController();
    }
    // 给父容器添加上需要增加的html代码，并转为DOM结构
    obj.innerHTML = html;
    // 添加容器样式
    makeImageStyle(obj);
    // 保存当前播放图片的位置
    obj.index = 1;
    // 添加事件
    if (showController){
        addCarouselControll(obj);
    }
    if (showIndicators){
        addCarouselIndicator(obj);
    }

    obj.intervalTime = 3000;
    carouselAutoPlay(obj);
    // 添加在上方暂停播放
    obj.onmouseover = function(){clearInterval(obj.timer)};
    // 添加离开上方重新开始播放
    obj.onmouseout = function(){carouselAutoPlay(obj)};
}

/**
 * 生成图片列表
 * @param data      需要生成的数据
 */
function makeImageList(data){
    var html = '<ul class="carousel-ul">';
    html += '<li><a href="#"><img src="'+data[data.length-1]+'"/></a></li>'
    for (var i=0;i<data.length;i++){
        html += '<li><a href="#"><img src="'+data[i]+'"/></a></li>'
    }
    html += '<li><a href="#"><img src="'+data[0]+'"/></a></li>'
    html += '</ul>';
    return html;
}

/**
 *  创建指示圆点
 *  @param num      需要创建多少个点
 */
function makeIndicators(num){
    var html = '<ul class="carousel-indicators">';
    for (var i=0;i<num;i++){
        if (i == 0) {
            html += '<li class="carousel-now"></li>';
        }else{
            html += '<li></li>';
        }
    }
    html += '</ul>'
    return html;
}

/**
 * 创建左右移动的控制按钮
 */
function makeController(){
    return '<ul class="carousel-arrow"><li class="carousel-left">&lt;</li><li class="carousel-right">&gt;</li></ul>';
}

/**
 * 给图片ul设置样式
 * @param obj
 */
function makeImageStyle(obj){
    var ul = obj.children[0];
    var li = ul.children[0];
    var a = li.children[0];
    var img = a.children[0];

    obj.style.width = img.offsetWidth + 'px';
    obj.style.height = img.offsetHeight + 'px';

    ul.style.width = ul.children.length * 100 + '%';
    ul.style.left = -img.offsetWidth + 'px';

    if (obj.showIndicators){
        var indicator = obj.children[1];
        var width = indicator.children[0].offsetWidth;
        var len = indicator.children.length;

        indicator.style.width = (width + 10) *  len + 'px';
        // 在样式margin-left，在js中marginLeft
        indicator.style.marginLeft = -indicator.offsetWidth / 2 + 'px';
    }
}

/**
 * 添加左右控制的事件
 * @param obj           父容器
 */
function addCarouselControll(obj){
    // 父容器里可能会有1~3个节点(1图片，2圆点，3左右控制)
    var arrow = obj.children[obj.children.length-1];
    arrow.children[0].onclick = carouselLeft;
    arrow.children[1].onclick = carouselRight;
}

/**
 * 控制图片往左移动
 */
function carouselLeft(){
    var parent = this.parentNode.parentNode;
    parent.index--;
    carouselMove(parent);
    if(parent.showIndicators){
        carouselHighlight(parent);
    }
}
/**
 * 控制图片往右移动
 */
function carouselRight(){
    var parent = this.parentNode.parentNode;
    parent.index++;
    carouselMove(parent);
    if(parent.showIndicators){
        carouselHighlight(parent);
    }
}

/**
 * 控制图片移动
 * @param obj
 */
function carouselMove(obj){
    // 获取图片的li
    var ul = obj.children[0];
    var imageLi = ul.children;
    // 这是最后一张图片，准备要放的是倒数第2张图片
    if (obj.index < 0){
        obj.index = imageLi.length - 2;
        // 把位置重置到倒数第2张的位置，再开始播放倒数第3张
        ul.style.left = -obj.index * obj.offsetWidth + 'px';
        obj.index--;
    }
    // 已经播放完成，准备播放第3张图片
    else if(obj.index >= imageLi.length){
        obj.index = 1;
        // 把位置重置到第2张的位置，再开始播放第3张
        ul.style.left = -obj.index * obj.offsetWidth + 'px';
        obj.index++;
    }
    animation(ul, -obj.index * obj.offsetWidth);
}

/**
 * 高亮选中图片的圆点
 * @parent  obj         父容器
 */
function carouselHighlight(obj){
    var index = obj.index - 1;
    var imageLi = obj.children[0].children;
    var dotLi = obj.children[1].children;
    // 倒数第2张图
    if (index < 0){
        index = imageLi.length - 3;
    }else if (index>=imageLi.length-2){
        // 第1张图
        index = 0;
    }
    // 重置所圆点的状态
    for (var i=0;i<dotLi.length;i++){
        dotLi[i].className = '';
    }
    // 给当前位置圆点添加状态
    dotLi[index].className = 'carousel-now';
}

/**
 * 添加圆点的点击事件
 * @param obj       父容器对象
 */
function addCarouselIndicator(obj) {
    var dots = obj.children[1].children;
    for (var i=0;i<dots.length;i++){
        dots[i].index = i + 1;  // 对应圆点和图片的关系
        dots[i].onclick = carouselDotClick;
    }
}

/**
 * 圆点的点击事件
 */
function carouselDotClick(){
    var parent = this.parentNode.parentNode;
    parent.index = this.index;
    carouselMove(parent);
    carouselHighlight(parent);
}

function carouselAutoPlay(obj){
    // 清除默认的播放
    clearInterval(obj.timer);
    // 设置定时器
    obj.timer = setInterval(function(){
        obj.index++;
        carouselMove(obj);
        if(obj.showIndicators){
            carouselHighlight(obj);
        }
    }, obj.intervalTime);
}