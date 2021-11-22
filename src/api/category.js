import { requestWithoutToken } from "@/utils/requset";

/**
 * 获取一级分类的具体信息
 * @param id 一级类目ID
 * @returns {Promise}
 */
export function getTopCategoryById(id) {
  return requestWithoutToken("/category", "get", { id });
}

/**
 *获取二级分类筛选条件
 * @param id 二级分类id
 * @returns {Promise}
 */
export function getSubCategoryFilterById(id) {
  return requestWithoutToken("/category/sub/filter", "get", { id });
}

/**
 *获取商品列表数据
 * @param reqParams 请求参数：二级分类id、筛选条件、分页信息、排序条件
 * @returns {Promise}
 */
export function getGoodsList(reqParams) {
  return requestWithoutToken("/category/goods", "post", reqParams);
}
