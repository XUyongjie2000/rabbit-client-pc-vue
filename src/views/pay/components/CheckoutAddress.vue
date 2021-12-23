<template>
  <div class="address">
    <div class="text">
      <div v-if="!finalAddress" class="none">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ finalAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{
            finalAddress.contact.replace(/(\d{3})(\d{4})(\d{4})/g, "$1****$2")
          }}
        </li>
        <li>
          <span>收货地址：</span
          >{{ finalAddress.fullLocation + finalAddress.address }}
        </li>
      </ul>
      <a href="javascript:" @click="modifyAddress">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="switchAddress">切换地址</XtxButton>
      <XtxButton class="btn" @click="addAddress">添加地址</XtxButton>
    </div>
  </div>
  <AddressEdit ref="addressEditInstance" @onAddressChanged="onAddressChanged" />
  <AddressSwitch
    ref="addressSwitchInstance"
    :list="addresses"
    @onAddressChanged="onAddressChanged"
    :activeAddressId="finalAddress?.id"
  />
</template>

<script>
import AddressEdit from "@/views/pay/components/AddressEdit";
import { computed, ref } from "vue";
import { getAddress } from "@/api/order";
import AddressSwitch from "@/views/pay/components/AddressSwitch";
export default {
  name: "CheckoutAddress",
  components: { AddressSwitch, AddressEdit },
  setup() {
    //获取收获地址编辑组件的实例对象
    const addressEditInstance = ref();
    //获取切换收货地址组件的实例对象
    const addressSwitchInstance = ref();
    const { addresses, finalAddress, onAddressChanged } = useAddressList();
    //添加收货地址
    const addAddress = () => {
      //渲染收货地址编辑组件
      addressEditInstance.value.visible = true;
      //在每一次点击添加收获地址的时候清空表单
      addressEditInstance.value.address = {
        //收货人姓名
        receiver: "",
        //联系方式： 手机号
        contact: "",
        //详细地址
        address: "",
        //邮政编码
        postalCode: "",
        //地址标签
        addressTags: "",
        //是否设置为默认的收货地址
        isDefault: false,
        //省编码
        provinceCode: "",
        //市编码
        cityCode: "",
        //县区编码
        countyCode: "",
      };
    };
    //修改收获地址
    const modifyAddress = () => {
      //渲染AddressEdit组件
      addressEditInstance.value.visible = true;
      const { isDefault, fullLocation, ...rest } = finalAddress.value;
      //将现有的收货地址渲染到弹框内
      addressEditInstance.value.address = {
        ...rest,
        isDefault: isDefault === 0,
      };
      setTimeout(() => {
        addressEditInstance.value.XtxCityInstance.location = fullLocation;
      }, 0);
    };
    //切换收获地址
    const switchAddress = () => {
      //渲染切换收获地址组件
      addressSwitchInstance.value.visible = true;
    };
    return {
      addAddress,
      addressEditInstance,
      addresses,
      finalAddress,
      onAddressChanged,
      modifyAddress,
      addressSwitchInstance,
      switchAddress,
    };
  },
};
function useAddressList() {
  //用于存储收货地址列表
  const addresses = ref([]);
  //用于向服务器发送请求获取收货地址列表
  const getData = (callback) => {
    getAddress().then((data) => {
      //存储收货地址列表
      addresses.value = data.result;
      //在调用getDate 方法的时候 如果传递了callback 就调用callback 并传递最新的收货地址列表
      callback && callback(data.result);
    });
  };
  //用于存储用户选择的收货地址
  const selectedAddress = ref(null);
  //获取优先级最高的收货地址
  const finalAddress = computed(() => {
    let result = null;
    //如果用户选择了收获地址 优先渲染用户选择的收获地址
    if (selectedAddress.value) {
      result = selectedAddress.value;
    } else {
      //如果用户没有选择收获地址 渲染默认的收获地址
      //判断收获地址列表中是否存在收获地址
      if (addresses.value.length > 0) {
        //查找默认收获地址
        result = addresses.value.find((item) => item.isDefult === 0);
        //判断是否查找到了默认的收获地址  如果没有默认收获地址 渲染收获地址列表中的第一个收获地址
        if (!result) {
          result = addresses.value[0];
        }
      }
    }
    return result;
  });
  //用户更改了收货地址
  //重新向服务器端发起请求，获取新的收货地址列表
  //从新的收获地址中查找用户新添加的收货地址
  //将用户新添加的收获地址赋值给 selectedAddress
  const onAddressChanged = (id) => {
    getData((list) => {
      selectedAddress.value = list.find((item) => item.id === id);
    });
  };
  getData();
  return { addresses, finalAddress, onAddressChanged };
}
</script>
<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
