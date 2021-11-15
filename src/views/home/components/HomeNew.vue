<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:default>
      <ul class="goods-list" v-if="homeNew">
        <li v-for="item in homeNew" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>
<script>
import HomePanel from "@/views/home/components/HomePanel";
import { ref } from "vue";
import { getNewGoods } from "@/api/home";
export default {
  name: "HomeNew",
  components: { HomePanel },
  setup() {
    const { homeNew, getData } = useHomeNew();
    getData();
    return { homeNew };
  },
};
function useHomeNew() {
  const homeNew = ref();
  const getData = () => {
    getNewGoods().then((data) => {
      homeNew.value = data.result;
    });
  };
  return { homeNew, getData };
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
