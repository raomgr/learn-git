import { constantRouterMap } from '@/router'
import { asyncRouterMap } from '@/router/asyncRouterMap'
import * as types from '../mutaion-types'
import Api from '@/api'


const filterAsync = (asyncRouterMap, list) => {
  const routers = []
  asyncRouterMap.forEach(item => {
    // console.log(list)
    // item.path.substring(1)
    for (let item2 in list) {
      // 将父级路由加入路由表
      if (item2 === item.path.replace(/\//,'')) {
        // console.log(item)
        routers.push(item)
      }
      // 有子路由的时候递归调用
      if (item.children && item.children.length > 1) {
        item.children = filterAsync(item.children, list)
      }
    }
    if (item.path === '') {
      routers.push(item)
    }
    if (item.path === '*') {
      routers.push(item)
    }
  })
  // console.log(routers)
  // routers.push(asyncRouterMap[asyncRouterMap.length-1])
  return routers
}

const permission = {
  state: {
    // 静态路由
    routers: constantRouterMap,
    // 要添加的路由表
    addRouters: []
  },
  mutations: {
    [types.SET_ROUTERS]: (state, routers) => {
      // console.log(routers)
      state.addRouters = routers
      // wth:将静态路由和动态路由结合
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }) {
      return new Promise(resolve => {
        // wth:如果 roles 角色中存在 admin 则直接返回所有路由, 否则进行路由过滤
        let routers = null
        // roles.indexOf('admin') > -1 ? (routers = asyncRouterMap) : (routers = filterAsyncRouter(asyncRouterMap, roles))
        // console.log(routers)


        // 根据角色是否显示的路由
        let originalRouter = {
          // 学情分析
          userInfo: true,
          // systemManage: true,
          // roleManage: true,
          // userManage: true
        }

        // 动态配置路由
        let permissionRouter = {
          systemManage: true,
          roleManage: true,
          userManage: true
        }

        // Api.getRoleList({})
        //   .then(res => {
        //     console.log(res)
        //     let privilegeMap = res.privilegeMap
        //     let routeAll = Object.assign(originalRouter, permissionRouter)
        //     routers = filterAsync(asyncRouterMap, routeAll)
        //     commit(types.SET_ROUTERS, routers)
        //     resolve()

          // })

        Api.getPagePermission({})
          .then(res => {
            console.log(res)
            let routeAll = Object.assign(originalRouter, res.privilegeMap)
            routers = filterAsync(asyncRouterMap, routeAll)
            commit(types.SET_ROUTERS, routers)
            resolve()
          })

      })
    }
  }
}

export default permission
