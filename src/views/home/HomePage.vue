<template>
  <AppLayout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <!--新鲜好物-->
    <HomeNew />
    <!--人气推荐-->
    <HomeHot />
    <!--热门板块-->
    <HomeBrand />
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import HomeNew from "@/views/home/components/HomeNew";
import HomeHot from "@/views/home/components/HomeHot";
import HomeBrand from "@/views/home/components/HomeBrand";
export default {
  name: "HomePage",
  components: {
    HomeBrand,
    HomeHot,
    HomeNew,
    HomeBanner,
    HomeCategory,
    AppLayout,
  },
};
</script>

<style scoped></style>
