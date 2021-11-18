<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category.topCategory?.id}`">{{
          category.topCategory?.name
        }}</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.subCategory?.id">{{
            category.subCategory?.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  name: "SubCategoryPage",
  components: { AppLayout },
  setup() {
    //获取面包屑导航需要的分类数据
    const category = useBread();
    return { category };
  },
};
function useBread() {
  //获取store对象
  const store = useStore();
  //获取route对象
  const route = useRoute();
  //根据二级分类 id查找二级分类和一级分类
  return computed(() => {
    //用于储存一级分类和二级分类的对象
    const result = {};
    //遍历一级分类
    store.state.category.list.forEach((topCategory) => {
      //遍历二级分类
      topCategory.children?.forEach((subCategory) => {
        //查找当前二级分类
        if (subCategory.id === route.params.id) {
          //储存一级分类
          result.topCategory = {
            name: topCategory.name,
            id: topCategory.id,
          };
          //储存二级分类
          result.subCategory = {
            name: subCategory.name,
            id: subCategory.id,
          };
        }
      });
    });
    return result;
  });
}
</script>

<style scoped></style>
