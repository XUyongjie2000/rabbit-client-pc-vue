<template>
  <div class="goods-hot" v-if="hotGoods">
    <h3>{{ title[type] }}</h3>
    <GoodsItem
      v-for="item in hotGoods"
      :key="item.id"
      :goods="item"
    ></GoodsItem>
  </div>
</template>
<script>
import GoodsItem from "@/views/category/components/GoodsItem";
import { ref } from "vue";
import { getHotGoods } from "@/api/goods";
import { useRoute } from "vue-router";
export default {
  name: "GoodsHot",
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const { hotGoods, title } = useHotGoods(props.type);
    return { hotGoods, title };
  },
};
//获取热销榜单数据
function useHotGoods(type) {
  //用于存储热销榜单数据
  const hotGoods = ref();
  //获取路由信息对象
  const route = useRoute();
  const title = ref({
    1: "24小时热榜",
    2: "周榜",
    3: "总榜",
  });
  //用于获取热销榜单对象的方法
  const getData = () => {
    //向服务端发起请求获取热销榜单数据
    getHotGoods({ id: route.params.id, type }).then((data) => {
      //存储热销榜单数据
      hotGoods.value = data.result;
    });
  };
  getData();
  return { hotGoods, getData, title };
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
