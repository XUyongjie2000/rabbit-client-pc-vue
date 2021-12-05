<template>
  <div class="account-box">
    <div class="toggle">
      <button v-if="isMsgLogin" @click="isMsgLogin = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </button>
      <button v-if="!isMsgLogin" @click="isMsgLogin = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </button>
    </div>
    <div class="form">
      <!-- 账户登录 -->
      <template v-if="!isMsgLogin">
        <form @submit="onAccountFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                v-model="accountField"
                type="text"
                placeholder="请输入用户名"
              />
            </div>
            <div class="error" v-if="accountError">
              <i class="iconfont icon-warning"></i>{{ accountError }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-lock"></i>
              <input
                v-model="passwordField"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            <div class="error" v-if="passwordError">
              <i class="iconfont icon-warning"></i>{{ passwordError }}
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="accountIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="accountIsAgreeError">
              <i class="iconfont icon-warning"></i>{{ accountIsAgreeError }}
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
      <!-- 短信登录 -->
      <template v-if="isMsgLogin">
        <form @submit="onMsgFormSubmit">
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-user"></i>
              <input
                v-model="mobileField"
                type="text"
                placeholder="请输入手机号"
              />
            </div>
            <div class="error" v-if="mobileError">
              <i class="iconfont icon-warning"></i>{{ mobileError }}
            </div>
          </div>
          <div class="form-item">
            <div class="input">
              <i class="iconfont icon-code"></i>
              <input
                v-model="codeField"
                type="password"
                placeholder="请输入验证码"
              />
              <span class="code">发送验证码</span>
            </div>
            <div class="error" v-if="codeError">
              <i class="iconfont icon-warning"></i>{{ codeError }}
            </div>
          </div>
          <div class="form-item">
            <div class="agree">
              <XtxCheckbox v-model="msgIsAgreeField" />
              <span>我已同意</span>
              <a href="javascript:">《隐私条款》</a>
              <span>和</span>
              <a href="javascript:">《服务条款》</a>
            </div>
            <div class="error" v-if="msgIsAgreeError">
              <i class="iconfont icon-warning"></i>{{ msgIsAgreeError }}
            </div>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </template>
    </div>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:">忘记密码</a>
        <a href="javascript:">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import {
  account,
  code,
  isAgree,
  mobile,
  password,
} from "@/utils/vee-validate-schema";
import { useField, useForm } from "vee-validate";

export default {
  name: "LoginForm",
  setup() {
    //是否为短信登录 默认为false 因为页面中默认显示的是账户登录
    const isMsgLogin = ref(false);
    //获取账号登录表单的验证相关的数据
    const { handleAccountFormSubmit, ...accountForm } =
      useAccountFormValidate();
    //获取短信登录表单的验证相关数据
    const { msgFormHandleSubmit, ...msgForm } = useMsgFormValidate();
    //处理账号表单登录
    const onAccountFormSubmit = handleAccountFormSubmit((values) => {
      //当前回调函数会在表单验证通过以后执行
      //values表示用户在表单中输入的内容
      console.log(values);
    });
    //处理短息登录表单
    const onMsgFormSubmit = msgFormHandleSubmit((values) => {
      //当前回调函数会在表单验证通过以后执行
      //values表示用户在表单中输入的内容
      console.log(values);
    });
    return {
      isMsgLogin,
      ...accountForm,
      onAccountFormSubmit,
      ...msgForm,
      onMsgFormSubmit,
    };
  },
};
//用于验证账号密码登录表单
function useAccountFormValidate() {
  //创建账号登录表单验证表单
  const { handleSubmit: handleAccountFormSubmit } = useForm({
    //指定表单中的验证规则
    validationSchema: {
      //用户名验证规则
      account,
      //密码验证规则
      password,
      //是否同意协议的验证规则
      isAgree,
    },
  });
  //对用户名进行验证
  const { value: accountField, errorMessage: accountError } =
    useField("account");
  //对密码进行验证
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  //对协议进行校验
  const { value: accountIsAgreeField, errorMessage: accountIsAgreeError } =
    useField("isAgree");
  return {
    accountField,
    accountError,
    passwordField,
    passwordError,
    accountIsAgreeField,
    accountIsAgreeError,
    handleAccountFormSubmit,
  };
}
//验证短信登录表单
//1.创建验证表单  指定验证规则 获取处理表单的方法
//2.创建具体的表单验证项
//3.将具体的表单验证项和模板进行绑定并绑定错误信息
function useMsgFormValidate() {
  const { handleSubmit: msgFormHandleSubmit } = useForm({
    validationSchema: {
      mobile,
      code,
      isAgree,
    },
  });
  const { value: mobileField, errorMessage: mobileError } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const { value: msgIsAgreeField, errorMessage: msgIsAgreeError } =
    useField("isAgree");
  return {
    mobileField,
    mobileError,
    codeField,
    codeError,
    msgIsAgreeField,
    msgIsAgreeError,
    msgFormHandleSubmit,
  };
}
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    button {
      color: @xtxColor;
      background: none;
      border: none;
      cursor: pointer;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
        .code.disabled {
          cursor: wait;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      border: none;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
