<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/personalCenter.styl"
</style>

<template>
  <div class="personalCenter-contain">
    <div class="personalCenter-details-wrap">
      <img class="personalCenter-headImg" :src="personalSign && personalSign.headImg ? personalSign.headImg :'http://p4re0zg5o.bkt.clouddn.com/pen/headImg/lamhoo.png'">
      <div class="personalCenter-Important-details-wrap">
        <div class="personalCenter-user-name">{{personalSign && personalSign.penName ? personalSign.penName :'PEN'}}
          <span class="personalCenter-user-more-btn icon-more" @click="showPersonalCenterMore"></span>
          <transition name="personalCenter-more-fade">
            <div class="personalCenter-user-more" v-show="control.isShowPersonalCenterMore">
              <p>性别：{{personalSign && personalSign.sex===0 ? '迷' : (personalSign.sex===1?'男':'女')}}</p>
              <p>来自：{{personalSign && personalSign.nation ? personalSign.nation :'未知国'}}.{{personalSign && personalSign.city ? personalSign.city :'未知城市'}}</p>
              <p>诞生：{{personalSign && personalSign.birth ? personalSign.birth :'欸，年龄不能问的哦'}}</p>
              <p>邮箱：{{personalSign && personalSign.mailbox ? personalSign.mailbox :'未绑定邮箱'}}</p>
              <p @click="goPersonalNet">网站：{{personalSign && personalSign.website ? personalSign.website :'未填写个人网站'}}</p>
            </div>
          </transition>
        </div>
        <p class="personalCenter-user-realName">{{personalSign && personalSign.realNmae ? personalSign.realNmae :'无名氏'}}</p>
        <p class="personalCenter-user-brief">{{personalSign && personalSign.brief ? personalSign.brief :'。。。。。。'}}</p>
      </div>
    </div>
    <div class="tag-wrap">
      <v-tag v-for="(item, index) in fakeTag" :key="index" :name="item"></v-tag>
    </div>
    <div class="picFlow-control">
      <div class="picFlow-kind">
        <span name="trending" :class="{'picFlow-kind-active' : control.kind===0}" @click="choseKind(0)">图片</span>
        <span name="new" :class="{'picFlow-kind-active' : control.kind===1}" @click="choseKind(1)">集合</span>
      </div>
      <div class="picFlow-showType">
        <span name="list-one" class="icon-menu" :class="{'picFlow-kind-active' : control.showType===0}" @click="choseShowType(0)"></span>
        <span name="list-three" class="icon-grid" :class="{'picFlow-kind-active' : control.showType===1}" @click="choseShowType(1)"></span>
      </div>
    </div>
    <div class="picFlow-control-pic">
      <span :class="{'picFlow-control-pic-active' : control.searchMode===0}" @click="choseSearchMode(0)">默认</span>
      <span :class="{'picFlow-control-pic-active' : control.searchMode===1}" @click="choseSearchMode(1)">按热度</span>
      <span :class="{'picFlow-control-pic-active' : control.searchMode===2}" @click="choseSearchMode(2)">按时间</span>
    </div>
    <v-picFlow ref="picFlow" :showType="control.showType" :controlApp="controlApp"></v-picFlow>
  </div>
</template>

<script>
import tag from './../../components/universal/tag'
import picFlow from './../../components/home/picFlow'
import requestData from './../../common/moudles/request-data'
import $ from 'jquery'

export default {
  name: 'personalCenter',
  props: {
    controlApp: {
      type: Object
    }
  },
  data () {
    return {
      control: {
        isShowPersonalCenterMore: false,
        searchMode: 0,
        kind: 0,
        showType: 1
      },
      personalSign: '',
      fakeTag: ['风景', '人物', '黑白', '故事', '剪影'],
      pageData: 0,
      userId: this.$route.query.userId
    }
  },
  methods: {
    goPersonalNet () {
      window.open('https://weibo.com/1927393552/profile?topnav=1&wvr=6&is_all=1')
    },
    showPersonalCenterMore (event) {
      event.cancelBubble = true
      this.control.isShowPersonalCenterMore = true
    },
    hidePersonalCenterMore () {
      this.control.isShowPersonalCenterMore = false
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
    },
    choseSearchMode (type) {
      if (this.control.searchMode !== type) {
        this.control.searchMode = type
      }
    },
    getPicPersonalCenter () {
      let that = this
      requestData({
        funid: 10002,
        service: 'picService',
        needLogin: localStorage.JWT_TOKEN ? '1' : '',
        data: {
          page: this.pageData,
          userId: this.$route.query.userId
        },
        success: function (data) {
          that.$refs.picFlow.grounpPic(data.picsmallEntityList, data.pictureEntityList)
          that.pageData++
          that.personalSign = data.userEntity
        }
      }, that)
    }
  },
  created () {
    this.getPicPersonalCenter()
    var self = this
    $(window).scroll(function () {
      let scrollTop = $(this).scrollTop()
      let scrollHeight = $(document).height()
      let windowHeight = $(this).height()
      if (scrollTop + windowHeight === scrollHeight) {
        self.getPicPersonalCenter()
      }
    })
  },
  components: {
    'v-tag': tag,
    'v-picFlow': picFlow
  }
}
</script>
