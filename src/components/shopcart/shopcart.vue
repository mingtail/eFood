<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">¥ {{totalPrice}}</div>
        <div class="desc">另需配送费 ¥ {{deliveryPrice}} 元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <div class="title">购物车</div>
        <div class="empty">清空</div>
      </div>
      <ul>
        <li class="food" v-for="food in selectFoods">
          <span class="name">{{food.name}}</span>
          <div class="price">
            <span>¥ {{food.price * food.count}}</span>
          </div>
          <div class="cart-control-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import CartControl from '@/components/cartcontrol/cartcontrol'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 10,
              count: 2
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        listShow: true
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥ ${this.minPrice} 起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差¥ ${this.minPrice - this.totalPrice} 元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/mixin.styl"

  .shopcart {
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content {
      display flex
      height 100%
      font-size 0
      color rgba(255, 255, 255, .4)
      background-color #141d27
      .content-left {
        flex 1
        .logo-wrapper {
          display inline-block
          box-sizing border-box
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          border-radius 50%
          background-color #141d27
          .logo {
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background-color #2b343c
            &.highlight {
              background-color rgb(0, 160, 220)
            }
            .icon-shopping_cart {
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight {
                color #fff
              }
            }
          }
          .num {
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700px
            color #fff
            background-color rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
          }
        }
        .price {
          display inline-block
          box-sizing border-box
          margin-top 12px
          padding-right 12px
          vertical-align top
          line-height 24px
          font-size 16px
          font-weight 700
          border-right 1px solid rgba(255, 255, 255, .1)
          &.highlight {
            color #fff
          }
        }
        .desc {
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
        }
      }
      .content-right {
        flex 0 0 105px
        width 105px
        .pay {
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          background-color #2b333b
          &.not-enough {
            background-color #2b333b
          }
          &.enough {
            background-color #00b43c
            color #fff
          }
        }
      }
    }
  }
</style>
