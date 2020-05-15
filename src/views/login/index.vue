<template>
  <div class="login-page">
    <div class="logo">
      <img src="@/assets/images/login-logo.png" alt="">
    </div>
    <div class="center">
      <div class="poster">
        <div class="poster-logo"></div>
        <div class="re-one"></div>
        <div class="re-two"></div>
        <div class="re-three"></div>
        <div class="people"></div>
      </div>
      <div class="login-panel">
        <div class="title">
          <p>高等教育自学考试</p>
          <h3>慕享云测评BSS系统</h3>
        </div>
        <div class="panel">
          <div class="tab">
            <p :class="{active: currentRole === 1}">邮箱登录</p>
          </div>
          <div class="info-container">
            <div class="username" :class="{'username-active': userNameFocus}">
              <div class="icon-box" :class="{'user-active': userNameFocus}"></div>
              <div class="ipt-box">
                <input type="text" placeholder="请输入邮箱账号"
                       v-model.trim="userName"
                       autofocus
                       @blur="blurUser"
                       @focus="focusUser">
                <span class="email">@corp.51xiaodou.com</span>
              </div>
            </div>
            <div class="password" :class="{'password-active': passwordFocus}">
              <div class="icon-box" :class="{'password-active': passwordFocus}">
              </div>
              <div class="ipt-box">
                <input type="password" placeholder="请输入密码"
                       v-model.trim="password"
                       @blur="blurPwd"
                       @focus="focusPwd">
              </div>
            </div>
            <p class="tip">{{tip}}</p>
          </div>
          <div ref="ipt" @click="handleLogin" class="btn" :class="{'can-login': rightUser && rightPwd}">登录</div>
        </div>
      </div>
    </div>
    <div class="desc">北京小逗网络科技有限公司 京ICP备14049531号-1</div>
  </div>
</template>

<script>
  import Storage from '@/utils/storage'
  import {setToken} from '@/utils/auth'
  import {debounce, throttle} from "../../utils/tools";
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'login',
    mounted() {
      window.addEventListener('keydown', this.keyLogin)
    },
    data() {
      return {
        currentRole: 1,
        userName: '',
        password: '',
        tip: '',
        userNameFocus: true,
        passwordFocus: false,
        handle: null,

      }
    },
    computed: {
      rightUser() {
        return /^[0-9a-zA-Z_]+$/.test(this.userName)
      },
      rightPwd() {
        return /^[0-9A-Za-z]{6,20}$/.test(this.password)
      },
      ...mapGetters(['permission_routers']),

    },
    methods: {
      ...mapMutations('user', ['saveRealName']),
      keyLogin(e) {
        if (e.keyCode === 13) {
          if (this.rightUser && this.rightPwd) {
            this.handleLogin()
          }
        }
      },
      // 更改登录角色
      changeLoginRole(val) {
        this.currentRole = val
      },

      focusUser() {
        this.userNameFocus = true
        this.passwordFocus = false
        if (!this.rightUser) {
          this.tip = ''
        }
      },

      focusPwd() {
        this.passwordFocus = true
        this.userNameFocus = false
        if (this.rightUser) {
          this.tip = ''
        }

      },

      blurUser() {
        this.userNameFocus = false
        if (this.userName === '') {
          this.tip = '请输入用户名'
        } else if (!this.rightUser) {
          this.tip = '请输入字母数字或下划线组成的用户名'
        }
      },

      blurPwd() {
        this.passwordFocus = false
        if (this.password === '' && this.rightUser) {
          this.tip = '请输入密码'
        } else if (!this.rightPwd && this.rightUser) {
          this.tip = '请输入6位字母或数字密码'
        }
      },


      handleLogin: throttle(function () {
        this.$request.login({
          userName: this.userName + '@corp.51xiaodou.com',
          password: this.password,
        })
          .then(res => {
            console.log(res)
            if (res.retcode === '0') {
              setToken(res.token)
              this.$store.dispatch('user/setRoles', {token: res.token, userId: res.userInfo.userId})
              this.$router.push({path: '/'})
            } else {
              this.tip = res.retdesc
            }
          })
          .catch(err => {
          })
      }, 2000),

      // // 登录
      // handleLogin() {
      //   this.$request.login({
      //     userName: this.userName,
      //     password: this.password,
      //     userType: this.currentRole
      //   })
      //     .then(res => {
      //       console.log(res)
      //       if (res.retcode === '0') {
      //         let roles = [res.userInfo.role]
      //         setToken(res.token)
      //         this.$store.dispatch('user/setRoles', {roles: roles, token: res.token})
      //         // this.$router.push({ path: '/' })
      //       }else{
      //         this.tip = res.retdesc
      //       }
      //     })
      //     .catch(err => {
      //     })
      // }
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.keyLogin)
    }
  }
