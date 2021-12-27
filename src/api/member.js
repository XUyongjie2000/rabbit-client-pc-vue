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

/**
 * 获取订单列表
 * @param page 当前页
 * @param pageSize  每页显示多少条数据
 * @param orderState 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @returns {Promise}
 */
export function getOrderList({ page, pageSize, orderState }) {
  return requestWithToken("/member/order", "get", {
    page,
    pageSize,
    orderState,
  });
}
