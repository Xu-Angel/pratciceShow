var inp = document.getElementsByTagName('input')[0];
var div = document.getElementsByTagName('div')[0];
inp.onclick=function () {
    //offsetWidth:检测盒子的宽度:width+padding+border
    //offsetHeight:检测盒子的高度:height+padding+border
    console.log(inp.style.width);//通过style获取宽高必须是行内式，但是可以赋值，都要带单位
    console.log(div.offsetWidth);//不带单位
    console.log(div.offsetHeight);//不带单位
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    console.log(document.documentElement.clientHeight);
    console.log(document.documentElement.clientWidth);
    console.log(screen.availHeight);
    console.log(screen.availWidth);
    var s='a 哎呀';
    console.log(encodeURIComponent(s))
    console.log(encodeURI(s))
    console.log(decodeURIComponent(s))
    console.log(decodeURI(s))
    console.log(5.9889.toFixed(1))    //会四舍五入  保留小数位数6.0
    console.log(Math.ceil(5))
    console.log(Math.ceil(5.6))
    console.log(Math.ceil(5.1))
    console.log(Math.ceil(5.1))//向上取整6
        console.log(Math.floor(5))
        console.log(Math.floor(5.6))
        console.log(Math.floor(5.1))
        console.log(Math.floor(5.0))
        console.log(Math.floor(5.5))//5向下取整
        console.log(Math.PI)
    console.log(Math.round(5.1))//5
    console.log(Math.round(5.0))//5
    console.log(Math.round(5))//5
    console.log(Math.round(5.82))//6
    console.log(Math.round(5.5))          //该值最接近的整数6
    console.log(Math.max(5,8,9,4,21,23))   //最大
    console.log(Math.min(5,8,9,4,21,23))   //最小
}
