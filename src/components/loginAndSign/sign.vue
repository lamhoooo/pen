<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "stylus/sign.styl"
</style>

<template>
  <div class="sign-container">
    <div class="sign-left">
      <div class="sign-left-wrap">
        <h2 class="sign-left-floor">注册PEN</h2>
        <div class="sign-left-floor">
          <label for="userId">账号</label>
          <input class="sign-input" id="userId" type="text" maxlength="20" @blur="regularId">
          <span class="sign-warn" id="sign-id-warn"></span>
        </div>
        <div class="sign-left-floor">
          <label for="password">密码</label>
          <input class="sign-input" id="password" type="password" @blur="regularPsw">
          <span class="sign-showPSW" :class="control.isShowPsw === 1 ? 'icon-smile2' : 'icon-ello'" maxlength="20" @click="showOrHidePSW"></span>
          <span class="sign-warn" id="sign-psw-warn"></span>
        </div>
        <div class="sign-left-floor">
          <label for="surePassword">确认密码</label>
          <input class="sign-input" id="surePassword" type="password" @blur="regularPswSame">
          <span class="sign-showPSW" :class="control.isShowPswSure === 1 ? 'icon-smile2' : 'icon-ello'" maxlength="20" @click="showOrHidePSWSure"></span>
          <span class="sign-warn" id="sign-surePsw-warn"></span>
        </div>
        <div class="sign-left-floor">
          <label for="userName">用户名</label>
          <input class="sign-input" id="userName" type="text" maxlength="20" @blur="regularName">
          <span class="sign-warn" id="sign-name-warn"></span>
        </div>
        <div class="sign-left-floor">
          <label for="phone">手机/邮箱</label>
          <input class="sign-input" id="phone" type="text" maxlength="20" @blur="regularPhone">
          <span class="sign-warn" id="sign-phone-warn"></span>
        </div>
        <p class="sign-tips">*用手机/邮箱接收验证码（只支持移动用户）</p>
        <div class="sign-left-floor">
          <label for="authCode" maxlength="10">验证码</label>
          <input class="sign-input authCode-input" id="authCode" type="text" @blur="regularAuthCode">
          <input class="sign-getAuthCode" type="button" :value="control.countDownNum === 0 ? '获取验证码' : control.countDownNum+'s'" @click="requestAuthCode">
          <span class="sign-warn" id="sign-authCode-warn"></span>
        </div>
        <input class="sign-btn" type="button" value="注册" @click="requestSign"><router-link to="/login" class="login-btn">>>已有账号，直接登录</router-link>
      </div>
    </div>
    <div class="sign-right">
      <v-tableImg></v-tableImg>
    </div>
  </div>
</template>

<script>
import requestData from './../../common/moudles/request-data'
import tableImg from './tableImg'

