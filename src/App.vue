<template>
  {{ user }}
  <button @click="onClickHandler">button</button>
</template>
<script>
import { useStore } from "vuex";

export default {
  setup() {
    //获取store对象
    const store = useStore();
    //按钮点击事件的事件处理函数
    const onClickHandler = () => {
      //设置用户信息
      store.commit("user/setUser", { id: "齐天大圣" });
    };
    const user = store.state.user;
    return { onClickHandler, user };
  },
};
</script>
<style lang="less"></style>
