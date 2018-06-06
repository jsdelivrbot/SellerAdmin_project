import request from '@/utils/request'
import axios from 'axios'

export function login(userInfo) {
  return axios({
    url: 'http://webservice.1000da.com.cn/UserInfo/Login',
    method: 'post',
    data: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
