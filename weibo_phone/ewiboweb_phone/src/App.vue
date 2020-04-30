<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { getUserInfo } from './axios/api'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    getUserInfo({username: 'zhanghao'}).then(res => {
      console.log(res)
      sessionStorage.setItem('userInfo', JSON.stringify(res))
      this.GET_USERINFO(res.user)
    })
  },
  methods: {
    ...mapActions(['GET_USERINFO']),
    bottm (event) {
      console.log(event)
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 15px;
}
.index_top {
  height: 56px;
  line-height: 56px;
  font-size: 32px;
}
// @vm_design: 750;
// // 为什么设置 100? 设置成便于计算, 计算rem时只需要将 设计稿的宽度 / 100 即可
// // 如果给的是 375 的标注图, 那就设置成 50 即可
// @vm_fontsize: 100;
// html {
//     --tabbar-height: 100px;
//     --body-width: 7.5rem;
//     font-size: @vm_fontsize / @vm_design * 100vw;
//     // 同时，通过Media Queries 限制根元素最大最小值
//     @media screen and (max-width: 320PX) {
//         font-size: 320PX / @vm_design * @vm_fontsize;
//     }
//     @media screen and (min-width: 540PX) {
//         --body-width: 540PX;
//         font-size: 540PX / @vm_design * @vm_fontsize;
//     }
// }
// body {
//     max-width: 540PX;
//     min-width: 320PX;
//     min-height: 100vh;
//     font-size: .8rem;
//     margin: 0 auto !important;
//     color: #000;
// }
</style>
