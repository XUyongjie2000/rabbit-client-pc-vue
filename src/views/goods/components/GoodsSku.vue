<template>
  <div class="goods-sku">
    <dl v-for="spec in specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values" :key="value.name">
          <img
            @click="updateSelected(spec, value)"
            v-if="value.picture"
            :src="value.picture"
            :class="{ selected: value.selected, disabled: value.disabled }"
            alt=""
          />
          <span
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSelected(spec, value)"
            v-else
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerset from "@/vendor/power-set";
export default {
  name: "GoodsSku",
  props: {
    //用于在页面中渲染的供用户选择的规格数据
    specs: {
      type: Array,
      default: () => [],
    },
    //当前商品可以组合的所有规格组合
    skus: {
      type: Array,
      default: () => [],
    },
    skuId: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const pathMap = createPathMap(props.skus);
    // console.log(pathMap);
    const updateSelected = (specs, value) => {
      //如果当前规格已经被禁用 什么也不执行
      if (value.disabled) {
        return;
      }
      //如果当前规格已经是选中的 你还去点击 就取消选中状态
      if (value.selected) {
        value.selected = false;
      } else {
        //当前规格没有被选中 执行选中操作
        //先将所有的取消选中
        //再让当前的进行选中
        specs.values.forEach((value) => {
          value.selected = false;
        });
        value.selected = true;
      }
      //更新规格的禁用状态
      updateDisabled(props.specs, pathMap);
      sendDataToParent(props.specs, pathMap, props.skus, emit);
    };
    //更新规格的禁用状态
    updateDisabled(props.specs, pathMap);
    //设置规格的默认选中效果
    setDefaultSelected(props.skuId, props.skus, props.specs);
    return { updateSelected };
  },
};
//创建规格查询对象的方法
function createPathMap(skus) {
  //规格查询对象
  const pathMap = {};
  // console.log(skus);
  //遍历所有可以组合的规格组件
  skus.forEach((sku) => {
    //判断规格组件是否有库存
    if (sku.inventory > 0) {
      //获取当前可组合的规格的名称数组['黑色','日本','10cm']
      //[['黑色'],['日本'],['10cm'],['黑色','日本'],['黑色','10cm'],['日本','10cm']]
      // console.log(sku);
      const names = sku.specs.map((item) => item.valueName);
      //完成的规格的数量
      const max = names.length;
      // console.log(names);
      // console.log(powerset(names));
      //获取当前可组合的规格名称的子集
      const sets = powerset(names).filter((item) => item.length > 0);
      // console.log(sets);
      sets.forEach((set) => {
        //'黑色' '日本' '10cm' '黑色_日本' '黑色_10cm' '日本_10cm'
        // console.log(set);
        const key = set.join("_");
        // console.log(key);
        if (!(key in pathMap)) {
          if (set.length === max) {
            //完整的规格
            pathMap[key] = sku.id;
          } else {
            //不完整的规则
            pathMap[key] = null;
          }
        }
      });
    }
  });
  //返回规格查询对象
  return pathMap;
}
//更新规格的禁用状态
function updateDisabled(specs, pathMap) {
  //遍历规格数组
  specs.forEach((spec, index) => {
    //获取到用户选择到的规格
    const selected = getSelected(specs);
    //遍历当前规格的具体规格选项
    spec.values.forEach((value) => {
      //判断当前遍历到的规格是否已经是选中的
      if (value.selected) return;
      //将当前遍历到的规格顺序存储到selected数组中
      selected[index] = value.name;
      //将用户选择的规格名字和用户遍历道得规格名字进行组合
      const key = selected.filter((item) => item).join("_");
      console.log(key);
      //如果再规格查询对象中 没有当前规格
      // if (!(key in pathMap)) {
      //   //禁用当前规格
      //   value.disabled = true;
      // }
      value.disabled = !(key in pathMap);
    });
  });
}
//获取用户选择的规格
function getSelected(specs) {
  // console.log(specs);
  const result = [];
  specs.forEach((spec, index) => {
    const selected = spec.values.find((value) => value.selected);
    if (selected) {
      result[index] = selected.name;
      console.log(selected);
    } else {
      result[index] = undefined;
    }
  });
  return result;
}
function setDefaultSelected(skuId, skus, specs) {
  console.log(specs);
  //skuId 规格ID
  //specs 即将被设置状态的数据
  //skus 当前商品所有可组合的规格集合
  // console.log(skus);
  if (!skuId) {
    return;
  }
  const target = skus.find((sku) => sku.id === skuId);
  const names = target.specs.map((spec) => spec.valueName);
  // console.log(names);
  specs.forEach((spec) => {
    spec.values.forEach((value) => {
      if (names.includes(value.name)) {
        value.selected = true;
      }
    });
  });
}
function sendDataToParent(specs, pathMap, skus, emit) {
  //1.获取用户选择的规格
  const selected = getSelected(specs).filter((item) => item);
  console.log(selected);
  //2.判断用户选择的规格是否是完整的 如果是完整的 才需要将许局传递到父组件
  if (selected.length === specs.length) {
    //3.获取规格id
    const skuId = pathMap[selected.join("_")];
    //4.根据skuId在所有可组合的规格集合中查找规格对象
    // console.log(selected.join("_"));
    // console.log(skuId);
    const target = skus.find((sku) => sku.id === skuId);
    // console.log(target);
    //5.将规格数据传递到父组件
    emit("onSpecChanged", {
      //商品的规格id 将商品加入购物车时使用
      skuId,
      //商品现价
      price: target.price,
      //商品原价
      oldPrice: target.oldPrice,
      //商品库存 在用户选择商品数量的时候使用
      inventory: target.inventory,
      //用户选择道得规格名称字符串
      attrsText: target.specs
        .map((spec) => `${spec.name}:${spec.valueName}`)
        .join(" "),
    });
  } else {
    //当用户选择的不是一个完整规格的时候  告诉父组件清除skuId
    emit("onSpecHalfChanged");
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
