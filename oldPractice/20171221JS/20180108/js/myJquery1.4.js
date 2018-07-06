function animation(obj,json,fn){
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					var flag = true;
					//json里面有几个属性就要执行几次
					var target=0;//记录目标位置
					var leader=0;//记录当前位置
					var speed =0;//记录速度
					for(var key in json){						
						if(key=='opacity'){
							target = Math.round(json['opacity']*100)//0-100
							leader = getStyle(obj,'opacity')*100//0-100
						}
						else{
							target = parseInt(json[key]);
							leader = parseInt(getStyle(obj,key));
						}
						speed = (target-leader)/10;
						speed = speed>0?Math.ceil(speed):Math.floor(speed);
						leader = leader + speed;//0-100
						if(key=='opacity'){
							obj.style.opacity = leader/100;
							obj.style.filter = "alpha(opacity="+leader+")";
						}
						else if(key=="zIndex"){
							obj.style.zIndex = json['zIndex'];
						}
						else{
							obj.style[key] = leader+"px";
						}
						
						if(leader!=target){
							flag = false						
						}
					}	
					if(flag){
						clearInterval(obj.timer);
						if(fn){
							fn();
						}
					}			
					
				},20)
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
//事件监听
function addEvent(obj,type,fn){
	//obj不能传window
	if(obj.addEventListener){
		obj.addEventListener(type,fn);
	}else{
		obj.attachEvent("on"+type,fn);
	}
}
