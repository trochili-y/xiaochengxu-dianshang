import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      },
    ],
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return
    }


    // 获取页面栈-数组，长度最大10
    let pages = getCurrentPages();
    // 数组中索引最大的页面是当前页面
    let currentPage = pages[pages.length - 1]
    // console.log(currentPage.options)
    const { type } = currentPage.options
    // console.log(type)
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },
  // 获取订单列表
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data:{type}})
    console.log(res)
    this.setData({
      orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 根据索引激活选中标题数组
  changeTitleByIndex(index) {
      // 修改原数组
      let { tabs } = this.data;
      tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
      // 赋值到data中
      this.setData({
        tabs
      })
  },
  // 标题点击事件。从子组件传递过来
  handleTabsItemChange(e) {
    // console.log(e)
    // 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index)
    this.getOrders(index+1)
  },

})