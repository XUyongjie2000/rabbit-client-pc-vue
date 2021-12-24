import { requestWithToken } from "@/utils/requset";

/**
 *  获取收藏数据
 * @param page 当前页
 * @param pageSize 每页显示多少条数据
 * @param collectType 收藏类型，1为商品，2为专题，3为品牌
 * @returns {Promise}
 */
export function getCollection({ page, pageSize, collectType = 1 }) {
  return requestWithToken("/member/collect", "get", {
    page,
    pageSize,
    collectType,
  });
}
