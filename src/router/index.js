import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/main'
import Register from '@/page/register/main'
import Layout from '@/components/layout/layout'

import PictureSlider from '@/page/PictureSlider/main'

import webSocket from '@/page/webSocket/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 初始页
    {
      path: '/',
      redirect: '/login' // 路由重定向
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 注册页
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // 布局页面
    {
      path: '/main',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/one/PictureSlider',
          name: 'PictureSlider',
          component: PictureSlider
        },
        {
          path: '/webSocket',
          name: 'webSocket',
          component: webSocket
        }
      ]
    }
    // 首页
    // {
    //   path: '/main',
    //   name: 'main',
    //   component: Main
    // }
  ]
})
