const sha1 = require("sha1");
const getRawBody = require("raw-body");
const util = require("../libs/util");
const xml2js = require("xml2js");
const Wechat = require("./wechat");

module.exports=function(opts){
    var wechat = new Wechat(opts)
    return function *(next){
        var that = this;
        //将token、timestamp、nonce三个参数进行字典序排序
        const token = opts.token;
        const timestamp = this.query.timestamp;
        const nonce = this.query.nonce;
        const signature = this.query.signature;
        const echostr = this.query.echostr;
        let str = [token,timestamp,nonce].sort();
        //将三个参数字符串拼接成一个字符串进行sha1加密
        str = str.join("");
        const sha = sha1(str);
        //开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        if(this.method=="GET"){
            if(sha===signature){
                this.body = echostr+"";
            }else{
                this.body = "wrong"
            }
        }
        //其他消息
        else if(this.method=="POST"){
            //还是要验证签名
            if(sha!=signature){
                this.body="wrong";
                return false;
            }
            //把请求主体信息序列化
            var data = yield getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            });
            //把xml转成json
            var content = yield new Promise(function(resolve,reject){
                xml2js.parseString(data,{trim:true},function (err, result) {
                    if(err) {reject(err)}
                    else {resolve(result)}
                })
            });
            //把json美化
            var message = util.formatJson(content.xml);
            this.weixin = message;
            wechat.reply.call(this);
        }
    }
}