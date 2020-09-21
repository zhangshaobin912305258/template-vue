import router from './router'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import { getCookie, setCookie } from './cookie'

import Layout from '@/components/layout/Layout.vue' //Layout 是架构组件，不在后台返回，在文件里单独引入
var getRouter //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  console.log(getRouter)
  if (!getRouter) {
    //不加这个判断，路由会陷入死循环
    if (!getObjArr('routes')) {
      console.log('beforeEach  getRouter')
      getRouter = fakeRouter.router //假装模拟后台请求得到的路由数据
      setCookie('routes', getRouter)
      routerGo(to, next) //执行路由跳转方法
      // })
    } else {
      //从localStorage拿到了路由
      getRouter = getObjArr('routes') //拿到路由
      console.log(getRouter)
      routerGo(to, next)
    }
  } else {
    next()
  }
})

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  //global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function getObjArr(name) {
  //localStorage 获取数组对象的方法
  return JSON.parse(getCookie(name))
}

function filterAsyncRouter(asyncRouterMap) {
  //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
