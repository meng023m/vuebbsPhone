<template>
  <div class="hello">
    <div class="index_top">我们
      <div><img src="../assets/logo.png" alt=""></div>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
       <template #indicator>
    <div class="custom-indicator">
    </div>
  </template>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>
.index_top {
  height: 56px;
  line-height: 56px;
  font-size: 32px;
}
.my-swipe {
  border-radius: 20px;
  height: 120px;
}
.custom-indicator{
  border:blueviolet 1px solid;
}
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 120px;
    text-align: center;
    background-color: #39a9ed;
  }
.mm{
  width: 3.11rem;
  height: 1.74rem;
  background: blueviolet;
}
</style>
