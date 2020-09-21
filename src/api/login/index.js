import request from '@/api/request'

export function login(req) {
  console.log(req)
  return request({
    url: '/api/login',
    method: 'post',
    data: req,
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/api/captchaImage',
    method: 'get',
  })
}

//获取路由信息
export function getRoutes() {
  return request({
    url: '/api/getRoutes',
    method: 'get',
  })
}
