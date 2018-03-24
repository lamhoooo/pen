<template>
  <div id="app" :class="{'fixedHeight' : !controlApp.isScroll}">
    <v-roof ref="roof" :phead="phead"></v-roof>
    <keep-alive>
      <router-view :phead="phead" :controlApp="controlApp" ref="view"></router-view>
    </keep-alive>
    <v-floor></v-floor>
  </div>
</template>

<script>
import roof from './components/universal/roof'
import floor from './components/universal/floor'

export default {
  data () {
    return {
      phead: {
        isLogin: false,
        userName: '',
        userId: ''
      },
      controlApp: {
        isScroll: true,
        scrollTop: 0
      }
    }
  },
  methods: {
    hideRoofMoreByChild () {
      this.$refs.roof.hideRoofMore()
    },
    hidePersonalCenterMore () {
      if (this.$route.name === 'personalCenter') {
        this.$refs.view.hidePersonalCenterMore()
      }
    },
    bingingClick () {
      let app = document.getElementById('app')
      app.addEventListener('click', this.hideRoofMoreByChild)
      app.addEventListener('click', this.hidePersonalCenterMore, true)
    },
    fixedScroll () {
      if (!this.controlApp.isScroll) {
        window.scrollTo(0, this.controlApp.scrollTop)
      }
    }
  },
  mounted () {
    this.bingingClick()
    window.addEventListener('scroll', this.fixedScroll)
  },
  components: {
    'v-roof': roof,
    'v-floor': floor
  }
}
</script>

<style>
  @import "./common/stylus/icon.styl";
  body{
    padding: 0;
    margin: 0;
    min-width: 700px;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }
  * {
    padding: 0;
    margin: 0;
  }
  .fixedHeight {
    position: relative;
    overflow: hidden;
  }
</style>
