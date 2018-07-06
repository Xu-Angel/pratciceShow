/*
 * @Author: 
 * @Date: 
 * @Last Modified :
 * @Last Modified :
 */
/*第一个功能：点击展开
* content-nav height变为2rem>3.4rem
* entry-list height变为0
* entry-list-copy top变为0
*             点击收回
*content-nav height变为3.4rem>2rem
* entry-list height变为1.4rem
* entry-list-copy top变为-2.4rem
*  展开变为收起，箭头向上
        *     */
var contentNav=document.getElementsByClassName('content-nav')[0];
var entryList=document.getElementsByClassName('entry-list')[0];
var entryListCopy=document.getElementsByClassName('entry-list-copy')[0];
var entryBtn=document.getElementsByClassName('entry-btn')[0].getElementsByTagName('span')[1];
var entryArrow=document.getElementsByClassName('entry-btn')[0].getElementsByTagName('span')[0];
console.log(contentNav)
var isClick=false;
entryBtn.addEventListener('click',function () {
    isClick=!isClick;
    if(isClick){
        contentNav.style.height=3.4+'rem';
        entryList.style.height=0;
        entryListCopy.style.top=0;
        this.innerText='收起';
        entryArrow.style.transform='rotate(0)';
    }else{
        contentNav.style.height=2+'rem';
        entryList.style.height=1.4+'rem';
        entryListCopy.style.top=-2.8+'rem';
        this.innerText='展开'
        entryArrow.style.transform='rotate(180deg)';
    }

});
/*第二个功能： 选项卡类型
* 新闻选项卡
* */
var newCon=document.querySelector('.content-news-content');
var newUls=newCon.children;/*新闻列表*/
var tabCon=document.querySelector('.content-news-container');
var newTabs=tabCon.firstElementChild.children;
for(var i = 0; i < newUls.length; i++ ){
    newTabs[i].index=i;
    console.log('444')
      newTabs[i].addEventListener('click',function () {
          //清空
          for(var j = 0; j < newUls.length; j++ ){
          newTabs[j].classList.remove('now-tab');
              newUls[this.index].style.transition='';
              newUls[j].style.transform='translateX(100%)';

          }
          //改变tab样式
          this.classList.add('now-tab');

          newUls[this.index].style.transition='transform  0.5s ease';
          newUls[this.index].style.transform='translateX(0)';
          //显示对应新闻列表
      })

}
/*英雄列表选项卡*/
var heroTabs=document.getElementsByClassName('hero-nav')[0].children;
var heroUls=document.getElementsByClassName('hero-container-content')[0].children;
for(var i = 0; i < heroTabs.length; i++ ){
    heroTabs[i].index=i;
    console.log('444')
    heroTabs[i].addEventListener('click',function () {
        //清空
        for(var j = 0; j < heroTabs.length; j++ ){
            heroTabs[j].classList.remove('now-tab');
            heroUls[j].style.transition='left  0.1s ease';
            heroUls[j].style.left=100 +'%';

        }
        //改变tab样式
        this.classList.add('now-tab');

        heroUls[this.index].style.transition='left  0.5s ease';
        heroUls[this.index].style.left=0;
        //显示对应新闻列表
    })

}

/*第三个功能： 首页模态框*/

var popClose=document.querySelector('.pop-close');
var motai=popClose.parentElement.parentElement;
popClose.addEventListener('click',function () {
     motai.style.opacity=0;
     motai.style.transform='scale(0, 0)';
});

/*第四个功能：加载更多内容*/
/*
var loadBtn=document.getElementsByClassName('load-more')[0];
var contentVideoCon=document.getElementsByClassName('video-container')[0];
var videoCont=document.getElementsByClassName('video-container-content')[0];
var falseData=videoCont.cloneNode(true);
contentVideoCon.appendChild(falseData);
*/
