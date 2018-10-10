<template>
  <div class="_login clearfix" :style="style.bg">
    <img :src="style.icon.src" :style="style.loginLogo">
    <div class="_center not_s">
      <div class="_header tc">
        <span class="fcf f26">登陆</span>
        <transition name="fade">
          <div class="_em" v-text="user.em" v-show="user.emStatus"></div>
        </transition>
      </div>
      <div class="_bodyer tc">
        <div class="_phone bc">
          <Row>
            <Col span="6">
              <label class="lh32 f16 fc9">手机号:</label>
            </Col>
            <Col span="18" class="tl">
              <input type="text" class="_input" v-model.trim="user.phone" @change="resCheckPhone">
            </Col>
          </Row>
        </div>
        <div class="_password bc">
          <Row>
            <Col span="6">
              <label class="lh32 f16 fc9">密 码:</label>
            </Col>
            <Col span="18" class="tl">
              <input class="_input" v-model="user.password" placeholder="" :type="user.showPass === true?'text':'password'" @keyup.enter="resLogin"></input>
              <Icon size="18" class="hand" :type="user.showPass === true?'eye':'eye-disabled'" @click="showPass"></Icon>
            </Col>
          </Row>
        </div>
        <div class="_forget bc">
          <Row>
            <Col span="6">
              <label class="hand" @click="resForget">忘记密码</label>
            </Col>
          </Row>
        </div>
        <div class="_footer bc w350 tc">
          <button class="_loginBtn" v-bind:disabled="user.loginBtn" :class="{'_active':user.loginBtn}" @click="resLogin">确 认</button>
        </div>
        <div class="_register bc w350 tc">
          <span class="_loginBtn" @click="resRegister">没有帐号? 注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import {setToken, removeToken} from '@/cookies'
import setRegExp from '@/config/regExp.js'
import vers from '@/config/version.js'

export default {
  name: 'login',
  data () {
    return {
      style: {
        bg: {
          backgroundImage: "url('../../static/images/login_bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        },
        icon: {
          src: '../../static/images/login_icon.png'
        },
        loginLogo: {
          width: '210px',
          position: 'absolute',
          top: '20px',
          right: '20px'
        }
      },
      user: {
        phone: '',
        password: '',
        showPass: false,
        loginBtn: true,
        em: '',
        emStatus: false
      }
    }
  },
  created () {
    this.clearTokenLoc()
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    clearTokenLoc () {
      removeToken()
      if (window.localStorage) {
        let loc = window.localStorage
        loc.removeItem('userInfo')
      }
    },
    showPass () {
      this.user.showPass = !this.user.showPass
    },
    resForget () {
      this.$router.push({
        path: '/forget'
      })
    },
    resCheckPhone () {
      if (this.user.phone === '') {
        this.user.emStatus = true
        this.user.em = '请输入手机号'
      } else if (!setRegExp(this.user.phone, 'phone')) {
        this.user.emStatus = true
        this.user.em = '手机号码格式不正确'
      } else {
        axios.post('/checkPhone', {
          phone: this.user.phone
        }).then(res => {
          if (res.data.data === 0) {
            this.user.loginBtn = true
            this.user.emStatus = true
            this.user.em = '该手机号码尚未注册'
          } else if (res.data.data === 1) {
            this.user.loginBtn = false
            this.user.emStatus = false
            this.user.em = ''
          }
        }).catch(e => {
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    resLogin () {
      if (this.user.phone === '') {
        this.user.emStatus = true
        this.user.em = '请输入手机号'
      } else if (!setRegExp(this.user.phone, 'phone')) {
        this.user.emStatus = true
        this.user.em = '手机号码格式不正确'
      } else if (this.user.password === '') {
        this.user.emStatus = true
        this.user.em = '请输入密码'
      } else if (!setRegExp(this.user.password, 'password')) {
        this.user.emStatus = true
        this.user.em = '密码错误'
      } else {
        this.user.emStatus = false
        this.user.em = ''
        axios.post('/login', {
          phone: this.user.phone,
          password: this.user.password,
          version: vers.version
        }).then(res => {
          if (window.localStorage) {
            let loc = window.localStorage
            loc.setItem('userInfo', JSON.stringify(res.data.data))
          }
          setToken(res.data.data.token)
          this.setUserInfo(res.data.data)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({
            path: redirect
          })
        }).catch(e => {
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    resRegister () {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._login {
  width: 100%;
  height: 100%;
  background: url('/static/images/login_bg.png') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ._center {
    @include center;
    width: 460px;
    height: 360px;
    ._header {
      @include backgroundLine(bottom, #1a2b58, #126eaf);
      height: 70px;
      line-height: 70px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      position: relative;
      ._em{
        position: absolute;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #ff7a7a;
        bottom: -30px;
        background: #fff799;
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
    }
    ._bodyer {
      @include boxShadow(0 1px 6px -1px #bbb);
      background: #ffffff;
      height: 290px;
      ._phone, ._password {
        width: 350px;
        padding: 45px 0 5px;
        border-bottom: 1px solid #ddd;
        letter-spacing: 1px;
        margin-bottom: 5px;
        ._input {
          width: 80%;
          letter-spacing: 1px;
          font-size: 16px;
          color: #666;
          height: 32px;
          line-height: 32px;
          border: none;
        }
        ._input:focus {
          box-shadow: none;
          outline: 0px;
        }
      }
      ._forget {
        width: 350px;
        color: #126eaf;
      }
      ._footer {
        padding-top: 10px;
        ._loginBtn {
          @include btn(#126eaf, 90px, 16px, 40px);
          @include borderRadius(5px);
        }
        ._loginBtn._active {
          @include btn(#ccc, 90px, 16px, 40px);
        }
      }
      ._register {
        padding-top: 10px;
        color: #126eae;
        -moz-cursor: pointer;
        -ms-cursor: pointer;
        -o-cursor: pointer;
        cursor: pointer;
      }
    }
  }
}
</style>
