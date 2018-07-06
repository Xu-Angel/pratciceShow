Page({
    data:{

    },
    //监听页面加载事件
    onLoad:function(){
        var that = this;//缓存this的指向
        wx.getUserInfo({
            //获取用户的昵称和头像
            success:function(res){
                var nickName = res.userInfo.nickName;
                var avatarUrl = res.userInfo.avatarUrl;
                //this的指向发生了改变
                that.setData({
                    nickName,
                    avatarUrl
                })
            }
        })
    },
    onTap:function(){
        wx.switchTab({
            url:"/pages/news/news"
        })
    }
})