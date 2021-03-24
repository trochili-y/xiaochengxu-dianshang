// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商家/商家投诉',
        isActive: false
      },

    ],
    chooseImgs: [],
    // 文本域内容
    textVal: ""

  },
  // 外围图片数组
  UpLoadImgs: [],
  handleTabsItemChange(e) {
    // console.log(e)
    // 获取被点击的标题索引
    const { index } = e.detail;
    // 修改原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        // console.log(result)
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击自定义图片
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset
    let { chooseImgs } = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: false,
      });
      return;
    }

    wx.showLoading({
      title: "正在上传中",
      mask: true,
    });
    if(chooseImgs.length!=0){
      chooseImgs.forEach((v, i) => {
        // 上传图片
        // 上传的api不支持多文件同时上传
        wx.uploadFile({
          url: 'https://img.coolcr.cn/api/upload',
          filePath: v,
          // 文件名称后台获取
          name: "image",
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            // console.log(result)
            let url = JSON.parse(result.data).data.url;
            this.UpLoadImgs.push(url);
            console.log(this.UpLoadImgs);
            if(i===chooseImgs.length-1){
              wx.hideLoading();
              console.log("把文本的内容和外围图片数组提交到后台")
              this.setData({
                textVal:"",
                chooseImgs:[]
              })
              wx.navigateBack({
                delta: 1
              });
  
            }
          },
  
        });
      })
  
    }else{
      wx.hideLoading();
      console.log("只提交了文本")
      wx.navigateBack({
        delta:1
      })
    }
  
  }


})