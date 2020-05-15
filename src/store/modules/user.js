import { setToken, removeToken, getToken } from '@/utils/auth'
import Api from '@/api'
import storage from '@/utils/storage'
import * as types from '../mutaion-types'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    userId: storage.get('userId'),
    name: '',
    email: '',
    roleNames: [],
    roleIdList: [],
    regionName: ''
  },
  mutations: {
    [types.SET_TOKEN]: (state, {token, userId}) => {
      state.token = token
      state.userId = userId
      storage.set('userId', userId)
      // setToken(token)
    },

    setUserInfo(state, {name, email, roleNames, regionName, roleIdList}) {
      console.log(name, email, roleNames, regionName)
      state.name = name
      state.email = email
      state.roleNames = roleNames
      state.roleIdList = roleIdList
      state.regionName = regionName
    },
  },
  actions: {
    setRoles({ commit }, { token, userId}) {
      commit(types.SET_TOKEN, {token, userId})
    },


    logout({ commit }, state) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // 清除访问路径
        storage.remove('visitedViews')
        removeToken()
        resolve()
      })
    },

    getUser({commit, state}) {
      console.log(state.userId)
      Api.getUserInfo({userId: 2})
        .then(res => {
          console.log(res)
          commit('setUserInfo', {
            name: res.realName,
            email: res.email,
            roleNames: res.roleName,
            roleIdList: res.roleIdList,
            regionName: res.regionName
          })
        })
    }
  }
}

export default user
