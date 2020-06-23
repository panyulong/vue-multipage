import Cookies from 'js-cookie'
import {token} from '@/const/const'

const adminToken = token
export function getToken() {
  return Cookies.get(adminToken)
}

export function setToken(token) {
  var inFifteenMinutes = new Date(new Date().getTime() + 120 * 60 * 1000);//原为天数单位，改为120分钟即两小时,如不设置过期时间，关闭浏览器就会退出
  return Cookies.set(adminToken, token,{expires:''})
}

export function removeToken() {
  return Cookies.remove(adminToken)
}
