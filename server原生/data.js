const express = require('express');
const app =  express();
const router = express.Router();
var data = [
  {
    "id": "guowei",
    "banner": "/image/c1.png",
    "cate": "果味",
    "detail": [
      {
        "thumb": "/image/c2.png",
        "name": "梨花带雨 3个"
      },
      {
        "thumb": "/image/c3.png",
        "name": "红枣 500g"
      },
      {
        "thumb": "/image/c4.png",
        "name": "奇异果 2个"
      },
      {
        "thumb": "/image/c4.png",
        "name": "奇异果 2个"
      },
      {
        "thumb": "/image/c3.png",
        "name": "红枣 500g"
      },
      {
        "thumb": "/image/c2.png",
        "name": "梨花带雨 3个"
      }
    ]
  },
  {
    "id": "shucai",
    "banner": "/image/c1.png",
    "cate": "蔬菜",
    "detail": [
      {
        "thumb": "/image/s4.png",
        "name": "瓜子 3个"
      },
      {
        "thumb": "/image/s5.png",
        "name": "芹菜 500g"
      },
      {
        "thumb": "/image/s6.png",
        "name": "小米"
      },
      {
        "thumb": "/image/s6.png",
        "name": "小米"
      },
      {
        "thumb": "/image/s5.png",
        "name": "芹菜 500g"
      },
      {
        "thumb": "/image/s4.png",
        "name": "瓜子 4个"
      }
    ]
  },
  {
    "id": "chaohuo",
    "banner": "/image/c1.png",
    "cate": "炒货",
    "detail": [
      {
        "thumb": "/image/c2.png",
        "name": "梨花带雨 3个"
      },
      {
        "thumb": "/image/c3.png",
        "name": "红枣 500g"
      },
      {
        "thumb": "/image/c4.png",
        "name": "奇异果 2个"
      },
      {
        "thumb": "/image/c4.png",
        "name": "奇异果 2个"
      },
      {
        "thumb": "/image/c3.png",
        "name": "红枣 500g"
      },
      {
        "thumb": "/image/c2.png",
        "name": "梨花带雨 3个"
      }
    ]
  },
  {
    "id": "dianxin",
    "banner": "/image/c1.png",
    "cate": "点心",
    "detail": [
      {
        "thumb": "/image/s4.png",
        "name": "瓜子 3个"
      },
      {
        "thumb": "/image/s5.png",
        "name": "芹菜 500g"
      },
      {
        "thumb": "/image/s6.png",
        "name": "小米"
      },
      {
        "thumb": "/image/s6.png",
        "name": "小米"
      },
      {
        "thumb": "/image/s5.png",
        "name": "芹菜 500g"
      },
      {
        "thumb": "/image/s4.png",
        "name": "瓜子 4个"
      }
    ]
  },
  {
    "id": "cucha",
    "banner": "/image/c1.png",
    "cate": "粗茶",
    "detail": [
      {
        "thumb": "/image/c2.png",
        "name": "梨花带雨 3个"
      },
      {
        "thumb": "/image/c3.png",
        "name": "红枣 500g"
      },
      {
        "thumb": "/image/c4.png",
        "name": "奇异果 2个"
      },
      {
        "thumb": "/image/c4.png",
        "name": "奇异果 2个"
      },
      {
        "thumb": "/image/c3.png",
        "name": "红枣 500g"
      },
      {
        "thumb": "/image/c2.png",
        "name": "梨花带雨 3个"
      }
    ]
  },
  {
    "id": "danfan",
    "banner": "/image/c1.png",
    "cate": "淡饭",
    "detail": [
      {
        "thumb": "/image/s4.png",
        "name": "瓜子 3个"
      },
      {
        "thumb": "/image/s5.png",
        "name": "芹菜 500g"
      },
      {
        "thumb": "/image/s6.png",
        "name": "小米"
      },
      {
        "thumb": "/image/s6.png",
        "name": "小米"
      },
      {
        "thumb": "/image/s5.png",
        "name": "芹菜 500g"
      },
      {
        "thumb": "/image/s4.png",
        "name": "瓜子 4个"
      }
    ]
  }
]

router.get("/mallData/",(req,res)=>{
  res.setHeader("Content-Type","text/plain;charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","x-requested-width,content-type");
  res.end(JSON.stringify(data));
});
app.use("/",router);
app.listen(80,console.log('seccess'));