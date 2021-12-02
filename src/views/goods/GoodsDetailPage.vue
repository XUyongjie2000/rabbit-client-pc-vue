<template>
  <AppLayout>
    <div class="xtx-goods-page" v-if="goodsDetail">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread>
          <XtxBreadItem path="/">首页</XtxBreadItem>
          <XtxBreadItem :path="`/category/${goodsDetail.categories[1].id}`">{{
            goodsDetail.categories[1].name
          }}</XtxBreadItem>
          <XtxBreadItem
            :path="`/category/sub/${goodsDetail.categories[0].id}`"
            >{{ goodsDetail.categories[0].name }}</XtxBreadItem
          >
          <XtxBreadItem>{{ goodsDetail.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media">
            <GoodsImages :images="goodsDetail.mainPictures" />
            <!--商品售卖组件-->
            <GoodsSales />
          </div>
          <!-- 右侧 -->
          <div class="spec">
            <GoodsInfo :goods="goodsDetail" />
            <!--规格组件  skuId="1369155865461919746"-->
            <GoodsSku
              @onSpecChanged="onSpecChanged"
              :skus="goodsDetail.skus"
              :specs="goodsDetail.specs"
            />
            <!--商品数量选择组件-->
            <XtxNumberBox
              label="数量"
              v-model="goodsCount"
              :max="goodsDetail.inventory"
            />
            <!--加入购物车-->
            <XtxButton type="primary" :style="{ 'margin-top': '20px' }"
              >加入购物车</XtxButton
            >
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant :goodsId="goodsDetail.id"></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <GoodsTab />
            <!--            <div class="goods-tabs"></div>-->
            <!-- 注意事项 -->
            <div class="goods-warn">
              <GoodsWarn />
            </div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { getGoodsDetail } from "@/api/goods";
import { provide, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsImages from "@/views/goods/components/GoodsImages";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import GoodsSku from "@/views/goods/components/GoodsSku";
import XtxNumberBox from "@/components/library/XtxNumberBox";
import XtxButton from "@/components/library/XtxButton";
import GoodsTab from "@/views/goods/components/GoodsTab";
import GoodsHot from "@/views/goods/components/GoodsHot";
import GoodsWarn from "@/views/goods/components/GoodsWarn";
export default {
  name: "GoodsDetailPage",
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTab,
    XtxButton,
    XtxNumberBox,
    GoodsSku,
    GoodsInfo,
    GoodsSales,
    GoodsImages,
    GoodsRelevant,
    AppLayout,
  },
  setup() {
    const { goodsDetail, getData } = useGoodsDetail();
    const route = useRoute();
    //用于存储 用户选择的商品数量
    const goodsCount = ref(1);
    //发送请求获取商品详细信息
    getData(route.params.id);
    //当用户选择完成的规格以后 更新视图
    const onSpecChanged = (data) => {
      // console.log(data);
      goodsDetail.value.price = data.price;
      goodsDetail.value.oldPrice = data.oldPrice;
      goodsDetail.value.inventory = data.inventory;
    };
    //将商品详情页面 开放到子组件
    provide("goodsDetail", goodsDetail);
    return { goodsDetail, onSpecChanged, goodsCount };
  },
};
//用于获取商品详情信息的方法
function useGoodsDetail() {
  //用于存储商品详情信息
  const goodsDetail = ref();
  //用于获取商品详情信息的方法
  const getData = (id) => {
    //向服务器端发送请求获取商品详情信息
    getGoodsDetail(id).then((data) => {
      //用于存储商品详情信息
      goodsDetail.value = data.result;
    });
  };
  return { goodsDetail, getData };
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
