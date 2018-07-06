const http=require('http');
const fs=require('fs');
const server=http.createServer();
server.on('request',(req,res)=>{
console.log(req.url);
console.log(req.method);
// console.log(req)
//设置响应报文头
res.setHeader('Content-Type','text/html;charset=utf-8');
// res.setHeader('Content-Length',contet.toString().length)
//写入
const content=fs.readFileSync('./index.html');
res.write(content);
res.end('.');
});
server.listen(8888);
