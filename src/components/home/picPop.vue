<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/picPop.styl"
</style>

<template>
  <div class="picPop-container">
    <span class="icon-close picPop-close" @click="hidePicPop"></span>
    <div class="picPop-img-wrap" @click="hidePicPop">
      <div class="picPop-img-basicData-wrap">
        <img class="picPop-img-headImg" :src="authorData && authorData.headImg ? authorData.headImg : 'http://p4re0zg5o.bkt.clouddn.com/pen/headImg/lamhooBlack.png'"/>
        <div class="picPop-img-accountNum">{{authorData && authorData.accountNum}}</div>
        <div class="picPop-download">下载</div>
        <div class="picPop-collect"><span class="icon-add_circle"></span> 收藏</div>
        <div class="picPop-love"><span class="icon-favorite"></span>163{{pic&&pic.love}}</div>
      </div>
      <img class="picPop-img" :src="pic && pic.urlBig ? pic.urlBig : ''">
      <div class="picPop-titleAndDate">
        <span class="picPop-title">{{pic&&pic.name}}无题</span>
        <span class="picPop-siteAndDate">{{pic&&pic.nation}}中国 {{pic&&pic.city}}广州  {{pic&&pic.shootDate}}2018.12.19</span>
      </div>
      <p class="picPop-desc">{{pic&&pic.desc}}啦啦啦啦啦啦啦啦啦啦啦啊啊啊啊啊啊啊啊啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'picPop',
  props: {
    pic: {
      type: Object
    },
    controlPic: {
      type: Object
    },
    controlApp: {
      type: Object
    },
    authorData: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    hidePicPop (event) {
      this.controlPic.isShowPicPop = false
      this.controlApp.isScroll = true
      event.cancelBubble = true
    }
  }
}
</script>
