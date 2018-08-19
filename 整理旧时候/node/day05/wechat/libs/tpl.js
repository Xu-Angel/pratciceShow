var heredoc = require("heredoc")
var ejs = require("ejs");
var template = heredoc(function(){/*
<xml>
<ToUserName><![CDATA[<%=fromUserName%>]]></ToUserName>
<FromUserName><![CDATA[<%=toUserName%>]]></FromUserName>
<CreateTime><%=createTime%></CreateTime>
<%if(msgType=="text"){%>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[<%=content%>]]></Content>
<%}else if(msgType=="image"){%>
<MsgType><![CDATA[image]]></MsgType>
<Image>
<MediaId><![CDATA[<%=content.media_id%>]]></MediaId>
</Image>
<%}else if(msgType=="voice"){%>
<MsgType><![CDATA[voice]]></MsgType>
<Voice><MediaId><![CDATA[<%=content.media_id%>]]></MediaId></Voice>
<%}else if(msgType=="video"){%>
<MsgType><![CDATA[video]]></MsgType>
<Video><MediaId><![CDATA[<%=content.media_id%>]]>
</MediaId><Title><![CDATA[<%=content.title%>]]>
</Title><Description><![CDATA[<%=content.description%>]]>
</Description></Video>
<%}else if(msgType=="music"){%>
<MsgType><![CDATA[music]]></MsgType>
<Music>
<Title><![CDATA[<%=content.title%>]]></Title>
<Description><![CDATA[<%=content.description%>]]></Description>
<MusicUrl><![CDATA[<%=content.MUSIC_Url%>]]></MusicUrl>
<MediaId><![CDATA[<%=content.media_id%>]]></MediaId>
</Music>
<%}else if(msgType=="news"){%>
<MsgType><![CDATA[news]]></MsgType>
<ArticleCount><%=content.length%></ArticleCount><Articles>
<%content.forEach(function(item){%>
<item>
<Title><![CDATA[<%=item.title%>]]></Title>
<Description><![CDATA[<%=item.description%>]]></Description>
<PicUrl><![CDATA[<%=item.picurl%>]]></PicUrl>
<Url><![CDATA[<%=item.url%>]]></Url>
</item>
<%})%>
<%}%>
</xml>
*/});

var compiled = ejs.compile(template);
module.exports={
    compiled
}