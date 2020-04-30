// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex'
import router from './router'
// import Vant from 'vant'
// import 'vant/lib/index.css'
import { Button, Swipe, SwipeItem, Lazyload, Image as VanImage, Icon, Tabbar, TabbarItem, Field, Uploader, PullRefresh, Toast, Popup, Picker, IndexBar, IndexAnchor } from 'vant'
import 'amfe-flexible/index.js'
import pinyin from 'js-pinyin'
import './assets/resect.css'
Vue.config.productionTip = false
Vue.use(pinyin)
// Vue.use(Vant)

Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Uploader).use(Field).use(PullRefresh)
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
