 /* setTimeout(function () {
        location.href='http://www.baidu.com';
    },1000)*/
    function fac(val) {//计算阶乘 递归
        if(val==1){
            return 1;
        }
        return val*fac(val-1);
        // return val*arguments.callee(val-1);
    }
   console.log(fac(10)) ;
    set
