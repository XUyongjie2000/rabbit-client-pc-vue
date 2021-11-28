import { requestWithoutToken } from "@/utils/requset";

export function getGoodsDetail(id) {
  return requestWithoutToken("/goods", "get", { id });
}
