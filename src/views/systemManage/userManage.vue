<template>
  <div>
    <search />
    <div class="user-manage">
      <div class="page-title">
        <h3 class="title">用户管理</h3>
        <span class="handle-btn" @click="addUser">添加用户</span>
      </div>
      <div class="content">
        <user-list />
      </div>
    </div>
    <user-panel v-if="showPanel"/>
  </div>
</template>

<script>
  import UserList from './components/UserList'
  import UserPanel from './components/UserPanel'
  import Search from './components/Search'
  import {mapState} from 'vuex'
  export default {
    name: "userManage",
    components: {
      UserList,
      UserPanel,
      Search
    },
    computed: {
      ...mapState('userManage', ['showPanel'])
    },
    methods: {
      addUser() {
        this.$store.dispatch('userManage/changeUserPanel', {showPanel: true, panelTitle: '添加用户', panelType: 'addUser'})
      }
    },
    mounted() {
      this.$store.dispatch('userManage/getUserList')
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styl/pageTitle";
  .user-manage{
    background: #fff;
    .content{
      padding: 0 30px 30px;

    }
  }
</style>
