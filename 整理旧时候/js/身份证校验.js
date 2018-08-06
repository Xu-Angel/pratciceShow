var div=document.getElementsByTagName('div')[0];
var input=document.getElementsByTagName('input')[0];
document.getElementsByTagName('input')[1].onclick=test;
function test() {
    //余数0 1 2 3 4 5 6 7 8 9 10
    var yushu='012345678910';
    //对应身份证最后一位1 0 X 9 8 7 6 5 4 3 2
    var last=['1','0','X','9','8','7','6','5','4','3','2'];
    //对应系数分别为：7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 ；
    var xishu=['7','9','10','5','8','4','2','1','6','3','7','9','10','5','8','4','2'];
    var shenfenzheng=input.value;
    //第一步将前面的身份证号码17位数分别乘以不同的系数
    //将身份证字符串转为数组；只要17位
    var shenfenzhengArr=shenfenzheng.split('').slice(0,17);
    console.log(shenfenzhengArr);
    //将这17位数字和系数相乘的结果相加
    var num=0;
    for (var i=0;i<17;i++){
        num+=shenfenzhengArr[i]*xishu[i];
        console.log(num);
    }
    //用加出来和除以11，看余数是多少；
    var shenfenzhengyushu=num%11;
    // console.log(shenfenzhengyushu)
    //通过对应规则比较,找出余数在规则中的索引
    var yushuIndex=yushu.indexOf(shenfenzhengyushu);
    console.log(yushuIndex);
    //与身份证最后一位数的规则比较
    last[yushuIndex]==shenfenzheng[17]?div.innerText='是一个真身份证':div.innerText='是一个假身份证';
}

