<template>
  <div class="food" v-show="showFlag">

  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      food: Object
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .food {
    position: fixed
    left 0
    top 0
    bottom 48px
    width 100%
    z-index 30
    background-color #fff
  }
</style>
