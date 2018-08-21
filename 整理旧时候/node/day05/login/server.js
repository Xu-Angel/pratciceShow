var express = require("express");
var user = require("./config").user;
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
app.use(express.static("./static"));
app.use(bodyParser());
var router = express.Router();

router.get("/",(req,res)=>{
    fs.readFile("./index.html",(err,content)=>{
        if(err){
            console.log(err);
            return;
        }
        res.end(content);
    })
})

//处理注册逻辑
router.post("/register",(req,res)=>{
    //检查是否重名
    user.find({username:req.body.username},(err,data)=>{
        if(err){
            console.log(err);
            res.end("0");
            return ;
        }
        if(data.length){
            res.end("0");
            return;
        }
        user.create({username:req.body.username,password:req.body.password},(err,data)=>{
            if(err){
                console.log(err);
                res.end("0");
                return;
            }
            res.end("1")
        })
    })
})
router.post("/login",(req,res)=>{
    user.find({username:req.body.username,password:req.body.password},(err,data)=>{
        if(err){
            console.log(err);
            res.end("0");
            return ;
        }
        if(data.length){
            res.end("1");
            return;
        }

    })
})



app.use("/",router);
app.listen(8888)