var fs = require("fs");

var args = {
    "-h":displayHelp,
    "-r":readFile
};

function displayHelp(){
    console.log("argument processer:",args);
}

function readFile(){
    fs.createReadStream(__filename).pipe(process.stdout);
}
//node 05argv.js -h
// process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。 第一个元素是 process.execPath。 如果需要访问 argv[0] 的原始值，参阅 process.argv0。 第二个元素将是正在执行的 JavaScript 文件的路径。 其余元素将是任何其他命令行参数。
process.argv.forEach((v, i) => console.log(`${i}: ${v}`))
if(process.argv.includes('-r')){
    args[process.argv[2]]();
}