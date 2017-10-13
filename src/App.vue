<template>
  <div id="app">
    <m-header :seller="seller"></m-header>
    <tab></tab>
    <!-- 切换路由时, 不用每次都去请求数据, 也更好的保存了之前选的食物 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {urlParse} from '@/common/js/util'
  import MHeader from '@/components/header/m-header'
  import Tab from '@/components/tab/tab'

  const ERR_OK = 0

  export default {
    name: 'app',
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
        res = res.body
        // console.log(res) // res.body是获取它的data值
        if (res.errno === ERR_OK) {
          // this.seller = res.data
          /**
           * 下面是扩展seller的属性,添加id
           * Object.assign相当于extend 扩展了seller的属性
           */
          this.seller = Object.assign({}, this.seller, res.data)
          // console.log(this.seller.id)
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
