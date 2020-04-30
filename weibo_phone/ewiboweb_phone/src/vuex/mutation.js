
import {
  GET_USERINFO,
  USER_IN,
  USERLIST, HOSTLIST, TOKEN, GET_USER, GETMYQA
} from './mutation-types.js'
export default{
  // 获取用户信息
  [GET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [USER_IN] (state, userin) {
    state.user_in = userin
  },
  [USERLIST] (state, data) {
    state.UserList = data
  },
  [HOSTLIST] (state, data) {
    state.hotList = data
  },
  [TOKEN] (state, data) {
    state.token = data
  },
  [GET_USER] (state, user) {
    state.user = user
  },
  [GETMYQA] (state, data) {
    state.getMyQa = data
  }
}
