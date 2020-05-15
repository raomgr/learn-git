<template>
  <div class="user-info">
    <el-row>
      <el-col>
        <page-title :pageTitle="'个人信息'"></page-title>
        <div class="content">
          <div class="logo">
            <div class="logo-container"></div>
            <h2 class="title">慕享云测评BSS系统</h2>
          </div>
          <dl class="info-item">
            <dt class="info-title">姓名</dt>
            <dd class="info-detail">{{name}}</dd>
          </dl>
          <dl class="info-item">
            <dt class="info-title">邮箱</dt>
            <dd class="info-detail">{{email}}</dd>
            <dd class="modify" @click="showModifyPanel">修改密码</dd>
          </dl>
          <dl class="info-item">
            <dt class="info-title">角色</dt>
            <dd class="info-detail">{{roleNames.join(', ')}}</dd>
          </dl>
          <dl class="info-item">
            <dt class="info-title">地域</dt>
            <dd class="info-detail">{{regionName}}</dd>
          </dl>
        </div>
      </el-col>
    </el-row>
    <modify-password v-if="showPanel" @close="showModifyPanel"/>
  </div>
</template>

<script>
import PageTitle from '@/components/pagetitle/index'
import ModifyPassword from './components/ModifyPassword'
import {mapState} from 'vuex'
export default {
  name: 'userCenter',
  components: {
    PageTitle,
    ModifyPassword
  },
  data() {
    return {
      showPanel: false
    }
  },
  computed:{
    ...mapState('user', ['name', 'email', 'roleNames', 'regionName'])
  },
  mounted(){

  },
  methods: {
    showModifyPanel(){
      this.showPanel = !this.showPanel
    }
  }
}
</script>

<style lang="less" scoped>
.user-info{
  background: #fff;
  .content{
    padding: 0 30px;
    .logo{
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      .logo-container{
        width: 70px;
        height: 52px;
        background: url("../../assets/images/logo.png") no-repeat center;
        background-size: contain;
        margin-right: 20px;
      }
      .title{
        font-size: 36px;
        color: #283650;
      }
    }
    .info-item{
      font-size: 14px;
      display: flex;
      align-items: center;
      width: 420px;
      padding-bottom: 28px;
      margin-bottom: 28px;
      border-bottom: 1px solid #f2f2f5;
      .info-title{
        color: #798192;
        padding: 0 16px;
        border-right: 1px solid #f2f2f5;
        margin-right: 36px;
      }
      .info-detail{
        color: #283550;
      }
      .modify{
        margin-left: auto;
        color: #17caaa;
        width: 76px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #17caaa;
        border-radius: 13px;
        cursor: pointer;
        transition: 0.3s;
        &:hover{
        background: rgb(232, 250, 247)
        }
      }
    }
    .info-item:last-child{
      border: none;
    }
  }

}
</style>
