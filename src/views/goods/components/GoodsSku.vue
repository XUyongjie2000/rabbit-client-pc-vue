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
  },

  setup(props) {
    const pathMap = createPathMap(props.skus);
    console.log(pathMap);
    const updateSelected = (specs, value) => {
      //如果当前规格已经被禁用 什么也不执行
      if (value.disabled) {
        return;
      }
      if (value.selected) {
        //如果当前规格已经是选中的 你还去点击 就取消选中状态
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
    };
    updateDisabled(props.specs, pathMap);
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
  specs.forEach((spec) => {
    //遍历当前规格的具体规格选项
    spec.values.forEach((value) => {
      //如果再规格查询对象中 没有当前规格
      if (!(value.name in pathMap)) {
        //禁用当前规格
        value.disabled = true;
      }
    });
  });
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
