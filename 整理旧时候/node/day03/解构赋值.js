// let a=2,b=2,c=3;
// let [a,b,c]=[1,2,3]
/* 上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。 */
let [foo,[[bar]],baz] = [1,[[2]],[3]];
let [,,third]=['foo','bar','baz'];console.log(third);
let [x,,y]=[1,2,3];console.log(x,y);
let [head,...tail]=[1,2,3,4];console.log(head,tail);
let [f,g,...z]=['a']   ;console.log(f,g,z);
//如果解构不成功，变量的值就等于undefined。
/* let [foo] = [];
let [bar, foo] = [1]; */
/* 以上两种情况都属于解构不成功，foo的值都会等于undefined。 */

// http://es6.ruanyifeng.com/#docs/destructuring    更多详细