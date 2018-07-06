console.log(__filename);//当前文件的绝对路径
console.log(__dirname);//当前文件所在目录的绝对路径

function sum(a,b){
    return a+b;
}

function reduce(a,b){
    return Math.abs(a-b)
}


module.exports = {
    sum,
    reduce
}