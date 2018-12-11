<template>
  <div class="login-container">
    <el-form id="form" class="login-form" autoComplete="on" :model="registerForm" ref="registerForm" label-position="left">

      <el-form-item prop="userName">
        <el-input type="text" maxlength="4" :input="companyCodeCheck(registerForm.userName)"
        v-model="registerForm.userName" autoComplete="on" @keyup.enter.native="focusNextInput($event,'form')" class="enter" placeholder="姓名"/>
      </el-form-item>

      <el-form-item prop="companyName">
        <el-input type="text" maxlength="8" v-model="registerForm.companyName" autoComplete="on" @keyup.enter.native="focusNextInput($event,'form')" class="enter" placeholder="公司名称"/>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input type="text" maxlength="11" v-model="registerForm.phone" autoComplete="on" @keyup.enter.native="focusNextInput($event,'form')" class="enter" placeholder="手机号码"/>
      </el-form-item>

      <el-form-item prop="yzm" style="background:transparent;margin-bottom:42px:position:relative">
        <el-input class="yzm-input enter" type="text" v-model="registerForm.yzm" :input="yzmCheck(registerForm.yzm)" placeholder="验证码"/>
        <el-button class="yzm-send" type="primary" :disabled="yzmStatus" @click.native.prevent="yzmGet">{{yzmText}}</el-button>
      </el-form-item>

      <el-button size="medium" type="primary" style="width:100%" :loading="loading">注册</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    // const validateYzm = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error(this.$t('login.placeholder_yzm')))
    //   } else {
    //     if (value === this.verification) {
    //       callback()
    //     } else {
    //       callback(new Error(this.$t('login.error_yzm')))
    //     }
    //   }
    // }
    // const validateCompanyCode = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error(this.$t('login.placeholder_companycode')))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      registerForm: {
        userName: '',
        companyName: '',
        phone: '',
        yzm: ''
      },
      yzmText: '点击获取验证码',
      time: 3,
      yzmStatus: false,
      loading: false
    }
  },
  methods: {
    companyCodeCheck (val) {
      this.$nextTick(function () {
        this.registerForm.userName = val.replace(/[^0-9-]+/, '')
      })
    },
    yzmCheck (val) {
      this.$nextTick(function () {
        this.registerForm.yzm = val.replace(/[^0-9-]+/, '')
        if (val.length > 6) {
          this.registerForm.yzm = val.slice(0, 6)
        }
      })
    },
    yzmGet () {
      this.countDown()
    },
    countDown () {
      this.time -= 1
      if (this.time > 0) {
        this.yzmText = this.time + '秒后重新发送'
        this.yzmStatus = true
        setTimeout(this.countDown, 1000)
      } else {
        this.time = 3
        this.yzmStatus = false
        this.yzmText = '点击获取验证码'
      }
    }
  },
  watch: {
  },
  mounted () {
  }
}
</script>

<style>
  #form {
    width: 400px;
    margin: 0 auto;
  }
  .yzm-send{
    position:absolute;
    width:120px;
    text-align:left;
    top:2px;
    right: 0;
    border: none;
  }
  .yzm-input{
    background:transparent;
  }
</style>
