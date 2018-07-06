

let path = require('path');
console.log(path.dirname(__filename));  //获取目录  C:\Users\Administrator\WebstormProjects\nodejs\day01
console.log(path.basename(__filename));    //获取文件名.扩展名  path.js
console.log(path.extname(__filename));  //获取扩展名   .js
console.log(path.parse(__filename));       //将第一个路径转化为JS对象  
// { root: 'C:\\',
//   dir: 'C:\\Users\\Administrator\\WebstormProjects\\nodejs\\day01',
//   base: 'path.js',
//   ext: '.js',
//   name: 'path' }

//path.format();//将JS对象转换成路径
// console.log(path.join(__dirname,"01global.js","global.js"));

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));

// 返回: '/foo/bar/baz/asdf');