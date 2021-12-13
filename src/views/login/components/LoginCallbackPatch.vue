<template>
  <form class="xtx-form" @submit="onSubmit">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input
          v-model="accountField"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error" v-if="accountError">{{ accountError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model="mobileField"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error" v-if="mobileError">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-model="codeField"
          class="input"
          type="text"
          placeholder="请输入验证码"
        />
        <span class="code">发送验证码</span>
      </div>
      <div class="error" v-if="codeError">{{ codeError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-model="passwordField"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error" v-if="passwordError">{{ passwordError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input
          v-model="rePasswordField"
          class="input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div class="error" v-if="rePasswordError">{{ rePasswordError }}</div>
    </div>
    <input type="submit" class="submit" value="立即绑定" />
  </form>
</template>

<script>
import { useField, useForm } from "vee-validate";
import {
  checkUserAccount,
  code,
  mobile,
  password,
  rePassword,
} from "@/utils/vee-validate-schema";

export default {
  name: "LoginCallbackBindPatch",
  setup() {
    const { handleSubmit, ...rest } = useRegisterPatch();
    const onSubmit = handleSubmit((values) => {
      console.log(values);
    });
    return { ...rest, onSubmit };
  },
};
function useRegisterPatch() {
  const { handleSubmit } = useForm({
    validationSchema: {
      checkUserAccount,
      mobile,
      code,
      rePassword,
      password,
    },
  });
  const { value: accountField, errorMessage: accountError } =
    useField("checkUserAccount");
  const { value: mobileField, errorMessage: mobileError } = useField("mobile");
  const { value: codeField, errorMessage: codeError } = useField("code");
  const { value: rePasswordField, errorMessage: rePasswordError } =
    useField("rePassword");
  const { value: passwordField, errorMessage: passwordError } =
    useField("password");
  return {
    handleSubmit,
    mobileField,
    mobileError,
    codeField,
    codeError,
    rePasswordField,
    rePasswordError,
    passwordField,
    passwordError,
    accountField,
    accountError,
  };
}
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
