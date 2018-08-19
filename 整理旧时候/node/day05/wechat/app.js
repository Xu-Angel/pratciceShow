const Koa = require("koa");
const app = new Koa();

const wechat = require("./wechat/middleware");//中间件
const config = require("./libs/config");//配置文件

app.use(wechat(config.wechat));

app.listen(80)