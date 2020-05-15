<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <router-link class="logo" :class="{ full: sliderState === 'full' }" tag="div" to="/">
      <div class="logo-container" >
        <img src="@/assets/images/logo.png" alt="">
      </div>
      <div v-if="sliderState === 'full'" class="word"></div>
    </router-link>
    <el-menu
      class="sidebar-menu"
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="bg"
      :text-color="tc"
      :active-text-color="atc">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  data() {
    return {
      bg: '#283550',
      abg: 'red',
      tc: '#fff',
      atc: '#41B883'
    }
  },
  components: {
    sidebarItem
  },
  computed: {
    ...mapGetters(['sidebar', 'permission_routers']),
    sliderState() {
      return this.$store.getters.sidebar.sliderState
    },
    isCollapse() {
      if (this.sidebar.sliderState === 'full') return false
      return true
    }
  }
}
</script>
<style lang="less" scoped>
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  /*justify-content: center;*/
  &.full {
    .logo-container {
      width: 50px;
      height: 50px;
      margin-right: 12px;
      padding-top: 10px;
      padding-left: 20px;
      img {
        width: 100%;
      }
    }
    .word {
      width: 110px;
      height: 20px;
      background: url("../../assets/images/logo-word.png") no-repeat center;
      background-size: contain;
    }
  }
  .logo-container {
    width: 40px;
    height: 30px;
    overflow: hidden;
    transition: width, height, 0.3s;
    padding-top: 5px;
    padding-left: 10px;
    img {
      width: 100%;
    }
  }
  .word {
    width: 0;
    height: 20px;
    background: url("../../assets/images/logo-word.png") no-repeat center;
    background-size: contain;
    transition: width, height 3s;
  }
}
.sidebar-menu {
  .sidebar-wrap {
    .is-active {
      background: #fff !important;
    }
  }
}
.sidebar-container .el-menu {
  height: calc(100% - 80px) !important;
}
</style>
