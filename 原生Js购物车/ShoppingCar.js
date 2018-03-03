var shop = $('.shop');
var good = $('.good');
var select_all = $('.select-all-box');

var counter =$('.counter')[0];
var follow = $('.counter')[1];
window.onscroll = document.body.scroll = function () {
    follow.isShown = false;
    var top = counter.offsetTop - scroll().top;
    if(!follow.isShown && top<client().height-follow.offsetHeight){
        follow.isShown = true;
        follow.style.display = 'none';
    }else {
        follow.isShown = false;
        follow.style.display = 'block';

    }
}

for(var i=0;i<shop.length;i++){
    shop[i].ischecked=false;
    shop[i].onclick=function () {
        this.ischecked = !this.ischecked;
        if(this.ischecked){
            this.style.backgroundPositionY="-20px";
        }
        else{
            this.style.backgroundPositionY="0px";
        }
        ischecked_shop(this);
        cancel_select();
        countMoney_Num_Style();
    }
}
for(var i=0;i<good.length;i++){
    good[i].ischecked=false;
    good[i].onclick=function () {
        this.ischecked = !this.ischecked;
        if(this.ischecked){
            this.style.backgroundPositionY="-20px";
        }
        else{
            this.style.backgroundPositionY="0px";
        }
        cancel_select_shop(this);
        cancel_select();
        countMoney_Num_Style();
    }
}

for(var i=0;i<select_all.length;i++){
    select_all[i].ischecked=false;
    select_all[i].onclick=function () {
        this.ischecked = !this.ischecked;
        if(this.ischecked){
            for(var j=0;j<select_all.length;j++){
                select_all[j].getElementsByClassName("select-all")[0].style.backgroundPositionY="-20px";
            }
        }
        else{
           for(var j=0;j<select_all.length;j++){
                select_all[j].getElementsByClassName("select-all")[0].style.backgroundPositionY="0px";
            }
        }
        ischecked_all(this);
        countMoney_Num_Style();
    }
}

function ischecked_all(obj) {
    for(var i=0;i<shop.length;i++){
        shop[i].ischecked=obj.ischecked;
        if(shop[i].ischecked)
            shop[i].style.backgroundPositionY="-20px"
        else
            shop[i].style.backgroundPositionY="0px"
    }
    for(var i=0;i<good.length;i++){
        good[i].ischecked=obj.ischecked;
        if(good[i].ischecked)
            good[i].style.backgroundPositionY="-20px"
        else
            good[i].style.backgroundPositionY="0px"
    }
}
function ischecked_shop(obj) {
    var shop_good = obj.parentElement.parentElement.getElementsByClassName('good');
    for(var i=0;i<shop_good.length;i++){
        shop_good[i].ischecked=obj.ischecked;
        if(shop_good[i].ischecked)
            shop_good[i].style.backgroundPositionY="-20px"
        else
            shop_good[i].style.backgroundPositionY="0px"
    }
}
function cancel_select() {
    var count=0;
    for(var i=0;i<shop.length;i++){
        if(shop[i].ischecked){
            count++;
        }
    }
    if(count==shop.length){
        for(var j=0;j<select_all.length;j++){
            select_all[j].ischecked=true;
            select_all[j].getElementsByClassName("select-all")[0].style.backgroundPositionY="-20px";
        }
    }
    else{
        for(var j=0;j<select_all.length;j++){
            select_all[j].ischecked=false;
            select_all[j].getElementsByClassName("select-all")[0].style.backgroundPositionY="0px";
        }
    }
}

function cancel_select_shop(obj) {
    var count =0;
    var shop_good = obj.parentElement.parentElement.parentElement.getElementsByClassName('good');
    var thisShop = obj.parentElement.parentElement.parentElement.getElementsByClassName('shop')[0];
    for(var i = 0;i<shop_good.length;i++){
        if(shop_good[i].ischecked){
            count++;
        }
        if(count==shop_good.length){
            thisShop.ischecked=true;
            thisShop.style.backgroundPositionY="-20px";

        }
        else{
            thisShop.ischecked=false;
            thisShop.style.backgroundPositionY="0px";
        }
    }
}

