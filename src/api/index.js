import { post, get } from '@/utils/http'

export default {
  /**
   * 登录api
   * @param params username,password
   * @returns {*}
   */
  login(params) {
    return post('/login', params)
  },

  /**
   * 用户信息
   * @param params userId
   * @returns {*}
   */
  getUserInfo(params) {
    return post('/user/user_info', params)
  },

  /**
   * 修改个人密码
   * @param params userId
   * @returns {*}
   */
  modifyUserPwd(params) {
    return post('/user/modify_password', params)
  },

  /**
   * 获取页面权限列表
   * @param params
   * @returns {*}
   */
  getPagePermission(params) {
    return post('/page_privilege', params)
  },

  /**
   * 验证按钮权限
   * @param params buttonId roleIdList
   * @returns {*}
   */
  validateBtn(params) {
    return post('/button_privilege', params)
  },

  /**
   * 获取所有角色列表
   * @param params pageSize  pageNo
   * @returns {*}
   */
  getRoleList(params) {
    return post('/role/role_list', params)
  },

  /**
   * 创建、修改权限
   * @param params roleId roleName: roleDesc: type: privilegeList: []
   * @returns {*}
   */
  assignPermission(params) {
    return post('/role/assign_privilege_list', params)
  },

  /**
   * 校验角色名是否重名
   * @param params roleName:
   * @returns {*}
   */
  checkRoleName(params) {
    return post('/role/check_role_name', params)
  },

  /**
   * 修改角色名称
   * @param params roleName  roleId  roleDesc
   * @returns {*}
   */
  modifyRole(params) {
    return post('/role/modify_role', params)
  },

  /**
   * 删除角色
   * @param params roleId
                    type: 1:查询角色下是否有用户，2：直接删除角色
   * @returns {*}
   */
  deleteRole(params) {
    return post('/role/delete_role', params)
  },

  /**
   * 用户管理-获取用户列表
   * @param params regionId: 2北京，3贵州
                   keyword:
                   pageSize:
                   pageNo:
   * @returns {*}
   */
  getUserList(params) {
    return post('/user/account_list', params)
  },

  /**
   * 用户管理-添加用户
   * @param params
                   realName:
                   email:
                   regionId:
                   regionName:
                   roleIds:[]
   * @returns {*}
   */
  addUser(params) {
    return post('/user/add_user', params)
  },

  /**
   * 添加用户-角色列表下拉框
   * @param params
   */
  selectRoleList(params) {
    return post('/user/user_role_list', params)
  },

  /**
   * 添加用户-修改用户
   * @param params
                   realName:
                   email:
                   regionId:
                   regionName:
                   roleIds:[]
   * @returns {*}
   */
  modifyUser(params) {
    return post('/user/modify_user', params)
  },

  /**
   * 添加用户-重置密码
   * @param params  userId
   * @returns {*}
   */
  resetUserPwd(params) {
    return post('/user/reset_password', params)
  },

  /**
   * 添加用户-启用、禁用用户
   * @param params
                   userId:
                   status:和当前列表的状态值相反
   * @returns {*}
   */
  changeValidStatus(params) {
    return post('/user/user_valid', params)
  },

  /**
   * 用户管理-删除用户
   * @param params userId
   * @returns {*}
   */
  deleteUser(params) {
    return post('/user/delete_user', params)
  },

  /**
   * 获取权限树列表
   * @param params
                   roleId:
                   type:
   * @returns {*}
   */
  getTreeList(params) {
    return post('/role/show_privilege_list', params)
  }



}
