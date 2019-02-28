var path = require("path"); //路径相关的操作

console.log(path.dirname(__filename));//获取目录
console.log(path.basename(__filename));//获取文件名.扩展名
console.log(path.extname(__filename));//获取扩展名
console.log(path.format({ root: 'e:\\',
dir: 'e:\\GitKraken\\pratciceShow\\整理旧时候\\node\\day01',
base: '03path.js',
ext: '.js',
name: '03path' }));
console.log(path.parse(__filename));//将一个路径转化成js对象

// path.format();//将js对象转换成路径
console.log(path.join(__dirname,"node_nodules","01global.json"));//拼接多个路径成一个路径，使用广泛

