<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "stylus/tableImg.styl"
</style>

<template>
  <div class="tableImg-container">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td v-bind:style="{opacity: this.imgOpacity[0], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
          <td v-bind:style="{opacity: this.imgOpacity[1], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" colspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[2], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[9], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
          <td v-bind:style="{opacity: this.imgOpacity[8], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" colspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[7], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
        </tr>
        <tr>
          <td v-bind:style="{opacity: this.imgOpacity[3], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[4], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
          <td v-bind:style="{opacity: this.imgOpacity[5], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[6], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[5], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
          <td v-bind:style="{opacity: this.imgOpacity[4], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
        </tr>
        <tr>
          <td v-bind:style="{opacity: this.imgOpacity[6], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[7], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
          <td v-bind:style="{opacity: this.imgOpacity[3], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" rowspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[2], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
        </tr>
        <tr>
          <td v-bind:style="{opacity: this.imgOpacity[8], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
          <td v-bind:style="{opacity: this.imgOpacity[9], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" colspan="2"></td>
          <td v-bind:style="{opacity: this.imgOpacity[1], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}"></td>
          <td v-bind:style="{opacity: this.imgOpacity[0], backgroundImage: 'url(' + this.imgUrl[Math.floor(Math.random()*pageNum*18)].url + ')'}" colspan="2"></td>
        </tr>
      </table>
    </div>
</template>

<script>
import requestData from './../../common/moudles/request-data'

export default {
  name: 'tableImg',
  data () {
    return {
      imgOpacity: [ Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1), Math.random().toFixed(1) ],
      imgUrl: [],
      pageNum: 3
    }
  },
  methods: {
    getPicLogin (page) {
      let that = this
      requestData({
        funid: 10001,
        service: 'picService',
        data: {page: page},
        success: function (data) {
          for (let i = 0; i < data.picsmallEntityList.length; i++) {
            that.imgUrl.push(data.picsmallEntityList[i])
          }
        }
      })
    }
  },
  created () {
    for (let i = 0; i < this.pageNum; i++) {
      this.getPicLogin(i)
    }
  }
}
</script>
