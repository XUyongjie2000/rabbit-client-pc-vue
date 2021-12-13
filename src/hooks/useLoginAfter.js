import Message from "@/components/library/Message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default function useLoginAfter() {
  const router = useRouter();
  const store = useStore();
  //登录成功后做的事情
  const loginSuccess = (data) => {
    //1.存储用户信息
    store.commit("user/setUser", {
      // 用户id
      id: data.result.id,
      // 用户头像
      avatar: data.result.avatar,
      // 用户昵称
      nickname: data.result.nickname,
      // 用户账号
      account: data.result.account,
      // 用户手机号
      mobile: data.result.mobile,
      // 用户登录凭证
      token: data.result.token,
    });
    //2.跳转到首页
    router.push("/").catch(() => {});
    //3.登录成功的提示
    Message({ type: "success", text: "登录成功" });
  };
  //登录失败后做的事情
  const loginFail = () => {
    Message({ type: "error", text: "登陆失败" });
  };

  return { loginSuccess, loginFail };
}
