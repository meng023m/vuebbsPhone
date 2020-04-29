<template>
  <div>
    <div class="index_top">发帖
      <div style="float:right; color: #00A3EE; font-size: 18px;" @click="add">确定</div>
      <div style="float:right; color: #D7D8DA; margin-right: 38px; font-size: 18px;" @click="back">取消</div>
    </div>
    <div>
      <van-field class="addinput" v-model="message"  rows="12" type="textarea" maxlength="500" placeholder="请输入留言" show-word-limit/>
    </div>
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'addContent',
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    // console.log(this.$route)
  },
  methods: {
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
<style scoped>
.addinput {
  background: #F6F6F6;
border-radius: 8px;
width: 344px;
height: 338px;
}
</style>
