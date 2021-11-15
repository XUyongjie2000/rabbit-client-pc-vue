<template>
  <div class="home-banner">
    <XtxCarousel
      :autoplay="true"
      :duration="3000"
      v-if="banners"
      :carousels="banners"
    />
  </div>
</template>
<script>
import { ref } from "vue";
import { getBanners } from "@/api/home";

export default {
  name: "HomeBanner",
  setup() {
    const { banners, getData } = useBanners();
    getData();
    return { banners };
  },
};
//获取轮播图数据
function useBanners() {
  //储存轮播图数据
  const banners = ref();
  //获取轮播图数据
  const getData = () => {
    getBanners().then((data) => {
      banners.value = data.result;
    });
  };
  //返回轮播图数据
  return { banners, getData };
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
