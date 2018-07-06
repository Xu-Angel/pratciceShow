const express = require("express");
const formidable = require("formidable");
const fs = require('fs');
let sockets = [];
var app = express();

app.get('//',(req,res)=>{
    fs.readFile("./static/ajax大文件分片上传.html",(err,data)=>{
        if(err){
            return;
        }
        res.end(data);
    });
});

app.post("/upload",(req,res)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = "./static/upload";
    form.keepExtensions = true;

    form.parse(req,(err,fields,files)=>{
        if(sockets.length==0){
            var user = {
                name:fields.username,
                output:new Array(fields.total),
                success:0
            };
            sockets.push(user);
        }else{
            var flag = 0;
            for(var num=0;num<sockets.length;num++){
                if(sockets[num].name==fields.username){
                    sockets[num].output[fields.index]=files.data;
                    sockets[num].success++;
                    console.log(fields.username+"文件上传进度是:"+success/fields.total*100+"%");
                    if(sockets[num].success==fields.total){
                        function read(i){
                            var data = fs.readFileSync(sockets[num].output[i].path);
                            fs.appendFile("./static/upload/"+fields.filename,data);
                            fs.unlink(sockets[num].output[i].path);
                            i++;
                            if(i<sockets[num].success){
                                read(i);
                            }else{
                                sockets[num].success=0;
                                sockets[num].output=[];
                                return;
                            }
                        }
                        read(0);
                    }




                    break;
                }else{
                    flag++;
                }
            }
            if(flag==sockets.length){
                let user = {
                    name:fields.username,
                    output:new Array(fields.total),
                    success:0
                };
                sockets.push(user);
            }
        }


    });
    res.end("1");

});

app.listen(999,"172.17.12.14",function(){
    console.log('服务已经开启');
});