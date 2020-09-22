<template>
  <div class="container demo-1">
    <div class="content">
      <div id="large-header" class="large-header">
        <canvas id="demo-canvas"></canvas>
        <div class="logo_box">
          <h3>管理系统</h3>
          <form action="#" name="f" method="post">
            <div class="input_outer">
              <span class="u_user"></span>
              <input
                name="logname"
                class="text"
                style="color: #FFFFFF !important"
                type="text"
                placeholder="请输入账号"
                v-model="loginForm.username"
                @blur="validUsername"
              />
            </div>
            <div class="input_outer">
              <span class="us_uer"></span>
              <input
                name="logpass"
                class="text"
                style="color: #FFFFFF !important; position:absolute; z-index:100;"
                value=""
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.password"
                @blur="validPassword"
              />
            </div>
            <div class="input_outer">
              <span class="uc_uer"></span>
              <input
                name="logpass"
                class="text code"
                style="color: #FFFFFF !important; position:absolute; z-index:100;"
                value=""
                type="text"
                placeholder="请输入验证码"
                v-model="loginForm.code"
                @blur="validCode"
              />
              <img :src="codeUrl" alt="" @click="getCode" />
            </div>
            <div class="mb2">
              <a
                class="act-but submit"
                href="javascript:;"
                style="color: #FFFFFF"
                @click="loginSubmit"
                >登录</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /container -->
</template>

<script>
import demo from '../script/demo-1'
import { login, getCodeImg } from '../api/login/index'
import { validEmpty } from '../util/validate'
import { getCookie, setCookie } from '../util/cookie'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: '',
      },
      codeUrl: '',
      valid: true,
    }
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
        console.log(this.codeUrl)
      })
    },
    validUsername() {
      if (!validEmpty(this.loginForm.username, '用户名')) {
        this.valid = false
        return false
      }
      return true
    },
    validPassword() {
      if (!validEmpty(this.loginForm.password, '密码')) {
        this.valid = false
        return false
      }
      return true
    },
    validCode() {
      if (!validEmpty(this.loginForm.code, '验证码')) {
        this.valid = false
        return false
      }
      return true
    },
    loginSubmit() {
      if (
        this.validUsername(this.loginForm.username) &&
        this.validPassword(this.loginForm.password) &&
        this.validCode(this.loginForm.code)
      ) {
        login(this.loginForm)
          .then((res) => {
            setCookie('token', res.token)
            /*
            let routes = res.routes
            this.$store.dispatch('route/setRoutes', routes)
            setCookie('routes', JSON.stringify(routes))
            */
            this.$router.push({ name: 'main' })
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        console.log('1')
      }
    },
  },
  created() {
    this.getCode()
  },
  mounted() {
    this.$nextTick(function() {
      demo.initHeader()
      demo.initAnimation()
      demo.addListeners()
    })
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/css/normalize.css';
@import '../assets/css/component.css';
@import '../assets/css/demo.css';
</style>
