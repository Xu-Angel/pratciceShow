//es6 Generator
//普通函数中不适用yield
function* fn(){
    yield "起床";
    yield "刷牙";
    yield "吃饭";
    return "去中软国际";
}

var newFn = fn();
console.log(newFn.next());
console.log(newFn.next());
console.log(newFn.next());
console.log(newFn.next());


function *aa(x){
    var y = 2*(yield (x+2));//y=2
    var z = yield (y/2);//z=7
    return x+y+z;
}

var newAa = aa(4);
console.log(newAa.next(1));//6
// console.log(newAa.next(7));//7
console.log(newAa.next(20));//20
console.log(newAa.next());//NaN






