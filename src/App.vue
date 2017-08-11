<template>
  <div id="app">
    <m-header :seller="seller"></m-header>
    <tab></tab>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import MHeader from '@/components/header/m-header'
  import Tab from '@/components/tab/tab'

  const ERR_OK = 0

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
          // console.log(this.seller)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style>

</style>
