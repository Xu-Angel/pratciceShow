//需找与数组相等的值函数
function arrIndexOf(arr,v)
{
	for(i=0;i<arr.length;i++){
		if(arr[i]==v){
			return i; //返回与目标值相等的数组的下标值
		}
	}
	return -1;
}

//addClass函数
function addClass(obj,className)
{
	if(obj.className==''){
		//如果原来没有class
		obj.className=className;
	}
	else{
		var arrClassName=obj.className.split(' ');
		var _index=arrIndexOf(arrClassName,className);
		if(_index == -1){
			//如果要添加的class在原来的class中不存在
			obj.className += ' ' + className;
		}
		//如果要添加的class在原来的class中存在,则不需要做任何事
	}
}

//removeClass函数
function removeClass(obj,className)
{
	//如果原来有class
	if(obj.className!=''){
		var arrClassName=obj.className.split(' ');
		var _index=arrIndexOf(arrClassName,className);
		if(_index != -1){
			arrClassName.splice(_index,1);  //删除需要删除的calss
			obj.className=arrClassName.join(' '); //然后将arrClassName数组拼接起来
		}
	}
}

//需要设置动画的所有元素的集合
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
},
	header = document.querySelector('.header'),
	sideNav = document.querySelector('.sidenav');


//重置元素动画为初始状态函数
var setScreenAnimateInit = function(screenCls){

	var screen = document.querySelector(screenCls),
		screenElements = animateElements[screenCls];

	for (var i = 0; i < screenElements.length; i++) {
        
        var element = document.querySelector(screenElements[i]);

        addClass(element,screenElements[i].slice(1) + '_animate_init');
    }
}
//页面载入时重置元素动画为初始状态
window.onload = function(){
	for(k in animateElements){
		setScreenAnimateInit(k);
	}
	return false;
}

//设置播放动画的函数
var playScreenAnimation = function(screenCls){

	var screen = document.querySelector(screenCls),
		screenElements = animateElements[screenCls];

	for (var i = 0; i < screenElements.length; i++) {
        
        var element = document.querySelector(screenElements[i]),
            basicCls = element.className;

        element.className = basicCls.replace('_animate_init','_animate_down');

    }
}

//点击相应导航或滚动至相应区域添加active样式

var headerNavItems = document.getElementsByClassName('header__nav-item');
	sideNavItems = document.getElementsByClassName('sidenav__item'),
	navUnderLine = document.querySelector('.header__underline');
var switchNavActive = function(idx){
	for (var i = 0; i < headerNavItems.length; i++) {
		removeClass(headerNavItems[i],'header__nav-item_status_active');
		removeClass(sideNavItems[i],'sidenav__item_status_active');
	}
	addClass(headerNavItems[idx],'header__nav-item_status_active');
	addClass(sideNavItems[idx],'sidenav__item_status_active');
	navUnderLine.style.left = idx*73 + 'px';

}
//滚动到指定位置播放对应动画
window.onscroll = function(){
	//头部导航条变半透明
	var topValue = document.body.scrollTop || document.documentElement.scrollTop;

	if (topValue > 80) {
		addClass(header, 'header_status_scroll');
	}else{
		removeClass(header, 'header_status_scroll');
	}

	//侧栏导航条出现
	if (topValue > 400) {
		addClass(sideNav,'sidenav_animate_done')
	}else{
		removeClass(sideNav, 'sidenav_animate_done');
	}

	//滚动到第几屏，播放相应动画
	if (topValue >= 0) {
		switchNavActive(0);
	}
	if (topValue > 650) {
		playScreenAnimation('.screen-2');
		switchNavActive(1);
	}
	if(topValue > 1450){
		playScreenAnimation('.screen-3');
		switchNavActive(2);
	}
	if(topValue > 2250){
		playScreenAnimation('.screen-4');
		switchNavActive(3);
	}
	if(topValue > 3050){
		playScreenAnimation('.screen-5');
		switchNavActive(4);
	}

　　if((getScrollHeight() - getScrollTop() - getWindowHeight()) < 750 ){
		switchNavActive(3);
		playScreenAnimation('.screen-4');
　　}
	if((getScrollHeight() - getScrollTop() - getWindowHeight()) < 400 ){
		switchNavActive(4);
		playScreenAnimation('.screen-5');
　　}

}

//第一屏动画页面载入时自动播放

setTimeout(function(){
	playScreenAnimation('.screen-1');
},500)

//页面和导航条双向定位

var setNavScroll = function(idx, lib){

	lib[idx].onclick = function(){
		document.body.scrollTop = 800*idx;
		document.documentElement.scrollTop = 800*idx;
	}
}

for (var i = 0; i < headerNavItems.length; i++) {
	setNavScroll(i,headerNavItems);
}

for (var i = 0; i < sideNavItems.length; i++) {
	setNavScroll(i,sideNavItems);
}
//导航条默认在外观项
switchNavActive(0);

// 头部导航滑动门

var setNavUnderLine = function(idx){
	headerNavItems[idx].onmouseover = function(){
		navUnderLine.style.left = idx*72 + 'px';
	}

	headerNavItems[idx].onmouseout = function(){
		var activeIdx= 0;
		for (var i = 0; i < headerNavItems.length; i++) {
			if(headerNavItems[i].className.indexOf('active') > -1){
				activeIdx = i;
				break;
			}
		}
		navUnderLine.style.left = activeIdx*72 + 'px';
	}
}

for (var i = 0; i < headerNavItems.length; i++) {
	setNavUnderLine(i);
}

//滚动条在Y轴上的滚动距离
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
//文档的总高度
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}