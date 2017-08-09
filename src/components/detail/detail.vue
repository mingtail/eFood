<template>
  <div v-show="detailShow" class="detail">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <star :size="48" :score="seller.score"></star>
      </div>
    </div>
    <div class="detail-close" @click="closeDetail">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Star from '@/components/star/star'

  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        detailShow: true
      }
    },
    methods: {
      closeDetail () {
        this.detailShow = false
      }
    },
    components: {
      Star
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/mixin.styl"

  .detail {
    position fixed
    left 0
    top 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    background-color rgba(7, 17, 27, .8)
    .detail-wrapper {
      width 100%
      height auto
      min-height 100%
      .detail-main {
        margin-top 64px
        padding-bottom 64px
        .name {
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
        }
      }
    }
    .detail-close {
      position relative
      margin -64px auto 0
      clear both
      width 32px
      height 32px
      font-size 32px
    }
  }
</style>
