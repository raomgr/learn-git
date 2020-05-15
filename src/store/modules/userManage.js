import Api from '@/api'
const userManage = {
  namespaced: true,
  state: {
    showPanel: false,
    panelType: '',
    panelTitle: '',
    userData: {},
    userList: []
  },

  mutations: {
    setUserPanel(state, panelData = {}) {
      state.showPanel = panelData.showPanel
      state.panelType = panelData.panelType
      state.panelTitle = panelData.panelTitle
    },

    setUserData(state, userData = {}) {
      state.userData = userData
    },

    setUserList(state, {userList}) {
      // console.log(userList)
      state.userList = userList
    }
  },

  actions: {
    changeUserPanel({commit}, panelData) {
      // console.log(panelData)
      commit('setUserPanel', panelData)
    },

    changeUser({commit}, userData) {
      console.log(userData)
      commit('setUserData', userData)
    },

    getUserList({commit}) {
      Api.getUserList({
        // regionId: '',
        keyword: '',
        pageSize: 10,
        pageNo: 1
      }).then(res => {
        console.log(res)
        commit('setUserList', {userList: res.accountList})
      })
    }
  }
}

export default userManage
