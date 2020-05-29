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
  created () {
    getUserInfo({username: 'zhanghao'}).then(res => {
      console.log(res)
      sessionStorage.setItem('userInfo', JSON.stringify(res.user))
      this.GET_USERINFO(res.user)
    })
  },
  methods: {
    ...mapActions(['GET_USERINFO'])
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.index_top {
  height: 56px;
  line-height: 56px;
  font-size: 32px;
  margin: 0 15px;
}
.index_list_bg{
  background: #FFFFFF;
  box-shadow: 0 8px 20px 0 rgba(23,25,29,0.05);
  border-radius: 8px;
  padding: 16px;
  font-size: 15px;
  color: #0D0E10;
  .index_list_top {
    display: flex;
    height: 40px;
    .index_list_top_headphoto {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .index_list_top_name {
      flex: 1;
      margin-left: 8px;
      line-height: 24px;
    }
    .index_list_top_btn{
      width: 72px;
      line-height: 40px;
    }
  }
  .index_list_middle {
    padding-top: 17px;
    pre {
      word-break: break-all;
      white-space: pre-wrap;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #0D0E10;
      letter-spacing: -0.1px;
      line-height: 22px;
    }
    .index_list_middle_img {
      margin-top:11px;
    }
  }
  .index_list_bottom {
    margin-top: 20px;
    font-size: 13px;
    color: #D7D8DA;
    height: 14px;
    line-height: 14px;
    .index_list_bottom_item {
      float: left;
      margin-right: 18px;
      img {
        width: 13px;
        margin-right: 5px;
      }
    }
  }
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
