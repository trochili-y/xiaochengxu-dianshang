import {showModal,showToast} from "../../utils/asyncWx.js"

Page({

  data: {
    address: {},
    cart: [],
    allChecked: false,
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
    const cart = wx.getStorageSync("cart") || []
    // 计算全选
    // every数组方法，会遍历/会接收一个回调函数 那么 每一个回调函数都返回true
    // 那么都返回true,只要有一个false,返回false
    // 空数组 调用every 返回true
    // const allChecked=cart.length?cart.every(v=>v.checked):false
    // 总价格 总数量
    this.setData({
      address
    })
    this.setCart(cart)

  },
  // 点击收货地址按钮
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync("address", result);

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 商品的选中
  handeItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)


  },
  setCart(cart) {
    
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum, allChecked
    })
    wx.setStorageSync("cart", cart)
  },
  // 商品全选功能
  handleItemAllCheck(){
    let{cart,allChecked}=this.data;
    allChecked=!allChecked
    cart.forEach(v=>v.checked=allChecked)
    this.setCart(cart)
  },
  // 商品数量编辑功能
  async handleItemNumEdit(e){
    const {operation,id}=e.currentTarget.dataset
    // console.log(e)
    let {cart}=this.data
    const index=cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1&&operation===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '你是否要删除？',
      //   success: (res) => {
      //     if(res.confirm){
      //       cart.splice(index,1)
      //       this.setCart(cart)
      //     }else if(res.cancel){
      //       console.log("用户点击取消")
      //     }else{
      //       cart[index].num+=operation
      //       this.setCart(cart)
      //     }
      //   },
      // });
      // 封装成promise形式之后
      const res=await showModal({content:"您是否删除？"})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }
     else{
        cart[index].num+=operation
        this.setCart(cart)
      }
  },
  // 结算
  async handlePay(){
    const{address,totalNum}=this.data
    // 判断收货地址
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return;
    }
    // 判断有没有选择商品
    if(totalNum===0){
      await showToast({title:"您还没有选择商品"})
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }

})