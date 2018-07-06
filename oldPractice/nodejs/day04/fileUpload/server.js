var express = require("express");
var fs = require("fs")
var app = express();
var router = express.Router();
var formidable = require('formidable');//主要用于文件上传的中间件

router.get("/",(req,res)=>{
    fs.readFile("./index.html",(err,content)=>{
        if(err){
            console.log(err);
            return;
        }
        res.end(content);
    })
})

router.post("/fileupload",(req,res)=>{
    //获取浏览器提交上来的文件
    var form =new formidable.IncomingForm();
    //设置form对象的uploadDir，只需要设置后，上传的文件会自动存储到指定的目录中
    form.uploadDir = "./static";
    form.keepExtensions = true;

    form.parse(req,function(err, fields, files){
      //fields 指表单输入的内容，files指上传文件的信息
      console.log(fields,files);
      fie=fields;fil=files;
        fs.renameSync(files.photo.path,"./static/"+files.photo.name);

        res.end('d')
      })
});


app.use("/",router)
app.listen(8888)