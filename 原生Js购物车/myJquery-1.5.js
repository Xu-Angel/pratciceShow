function $(obj){
        // 获取第一个字符，如果是#使用的id选择器，如果是.使用类选择器，其它使用tagName
        var first = obj.substr(0, 1);
        var name = obj.slice(1); // 需要查找的名称
        if (first == '#'){ // 使用id
            return document.getElementById(name);
        }else if(first == '.'){ // 使用class
            return document.getElementsByClassName(name);
        }else{ // tagName
            return document.getElementsByTagName(obj)
        }

    }

    document.getElementsByClassName =
        document.getElementsByClassName ?
            document.getElementsByClassName : getByClassName;

    function getByClassName(className){
        var result = [];
        // 获取所有标签元素
        var allElements = document.getElementsByTagName('*');
        for (var i=0;i<allElements.length;i++){
            var el = allElements[i];
            // 判断标签是否有class属性
            if (el.className && hasClass(el, className)){
                result.push(el);
            }
        }
        return result;
    }

    function hasClass(el, className){
        // 使用' '把className的内容分隔为数组形式
        var arr = el.className.split(' ');
        for (var i=0;i<arr.length;i++){
            if(arr[i] == className){
                return true;
            }
        }
        return false;
    }

    function addClass(el, className){
        if (!hasClass(el, className)){
            el.className += ' ' + className;
            //el.className = className + ' ' + el.className;
        }
    }

    function removeClass(el, className){
        var arr = el.className.split(' ');
        var pos = -1;               // 保存className出现在的位置
                                    // el.className='a b c d' className=c
        for (var i=0;i<arr.length;i++){
            if (arr[i] == className){
                pos = i;            // 记录className在标签class中的位置
                break;
            }
        }
        if (pos == -1){                 // 查找不到类名
            return;                     // 表示不再执行后面的代码（函数执行完成）
        }else if (pos == 0){              // 第1个
            arr.shift();
        }else if(pos == arr.length-1){  // 最后1个
            arr.pop();
        }else{
            var arr1 = arr.slice(0, pos);   // 从开始截取到需要删除元素之前
            var arr2 = arr.slice(pos+1);    // 从需要删除元素之后开始截取
            arr = arr1.concat(arr2);        // arr1和arr2合拼为一个新的数组
        }

        el.className = arr.join(' ');
    }

    function list_move(index) {
        for(var i=0;i<lis.length;i++){
            lis[i].className = '';
        }
        lis[index].className = 'active';
    }
    
    function auto_play() {
        right.onclick();
    }

/**
 *
 * @param obj  要传递进来的操作对象
 * @param x_final    x坐标的终点坐标
 * @param y_final    y坐标的终点坐标
 * @param interval   定时器的时间
 */
function move(obj,x_final,y_final,interval) {
    clearTimeout(obj.timer);

    var x_pos = obj.offsetLeft;   //对象的初始位置
    var y_pos = obj.offsetTop;
    if(x_pos == x_final && y_pos == y_final){
        return
    }
    dist = Math.ceil(Math.abs(x_pos - x_final)/20);        //得到的距离分20次执行并向上取整保证能到达准确位置
    x_pos = x_pos < x_final ? x_pos + dist :x_pos -dist;

    dist = Math.ceil(Math.abs(y_pos - y_final)/20);
    y_pos = y_pos < y_final ? y_pos + dist :y_pos -dist;

    obj.style.left = x_pos +'px';
    obj.style.top = y_pos +'px';

    obj.timer = setTimeout(function () {
        move(obj,x_final,y_final,interval)
    },interval);
}


// 兼容
var scrollTop = window.pageXOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop || 0;
var scrollLeft = window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft || 0;


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

/*
  client主要成员
  clientWidth/clientHeight：获取页面可视区域的宽度/高度
      调用者：
          浏览器：可视区域的大小
              兼容性
                  IE9+：window.innerWidth
                  标签模式(有DTD)
                      document.documentElement.clientWidth
                  怪异模式(没有DTD)
                      document.body.clientWidth
          元素：盒子模型的宽/高，是width/height + padding，不包含border
  clientX/clientY：在event对象中调用
   */
// 获取浏览器可视的大小
function client(){
    if (window.innerWidth){ // IE9+或其它浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }else{
        return{
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}


function animation(obj, target, callback,time,speed){
    clearInterval(obj.timer);
    if(!time){
        time = 20;
    }
    if(!speed){
        speed = 10;
    }
    obj.timer = setInterval(function(){
        var isClearInterval = true;     // 记录是否需要清除定时
        for (var key in target){
            var t = target[key]; // 目标位置
            var c = getStyle(obj, key);  // 当前位置
            var pos;

            if(key === 'opacity'){
                c = Math.round(c*100);
                //如果传值取整是0.表示参数是小数需要*100，否则取数字本身
                t = parseInt(t) ==0 || parseInt(t) ==1? t*100 :t;
            }else {
                c = parseInt(c);
            }
                // (目标 - 当前) / 10
                var s = (t - c) / speed;   // 每次移动的距离

                s = s > 0 ? Math.ceil(s) : Math.floor(s);
                pos = c+s;
                if(key === 'opacity'){
                    obj.style[key] = pos/100;
                    obj.style.filter = '(alpha='+pos+')';
                }else{
                    var unit = key == 'height' ||
                               key == 'width' ||
                               key == 'left' ||
                               key == 'right'||
                               key == 'bottom' ||
                               key == 'top' ? 'px' : '';
                    obj.style[key] = pos + unit;
                }
            if (pos != t){ // 判断是否移动到目录位置
                isClearInterval = false;
            }
        }
        if (isClearInterval){   // 只有所有的目标都到达预定位置才能清除定时器
            clearInterval(obj.timer);
            /*
            当动画执行完成以后，再判断是否有需要执行callback
            判断用户是否有传递回调函数，如果有执行回调函数
             */
            if (callback){
                callback(); // 执行回调函数
            }
        }
    }, time);
}

/**
 * 获取标签的样式
 * @param obj       获取样式的对象
 * @param property  获取的属性名称
 */
function getStyle(obj, property){
    if (window.getComputedStyle){
        return window.getComputedStyle(obj, null)[property];

    }else{  // IE678
        return obj.currentStyle[property];
    }
}

/**
 * 兼容ie678的事件添加
 * @param obj      需要添加事件的标签对象
 * @param event     添加的事件
 * @param fn         事件的处理过程
 */
function addEvent(obj,event,fn) {
    if (obj.addEventListener){
        obj.addEventListener(event, fn);
    }else{  // IE678
        obj.attachEvent('on'+event, fn);
    }
}
