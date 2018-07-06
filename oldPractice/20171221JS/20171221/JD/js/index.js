// 界面上方广告关闭按钮
var close=document.getElementsByClassName("icon-close")[0];
close.onclick=function () {
    close.parentElement.parentElement.style.display="none";
}
// 滚动条下去出现的搜索框事件
// input的监听
var search=document.getElementById("sh-input");
// 点击input出现的搜索历史
var select_hw=document.getElementsByClassName("hw-list");
// 删除搜索历史
var deletle_hw=document.getElementsByClassName("hw-delete");
search.onfocus=function () {
    document.getElementById("hotword").style.display="none";
    // document.getElementsByClassName("hotword")[0].style.display="block";
}
search.onblur=function () {
    if(search.value=="")
    document.getElementById("hotword").style.display="block";
}

for(var i=0;i<select_hw.length;i++){
    select_hw[i].onmouseover=function () {
        for(var j=0;j<select_hw.length;j++){
            hw_style_normal(select_hw[j]);
        }
        hw_style_change(this);
    }
}
// 样式改变和恢复
function hw_style_normal(obj) {
    obj.style.background="white";
    var spans=obj.getElementsByTagName("span");
    for(var i=0;i<spans.length;i++){
        spans[i].style.color="#999999";
    }
    obj.getElementsByClassName("hw-delete")[0].style.display="none";
    obj.getElementsByClassName("hw-history")[0].style.display="block";
}
function hw_style_change(obj) {
    obj.style.background="#efefef";
    var spans=obj.getElementsByTagName("span");
    for(var i=0;i<spans.length;i++){
        spans[i].style.color="#005aa0";
    }
    obj.getElementsByClassName("hw-delete")[0].style.display="block";
    obj.getElementsByClassName("hw-history")[0].style.display="none";
}
// 点击热词赋值给input框
for(var i=0;i<select_hw.length;i++){
    select_hw[i].onclick=function () {
        var valueTag;
        valueTag=this.getElementsByClassName("hw-hw")[0].innerHTML;
        document.getElementById("sh-input").value=valueTag;
        document.getElementById("hotword").style.display="none";
    }
}
// 删除搜索历史
for(var i=0;i<deletle_hw.length;i++){
    deletle_hw[deletle_hw.length-1].onclick=function () {
        var del=this.parentElement.parentElement;
        del.parentElement.removeChild(del);
    }
    if(i<deletle_hw.length-1){
        deletle_hw[i].onclick=function () {
            var del=this.parentElement;
            del.parentElement.removeChild(del);
        }
    }
}