<template>
  <div class="login-content">
    <el-form class="loginForm" :model="loginForm" :rules="rules">
      <div class="title-container">
        <div class="title">{{title}}</div>
      </div>
      <el-form-item prop="userName">
        <span class="formIcon">
          <i class="iconfont">&#xe639;</i>
        </span>
        <el-input type="text" v-model="loginForm.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <span class="formIcon">
          <i class="iconfont">&#xe614;</i>
        </span>
        <span class="formIcon pass-type" @click="showPass">
          <i class="iconfont" v-html="passIcon"></i>
        </span>
        <el-input :type="passwordType" v-model="loginForm.pass" placeholder="密码"></el-input>
      </el-form-item>
      <div class="button-center">
        <el-button type="info" style="width:100%" @click="login">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import VNumber from '@/components/common/verificationCode'
import '@/mock/login'
export default {
  name: 'HelloWorld',
  components: {VNumber},
  data () {
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6) {
          callback(new Error('密码长度不能少于6位'))
        } else {
          callback()
        }
      }
    }
    return {
      title: '欢迎登录',
      passwordType: 'password', // 密码输入框类型
      passIcon: '&#xe617;', // 查看密码图标
      loginForm: {
        userName: 'wangjing',
        pass: '123456',
        verification: ''
      },
      rules: {
        userName: [
          { required: true, validator: validateUserName, trigger: 'change' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 显示、隐藏密码
    showPass () {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.passIcon = '&#xe685;'
      } else if (this.passwordType === 'text') {
        this.passwordType = 'password'
        this.passIcon = '&#xe617;'
      }
    },
    // 密码验证
    // passCheck (val) {
    //   this.$nextTick(function () {
    //     // this.loginForm.yzm = val.replace(/[^\w\.\/]/ig, '') // 只能输入数字和字母
    //     this.loginForm.yzm = val.replace(/[^0-9-]+/, '') // 只能输入数字
    //     if (val.length > 4) {
    //       this.loginForm.yzm = val.slice(0, 4)
    //     }
    //   })
    // }
    // 登录
    login () {
      let this_ = this
      let url = '/api/login'
      let param = this.form
      this.$http.post(url, param).then(function (resp) {
        if (resp.status === 200) {
          this_.$router.push('/main')
        }
      })
      // console.log(mockdata.data.foods)
    }
  }
}
</script>
<style scoped>
.login-content{
  position: relative;
  height:100%;
  width:100%;
  background: url('/static/assets/login/login_bg.jpg') no-repeat;
  background-size: cover;
}
.login-content .el-form-item{
  position: relative;
  border:1px solid #ddd;
  border-radius: 5px;
  background:#fff;
}
.login-content .el-input{
  width:80%;
}
.loginForm{
  position: absolute;
  width:300px;
  margin-left:-150px;
  left:50%;
  top:35%;
  border-radius: 5px;
  padding:20px;
  background:rgb(246,215,109);
}
.title-container .title{
  font-size:20px;
  text-align:center;
  margin-bottom:10px;
}
.formIcon{
  display:inline-block;
  color:#444;
  padding: 0 0 0 6px;
  vertical-align: middle;
  cursor: default;
}
.pass-type{
  position: absolute;
  top:0;
  right:10px;
  cursor: pointer;
}
</style>
<style>
.login-content .el-input input{
  border:0;
}
</style>
