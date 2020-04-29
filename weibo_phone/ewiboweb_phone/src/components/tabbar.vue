<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item badge="3"  to="/index">
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search">问答</van-tabbar-item>
    <van-tabbar-item to='/addContent' icon="add-o">发帖</van-tabbar-item>
    <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
    <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
      active: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      }
    }
  }
}
</script>