// 加减函数
var addBtn = $('.add');
var minusBtn = $('.minus');
var totleMoney = $('.totle-money');
var totleNum =$('.totle-num');
var countStyle = $('.pay');
var deletes = $('.delete');
var inputs = $('.input-num');
var tips = $('#tips-store');
var moveStore = $('.move-store');
var tipsDel = $('#tips-del');
var selectOnly = $('#select-only');
var selectYes = tipsDel.getElementsByTagName('a')[0];
var selectNo = tipsDel.getElementsByTagName('a')[1];
var selectclose = tipsDel.getElementsByClassName('del-close')[0];
addEvent(selectYes,'click',function () {
    var Tag = this.parentElement.previousElementSibling.innerHTML;
    if(/这些/.test(Tag)){
        tipsDelAllClose();
    }else{
        tipsDelClose();
    }
});
addEvent(selectNo,'click',function () {
    Del_hide();
});
addEvent(selectclose,'click',function () {
    Del_hide();
});

for(var i =0;i<addBtn.length;i++){
    addEvent(addBtn[i],'click',add);
    addEvent(addBtn[i],'click',countMoney_Num_Style);
    addEvent(addBtn[i],'click',inputChange);
    addEvent(minusBtn[i],'click',minus);
    addEvent(minusBtn[i],'click',countMoney_Num_Style);
    addEvent(minusBtn[i],'click',inputChange);
    addEvent(moveStore[i],'click',function () {
        var ul =  this.parentElement.parentElement;
        var ul_father =ul.parentElement;
        ul_father.removeChild(ul);
        if(ul_father.getElementsByTagName('ul').length ==0){
            ul_father.parentElement.removeChild(ul_father);
        }
        if(counter.offsetTop<client().height){
            follow.style.display = 'none';
        }
        countMoney_Num_Style();
        tips_show('已移入收藏夹');
    })
    deletes.isChoose =null;
    addEvent(deletes[i],'click',function () {
        deletes.isChoose = this;
        tipsDel.style.padding = "20px 20px 20px 30px";
        tipsDel.getElementsByTagName('div')[1].innerHTML = '确认要删除该宝贝吗？'
        tipsDel.style.display = 'block';
        selectOnly.style.display = 'block';
        animation(tipsDel,{left:(client().width/2-190),width:340,height:100},function () {
            for(var i =0;i<tipsDel.children.length;i++){
                tipsDel.children[i].style.display = 'block';
            }
        },5);
    } );
    function tipsDelClose() {
        obj = deletes.isChoose;
            var ul =  obj.parentElement.parentElement;
            var ul_father =ul.parentElement;
            ul_father.removeChild(ul);
            if(ul_father.getElementsByTagName('ul').length ==0){
                ul_father.parentElement.removeChild(ul_father);
            }
            if(counter.offsetTop<client().height){
                follow.style.display = 'none';
            }
            countMoney_Num_Style();
            Del_hide();
    }

    function Del_hide() {
        selectOnly.style.display = 'none';
        for(var i =0;i<tipsDel.children.length;i++){
            tipsDel.children[i].style.display = 'none';
        }
        tipsDel.style.padding = "0";
        animation(tipsDel,{left:(client().width)/2,width:0,height:0},function () {
            tipsDel.style.display = 'none';
        },10,10);
    }
    function tipsDelAllClose() {
        for(var j=0;j<good.length;j++){
            if(good[j].ischecked){
                var ul = good[j].parentElement.parentElement;
                var ul_father =ul.parentElement;
                ul_father.removeChild(ul);
                j--;
                if(ul_father.getElementsByTagName('ul').length==0){
                    ul_father.parentElement.removeChild(ul_father);
                }
                if(counter.offsetTop<client().height){
                    follow.style.display = 'none';
                }
                if(shop.length == 0){
                    for(var k=0;k<select_all.length;k++){
                        select_all[k].getElementsByClassName("select-all")[0].style.backgroundPositionY="0px";
                        select_all[k].ischecked = false;
                    }
                }
            }
        }
        Del_hide();
        countMoney_Num_Style();
    }
    addEvent(inputs[i],'input',function () {
        var num = this.value;
        if(isNaN(num)){
            if(/^\d+/.test(num)){
                var arr = num.split('');
                var del = arr.pop();
                tips_show('“'+del+'” 不是一个数字哦');
                this.value = parseInt(arr.join(''));
            }else{
                this.value = 1;
            }
        }else if(num - parseInt(num) >0){
            this.value = parseInt(num);
        }
    });
    addEvent(inputs[i],'input',inputChange);
}

function tips_show(text) {
    tips.innerHTML = text;
    tips.style.display = 'block';
    animation(tips,{opacity:0.8},function () {
        setTimeout(function () {
            animation(tips,{opacity:0},function () {
                tips.style.display = 'none';
            })
        },1000)
    })
}

