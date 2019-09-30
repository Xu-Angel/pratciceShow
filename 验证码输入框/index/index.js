// pages/changePW/changePW.js
const {
  commonSdk,
  util
} = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '', //错误提示弹出
    setPasswordLength: 6, //密码长度设置
    oldPassword: {
      value: '',
      isFocus: true
    },
    newPassword: {
      value: '',
      isFocus: false
    },
    repeatPassword: {
      value: '',
      isFocus: false
    },
  },
  bindPasswordInput(e) {
    const self = this;
    const {
      flag
    } = e.currentTarget.dataset;
    self.data[flag].value = e.detail.value
    self.setData({
      [flag]: self.data[flag]
    });
  },
  bindKeyInput(e) {
    const self = this;
    const {
      flag
    } = e.currentTarget.dataset
    self.data[flag].isFocus = true;
    self.setData({
      [flag]: self.data[flag]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clearTips() {
    const self = this;
    setTimeout(() => {
      self.setData({
        tips: ''
      })
    }, 2000)
  },
  submit() {
    const self = this;
    const {
      oldPassword,
      newPassword,
      repeatPassword,
      setPasswordLength
    } = self.data;
    if (oldPassword.value.length != setPasswordLength) {
      self.setData({
        tips: '请填写原支付密码'
      })
      self.clearTips();
      return;
    }
    if (newPassword.value.length != setPasswordLength) {
      self.setData({
        tips: '请填写新支付密码'
      })
      self.clearTips();
      return;
    }
    if (repeatPassword.value.length != setPasswordLength) {
      self.setData({
        tips: '请填写重复新密码'
      })
      self.clearTips();
      return;
    }
    if (newPassword.value != repeatPassword.value) {
      self.setData({
        tips: '两次密码输入不一致，请重新输入'
      })
      self.clearTips();
      return;
    }
    console.log(newPassword.value, repeatPassword.value)
    //修改密码 .....
    


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})