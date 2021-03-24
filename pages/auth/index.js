// pages/auth/index.js
import {login} from "../../utils/asyncWx.js"
import { request } from "../../request/index.js";
Page({
// 获取用户信息
 async handleGetUserInfo(e){
 try {
    //  获取用户信息
  const {encrypteData,rawData,iv,signature}=e.detail
  // 获取小程序登录成功后的code
  const {code}=await login()
  const loginParams={encrypteData,rawData,iv,signature,code}
  // 发送请求，获取用户token
  // const token=await request({url:"/users/wxlogin",data:loginParams,method:"post"})
  let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
  // 把token存储到缓存，并跳转到上一页
  console.log(token)
  wx.setStorageSync('token', token);
  wx.navigateBack({
    delta: 1
  });
   
 } catch (error) {
   
 }
    
  } 
})