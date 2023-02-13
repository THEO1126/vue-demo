<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-card class="login-form-layout">
      <el-form
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
      >
        <div style="text-align: center;margin-bottom: 20px;">
          <el-avatar id="avatar" :size="150" :src="oa_logo"></el-avatar>
        </div>
        <h2 class="login-title">欢迎登录</h2>
        <el-form-item prop="username">
          <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              autocomplete="on"
              placeholder="请输入用户名"
          >
            <span slot="prefix" style="padding-left:7px">
              <i class="fa fa-user"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              name="password"
              :type="pwdType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              autocomplete="on"
              placeholder="请输入密码"
          >
            <span slot="prefix">
              <i class="fa fa-key" style="padding-left:7px"></i>
            </span>
            <span slot="suffix" @click="showPwd" :hide="hide" style="padding-right: 7px;">
              <i v-if="!hide" class="fa fa-eye"></i>
              <i v-else class="fa fa-eye-slash"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
          记住我
        </el-checkbox>
        <el-form-item style="margin-bottom: 10px;text-align: center;">
          <el-button plain style="width: 45%"                   
                     @click.native.prevent="reset"
          >重置</el-button>
          <el-button
              style="width: 45%"
              type="primary"
              :loading="loading"
              @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Background from '@/assets/images/background.webp'
import oa_logo from '@/assets/images/oa_logo.png'
import Config from '@/settings'
import CryptoJS from "crypto-js";

export default {
  name: "Login",
  data() {
    // var validatePw = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('密码不能为空'));
    //   } else {
    //     if (this.loginForm.password !== '') {
    //       this.$refs.loginForm.validateField('password');
    //     }
    //     callback();
    //   }
    // };
    // var validateUn = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('用户名不能为空'));
    //   } else {
    //     if (this.loginForm.username !== '') {
    //       this.$refs.loginForm.validateField('username');
    //     }
    //     callback();
    //   }
    // };
    return {
      Background: Background,
      oa_logo:oa_logo,
      cookiePass: '',
      loginForm: {
        username: "",
        password: "",
        rememberMe: false
      },
      loading: false,
      hide:true,
      pwdType: "password",
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
    }
  },
  // 生命周期钩子函数，一个 vue 实例被生成后会调用这个函数
  created() {
    // 获取用户名密码等Cookie
    this.getCookie()
  },
  computed:{
    getUserId(){
      return this.$store.state.userId;
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
        this.hide=false
      } else {
        this.pwdType = "password";
        this.hide=true
      }
    },
    reset() {
      // 重置会变成cookie里的值
      // this.$refs.loginForm.resetFields();
      this.loginForm.username=""
      this.loginForm.password=""
      this.loginForm.rememberMe=false
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      // 解密
      var bytes = CryptoJS.AES.decrypt(password, "key");
      var originalPW = bytes.toString(CryptoJS.enc.Utf8);
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : originalPW
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },

    // 使用状态管理，用封装的axios
    handleLogin() {
      this.loading = true
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
        }
        // Encrypt 加密
        var cipherPW = CryptoJS.AES.encrypt(
            user.password,//账号 或者  密码
            "key"  //键
        ).toString();
        if (user.password !== this.cookiePass) {
          user.password = cipherPW
        }
        if(valid){
            this.$store.dispatch('Login',this.loginForm).then((response) => {
            this.loading = false
            let statusCode = response.data.statusCode
            if(statusCode==200){
              this.$router.push({ path: '/dashboard' })
              window.localStorage.setItem("user",JSON.stringify(response.data))
              if (user.rememberMe) {
                Cookies.set('username', user.username, { expires: Config.passCookieExpires })
                Cookies.set('password', user.password, { expires: Config.passCookieExpires })
                Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
              } else {
                Cookies.remove('username')
                Cookies.remove('password')
                Cookies.remove('rememberMe')
              }
            }else{
              this.loading = false
              /* 弹出警告提示框 */
              this.$message({
                showClose: true,
                message: '用户名或密码错误！',
                type: 'warning'
              });
            }
          }).catch(() => {
            this.loading = false
            this.$message({
              showClose: true,
              message: '登录失败！后台未启动',
              type: 'error'
          });
          })
        }else{
          this.loading = false
          this.$message({
            showClose: true,
            message: '用户名和密码不能为空！',
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  overflow: hidden;
  height: 100%;
  background-size: cover;
}
.login-form-layout {
  width: 30%;
  min-width: 400px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.49);
  margin: auto;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #409eff;
}
</style>
