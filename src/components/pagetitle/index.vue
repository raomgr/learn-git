<template>
  <div class="page-title">
    <h3 class="title">{{ pageTitle }}</h3>
    <!--<span class="handle-btn" v-if="showBtn">{{ btnName }}</span>-->
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    pageTitle: {
      type: String,
    },
    showBtn: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String
    },
    arg: { // action参数
      type: Object,
      default(){
        return {}
      }
    },
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.page-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  .title {
    font-size: 18px;
    color: #283550;
    margin-right: 20px;
    padding-left: 30px;
    position: relative;
    &:after{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 6px;
      display: block;
      content: '';
      background: #17caaa;
    }
  }
  .show-time {
    font-size: 12px;
    color: #a1a6b1;
    position: relative;
    bottom: -2px;
  }
  .handle-btn{
    width:92px;
    height:30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #798192;
    background:rgba(248,249,249,1);
    border-radius:2px;
    margin-right: 30px;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
      background: #f1f5f5;
    }
  }
}
</style>
