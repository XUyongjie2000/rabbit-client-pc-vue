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
      <!--筛选条件组件-->
      <SubFilter @onFilterChanged="onFilterSortChanged" />
      <!--商品区块-->
      <div class="goods-list">
        <!-- 商品排序 -->
        <SubSort @onSortChanged="onFilterSortChanged" />
        <!--商品列表组件-->
        <GoodsList :goods="goodsList.items" v-if="goodsList" />
        <!--无限加载组件-->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="loadMore"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import SubFilter from "@/views/category/components/SubFilter";
import SubSort from "@/views/category/components/SubSort";
import GoodsList from "@/views/category/components/GoodsList";
import { getGoodsList } from "@/api/category";
import XtxInfiniteLoading from "@/components/library/XtxInfiniteLoading";
export default {
  name: "SubCategoryPage",
  components: { XtxInfiniteLoading, GoodsList, SubSort, SubFilter, AppLayout },
  setup() {
    //获取面包屑导航需要的分类数据
    const category = useBread();
    //获取商品数据
    const { goodsList, onFilterSortChanged, loadMore, loading, finished } =
      useGoodsList();
    return {
      category,
      onFilterSortChanged,
      goodsList,
      loadMore,
      loading,
      finished,
    };
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

function useGoodsList() {
  //用于存储服务端获取来的商品数据
  const goodsList = ref();
  //获取路由信息对象
  const route = useRoute();
  //获取商品列表时用到的请求参数
  const reqParams = ref({ categoryId: route.params.id, page: 0, pageSize: 5 });
  //控制加载状态
  const loading = ref(false);
  //控制无更多数据可以加载的状态
  const finished = ref(false);
  //用于获取商品列表的方法
  const getData = () => {
    //更新加载状态
    loading.value = true;
    //向服务端发起请求 获取商品列表
    getGoodsList(reqParams.value).then((data) => {
      //存储商品数据
      if (reqParams.value.page === 1) {
        goodsList.value = data.result;
        //当页码重置为1时 重置finished
        finished.value = false;
      } else {
        goodsList.value = {
          ...data.result,
          items: [...goodsList.value.items, ...data.result.items],
        };
      }
      //更新加载状态
      loading.value = false;
      //如果当前页已经是最后一页了
      if (reqParams.value.page === data.result.pages) {
        finished.value = true;
      }
    });
  };
  //加载更多
  const loadMore = () => {
    // console.log("loadMore");
    //当前页 +1
    reqParams.value = {
      ...reqParams.value,
      page: reqParams.value.page + 1,
    };
  };
  //当筛选条件和排序条件发生变化时
  const onFilterSortChanged = (target) => {
    reqParams.value = {
      ...reqParams.value,
      ...target,
      page: 1,
    };
  };
  //初始调用获取商品列表
  watch(
    () => reqParams.value,
    () => {
      getData();
    }
  );
  //当路由参数发生变化以后
  onBeforeRouteUpdate((to) => {
    //更改获取商品列表的请求参数（分类id）
    reqParams.value = {
      categoryId: to.params.id,
      page: 1,
    };
  });
  return {
    goodsList,
    getData,
    onFilterSortChanged,
    loadMore,
    loading,
    finished,
  };
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
