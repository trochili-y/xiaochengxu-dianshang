import { request } from "../../request/index.js";
Page({

  data: {
    goods:[],
    isFocus:false
  },
  TimeId:-1,
  handleInput(e){
    const {value}=e.detail
    if(!value.trim()){
     this.setData({
       goods:[],
       isFocus:false,
       inpValue:""
     })
     return
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId)
    this.TimeId=setTimeout(()=>{
      this.qsearch(value)
    },1000)
    this.qsearch(value)
  },
  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}})
    console.log(res)
    this.setData({
      goods:res
    })
  },
  handleCancel(){
    this.setData({
      inpValue:"",
    isFocus:false,
    goods:[]
    })
    
  }

  
})