const app = new getApp()
import { UserModel } from '../../models/user.js'
const user = new UserModel()
let dialog, toast

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
      list: [
        {
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
          text: '发现'
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
    toast = this.selectComponent('#nav-toast')
  },
  methods: {
    handleHome() {
      wx.switchTab({
        url: '/pages/home/home'
      })
    },
    handleBusiness() {
      wx.switchTab({
        url: '/pages/business/business'
      })
    },
    handleFound() {
      wx.switchTab({
        url: '/pages/found/found'
      })
    },
    handleRelease(e) {
      const userInfo = wx.getStorageSync('userInfo')
      // const did = this.data.tabbar.list.filter(item => item.pagePath === this.data.currentPagePath)[0].id
      // dialog = this.selectComponent(`#nav-dialog-${did}`);
      if (e.detail.userInfo) {
        if (userInfo && userInfo.id) {
          this.triggerEvent('release', { userInfo: userInfo })
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
