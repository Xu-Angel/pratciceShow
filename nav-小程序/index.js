const app = new getApp()
import { UserModel } from '../../models/user.js'
const user = new UserModel()
// let DIALOG

Component({
  /**
   * 组件的初始数据
   */
  data: {
    tabbar: {
      backgroundColor: '#ffffff',
      color: '#999',
      selectedColor: '#1B82D2',
      currentPagePath: '/pages/home/home',
      list: [{
          id: 'home',
          pagePath: '/pages/home/home',
          iconPath: 'images/home.png',
          handler: 'handleHome',
          selectedIconPath: 'images/home-active.png',
          isHome: true,
          text: '首页'
        },
        {
          id: 'business',
          pagePath: '/pages/business/business',
          iconPath: 'images/business.png',
          handler: 'handleBusiness',
          selectedIconPath: 'images/business-active.png',
          text: '商机'
        },
        {
          pagePath: '/pages/issue-demand/issue-demand',
          iconPath: 'images/add.png',
          isSpecial: true,
          handler: 'handleRelease',
          text: '发需求'
        },
        {
          id: 'found',
          pagePath: '/pages/found/found',
          iconPath: 'images/found.png',
          handler: 'handleFound',
          selectedIconPath: 'images/found-active.png',
          text: '发现',
          isHome: true
        },
        {
          id: 'my',
          pagePath: '/pages/my/my',
          iconPath: 'images/my.png',
          handler: 'handleMy',
          selectedIconPath: 'images/my-active.png',
          text: '我的'
        }
      ]
    }
  },
  attached() {
    const currentPages = getCurrentPages()
    const currentPagePath = `/${currentPages[currentPages.length - 1].route}`
    this.setData({
      currentPagePath
    })
  },
  /**
   * 组件的方法列表
   */

  ready() {
    // DIALOG = this.selectComponent('#Nav-Dialog')
  },
  methods: {
    // DialogEventConfirm() {
    //   DIALOG.success()
    // },
    // DialogEventCancel() {
    //   DIALOG.fail()
    // },
    /**
     * 返回用户状态
     */
    userPerfectInfo(data = {}) {
      return new Promise((resolve, reject) => {
        // 请求响应
        // wx.showLoading({
        //   title: '鉴权中',
        //   mask: true
        // })
        user.getPerfectInfo(data).then(function (res) {
          // wx.hideLoading()
          if (res.result) {
            resolve(res.result)
          }
          if (res.error) {
            wx.showToast({
              title: res.error.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
      })
    },
    handleHome() {
      wx.switchTab({
        url: '/pages/home/home'
      })
    },
    handleBusiness(e) {
      const userInfo = wx.getStorageSync('userInfo')
      if (e.detail.userInfo) {
        if (userInfo && userInfo.id) {
          //验证用户资料状态
          this.userPerfectInfo({ id: userInfo.id }).then(rs => {
            const { isCert, isPerfect, isVip } = rs
            console.log(isCert, '这是组件方法 通用权限鉴定')
            if (!isCert) {
              wx.showModal({
                title: '',
                content: '您没有权限，请先进行企业认证',
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '立即认证',
                confirmColor: '#007dfc',
                success (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: "/pages/my-auth/my-auth?edit=now"
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              wx.switchTab({
                url: "/pages/business/business"
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    },
    handleFound() {
      wx.switchTab({
        url: '/pages/found/found'
      })
    },
    handleRelease(e) {
      const userInfo = wx.getStorageSync('userInfo')
      if (e.detail.userInfo) {
        if (userInfo && userInfo.id) {
          //验证用户资料状态
          this.userPerfectInfo({ id: userInfo.id }).then(rs => {
            const { isCert, isPerfect, isVip } = rs
            console.log(isCert, '这是组件方法 通用权限鉴定--')
            if (!isCert) {
              wx.showModal({
                title: '',
                content: '您没有权限，请先进行企业认证',
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '立即认证',
                confirmColor: '#007dfc',
                success (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: "/pages/my-auth/my-auth?edit=now"
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              wx.navigateTo({
                url: "/pages/issue-demand/issue-demand"
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    },
    handleMy(e) {
      const userInfo = wx.getStorageSync('userInfo')
      if (e.detail.userInfo) {
        if (userInfo && userInfo.id) {
          wx.switchTab({
            url: '/pages/my/my'
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    }
  }
})