function inputChange() {
    var add = this.parentNode.getElementsByClassName('add')[0];
    var minus = this.parentNode.getElementsByClassName('minus')[0];
    var input = this.parentNode.querySelector('input');
    var span = this.parentNode.querySelector('span');
    var num = input.value;
    if(num >10){
        num = 10;
        add.style.background = '#F0F0F0';
        span.style.display = 'block';
        span.innerHTML = '限购10件';
        input.value = num;
    }else if(num <1){
        num = 1;
        minus.style.background = '#F0F0F0';
        span.style.display = 'block';
        span.innerHTML = '仅限1件起售';
        input.value = num;
    }else if(num == 1){
        minus.style.background = '#F0F0F0';
        span.style.display = 'block';
        span.innerHTML = '仅限1件起售';
    }else if(num ==10){
        add.style.background = '#F0F0F0';
        span.style.display = 'block';
        span.innerHTML = '限购10件';
    }else{
        minus.style.background = 'lightgrey';
        add.style.background = 'lightgrey';
        span.style.display = 'none';
    }
}

function add() {
   var valueTag = this.previousElementSibling.value;
   valueTag++;
   if(valueTag>10){
       return;
   }
   this.previousElementSibling.value = valueTag;
    money(this,valueTag);
}

function minus() {
    var valueTag = this.nextElementSibling.value;
    valueTag--;
    if(valueTag<=0){
        return;
    }
    this.nextElementSibling.value = valueTag;
    money(this,valueTag);
}
function money(obj,num) {
   var priceStr = obj.parentElement.previousElementSibling.getElementsByClassName('price')[0].innerHTML;
   var price = parseFloat(priceStr.substr(1));
   var money = (num * price).toFixed(2);
   obj.parentElement.nextElementSibling.getElementsByClassName('money')[0].innerHTML = '￥'+money;
}

function countMoney_Num_Style() {
    var TotleMoney = 0.00;
    var TotleNum = 0;
    var styleCount = 0;
    for(var i =0;i<good.length;i++){
        if(good[i].ischecked){
            TotleMoney +=parseFloat((good[i].parentElement.parentElement.getElementsByClassName('money')[0].innerHTML).substr(1));
            TotleNum +=parseFloat(good[i].parentElement.parentElement.getElementsByTagName('input')[0].value);
            styleCount++;
        }
    }
    for(var i =0;i<totleMoney.length;i++){
        totleMoney[i].innerHTML = TotleMoney.toFixed(2);
        totleNum[i].innerHTML = TotleNum;
    }

    for(var i =0;i<countStyle.length;i++){
        if(styleCount >=1){
            countStyle[i].style.cursor = 'pointer';
            countStyle[i].style.background = '#FF4400';
        }else {
            countStyle[i].style.cursor = 'not-allowed';
            countStyle[i].style.background = '#AAAAAA';
        }
    }
}

var deleteAll = $('.delete-all');
for(var i=0;i<deleteAll.length;i++) {
    addEvent(deleteAll[i], 'click', function () {
        deleteAll.isclick = true;
        var selectNum = 0;
        for (var j = 0; j < good.length; j++) {
            if (good[j].ischecked) {
                selectNum++;
            }
        }
        if(selectNum ==0){
            tips_show('请勾选以进行批量删除');
        }
        else {
            tipsDel.style.padding = "20px 20px 20px 30px";
            tipsDel.getElementsByTagName('div')[1].innerHTML = '确认要删除这些宝贝吗？'
            tipsDel.style.display = 'block';
            selectOnly.style.display = 'block';
            animation(tipsDel,{left:(client().width/2-190),width:340,height:100},function () {
                for(var i =0;i<tipsDel.children.length;i++){
                    tipsDel.children[i].style.display = 'block';
                }
            },5);
        }
    });
}




// 右上角广告部分
var ad = document.getElementsByClassName('Advertisement')[0];
ad.isShown = false;
ad.onmousemove = function (ev) {
    var x =ev.clientX - ad.offsetLeft;
    var y =ev.clientY - ad.offsetTop;
    if(x-100>y){
        ad.querySelector('img').style.width = '100%';
        ad.querySelector('img').style.zIndex = '1';
    }
    else if(x<y){
        ad.querySelector('img').style.width = '50%';
        ad.querySelector('img').style.zIndex = '-1';
    }
}
ad.onmouseout = function () {
    ad.querySelector('img').style.width = '50%';
    ad.querySelector('img').style.zIndex = '-1';
}