</script>

<style lang="less" scoped>
  .login-page {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 60px;
    background: linear-gradient(90deg, rgba(81, 93, 120, 1) 0%, rgba(40, 53, 80, 1) 100%);
    box-sizing: border-box;

    .logo {
      width: 203px;
      height: 41px;
      margin: 0 0 0 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .center {
      width: 1300px;
      height: 500px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: space-between;*/

      .poster {
        position: relative;
        margin-left: 40px;
        float: left;
        width: 646px;
        height: 500px;
        background: url('../../assets/images/login-bg.png') no-repeat;
        background-size: contain;

        .poster-logo {
          width: 89px;
          height: 88px;
          position: absolute;
          top: 90px;
          right: 270px;
          background: url('../../assets/images/poster-logo.png') no-repeat;
          background-size: contain;
          animation: myfirst 3s infinite ease-in-out;
        }

        @keyframes myfirst {
          0% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(0px, -15px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }

        .re-one {
          width: 102px;
          height: 186px;
          background: url('../../assets/images/re-one.png') no-repeat;
          background-size: contain;
          position: absolute;
          top: 200px;
          left: 140px;
          animation: myfirst 3s infinite ease-in-out;
        }

        .re-two {
          width: 102px;
          height: 186px;
          background: url('../../assets/images/re-two.png') no-repeat;
          background-size: contain;
          position: absolute;
          top: 220px;
          left: 120px;
          animation: myfirst 3s infinite ease-in-out;
        }

        .re-three {
          width: 82px;
          height: 146px;
          background: url('../../assets/images/re-three.png') no-repeat;
          background-size: contain;
          position: absolute;
          top: 230px;
          left: 100px;
          animation: myfirst 3s infinite ease-in-out;
        }

        .people {
          width: 142px;
          height: 166px;
          background: url('../../assets/images/people.png') no-repeat;
          background-size: contain;
          position: absolute;
          top: 290px;
          left: 40px;
        }
      }

      .login-panel {
        width: 440px;
        float: right;
        margin-right: 40px;

        .title {
          width: 440px;
          color: #fff;
          text-align: center;
          margin-bottom: 20px;

          p {
            font-size: 20px;
            line-height: 26px;
          }

          h3 {
            font-size: 32px;
            font-weight: bold;
            line-height: 40px;
          }
        }

        .panel {
          width: 440px;
          height: 400px;
          background: #fff;
          border-radius: 4px;
          padding: 40px 50px;
          box-sizing: border-box;

          .tab {
            display: flex;
            margin-bottom: 60px;

            p {
              font-size: 16px;
              color: #798192;
              position: relative;
              cursor: pointer;

              &.active {
                font-size: 18px;
                font-weight: bold;
                color: #283550;

                &::after {
                  position: absolute;
                  left: 0;
                  bottom: -10px;
                  width: 100%;
                  height: 4px;
                  border-radius: 2px;
                  display: block;
                  content: '';
                  background: linear-gradient(270deg, rgba(22, 219, 184, 1) 0%, rgba(23, 202, 170, 1) 100%);
                }
              }

            }
          }

          .info-container {
            height: 170px;;

            input {
              border: none;
              outline: none;
              background: #fff;
              font-size: 14px;

            }

            input:-webkit-autofill {
              -webkit-box-shadow: 0 0 0 1000px white inset;
              -webkit-text-fill-color: #333;
            }

            input[type=text]:focus, input[type=password]:focus, textarea:focus {
              -webkit-box-shadow: 0 0 0 1000px white inset;
            }

            .username, .password {
              position: relative;
              margin-bottom: 20px;
              display: flex;
              border: 1px solid #DFDFDF;
              border-radius: 4px;

              .icon-box {
                width: 50px;
                height: 50px;
                border-right: 1px solid #DFDFDF;
                // background: #798192
              }

              .ipt-box {
                flex: 1;
                height: 50px;

                input {
                  width: 100%;
                  height: 50px;
                  box-sizing: border-box;
                  padding: 0 10px;
                  line-height: 50px;
                  border-radius: 4px;
                }

                .email {
                  font-size: 14px;
                  color: #283550;
                }
              }
            }

            .username {
              input {
                width: 50% !important;
              }

              &.username-active {
                border: 1px solid #17CAAA;
              }

              .icon-box {
                background: url('../../assets/images/user-default.png') center no-repeat;
                background-size: 16px 16px;

                &.user-active {
                  background: url('../../assets/images/user-active.png') center no-repeat;
                  background-size: 16px 16px;
                  border-right: 1px solid #17CAAA;
                }
              }
            }

            .password {
              margin-bottom: 10px;

              &.password-active {
                border: 1px solid #17CAAA;
              }

              .icon-box {
                background: url('../../assets/images/lock-default.png') center no-repeat;
                background-size: 16px 16px;

                &.password-active {
                  background: url('../../assets/images/lock-active.png') center no-repeat;
                  background-size: 16px 16px;
                  border-right: 1px solid #17CAAA;
                }
              }
            }

            .tip {
              font-size: 12px;
              color: #FF5A4D;
            }

          }

          .btn {
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            background: linear-gradient(90deg, rgba(29, 189, 184, 1) 0%, rgba(23, 202, 170, 1) 100%);
            border-radius: 4px;
            pointer-events: none;
            display: block;
            border: none;
            outline: none;
            transition: background 0.3s;
            &.can-login {
              pointer-events: auto;
            }

          }
        }
      }
    }

    .desc {
      text-align: center;
      color: #fff;
      position: absolute;
      bottom: 30px;
      width: 100%;
    }

    @media screen and (max-width: 1440px) {
      .logo {
        width: 203px;
        height: 41px;
        margin: 0 0 0 30px;
      }

      .center {
        height: 440px;
        width: 1160px;

        .poster {
          width: 546px;
          height: 440px;

          .poster-logo {
            width: 79px;
            height: 78px;
            position: absolute;
            top: 70px;
            right: 210px;
            background: url('../../assets/images/poster-logo.png') no-repeat;
            background-size: contain;
            animation: myfirst 3s infinite ease-in-out;
          }

          .re-one {
            width: 82px;
            height: 146px;
            top: 186px;
            left: 130px;
          }

          .re-two {
            width: 82px;
            height: 146px;
            top: 194px;
            left: 110px;
          }

          .re-three {
            width: 65px;
            height: 95px;
            top: 206px;
            left: 100px;
          }

          .people {
            width: 122px;
            height: 136px;
            background: url('../../assets/images/people.png') no-repeat;
            background-size: contain;
            position: absolute;
            top: 238px;
            left: 29px;
          }
        }

        .login-panel {
          height: 440px;

          p {
            font-size: 16px;
          }

          h3 {
            font-size: 28px;
          }

          .panel {
            height: 350px;
            padding: 30px 40px;

            .tab {
              margin-bottom: 40px;
            }
          }
        }
      }

    }
  }

  @media (max-width: 1440px) {
    .login-page {
      padding-top: 20px;

      .center {
      }
    }
  }

</style>
