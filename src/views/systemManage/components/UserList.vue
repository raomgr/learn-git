<template>
  <div class="user-list">
    <table border="">
      <thead>
      <tr>
        <th>姓名</th>
        <th>邮箱</th>
        <th>角色名称</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in userList" :key="index">
        <td>{{item.realName}}</td>
        <td>{{item.email}}</td>
        <td >
          <span v-for="rol in item.role" :key="rol.id">
            {{rol.name}}
          </span>
        </td>
        <td>{{item.status === 0 ? '禁用': '启用'}}</td>
        <td class="handle">
          <el-dropdown trigger="click">
            <el-button type="primary" size="small" class="handle-btn">
              操作
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="modifyUser(item)">修改</el-dropdown-item>
              <el-dropdown-item @click.native="resetPwd(item)">密码重置</el-dropdown-item>
              <el-dropdown-item @click.native="enableUse">禁用/启用</el-dropdown-item>
              <el-dropdown-item @click.native="removeUser(item)">删除</el-dropdown-item>
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
  import {mapState} from 'vuex'
  export default {
    name: "UserList",
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        totalCount: 100,
        // userList: []
      }
    },
    computed: {
      ...mapState('userManage', ['userList']),

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
      changeCurrentPage(val) {
        this.currentPage = val
      },
      changePageSize(val) {
        this.pageSize = val
      },
      modifyUser(userData) {
        this.$store.dispatch('userManage/changeUserPanel', {showPanel: true, panelTitle: '修改用户', panelType: 'modifyUser'})
        this.$store.dispatch('userManage/changeUser', userData)
      },
      enableUse() {
        this.$message({
          type: 'success',
          message: '启用/禁用成功'
        })
        // this.$store.dispatch('userManage/changeUserPanel', {showPanel: true, panelTitle: '哈哈哈', panelType: 'modifyUser'})
      },

      resetPwd() {
        this.$store.dispatch('userManage/changeUserPanel', {showPanel: true, panelTitle: '提示', panelType: 'resetPwd'})
      },

      removeUser() {
        this.$store.dispatch('userManage/changeUserPanel', {showPanel: true, panelTitle: '提示', panelType: 'removeUser'})
      },

      getUserList() {
        // this.$request.getUserList({
        //   regionId: '',
        //   keyword: this.keyword,
        //   pageSize: this.pageSize,
        //   pageNo: this.currentPage
        // }).then(res => {
        //   console.log(res)
        //   this.userList = res.accountList
        //   this.totalCount = res.totalCount
        // })
        // this.$store.dispatch('userManage/getUserList')
      }

    },
    mounted() {
      // this.$store.dispatch('userManage/getUserList')
      // this.getUserList()
    },
    watch: {
      userList(newVal) {
        // this.$store.dispatch('userManage/getUserList')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/styl/table";
  @import "../../../assets/styl/pagination";
  .user-list{
    table{
      thead {
        th:first-child{
          text-align: left;
          padding-left: 50px;
        }
        th:nth-child(3) {
          width: 30%;
        }
        th:last-child{
          padding-right: 50px;
        }
      }
      tbody{
        td:first-child{
          text-align: left;
          padding-left: 50px;
        }
        td:nth-child(3) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        td:last-child{
          padding-right: 50px;
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
