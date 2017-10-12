<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score-text">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score-text">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :select-type="selectType"
                     :only-content="onlyContent"
                     :ratings="ratings"
                     @ratingType="ratingType"
                     @toggleCtn="toggleCtn">
      </rating-select>

      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span v-show="rating.deliveryTime" class="delivery">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div v-show="rating.recommend.length" class="recommend">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll'
  /* eslint-disable no-unused-vars */
  import { formatDate, formatDate2 } from '@/common/js/date'
  import Star from '@/components/star/star'
  import RatingSelect from '@/components/ratingselect/ratingselect'
  import Split from '@/components/split/split'

  const ERRNO = 0
  const ALL = 2

  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    created () {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body
        if (res.errno === ERRNO) {
          this.ratings = res.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      // 同步子组件的传值 ratingType / toggleCtn
      ratingType (type) {
        this.selectType = type
        // 要异步的更新scroll的滚动区域
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleCtn (val) {
        this.onlyContent = val
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      // v-show 绑定一个带返回值(true/false)的函数/表达式
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    filters: {
      formatTime (time) {
        let date = new Date(time)
        /** 封装的formatDate formatDate2 都能把时间戳格式化, 不同的是formatDate可以在参数随意调整格式.
         *  时间戳-> 没有时区的限制, 代表唯一的时间.
         *  getDate()获取的是当前时区的小时数.
         * */
        return formatDate(date, 'yyyy-MM-dd hh:mm')
        // return formatDate2(date)
      }
    },
    components: {
      Star,
      RatingSelect,
      Split
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/mixin.styl"

  .ratings {
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview {
      display flex
      padding 18px 0
      .overview-left {
        padding 6px 0
        flex 0 0 137px
        width 137px
        text-align center
        border-right 1px solid rgba(7, 17, 27, .1)
        /* 适配iphone5 */
        @media only screen and (max-width: 320px) {
          flex 0 0 120px
          width 120px
        }
        .score {
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        }
        .title {
          margin-top 6px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        }
        .rank {
          margin-top 8px
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        }
      }
      .overview-right {
        flex 1
        padding 6px 0 6px 24px
        /* 适配iphone5 */
        @media only screen and (max-width: 320px) {
          padding-left 6px
        }
        .score-wrapper {
          margin-bottom 8px
          font-size 0
          .title {
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          }
          .star {
            display inline-block
            vertical-align top
            margin 0 12px
          }
          .score-text {
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(255, 153, 0)
          }
        }
        .delivery-wrapper {
          font-size 0
          .title {
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          }
          .delivery {
            margin-left 12px
            font-size 12px
            color rgb(147, 153, 159)
          }
        }
      }
    }
    .rating-wrapper {
      padding 0 18px
      .rating-item {
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar {
          margin-right 12px
          flex 0 0 28px
          width 28px
          img {
            border-radius 50%
          }
        }
        .content {
          position relative
          flex 1
          .name {
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          }
          .star-wrapper {
            margin-bottom 6px
            font-size 0
            .star {
              margin-right 6px
              display inline-block
              vertical-align top
            }
            .delivery {
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
            }
          }
          .text {
            margin-bottom 8px
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          }
          .recommend {
            line-height 16px
            font-size 0
            .icon-thumb_up, .item {
              margin-right 8px
              margin-bottom 4px
              display inline-block
            }
            .icon-thumb_up {
              font-size 12px
              color rgb(0, 160, 220)
            }
            .item {
              padding 0 6px
              font-size 9px
              color rgb(147, 153, 159)
              border 1px solid rgba(7, 17, 27, .1)
              border-radius 2px
              background-color #fff
            }
          }
          .time {
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          }
        }
      }
    }
  }
</style>
