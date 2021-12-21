import store from "@/store";

export default function authGuard(to, from, next) {
  //1.判断用户访问的页面是否需要登录
  //1.1设计路由时候做了一项硬性规定，路由地址凡是以/checkout或者/member开头 这样的路由就需要登录
  const requiredLogin = ["checkout", "member"];
  console.log(requiredLogin);
  console.log(from);
  if (requiredLogin.includes(to.path.split("/")[1])) {
    //用户访问的页面需要登录
    //判断用户是否登录
    if (store.state.user.profile.token) {
      //说明用户登录了
      next();
    } else {
      //说明用户访问的页面需要登录 但是用户没有登录
      //query指定路由的查询参数
      //to.path /checkout/order
      //to.fullPath /checkout/order?a=123
      next({ path: "login", query: { redirectUrl: to.fullPath } });
    }
  } else {
    //用户访问的页面不需要登录
    next();
  }

  //2.如果用户即将访问的页面不需要登录 直接放行
  //3.如果用户即将访问的页面需要登陆 判断用户是否登录
  //4.如果用户登录了 直接放行
  //5.如果用户没有登录  跳转到登录页面
  //6.再跳转到登录页面的时候 通过to 参数获取到用户的目标跳转未知 并讲目标跳转地址作为参数传递到登录页面
  //7.当用户登录成功后 判断路由参数中是否存在目标跳转地址
  //8.如果存在目标跳转地址 跳转到目标跳转地址 如果没有目标跳转地址 跳转到首页
}
