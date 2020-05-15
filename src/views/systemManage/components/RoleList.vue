<template>
  <div class="role-list">
    <table border="">
      <thead>
        <tr>
          <th>角色管理</th>
          <th>描述</th>
          <th>创建人</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in allRoleList" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.roleCreator}}</td>
          <td class="handle">
            <el-dropdown trigger="click">
              <el-button type="primary" size="small" class="handle-btn">
                操作
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="modifyRole(item)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="modifyPermission(item)">权限管理</el-dropdown-item>
                <el-dropdown-item @click.native="removeRole(item)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-wrapper" v-if="totalCount > 10">
      <span class="info">显示第 {{beginCount}} 到第 {{endCount}} 条记录, 总共 {{totalCount}} 条记录</span>
      <div class="pagi-right">
        <el-pagination
          background=""
          @size-change="changePageSize"
          @current-change="changeCurrentPage"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: "RoleList",
    data() {
      return {
        // pageSize: 10,
        // currentPage: 1,
        totalCount: 0,
        roleList: []
      }
    },
    computed: {
      ...mapState('roleManage', ['allRoleList', 'pageSize', 'currentPage']),
      ...mapState('user', ['roleIdList']),
      beginCount() {
        return (this.currentPage - 1) * this.pageSize + 1
      },
      endCount() {
        let total = this.pageSize * this.currentPage
        if(this.totalCount < total || this.totalCount === total) {
          return this.totalCount
        } else {
          return total
        }
      },
    },
    methods: {
      // 修改角色名称
      modifyRole(role) {
        const BUTTON_ID =  10
        this.$request.validateBtn({
          buttonId: BUTTON_ID,
          roleIdList: this.roleIdList
        }).then(res => {
          if(res.retcode === "10001") {
            this.$store.dispatch('roleManage/changePanelStatus', {
              status: true,
              panelType: 'modifyRole',
              panelTitle: '修改角色',

            })
            this.$store.dispatch('roleManage/handleRoleInfo', {roleInfo: role})
          } else {
            this.$message({
              type: 'warn',
              message: '暂无操作权限'
            })
          }
        })

      },

      // 修改权限
      modifyPermission(role){
        const BUTTON_ID =  11
        this.$request.validateBtn({
          buttonId: BUTTON_ID,
          roleIdList: this.roleIdList
        }).then(res => {
          if(res.retcode === "10001"){
            this.$store.dispatch('roleManage/changePanelStatus', {
              status: true,
              panelType: 'modifyPermission',
              panelTitle: '权限管理',

            })
            this.$store.dispatch('roleManage/handleRoleInfo', {roleInfo: role})
          } else {
            this.$message({
              type: 'warn',
              message: '暂无操作权限'
            })
          }
        })

      },

      // 删除角色
      removeRole(role) {
        // console.log('删除角色',roleId)
        this.$request.validateBtn({
          buttonId: 12,
          roleIdList: this.roleIdList
        }).then(res => {
            console.log(res)
          if(res.retcode === "10001") {
            this.$store.dispatch('roleManage/changePanelStatus', {
              status: true,
              panelType: 'removeRole',
              panelTitle: '提示',
            })
            this.$store.dispatch('roleManage/handleRoleInfo', {roleInfo: role})
          } else {
            this.$message({
              type: 'warn',
              message: '暂无操作权限'
            })
          }
        })

      },

      changeCurrentPage(val) {
        // this.currentPage = val
        this.$store.dispatch('roleManage/handleCurrentPage', val)
        this.$store.dispatch('roleManage/getAllRoleList', {
          pageSize: this.pageSize,
          pageNo: this.currentPage
        })

      },

      changePageSize(val) {
        // this.pageSize = val
        this.$store.dispatch('roleManage/handlePageSize', val)
        this.$store.dispatch('roleManage/getAllRoleList', {
          pageSize: this.pageSize,
          pageNo: this.currentPage
        })

      }
    },
    mounted() {
    },
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/styl/table";
  @import "../../../assets/styl/pagination";
  .role-list{
    margin-bottom: 40px;
    table{
      thead {
        th:first-child{
          text-align: left;
          padding-left: 70px;
        }
        th:nth-child(2) {
          width: 20%;
        }
        th:last-child{
          padding-right: 70px;
        }
        th:first-child, th:nth-child(3), td:last-child {
          width: 25%;
        }
      }
      tbody{
        td:first-child{
          text-align: left;
          padding-left: 70px;
        }
        td:last-child{
          padding-right: 70px;
        }
        .handle{
          .handle-btn{
            box-sizing: border-box;
            font-size: 14px;
            width: 56px;
          }
        }
      }
    }
  }

</style>
