<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle">
      <span class="placeholder" v-if="!location">请选择配送地址</span>
      <span class="value" v-else>{{ location }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>

    <div class="option" v-if="visible">
      <template v-if="cityData">
        <span
          @click="updateSelectedCityData(item)"
          class="ellipsis"
          v-for="item in list"
          :key="item.id"
          >{{ item.name }}</span
        >
      </template>
      <template v-else><div class="loading"></div></template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
export default {
  name: "XtxCity",
  setup(props, { emit }) {
    //用于控制弹框的显示和隐藏
    const visible = ref(false);
    //获取城市组件最外层的元素
    const target = ref();
    //用于存储城市数据
    const cityData = ref();
    //用于存储 用户选择的省市区数据
    //code用于发送给服务器端
    //Name用于模板展示
    const selectedCityData = reactive({
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      provinceName: "",
      cityName: "",
      countyName: "",
    });
    //用于展示用户选择的省市区级数据
    const location = ref("");
    //用于记录用户选择的是什么
    const updateSelectedCityData = (item) => {
      console.log(item);
      //item.level 0省 1市 2县
      if (item.level === 0) {
        selectedCityData.provinceCode = item.code;
        selectedCityData.provinceName = item.name;
      } else if (item.level === 1) {
        selectedCityData.cityCode = item.code;
        selectedCityData.cityName = item.name;
      } else {
        selectedCityData.countyCode = item.code;
        selectedCityData.countyName = item.name;
      }
    };
    //替换页面中的省市区数据
    const list = computed(() => {
      //列表的初始值为省级列表
      let list = cityData.value;
      //判断用户是否选择了省级数据
      if (selectedCityData.provinceCode) {
        // console.log("省级");
        //从省级列表中查找用户选择的省级对象
        //返回省级对象下的市级列表并替换 list
        list = list.find(
          (item) => item.code === selectedCityData.provinceCode
        ).areaList;
      }
      //判断用户是否选择了市级数据
      if (selectedCityData.cityCode) {
        //从市级列表中查找用户选择的市并返回该市下面的县区级列表
        list = list.find(
          (item) => (item.code = selectedCityData.cityCode)
        ).areaList;
      }
      //判断用户是否选择了县区级数据
      if (selectedCityData.countyCode) {
        const { provinceCode, cityCode, countyCode } = selectedCityData;
        emit("onCityChanged", { provinceCode, cityCode, countyCode });
        //再次打开  显示初始的城市数据
        list = cityData.value;
        //如果用户选择了县区级 隐藏列表
        hide();
      }
      return list;
    });
    //弹框显示
    const show = () => {
      visible.value = true;
      getCityData().then((data) => {
        // console.log(data);
        cityData.value = data;
      });
    };
    //弹框隐藏
    const hide = () => {
      visible.value = false;
      if (selectedCityData.countyName) {
        // 拼接数据
        location.value = `${selectedCityData.provinceName} ${selectedCityData.cityName} ${selectedCityData.countyName}`;
      }
      //重置用户选择的省市区数据
      for (let attr in selectedCityData) {
        selectedCityData[attr] = "";
      }
    };
    //弹框切换显示和隐藏
    const toggle = () => {
      visible.value ? hide() : show();
    };
    //点击城市组件外面的时候  执行弹框隐藏
    onClickOutside(target, () => {
      hide();
    });
    return {
      visible,
      toggle,
      target,
      cityData,
      updateSelectedCityData,
      list,
      location,
    };
  },
};
//用于缓存城市数据
window.cityData = null;
async function getCityData() {
  //如果window中有城市数据  就用window上的
  if (window.cityData) return window.cityData;
  //如果本地没有 就向服务器端发送请求 获取城市数据
  let data = await axios
    .get(
      "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
    )
    .then((response) => response.data);
  //缓存城市数据
  //window.cityData = data;
  //返回城市数据
  //return { data };
  return (window.cityData = data);
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
