<template>
  <div>
    <div class="index_top">发帖
      <div style="float:right; color: #00A3EE; font-size: 18px;" @click="add">确定</div>
      <div style="float:right; color: #D7D8DA; margin-right: 38px; font-size: 18px;" @click="back">取消</div>
    </div>
    <div>
      <div ref='inputDiv' @input='inputChange($event)' class="addinput" contenteditable="true" data-type="input" placeholder="Hi,随便聊聊啊." ></div>
      <!-- <van-field class="addinput" v-model="message" @input='inputChange($event)'  rows="12" type="textarea" maxlength="500" placeholder="请输入帖子内容" show-word-limit/> -->
    </div>
    <div class="addbtnShow">
      <van-button round plain icon="photograph" class="addbtn" size='small' type="info" @click="imgchangeShow"  badge="9">照片</van-button>
      <van-button round plain icon="live" class="addbtn" size='small' type="info" @click="shipinchangeShow" >视频</van-button>
      <van-button round plain icon="comment" class="addbtn" size='small' type="info" @click="huatiShow = true" >话题</van-button>
    </div>
    <div v-if="imgShow">
      <van-uploader v-model="imgList" multiple  :max-count="9" />
    </div>
    <div v-if="shipinShow">
      <van-uploader v-model="videoList"  :after-read="afterRead" :max-count="1" accept="video/*" />
    </div>
    <van-popup v-model="huatiShow" position="bottom" :style="{ height: '30%' }">
      <van-picker :columns="TopicListArr" @change="onChange" />
    </van-popup>
    <van-popup v-model="aiteShow" position="right" :style="{ width: '100%', height: '100%' }">
      <van-index-bar :sticky="false">
          <van-index-anchor v-for="(userItem, userIndex) in userListArr" :key="userIndex" :index="userIndex">
            <span>{{userIndex}}</span>
            <van-cell @click="chooseName(citem)" v-for="(citem, cindex) in userItem" :key="cindex" :title="citem.nickname"/>
          </van-index-anchor>
      </van-index-bar>
    </van-popup>
  </div>
</template>

<script>
import * as utile from '../axios/api'
export default {
  name: 'addContent',
  data () {
    return {
      message: '',
      imgList: [],
      imgShow: false,
      shipinShow: false,
      videoList: [],
      huatiShow: false,
      AllTopicList: {},
      TopicListArr: [],
      Topic: '',
      aiteShow: false,
      userList: {},
      userListArr: {},
      FirstPin: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
    }
  },
  mounted () {
    let pinyin = require('js-pinyin')
    pinyin.setOptions({checkPolyphone: false, charCase: 0})
    utile.getAllTopicList({
      userId: 9608,
      pageNo: 1,
      pageSize: 10
    }).then(res => {
      this.AllTopicList = res.listAll
      res.listAll.forEach(element => {
        this.TopicListArr.push(element.topics)
      })
    })
    utile.getUserList({content: ''}).then(res => {
      this.userList = res.list
      var firstName = {}
      this.FirstPin.forEach((item) => {
        firstName[item] = []
        res.list.forEach((el) => {
          let nickname = el.nickname
          let first = pinyin.getFullChars(nickname).substring(0, 1)
          if (first.toUpperCase() === item) {
            firstName[item].push(el)
          }
        })
      })
      this.userListArr = JSON.parse(JSON.stringify(firstName))
    })
  },
  methods: {
    chooseName (userItem) {
      console.log(this.$refs.inputDiv)
      this.$refs.inputDiv.innerHTML +=  `<span id="${userItem.id}" style="color: blue" contenteditable="false">@${userItem.nickname}</span>&nbsp;`
      // this.message += userItem.nickname + ' '
      this.aiteShow = false
    },
    // inputChange (value) {
    //   value.charAt(value.length - 1)
    //   if (value.charAt(value.length - 1) === '@') {
    //     this.aiteShow = true
    //   }
    //   console.log()
    // },
    inputChange (value) {
      if (value.data === '@') {
        this.aiteShow = true
        let string = this.$refs.inputDiv.innerHTML
        this.$refs.inputDiv.innerHTML = string.substr(0, string.length - 1)
      }
      // value.charAt(value.length - 1)
      // if (value.charAt(value.length - 1) === '@') {
      //   this.aiteShow = true
      // }
      console.log(value)
    },
    onChange (picker, value, index) {
      if (this.Topic) {
        this.message = this.message.replace(/(?<=#).*?(?=#)/g, '').replace(/#/g, '')
      }
      this.message = value + ' ' + this.message
      this.Topic = this.AllTopicList[index].id
      this.huatiShow = false
    },
    imgchangeShow () {
      this.imgShow = !this.imgShow
    },
    shipinchangeShow () {
      this.shipinShow = !this.shipinShow
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      if (file.file.type.indexOf('video') === -1) {
        this.$toast('请上传视频文件')
        this.videoList = []
        return false
      }
    },
    back () {
      this.$router.go(-1)
    },
    add () {
      // this.$router.push({path: '/index'})
      console.log(this.message)
      alert(this.message)
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to, from)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.addbtnShow {
  font-size: 13px;
  margin: 20px 0;
  .addbtn {
    border-color: #E6E8EA;
    color: #0D0E10;
    width: 80px;
    height: 36px;
  }
}
*[contenteditable="true"]:empty:before{
    content:attr(placeholder);
    color: #A9A9A9;
  }
.addinput {
  background: #F6F6F6;
  border-radius: 8px;
  padding: 16px 10px;
  font-size: 17px;
  width: 324px;
  height: 306px;
  overflow-y: auto;
  border: none;
}
</style>
