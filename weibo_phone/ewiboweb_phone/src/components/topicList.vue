<template>
  <div>
    <van-nav-bar title="话题" left-arrow placeholder fixed @click-left="onClickLeft"/>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item  name="1">
        <template #title>
          <div class="titleHeight"> <img class="topicIcon" src="../assets/icon/topic_1.png"/>全部</div>
        </template>
        <div class="topiclistbg">
          <div class="topiclistbg_item" v-for="(item, index) in AllTopicList" :key="index">
            <div class="toplistbg_item_left">{{item.topics}}</div>
            <div class="toplistbg_item_right">
              <van-button v-if='!item.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
              <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
            </div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="2">
        <template #title>
          <div class="titleHeight"> <img class="topicIcon" src="../assets/icon/topic_2.png"/>产品讨论</div>
        </template>
        <div class="topiclistbg">
          <div class="topiclistbg_item" v-for="(item, index) in AllTopicList" :key="index">
            <div class="toplistbg_item_left">{{item.topics}}</div>
            <div class="toplistbg_item_right">
              <van-button v-if='!item.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
              <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
            </div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="3">
        <template #title>
          <div class="titleHeight"> <img class="topicIcon" src="../assets/icon/topic_3.png"/>痛点吐糟</div>
        </template>
        <div class="topiclistbg">
          <div class="topiclistbg_item" v-for="(item, index) in AllTopicList" :key="index">
            <div class="toplistbg_item_left">{{item.topics}}</div>
            <div class="toplistbg_item_right">
              <van-button v-if='!item.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
              <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
            </div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="4">
        <template #title>
          <div class="titleHeight"> <img class="topicIcon" src="../assets/icon/topic_4.png"/>兴趣社团</div>
        </template>
        <div class="topiclistbg">
          <div class="topiclistbg_item" v-for="(item, index) in AllTopicList" :key="index">
            <div class="toplistbg_item_left">{{item.topics}}</div>
            <div class="toplistbg_item_right">
              <van-button v-if='!item.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
              <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
            </div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="5">
        <template #title>
          <div class="titleHeight"> <img class="topicIcon" src="../assets/icon/topic_5.png"/>生活杂感</div>
        </template>
        <div class="topiclistbg">
          <div class="topiclistbg_item" v-for="(item, index) in AllTopicList" :key="index">
            <div class="toplistbg_item_left">{{item.topics}}</div>
            <div class="toplistbg_item_right">
              <van-button v-if='!item.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
              <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
            </div>
          </div>
        </div>
      </van-collapse-item>
      <van-collapse-item name="6">
        <template #title>
          <div class="titleHeight"> <img class="topicIcon" src="../assets/icon/topic_6.png"/>求助帮</div>
        </template>
        <div class="topiclistbg">
          <div class="topiclistbg_item" v-for="(item, index) in AllTopicList" :key="index">
            <div class="toplistbg_item_left">{{item.topics}}</div>
            <div class="toplistbg_item_right">
              <van-button v-if='!item.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
              <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
            </div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import * as utile from '../axios/api'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'topicList',
  data () {
    return {
      message: '',
      AllTopicList: [],
      activeName: '1'
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    if ('id' in this.userInfo) {
      console.log(this.userInfo.id)
    } else if (sessionStorage.getItem('userInfo')) {
      this.GET_USERINFO(JSON.parse(sessionStorage.getItem('userInfo')))
      console.log(this.userInfo.id)
    } else {
      utile.getUserInfo({username: 'zhanghao'}).then(res => {
        sessionStorage.setItem('userInfo', JSON.stringify(res))
        this.GET_USERINFO(res.user)
      })
    }
    utile.getAllTopicList({
      userId: this.userInfo.id,
      pageNo: 1,
      pageSize: 10
    }).then(res => {
      console.log(res)
      this.AllTopicList = res.listAll
    })
  },
  methods: {
    ...mapActions(['GET_USERINFO']),
    onClickLeft () {
      this.$router.go(-1)
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
.van-collapse-item__content{
  background: #F6F6F6;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.topiclistbg {
  background: #F6F6F6;
  overflow: hidden;
  .topiclistbg_item {
    line-height: 40px;
    clear: both;
    .toplistbg_item_left {
      float: left;
    }
    .toplistbg_item_right{
      float: right;
    }
  }
}
.titleHeight {
  line-height: 30px
}
.topicIcon{
  width: 16px;
  height: 16px;
  margin: 2px 27px 0 0;
}

</style>
