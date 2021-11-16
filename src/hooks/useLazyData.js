import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default function useLazyData(apiFunction) {
  //1.创建用于获取元素的ref
  const target = ref();
  //2.创建用于存储数据的变量
  const result = ref();
  //3.监听元素是否进入可视区
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    //4.当元素进入可视区，停止监听，获取数据
    if (isIntersecting) {
      stop();
      apiFunction().then((data) => {
        result.value = data.result;
      });
    }
  });

  //5.返回数据以及元素
  return { target, result };
}
