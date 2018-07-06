//引入express包
var express = require("express");

//实例化一个express
var app = express();

//路由
//1.直接在app上点出get或者post即可实现路由
// app.get("/product/info",(req,res)=>{
//     res.setHeader("Content-Type","text/html;charset=utf8");
//     res.end("get1")
// });
// app.get("/product/price",(req,res)=>{
//     res.setHeader("Content-Type","text/html;charset=utf8");
//     res.end("post1")
// });
// app.get("/user/info",(req,res)=>{
//     res.setHeader("Content-Type","text/html;charset=utf8");
//     res.end("post1")
// });
// app.get("/user/login",(req,res)=>{
//     res.setHeader("Content-Type","text/html;charset=utf8");
//     res.end("post1")
// });

//2.把路由写在router上
var router = express.Router();
router.get("/info",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=utf8");
    res.end("product info")
});
router.get("/price",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=utf8");
    res.end("product price")
});

var userrouter = express.Router();
userrouter.get("/info",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=utf8");
    res.end("user info")
});
userrouter.get("/price",(req,res)=>{
    res.setHeader("Content-Type","text/html;charset=utf8");
    res.end("user price")
});

app.use("/product",router);
app.use("/user",userrouter);

app.listen(9999,"127.0.0.1",()=>{
    console.log("express  服务器开启成功！")
})


