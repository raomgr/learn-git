import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'
import roleManage from './modules/roleManage'
import userManage from './modules/userManage'
import getters from './getters'

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    tagsView,
    roleManage,
    userManage
  },
  getters,
  strict: false
})

export default store
