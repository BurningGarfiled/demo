import axios from 'axios'
// import { Message } from 'element-ui'
// import { Message, MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/webSocket/',
  // baseURL: process.env.BASE_API,
  timeout: 5000 // request timeout
})
export default service
