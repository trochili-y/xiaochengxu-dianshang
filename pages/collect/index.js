// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '待品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      },
    ],
    collect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const collect=wx.getStorageSync("collect")||[]
    this.setData({collect})
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

},
  
})