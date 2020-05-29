// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex'
import router from './router'
// import Vant from 'vant'
// import 'vant/lib/index.css'
import { Button, Swipe, SwipeItem, Lazyload, Image as VanImage, Collapse, CollapseItem, NavBar, Icon, Tabbar, TabbarItem, Dialog, Cell, Field, Uploader, PullRefresh, Toast, Popup, Picker, IndexBar, IndexAnchor } from 'vant'
import 'amfe-flexible/index.js'
import pinyin from 'js-pinyin'
import './assets/resect.css'
Vue.config.productionTip = false
Vue.use(pinyin)
// Vue.use(Vant)

Vue.use(Button).use(Swipe).use(Cell).use(Dialog).use(NavBar).use(Collapse).use(CollapseItem)
Vue.use(SwipeItem).use(VanImage).use(Icon).use(Tabbar).use(TabbarItem).use(Uploader).use(Field).use(PullRefresh)
Vue.use(Toast).use(Popup).use(Picker).use(IndexBar).use(IndexAnchor)
Vue.use(Lazyload, {
  lazyComponent: true
})
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// designSize:设计图尺寸(传@1x倍图尺寸,例如设计图是750px,2倍图,那么传375),rootValue:比例,默认100
// function sethtml (designSize, rootValue = 100) {
//   let rootV = 100
//   if (rootValue) {
//     rootV = rootValue
//   }
//   // 窗口宽度
//   const winWidth = window.document.documentElement.clientWidth
//   // 如果窗口宽度超过1.5倍设计图了,则不再调整
//   if (winWidth > 1.5 * designSize) { return }
//   // window.console.log(winWidth);
//   const htmlFontSize = winWidth * rootV / designSize
//   window.document.documentElement.style.fontSize = htmlFontSize + 'px'
// }
// sethtml(375)
Vue.filter('fomatTime', function (valueTime) {
  if (valueTime) {
    valueTime = new Date(valueTime)
    let newData = Date.parse(new Date())
    let diffTime = Math.abs(newData - valueTime)
    // if (diffTime > 7 * 24 * 3600 * 1000) {
    if (diffTime) {
      let date = new Date(valueTime)
      // let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      // eslint-disable-next-line no-unused-vars
      var second = date.getSeconds()
      minute = minute < 10 ? ('1' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return m + '-' + d + ' ' + h + ':' + minute
    } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
      // //注释("一周之内");
      // let time = newData - diffTime;
      let dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000))
      return dayNum + '天前'
    } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
      // //注释("一天之内");
      // let time = newData - diffTime;
      let dayNum = Math.floor(diffTime / (60 * 60 * 1000))
      return dayNum + '小时前'
    } else if (diffTime < 3600 * 1000 && diffTime > 0) {
      // //注释("一小时之内");
      // let time = newData - diffTime;
      let dayNum = Math.floor(diffTime / (60 * 1000))
      return dayNum + '分钟前'
    }
  }
})