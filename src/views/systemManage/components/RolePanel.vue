<template>
  <div class="role-panel">
    <div
      class="container"
      :class="{
      'container-big': currentActive === 1,
      'modify-role-container': panelType === 'modifyRole',
      'modify-permission-container': panelType === 'modifyPermission',
      'remove-role-container': panelType === 'removeRole'}"
    >
      <div class="top">
        <h3 :class="{'default': panelType === 'modifyRole','warn': panelType === 'removeRole'}">
          {{panelTitle}}
        </h3>
        <i class="el-icon-close" @click="closePanel"></i>
      </div>

      <!--创建角色-->
      <div v-if="panelType === 'createRole'">
        <div class="step">
          <el-steps :active="currentActive" align-center>
            <el-step title="添加角色"></el-step>
            <el-step title="分配权限"></el-step>
          </el-steps>
        </div>
        <div class="main-container" :class="{'main-container-big': currentActive === 1}">
          <!--在文本框中回车会提交表单，添加以下@submit.native.prevent可阻止表单默认行为-->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="role-form"
            v-if="currentActive === 0"
            @submit.native.prevent
          >
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName" class="role-name"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc" class="desc"></el-input>
            </el-form-item>
          </el-form>
          <Tree v-if="currentActive === 1"/>
        </div>
        <div class="handle-btn">
          <el-button class="cancel" @click.prevent="closePanel" v-show="currentActive === 0">取消</el-button>
          <el-button class="cancel" @click.prevent="goPrevious" v-show="currentActive === 1">上一步</el-button>
          <el-button type="primary" @click.prevent="submitForm('ruleForm')" class="confirm"
                     v-show="currentActive === 0">下一步
          </el-button>
          <el-button type="primary" class="confirm" @click.prevent="createRole" v-show="currentActive === 1">提交
          </el-button>
        </div>
      </div>

      <!--修改角色-->
      <div v-else-if="panelType === 'modifyRole'">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="role-form"
          :class="{'modify-role-form': panelType === 'modifyRole'}"
          @submit.native.prevent>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName" class="role-name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" class="desc"></el-input>
          </el-form-item>
        </el-form>
        <div class="handle-btn">
          <el-button
            class="cancel"
            :class="{'modify-role-cancel': panelType === 'modifyRole'}"
            @click.prevent="closePanel">取消
          </el-button>
          <el-button
            type="primary"
            class="confirm"
            :class="{'modify-role-confirm': panelType === 'modifyRole'}"
            @click.prevent="modifyRole">确定
          </el-button>
        </div>
      </div>

      <!--修改权限-->
      <div v-if="panelType === 'modifyPermission'">
        <div class="main-container" :class="{'main-container-permission': panelType === 'modifyPermission'}">
          <!--在文本框中回车会提交表单，添加以下@submit.native.prevent可阻止表单默认行为-->
          <Tree />
        </div>
        <div class="handle-btn">
          <el-button class="cancel" :class="{'modify-permission-cancel': panelType === 'modifyPermission'}"
                     @click.prevent="closePanel">取消
          </el-button>
          <el-button type="primary" class="confirm" @click.prevent="modifyPermission">确定</el-button>
        </div>
      </div>

      <!--删除角色-->
      <div v-if="panelType === 'removeRole'">
        <div class="main-container" :class="{'main-container-remove': panelType === 'removeRole'}">
          <!--在文本框中回车会提交表单，添加以下@submit.native.prevent可阻止表单默认行为-->
          <div class="tip-container">
            <div class="warn-icon"></div>
            <div class="tip-content">
              <p>您确定删除该角色吗？</p>
              <p>删除后不可恢复</p>
            </div>
          </div>
        </div>
        <div class="handle-btn">
          <el-button
            class="cancel"
            :class="{'remove-cancel': panelType === 'removeRole'}"
            @click.prevent="closePanel">取消
          </el-button>
          <el-button
            type="primary"
            class="confirm"
            :class="{'remove-confirm': panelType === 'removeRole'}"
            @click.prevent="removeRole">确定
          </el-button>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Tree from './Tree'

  export default {
    name: "RolePanel",
    components: {
      Tree
    },
    props: {
      type: String,
      required: true
    },
    data() {
      return {
        treeList: [],
        currentActive: 0,
        ruleForm: {
          roleName: '',
          desc: ''
        },
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      ...mapState('roleManage', ['permissionIdList', 'panelType', 'panelTitle', 'roleInfo', 'pageSize', 'currentPage'])
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$request.checkRoleName({
              type: 1,
              roleId: '',
              roleName: this.ruleForm.roleName
            }).then(res => {
              console.log(res)
              if (res.retcode === '10002') {
                this.$message({
                  type: 'error',
                  message: '已存在相同角色名称'
                })
              } else {
                this.currentActive = 1
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closePanel() {
        this.$store.dispatch('roleManage/changePanelStatus', {status: false})
      },
      goPrevious() {
        this.currentActive = 0
      },

      // 创建角色
      createRole() {
        // console.log(this.permissionIdList)
        this.$request.assignPermission({
          roleId: '',
          roleName: this.ruleForm.roleName,
          roleDesc: this.ruleForm.desc,
          type: 1,
          privilegeList: this.permissionIdList
        }).then(res => {
          if (res.retcode === '0') {
            this.closePanel()
            this.$store.dispatch('roleManage/getAllRoleList', {
              pageSize: this.pageSize,
              pageNo: this.currentPage
            })
            this.$message({
              type: 'success',
              message: '角色创建成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '角色创建失败'
            })
          }
          // console.log(res)
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
      },

      // 修改角色
      modifyRole() {
        // 先校验是否重名
        this.$request.checkRoleName({
          type: 2,
          roleId: this.roleInfo.id,
          roleName: this.ruleForm.roleName
        }).then(res => {
          console.log(res)
          if (res.retcode === '10002') {
            this.$message({
              type: 'error',
              message: '已存在相同角色名称'
            })
          } else {
            // 不重名时调用修改接口
            this.$request.modifyRole({
              roleName: this.ruleForm.roleName,
              roleId: this.roleInfo.id,
              roleDesc: this.ruleForm.desc
            }).then(res => {
              console.log(res)
              if(res.retcode === '0') {
                this.closePanel()
                this.$store.dispatch('roleManage/getAllRoleList', {
                  pageSize: this.pageSize,
                  pageNo: this.currentPage
                })
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '角色修改失败'
                })
              }
            })
          }

        })
      },

      // 修改权限
      modifyPermission() {
        this.$request.assignPermission({
          roleId: this.roleInfo.id,
          roleName: this.roleInfo.name,
          roleDesc: '',
          type: 2,
          privilegeList: this.permissionIdList
        }).then(res => {
          console.log(res)
          if(res.retcode === '0') {
            this.closePanel()
            this.$message({
              type: 'success',
              message: '权限修改成功'
            })
            this.$store.dispatch('roleManage/getAllRoleList', {
              pageSize: this.pageSize,
              pageNo: this.currentPage
            })
          }
        })
      },

      // 删除角色
      removeRole() {
        this.$request.deleteRole({
          roleId: this.roleInfo.id
        }).then(res => {
          console.log(res)
          if(res.retcode === '0') {
            this.closePanel()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // this.$request.getRoleList({
            //   pageSize: this.pageSize,
            //   pageNo: this.currentPage
            // }).then(res => {
            //
            // })
            this.$store.dispatch('roleManage/getAllRoleList', {
              pageSize: this.pageSize,
              pageNo: this.currentPage
            })
          } else {
            this.$message({
              type: 'error',
              message: res.retdesc
            })
          }
        })
      }
    },
    mounted() {
      if (this.panelType === 'modifyRole') {
        this.ruleForm.roleName = this.roleInfo.name
        this.ruleForm.desc = this.roleInfo.description
      }
      // if (this.panelType === 'createRole') {
      //   this.$request.getTreeList({
      //     type: 1,
      //     roleId: ''
      //   }).then(res => {
      //     console.log(res)
      //     // this.treeList = res.treeList
      //     this.$store.dispatch('roleManage/getTreeList', res.treeList)
      //   })
      // }
      // if(this.panelType === 'modifyPermission') {
      //   this.$request.getTreeList({
      //     type: 2,
      //     roleId: this.roleInfo.id
      //   }).then(res => {
      //     // console.log(res)
      //     this.$store.dispatch('roleManage/getTreeList', res.treeList)
      //     // this.treeList = res.treeList
      //     // console.log(this.treeList)
      //   })
      // }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/styl/commonPanelHead";

  .role-panel {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .55);
    z-index: 2000;

    .container {
      width: 440px;
      height: 380px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #fff;
      margin: auto;
      border-radius: 4px;

      &.container-big {
        height: 600px;
      }

      &.modify-role-container {
        width: 400px;
        height: 300px;
      }

      &.modify-permission-container {
        width: 400px;
        height: 520px;
      }

      &.remove-role-container {
        height: 280px;
      }

      .top {
        margin-bottom: 35px;

        h3 {
          &:after {
            background: #1793ca;
          }
        }

        .default {
          &:after {
            background: #17caaa;
          }
        }

        .warn {
          &:after {
            background: #ff9000;
          }
        }
      }

      .step {
        margin-bottom: 30px;
      }

      .main-container-big {
        /*display: flex;*/
        /*justify-content: center;*/
        height: 360px;
        /*overflow: auto;*/
        overflow-y: scroll;
      }

      .main-container-permission {
        height: 360px;
        overflow-y: auto;
      }

      .main-container-remove {
        .tip-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 30px;

          .warn-icon {
            width: 54px;
            height: 44px;
            background: url("../../../assets/images/danger.png") no-repeat center;
            background-size: contain;
            margin-right: 15px;
          }

          .tip-content {
            p:first-child {
              font-size: 14px;
              color: #283550;
            }

            p:last-child {
              font-size: 12px;
              color: #798192;
              padding-top: 12px;
            }
          }
        }
      }

      .role-form {
        width: 320px;
        margin-left: 50px;

        .desc /deep/ textarea {
          resize: none;
          width: 220px;
          height: 66px;

          &:focus {
            border-color: #1793ca;
          }
        }

        &.modify-role-form {
          margin-left: 20px;

          .desc /deep/ textarea {
            &:focus {
              border-color: #17caaa;
            }
          }
        }
      }

      .role-form /deep/ input {
        &:focus {
          border-color: #1793ca;
        }
      }

      .modify-role-form /deep/ input {
        &:focus {
          border-color: #17caaa;
        }
      }

      .handle-btn {
        position: absolute;
        right: 20px;
        bottom: 20px;

        .cancel {
          &:hover {
            background: #fff;
            color: #1793ca;
            border-color: #1793ca;
          }

          &.modify-role-cancel {
            color: #505b72;
            background: #efefef;

            &:hover {
              border-color: #ededed;
              background: #ededed;
            }
          }

          &.modify-permission-cancel, &.remove-cancel {
            color: #505b72;
            background: #efefef;

            &:hover {
              border-color: #ededed;
              background: #ededed;
            }
          }
        }

        .confirm {
          background: #1793ca;
          border: none;

          &.modify-role-confirm {
            background: #17caaa;
            border: none;

            &:hover {
              background: rgb(69, 213, 187);
            }
          }

          &.remove-confirm {
            background: #ff9000;
          }
        }
      }

    }
  }
</style>
