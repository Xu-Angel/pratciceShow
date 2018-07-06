
// 大于320屏幕设备缩放页面
var winw=$(window).width(),
    winh=$(window).height(),
    scale=winw/320;
autoScale(scale);
$(window).resize(function(){
    winw=$(window).width();
    winh=$(window).height();
    scale=winw/320;
    autoScale(scale);
});
function autoScale(is){
    $('.wrap').css({
        'width':'320px',
        'overflow':'hidden',
        '-webkit-transform':'scale('+is+')',
        'transform':'scale('+is+')',
        '-webkit-transform-origin':'0px 0px 0px',
        'transform-origin':'0px 0px 0px'
    });
    $('.pop').css({
        '-webkit-transform':'scale('+is+')',
        'transform':'scale('+is+')',
        '-webkit-transform-origin':'center 0px 0px',
        'transform-origin':'center 0px 0px'
    });
    $('html,body').css(
        'height',$('.wrap').height()
    );
}
var mask=document.querySelector('.mask');
var closeBtn=document.getElementsByClassName('pclose')[0];
closeBtn.addEventListener('click',function () {
    this.parentElement.style.display=' none';
    mask.style.height=0+'px';
});
var logBtn=document.querySelector('#dologin');
var pop=document.querySelector('.pop');
logBtn.addEventListener('click',function(){
    mask.style.height=2000+'px';
    pop.style.display='block';
})

