<template>
  <div class="user-panel">
    <div class="container" :class="{'reset-pwd-container': panelType === 'resetPwd' || panelType === 'removeUser'}">
      <div class="top">
        <h3 :class="{'blue-title': panelType === 'addUser' || panelType === 'resetPwd', 'warn': panelType === 'removeUser'}">
          {{panelTitle}}
        </h3>
        <i class="el-icon-close" @click="closePanel"></i>
      </div>

      <!--添加用户-->
      <div v-if="panelType === 'addUser'">
        <div class="main-content" :class="{'add-user-content': panelType === 'addUser'}">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="role-form"
            :class="{'add-user-form': panelType === 'addUser'}"
            @submit.native.prevent>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" class="role-name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" class="role-name" placeholder="仅支持公司邮箱格式"></el-input>
            </el-form-item>
            <el-form-item label="地域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="地域" style="width: 260px;" @change="handleRegion">
                <el-option label="北京" value="2"></el-option>
                <el-option label="贵州" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select v-model="ruleForm.role" multiple placeholder="请选择" style="width: 260px" @change="getRole">
                <el-option
                  v-for="item in allRoles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <p class="tip">
            <i></i>
            初始密码为123456，可在个人中心修改
          </p>
        </div>
        <div class="handle-btn">
          <el-button
            class="cancel"
            :class="{'add-user-cancel': panelType === 'addUser'}"
            @click.prevent="closePanel">取消
          </el-button>
          <el-button
            type="primary"
            class="confirm"
            :class="{'add-user-confirm': panelType === 'addUser'}"
            @click.prevent="addUser('ruleForm')">确定
          </el-button>
        </div>
      </div>

      <!--修改用户-->
      <div v-if="panelType === 'modifyUser'">
        <div class="main-content" :class="{'modify-user-content': panelType === 'modifyUser'}">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="role-form"
            :class="{'modify-user-form': panelType === 'modifyUser'}"
            @submit.native.prevent>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" class="role-name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" class="role-name"></el-input>
            </el-form-item>
            <el-form-item label="地域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="地域" style="width: 260px;">
                <el-option :label="item.regionName" :value="item.regionId" v-for="item in regionList"></el-option>
                <!--<el-option label="贵州" value="3"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select v-model="ruleForm.role" placeholder="角色" multiple style="width: 260px;">
                <el-option
                  v-for="item in allRoles"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="handle-btn">
          <el-button
            class="cancel"
            :class="{'add-user-cancel': panelType === 'addUser'}"
            @click.prevent="closePanel">取消
          </el-button>
          <el-button
            type="primary"
            class="confirm"
            :class="{'add-user-confirm': panelType === 'addUser'}"
            @click.prevent="addUser('ruleForm')">确定
          </el-button>
        </div>
      </div>

      <!--重置密码-->
      <div v-if="panelType === 'resetPwd'">
        <div class="main-content" :class="{'reset-pwd-content': panelType === 'resetPwd'}">
          <!--在文本框中回车会提交表单，添加以下@submit.native.prevent可阻止表单默认行为-->
          <div class="tip-container">
            <div class="warn-icon"></div>
            <div class="tip-content">
              <p>确定重置密码吗？</p>
              <p>重置后密码为123456</p>
            </div>
          </div>
        </div>
        <div class="handle-btn">
          <el-button
            class="cancel"
            :class="{'add-user-cancel': panelType === 'resetPwd'}"
            @click.prevent="closePanel">取消
          </el-button>
          <el-button
            type="primary"
            class="confirm"
            :class="{'add-user-confirm': panelType === 'resetPwd'}"
            @click.prevent="resetPwd">确定
          </el-button>
        </div>
      </div>

      <!--删除用户-->
      <div v-if="panelType === 'removeUser'">
        <div class="main-content" :class="{'remove-user-content': panelType === 'removeUser'}">
          <!--在文本框中回车会提交表单，添加以下@submit.native.prevent可阻止表单默认行为-->
          <div class="tip-container">
            <div class="warn-icon"></div>
            <div class="tip-content">
              <p>您确定删除该用户吗？</p>
              <p>删除后不可恢复</p>
            </div>
          </div>
        </div>
        <div class="handle-btn">
          <el-button
            class="cancel"
            :class="{'remove-cancel': panelType === 'removeUser'}"
            @click.prevent="closePanel">取消
          </el-button>
          <el-button
            type="primary"
            class="confirm"
            :class="{'remove-confirm': panelType === 'removeUser'}"
            @click.prevent="removeUser">确定
          </el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {throttle} from "../../../utils/tools";

  export default {
    name: "UserPanel",
    components: {

    },
    data(){
      let validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入姓名'));
        } else {
          callback()
        }
      };
      let validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'));
        } else if(value && !/^[0-9a-zA-Z_]+@corp.51xiaodou.com$/.test(value)) {
          return callback(new Error('仅支持公司邮箱格式'));
        } else {
          callback()
        }
      };
      return {
        regionList: [
          {
            regionId: 2,
            regionName: '北京'
          },
          {
            regionId: 3,
            regionName: '贵州'
          }
        ],
        showRoleList: false,
        value1: '',
        originalRoles: [],
        regionName: '',
        allRoles: [
          {
            roleId: 1,
            roleName: '顶级权限'
          },
          {
            roleId: 2,
            roleName: '超级权限'
          },
          {
            roleId: 3,
            roleName: '管理员'
          },
          {
            roleId: 4,
            roleName: '管理员助力'
          },
          {
            roleId: 5,
            roleName: '副手'
          },
          {
            roleId: 6,
            roleName: '小兵'
          }
        ],
        ruleForm: {
          name: '',
          email: '',
          region: '',
          role: []
        },
        rules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'},
          ],
          region: [
            { required: true, message: '请选择地域', trigger: 'change' }
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      ...mapState('userManage', ['showPanel', 'panelTitle', 'panelType'])
    },
    methods: {
      closePanel() {
        this.$store.dispatch('userManage/changeUserPanel', {showPanel: false})
      },

      getRole(val) {
        console.log(val)
      },

      handleRegion(val) {
        console.log(val)
        this.regionList.forEach(item => {
          if(item.regionId == val) {
            this.regionName = item.regionName
          }
        })
      },

      // 添加用户
      addUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm.role)
            this.$request.addUser({
              realName: this.ruleForm.name,
              email: this.ruleForm.email,
              regionId: this.ruleForm.region,
              regionName: this.regionName,
              roleIds: this.ruleForm.role
            }).then(res => {
                console.log(res)
            })
          } else {
            return false;
          }
        });
      },

      // 重置密码
      resetPwd() {
        this.$message({
          type: 'success',
          message: '重置密码成功'
        })
        this.closePanel()
      },

      // 删除用户
      removeUser(userId) {
        this.$message({
          type: 'success',
          message: '删除用户成功'
        })
        this.closePanel()
      }
    },

    mounted() {
      if(this.panelType === 'modifyUser') {
        let userInfo = this.$store.state.userManage.userData
        this.originalRoles = [...userInfo.roles]
        this.originalRoles.map(item => {
          this.ruleForm.role.push(item.roleId)
        })
        this.ruleForm.name = userInfo.realName
        this.ruleForm.email = userInfo.email
        this.ruleForm.region = userInfo.regionId + ''
        // console.log(this.originalRoles)
      }
      if(this.panelType === 'addUser' || this.panelType === 'modifyUser') {
        this.$request.selectRoleList({})
          .then(res => {
            console.log(res)
            this.allRoles = res.roleList
          })
      }

    },
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/styl/commonPanelHead";
  .user-panel{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .55);
  z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;

  .container {
    width: 440px;
    /*min-height: 420px;*/
    position: relative;
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    background: #fff;
    /*margin: auto;*/
    border-radius: 4px;
    &.reset-pwd-container{
      width: 370px;
    }
    .top{
      .blue-title{
        &:after{
          background:#1793ca;
        }
      }
      .warn{
        &:after {
          background: #ff9000;
        }
      }
    }

    .main-content{
      &.add-user-content, &.modify-user-content{
        /*height: 270px;*/
        /*overflow-y: auto;*/
      }
      padding-top: 30px;
      .role-form{
        width: 360px;
        margin-left: 30px;

        .desc /deep/ textarea {
          resize: none;
          height: 66px;

          &:focus {
            border-color: #1793ca;
          }
        }
      }

      .add-user-form /deep/ .el-input__inner:focus{
        border-color: #1793ca;
      }
      .add-user-form /deep/ .el-input.is-focus .el-input__inner{
        border-color: #1793ca;
      }

      .roles-container{
        display: flex;
        position: relative;
        margin-left: 100px;
        h3{
          font-size: 14px;
          color: #606266;margin-right: 12px;
          position: absolute;
          top: 0;
          left: -52px;
          &:before{
            content: '*';
            color: #F56C6C;
            margin-right: 4px;
          }
        }
        .roles-box{
          box-sizing: border-box;
          width: 260px;
          min-height: 36px;
          /*max-height: 75px;*/
          /*overflow-y: auto;*/
          overflow: hidden;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          position: relative;
          display: flex;

          .cell-box{
            box-sizing: border-box;
            width: 230px;
            /*height: 100%;*/
            padding: 5px;
            /*overflow-y: auto;*/
          }
          .icon-box{
            display: flex;
            align-items: center;
            justify-content: center;
            /*text-align: center;*/
            width: 30px;
            height: 100%;
            color: #c0c4cc;
            /*background: #17caaa;*/
            cursor: pointer;
            .role-arrow{
              /*display: flex;*/
              /*align-content: center;*/
              /*justify-content: center;*/
            }

          }

          .role-cell{
            display: inline-block;
            font-size: 12px;
            padding: 6px;
            border-radius: 4px;
            margin: 2px 4px;
            background-color: #f4f4f5;
            border-color: #e9e9eb;
            color: #909399;
            i{
              cursor: pointer;
              background: #c0c4cc;
              border-radius: 50%;
              width: 16px;
              height: 16px;
              text-align: center;
              line-height: 16px;
              transform: scale(0.8);
              &:hover{
                background: #909399;
                color: #fff;
              }
            }
            span{

            }
          }

        }

      }
      &.reset-pwd-content{
        .tip-container{
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 30px;
          .warn-icon{
            width: 54px;
            height: 44px;
            background: url("../../../assets/images/danger.png") no-repeat center;
            background-size: contain;
            margin-right: 15px;
          }
          .tip-content{
            p:first-child{
              font-size: 14px;
              color: #283550;
            }
            p:last-child{
              font-size: 12px;
              color: #798192;
              padding-top:  12px;
            }
          }
        }
      }

      &.remove-user-content{
        .tip-container{
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 30px;
          .warn-icon{
            width: 54px;
            height: 44px;
            background: url("../../../assets/images/danger.png") no-repeat center;
            background-size: contain;
            margin-right: 15px;
          }
          .tip-content{
            p:first-child{
              font-size: 14px;
              color: #283550;
            }
            p:last-child{
              font-size: 12px;
              color: #798192;
              padding-top:  12px;
            }
          }
        }
      }
    }

    .tip{
      text-align: center;
      font-size: 14px;
      color: #798192;
      padding-top: 10px;
      i{
        width: 12px;
        height: 12px;
        display: inline-block;
        background: url("../../../assets/images/info-circle.png") no-repeat center;
        background-size: contain;
      }
    }

    .handle-btn{
      /*position: absolute;*/
      /*right: 20px;*/
      /*bottom: 20px;*/
      display: flex;
      justify-content: flex-end;
      padding-top: 30px;
      padding-right: 20px;
      margin-bottom: 20px;
      height: 30px;
      .cancel, .confirm{
        /*float: right;*/
        width: 56px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        padding: 0;
      }
      .cancel{
        &.add-user-cancel{
          background: #efefef;
          color: #505B72;
          &:hover{
            border: 1px solid #DCDFE6;
            background: #ededed;
          }
        }
        &.remove-cancel{
          color: #505b72;
          background: #efefef;
          &:hover{
            border-color: #ededed;
            background: #ededed;
          }
        }
      }

      .confirm{
        &.add-user-confirm{
          background: #1793ca;
          border-color: #1f97ca;
          &:hover{
            background: #1a9dd8;
          }
        }
        &.remove-confirm{
          background: #ff9000;
          border-color: #ff9000;
        }
      }
    }
  }
    .role-list{
      box-sizing: border-box;
      height: 180px;
      overflow-y: auto;
      font-size: 14px;
      position: absolute;
      bottom: -180px;
      /*top: 490px;*/
      /*left: 380px;*/
      border-radius: 4px;
      width: 260px;
      padding: 10px 0;
      background: #fff;
      border: 1px solid #e4e7ed;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      li{
        line-height: 34px;
        cursor: pointer;
        color: #8c939d;
        padding: 0 10px;
        &:hover{
          color: #17caaa;
          background: #f5f7fa;
        }
      }
    }
}

  .el-select-dropdown__item.selected{
    /*color: #1;*/
  }

  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
    /*color:  #1793ca;*/
  }
</style>
