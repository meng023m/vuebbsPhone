<template>
  <div>
    <van-nav-bar title="帖子详情" left-arrow placeholder fixed @click-left="onClickLeft"/>
    <div class="index_list">
      <div class="index_list_bg">
        <div class="index_list_top">
          <div class="index_list_top_headphoto">
            <van-image round  fit="cover" width="40" height="40" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
          </div>
          <div class="index_list_top_name">
            <div>{{postDetail.nickname}}</div>
            <div class="timestyle" >{{postDetail.createdTime}}</div>
          </div>
          <div class="index_list_top_btn" v-if='postDetail.userId !== userInfo.id'>
            <van-button v-if='!postDetail.atttentionFlag' plain round  icon="plus" class="attention" size="small" type="default">关注</van-button>
            <van-button v-else plain round class="attentioned" size="small" type="default">已关注</van-button>
          </div>
        </div>
        <div class="index_list_middle">
          <pre v-html='postDetail.content'></pre>
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
            <img src="../assets/icon/pinglun_off.png" /> {{postDetail.commentCount}}
          </div>
          <div class="index_list_bottom_item">
            <img v-if='postDetail.collectFlag' src="../assets/icon/shoucang_on.png" />
            <img v-else src="../assets/icon/shoucang_off.png" />374
          </div>
          <div class="index_list_bottom_item">
            <img v-if='postDetail.likeFlag' src="../assets/icon/dianzan_on.png" />
            <img v-else src="../assets/icon/dianzan_off.png" />
             {{postDetail.praiseCount}}
          </div>
          <div class="index_list_bottom_item" style="float:right">
            <img src="../assets/icon/jubao_off.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="detail_commbg" v-for='(repitem,repindex) in postDetail.reply' :key='repindex'>
      <div class="detail_commbg_left">
        <van-image round fit="cover" width="40" height="40" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
        <div class="line"></div>
      </div>
      <div class="detail_commbg_right">
        <div class="right_name">
           <div class="right_name_username left">{{repitem.replynickname}}</div>
           <div class="right_name_time right">{{repitem.createdTime|fomatTime}}</div>
        </div>
        <pre v-html="repitem.commentContent"></pre>
        <div>
          <div class="right_bottom_item left">
            <img src="../assets/icon/dianzan_off.png" />赞
          </div>
          <div class="right_bottom_item left">
            <img src="../assets/icon/huifu.png" />回复
          </div>
        </div>
          <div class="detail_commbg" style='margin-right:0; margin-left:0' v-for="(replyToItem, replyToIndex) in repitem.replyTo.slice(0,replyToShowAll ? undefined : 1)" :key='replyToIndex'>
            <div class="detail_commbg_left">
              <van-image round fit="cover" width="40" height="40" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
              <div class="line" style="background:none"></div>
            </div>
            <div class="detail_commbg_right">
              <div class="right_name">
                 <div class="right_name_username left">{{replyToItem.replynickname}}</div>
                 <div class="right_name_time right">{{replyToItem.createdTime | fomatTime}}</div>
              </div>
              <pre v-html="replyToItem.commentContent"></pre>
              <div>
                <div class="right_bottom_item left">
                  <img src="../assets/icon/dianzan_off.png" />赞
                </div>
                <div class="right_bottom_item left">
                  <img src="../assets/icon/huifu.png" />回复
                </div>
              </div>
            </div>
          </div>
        <div v-if='repitem.replyTo.length >= 2 && !replyToShowAll' @click="replyToShowAll = true" class="right_more">共{{repitem.replyTo.length}}条回复 ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utile from '../axios/api'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'postDetails',
  data () {
    return {
      postDetail: {},
      replyTo: [],
      replyToShowAll: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    console.log(this.$route)
    this.postDetail = JSON.parse(this.$route.query.item)
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
    this.getReplyList()
  },
  methods: {
    ...mapActions(['GET_USERINFO']),
    replyToShow () {

    },
    onClickLeft () {
      this.$router.go(-1)
    },
    getReplyList () {
      let param = {
        wbId: this.postDetail.id,
        pageNo: 1,
        pageSize: 100
      }
      utile.getReplyList(param).then(res => {
        console.log(res)
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
.van-collapse-item__content{
  background: #F6F6F6;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.detail_commbg{
  margin: 20px 15px 0 15px;
  overflow: hidden;
  height: 100%;
  display: flex;
  .detail_commbg_left, .detail_commbg_right{
    float: left;
    height: auto;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
}
.detail_commbg_left {
  justify-content: center;
  align-items: stretch;
  width: 40px;
  .line {
    width: 1px;
    height: auto;
    margin-top:13px;
    background: #E6E8EA;
    flex: auto;
    align-self: center;
  }
}
.detail_commbg_right {
  line-height: 22px;
  flex: 1;
  justify-content: flex-start;
  margin-left: 8px;
  font-size: 15px;
    color: #0D0E10;
  .right_name_username{
    font-size: 15px;
    color: #0D0E10;
  }
  .right_name_time{
    font-size: 13px;
    color:#8F8F8F;
  }
  .right_bottom_item {
    color: #D7D8DA;
    font-size: 13px;
    margin: 6px 26px 0 0;
    img {
      height: 14px;
      margin-right: 5px;
    }
  }
  .right_more{
    font-size: 14px;
    color: #00A3EE;
    letter-spacing: -0.19px;
    line-height: 20px;
  }
}
</style>
