$(function(){
	banner();
	$('[data-toggle="tooltip"]').tooltip();
	initProduct();
})
//轮播图动态生成
function banner(){
	var imgInfo =
		 [
		{
			bac:"url('images/slide_01_2000x410.jpg')",
			img:"images/slide_01_640x340.jpg"
		},
		{
			bac:"url('images/slide_02_2000x410.jpg')",
			img:"images/slide_02_640x340.jpg"
		},
		{
			bac:"url('images/slide_03_2000x410.jpg')",
			img:"images/slide_03_640x340.jpg"
		},
		{
			bac:"url('images/slide_04_2000x410.jpg')",
			img:"images/slide_04_640x340.jpg"
		}
	];

	/* 
	*数据类型混淆不清
	*
	*/
/* 	  
  (function (){
		var xhr = null;
    if (XMLHttpRequest){ 
        xhr = new XMLHttpRequest();
    } else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');  
    }
    xhr.open('GET', './imgInfo.json', true);
    xhr.send(null);
    xhr.onreadystatechange = function(){     
        if(xhr.readyState==4 && xhr.status==200){
            var text = xhr.responseText;// 
          var imgInfo = eval('('+text+')');
          console.log(json)
					console.log(typeof json)
					// console.log(JSON.parse(text))
        }
    };
	}) */
	$(window).on('resize',function(){
		//判断当前设备是否是移动端
		
		var isMobile = true;
		var width = $(window).width();
		if(width<768){
			isMobile = true;
		}else{
			isMobile = false;
		}

		//传入slide这个模板的数据
		// var data = {imgInfo:imgInfo,isMobile:isMobile};es5写法
		var data = {imgInfo:imgInfo,isMobile:isMobile};//es6写法 键值一样，则可以简写
		//渲染slide模板
		var html = template('slide',data);
		$('#inner').html(html);
		//实现滑动功能更
		var isMove = false;
		var startX = 0;
		var moveX = 0;
		var distanceX = 0;
		$("#inner").on('touchstart',function(e){
			startX = e.originalEvent.touches[0].clientX;
		}).on('touchmove',function(e){
			moveX = e.originalEvent.touches[0].clientX;
			isMove=true;
		}).on('touchend',function(){
			distanceX = moveX - startX ;
			if(Math.abs(distanceX)>50&&isMove){
				if(distanceX>0){
					//上一张
					$('#carousel-example-generic').carousel('prev');
				}else if(distanceX<0){
					//下一张
					$('#carousel-example-generic').carousel('next');
				}
			}
			isMove = false;
			startX = 0;
			moveX = 0;
			distanceX = 0;
		})
	}).trigger('resize');
	//要求小圆点也根据数据自动生成
	
}

//初始化产品的标签部分
function initProduct(){
	var $parent = $('.wjs_product_tabs_parent');
	var $ul = $parent.find('ul');
	var $lis = $ul.find('li');
	var sum = 0;
	$lis.each(function(index,item){
		//width():取得的是内容的宽度
		//innerWidth():取得的是内容和padding的宽度
		sum+=$(item).innerWidth();
	})
	$ul.width(sum);
	//上次做jd的移动端的时候让大家把首页横向滑动做成插件，在这里就可以使用
	
}
