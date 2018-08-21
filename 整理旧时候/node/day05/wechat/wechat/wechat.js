const axios = require("axios");//发请求
const request = require('request-promise-native');
const fs = require("fs");
const path = require("path");
const util = require("../libs/util")
const accessPath = path.join(__dirname,"..","libs","access.txt")
const prefix = "https://api.weixin.qq.com/cgi-bin/"//接口固定前缀
const api = {
    accessToken:prefix+"token?grant_type=client_credential",
    upload:prefix+"media/upload?"
};

function Wechat(opts){
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.fetchAccessToken();
    this.uploadMaterial(path.join(__dirname,"1.jpg"),"image")
}
//获取AccessToken
Wechat.prototype.fetchAccessToken=function(){
    var that = this;
    return this.getAccessToken(accessPath)
        .then(function(data){
            try{
                data = JSON.parse(data)
            }
            catch(e){
                return that.updateAccessToken();
            }
            if(that.isValidAccessToken(data)){
                return new Promise(function(resolve,reject){
                    resolve(data)
                })
            }else{
                return that.updateAccessToken();
            }
        })
        .then(function(data){
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;
            return that.saveAccessToken(accessPath,data);
        })
}
//获取本地文件中的AccessToken
Wechat.prototype.getAccessToken=function(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,function(err,content){
            if(err){console.log(err);reject()}
            else{resolve(content)}
        })
    })
};
//保存AccessToken到本地文件
Wechat.prototype.saveAccessToken=function(path,content){
    content = JSON.stringify(content);
    return new Promise(function(resolve,reject){
        fs.writeFile(path,content,function(err){
            if(err){reject()}
            else{resolve(JSON.parse(content))}
        })
    })
}
//验证本地文件中取出的AccessToken有没有过期,
Wechat.prototype.isValidAccessToken=function(data){
        if(!data||!data.access_token||!data.expires_in){
            return false;
        }
        var expires_in = data.expires_in;
        var now = new Date().getTime();
        if(now<expires_in){
            return true;
        }else{
            return false;
        }
};
//通过向微信服务器借口发请求更新AccessToken
Wechat.prototype.updateAccessToken=function(){
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken+`&appid=${appID}&secret=${appSecret}`
    //发请求，去请求新的AccessToken
    return new Promise(function(resolve){
        axios.get(url).then(function(response){
            var data = response.data;//{"access_token":"ACCESS_TOKEN","expires_in":7200}
            var now = new Date().getTime();
            var expires_in = now+(data.expires_in-20)*1000;
            data.expires_in = expires_in;
            resolve(data);
        })
    })
}
//被动消息回复
Wechat.prototype.reply=function(){
    var message = this.weixin;
    var xml = util.responseXML.call(this);
    console.log(xml)
    this.status = 200;
    this.type = "application/xml";
    this.body = xml;
}
//上传素材
Wechat.prototype.uploadMaterial=function(path,type){
    var that = this;
    var form = {
        media:fs.createReadStream(path)
    }
    return new Promise(function(resolve){
        that.fetchAccessToken().then(function(data){
            var url = api.upload+"&access_token="+data.access_token+"&type="+type;
            request({method: 'POST',url:url,formData:form,json:true})
            .then(function(response){
                resolve(response)
            })
        })
    })

}

//创建菜单  无权限  暂未申请48001
Wechat.prototype.createMenu=function(path,type){
    var that = this;

    return new Promise(function(resolve){
        that.fetchAccessToken().then(function(data){
            var url = "http://api.weixin.qq.com/cgi-bin/media/voice/queryrecoresultfortext?access_token="+data.access_token;
            request({method: 'POST',url:url,body:form,json:true})
                .then(function(response){
                    console.log('heool',response);
                    resolve(response)
                })
        })
    })

}
module.exports=Wechat;