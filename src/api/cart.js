import { requestWithoutToken, requestWithToken } from "@/utils/requset";

/**
 *根据skuId更新商品信息
 * @param skuId
 * @returns {Promise}
 */
export function updateGoodsOfCartBySkuId(skuId) {
  return requestWithoutToken(`/goods/stock/${skuId}`, "get");
}

/**
 * 获取商品的sku信息   1.供用户选择的页面中渲染的规格数据  2.当前商品的所有可组件的sku信息
 * @param skuId  商品skuId
 * @returns {Promise}
 */
export function getGoodsOfSkuInfo(skuId) {
  return requestWithoutToken(`/goods/sku/${skuId}`, "get");
}

/**
 * 合并购物车
 * @param cart Array[]   {skuId,selected,count}
 * @returns {Promise}
 */
export function mergeServerCart(cart) {
  return requestWithToken("/member/cart/merge", "post", cart);
}

/**
 * 获取服务器端购物列表
 * @returns {Promise}
 */
export function getServerCart() {
  return requestWithToken("/member/cart", "get");
}
