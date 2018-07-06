/*
 * @Author: 
 * @Date: 
 * @Last Modified :
 * @Last Modified :
 */
// document.write("<script src='myQuery1.4.js'></script>");

//需求分析：
//1、当鼠标在small中移动时，mask显示，big显示
//2. 当鼠标在small中移动时，mask跟随鼠标移动，并且鼠标在mask的中间，mask不能超出small
//3、当鼠标在small中移动时，mask覆盖的区域，在big中会显示细节
//4、当鼠标移出small时，mask和big都隐藏；
//获取事件源和相关元素：

function magnify(box) {
    var small = box.children[0];
    var big = box.children[1];
    var mask = small.children[1];
    var bigImg = big.children[0];
//当鼠标在small中移动时
    small.onmousemove = function(event){
        //mask显示，big显示
        // small.style.opacity='0';
        animation(small,{opacity:0});
        // animation(mask,{})
        big.style.display = "block";
        //获取事件对象
        var e = event||window.event;
        //获取鼠标距离页面顶部和页面左侧的距离
        var pageX = e.clientX + scroll().left;
        var pageY = e.clientY + scroll().top;
        //获取以box为参考系，鼠标的坐标，并且鼠标在mask的中间
        var x = pageX - box.offsetLeft-mask.offsetWidth/2;
        var y = pageY - box.offsetTop-mask.offsetHeight/2;
        //mask不能超出small
        if(x<0){
            x=0;
        }
        if(y<0){
            y=0;
        }
        if(x>small.offsetWidth-mask.offsetWidth){
            x = small.offsetWidth-mask.offsetWidth;
        }
        if(y>small.offsetHeight-mask.offsetHeight){
            y = small.offsetHeight-mask.offsetHeight;
        }
        //mask跟随鼠标移动
        mask.style.top = y + "px";
        mask.style.left = x+"px";
        //mask覆盖的区域，在big中会显示细节
        //大图从百分之几开始显示
        var percentX = x/small.offsetWidth;
        var percentY = y/small.offsetHeight;
        //大图移动
        bigImg.style.left = -percentX*big.offsetWidth +"px";
        bigImg.style.top = -percentY*big.offsetHeight + "px";
    }
//当鼠标移出small时，mask和big都隐藏
    small.onmouseout = function(){
        // small.style.opacity='1';
        // mask.style.display = "none";
        // big.style.display = "none";
        animation(small,{opacity:1})
    }


}
