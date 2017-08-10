<template>
  <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li v-for="(item, index) in seller.supports" class="support-item">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import Star from '@/components/star/star'

  export default {
    props: {
      seller: Object,
      classMap: Array
    },
    data () {
      return {
        detailShow: false
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .detail {
    position fixed
    left 0
    top 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    backdrop-filter blur(10px)
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
        .star-wrapper {
          margin-top 18px
          padding 2px 0
          text-align center
        }
        .title {
          display flex
          width 80%
          margin 28px auto 24px
          .line {
            flex 1
            position relative
            top -6px
            border-bottom 1px solid rgba(255, 255, 255, .2)
          }
          .text {
            padding 0 12px
            font-size 14px
            font-weight 700
          }
        }
        .supports {
          margin 0 auto
          width 80%
          .support-item {
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &:last-child {
              margin-bottom 0
            }
            .icon {
              display inline-block
              margin-right 6px
              width 16px
              height 16px
              vertical-align top
              background-size 16px
              background-repeat no-repeat
              &.decrease {
                bg-img('decrease_2')
              }
              &.discount {
                bg-img('discount_2')
              }
              &.guarantee {
                bg-img('guarantee_2')
              }
              &.invoice {
                bg-img('invoice_2')
              }
              &.special {
                bg-img('special_2')
              }
            }
            .text {
              line-height 16px
              font-size 12px
            }
          }
        }
        .bulletin {
          margin 0 auto
          width 80%
          .content {
            padding 0 12px
            line-height 24px
            font-size 12px
          }
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
