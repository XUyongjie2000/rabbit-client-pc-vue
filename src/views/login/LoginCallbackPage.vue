<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-bind"></i>
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:"
      >
        <i class="iconfont icon-edit"></i>
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <LoginCallbackBindPhone />
    </div>
    <div class="tab-content" v-else>
      <LoginCallbackBindPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginFooter from "@/views/login/components/LoginFooter";
import LoginCallbackBindPhone from "@/views/login/components/LoginCallbackBindPhone";
import LoginCallbackBindPatch from "@/views/login/components/LoginCallbackPatch";
import { ref } from "vue";
export default {
  name: "LoginCallbackPage",
  components: {
    LoginCallbackBindPatch,
    LoginCallbackBindPhone,
    LoginFooter,
    LoginHeader,
  },
  setup() {
    const hasAccount = ref(true);
    //获取qq登录用户的openid
    //1.检测用户的登录状态
    if (window.QC.Login.check()) {
      //获取openid
      window.QC.Login.getMe((openid) => {
        console.log(openid);
      });
    }
    //2.拿着access_token 向qq互联发送请求换取用户的openid
    return { hasAccount };
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
