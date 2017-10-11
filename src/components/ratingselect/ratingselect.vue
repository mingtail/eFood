<template>
  <div class="rating-select">
    <div class="rating-type border-1px">
      <span @click="select(2)" class="block positive" :class="{active:selectType===2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{active:selectType===0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{active:selectType===1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{on:onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/javascript">
  const POSITIVE = 0
  const NEGATIVE = 1
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
    data () {
      return {
        myType: this.selectType,
        showCtn: this.onlyContent
      }
    },
    watch: {
      /**
       *  Vue2.0 实现props双向数据绑定
       *  1. 创建一个selectType的副本数据 => myType
       *  2. watch监听props属性的selectType的变更,同步到组件内部data属性myType中
       *  3. 组件内的myType变更后向外部发送事件通知(传入组件内部变更后的值)
       *  4. 外部组件接受派发的事件,接收传入的变更后的值
       * */
      selectType: function (type) {
        this.myType = type
      },
      myType: function (type) {
        this.$emit('ratingType', type)
      },
      onlyContent: function (val) {
        this.showCtn = val
      },
      showCtn: function (val) {
        this.$emit('toggleCtn', val)
      }
    },
    computed: {
      // 评价数组过滤, 得到好评和差评的长度
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      // 子组件中, 不能直接修改父组件的数据=>修改副本值, 然后通过事件派发出去
      select (type) {
//        if (!event._constructed) {
//          return
//        }
        this.myType = type
      },
      toggleContent () {
        this.showCtn = !this.showCtn
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
