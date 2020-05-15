import Vue from 'vue'
import VueRouter from 'vue-router'
import _import from '@/utils/import'
const Layout = _import('layout/Layout')

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/401',
    component: _import('errorPage/401'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'userCenter',
    hidden: true,
    children: [
      {
        path: 'userCenter',
        name: 'userCenter',
        component: _import('userInfo/index'),
        meta: {
          title: 'userCenter',
          icon: 'dailyoverview',
          noCache: true
        }
      },
    ]
  },
  // {
  //   path: '/systemManage',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'systemManage',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'systemManage',
  //     icon: 'systemmanage'
  //   },
  //   children: [{
  //     path: 'roleManage',
  //     component: _import('systemManage/roleManage'),
  //     name: 'roleManage',
  //     meta: {
  //       title: 'roleManage'
  //     }
  //   },
  //     {
  //       path: 'userManage',
  //       component: _import('systemManage/userManage'),
  //       name: 'userManage',
  //       meta: {
  //         title: 'userManage'
  //       }
  //     }
  //   ]
  // },
]

export const router = new VueRouter({
  mode: 'history',
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 })
})
