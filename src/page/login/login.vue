<template>
  <div class="_login clearfix" :style="style.bg">
    <img :src="style.icon.src" :style="style.loginLogo">
    <div class="_center not_s">
      <div class="_header tc">
        <span class="fcf f26">登录</span>
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
              <Icon size="18" class="hand ml30 vtt" :type="user.showPass === true?'eye':'eye-disabled'" @click="showPass"></Icon>
            </Col>
          </Row>
        </div>
        <div class="_code bc">
          <Row>
            <Col span="6">
              <label class="lh32 f16 fc9">验证码:</label>
            </Col>
            <Col span="18" class="tl">
              <input class="_input" v-model="user.code" placeholder="" @keyup.enter="resLogin"></input>
              <img class="_img" :src="codeImgSrc" alt="" @click="resGetCode">
            </Col>
          </Row>
        </div>
        <div class="_footer bc w350 tc">
          <button class="_loginBtn" v-bind:disabled="user.loginBtn" :class="{'_active':user.loginBtn}" @click="resLogin">确 认</button>
        </div>
        <div class="_register bc w350 tc">
          <span class="_loginBtn" @click="resRegister">注册 / </span>
          <span class="_loginBtn" @click="resForget">忘记密码?</span>
        </div>
        <p :style="{'display':!isChrome ? 'none' : ''}" style="color:#D37575">推荐使用chrome浏览器</p>
      </div>
    </div>
    <div class="tc fc6 _footerFont">
      <p>CopyRight © 版权所有: {{loginName}}仲裁委员会 &nbsp;技术支持: 北京知仲科技有限公司（010-64170741）</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import {setToken, removeToken} from '@/cookies'
import setRegExp from '@/config/regExp.js'
import vers from '@/config/version.js'
import regi from '@/config/regiType.js'

export default {
  name: 'login',
  data () {
    return {
      style: {
        bg: {
          backgroundImage: 'url(' + require('../../static/images/login_bg.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        },
        icon: {
          src: require('../../static/images/login_icon.png')
        },
        loginLogo: {
          width: '210px',
          position: 'absolute',
          top: '20px',
          right: '20px',
          userSelect: 'none'
        }
      },
      user: {
        phone: '',
        password: '',
        code: '',
        showPass: false,
        loginBtn: true,
        em: '',
        emStatus: false
      },
      codeSrc: '',
      isChrome: true
    }
  },
  created () {
    this.clearTokenLoc()
    this.resGetCode()
    if (this.getweb() !== 'Chrome') {
      alert('推荐使用chrome浏览器')
    } else {
      this.isChrome = false
    }
  },
  mounted () {
  },
  computed: {
    codeImgSrc () {
      return regi.api + '/verify/code' + this.codeSrc
    },
    loginName () {
      return regi.dataMap.loginName
    }
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    getweb () {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return 'IE'
      } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        return 'Firefox'
      } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
        return 'Chrome'
      } else if (navigator.userAgent.indexOf('Safari') !== -1) {
        return 'Safari'
      }
    },
    clearTokenLoc () {
      removeToken()
      if (window.localStorage) {
        let loc = window.localStorage
        loc.removeItem('userInfo')
        loc.removeItem('userState')
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
    resGetCode () {
      this.codeSrc = '?t=' + (new Date()).valueOf()
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
      } else if (this.user.code === '') {
        this.user.emStatus = true
        this.user.em = '请输入验证码'
      } else if (this.user.code.length !== 4) {
        this.user.emStatus = true
        this.user.em = '请正确输入四位验证码'
      } else {
        this.user.emStatus = false
        this.user.em = ''
        axios.post('/login', {
          phone: this.user.phone,
          password: this.user.password,
          verifyCode: this.user.code,
          version: vers.version
        }).then(res => {
          if (window.localStorage) {
            let loc = window.localStorage
            loc.setItem('userInfo', JSON.stringify(res.data.data))
          }
          setToken(res.data.data.token)
          this.setUserInfo(res.data.data)
          if (res.data.data.verify === '-1' || res.data.data.verify === '2') {
            this.$router.push({
              path: '/userInfo'
            })
          } else {
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({
              path: redirect
            })
          }
        }).catch(e => {
          this.user.password = ''
          this.user.code = ''
          this.resGetCode()
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
  // background: url('../../static/images/login_bg.png') no-repeat center center;
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
      height: 300px;
      padding-top: 20px;
      ._phone, ._password, ._code {
        width: 330px;
        padding: 15px 0 5px;
        border-bottom: 1px solid #ddd;
        letter-spacing: 1px;
        margin-bottom: 10px;
        ._input {
          width: 70%;
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
        ._img {
          width: 70px;
          height: 32px;
          float: right;
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
  ._footerFont {
     position: absolute;
     bottom: 10%;
     right: 50%;
     transform: translate(50%, -50%);
  }
}
</style>
