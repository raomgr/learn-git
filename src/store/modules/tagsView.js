import * as types from '../mutaion-types'
import storage from '@/utils/storage'

const setViews = visitedViews => {
  storage.set('visitedViews', visitedViews)
}

const tagView = {
  state: {
    visitedViews: storage.get('visitedViews') || [],
    cachedViews: []
  },
  mutations: {
    // 点击侧边栏向tagviews添加标签
    [types.ADD_VISITED_TAG]: (state, route) => {
      // 如果已存在当前路由标签，则不再重复添加
      if (state.visitedViews.some(view => view.name === route.name)) return

      state.visitedViews.push({
        name: route.name,
        title: route.meta.title || 'empty-name',
        path: route.path
      })
      if (route.cache) {
        state.cachedViews.push(route.name)
      }
      setViews(state.visitedViews)
    },
    // 关闭标签
    [types.REMOVE_VISITED_TAG]: (state, tag) => {
      for (let [index, viewItem] of state.visitedViews.entries()) {
        if (viewItem.path === tag.path) {
          state.visitedViews.splice(index, 1)
          break
        }
      }
      for (let [index, name] of state.cachedViews.entries()) {
        if (name === tag.name) {
          state.cachedViews.splice(index, 1)
        }
      }
      setViews(state.visitedViews)
    },
    // 关闭除当前标签以外的其他标签
    [types.CLOSE_OTHER_TAG]: (state, route) => {
      const newView = new Array({
        name: route.name,
        title: route.meta.title || 'empty-name',
        path: route.path
      })
      state.visitedViews = newView
      setViews(newView)
    },
    // 关闭所有标签
    [types.CLOSE_ALL_TAG]: state => {
      state.visitedViews = []
      setViews([])
    }
  },
  actions: {
    addVisitedTag({ commit }, route) {
      // 当进入的路由为诚信报告、成绩详情、订单详情页时不在本地存储该路由
      switch (route.name) {
        case 'confirmorder':
        case 'detail':
        case 'integrity':
          break
        default:
          commit(types.ADD_VISITED_TAG, route)
      }
    },
    removeVisitedTag({ commit, state }, tag) {
      return new Promise(resolve => {
        commit(types.REMOVE_VISITED_TAG, tag)
        resolve(state.visitedViews)
      })
    },
    closeOtherView({ commit }, route) {
      commit(types.CLOSE_OTHER_TAG, route)
    },
    closeAllView({ commit }) {
      return new Promise(resolve => {
        commit(types.CLOSE_ALL_TAG)
        resolve()
      })
    }
  }
}

export default tagView
