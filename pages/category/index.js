// pages/category/index.js
import { request } from "../../request/index.js";
Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex:0,
    // 右侧滚动条
    scrollTop:0

  },
  // 接口的返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储的数据
    const Cates=wx.getStorageSync("cates");
    // 判断
    if(!Cates){
      this.getCates();
    }else{
      // 有旧的数据 定义过期时间
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        this.Cates=Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
          // 重新设置右侧内容的滚动条的距离
          scrollTop:0
        })
        

      }
    }
      
    
  },
 async getCates() {
    // request({ url: "/categories" })
    //   .then(res => {
    //     this.Cates = res.data.message;
    //     // 把数据存储到本地
    //     wx.setStorageSync("cates",{time:Date.now(),data:this.Cates} );
          
    //     // 构造左侧的大菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     // 右侧
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    // 用async await的写法
    const res=await request({ url: "/categories" })
    this.Cates = res;
        // 把数据存储到本地
        wx.setStorageSync("cates",{time:Date.now(),data:this.Cates} );
          
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // console.log(leftMenuList)
        // 右侧
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })

  },
  // 左侧菜单被点击
  handleItemTap(e){
    // 获取被点击的标题
    // 给data中的currentIndex赋值
    console.log(e)
    const {index}=e.currentTarget.dataset; 
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent
    })
   
  }

})