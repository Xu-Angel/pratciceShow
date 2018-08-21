const http=require('http'),fs=require('fs');
const server=http.createServer();
server.on('request',(req,res)=>{
  console.log(req.url);
    let data='';
    if(req.url=='/index'){
        data='./index.html';
    }else if(req.url=='/login'){
        data='./login.html';
    }
    //设置响应头
    res.setHeader('Content-Header','text/html;chartset=utf-8');
    //写入
    const content=fs.readFileSync(data);
    res.write(content);
});
server.listen(8888);