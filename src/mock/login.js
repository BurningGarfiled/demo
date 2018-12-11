// 引入mockjs
import Mock from 'mockjs'

// 定义要拦截的请求路径，并返回数据
const data = Mock.mock('/webSocket/login', {
  name: '王京',
  sex: '男',
  age: 25
})

// 释放data数据,mock没有拦截接口时候使用
export default {
  data
}
