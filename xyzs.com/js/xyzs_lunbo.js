window.onload = function(){
	//获取图片的相关变量
  var slideBox = document.getElementById("slide-box");
  var slideLi = slideBox.children;
  //获取图片标题的相关的变量
  var titleBox = document.getElementById('img-h');
  var titleLi = titleBox.children;
  //获取方向变量
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  
  //设置初始显示的图片索引
  var iNow = 1;
  //设置初始显示的标题的索引
  var title_I = 0;
  //设置slidebox的初始left值
  slideBox.style.left=-slideLi[0].offsetWidth*iNow+'px';
  //定时器
  var timer = null;

  //克隆第一张图片 添加在ul的最后面
  var oLi1 = slideLi[0].cloneNode(true);
  //克隆最后一张图片 添加在ul的最前面
  var oLi2 = slideLi[slideLi.length-1].cloneNode(true);
  slideBox.appendChild(oLi1);
  slideBox.insertBefore(oLi2,slideLi[0]);
  //设置slidebox的总宽度
  slideBox.style.width = slideLi[0].offsetWidth*slideLi.length+"px";
 
   /*
    * 点击左方向键
    ===================================*/
  prev.onclick=function(){
  	//关闭定时器
  	 clearInterval(timer);
  	
  	//淡出当前的标题，隐藏当前的标题框
  	titleLi[title_I].getElementsByTagName("a")[0].classList.remove("fadeIn_title");
  	titleLi[title_I].getElementsByTagName("a")[0].classList.add("fadeout_title");
  	titleLi[title_I].classList.add("hidden-it");
  	
  	//下一个图片标题的索引
    if(title_I == 0){
    	title_I = 4;
    }else{
    	title_I--;
    }
  	
  	//显示下一张图片的标题框
    titleLi[title_I].classList.remove("hidden-it");
    //淡入下一张图片的标题
    titleLi[title_I].getElementsByTagName("a")[0].classList.add("fadeIn_title");
	
	  //移动slidebix，改变显示的图片
    iNow--;
    animate(slideBox,
    	{left: -iNow*slideLi[0].offsetWidth},
    	{complete:
    		function(){
	    		if(iNow == 0){
	        		iNow = slideLi.length-2;
	        		slideBox.style.left=-slideLi[0].offsetWidth*iNow+'px';
	    		}
      		}
    	}
    );
    
    //重新启动定时器
    timer = setInterval(function(){
			    toNext();
	  },4000);
    
}
  
  /*
   * 点击右方向键
   ============================*/
  next.onclick=function(){
  	clearInterval(timer);
    toNext();
    timer = setInterval(function(){
	    toNext();
		},4000);
  }
  
  /*
   * 自动滚动函数
   ============================*/
  function toNext(){
  	//淡出当前的标题，隐藏当前的标题框
  	titleLi[title_I].getElementsByTagName("a")[0].classList.remove("fadeIn_title");
  	titleLi[title_I].getElementsByTagName("a")[0].classList.add("fadeout_title");
  	titleLi[title_I].classList.add("hidden-it");
    
    //下一个图片标题的索引
    if(title_I == 4){
    	title_I = 0;
    }else{
    	title_I++;
    }
    
    //显示下一张图片的标题框
    titleLi[title_I].classList.remove("hidden-it");
    //淡入下一张图片的标题
    titleLi[title_I].getElementsByTagName("a")[0].classList.add("fadeIn_title");
	
    //下一张图片的索引
    iNow++;
	  //缓冲显示下一张图片
    animate(slideBox,{left: -iNow*slideLi[0].offsetWidth,easing: "ease-out"},{complete:function(){
      if(iNow == slideLi.length-1){
        iNow = 1;
        slideBox.style.left=-slideLi[0].offsetWidth*iNow+'px';
      }
	
      
    }});
  }
  	
  /*
   * 开启自动轮播，每4秒切一图
   ======================*/
	timer = setInterval(function(){
	    toNext();
	},4000);

	/*
	 * 监听 visibility change 事件
	 ==================================*/
	let pageVisibility = document.visibilityState;	
	document.addEventListener('visibilitychange', function() {
	  // 页面变为不可见时触发
	  if (document.visibilityState == 'hidden') {
	  	document.title = "(●—●)";
		clearInterval(timer);
	  }
	
	  // 页面变为可见时触发
	  if (document.visibilityState == 'visible') { 
	  			document.title = "my xyzs";
			timer = setInterval(function(){
			    toNext();
			  },4000);
	  }
	});
}

/*
 * 运动函数
 ====================================================*/
function animate(obj, json, options) {
	var options = options || {};
	var duration = options.duration || 500; //运动时间,默认值为500ms;
	var easing = options.easing || 'linear'; //运动方式,默认为linear匀速
	var start = {};
	var dis = {};

	for(var name in json) {
		start[name] = parseFloat(getStyle(obj, name)); //起始位置
		dis[name] = json[name] - start[name]; //总距离
	}

	var count = Math.floor(duration / 30); //总次数
	var n = 0; //次数

	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		if(n > count) {
			clearInterval(obj.timer);
			options.complete && options.complete();
		} else {
			for(var name in json) {
				switch(easing) {
					//匀速
					case 'linear':
						var a = n / count;
						var cur = start[name] + dis[name] * a; //当前位置
						break;
						//加速
					case 'ease-in':
						var a = n / count;
						var cur = start[name] + dis[name] * a * a * a;
						break;
						//减速
					case 'ease-out':
						var a = 1 - n / count;
						var cur = start[name] + dis[name] * (1 - a * a * a);
						break;
				}
				if(name == 'opacity') {
					obj.style.opacity = cur;
					obj.style.filter = 'alpha(opacity=' + cur * 100 + ')'; 
				} else {
					obj.style[name] = cur + 'px';
				}
			}
		}
		n++;
	}, 30);
}
//获取非行间样式
function getStyle(obj, sName) {
	return(obj.currentStyle || getComputedStyle(obj, false))[sName];
}