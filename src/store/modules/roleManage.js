import {SET_PANEL_STATUS} from '../mutaion-types'
import Api from '../../api'

const roleMange = {
  namespaced: true,
  state: {
    showPanel: false,
    permissionIdList: [],
    panelType: '',
    panelTitle: '',
    allRoleList: [],
    roleInfo: {},
    pageSize: 10,
    currentPage: 1,
    treeList: []
  },
  mutations: {
    setPanelStatus(state, {status, panelType, panelTitle}) {
      state.showPanel = status
      state.panelType = panelType
      state.panelTitle = panelTitle
    },
    setPermissionIdList(state, idList) {
      state.permissionIdList = idList
    },

    setAllRoleList(state, roleList) {
      console.log(roleList)
      state.allRoleList = roleList
    },
    setRoleInfo(state, roleInfo) {
      state.roleInfo = roleInfo
    },
    setPageSize(state, pageSize) {
      state.pageSize = pageSize
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setTreeList(state, list) {
      // console.log(list)
      state.treeList = list
    }
  },
  actions: {
    /**
     * 显示隐藏模态框
     * @param commit
     * @param status 显示与否，Boolen
     * @param panelType 类型
     * @param panelTitle 模态框标题
     */
    changePanelStatus({commit}, {status, panelType, panelTitle}) {
      commit('setPanelStatus', {status, panelType, panelTitle})
    },

    /**
     * 获取权限id列表
     * @param commit
     * @param idList 被选中的权限id列表
     */
    handlePermissionIdList({commit}, {idList}) {
      // console.log(idList)
      commit('setPermissionIdList', idList)
    },

    /**
     * 弹框类型
     * @param commit
     * @param panelType 弹框类型
     */
    handlePanelType({commit}, {panelType}) {
      commit('setPanelType', panelType)
    },

    handlePanelTitle({commit}, {panelTitle}) {
      commit('setPanelTitle', panelTitle)
    },

    handleRoleInfo({commit}, {roleInfo}) {
      commit('setRoleInfo', roleInfo)
    },

    getAllRoleList({commit}, {pageSize, pageNo}) {
      Api.getRoleList({
        pageSize,
        pageNo
      }).then(res => {

        commit('setAllRoleList', res.roleList)
        console.log(res)
      })
    },

    handlePageSize({commit}, pageSize) {
      commit('setPageSize', pageSize)
    },

    handleCurrentPage({commit}, currentPage) {
      commit('setCurrentPage', currentPage)
    },

    getTreeList({commit}, treeList) {
      console.log(treeList)
      commit('setTreeList', treeList)
    }

  }
}

export default roleMange
