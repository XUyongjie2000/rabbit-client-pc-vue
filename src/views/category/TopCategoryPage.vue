<template>
  <AppLayout>
    <div class="container">
      <!--由于category.list 一开始是假数据 我们从中查询不到我们需要的数据
所以在此需要判断 topCategory 是否存在 如果存在 再找name属性
-->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory?.id">{{
            topCategory?.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!--  调用轮播图组件    -->
      <XtxCarousel
        :carousels="banners"
        :style="{
          height: '500px',
        }"
      />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import XtxBreadItem from "@/components/library/XtxBreadItem";
import XtxBread from "@/components/library/XtxBread";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import useBanners from "@/hooks/useBanners";
import XtxCarousel from "@/components/library/XtxCarousel";
export default {
  name: "TopCategoryPage",
  components: { XtxCarousel, XtxBread, XtxBreadItem, AppLayout },
  setup() {
    const topCategory = useCategory();
    //banners轮播图数据
    //getData获取轮播图数据的方法
    const { banners, getData } = useBanners();
    //获取轮播图数据
    getData(2);
    return { topCategory, banners };
  },
};
function useCategory() {
  //获取store对象
  const store = useStore();
  //获取route对象
  const route = useRoute();
  return computed(() => {
    return store.state.category.list.find(
      (item) => item.id === route.params.id
    );
  });
}
</script>

<style scoped></style>
