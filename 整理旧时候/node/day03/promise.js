const pro=new Promise(function(resolve,reject){
 setTimeout(resolve,5000,5)
});
pro.then(function(message){
   console.log(message);
});
/* var readStream=fs.readFileStream(path);
var writeStream=fs.readFileStream(path);
readStream.pipe(writeStream); */


/* 
var server= net.createServer((socket)=>{
socket.on('data',()=>{})
socket.on('error',()=>{})
})
server.listen(9999,'127.0.0.1',()=>{
})
var socket=net.createConnection(9999,'127.0.0.1');
socket.on('data',()=>{})
socket.write(''); */