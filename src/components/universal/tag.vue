<style scoped lang="stylus" rel="sylesheet/stylus">
  @import "./stylus/tag.styl"
</style>

<template>
  <div class="tag">{{name}}</div>
</template>

<script>
export default {
  name: 'tag',
  props: {
    name: {
      type: String
    }
  }
}
</script>
