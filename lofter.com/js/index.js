/*
 * @Author: junjie lai
 * @Date:  2017/11/26
 * @Last Modified by: junjie lai
 * @Last Modified time: 2017/11/26
 */
window.onload = function () {

    (document.getElementById("gtotop").onclick = function smoothscroll(){
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    })();

    //infinite loading
    (function () {
        var isLoading = false;
        var isEnd = false;

        var triggerDistance = -10;

        var container = document.getElementById("container");
        var loadBtn = document.getElementById("load");
        console.log(container);

        function fatchData(){
            var distance = loadBtn.getBoundingClientRect().bottom - window.innerHeight;
            if (!isLoading && !isEnd && distance < triggerDistance){
                isLoading = true;
                // 添加数据
                setTimeout(function () {
                    var dataelse = document.getElementsByClassName("media")[0].cloneNode(true);

                    container.appendChild(dataelse);
                },500);

                console.log("loading,别急");

                //加载完后
                isLoading = false;

                //无数据
                if (isEnd){
                    console.log("没有数据了");
                    isEnd = true;
                }
            }
        }

        window.addEventListener("scroll", fatchData);

    })();

};


