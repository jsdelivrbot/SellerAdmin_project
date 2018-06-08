// import axios from 'axios'

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

