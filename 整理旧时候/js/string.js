 var shenfenzhenglast='1 0 X 9 8 7 6 5 4 3 2';


    var yushu='0 1 2 3 4 5 6 7 8 9 10';
    var yuSHu=yushu.replace(/ /g,',');
    var ShenFenZhengLast=shenfenzhenglast.replace(/ /g,'|');
    console.log(ShenFenZhengLast);
    console.log(ShenFenZhengLast.charAt(1));
    console.log(yuSHu);
    console.log(yushu.charAt(1));
    var xishu='7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2';
    var sfzLast=shenfenzhenglast.split(' ').join('');
    console.log(sfzLast);
    var yushuStr=yushu.split(' ').join('');
    var xishuStr=xishu.split(' ').join('');
    console.log(sfzLast.substr(1,4));   //0x98 第二个参数 表示长度
    console.log(sfzLast.substring(1,4));//0x9    第二个参数 截止索引（取不到）
    console.log(yushuStr.indexOf(10));
    console.log(yushuStr);
    console.log(xishuStr.indexOf('10'));
    console.log(xishuStr.lastIndexOf(10));
    console.log(xishuStr.match(/10/g));
    console.log(xishuStr.concat(yushuStr,'fsdfsdfsdf','fsdfdsf'))
    console.log(xishuStr.charAt(4))
    console.log(yushu.valueOf())
