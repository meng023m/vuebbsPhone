<template>
  <div>
    <div class="index_top">我们
      <div style="float:right; color: #D7D8DA;font-size: 28px;" @click="$router.push({path: '/topicList'})"><img class="iconSize" src="../assets/icon/top_topic.png"/></div>
      <div style="float:right; color: #D7D8DA;font-size: 28px; margin-right: 30px"><img class="iconSize" src="../assets/icon/top_search.png"/></div>
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
    <div class="index_list" v-for="(item, index) in articleList" :key='index'>
      <div class="index_list_bg">
        <div class="index_list_top">
          <div class="index_list_top_headphoto">
            <van-image round  fit="cover" width="40" height="40" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
          </div>
          <div class="index_list_top_name">
            <div>{{item.nickname}}</div>
            <div class="timestyle" >{{item.createdTime}}</div>
          </div>
          <div class="index_list_top_btn" v-if='item.userId !== userInfo.id'>
            <van-button v-if='!item.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
            <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
          </div>
        </div>
        <div class="index_list_middle" @click="$router.push({path: '/postDetails', query : { item: JSON.stringify(item)}})">
          <pre v-html='item.content'></pre>
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
            <img src="../assets/icon/pinglun_off.png" /> {{item.commentCount}}
          </div>
          <div class="index_list_bottom_item">
            <img v-if='item.collectFlag' src="../assets/icon/shoucang_on.png" />
            <img v-else src="../assets/icon/shoucang_off.png" />374
          </div>
          <div class="index_list_bottom_item">
            <img v-if='item.likeFlag' src="../assets/icon/dianzan_on.png" />
            <img v-else src="../assets/icon/dianzan_off.png" />
             {{item.praiseCount}}
          </div>
        </div>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from './tabbar'
import * as utile from '../axios/api'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'index',
  components: {
    tabbar
  },
  data () {
    return {
      articleList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    if ('id' in this.userInfo) {
      this.getArticleList()
    } else if (sessionStorage.getItem('userInfo')) {
      this.GET_USERINFO(JSON.parse(sessionStorage.getItem('userInfo')))
      this.getArticleList()
    } else {
      utile.getUserInfo({username: 'zhanghao'}).then(res => {
        sessionStorage.setItem('userInfo', JSON.stringify(res))
        this.GET_USERINFO(res.user)
        this.getArticleList()
      })
    }
  },
  methods: {
    ...mapActions(['GET_USERINFO']),
    getArticleList () {
      let param = {
        userId: this.userInfo.id,
        pageNo: 1,
        pageSize: 10,
        department: this.userInfo.department,
        topicId: '',
        creatorUserId: '',
        content: '',
        noticeId: '',
        likeUserId: '',
        topicType: ''
      }
      utile.getArticleList(param).then(res => {
        console.log(res)
        this.articleList = res.list
      })
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
.attention{
  width: 72px;
  height: 25px;
  line-height: 25px;
  background: #ffffff;
  color: #0D0E10;
  border: 1px solid #E6E8EA;
}
.attentioned{
  width: 72px;
  height: 25px;
  line-height: 25px;
  background: #EFF0F1;
  color: #959595;
}
.iconSize {
  width: 18px;
  height: 18px;
}
.timestyle {
  font-size: 13px;
  color: #D7D8DA ;
}
.my-swipe {
  height: 140px;
  margin: 0 15px;
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
