import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { getCookie, setCookie } from '@/util/cookie'
import { getRoutes } from '@/api/login'

//解决路由重复点击的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const _import = require('@/router/_import_' + process.env.NODE_ENV) //获取组件的方法

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/login', component: _import('Login'), name: 'login' },
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('Layout'),
  name: 'main',
  redirect: { name: 'home' },
  children: [{ path: '/home', component: _import('Home'), name: 'home' }],
  beforeEnter(to, from, next) {
    let token = getCookie('token')
    if (!token || !/\S/.test(token)) {
      //clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  },
}
/*
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Layout.vue'),
  },
]
*/

const router = new VueRouter({
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes),
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (
    router.options.isAddDynamicMenuRoutes ||
    fnCurrentRouteType(to, globalRoutes) === 'global'
  ) {
    next()
  } else {
    getRoutes().then((data) => {
      fnAddDynamicMenuRoutes(data.routes)
      router.options.isAddDynamicMenuRoutes = true
      setCookie('routes', JSON.stringify(data.routes))
      store.dispatch('route/setRoutes', data.routes)
      next({ ...to, replace: true })
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType(route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (
      globalRoutes[i].children &&
      globalRoutes[i].children.length >= 1
    ) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].path && /\S/.test(menuList[i].path)) {
      menuList[i].path = menuList[i].path.replace(/^\//, '')
      var route = {
        path: menuList[i].path.replace('/', '-'),
        component: null,
        name: menuList[i].path.replace('/', '-'),
      }
      try {
        route['component'] = _import(`modules/${menuList[i].path}`) || null
      } catch (e) {
        console.log(e)
      }
      console.log(route)
      routes.push(route)
    }
  }

  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([mainRoutes, { path: '*', redirect: { name: '404' } }])
  }
}

export default router
