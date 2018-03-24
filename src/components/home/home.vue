<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/home.styl"
</style>

<template>
  <div class="home-container">
    <div class="home-banner" v-bind:style="{backgroundImage: 'url(' + banner + ')'}">
      <div class="home-banner-content">
        <h1 class="home-banner-title">PEN-摄影展览网</h1>
        <p class="home-banner-beauty">美丽，免费的图片</p>
        <p class="home-banner-story">世界上最慷慨的摄影师从作品中分享出故事和态度 <span class="icon-gift"></span></p>
        <input class="home-banner-search" type="text" placeholder="搜索图片">
        <span class="home-banner-search-logo icon-search"></span>
        <input class="home-banner-search-btn" type="button" value="搜索">
        <p class="home-banner-hotLabel">热门标签：<span>建筑</span><span>大自然</span><span>iphone</span><span>植物</span><span>海</span></p>
      </div>
      <div class="home-banner-author">照片来自 <span>lamhoo</span></div>
      <div class="home-banner-more">了解更多 <span>PEN规则</span></div>
    </div>
    <div class="picFlow-control">
      <div class="picFlow-kind">
        <span name="trending" :class="{'picFlow-kind-active' : control.kind===0}" @click="choseKind(0)">推荐</span>
        <span name="new" :class="{'picFlow-kind-active' : control.kind===1}" @click="choseKind(1)">新的</span>
        <span name="following" :class="{'picFlow-kind-active' : control.kind===2}" @click="choseKind(2)">关注</span>
      </div>
      <div class="picFlow-showType">
        <span name="list-one" class="icon-menu" :class="{'picFlow-kind-active' : control.showType===0}" @click="choseShowType(0)"></span>
        <span name="list-three" class="icon-grid" :class="{'picFlow-kind-active' : control.showType===1}" @click="choseShowType(1)"></span>
      </div>
    </div>
    <v-picFlow ref="picFlow" :showType="control.showType" :controlApp="controlApp"></v-picFlow>
  </div>
</template>

<script>
import utils from './../../common/moudles/utils'
import requestData from './../../common/moudles/request-data'
import $ from 'jquery'

import picFlow from './picFlow'

export default {
  name: 'home',
  props: {
    phead: {
      type: Object
    },
    controlApp: {
      type: Object
    }
  },
  data () {
    return {
      banner: utils.getFormatImg('http://p4re0zg5o.bkt.clouddn.com/pen/home/banner-hill.jpg'),
      pageData: 0,
      control: {
        kind: 0,
        showType: 1
      }
    }
  },
  methods: {
    getPicFirst () {
      let that = this
      requestData({
        funid: 10001,
        service: 'picService',
        needLogin: localStorage.JWT_TOKEN ? '1' : '',
        data: {page: this.pageData},
        success: function (data) {
          that.$refs.picFlow.grounpPic(data.picsmallEntityList, data.pictureEntityList)
          that.pageData++
        }
      }, that)
    },
    choseKind (type) {
      if (this.control.kind !== type) {
        this.control.kind = type
      }
    },
    choseShowType (type) {
      if (this.control.showType !== type) {
        this.control.showType = type
      }
    }
  },
  created () {
    this.getPicFirst()
    var self = this
    $(window).scroll(function () {
      let scrollTop = $(this).scrollTop()
      let scrollHeight = $(document).height()
      let windowHeight = $(this).height()
      if (scrollTop + windowHeight === scrollHeight) {
        self.getPicFirst()
      }
    })
  },
  components: {
    'v-picFlow': picFlow
  }
}
</script>
