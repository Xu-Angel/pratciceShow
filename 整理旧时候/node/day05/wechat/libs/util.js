var complied = require("./tpl").compiled;
function formatJson(json){
    var message  = {};
    for(var key in json){
        if(Object.prototype.toString.call(json[key])==="[object Array]"){
            if(!json[key].length){
                message[key]=""
            }else if(json[key].length==1){
                if(Object.prototype.toString.call(json[key][0])==="[object String]"){
                    message[key]=json[key][0];
                }else{
                    message[key] = formatJson(json[key][0]);
                }
            }else{
                message[key] = formatJson(json[key][0]);
            }
        }else if(Object.prototype.toString.call(json[key])==="[object Object]"){
            message[key] = formatJson(json[key])
        }
    }
    return message;
}
function responseXML(){
    var message = this.weixin;
    var content = "";
    var info = {
        fromUserName:message.FromUserName,
        toUserName:message.ToUserName,
        msgType:"text"
    }
    if(message.MsgType==="event"){
        if(message.Event==="subscribe"){

       new Promise(function(resolve, reject){

                   info.msgType = "news";
                   content=[{
                       title:"谢谢关注篱下~公众号还在测试中，功能正在完善~",
                       description:"服务菜单：回复1，查看最新博客文章；回复2，收听今日音乐推送；回复3:反馈，发送给我"
                   }
                       ,
                       {
                           title:"我的博客👉点击头像👉点击右下角的访问原网页👉到达我的博客",
                           description:"欢迎关注我的博客",
                           picurl:"https://upload-images.jianshu.io/upload_images/3084260-d530c88bdfa91c6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640",
                           url:"https://xutianshi.top/"
                       }
                   ]
           resolve();
console.log("uyy")
            }).then(function(){

                console.log("dddd")


       })

        }else{
            content = ""
        }
    }else{
        if(message.MsgType==="text"){
            var reg=new RegExp(/^(3).{1,}/)
            if(message.Content==="0"){
                info.msgType = "news";
                content=[
                    {
                        title:"今日NBA",
                        description:"61分分差！黄蜂破队史纪录并创造历史第五大分差",
                        picurl:"https://c2.hoopchina.com.cn/uploads/star/event/images/180323/bmiddle-90b8b39d32d72fa5b4e3d511b9d738f180be68d0.png?x-oss-process=image/resize,w_800/format,webp",
                        url:"https://bbs.hupu.com/21754200.html"
                    }
                ]
            }else if(message.Content==="1"){
                info.msgType = "news";
                content=[
                {
                    title:"JavaScript浮点数精度问题",
                        description:"这个问题出现的根源在哪儿呢？",
                    picurl:"https://upload-images.jianshu.io/upload_images/3084260-8a477a97029fd391.jpg?imageMogr2/auto-orient/",
                    url:"https://xutianshi.top/2018/03/20/JSNumberfixed/#more"
                }
                ]
            }else if(message.Content==="2"){
                info.msgType = "news";
                content=[
                    {
                        title:"今日推荐-空空如也-胡66",
                        description:"翻唱更胜原唱~",
                        picurl:"https://y.gtimg.cn/music/photo_new/T002R300x300M000002TtvI007ZBG3.jpg?max_age=2592000",
                        url:"https://y.qq.com/n/yqq/song/000Wk6NP4NaAPo.html"
                    }
                ]

            }else if(reg.test(message.Content)){
                content="好的，谢谢您宝贵的建议~我收到啦";
        }else{
                content=`我还是宝宝:-(
                只有如下功能😊
                回复0，查看今日NBA
                回复1，查看最新文章
                回复2，收听今日音乐
                回3:反馈，发送给我            
                像这样：3你太帅啦
                `

            }
        }else{


        }
    }
    info.createTime = new Date().getTime();
    info.content = content;
    return complied(info)
}
module.exports={
    formatJson,
    responseXML
}