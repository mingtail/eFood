<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          class="menu-item"
          :class="{'current': currentIndex === index}"
          @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 v-show="food.name" class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥ {{food.price}}</span><span v-show="food.oldPrice"
                                                                 class="old">¥ {{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll'
  import Shopcart from '@/components/shopcart/shopcart'
  import CartControl from '@/components/cartcontrol/cartcontrol'
  import Food from '@/components/food/food'

  const ERR_OK = 0

  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let curHeight = this.listHeight[i]
          let nextHeight = this.listHeight[i + 1]
          if (!nextHeight || (this.scrollY >= curHeight && this.scrollY < nextHeight)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      selectMenu (index) {
        // 解决pc端点击触发两次的问题,如果不是派生的点击事件就return
        // if (!event._constructed) {
        //   return
        // }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood (food) {
        this.selectedFood = food
        this.$refs.food.show()
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        // TODO console.log(this.listHeight)
      }
    },
    components: {
      Shopcart,
      CartControl,
      Food
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/mixin.styl"

  .goods {
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper {
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item {
        display table
        padding 0 12px
        width 56px
        height 54px
        &.current {
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background-color #fff
          .text {
            border-none()
          }
        }
        line-height 14px
        .icon {
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px
          background-repeat no-repeat
          &.decrease {
            bg-img('decrease_3')
          }
          &.discount {
            bg-img('discount_3')
          }
          &.guarantee {
            bg-img('guarantee_3')
          }
          &.invoice {
            bg-img('invoice_3')
          }
          &.special {
            bg-img('special_3')
          }
        }
        .text {
          display table-cell
          width 56px
          vertical-align middle
          text-align center
          font-size 12px
          border-1px(rgba(7, 17, 27, .1))
        }
      }
    }
    .foods-wrapper {
      flex 1
      .title {
        padding-left 14px
        height 26px
        line-height 26px
        font-size 12px
        color rgb(147, 153, 159)
        background-color #f3f5f7
        border-left 2px solid #d9dde1
      }
      .food-item {
        display flex
        margin 18px 18px 0
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child {
          border-none()
        }
        .icon {
          flex 0 0 57px
          margin-right 10px
        }
        .content {
          flex 1
          .name {
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          }
          .desc, .extra {
            font-size 10px
            color rgb(147, 153, 159)
          }
          .desc {
            margin-bottom 8px
            line-height 12px
          }
          .extra {
            line-height 10px
            .count {
              margin-right 12px
            }
          }
          .price {
            font-weight 700
            line-height 24px
            .now {
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            }
            .old {
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
            }
          }
          .cart-control-wrapper {
            position absolute
            right 0
            bottom 12px
          }
        }
      }
    }
  }
</style>
