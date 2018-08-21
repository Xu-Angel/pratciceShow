const fs = require('fs'); // 引入fs模块  
  //2.0 获取到命令行中的源文件和目标文件路径
let arr = process.argv.slice(2);


let path = arr[0];//删除文件夹
function deleteall(path) {  
    let files = [];  
    if(fs.existsSync(path)) {  
        files = fs.readdirSync(path);  
        files.forEach(function(file, index) {  
            let curPath = path + "/" + file;  
            if(fs.statSync(curPath).isDirectory()) { // 文件夹
                deleteall(curPath);  
            } else { // 文件
                fs.unlinkSync(curPath);  
            }  
        });  
        fs.rmdirSync(path);  
    }
}
deleteall(path);