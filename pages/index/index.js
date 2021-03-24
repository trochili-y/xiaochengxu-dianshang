//Page Object
import {request} from "../../request/index.js";
Page({
  data: {
    // 轮播图数组
    swiperList:[],
    catesListL:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
     
  },
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
              swiperList:result 
            })
    })
  },
  getCatesList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
              catesList:result
            })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
       // let a=result.map(v=>v.product_list.map(v=>v.navigator_url.replace(/goods_list/, "goods_list/index")))
    //   let a=result
    //  a.forEach(v=>v.product_list.forEach(v=>v.navigator_url=v.navigator_url.replace(/goods_list/, "goods_list/index")))
    result.forEach(v=>v.product_list.forEach(v=>v.navigator_url=v.navigator_url.replace(/goods_list/, "goods_list/index"))) 
      // console.log(a)
      this.setData({
              floorList:result
            })
    })
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  