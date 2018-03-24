<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/roof.styl"
</style>

<template>
  <div class="roof-container">
    <span class="roof-logo icon-camera"></span>
    <nav>
      <router-link class="nav-chose" to="/home">主页</router-link>
      <router-link class="nav-chose" to="/collections" >集合</router-link>
      <router-link class="nav-chose" to="/explore">发现</router-link>
      <span class="nav-chose nav-more icon-navigation-more" @click="showRoofMore"></span>
    </nav>
    <div class="roof-search-wrap">
      <transition name="roof-search-fade">
        <div class="roof-search-container" v-show="control.isShowSearch">
          <input class="roof-search" placeholder="输入照片的关键字" type="text">
          <span class="roof-search-logo icon-search"></span>
        </div>
      </transition>
    </div>
    <transition name="roof-welcome-fade">
      <span class="roof-welcome" v-show="control.isShowWelcome"><span class="icon-favorite" :style="{color: control.favoriteColor}"></span> {{greeting}}{{phead.userName}}</span>
    </transition>
    <router-link class="roof-sharePic" to="/sharePic">分享作品</router-link>
    <div class="roof-mine">
      <span class="roof-message icon-message"></span>
      <span class="roof-personalCenter icon-personalCenter" @mouseover="showRoofSign" @mouseout="hideRoofSign">
        <transition name="roof-sign">
          <div class="roof-sign-wrap" v-show="control.isShowRoofSign">
            <div v-show="!phead.isLogin">
              <router-link class="roof-sign-item" to="/login">登录</router-link>
              <router-link class="roof-sign-item" to="/sign">注册</router-link>
            </div>
            <div v-show="phead.isLogin">
              <p class="roof-sign-item"><span>{{phead.userName}}</span></p>
              <p class="roof-sign-item" @click="goPersonalCenter">个人中心</p>
              <p class="roof-sign-item roof-sign-out" @click="outLogin">退出登陆</p>
            </div>
          </div>
        </transition>
      </span>
    </div>
    <transition name="roof-more">
      <div class="roof-more-wrap" v-show="control.isShowRoofMore">
        <p class="roof-more-item">成为摄影用户</p>
        <p class="roof-more-item">更多功能二</p>
        <p class="roof-more-item">更多功能二</p>
        <p class="roof-more-item">更多功能三</p>
        <p class="roof-more-item">敬请期待</p>
        <p class="roof-more-item">帮助</p>
        <div class="roof-more-share">
          <span class="icon-sina-weibo roof-more-share-item" @click="openOtherNet(1)"></span>
          <span class="icon-instagram roof-more-share-item" @click="openOtherNet(2)"></span>
          <span class="icon-github roof-more-share-item" @click="openOtherNet(3)"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import requestData from './../../common/moudles/request-data'

export default {
  name: 'roof',
  props: {
    phead: {
      type: Object
    }
  },
  data () {
    return {
      control: {
        isShowSearch: false,
        isShowRoofMore: false,
        isShowRoofSign: false,
        isShowWelcome: false,
        favoriteColor: '#cc0000'
      },
      greeting: ''
    }
  },
  created () {
    this.judgeLogin()
  },
  mounted () {
    this.isShowRoofSearch()
    this.judgeLogin()
    this.favorite()
    window.addEventListener('scroll', this.isShowRoofSearch)
  },
  methods: {
    isShowRoofSearch () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 300 || this.$route.name !== 'home') {
        this.control.isShowSearch = true
      } else {
        this.control.isShowSearch = false
      }
    },
    showRoofMore (event) {
      event.cancelBubble = true
      this.control.isShowRoofMore = true
    },
    hideRoofMore () {
      this.control.isShowRoofMore = false
    },
    showRoofSign (event) {
      event.cancelBubble = true
      this.control.isShowRoofSign = true
    },
    hideRoofSign () {
      this.control.isShowRoofSign = false
    },
    openOtherNet (type) {
      if (type === 1) {
        window.open('https://weibo.com/1927393552/profile?topnav=1&wvr=6&is_all=1')
      } else if (type === 2) {
        window.open('https://www.instagram.com/lamhoo_/')
      } else {
        window.open('https://www.baidu.com')
      }
    },
    judgeLogin () {
      let that = this
      if (localStorage.JWT_TOKEN) {
        requestData({
          funid: 3004,
          service: 'signService',
          needLogin: localStorage.JWT_TOKEN ? '1' : '',
          data: {page: this.pageData},
          success: function (data) {
            that.phead.userName = data.userName
            that.phead.userId = data.userId
            if (data.userName !== '') {
              that.phead.isLogin = true
              that.welcome()
            }
          }
        })
      }
    },
    outLogin () {
      this.phead.isLogin = false
      localStorage.clear()
    },
    welcome () {
      let that = this
      let hour = new Date().getHours()
      if (hour < 6) {
        this.greeting = '凌晨好！'
      } else if (hour < 9) {
        this.greeting = '早上好！'
      } else if (hour < 12) {
        this.greeting = '上午好！'
      } else if (hour < 14) {
        this.greeting = '中午好！'
      } else if (hour < 17) {
        this.greeting = '下午好！'
      } else if (hour < 19) {
        this.greeting = '傍晚好！'
      } else if (hour < 22) {
        this.greeting = '晚上好！'
      } else {
        this.greeting = '夜里好！'
      }
      if (!this.control.isShowSearch) {
        this.control.isShowWelcome = true
        setTimeout(function () {
          that.control.isShowWelcome = false
        }, 2000)
      }
    },
    favorite () {
      this.control.favoriteColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
    },
    goPersonalCenter () {
      this.$router.push({
        path: '/personalCenter',
        query: {
          userId: this.phead.userId
        }
      })
      location.reload()
    }
  },
  watch: {
    $route () {
      this.isShowRoofSearch()
    }
  }
}
</script>
