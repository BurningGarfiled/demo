// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入babel编译环境，支持vuex；需要第一个引入
import 'babel-polyfill'

// 引入组件文件
import '../static/font/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/common/common.css' // global css
import Axios from 'axios'

// 引入组件
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Mock from 'mockjs'
import store from './store'

Vue.config.productionTip = false

// 注册组件
Vue.use(Element, {size: 'small'})
Vue.use(Mock)

Vue.prototype.$http = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
