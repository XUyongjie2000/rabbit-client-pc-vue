<template>
  <RouterView />
  <!--  <XtxHeading :level="1">我是h1</XtxHeading>-->
  <!--  <XtxHeading :level="2">我是h2</XtxHeading>-->
  <!--  <XtxMessage type="warn" text="警告信息" />-->
  <!--  <button @click="onclickHandler">button</button>-->
  <!--  <button @click="$message({ type: 'warn', text: '测试' })">button</button>-->
  <!--  <button @click="show">button</button>-->
  <!--  <button @click="test">button</button>-->
  <!--  <button @click="test2(this)">button</button>-->
</template>
<script>
// import Message from "@/components/library/Message";
// import { getCurrentInstance } from "vue";

export default {
  components: {},
  // setup() {
  //   const onclickHandler = () => {
  //     Message({ type: "success", text: "成功" });
  //   };
  //   const { proxy } = getCurrentInstance();
  //   const test = () => {
  //     // console.log(proxy);
  //     proxy.$message({ type: "success", text: "test" });
  //   };
  //   const test2 = (instance) => {
  //     instance.$message({ type: "warn", text: "test2" });
  //   };
  //   return { onclickHandler, test, test2 };
  // },
  // methods: {
  //   show() {
  //     this.$message({ type: "error", text: "测试" });
  //   },
  // },
};
</script>
<style lang="less">
.box {
  color: @xtxColor;
}
</style>
