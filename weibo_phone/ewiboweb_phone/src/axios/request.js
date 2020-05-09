import axios from 'axios'
import {Toast} from 'vant'
import router from '../router'

// 环境的切换
console.log(process.env)
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = '/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '/'
}

// target: 'http://127.0.0.1:8083/', // 测试环境打包
// target: 'http://172.19.184.111:8088/', // 关营亚ip
// target: 'http://10.4.93.74:8083/', // c环境ip
// target: 'http://10.4.93.75:8083/', // d环境ip
// target: 'http://10.2.36.136:8083/', // a环境ip

// 请求超时时间
// axios.defaults.timeout = 10000

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers['Authorization'] = sessionStorage.getItem('token')
    }
    config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1ODkwMjk4OTUsInVzZXJuYW1lIjoiemhhbmdoYW8ifQ.MUYUcG6Su3vJkqkgc6AEc3PvyNN-6-cCETDNaRyqblQsSgN7hMOSIqsHtXlzJFup5A8ocqm6i43rDFfbFKZP1g'
    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          // ElementUI.Message.error('未登录，请重新登录')
          router.push('/login')
          break
        case 403:
          // ElementUI.Message.error('登录过期，请重新登录')
          router.push('/login')
          break
          // 404请求不存在
        case 404:
          Toast('网络请求不存在')
          break
        case 500:
          if (error.response.data.message === 'token已过期' || error.response.data.message === 'token为null') {
            // ElementUI.Message.error(error.response.data.message + '，请重新登录')
            sessionStorage.removeItem('token')
            router.push('/login')
          } else {
            Toast('服务器出错啦，请稍后')
          }
          break
        default:
          Toast(error.response.data.message)
      }
      return Promise.reject(error.response)
    }
  }
)
export function utiles (url, data = {}, type = 'POST') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      // 失败了调用reject()
      reject(error)
    })
  })
}
export function utilesForm (url, data = {}, type = 'POST') {
  return new Promise(function (resolve, reject) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    let promise = axios.post(url, data, config)
    promise.then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}

export function utilesimge (url, data = {}, type = 'POST', func) {
  return new Promise(function (resolve, reject) {
    let config = {
      onUploadProgress: progressEvent => {
        func(progressEvent)
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    let promise = axios.post(url, data, config)
    promise.then(function (response) {
      if (response.data) resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}
