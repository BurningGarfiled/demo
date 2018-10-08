import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/main'
import Layout from '@/components/layout/layout'

import PictureSlider from '@/page/PictureSlider/main'

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
    // 布局页面
    {
      path: '/main',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/one/PictureSlider',
          name: 'PictureSlider'
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
