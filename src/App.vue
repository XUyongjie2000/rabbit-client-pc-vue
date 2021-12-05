<template>
  <!--  <RouterView />-->
  <!--  <XtxHeading :level="1">我是h1</XtxHeading>-->
  <!--  <XtxHeading :level="2">我是h2</XtxHeading>-->
  <!--  <XtxMessage type="warn" text="警告信息" />-->
  <button @click="onclickHandler">button</button>
</template>
<script>
import Message from "@/components/library/Message";
export default {
  components: {},
  setup() {
    const onclickHandler = () => {
      Message({ type: "success", text: "成功" });
    };
    return { onclickHandler };
  },
};
</script>
<style lang="less">
.box {
  color: @xtxColor;
}
</style>
