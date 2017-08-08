<template>
  <div class="tab border-1px">
    <router-link tag="div" to="/goods" class="tab-item">商品</router-link>
    <router-link tag="div" to="/ratings" class="tab-item">评论</router-link>
    <router-link tag="div" to="/seller" class="tab-item">商家</router-link>
  </div>
</template>

<script type="text/javascript">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/mixin.styl"

  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex 1
      font-size 14px
      color rgb(77, 85, 93)
      text-align center
      &.router-link-active
        color rgb(240, 20, 20)
</style>
