<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/picFlow.styl"
</style>

<template>
  <div>
    <div class="picFlow-container" v-if="showType===1">
      <ul class="picFlow-ul" v-if="dataImgLeft">
        <li v-for="(item, key) in dataImgLeft" :key="key">
          <v-pic :pic="item" :controlApp="controlApp"></v-pic>
        </li>
      </ul>
      <ul class="picFlow-ul" v-if="dataImgMiddle">
        <li v-for="(item, key) in dataImgMiddle" :key="key">
          <v-pic :pic="item" :controlApp="controlApp"></v-pic>
        </li>
      </ul>
      <ul class="picFlow-ul" v-if="dataImgRight">
        <li v-for="(item, key) in dataImgRight" :key="key">
          <v-pic :pic="item" :controlApp="controlApp"></v-pic>
        </li>
      </ul>
    </div>
    <div class="picFlow-container" v-else>
      <ul class="picFlow-ul">
        <li v-for="(item, key) in dataImgAll" :key="key">
          <v-pic :pic="item" :controlApp="controlApp"></v-pic>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pic from './pic'

export default {
  name: 'picFlow',
  props: {
    showType: {
      type: Number
    },
    controlApp: {
      type: Object
    }
  },
  data () {
    return {
      dataImgAll: [],
      dataImgLeft: [],
      dataImgMiddle: [],
      dataImgRight: []
    }
  },
  methods: {
    grounpPic (dataImgSmall, dataImg) {
      for (let i = 0; i < dataImgSmall.length; i++) {
        this.dataImgAll.push(dataImg[i])
        dataImgSmall[i].userId = dataImg[i].userId
        dataImgSmall[i].urlBig = dataImg[i].url
        dataImgSmall[i].love = dataImg[i].love ? dataImg[i].love : 0
        dataImgSmall[i].nation = dataImg[i].nation ? dataImg[i].nation : ''
        dataImgSmall[i].city = dataImg[i].city ? dataImg[i].city : ''
        dataImgSmall[i].name = dataImg[i].name ? dataImg[i].name : ''
        dataImgSmall[i].shootDate = dataImg[i].shootDate ? dataImg[i].shootDate : ''
        dataImgSmall[i].desc = dataImg[i].desc ? dataImg[i].desc : ''
        if (i % 3 === 0) {
          this.dataImgLeft.push(dataImgSmall[i])
        } else if (i % 3 === 1) {
          this.dataImgMiddle.push(dataImgSmall[i])
        } else {
          this.dataImgRight.push(dataImgSmall[i])
        }
      }
    }
  },
  components: {
    'v-pic': pic
  }
}
</script>
