<template>
  <XtxDialog
    v-model:visible="visible"
    :title="`${address.id ? '修改' : '添加'}收货地址`"
  >
    <template v-slot:default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                v-model="address.receiver"
                class="input"
                placeholder="请输入收货人"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                v-model="address.contact"
                class="input"
                placeholder="请输入手机号"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity
                @onCityChanged="onCityChanged"
                placeholder="请选择所在地区"
                ref="XtxCityInstance"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                v-model="address.address"
                class="input"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                v-model="address.postalCode"
                class="input"
                placeholder="请输入邮政编码"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                v-model="address.addressTags"
                class="input"
                placeholder="请输入地址标签，逗号分隔"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                v-model="address.isDefault"
                type="checkbox"
                class="checkbox"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <XtxButton
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
      >
        取消
      </XtxButton>
      <XtxButton @click="onSureClickHandler" type="primary">{{
        address.id ? "修改" : "添加"
      }}</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from "vue";
import { addAddress, updateAddress } from "@/api/order";
import Message from "@/components/library/Message";

export default {
  name: "AddressEdit",
  setup(props, { emit }) {
    // 用于控制弹框是否显示
    const visible = ref(false);
    //添加收获地址时候的请求参数
    const address = ref({});
    //用于存储城市选择组件的实例对象
    const XtxCityInstance = ref();
    //当用户选择完收货地址以后
    const onCityChanged = (data) => {
      //存储用户选择的省市区编码
      address.value.provinceCode = data.provinceCode;
      address.value.cityCode = data.cityCode;
      address.value.countyCode = data.countyCode;
    };
    // 用于执行用户点击确定按钮之后的逻辑代码
    const onSureClickHandler = async () => {
      //声明请求参数
      const target = {
        ...address.value,
        isDefault: address.value.isDefault ? 0 : 1,
      };
      //区分当前是添加操作还是修改操作
      if (target.id) {
        //修改操作
        try {
          //向服务器端发起请求修改收货地址
          const data = await updateAddress(target);
          Message({ type: "success", text: "修改收获地址成功" });
          //隐藏弹框
          visible.value = false;
          //触发自定义事件  告诉父组件我修改了收获地址
          emit("onAddressChanged", data.result.id);
        } catch (error) {
          Message({ type: "success", text: "修改收获地址失败" });
        }
      } else {
        //添加操作
        try {
          //向服务器端发起请求 添加收货地址
          let data = await addAddress(target);
          //收货地址添加成功之后的提示
          Message({ type: "success", text: "添加收获地址成功" });
          //隐藏弹框
          visible.value = false;
          //触发自定义事件  告诉父组件我添加了一个新的收获地址 将新的收获地址传递给父组件
          emit("onAddressChanged", data.result.id);
        } catch (error) {
          //收获地址添加失败后的提示
          Message({ type: "error", text: "添加收获地址失败" });
        }
      }
    };

    return {
      visible,
      onSureClickHandler,
      onCityChanged,
      address,
      XtxCityInstance,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    width: auto;
    &:last-child {
      padding-bottom: 0;
    }
  }
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
