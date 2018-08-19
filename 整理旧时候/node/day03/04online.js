const http=require('http'),fs=require('fs'),querystring=require('querystring'),path=require('path');
const server=http.createServer();
server.on('request',(req,res)=>{
   //把请求路径和参数分开存放
   const url=req.url;
   const index=url.indexOf('?');
   let pathParse='',params=null;
   if(index<0){pathParse=url.slice(1)}else{pathParse=rul.slice(1,index);params=querystring.parse(url.slice(index+1))}
    //  const content=fs.readFileSync(path.join(__dirname,'static',pathParse));
    try{
      const content=fs.readFileSync(path.join(__dirname,'static',pathParse));
      res.end(content);
    }catch(e){
console.log(e);
return;
    }
/*      const content=fs.readFile(path.join(__dirname,'static',pathParse),(error,content)=>{
if(error){console.log(error);return;}  res.end(content);//捕获异常
      console.log(content.toString());

     }); */


   
});
server.on('error',(error)=>{
console.log(error);
})
server.listen(8888);