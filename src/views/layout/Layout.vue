<template>
  <el-container>
    <el-container>
      <el-aside :width="asideWidth">
        <side-bar class="sidebar-container" />
      </el-aside>
      <el-main>
        <div class="top-nav" :style="'width: calc(100% - ' + clientWidth + 'px)'">
          <top-bar />
          <tags-view />
        </div>
        <section class="main-con">
          <app-main />
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopBar from './Topbar'
import SideBar from './Sidebar'
import AppMain from './AppMain'
import TagsView from './TagsView'

export default {
  name: 'Layout',
  components: {
    SideBar,
    TopBar,
    AppMain,
    TagsView
  },
  computed: {
    asideWidth() {
      return this.$store.getters.getSliderStateWidth
    },
    // nav 宽度
    // clientWidth() {
    //   return document.body.clientWidth - parseInt(this.$store.getters.getSliderStateWidth)
    // },
    clientWidth() {
      return Number(this.$store.getters.getSliderStateWidth.replace(/[a-z]/ig, ''))
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/variables.styl"

.el-container{
  width 100%
  height 100%
}

.el-header{
  padding 0
  font-size 0
  line-height 60px
  background white
  box-sizing border-box
  overflow hidden
}

.el-aside{
  transition width .3s
  background rgb(40, 53, 80);
  color el-aside-color
  overflow hidden
}

.el-scrollbar:hover>.el-scrollbar__bar {
  opacity: 0 !important;
}

.el-main{
  padding 0
  height 100%;
  overflow auto
  .main-con{
    padding-top: 102px;
    overflow: hidden
  }
  .top-nav{
    height: 100px;
    position: fixed;
    /*background: #faebec;*/
    z-index: 10;
    transition: width 0.3s;
  }
}
</style>
