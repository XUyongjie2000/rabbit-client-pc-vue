const user = {
  //命名空间模块
  namespaced: true,
  //返回该模块下储存的应用状态
  state() {
    return {
      // 用户信息
      profile: {
        // 用户id
        id: "",
        // 用户头像
        avatar: "",
        // 用户昵称
        nickname: "",
        // 用户账号
        account: "",
        // 用户手机号
        mobile: "",
        // 用户登录凭证
        token: "",
      },
    };
  },
  mutations: {
    /**
     *设置用户信息
     * @param state 状态对象
     * @param payload 用户信息
     */
    setUser(state, payload) {
      //判断user对象是否为空
      if (Object.keys(payload).length !== 0) {
        //对象非空 设置用户信息
        state.profile = {
          ...state.profile,
          ...payload,
        };
      } else {
        //空对象
        state.profile = {};
      }
    },
  },
};
export default user;
