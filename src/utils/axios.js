import Axios from 'axios'
import store from '@/store'
import {getToken} from "@/utils/auth"
import {token} from '@/const/const'

const baseURL = window.config.url
// Axios.default.withCredentials = true
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }

  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }

  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      if (getToken()) {
        config.headers[token] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      // }
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let {data} = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      if(res.status === 401 || res.data.errcode){
        //重新调用授权信息
        store.dispatch('User/login')
      }
      return data
    }, (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          //重新调用授权信息
            store.dispatch('User/fedLogout')
          }
      } else {
        throw Error(error.message )
      }
      return Promise.reject(error)
    })
  }

  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      timeout: 6000,
      // headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        // 标识为ajax请求
        // 'X-Requested-With': 'XMLHttpRequest',
      // },
      // 携带认证信息，默认为false，这样在跨域请求下session无法获取信息
      withCredentials: true,
      crossDomain:true
    }
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }

  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}

export default httpRequest
