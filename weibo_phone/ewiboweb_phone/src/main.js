// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Swipe, SwipeItem, Lazyload } from 'vant'
import 'amfe-flexible/index.js'
import './assets/resect.css'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
  lazyComponent: true
})
/* eslint-disable no-new */
new Vue({
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
