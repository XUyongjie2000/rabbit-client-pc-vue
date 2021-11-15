<template>
  <RouterView />
</template>
<script>
// import { requestWithoutToken } from "@/utils/requset";

export default {
  setup() {
    // const onClickHandler = () => {
    //   requestWithoutToken("/home/banner", "get", { distributionSite: 1 }).then(
    //     (data) => {
    //       console.log(data);
    //     }
    //   );
    // };
    // return { onClickHandler };
  },
};
</script>
<style lang="less">
.box {
  color: @xtxColor;
}
</style>
