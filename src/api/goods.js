import { requestWithoutToken } from "@/utils/requset";

/**
 * 获取商品的详细信息
 * @param id 商品ID
 * @returns {Promise}
 */
export function getGoodsDetail(id) {
  return requestWithoutToken("/goods", "get", { id });
}

/**
 * 获取同类商品或猜你喜欢
 * @param id 商品ID
 * @param limit 限制请求数据的数量
 * @returns {Promise}
 */
export function getRelevantGoods({ id, limit = 16 }) {
  return requestWithoutToken("/goods/relevant", "get", { id, limit });
}

/**
 * 获取榜单数据
 * @param id 商品id
 * @param limit 一次请求的数据数量
 * @param type 热销类型 1为24小时 2为周榜 3为总榜 默认为1
 * @returns {Promise}
 */
export function getHotGoods({ id, limit = 3, type }) {
  return requestWithoutToken("/goods/hot", "get", { id, limit, type });
}

/**
 *获取评价组件头部信息
 * @param id 商品id
 * @returns {Promise}
 */
export function getCommentInfo(id) {
  return requestWithoutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    "get"
  );
}

/**
 * 获取评价列表数据
 * @param params 参数对象 分页信息 商品id 标签 是否有图 排序字段 排序方法
 * @returns {Promise}
 */
export function getCommentList(params) {
  return requestWithoutToken(
    `https://mock.boxuegu.com/mock/1175/goods/${params.id}/evaluate/page`,
    "get",
    params
  );
}
