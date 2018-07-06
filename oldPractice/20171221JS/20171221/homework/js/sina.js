/*
 * @Author: Angel
 * @Date: 2017-12-21 19:13:14
 * @Last Modified by: 1049547382@qq.com
 * @Last Modified time: 2017-12-21 19:22:17
 */

/*=============sina==================*/
document.write(Date());
var left=document.getElementsByClassName('ul-left')[0];
var leftlis=left.firstChild;
var ll=left.childNodes[0];
var aa=left.lastElementChild;
var gg=left.firstElementChild;
var nn=left.nodeName;
var tt=left.nodeValue;
var op=left.cloneNode(true);
var yp=left.cloneNode(false);
var oo=left.firstChild.nodeValue;
var right=document.getElementsByClassName('ul-right')[0];
var rigtLis=right.getElementsByTagName('li');
ll.appendData('12312313');
ll.insertData(3,'dfdf');
// var ulSons=document.getElementsByClassName('ul-son');
for(var i=0;i<leftlis.length;i++){
    console.warn(leftlis);
     console.log(ll);
     console.log(11)//childen = li数组  ==lastElementChild;       firstChild=childNotes[0]
    console.log(aa);
    console.log(11)
    console.log(gg);
    console.log(11)

    console.log(nn);
    console.log(11);
    console.log(tt);
    console.log(11);
console.log(oo);
console.log(11);
console.log(op);
console.log(yp);
console.log(16 + "Volvo");

// var oop;
    console.log(oop);  //ss
// var oop;
    console.log(oop);//ss
var oop=444;
    console.log(oop);//444
var oop=777;
    console.log(oop);//777
var oop='sfa        sdf';

console.log(oop);//ss
    document.write(oop);
}
document.write('dfdsafwa\dsfdsaf');
var Angel={name:'Angel',age:'18',height:'188cm'}
console.log(Angel);             //{name:'Angel',age:'18',height:'188cm'}
console.log(Angel.name);   //Angel
console.log(Angel['name']);    //Angel
Angel=null;
var cars='iii';
var xxx;
console.log(xxx);   //undefined
console.log(cars);    //iii
cars=null;
console.log(cars);            //null
console.log(Angel);  //null
// person={name:'11',age:'2'};
//
// var p1 = new Person();
//
// p1.name = 'zhangsan';
//
// p1.age = 30;
//
// var p2 = p1;
//
//
//
// function person(){
// }
// var p1 = new person();
// p1.name= 'zhangshan';
//
// var p2= p1;//对象之间赋值，现在p1 和 p2指向的是同一个内存空间
// //  alert(p2.name);
// var p2 = 'apple';　//将p2的值发生改变会影响p1的值　
// //  alert(p1.name);
//
// p2 = null ;//这里是指将p2的栈内存清除了，但是p2指向的堆内存还是存在！
// //   alert(p2.name);
// alert(p1.name);//所以这里可以输出结果！

// leftlis.onmouseover=function () {
//     alert()
// }
// for(var i=0;i<leftlis.length;i++){
//     leftlis[i].index=i;
//     // alert(leftlis[i].index)
//     // console.log(222);
//     // console.log(ulSons);
//     leftlis[i].onmouseover=function () {
//
//         // console.log(this.index)
//         // this.getElementsByTagName('ul')[0].style.display='block';
//         // console.log(333);
//         for ( var j=0;j<ulSons.length;j++){
//             ulSons[j].style.display='none';
//             // console.log(111);
//         }
//        console.log(this.index);
//         ulSons[this.index].style.display='block';
//
//     }
    // leftlis[i].onmouseout=function () {
    //     this.getElementsByTagName('ul')[0].style.display='none';
//     // }
// }
for(var i=0;i<rigtLis.length;i++){
    rigtLis[i].onmouseover=function(){
        this.getElementsByTagName('ul')[0].style.display='block';
    }
    rigtLis[i].onmouseout=function () {
        this.getElementsByTagName('ul')[0].style.display='none';
    }
}
// for(var i=0;i<rigtLis.length;i++){
//     // rigtLis[i].onmouseover=function(){
//     //     this.getElementsByTagName('ul')[0].style.display='block';
//     // }
//     console.log(111);
//     rigtLis[i].onmouseout=function () {
//         this.getElementsByTagName('ul')[0].style.display='none';
//     }
// }

