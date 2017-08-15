<template>
  <div class="cart-control">
    <div v-show="food.count>0" class="cart-decrease">
      <i class="icon-remove_circle_outline"></i>
    </div>
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
        // console.log('clicked')
        if (!this.food.count) {
          console.log(this)
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cart-control {
    font-size 0
    .cart-decrease, .cart-add {
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
    }
    .cart-count {
      display inline-block
    }
  }
</style>
