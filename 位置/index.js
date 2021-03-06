 console.log(inp.style.width); //通过style获取宽高必须是行内式，但是可以赋值，都要带单位
 console.log(div.offsetWidth); //不带单位
 console.log(div.offsetHeight); //不带单位

 console.log(son.style.left); //必须是行内式才能获取，带单位，可以赋值
 console.log(son.offsetTop);
 console.log(son.offsetLeft); //*检测盒子距离有定位的父元素的左边的距离(不包括border)，如果所有的父元素都没有定位，距离body左边的距离

 /*
  * offset家族：
  * offsetWidth/offsetHeight:检测盒子的宽高：width+padding+border;
  * offsetLeft/offsetTop:检测盒子距离有定位的父元素的距离
  * offsetParent:盒子的有定位的父元素
  * style.left/style.top/style.width/style.height:带单位，可读写，只能读取行内式，如果没有定位style.left/style.top不管用		
  * */
 /* client家族+offset家族+scroll家族
 	 	* 检测盒子的宽度：offsetWidth = width+padding+border
 	 				   clientWidth = width+padding
 	 				   scrollWidth = 盒子内容的宽度 = 不包含border
 	 	* 检测盒子距离父元素的距离：
 	 					offsetTop：检测盒子距离有定位的父元素的距离
 	 					clientY:鼠标在浏览器可视区域的坐标
 	 					scrollTop：页面被卷曲的部分
 	 	* clientWidth如果调用者是window，可以检测浏览器可视区域的大小，有兼容性
 	 	window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth; */

 //offsetWidth:检测盒子的宽度:width+padding+border
 //offsetHeight:检测盒子的高度:height+padding+border
 console.log(inp.style.width); //通过style获取宽高必须是行内式，但是可以赋值，都要带单位
 console.log(div.offsetWidth); //不带单位
 console.log(div.offsetHeight); //不带单位
 console.log(window.innerHeight);
 console.log(window.innerWidth);
 console.log(document.documentElement.clientHeight);
 console.log(document.documentElement.clientWidth);
 console.log(screen.availHeight);
 console.log(screen.availWidth);

 const html = compiled({ listTitle })
 let offset = 0
 document.getElementById('like-top').innerHTML = html
 $('.scroll-nav p', 'all').forEach((val, index, arr) => {
   offset += val.offsetWidth
   if (val.innerHTML === params.catetile) {
     addClass(val, 'active')
     offset -= val.offsetWidth
     $('.nav').scrollLeft += offset
   }
 })


 /* scroll家族：
     检测盒子内容的宽高：scrollWidth、scrollHeight
     检测卷曲的部分宽高：obj.scrollTop,obj.scrollLeft
     如果是页面被卷曲的部分：window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
 */