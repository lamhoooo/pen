<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/pic.styl"
</style>

<template>
  <div class="pic-container" @mouseover="getAuthorData" @mouseout="mouseOutPic"  @click="showPicPop">
    <img class="pic-img" :src="pic.url">
    <transition name="pic-hover-fade">
      <div class="pic-hover-wrap" v-show="controlPic.isShowAuthor">
        <div class="pic-img-hover-top">
          <div class="pic-img-hover-collect"><span class="icon-add_circle"></span> 收藏</div>
          <div class="pic-img-hover-love"><span class="icon-favorite"></span>163</div>
        </div>
        <div class="pic-img-hover-bottom">
          <img class="pic-author-headImg" :src="authorData && authorData.headImg ? authorData.headImg : 'http://p4re0zg5o.bkt.clouddn.com/pen/headImg/lamhooBlack.png'">
          <div class="pic-author-name">{{authorData && authorData.accountNum}}</div>
          <div class="pic-download-wrap"><span class="pic-download icon-arrow-down2"></span></div>
        </div>
      </div>
    </transition>
    <v-picPop v-show="controlPic.isShowPicPop" :controlApp="controlApp" :controlPic="controlPic" :authorData="authorData" :pic="pic"></v-picPop>
  </div>
</template>

<script>
import requestData from './../../common/moudles/request-data'

import picPop from './picPop'

export default {
  name: 'pic',
  props: {
    pic: {
      type: Object
    },
    controlApp: {
      type: Object
    }
  },
  data () {
    return {
      controlPic: {
        isShowAuthor: false,
        isShowPicPop: false
      },
      authorData: ''
    }
  },
  methods: {
    getAuthorData () {
      let that = this
      if (this.authorData === '') {
        requestData({
          funid: 3003,
          service: 'signService',
          data: {
            userId: this.pic.userId
          },
          success: function (data) {
            that.authorData = data.userEntity
          }
        })
      }
      this.controlPic.isShowAuthor = true
    },
    mouseOutPic () {
      this.controlPic.isShowAuthor = false
    },
    showPicPop () {
      this.controlPic.isShowPicPop = true
      this.controlApp.isScroll = false
      this.controlApp.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    }
  },
  components: {
    'v-picPop': picPop
  }
}
</script>