export default {
  name: 'sign',
  data () {
    return {
      control: {
        isShowPsw: 0,
        isShowPswSure: 0,
        surePhone: 0,
        sureAll: 0,
        countDownNum: 0
      }
    }
  },
  methods: {
    showOrHidePSW () {
      if (this.control.isShowPsw === 0) {
        this.control.isShowPsw = 1
        document.getElementById('password').type = 'text'
      } else {
        this.control.isShowPsw = 0
        document.getElementById('password').type = 'password'
      }
    },
    showOrHidePSWSure () {
      if (this.control.isShowPswSure === 0) {
        this.control.isShowPswSure = 1
        document.getElementById('surePassword').type = 'text'
      } else {
        this.control.isShowPswSure = 0
        document.getElementById('surePassword').type = 'password'
      }
    },
    regularPswSame () {
      let psw = document.getElementById('password').value
      let pswSure = document.getElementById('surePassword').value
      let warning = document.getElementById('sign-surePsw-warn')
      if (pswSure === '' || pswSure == null || pswSure === undefined) {
        warning.innerHTML = '*确认密码不可为空'
        this.control.sureAll = 1
      } else if (psw !== pswSure) {
        warning.innerHTML = '*请确认密码一致'
        this.control.sureAll = 1
      } else {
        warning.innerHTML = ''
        this.control.sureAll = 0
      }
    },
    regularPsw () {
      let patrm = /^[~'!@#￥$%^&*()-+_=:\w]{6,18}$/
      let value = document.getElementById('password').value
      let warning = document.getElementById('sign-psw-warn')
      if (value === '' || value == null || value === undefined) {
        warning.innerHTML = '*密码不可为空'
        this.control.sureAll = 1
      } else if (!patrm.exec(value)) {
        warning.innerHTML = '*密码只能由6-18位字母、数字和符号组成'
        this.control.sureAll = 1
      } else {
        warning.innerHTML = ''
        this.control.sureAll = 0
      }
    },
    regularId () {
      let patrm = /^[~'!@#￥$%^&*()-+_=:\w]{6,18}$/
      let value = document.getElementById('userId').value
      let warning = document.getElementById('sign-id-warn')
      if (value === '' || value == null || value === undefined) {
        warning.innerHTML = '*账号不可为空'
        this.control.sureAll = 1
      } else if (!patrm.exec(value)) {
        warning.innerHTML = '*账号只能由6-18位字母、数字和符号组成'
        this.control.sureAll = 1
      } else {
        warning.innerHTML = ''
        this.control.sureAll = 0
      }
    },
    regularName () {
      let value = document.getElementById('userName').value
      let warning = document.getElementById('sign-name-warn')
      if (value === '' || value == null || value === undefined) {
        warning.innerHTML = '*用户名不可为空'
        this.control.sureAll = 1
      } else {
        warning.innerHTML = ''
        this.control.sureAll = 0
      }
    },
    regularPhone () {
      let patrm = /^1\d{10}$/
      let patrmMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      let value = document.getElementById('phone').value
      let warning = document.getElementById('sign-phone-warn')
      if (value === '' || value == null || value === undefined) {
        warning.innerHTML = '*手机号不可为空'
        this.control.sureAll = 1
        this.control.surePhone = 1
      } else if (!patrm.exec(value) && !patrmMail.exec(value)) {
        warning.innerHTML = '*手机/邮箱格式有误'
        this.control.sureAll = 1
        this.control.surePhone = 1
      } else {
        warning.innerHTML = ''
        this.control.sureAll = 0
        this.control.surePhone = 0
      }
    },
    regularAuthCode () {
      let value = document.getElementById('authCode').value
      let warning = document.getElementById('sign-authCode-warn')
      if (value === '' || value == null || value === undefined) {
        warning.innerHTML = '*验证码不可为空'
        this.control.sureAll = 1
      } else {
        warning.innerHTML = ''
        this.control.sureAll = 0
      }
    },
    requestAuthCode () {
      let phone = document.getElementById('phone').value
      this.regularPhone()
      if (this.control.surePhone === 0 && this.control.countDownNum === 0) {
        this.countDowm()
        requestData({
          funid: 2001,
          service: 'phoneService',
          data: {phoneNum: phone},
          success: function (data) {
            alert(data.message)
          }
        })
      } else {
        console.log('手机格式有误')
      }
    },
    requestSign () {
      this.regularId()
      this.regularPsw()
      this.regularPswSame()
      this.regularName()
      this.regularPhone()
      this.regularAuthCode()
      if (this.control.sureAll === 0) {
        let userId = document.getElementById('userId').value
        let psw = document.getElementById('password').value
        let userName = document.getElementById('userName').value
        let phoneNum = document.getElementById('phone').value
        let authCode = document.getElementById('authCode').value
        requestData({
          funid: 3001,
          service: 'signService',
          data: {
            accountName: userId,
            psw: psw,
            userName: userName,
            phoneNum: phoneNum,
            authCode: authCode
          },
          success: function (data) {
            alert(data.message)
          }
        })
      } else {
        console.log('请填写好全部信息')
      }
    },
    countDowm () {
      this.control.countDownNum = 60
      let that = this
      let interval = setInterval(function () {
        if (that.control.countDownNum > 0) {
          that.control.countDownNum--
        } else {
          clearInterval(interval)
        }
      }, 1000)
      interval()
    }
  },
  components: {
    'v-tableImg': tableImg
  }
}
</script>
