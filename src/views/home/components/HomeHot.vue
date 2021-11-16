<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <ul class="goods-list" v-if="homeHot">
      <li v-for="item in homeHot" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <transition name="fade">
      <HomeSkeleton v-if="!homeHot" />
    </transition>
  </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import { getHomeHot } from "@/api/home";
import useLazyData from "@/hooks/useLazyData";
import HomeSkeleton from "@/views/home/components/HomeSkeleton";
export default {
  name: "HomeHot",
  components: { HomeSkeleton, HomePanel },
  setup() {
    const { target, result: homeHot } = useLazyData(getHomeHot);
    return { homeHot, target };
  },
};
// function useHomeHot() {
//   //用于储存人气推荐数据
//   const homeHot = ref();
//   //获取并储存人气推荐数据
//   const getData = () => {
//     getHomeHot().then((data) => {
//       homeHot.value = data.result;
//     });
//   };
//   return { homeHot, getData };
// }
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
.home-skeleton {
  top: 115px;
}
</style>
