import { requestWithoutToken } from "@/utils/requset";

/**
 * 根据账号和密码进行登录
 * @param account 账号
 * @param password 密码
 * @returns {Promise}
 */
export function loginByAccount({ account, password }) {
  return requestWithoutToken("login", "post", { account, password });
}

/**
 *获取手机号验证码
 * @param mobile 手机号
 * @returns {Promise}
 */
export function getMsgCodeByMobileLogin(mobile) {
  return requestWithoutToken("/login/code", "get", { mobile });
}

/**
 * 通过手机号进行登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns {Promise}
 */
export function loginByMobile({ mobile, code }) {
  return requestWithoutToken("/login/code", "post", { mobile, code });
}
