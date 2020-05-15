import _import from '@/utils/import'

const Layout = _import('layout/Layout')

export const asyncRouterMap = [

  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/systemManager',
    component: Layout,
    redirect: 'noredirect',
    name: 'systemManage',
    alwaysShow: true,
    meta: {
      title: 'systemManage',
      icon: 'systemmanage'
    },
    children: [{
      path: 'roleManager',
      component: _import('systemManage/roleManage'),
      name: 'roleManage',
      meta: {
        title: 'roleManage'
      }
    },
      {
        path: 'userManager',
        component: _import('systemManage/userManage'),
        name: 'userManage',
        meta: {
          title: 'userManage'
        }
      }
    ]
  },
]
