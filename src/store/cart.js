import {
  getServerCart,
  mergeServerCart,
  updateGoodsOfCartBySkuId,
} from "@/api/cart";
import Message from "@/components/library/Message";

const cart = {
  //命名空间模块
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    //将商品加入购物车  (本地购物车)
    addGoodsToCart(state, goods) {
      // console.log(goods);
      //1.查看当前要添加的商品是否已经在购物车中了 通过findIndex查找
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);
      //没找到返回-1  如果大于-1就是找到了
      if (index > -1) {
        //找到了 累加商品数量
        state.list[index].count += goods.count;
        //将商品添加到购物车顶部
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        //没找到 直接讲商品添加到购物车顶部
        state.list.unshift(goods);
      }
    },
    //删除购物车中的商品（skuId）
    deleteGoodsOfCart(state, skuId) {
      //1.通过skuId查找商品 返回商品索引
      const index = state.list.findIndex((item) => item.skuId === skuId);
      //2.删除该商品
      if (index > -1) {
        //slice 从数组中进行截取 返回截取数组
        state.list = [
          ...state.list.slice(0, index),
          ...state.list.slice(index + 1),
        ];
      }
    },
    //根据skuId更新商品信息
    updateGoodsBySkuId(state, partOfGoods) {
      //根据skuId在购物车列表中 查找需要更新的商品
      const index = state.list.findIndex(
        (item) => item.skuId === partOfGoods.skuId
      );
      //更新商品
      state.list[index] = {
        ...state.list[index],
        ...partOfGoods,
      };
    },
    //设置状态
    setCate(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    //将商品加入购物车
    addGoodsToCart({ rootState, commit }, goods) {
      //1.如果要加入购物车的商品已经存在了  累加该商品数量
      //2.新添加的购物车商品 要追加到购物车列表的顶部
      //3.判断用户是否登录 如果登录操作服务器端购物车 如果没有 操作本地购物车
      console.log(rootState.user.profile.token);
      if (rootState.user.profile.token) {
        //已经登录
      } else {
        //未登录
        // console.log(goods);
        commit("addGoodsToCart", goods);
        Message({ type: "success", text: "添加购物车成功" });
      }
    },
    //删除购物车中的商品（skuId）
    deleteGoodsOfCart({ rootState, commit }, skuId) {
      //判断用户是否登录
      if (rootState.user.profile.token) {
        //已登录
      } else {
        //未登录
        commit("deleteGoodsOfCart", skuId);
      }
    },
    //更新购物车中的商品信息（自动更新）
    async updateGoodsBySkuId({ rootState, state, commit }) {
      //判断用户是否登录
      if (rootState.user.profile.token) {
        //已登录
        //获取服务器端购物车列表
        let data = await getServerCart();
        //重新赋值
        state.list = data.result;
      } else {
        //未登录
        //遍历购物车中的商品信息
        //发送请求更新商品信息
        const promiseAry = state.list.map((item) =>
          updateGoodsOfCartBySkuId(item.skuId)
        );
        // console.log(promiseAry);
        //按照循序发送请求   按照顺序 拿请求结果
        Promise.all(promiseAry).then((data) => {
          data.forEach((item, index) => {
            //为商品添加skuId
            //因为要根据skuId 更新本地购物车中的商品
            item.result.skuId = state.list[index].skuId;
            commit("updateGoodsBySkuId", item.result);
          });
        });
      }
    },
    //更新购物车中的商品信息(手动更新) (更新商品数量 商品选中状态)
    updateGoodsOfCartBySkuId({ rootState, commit }, partOfGoods) {
      if (rootState.user.profile.token) {
        //已登录
      } else {
        commit("updateGoodsBySkuId", partOfGoods);
        //未登录
      }
    },
    //实现全选和全不全
    selectedAll({ rootState, state, commit }, isSelected) {
      if (rootState.user.profile.token) {
        //已登录
      } else {
        //未登录
        state.list.forEach((item) => {
          commit("updateGoodsBySkuId", {
            skuId: item.skuId,
            selected: isSelected,
          });
        });
      }
    },
    //批量删除用户选择的商品 清空无效商品
    deleteManyGoodsOfCart({ rootState, getters, commit }, flag) {
      //判断用户是否登录
      if (rootState.user.profile.token) {
        //已经登录
      } else {
        //为登录
        getters[flag].forEach((item) => {
          commit("deleteGoodsOfCart", item.skuId);
        });
      }
    },
    //修改商品规格信息
    updateGoodsOfCartBySkuChanged(
      { rootState, state, commit },
      { oldSkuId, newSku }
    ) {
      //通过oldSkuId 去查找原有商品
      //通过newSku  构建新的商品
      if (rootState.user.profile.token) {
        //已经登录
      } else {
        //未登录
        //查找原有商品
        const index = state.list.findIndex((item) => item.skuId === oldSkuId);
        //构建新商品
        const newGoods = {
          ...state.list[index],
          skuId: newSku.skuId,
          stock: newSku.inventory,
          oldPrice: newSku.oldPrice,
          nowPrice: newSku.price,
          attrsText: newSku.attrsText,
        };
        //删除旧商品
        commit("deleteGoodsOfCart", oldSkuId);
        //插入新商品
        commit("addGoodsToCart", newGoods);
      }
    },
    //合并购物车
    async margeCart({ state, commit }) {
      //不需要判断用户是否登录 因为在用户登录后触发
      const cart = state.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      await mergeServerCart(cart);
      //清空本地购物车
      commit("setCary", []);
    },
  },
  getters: {
    //可购买的商品列表
    effectiveGoodsList(state) {
      //1.商品库存大于0
      //2. isEffective字段为真
      return state.list.filter((item) => item.stock > 0 && item.isEffective);
    },
    //可购买的商品价格
    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce((price, item) => {
        //累加商品价格  商品数量*商品价格
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    //可购买的商品总数
    effectiveGoodsCount(state, getters) {
      return getters.effectiveGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },

    //无效商品列表
    invalidGoodsList(state) {
      //库存为0
      //isEffective:true
      return state.list.filter((item) => item.stock === 0 || !item.isEffective);
    },
    //用户选择的商品列表
    selectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },
    //用户选择的商品总价
    selectedGoodsPrice(state, getters) {
      return getters.selectedGoodsList.reduce((price, item) => {
        return price + item.count * Number(item.nowPrice);
      }, 0);
    },
    //用户选择的商品数量
    selectedGoodsCount(state, getters) {
      return getters.selectedGoodsList.reduce((count, item) => {
        return count + item.count;
      }, 0);
    },
    //计算全选按钮的状态
    selectAllButtonStatus(state, getters) {
      //有效商品的数量和选中商品的数量相等意味着所有有效商品已经选中
      //并且有效商品数量 必须大于0
      return (
        getters.effectiveGoodsCount > 0 &&
        getters.selectedGoodsCount === getters.effectiveGoodsCount
      );
    },
  },
};
export default cart;
