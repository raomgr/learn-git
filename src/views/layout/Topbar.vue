<template>
  <div class="top-bar">
    <div class="left-area">
      <div class="icon-container" @click="handleSwitchNavbar">
        <icon class="category-icon" name="category-hor" :scale="1.6" v-show="sliderState === 'full'" ></icon>
        <icon class="category-icon" name="category-ver" :scale="1.6" v-show="sliderState === 'collapse'"></icon>
      </div>

      <breadcrumb/>
    </div>
    <div class="right-area">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link tag="span" to="/">个人中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import breadcrumb from '@/components/breadcrumb'
  import {removeToken} from '@/utils/auth'
  import {mapState} from 'vuex'
  export default {
    name: 'Sidebar',
    components: {
      breadcrumb,
    },
    computed: {
      sliderState() {
        return this.$store.getters.sidebar.sliderState
      },
      ...mapState('user', ['name'])
    },
    mounted() {
      if (!this.$store.getters.sidebar.sliderState) {
        this.$store.dispatch('setSliderState', 'full')
      }

      // 获取用户信息
      this.$store.dispatch('user/getUser')
    },
    methods: {
      handleSwitchNavbar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout(command) {
        removeToken()
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  .top-bar{
    height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-bottom: 2px solid #f4f5f6;
    .left-area{
      display: flex;
      .icon-container{
        cursor: pointer;
      }
      .category-icon{
        height: 60px;
        padding: 0 20px;
        cursor: pointer;
      }
    }
    .right-area{
      padding-right: 20px;
      .el-dropdown{
        .el-dropdown-link {
          cursor: pointer;
        }
      }
    }
  }
</style>
