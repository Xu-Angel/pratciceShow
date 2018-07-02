/*
 * @Author: 
 * @Date: 
 * @Last Modified :
 * @Last Modified :
 */
 var carwraps=document.getElementsByClassName('carwrap');

var nullCar=document.getElementsByClassName('null-car')[0];
 for(var tt=0;tt<carwraps.length;tt++){
     factory(carwraps[tt]);
 }


/*---------单个公司的计算函数  start----------*/

function factory(factory) {
    var flagIndex=0;
    var alltxt=factory.getElementsByClassName('all-txt')[0];
    // console.log(carwrap)
    var spans=factory.getElementsByClassName('span-def');
    console.log(spans)
    var is=factory.getElementsByTagName('i');
//计算结算的件数
    var sle=factory.getElementsByClassName('sle-txt')[0];
    var counSle=0;

    /*选中
    this.classList='span-check';
    is[this.index].style.display='block';*/

    /*取消
    this.classList='span-no';
    is[this.index].style.display='none';*/
    var num=0;
check(flagIndex);
    /*下面两个选中与取消*/
    function check(ob){
        for(var i = 1; i < spans.length; i++ ){

            spans[i].index=i;
            spans[i].flag=true;//每个
            /*var flag=true;闭包穿进去*/
            //判断添加当前商品价格到总价
            spans[i].addEventListener('click',putAll);
            spans[i].onclick=function () {

                if(this.flag){
                    this.classList.add('span-check');
                    is[this.index].style.display='block';
                    counSle++;
                    this.flag=false;
                    num++;
                }else{
                    this.classList.remove('span-check');
                    is[this.index].style.display='none';
                    counSle--;
                    this.flag=true;
                    num--;
                    flag--;//既不是全选也不是全部选 的判断
                }
                if(num==spans.length-1){
                    is[0].parentNode.classList.add('span-check');
                    is[0].style.display='block';
                    flag++;

                }else if(num==0){
                    flag++;
                }else{
                    is[0].style.display='none';
                    is[0].parentNode.classList.remove('span-check');
                }
                sle.innerText=counSle ;
            }
           /* if(spans[i].flag&&ob<0){
                is[0].style.display='block';
                spans[0].classList.add('span-check');
                spans[i].flag=false;
                flag++;
            }*/
            spans[0].addEventListener('click',pAll);
            spans[0].onclick=function () {

                if( flag%2!=0){

                    for(var i = 0; i <is .length; i++ ){
                        is[i].style.display='block';
                        is[i].parentNode.classList.add('span-check');
                        is[i].parentNode.flag=false;
                        num=spans.length-1;
                    }
                    counSle=is.length-1;
                    sle.innerText=counSle ;
                }
                else{
                    for(var i = 0; i <is .length; i++ ){
                        is[i].style.display='none';
                        is[i].parentNode.classList.remove('span-check');
                        is[i].parentNode.flag=true;
                        num=0
                    }
                    counSle=0;
                    sle.innerText=counSle ;
                }
                flag++;
            };
        }


    }
   /*总商品按钮*/
    var flag=1;

    /*计算价格*/

    //直接输入数字
    var inputs=factory.getElementsByTagName('input');
    for(var ip=0;ip<inputs.length;ip++){
        inputs[ip].index=ip;
        inputs[ip].addEventListener('change',function () {         //input判断两次
           var parice=parseFloat( this.parentElement.parentElement.previousElementSibling.getElementsByTagName('p')[0].innerText.substr(0,6));
           var total=this.parentElement.parentElement.nextElementSibling.getElementsByTagName('p')[0];
           //获取原来的值 parseFloat(total.innerText);
            var old=parseFloat(total.innerText);

           // console.log(parice)
           // 计算前判断数值
            if(isNaN(this.value)){
                this.value=1;
                total.innerText= parseFloat(this.value)*parice + '.00元';

                // alltxt.innerText=change +parseFloat(alltxt.innerText)+ '.00元';

                // this.value%1?this.value=Math.round(this.value):this.value=oldvalue;
                // alert('请输入正确件数');
                return;
            }else if (this.value%1){
                this.value=Math.round(this.value);

            }else{
                this.value=parseInt(this.value);
            }
  if(this.value>50){
        alert('最多购买五十件');
        this.value=50;
    }else if(this.value<1){
        alert('最小件数为一件');
        this.value=1;
    }
//>0?parseFloat(total.innerText)-old:
           total.innerText= parseFloat(this.value)*parice + '.00元';
    var change=   parseFloat(total.innerText)-old;
            console.log(old)
            console.log(change)
           //判断复选框是否勾选上，如果勾选上
           //  console.log(spans[this.index + 1])
           //  console.log(alltxt.innerText)
           //  console.log(spans[this.index + 1].className.length)
            // console.log(spans[this.index + 1].flag)
            if(spans[this.index + 1].className.length==19){
                //添加当前的金额去给
                     console.log(change)
                alltxt.innerText=change +parseFloat(alltxt.innerText)+ '.00元';


}

    })
}


    //点击加按钮
    var addBtn=factory.getElementsByClassName('add');
    var subBtn=factory.getElementsByClassName('sub');
    for(var o=0;o<subBtn.length;o++){
        console.log(555)
        subBtn[o].onclick=sub;
        addBtn[o].onclick=add;
        console.log(addBtn)
    }

    function add() {
        var price=parseFloat(this.parentElement.parentElement.previousElementSibling.getElementsByTagName('p')[0].innerText.substr(0,6));
        var count=this.previousElementSibling;
        var total=this.parentElement.parentElement.nextElementSibling.getElementsByTagName('p')[0];
        if(count.value>=50){
            alert('最多购买五十件');
            return;
        }else{
            count.value=parseFloat(count.value)+1;
            total.innerText=price*parseFloat(count.value) +'.00元';
        }
   //判断当前的check是否被选中；选中则添加金额到总价
        var gg=  this.parentElement.parentElement.parentElement.getElementsByClassName('span-def')[0].className.length;
        if(gg==19){
            alltxt.innerText=parseFloat(alltxt.innerText)+price + '.00元';
}

    }
    function sub() {

        var price=parseFloat(this.parentElement.parentElement.previousElementSibling.getElementsByTagName('p')[0].innerText.substr(0,6));
        var count=this.nextElementSibling;
        var total=this.parentElement.parentElement.nextElementSibling.getElementsByTagName('p')[0];
        if(count.value==1){
            console.log(count.value)
            console.log(2222)
            return;
        }else{
            count.value=parseFloat(count.value)-1;
            total.innerText=price*parseFloat(count.value) +'.00元';
        }
        //判断当前的check是否被选中；选中则添加金额到总价
        var gg=  this.parentElement.parentElement.parentElement.getElementsByClassName('span-def')[0].className.length;
        if(gg==19){
            alltxt.innerText=parseFloat(alltxt.innerText)-price + '.00元';
        }

    }

//计算每个选中商品价格
    function putAll() {
        //获取当前按钮下商品的total
        var total=parseFloat(this.parentElement.parentElement.getElementsByClassName('price')[0].innerText);
//获取结算价格文本
        var tag=0;

        if(this.flag){
            tag=parseFloat(alltxt.innerText)+total;
            alltxt.innerText=tag+'.00元';
        }else{
            console.log(total)
            tag=parseFloat(alltxt.innerText)-total;
            alltxt.innerText=tag+'.00元';
        }
    }
    function pAll() {
        var allPrice=factory.getElementsByClassName('price');

        var tag=0;
        // alltxt.innerText=tag+'元';
        if( flag%2!=0){
            for(var t=0;t<allPrice.length;t++){
                tag+=parseFloat(allPrice[t].innerText);
            }
            alltxt.innerText=tag+'.00元';
        }else{
            console.log(000);
            alltxt.innerText='0.00元';
            console.log(alltxt)
        }
    }


//删除商品操作
    var btnDel=factory.getElementsByClassName('btn-del');
    var item=factory.getElementsByClassName('item');
    var tb=factory.getElementsByClassName('car-tb')[0];
    var box=factory.getElementsByClassName('car-box')[0];
    for(var it=0;it<btnDel.length;it++){
btnDel[it].index=it;

        btnDel[it].addEventListener('click',function () {

            var gg=  this.parentElement.parentElement.parentElement.getElementsByClassName('span-def')[0].className.length;
            console.log(gg)
            var total=parseInt(this.parentElement.parentElement.previousElementSibling.getElementsByTagName('p')[0].innerText);
           if(! confirm('亲，确定要删除该商品吗？')) {
               // alert('已取消删除');
               return;
           }else{
               // alert('删除成功');
               this.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement);
              // alert('删除成功');

               flagIndex--;

            check(flagIndex);
        //  重新计算总价
            if( gg==19){
                console.log(7879)
                alltxt.innerText=parseInt(alltxt.innerText)-total>0?parseInt(alltxt.innerText)-total + '.00元':0  +'.00元';
                //重新计算件数
                counSle--;
                sle.innerText=counSle;
            }
               if(item.length==0){
                   factory.removeChild(tb);
                   factory.removeChild(box);
                   console.log( factory.previousElementSibling.className=='car-th')
                   console.log( factory.parentElement.children.length)


                   if( factory.previousElementSibling.className=='car-th'&&factory.parentElement.children.length==2){
                       // alert('购物车空空如也，快去购物吧！');
                       factory.parentElement.removeChild(factory.previousElementSibling);
                       factory.parentElement.removeChild(factory);
                       // console.log(11)
                       // 显示模态框预留位置
                       nullCar.style.display='block';
                       return;
                   }else{
                       factory.parentElement.removeChild(factory);

                   }
               };


          }
          check(flagIndex);

        })
    }

//移入收藏夹操作
    var btnFav=factory.getElementsByClassName('btn-fav');
    for(var ib=0;ib<btnDel.length;ib++) {
        btnFav[ib].addEventListener('click', function () {
            //弹出提示  已经移入收藏夹
            if (!confirm('亲，确定要收藏该商品吗？')) {
                // alert('已经取消收藏');
                return;
            } else {
                alert('收藏成功');
            }
            ;
            this.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement);
            var gg=  this.parentElement.parentElement.parentElement.getElementsByClassName('span-def')[0].className.length;
            var total=parseInt(this.parentElement.parentElement.previousElementSibling.getElementsByTagName('p')[0].innerText);

            //  重新计算总价
            if( gg==19){
                console.log(7879)
                alltxt.innerText=parseInt(alltxt.innerText)-total>0?parseInt(alltxt.innerText)-total + '.00元':0  +'.00元';
                //重新计算件数
                counSle--;
                sle.innerText=counSle;
            }
            flagIndex--;
            check(flagIndex);
            if (btnFav.length == 0) {
                factory.removeChild(tb);
                factory.removeChild(box)
                factory.parentElement.removeChild(factory);
            }
        })
    }
}
/*---------单个公司的计算函数  end----------*/



