//获取轮播图数据
import { ref } from "vue";
import { getBanners } from "@/api/home";

export default function useBanners() {
  //储存轮播图数据
  const banners = ref();
  //获取轮播图数据
  const getData = (distributionSite) => {
    getBanners(distributionSite).then((data) => {
      banners.value = data.result;
    });
  };
  //返回轮播图数据
  return { banners, getData };
}
