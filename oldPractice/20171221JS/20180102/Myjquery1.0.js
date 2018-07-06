//animate:传入DOM和要移动到的位置target
function animate(obj,target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed = (obj.offsetLeft>target?-20:20);
        if(Math.abs(obj.offsetLeft-target)<20){
            obj.style.left = target+"px";
            clearInterval(obj.timer);
        }else{
            obj.style.left = obj.offsetLeft+speed+"px";
        }
    },20)
}
