<template>
  <div class="sidebar-wrap">
    <template
      v-for="item in routes"
      v-if="!item.hidden && item.children">
      <!-- 单级 -->
      <router-link
        class="signal-path"
        v-if="onlyOneShowingChildren(item.children) &&
          !item.children[0].children &&
          !item.alwaysShow"
        :key="item.children[0].name"
        :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path + '/' + item.children[0].path">
          <icon
            v-if="item.children[0].meta && item.children[0].meta.icon"
            :name="item.children[0].meta.icon"
            :class="{collapse : sliderState === 'collapse'}"
            :scale="2">
          </icon>
          <span slot="title"
                v-if="item.children[0].meta && item.children[0].meta.title">
            {{getTitle(item.children[0].meta.title)}}
          </span>
        </el-menu-item>
      </router-link>

      <!-- 一级菜单 -->
      <el-submenu
        class="sidebar-wrap__menu"
        v-else
        :key="item.name"
        :index="item.name || item.path">
        <template slot="title">
          <icon
            v-if="item.meta && item.meta.icon"
            :name="item.meta.icon"
            :class="{collapse: sliderState === 'collapse'}"
            :scale="2">
          </icon>
          <span slot="title" v-if="item.meta && item.meta.title">
            {{sliderState === 'full' ? getTitle(item.meta.title) : ''}}
          </span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <!-- 二级菜单 -->
          <sidebar-item
            v-if="child.children && child.children.length > 0"
            class="child-menu-item"
            :routes="[child]"
            :key="child.path">
          </sidebar-item>

          <router-link
            v-else
            :to="item.path+'/'+child.path"
            :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <icon
                v-if="child.meta && child.meta.icon"
                :name="child.meta.icon"
                :class="{collapse: sliderState === 'collapse'}"
                :scale="2">
              </icon>
              <span slot="title" v-if="child.meta && child.meta.title">
                {{getTitle(child.meta.title)}}
              </span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
    computed: {
      sliderState() {
        // console.log(this.$store.getters.sidebar.sliderState)
        return this.$store.getters.sidebar.sliderState
      }
    },
    methods: {
      onlyOneShowingChildren(children) {
        return children.filter(item => !item.hidden).length === 1
      },
      getTitle(title) {
        if (this.$te(`route.${title}`)) {
          return this.$t(`route.${title}`)
        }
        return title
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .sidebar-wrap {
    .signal-path {
      .el-menu-item {
        svg {
          margin-right 21px;
        }
      }
    }
    .el-menu-item {
      /*padding-left: 40px;*/
    }
  }

  .sidebar-wrap
    .el-submenu,
    .el-menu-item {
      font-size 0

      &.is-active {
        background-color: #182134 !important;
        color: #17caaa !important;
      }

      &.is-opened {
      }

      svg {
        margin-left: 30px;
        margin-right 17px;
        transition: margin-left 1s ease-in-out
        &.collapse {
          margin-left: 0;
        }
      }

      span {
        font-size 14px
      }

      .svg-icon {
        fill currentColor
      }
    }

  #app {
    .sidebar-wrap {
      .el-submenu {
        background: #182134 !important;

        .el-menu {
          .el-menu-item {
            background: #283550 !important;
            color: #17caaa;
            position: relative;
            padding-left: 90px !important;

            &.is-active {
              background-color: #182134 !important;
              color: #17caaa !important;
            }
          }
        }
      }
    }
  }

  .el-menu-item {
    &.is-active {
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: #17caaa;
      }
    }
  }
</style>
