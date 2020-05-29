import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import addContent from '@/components/addContent'
import topicList from '@/components/topicList'
import postDetails from '@/components/postDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/addContent',
      name: 'addContent',
      component: addContent
    },
    {
      path: '/topicList',
      name: 'topicList',
      component: topicList
    },
    {
      path: '/postDetails',
      name: 'postDetails',
      component: postDetails
    }
  ]
})
