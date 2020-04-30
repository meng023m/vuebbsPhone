import {USER_IN, GET_USERINFO, USERLIST, HOSTLIST, TOKEN, GET_USER, GETMYQA} from './mutation-types.js'
export default {
  USER_IN ({commit}, userin) {
    commit(USER_IN, userin)
  },
  GET_USERINFO ({commit}, data) {
    commit(GET_USERINFO, data)
  },
  USERLIST ({commit}, data) {
    commit(USERLIST, data)
  },
  HOSTLIST ({commit}, data) {
    commit(HOSTLIST, data)
  },
  TOKEN ({commit}, data) {
    commit(TOKEN, data)
  },
  GET_USER ({commit}, data) {
    commit(GET_USER, data)
  },
  GETMYQA ({commit}, data) {
    commit(GETMYQA, data)
  }
}
