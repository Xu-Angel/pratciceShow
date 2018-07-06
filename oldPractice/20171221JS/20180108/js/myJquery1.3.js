//animation:让指定的dom元素缓动到指定位置
function animationX(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var speed = (target - obj.offsetLeft)/10;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		obj.style.left = obj.offsetLeft + speed +"px";
		if(obj.offsetLeft==target){
			clearInterval(obj.timer);
		}
		
	},30)
}
function animationY(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var speed = (target - obj.offsetTop)/10;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		obj.style.top = obj.offsetTop + speed +"px";
		if(obj.offsetTop==target){
			clearInterval(obj.timer);
		}
		
	},30)
}
//有一个函数：scroll().top
function scroll(){
	return {
		"top":document.body.scrollTop+document.documentElement.scrollTop,
		"left":document.body.scrollLeft+document.documentElement.scrollLeft
	}
}
//封装一个函数获取浏览器可视区域的宽高
function client(){
	return {
		"width":window.innerWidth||document.documentElement.clientWidth ||document.body.clientWidth,
		"height":window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
	}
//	if(window.innerWidth!=undefined){
//		return {
//			"width":window.innerWidth,
//			"height":window.innerHeight
//		}
//	}else if(document.compatMode === "CSS1Compat"){
//		//说明是标准模式
//		return {
//			"width":document.documentElement.clientWidth,
//			'height':document.documentElement.clientHeight
//		}
//	}else{
//		return {
//			"width":document.body.clientWidth,
//			"height":document.body.clientHeight
//		}
//	}
}
//获取任意属性
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr]
	}else{
		return obj.currentStyle[attr];
	}
}
