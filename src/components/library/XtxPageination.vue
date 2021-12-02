<template>
  <div class="xtx-pagination">
    {{ pageInfo.pageNumberAry }}
    <a href="javascript:">上一页</a>
    <span>...</span>
    <a href="javascript:">3</a>
    <a href="javascript:">4</a>
    <a href="javascript:" class="active">5</a>
    <a href="javascript:">6</a>
    <a href="javascript:">7</a>
    <span>...</span>
    <a href="javascript:">下一页</a>
  </div>
</template>
<script>
import { computed, ref } from "vue";

export default {
  name: "XtxPagination",
  setup() {
    //当前页
    const currentPage = ref(1);
    //总数据条数
    const total = ref(20);
    //每页显示的数据条数
    const pageSize = ref(10);
    //页面中一次最多显示的页码数量
    const pageButtonMaxNumber = 5;
    //页码的偏移量
    const pageOffset = Math.floor(pageButtonMaxNumber / 2);
    const pageInfo = computed(() => {
      //计算总页数
      const totalPage = Math.ceil(total.value / pageSize.value);
      //计算显示着的开始页码值
      let start = currentPage.value - pageOffset;
      //计算显示着的结束页码值
      let end = start + pageButtonMaxNumber - 1;
      //如果显示着的页码的小于1
      if (start < 1) {
        //让显示着页码等于1
        start = 1;
        //重新计算结束页码
        const temp = start + pageButtonMaxNumber - 1;
        end = temp > totalPage ? totalPage : temp;
      }
      //如果显示的结束页码大于总页数
      if (end > totalPage) {
        //让显示着的结束页码等于总页数
        end = totalPage;
        //重新计算开始页码
        const temp = end - pageButtonMaxNumber + 1;
        start = temp < 1 ? 1 : temp;
      }
      //声明存储页码的数组
      let pageNumberAry = [];
      //遍历生成页码数组
      for (let i = start; i <= end; i++) {
        pageNumberAry.push(i);
      }
      return { pageNumberAry };
    });
    return { pageInfo, currentPage };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
