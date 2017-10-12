<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/javascript">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: Number,  // 单个类型
      score: Number
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/mixin.styl"

  .star {
    font-size 0
    .star-item {
      display inline-block
      background-repeat no-repeat
    }
    &.star-48 {
      .star-item {
        margin-right 22px
        width 20px
        height 20px
        background-size 20px
        &:last-child {
          margin-right 0
        }
        &.on {
          bg-img('star48_on')
        }
        &.half {
          bg-img('star48_half')
        }
        &.off {
          bg-img('star48_off')
        }
      }
    }
    &.star-36 {
      .star-item {
        margin-right 6px
        width 15px
        height 15px
        background-size 15px
        &:last-child {
          margin-right 0
        }
        &.on {
          bg-img('star36_on')
        }
        &.half {
          bg-img('star36_half')
        }
        &.off {
          bg-img('star36_off')
        }
      }
    }
    &.star-24 {
      .star-item {
        margin-right 3px
        width 10px
        height 10px
        background-size 10px
        &:last-child {
          margin-right 0
        }
        &.on {
          bg-img('star24_on')
        }
        &.half {
          bg-img('star24_half')
        }
        &.off {
          bg-img('star24_off')
        }
      }
    }
  }
</style>
