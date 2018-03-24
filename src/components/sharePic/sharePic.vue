<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/sharePic.styl"
</style>

<template>
  <div class="sharePic-container">
    <p class="sharePic-title">分享作品<span class="icon-help-with-circle"></span></p>
    <div class="sharePic-btn-wrap"><span class="sharePic-btn-batch">批量上传</span><span class="sharePic-btn-collect">生成集合</span><span class="sharePic-btn-tips">*集合须知：请在下列图片右上角选择需要加入集合的作品，标亮作品置顶且作为封面展示</span></div>
    <div class="sharePic-collection">
      <p  class="sharePic-collection-title">集合信息</p>
      <div class="sharePic-collection-name"><span>名字</span><input type="text"></div>
      <div class="sharePic-collection-desc"><span>描述</span><textarea type="text"/></div>
      <div class="sharePic-collection-tag">
        <span class="sharePic-collection-tag-title">标签</span>
        <div class="sharePic-collection-tag-wrap">
          <v-tag v-for="(item, index) in tagList" :key="index" :name="item" class="harePic-collection-tag-item"></v-tag>
        </div>
      </div>
    </div>
    <div class="sharePic-picInfo-container">
      <img class="sharePic-img" src="http://p4re0zg5o.bkt.clouddn.com/pen/pic_warehouse/6V19Uy-tUhs.jpg">
      <div class="sharePic-picInfo-wrap">
        <div class="sharePic-picInfo-item"><span>名字</span><input class="sharePic-picInfo-input" type="text"/></div>
        <div class="sharePic-picInfo-item">
          <span>国家</span>
          <select>
            <option v-for="(item, index) in nativeObj" :value="item" :key="index">{{item}}</option>
          </select>
          <span>城市</span>
          <select>
            <option v-for="(item, index) in nativeObj" :value="item" :key="index">{{item}}</option>
          </select>
        </div>
        <div class="sharePic-picInfo-item"><span>拍摄时间</span><input type="text"/></div>
        <div class="sharePic-picInfo-item"><span >描述</span><textarea type="text"/></div>
        <div class="sharePic-picInfo-item">谁可以看
          <select>
            <option value="1">公开</option>
            <option value="0">私密</option>
          </select>
        </div>
        <div class="sharePic-picInfo-item"><span>标签</span><v-tag v-for="(item, index) in fakeTag" :key="index" :name="item"></v-tag></div>
      </div>
    </div>
  </div>
</template>

<script>
import tag from './../../components/universal/tag'

export default {
  name: 'sharePic',
  data () {
    return {
      tagList: ['风景', '人物', '黑白', '故事', '剪影', '风景', '人物', '黑白', '故事', '剪影', '风景', '人物', '黑白', '故事', '剪影', '风景', '人物', '黑白', '故事', '剪影', '风景', '人物', '黑白', '故事', '剪影'],
      nationTest: ['中国', '韩国', '美国', '日本', '葡萄牙', '菲律宾', '新加坡', '中国', '韩国', '美国', '日本', '葡萄牙', '菲律宾', '新加坡']
    }
  },
  components: {
    'v-tag': tag
  }
}
</script>
