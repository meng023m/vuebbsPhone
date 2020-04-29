<template>
  <div>
    <div class="index_top">我们
      <div style="float:right; color: #D7D8DA;font-size: 28px;"><van-icon name="search" /></div>
    </div>
    <van-swipe class="my-swipe" :autoplay="7000" >
      <van-swipe-item>
        <van-image radius='10px' fit="cover" lazy-load src="https://img.yzcdn.cn/vant/apple-1.jpg">
         <template v-slot:error></template>
        </van-image>
      </van-swipe-item>
      <van-swipe-item>
        <van-image radius='10px' fit="cover" lazy-load src="https://img.yzcdn.cn/vant/apple-2.jpg">
         <template v-slot:error></template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <div class="index_list">
      <div class="index_list_bg">
        <div class="index_list_top">
          <div class="index_list_top_headphoto">
            <van-image round  fit="cover" width="40" height="40" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
          </div>
          <div class="index_list_top_name">
            <div>美腻的夏天时尚</div>
            <div class="timestyle" >2019年11月21日  14:00</div>
          </div>
          <div class="index_list_top_btn">
            <van-button plain round  icon="plus" class="attention" size="small" type="primary">关注</van-button>
          </div>
        </div>
        <div class="index_list_middle">
          人发动机更好看风格化的看过来快点发货啦说丁哈萨克隔离霜的口感和拉萨个蛋糕～
          <div class="index_list_middle_img">
            <van-image radius='8px'  width="100" height="100" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg">
             <template v-slot:error></template>
            </van-image>
            <van-image radius='8px' width="100" height="100" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg">
             <template v-slot:error></template>
            </van-image>
            <van-image radius='8px' width="100" height="100" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg">
             <template v-slot:error></template>
            </van-image>
            <van-image radius='8px' width="100" height="100" fit="cover" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg">
             <template v-slot:error></template>
            </van-image>
          </div>
        </div>
        <div class="index_list_bottom">
          <div class="index_list_bottom_item">
            <van-icon name="comment" color=''/> 374
          </div>
          <div class="index_list_bottom_item">
            <van-icon name="like" color=''/> 374
          </div>
          <div class="index_list_bottom_item">
            <van-icon name="good-job" color=''/> 374
          </div>
        </div>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from './tabbar'
export default {
  name: 'index',
  components: {
    tabbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to, from)
    }
  }
}
</script>
<style lang="less">
.timestyle {
  font-size: 13px;
  color: #D7D8DA ;
}
.attention{
  width: 72px;
  height: 25px;
  line-height: 25px;
  background: #ffffff;
  color: #0D0E10;
  border: 1px solid #E6E8EA;
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
    }
  }
}
.my-swipe {
  height: 140px;
  border-radius: 10px;
  .van-swipe__indicators {
    bottom: 0.2rem;
  }
}
.custom-indicator{
  border:blueviolet 1px solid;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 5px;
}
  .van-swipe-item {
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    color: #fff;
    font-size: 20px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
