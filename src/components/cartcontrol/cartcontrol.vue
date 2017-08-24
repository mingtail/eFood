<template>
  <div class="cart-control">
    <transition name="move">
      <div v-show="food.count>0" class="cart-decrease" @click="decreaseFood">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-add" @click="addFood">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      food: Object
    },
    methods: {
      addFood () {
//        if (!ev._constructed) {
//          return
//        }
        console.log(111)
        if (!this.food.count) {
          console.log(this)
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseFood () {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .move-enter-active, .move-leave-active {
    transition all .4s linear
    .inner {
      transform rotate(0)
    }
  }
  .move-enter, .move-leave-to {
    transform translate3D(48px, 0, 0)
    opacity 0
    .inner {
      transform rotate(180deg)
    }
  }

  .cart-control {
    font-size 0
    .cart-decrease {
      display inline-block
      padding 6px
      .inner {
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
        transition all .4s linear
      }

    }
    .cart-count {
      display inline-block
      padding-top 6px
      vertical-align top
      width 12px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    }
    .cart-add {
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
    }
  }
</style>
