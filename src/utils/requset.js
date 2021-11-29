//导入用户发起请求的底层库
import axios from "axios";
import store from "@/store";
import router from "@/router";

//2.创建baseURL变量 用于存储基准的请求地址
// 线上环境: https://apipc-xiaotuxian-front.itheima.net/
// 开发环境: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const baseURL = "https://apipc-xiaotuxian-front.itheima.net/";
//1.创建一个新的axios实例对象  用于配置和小兔仙应用相关的请求
//instanceWithToken携带token的实例对象
const instanceWithToken = axios.create({ baseURL });
//instanceWithoutToken不携带token的实例对象
const instanceWithoutToken = axios.create({ baseURL });

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
//4.配置响应拦截器
instanceWithToken.interceptors.response.use(
  (response) => {
    //服务器端做出响应以后，先走当前回调函数，当前回调函数中可以对响应结果进行处理，处理完成后再给到请求的调用者
    //如果服务器端返回的是成功的状态码   走这个函数
    return response.data;
  },
  (error) => {
    //如果服务器端返回地是失败的状态码  走这个函数
    if (error.response.status === 401) {
      //401未授权 清空本地存储的用户信息
      store.commit("user/setUser", {});
      //跳转到登录页面
      router
        .push("/login")
        .then(() => {
          console.log("跳转成功");
        })
        .catch(() => {
          console.log("跳转失败");
        });
    }
    return Promise.reject(error);
  }
);
//不携带token 响应拦截器
instanceWithoutToken.interceptors.response.use((response) => {
  // console.log(response);
  return response.data;
});
//5.用于发送请求的函数
function generateRequestConfig(url, method, data) {
  return {
    url: url,
    method: method,
    [method === "get" ? "params" : "data"]: data,
  };
}
//用于发送携带token的请求
export function requestWithToken(url, method, data) {
  return instanceWithToken(generateRequestConfig(url, method, data));
}
//用于发送普通请求
export function requestWithoutToken(url, method, data) {
  return instanceWithoutToken(generateRequestConfig(url, method, data));
}
