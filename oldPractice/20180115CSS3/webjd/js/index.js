window.onload = function () {
    searchBar();
    sktime(2 * 3600);
    slider();
}

/**
 * 当页面滚动不超过轮播图时，随着滚动搜索栏的透明度越高
 * 当页面滚动超过轮播图时，透明度固定不变
 */
function searchBar(){
    // 1. 获取jd_header_box
    var headerBox = document.querySelector('.jd_header_box');
    // 2. 获取jd_banner
    var banner = document.querySelector('.jd_banner')
    // 3. 获取jd_banner的高度
    var height = banner.offsetHeight;
    var opacity = 0;
    // 4. 绑定window的滚动事件
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 5. 判断scrollTop是否小于jd_banner的高度
        if(scrollTop < height) {
            // 6. 是的，scrollTop占jd_banner的高度的百份比乘以0.85
            opacity = scrollTop / height * 0.85;
        } else {
            // 7. 否则，透明度就是0.85
            opacity = 0.85;
        }
        headerBox.style.background = 'rgba(201, 21, 35, ' + opacity + ')';
    }
}

/**
 * 倒计时实现
 * @param sk        倒计时的时间(秒)
 */
function sktime(sk){
    // 获取sk_time
    var sktime = document.querySelector('.sk_time')
    // 获取sk_time的span
    var spans = sktime.children;

    sktime.sk = sk;
    // 显示更新数据
    updateSktime(spans, sktime.sk);
    // 1秒钟开始定时更新
    sktime.timer = setInterval(function(){
        sktime.sk--;
        if (sktime.sk < 0){
            clearInterval(sktime.timer);
            return;
        }
        updateSktime(spans, sktime.sk);
    }, 1000);
}
function updateSktime(spans, sk){
    var hours = Math.floor(sk / 3600);
    var minutes = Math.floor(sk % 3600 / 60);
    var seconds = sk % 60;


    // 给索引值是0和1设置小时
    if (hours > 9){
        spans[0].innerHTML = Math.floor(hours / 10);
        spans[1].innerHTML = hours % 10;
    }else{
        spans[0].innerHTML = 0;
        spans[1].innerHTML = hours;
    }
    // 给索引值是3和4设置分钟
    if (minutes > 9){
        spans[3].innerHTML = Math.floor(minutes / 10);
        spans[4].innerHTML = minutes % 10;
    }else{
        spans[3].innerHTML = 0;
        spans[4].innerHTML = minutes;
    }
    // 给索引值是6和7设置秒
    if (seconds > 9){
        spans[6].innerHTML = Math.floor(seconds / 10);
        spans[7].innerHTML = seconds % 10;
    }else{
        spans[6].innerHTML = 0;
        spans[7].innerHTML = seconds;
    }
}

function slider() {
    /*
    1. 自动轮播(定时器 过渡)
    2. 小圆点随着图片滚动
    3. 图片可以滑动
    4. 滑动不超过一定距离 吸附回去
    5. 超过一定距离 滚动到下一张
     */

    // 获取事件相关的元素
    var banner = document.querySelector('.jd_banner');
    var imgUl = banner.children[0];
    var dotUl = banner.children[1];
    var width = banner.offsetWidth;
    var current = 1;

    // 轮播
    clearInterval(banner.timer);
    banner.timer = setInterval(function(){
        current++;
        // 设定过渡
        // imgUl.style.transition = 'all 0.5s';
        // imgUl.style.webkitTransition = 'all 0.5s';
        jd.addTransition(imgUl);
        // 设置移动的距离
        var dis = -current * width;
        // 设置transform
        // imgUl.style.transform = 'translateX(' + dis + 'px)';
        // imgUl.style.webkitTransform = 'translateX(' + dis + 'px)';
        jd.setTransform(imgUl, dis);
    }, 2000);

    jd.addTransitionEnd(imgUl, function(){
        if (current>imgUl.children.length-2){
            current = 1;
        }else if (current == 0){
            current = imgUl.children.length - 2;
        }
        jd.removeTransition(imgUl);
        jd.setTransform(imgUl, -current*width);
        updateDot();
    });

    function updateDot(){
        for (var i=0;i<dotUl.children.length;i++){
            dotUl.children[i].className = '';
        }
        dotUl.children[current - 1].className = 'active';
    }
}