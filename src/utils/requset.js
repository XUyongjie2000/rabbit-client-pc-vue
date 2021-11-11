//导入用户发起请求的底层库
import axios from "axios";
import store from "@/store";

//2.创建baseURL变量 用于存储基准的请求地址
const baseURL = "https://apipc-xiaotuxian-front.itheima.net/";
//1.创建一个新的axios实例对象  用于配置和小兔仙应用相关的请求
//instanceWithToken携带token的实例对象
const instanceWithToken = axios.create({ baseURL });
//instanceWithoutToken不携带token的实例对象
// const instanceWithoutToken = axios.create({ baseURL });

//3.配置请求拦截器 携带token
instanceWithToken.interceptors.request.use((config) => {
  //判断token是否存在
  const token = store.state.user.profile.token;
  //如果 token存在
  if (token) {
    //讲token存储在请求头中
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
