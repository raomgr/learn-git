<template>
  <div class="modify-password">
    <div class="container">
      <div class="top">
        <h3>修改密码</h3>
        <i class="el-icon-close" @click="closePanel"></i>
      </div>
      <el-form :model="ruleForm" :status-icon="false" :rules="rules" ref="ruleForm" label-width="100px"
               class="modify-form">
        <el-form-item label="原密码" prop="originalPassword">
          <el-input type="password" v-model.tirm="ruleForm.originalPassword" autocomplete="off" autofocus
                    placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model.tirm="ruleForm.newPassword" autocomplete="off"
                    placeholder="请输入6-16位新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model.tirm="ruleForm.checkPassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <div class="handle-btn">
          <el-button @click="closePanel">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import storage from '@/utils/storage'
  import {removeToken} from '@/utils/auth'
  export default {
    name: "ModifyPassword",
    data() {
      let validateOriginalPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入原密码'));
        } else if (!/^[0-9a-zA-Z]{6,16}$/.test(this.ruleForm.originalPassword)) {
          callback(new Error('密码为6-16位字母、数字或组合'));
        } else {
          callback()
        }
      };
      let validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (!/^[0-9a-zA-Z]{6,16}$/.test(this.ruleForm.newPassword)) {
          callback(new Error('密码为6-16位字母、数字或组合'));
        } else {
          callback()
        }
      };
      let validateConfirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入不一致'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          originalPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        rules: {
          originalPassword: [
            {validator: validateOriginalPass, trigger: 'blur'}
          ],
          newPassword: [
            {validator: validateNewPass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validateConfirmPass, trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      ...mapState('user', ['userId'])
    },
    methods: {
      closePanel() {
        this.$emit('close')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.modifyUserPwd({
              originalPassword: this.ruleForm.originalPassword,
              newPassword: this.ruleForm.newPassword,
              userId: this.userId
            })
              .then(res => {
                if(res.retcode === '0') {
                  this.$alert('密码修改成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      storage.remove('userId')
                      removeToken()
                      this.$router.push('/login')
                    }
                  });

                } else {
                  this.$message({
                    type: 'error',
                    message: res.retdesc,
                  })
                }
                console.log(res)
              })

          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/styl/commonPanelHead";

  .modify-password {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .55);
    z-index: 2000;

    .container {
      width: 440px;
      height: 360px;
      background: #fff;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .modify-form {
        width: 360px;
        margin: auto;
        padding-right: 30px;
        padding-top: 40px;

        .handle-btn {
          margin-left: 204px;
          padding-top: 40px;
          position: absolute;
          right: 20px;
        }
      }
    }
  }
</style>
