import { requestWithToken } from "@/utils/requset";

/**
 *创建订单 返回订单信息
 * @returns {Promise}
 */
export function createOrder() {
  return requestWithToken("/member/order/pre", "get");
}
