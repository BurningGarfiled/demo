<template>
  <div class="draw-content">
    <p style="margin-bottom: 20px;">姓名：{{userInfo.userName}}
      <span style="color:green;margin-left:20px;font-size:14px">{{success}}</span>
    </p>
    <div class="chatContent">
      <!--聊天入口-->
      <div class="chatUser">
        <!--聊天窗口列表-->
        <div class="user-list" v-for="(item, index) in chatList" :key="item.index"
         @click="chooseUser(item.id, index)"
         :class="{userSelect: nowUserIndex === index}" v-if="nowUserIndex !== -1">
          <div class="user-img">头像</div>
          {{item.name}}
          <!-- <i class="user-close iconfont" v-if="nowUserIndex === index" @click="userClose(index)">&#xe608;</i> -->
        </div>
        <!--用户搜索-->
        <div class="user-search">
          <el-select class="user-search-input" v-model="nowUserId" placeholder="请选择用户"
           @change="newOpen">
            <el-option
              v-for="item in userList"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--聊天内容-->
      <div class="charShowBox" v-if="nowUserIndex !== -1">
        <div class="chatPop">
          <!--聊天记录-->
          <div class="chatMessage">
            <div class="chatInfo" v-for="item in chatList[nowUserIndex].content" :key="item.index" v-if="item.message">
             <p class="chatInfo-text" v-html="item.message"></p>
            </div>
          </div>
          <!--发送消息-->
          <div class="sendMessage">
            <el-input class="sendInput" v-model="chatList[nowUserIndex].sendMessage" type="textarea" resize="none" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
            <div class="sendButton">
              <el-button>关闭</el-button>
              <el-button type="primary" @click="send(nowUserId, nowUserIndex)">发送</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'draw',
  data () {
    return {
      userInfo: Object, // 登录人信息
      webSuccess: false,
      success: '请先建立连接', // 链接状态
      nowUserId: '', // 当前聊天窗口用户Id
      nowUserIndex: -1, // 当前聊天窗口索引
      chatList: [], // 打开的聊天窗口数组
      userList: [] // 用户列表
    }
  },
  methods: {
    init () {
      const this_ = this
      let ws = ''
      if (typeof (WebSocket) === 'undefined') {
        alert('当前浏览器不支持 WebSocket')
      } else {
        this.success = '连接中...'
        ws = new WebSocket('ws://19.86.11.16:1215/websocket/' + this.userInfo.userId)
        // 连接成功建立事件
        ws.onopen = function () {
          this_.success = '连接服务器成功'
          this_.webSuccess = true
          this_.getUserList()
        }
        // 获取消息事件
        ws.onmessage = function (data) {
          let newData = JSON.parse(data.data)
          let status = newData.status
          if (status === '100') { // 上线

          } else if (status === '300') { // 下线

          } else if (status === '200') { // 发送消息
            let flag = false // 是否有打开聊天窗口
            const sendUserId = Number(newData.sendId) // 发送人Id
            flag = this_.isOpen(sendUserId)
            if (flag) { // 有打开窗口
              const index = flag.index // 获取聊天窗口索引
              // this_.nowUserIndex = index
              const params = {
                message: newData.message
              }
              this_.chatList[index].content.push(params)
            } else { // 没有打开窗口，新建聊天窗口
              const id = sendUserId
              this_.newOpen(id, newData)
            }
          }
        }
        // 关闭事件
        ws.onclose = function () {

        }
      }
    },
    // 获取用户列表
    getUserList () {
      const this_ = this
      const url = '/test/allUser'
      const params = {
        uid: this.userInfo.userId
      }
      this.$http.get(url, {params: params}).then(function (data) {
        this_.userList = data.data
      })
    },
    // 单击选中用户
    chooseUser (id, index) {
      this.nowUserIndex = index
      this.nowUserId = id
    },
    // 新建聊天窗口
    newOpen (id, newData) { // id：建立连接的用户Id
      console.log(newData)
      // 如果当前用户没有打开聊天窗口，打开新连接
      if (!this.isOpen(id)) {
        let newMessage = {}
        let name = ''
        let content = []
        if (newData) {
          newMessage = {
            message: newData.message
          }
          name = newData.sendName
          content.push(newMessage)
        } else {
          name = this.getUserName(id)
        }
        let len = this.chatList.length // 当前打开的聊天窗口数量
        const params = {
          index: len,
          name: name, // 聊天对象
          id: id, // 聊天对象Id
          sendMessage: '', // 要发送的消息内容
          draftMessage: '', // 草稿箱
          content: content // 聊天内容记录
        }
        this.chatList.push(params)
        this.nowUserIndex = len // 当前打开窗口索引 = 聊天窗口数量
        this.nowUserId = id
        this.chooseUser(id, len)
      }
    },
    // 关闭聊天窗口
    userClose (index) {

    },
    // 发送消息
    send (id, index) {
      const this_ = this
      const message = this.chatList[index].sendMessage // 消息内容
      let params
      params = {
        acceptId: id, // 接收人Id
        message: message,
        sendId: this_.userInfo.userId, // 发送人Id
        sendName: this_.userInfo.userName // 发送人姓名
      }
      const url = '/test/test1'
      this.$http.get(url, {params}).then(function (data) {
        this_.chatList[index].sendMessage = '' // 消息内容清空
      })
    },
    // 根据用户id遍历用户列表，取出用户名
    getUserName (id) {
      const arr = this.userList
      const len = arr.length
      for (let i = 0; i < len; i++) {
        if (id === arr[i].uid) {
          return arr[i].name
        }
      }
      return false
    },
    // 根据id判断当前用户是否有打开的聊天窗口
    isOpen (id) {
      const arr = this.chatList
      const len = arr.length
      for (let i = 0; i < len; i++) {
        if (id === arr[i].id) {
          return arr[i]
        }
      }
      return false
    }
  },
  mounted () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.init()
  },
  computed: {
  }
}
</script>

<style scoped>
.draw-main{
  margin:0 auto;
  text-align: center;
}
.chatContent {
  height:600px;
}
.charShowBox {
  height: 100%;
  width: 500px;
  overflow: hidden;
}
.chatPop{
  box-sizing: border-box;
  height: 100%;
  width: 500px;
  border: 1px solid green;
  margin-bottom:20px;
  padding:20px;
  float: left;
}
.chatMessage {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 10px;
  background: #fff;
}
.chatInfo-text {
  font-size: 14px
}
.sendButton {
  padding-top: 10px;
  text-align: right;
}
.sendInput {
  height: 100%;
}
.chatUser {
  height:100%;
  width: 200px;
  border: 1px solid green;
  float: left;
  margin-right: 20px;
  box-sizing: border-box;
  position: relative;
}
.user-search {
  position: absolute;
  bottom: 0;
  left: 0;
}
.user-list{
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 20px;
  position: relative;
  user-select: none;
}
.user-list:hover {
  background: #ddd;
}
.user-img {
  height: 40px;
  width:40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  color: #eee;
  background: silver;
  border-radius: 50%;
  margin-right: 20px;
}
.userSelect{
  background: #ddd;
}
.user-close{
  font-size: 12px;
  position: absolute;
  top: 50%;
  margin-top: -8px;
  right: 10px;
  display: inline-block;
  height: 20px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
}
.user-close:hover{
  background: green;
}
</style>

<style>
</style>
