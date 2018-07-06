var cirUl=document.getElementsByClassName('select-circle')[0];/*圆ul*/
var lisCir=cirUl.getElementsByTagName('li');/*圆li*/
var imgUl=document.getElementsByClassName('slide-pic')[0];/*图片ul*/
var lisImg=imgUl.getElementsByTagName('li');/*图片li*/
/*-----最笨*/

    for(var i=0;i<lisCir.length;i++){
        lisCir[i].index=i;
        lisCir[i].onclick=function () {
            for(var j=0;j<lisCir.length;j++){
                lisCir[j].className='';
                lisImg[j].style.display='none';
            }
            // lisImg[0].style.display='block';
            this.className='active';
           lisImg[this.index].style.display='block';
            console.log(11);
        }
    }

