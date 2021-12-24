<template>
  <AppMemberLayout>
    <div class="member-order">订单列表</div>
  </AppMemberLayout>
</template>

<script>
import AppMemberLayout from "@/components/AppMemberLayout";
export default {
  name: "OrderListPage.vue",
  components: { AppMemberLayout },
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}
</style>
