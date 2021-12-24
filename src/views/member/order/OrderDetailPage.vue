<template>
  <AppMemberLayout>
    <div class="order-detail-page">
      订单详情
      <!-- 操作栏 -->
      <!-- 步骤条-->
      <!-- 物流栏 -->
      <!-- 订单商品信息 -->
    </div>
  </AppMemberLayout>
</template>
<script>
import AppMemberLayout from "@/components/AppMemberLayout";
export default {
  name: "OrderDetailPage",
  components: { AppMemberLayout },
};
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
