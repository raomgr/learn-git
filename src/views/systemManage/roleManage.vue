<template>
  <div class="role-manage">
    <div class="page-title">
      <h3 class="title">角色管理</h3>
      <span class="handle-btn" @click="handleBtn">创建角色</span>
    </div>
    <div class="content">
      <role-list />
    </div>
    <RolePanel v-if="showPanel"/>
  </div>
</template>

<script>
  import RoleList from './components/RoleList'
  import RolePanel from './components/RolePanel'
  import {mapState} from 'vuex'
  export default {
    name: "roleManage",
    components: {
      RoleList,
      RolePanel
    },
    computed: {
      ...mapState('roleManage', ['showPanel'])
    },
    data() {
      return {}
    },
    methods: {
      handleBtn() {
        this.$store.dispatch('roleManage/changePanelStatus', {
          status: true,
          panelType: 'createRole',
          panelTitle: '创建角色'

        })
      }
    },
    mounted() {
      this.$store.dispatch('roleManage/getAllRoleList', {pageSize: 10, pageNo: 1})
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styl/pageTitle";
.role-manage{
  background: #fff;
  .content{
    padding: 0 30px 30px;

  }

}
</style>
