import {showModal,showToast,requestPayment} from "../../utils/asyncWx.js"
import { request } from "../../request/index.js";
Page({

  data: {
    address: {},
    cart: [],
  
    totalPrice: 0,
    totalNum: 0
  },

  onLoad: function (options) {

  },
  onShow() {
    // 1获取缓存中收获地址
    let address = wx.getStorageSync("address");
    address.all = address.provinceName + address.cityName + address.countryName + address.detailInfo;
    // 2获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || []
    cart=cart.filter(v=>v.checked)
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
    })

    this.setData({
      cart,
      totalPrice,
      totalNum, address
    })
  },
  async handleOrderPay(){
   try {
    const token=wx.getStorageSync("token")
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    // const header={Authorization:token}
    const order_price=this.data.totalPrice
    const consignee_addr=this.data.address.all
    const cart=this.data.cart
    let goods=[]
      cart.forEach(v=>goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }))
      const orderParams={order_price,consignee_addr,goods}
      // 发送请求，创建订单
      const {order_number}=await request({url:"/my/orders/create",method:"POST",data:orderParams,})
    console.log(order_number)
    const {pay}=await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}})
      //没有企业号，暂时注释下面两句
    // await requestPayment(pay)
    //   const res=await request({url:"/my/orders/chkOrder",method:"POST",data:{order_number}})
     await showToast({title:"支付成功"})
    //  手动删除缓存中，已经支付了的商品
    let newCart=wx.getStorageSync("cart")
    newCart=newCart.filter(v=>!v.checked)
    wx.setStorageSync("cart", newCart);
       //  跳转
      wx.navigateTo({
        url: '/pages/order/index',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      
   } catch (error) {
    await showToast({title:"支付失败"})
     console.log(error)
   } 
  }
})

