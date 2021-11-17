import { requestWithoutToken } from "@/utils/requset";

/**
 * 获取分类列表数据
 * @returns {Promise}
 */
export function getCategoriesApi() {
  return requestWithoutToken("/home/category/head", "get");
}

/**
 *获取新鲜好物
 * @param limit 限制请求数据的数量
 * @returns {Promise}
 */
export function getBrands(limit = 6) {
  return requestWithoutToken("/home/brand", "get", { limit });
}

/**
 *获取轮播图数据
 * @param distributionSite 广告区域展示位置（投放位置 1为首页 2为分类商品页） 默认是1
 * @returns {Promise}
 */
export function getBanners(distributionSite = 1) {
  return requestWithoutToken("/home/banner", "get", { distributionSite });
}

/**
 *获取新鲜好物
 * @param limit 限制请求数据的数量
 * @returns {Promise}
 */
export function getNewGoods(limit = 4) {
  return requestWithoutToken("/home/new", "get", { limit });
}

/**
 * 获取人气推荐数据
 * @returns {Promise}
 */
export function getHomeHot() {
  return requestWithoutToken("/home/hot", "get");
}

/**
 * 获取产品区块数据
 * @returns {Promise}
 */
export function getProducts() {
  return requestWithoutToken("/home/goods", "get");
}

export function getSpecial() {
  return requestWithoutToken("/home/special", "get");
}
