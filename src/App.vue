<template>
  <div id="app">
    <router-view/>
    <!-- <popups v-if="popupsStatus"/> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    if(navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1) {
      this.$message({
        message: '当前浏览器存在兼容问题，推荐使用谷歌chrome浏览器或360极速浏览器访问！',
        type: 'error',
        duration: 8000
      });
    }
    // if(navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1) {
    //   alert('为了更好的效果，推荐使用谷歌、狐火或其他双核浏览器的极速模式')
    // }

  }
}
</script>
