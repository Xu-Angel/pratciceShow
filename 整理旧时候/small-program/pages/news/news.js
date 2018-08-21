Page({
    data:{

    },
    onLoad:function(){
        var that = this;
        wx.request({
            url:"http://39.107.228.192/newsData",
            success:function(res){
                that.setData({
                    newsData:res.data  //返回JSON对象
                });
            }
        })

    },
    onSwiperTap:function(event){
        var newsId = event.target.dataset.newsid;
        wx.navigateTo({
            url:"news-detail/news-detail?id="+newsId
        })
    },
    onNewsTap:function(event){
        var newsId = event.currentTarget.dataset.newsid;
        wx.navigateTo({
            url:"news-detail/news-detail?id="+newsId
        })
    }

})