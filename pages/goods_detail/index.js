// pages/goods_detail/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false

  },
  // 商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1]
    let options=currentPage.options
    const{goods_id}=options;
    this.getGoodsDetail(goods_id)
  },
// 获取商品详情数据
async getGoodsDetail(goods_id){
  const goodsObj=await request({url:'/goods/detail',data:{goods_id}})
  this.GoodsInfo=goodsObj
  let collect=wx.getStorageSync("collect")||[]
  let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
  this.setData({
    goodsObj:{
      goods_name:goodsObj.goods_name,
      goods_price:goodsObj.goods_price,
      goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      pics:goodsObj.pics
    },
    isCollect
  })

},
handlePrevewImage(e){
  const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
  const current=e.currentTarget.dataset.url
  wx.previewImage({
    current,
    urls
  }
  )
},
// 点击加入购物车
handleCartAdd(){
  // 获取缓存中的购物车数组
  let cart=wx.getStorageSync("cart")||[];
  // 判断商品对象是否存在购物车中
  let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  if(index===-1){
    // 不存在，第一次添加
    this.GoodsInfo.num=1;
    this.GoodsInfo.checked=true;
    cart.push(this.GoodsInfo)
  }else{
    cart[index].num++;
  }
  // 把购物车重新添加回缓存
 wx.setStorageSync("cart", cart);
  wx.showToast({
    title: '加入成功',
    icon: 'success',
    image: '',
    duration: 1500,
    // true防止用户疯狂点击
    mask: true,

  });
    

},
// 点击收藏
handleCollect(){
  let isCollect=false
  let collect=wx.getStorageSync("collect")||[]
  let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
  if(index!==-1){
    collect.splice(index,1)
    isCollect=false
    wx.showToast({
      title:"取消收藏",
      icon:"success",
      mask:true
    })
  }else{
    collect.push(this.GoodsInfo)
    isCollect=true
    wx.showToast({
      title:"收藏成功",
      icon:"success",
      mask:true
    })
  }
  wx.setStorageSync("collect",collect)
  this.setData({
    isCollect
  })

}
})