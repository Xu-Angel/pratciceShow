import { config } from '../../config.js';
import { UserModel } from '../../models/user.js'
import { MyProfileModel } from '../../models/my-profile.js'
import mta from '../../util/mta_analysis.js'

const base_url = config.api_base_url;
const loginApi = new UserModel()
const userInfoApi = new MyProfileModel()

let dialog,intervalid

Page({
  data: {
    counting: true,
    timeStr: '',
    openId: '',
    phone: '',
    phoneStr: '',
    smsCodeLenght: 6,
    countdown: 60,
    smsError: false,
    smsCode: {
      value: '',
      isFocus: true
    },
  },
  onLoad(params) {
    const { phone } = params
    const phoneStr = phone.substr(0, 3) + '****' + phone.substr(7, 11)
    this.setData({ phone,phoneStr })
    dialog = this.selectComponent('#v-dialog')
    this.setData({
      openId: wx.getStorageSync('openId') || ''
    })
    this.setTimeLimit()
  },

  /**
   * 验证码输入隐藏域
   */
  bindSmsInput(e) {
    const { flag } = e.currentTarget.dataset
    this.data[flag].value = e.detail.value
    this.setData({
      [flag]: this.data[flag]
    });
    if (e.detail.cursor === this.data.smsCodeLenght) {
      this.submitLogin()
    }
  },

  /**
   * 发送验证码接口
   */
  sendSmsApi() {
    // 如果还在计数中 || 验证码输错类型 则不请求验证码
    if (this.data.counting || this.data.smsError) return
    this.setData({
      smsError: false
    })
    loginApi.sendSms({
      post: {
        phone: this.data.phone
      }
    }).then(res => {
      if (res.result) {
        this.showToast('验证码发送成功！')
        this.setTimeLimit()
      } else {
        this.setData({
          counting: false
        })
        this.showToast(res.error.message || '', 2000)
      }
    })
  },

  /**
   * 登录按钮事件
   */
  submitLogin() {
    this.handleLogin()
  },

  handleLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo) {
      this.loginRegisterApi(Object.assign({
        code: this.data.smsCode.value,
        phone: this.data.phone,
        open_id: this.data.openId,
        nick_name: userInfo.nickName,
        head_img: userInfo.avatarUrl
      }, userInfo))
    } else {
      this.getUserInfo()
    }
  },

  /**
   * 获取用户信息（授权状态） 用于登录时提交给后端
   */
  getUserInfo () {
    const that = this
    wx.getUserInfo({
      success: function(res){
        that.loginRegisterApi(Object.assign({
          code: that.data.smsCode.value,
          phone: that.data.phone,
          open_id: that.data.openId,
          nick_name: res.userInfo.nickName,
          head_img: res.userInfo.avatarUrl
        }, res.userInfo))
      },
      fail: function(err) {
        that.showToast('用户未授权！请先授权再登陆')
      }
    })
  },

  /**
   * 登录请求
   * @param {} postData
   */
  loginRegisterApi(postData) {
    const that = this
    // 请求响应
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    // 发起登录请求 清空定时任务
    clearInterval(intervalid)
    this.setData({
      timeStr: ''
    })
    loginApi.loginRegister({
      post: postData
    }).then(r => {
      // 得到响应
      wx.hideLoading()
      if(r.result) {
        wx.setStorageSync('userInfo', r.result)
        dialog.show({
          text: '登录成功',
          icon: 'success',
          duration: 1000,
          cancel: '',
          confirm: ''
        })
        setTimeout(() => {
          that.isPerfectInfo(r.result.id)
        }, 900)
      } else {
        if (r.error.code == 500) {
          this.setData({
            smsError: true,
            counting: false,
            timeStr: `验证码错误，请重新输入`
          });
        } else {
          this.showToast(r.error.message)
        }
      }
    })
  },

  /**
   * 判断用户资料状态进行跳页
   * @param {} userId
   */
  isPerfectInfo(userId) {
    userInfoApi.isComplete({
      id: userId
    }).then(res => {
      this.setData({
        loading: false
      })
      if (res.result) {
        if([1].includes(res.result.isPerfect)) {
          wx.navigateTo({
            url: '/pages/my-profile/my-profile?origin=login'
          })
        } else {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }
      } else {
        this.showToast(res.error.message)
      }
    })
  },

  /**
   * 倒计时
   */
  setTimeLimit() {
    let countdown = this.data.countdown

    intervalid = setInterval(() => {
      if (countdown > 0) {
        this.setData({
          counting: true,
          smsError: false,
          timeStr: `${countdown--}s后可点此重新获取`
        });
      } else {
        clearInterval(intervalid);
        countdown = 0;
        this.setData({
          counting: false,
          timeStr: '重新获取验证码',
        })
      }
    }, 1000)
  },

  showToast(title, duration, icon) {
    wx.showToast({
      title: title,
      icon: icon || 'none',
      duration: duration || 1000
    })
  },
  bindKeyInput(e) {
    const { flag } = e.currentTarget.dataset
    this.data[flag].isFocus = true
    this.setData({
      [flag]: this.data[flag]
    });
  },
})
