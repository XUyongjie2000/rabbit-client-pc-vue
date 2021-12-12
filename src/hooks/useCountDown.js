import { useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

export default function useCountDown() {
  //此方法和原生js中的setInterval的作用一样的
  //pause 清除定时器
  //resume 重新开启定时器
  //isActive 定时器是否正在执行
  //immediate: false,阻止定时器立即执行
  const count = ref(0);
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      //判断数值是否小于等于0
      if (count.value <= 0) {
        //清除定时器
        pause();
      } else {
        //让count减1
        count.value = count.value - 1;
      }
    },
    1000,
    {
      immediate: false,
    }
  );
  //外部调用此方法 开始倒计时
  const start = (value) => {
    if (!isActive.value) {
      count.value = value;
      resume();
    }
  };
  return { count, start, isActive };
}
