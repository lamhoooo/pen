<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "stylus/login.styl"
</style>

<template>
  <div class="login-container">
    <div class="login-left">
      <h2 class="login-left-floor">登录PEN</h2>
      <p class="login-warn" id="login-warn"></p>
      <div class="login-left-floor">
        <label for="userName">账号</label>
        <input class="login-input" id="userName" type="text">
      </div>
      <div class="login-left-floor">
        <label for="password">密码</label>
        <input class="login-input" id="password" type="password">
      </div>
      <div class="login-left-floor">
        <input class="rememberPW" name="rememberPW" type="checkbox">
        <span>记住密码</span>
        <span class="login-forget">忘记密码</span>
      </div>
      <input class="login-btn" type="button" value="登录" @click="login"><router-link to="/sign" class="sign-btn">>>注册</router-link>
    </div>
    <div class="login-right">
      <v-tableImg></v-tableImg>
    </div>
  </div>
</template>

<script>
import tableImg from './tableImg'
import requestData from './../../common/moudles/request-data'

export default {
  name: 'login',
  props: {
    phead: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    login () {
      let userId = document.getElementById('userName').value
      let password = document.getElementById('password').value
      let warn = document.getElementById('login-warn')
      let that = this
      if (userId === '' && password === '') {
        warn.innerHTML = '*账号密码不可为空'
      } else {
        requestData({
          funid: 3002,
          service: 'signService',
          data: {
            accountName: userId,
            psw: password
          },
          success: function (data) {
            if (data.statusMine === 0) {
              warn.innerHTML = '*账号或密码有误，请重新填写'
            } else {
              localStorage.JWT_TOKEN = data.token
              that.phead.isLogin = true
              that.phead.isLogin = that.userId
              alert(data.message)
              // that.$emit('showWelcome')
              that.$router.push('/home')
              location.reload()
            }
          }
        })
      }
    }
  },
  components: {
    'v-tableImg': tableImg
  }
}
</script>
