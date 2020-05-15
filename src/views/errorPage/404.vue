<template>
  <div class="notfound-wrap">
    <div class="content">
      <div class="title"><span>404</span> Page Not Found</div>
      <div class="sub">哇哦，你找的页面走丢了...</div>
      <el-button type="primary" @click="returnPrevPage" class="gohome">回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  methods: {
    returnPrevPage() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.notfound-wrap
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  transform translateY(-80px)
  .content
    text-align right
    .title
      -webkit-font-smoothing antialiased
      color #17caaa;
      font-size 100px
      span
        font-size 180px
    .sub
      font-size 30px
      color #ccc
      padding-bottom 50px
    .gohome
      margin auto
      display block
      background #17caaa
</style>
