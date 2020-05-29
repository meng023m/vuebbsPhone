<template>
  <div>
    <div class="index_top">发帖
      <div style="float:right; color: #00A3EE; font-size: 18px;" @click="add">发布</div>
      <div style="float:right; color: #D7D8DA; margin-right: 38px; font-size: 18px;" @click="back">取消</div>
    </div>
    <div class="inputbg">
      <div ref='inputDiv' @click="getBuller" @input='inputChange($event)' class="addinput" contenteditable="true" data-type="input" placeholder="Hi,随便聊聊啊." ></div>
      <!-- <van-field class="addinput" v-model="message" @input='inputChange($event)'  rows="12" type="textarea" maxlength="500" placeholder="请输入帖子内容" show-word-limit/> -->
      <!-- <div class="addcount">{{inputCountMumber}}</div> -->
    </div>
    <div class="addbtnShow">
      <van-button round plain icon="smile" class="addbtn" size='small' type="info" @click="biaoqingchangeShow">表情</van-button>
      <van-button round plain icon="photograph" class="addbtn" size='small' type="info" @click="imgchangeShow"  badge="9">照片</van-button>
      <van-button round plain icon="live" class="addbtn" size='small' type="info" @click="shipinchangeShow" >视频</van-button>
      <van-button round plain icon="comment" class="addbtn" size='small' type="info" @click="huatiShow = true" >话题</van-button>
    </div>
    <div v-if="biaoqingShow">
     <div  class="faceIcon"  v-for="(item, index) in faceIcontArr " :key="index">
      <span @click="faceIconSelect(item)"><img :src='item.url'></span>
    </div>
    </div>
    <div v-if="imgShow">
      <div class="font14">请上传图片，最多9张</div>
      <van-uploader v-model="imgList" multiple  :max-count="9" />
    </div>
    <div v-if="shipinShow">
      <div class="font14">请上传视频文件</div>
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
      aiteShow: false,
      biaoqingShow: false,
      faceIcontArr: [],
      faceList: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
      sel: Object,
      range: Object,
      inputCountMumber: 0,
      userList: {},
      userListArr: {},
      FirstPin: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
    }
  },
  mounted () {
    let pinyin = require('js-pinyin')
    pinyin.setOptions({checkPolyphone: false, charCase: 0})
    this.faceIcontArr = this.faceList.map((item, index) => {
      return {
        tag: item,
        url: `https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif`
      }
    })
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
      this.$refs.inputDiv.innerHTML += `<span id="${userItem.id}" style="color: blue" contenteditable="false">@${userItem.nickname}</span>&nbsp;`
      // this.message += userItem.nickname + ' '
      this.aiteShow = false
    },
    // vant中input框
    // inputChange (value) {
    //   value.charAt(value.length - 1)
    //   if (value.charAt(value.length - 1) === '@') {
    //     this.aiteShow = true
    //   }
    //   console.log()
    // },
    inputChange (value) {
      this.getBuller()
      if (value.data === '@') {
        this.aiteShow = true
        let string = this.$refs.inputDiv.innerHTML
        this.$refs.inputDiv.innerHTML = string.substr(0, string.length - 1)
      }
    },
    onChange (picker, value, index) {
      let inner = this.$refs.inputDiv.innerHTML
      if (inner.indexOf('topicid') >= 0) {
        // this.message = this.message.replace(/(?<=#).*?(?=#)/g, '').replace(/#/g, '')
        this.huatiShow = false
        return this.$toast('只能选择一个话题')
      }
      this.$refs.inputDiv.innerHTML = `<span topicid='${this.AllTopicList[index].id}' style="color:blue" contenteditable="false"> ${value} </span>&nbsp;<br/>` + inner
      this.huatiShow = false
      this.getBuller()
    },
    getBuller () {
      if (window.getSelection) {
        // if (this.firstFlag) {
        //   if (window.getSelection().getRangeAt(0).startContainer.parentNode.className !== 'mydiv_textinput' && window.getSelection().getRangeAt(0).startContainer.parentNode.className !== 'block') {
        //     // return
        //   }
        // }
        this.sel = window.getSelection()
        this.range = this.sel.getRangeAt(0)
        this.inputCountMumber = this.range.startContainer.ownerDocument.activeElement.innerText.length
        // if (this.inputCountMumber < 500) {
        //   this.lastNode = this.range.startContainer.ownerDocument.activeElement.innerHTML
        // } else {
        //   this.range.startContainer.ownerDocument.activeElement.innerHTML = this.lastNode
        //   this.$message.error('发帖文字不得超过500字')
        // }
        // const result = this.range.getBoundingClientRect()
        // this.lastResult = (result.top && result.left) ? result : this.lastResult
        // var obj = this.$refs.emoji
        // const bg = obj.getBoundingClientRect()
        // this.postions = {
        //   'top': this.lastResult.top - bg.top + 'px',
        //   'left': this.lastResult.left - bg.left + 10 + 'px'
        // }
        // this.firstFlag = 1
      }
    },
    faceIconSelect (item) {
      if (window.getSelection) {
        if (this.sel.getRangeAt && this.sel.rangeCount) {
          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          var el = document.createElement('div')
          el.innerText = `[${item.tag}]`
          var frag = document.createDocumentFragment()
          var node
          var lastNode
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node)
          }
          this.range.insertNode(frag)
          // Preserve the selection
          if (lastNode) {
            this.range = this.range.cloneRange()
            this.range.setStartAfter(lastNode)
            this.range.collapse(true)
            this.sel.removeAllRanges()
            this.sel.addRange(this.range)
          }
        }
      } else if (document.selection && document.selection.type !== 'mydiv_textinput') {
        // IE < 9
        document.selection.createRange().pasteHTML(item.tag)
      }
      this.biaoqingShow = false
      // this.inputCountMumber = this.isIE ? this.range.endContainer.className === 'mydiv_textinput' ? this.range.endContainer.innerText.length : this.range.endContainer.parentNode.className === 'mydiv_textinput' ? this.range.endContainer.parentNode.innerText.length : this.range.endContainer.parentNode.parentNode.innerText.length : this.range.startContainer.ownerDocument.activeElement.innerText.length
      // if (this.inputCountMumber < 500) {
      //   this.lastNode = this.range.startContainer.ownerDocument.activeElement.innerHTML
      // } else {
      //   this.range.startContainer.ownerDocument.activeElement.innerHTML = this.lastNode
      //   this.$message.error('发帖文字不得超过500字')
      // }
    },
    biaoqingchangeShow () {
      this.biaoqingShow = !this.biaoqingShow
    },
    imgchangeShow () {
      if (this.videoList.length !== 0) {
        this.$dialog.confirm({
          message: '确定删除上传的视频文件吗?'
        }).then(() => {
          this.videoList = []
          this.imgShow = true
          this.shipinShow = false
        })
      } else {
        this.imgShow = !this.imgShow
        this.shipinShow = false
      }
    },
    shipinchangeShow () {
      if (this.imgList.length !== 0) {
        this.$dialog.confirm({
          message: '确定删除上传的图片吗?'
        }).then(() => {
          this.videoList = []
          this.shipinShow = true
          this.imgShow = false
        })
      } else {
        this.shipinShow = !this.shipinShow
        this.imgShow = false
      }
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
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
.faceIcon{
  user-select: none;
  cursor: pointer;
  width: 25px;
  height: 25px;
  text-align: center;
  float: left;
}
.font14 {
  font-size: 14px;
  color: #A9A9A9;
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
