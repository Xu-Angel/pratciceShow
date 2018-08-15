function Tiger (weight,heigth,age){
    this.weight=weight;
    this.height=heigth;
    this.age=age;
    this.run=function(){
        alert('I can run')
        console.log(age,heigth,weight)
        console.log(this.weight)
    }
}
var a=new Tiger('200','100','10')
// console.log(a);
// a.run;
// a.run();
function Car(color,brand,price){
this.color=color;
this.brand=brand;
this.price=price;
this.run=function(){
console.log(brand)
}
}
var c=new Car('red','BMW','100')
console.log(c)
console.log(c.run)
c.run();
console.log(c.run())
