<template>
  <div class="rating-select">
    <div class="rating-type border-1px">
      <span @click="select(2)" class="block positive" :class="{active:selectType===2}">{{desc.all}}<span
        class="count">47</span></span>
      <span @click="select(0)" class="block positive" :class="{active:selectType===0}">{{desc.positive}}<span
        class="count">40</span></span>
      <span @click="select(1)" class="block negative" :class="{active:selectType===1}">{{desc.negative}}<span
        class="count">7</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{on:onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/javascript">
  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        defaule: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
    },
    methods: {
      select (type) {
//        if (!event._constructed) {
//          return
//        }
        this.selectType = type
        // this.$emit('ratingType', type)
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        // this.$emit('toggleCtn', this.onlyContent)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/mixin.styl"

  .rating-select {
    .rating-type {
      margin 0 18px
      padding 18px 0
      font-size 0
      border-1px(rgba(7, 17, 27, .1))
      .block {
        display inline-block
        margin-right 8px
        padding 8px 12px
        line-height 16px
        font-size 12px
        border-radius 1px
        color rgb(77, 85, 93)
        &.active {
          color #fff
        }
        .count {
          margin-left 2px
          font-size 8px
        }
        &.positive {
          background-color rgba(0, 160, 220, .2)
          &.active {
            background-color rgb(0, 160, 220)
          }
        }
        &.negative {
          background-color rgba(77, 85, 93, .2)
          &.active {
            background-color rgb(77, 85, 93)
          }
        }
      }
    }
    .switch {
      padding 12px 18px
      line-height 24px
      font-size 0
      color rgb(147, 153, 159)
      border-bottom rgba(7, 17, 27, .1)
      &.on {
        .icon-check_circle {
          color #00c850
        }
      }
      .icon-check_circle {
        display inline-block
        vertical-align top
        font-size 24px
      }
      .text {
        display inline-block
        margin-left 4px
        font-size 12px
      }
    }
  }
</style>
