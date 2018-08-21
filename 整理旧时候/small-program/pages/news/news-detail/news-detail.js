var newsData = require("../../../data/news-data.js").newsList;

Page({
    data:{
        isPlayingMusic:false
    },
    onLoad:function(options){
        var newsId = options.id;
        this.setData({
            "item":newsData[newsId],
            "newsId":newsId
        })
        this.setMusicMonitor()
    },
    setMusicMonitor:function(){
        //监听音乐的状态
        var that = this;
        wx.onBackgroundAudioPlay(function(){
            that.setData({
                isPlayingMusic:true
            })
        });

        wx.onBackgroundAudioPause(function(){
            that.setData({
                isPlayingMusic:false
            })
        });

        wx.onBackgroundAudioStop(function(){
            that.setData({
                isPlayingMusic:false
            })
        });

    },
    onCollectionTap:function(){
        this.showToast()
    },
    showToast:function(){
        this.setData({
            collected:!this.data.collected
        });
        wx.showToast({
            title:this.data.collected?"收藏成功！":"取消成功！",
            duration:1000,
            icon:"success"
        })
    },

    onMusicTap:function(){
        var that = this;
        if(this.data.isPlayingMusic){
            //如果原来在播放，我就暂停
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic:false
            })
        }else{
            wx.playBackgroundAudio({
                dataUrl:that.data.item.music.url,
                title:that.data.item.music.title,
                coverImgUrl:that.data.item.music.coverImg,
            });
            that.setData({
                isPlayingMusic:true
            })
        }
    },

    //定义页面转发功能
    onShareAppMessage:function(){
        return {
            title:this.data.item.title,
            desc:"[喜洋洋]",
            path:"/pages/news/news-detail?id="+this.data.newsId
        }
    }
})