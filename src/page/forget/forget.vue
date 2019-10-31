<template>
  <div class="forget">
    <head-top :isRegister="false" headType="forget">
      <span class="f36 fcf">忘记密码</span>
    </head-top>
    <div class="_center">
      <div class="_center_mid not_s">
        <div class="_forget">
          <div class="_phone">
            <Row>
              <Col span="8" offset="4" class="_label">手机号码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor"><input type="text" class="_input" v-model.trim="forget.phone" @change="resCheckPhone"></Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="forget.emStatus===1" v-text="forget.emText"></span></Col>
            </Row>
          </div>
          <div class="_identCode">
            <Row>
              <Col span="8" offset="4" class="_label">验证码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input type="text" class="_input" v-model.trim="forget.identCode">
                <button class="_identCodeBtn" :class="{'_disabled':identCodeBtn}" v-bind:disabled="identCodeBtn" @click="resIdentCode">获 取</button>
                <span class="_identCodeTime" v-show="identCodeShow" v-text="identCodeTime + 's'"></span>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="forget.emStatus===2" v-text="forget.emText"></span></Col>
            </Row>
          </div>
          <div class="_password">
            <Row>
              <Col span="8" offset="4" class="_label">密码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input :type="forget.password.showPass === true?'text':'password'" class="_input" v-model="forget.password.text">
                <Icon size="22" class="hand _icon" :type="forget.password.showPass === true?'eye':'eye-disabled'" @click="resShowPass('forget','password')"></Icon>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span>密码长度8~20位,必须包含大写字母,小写字母,数字</span></Col>
            </Row>
          </div>
          <div class="_vPassword">
            <Row>
              <Col span="8" offset="4" class="_label">确认密码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input :type="forget.vPassword.showPass === true?'text':'password'" class="_input" v-model="forget.vPassword.text">
                <Icon size="22" class="hand _icon" :type="forget.vPassword.showPass === true?'eye':'eye-disabled'" @click="resShowPass('forget','vPassword')"></Icon>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span>密码长度8~20位,必须包含大写字母,小写字母,数字</span></Col>
            </Row>
          </div>
        </div>
        <Row class="pb10 pt20">
          <Col span="24" class="tc"><button class="_registerBtn" :class="{'_disabled':forgetBtn}" v-bind:disabled="forgetBtn" @click="resForget">确 定</button></Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/header/head'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'forget',
  components: { headTop },
  data () {
    return {
      forgetBtn: true,
      identCodeBtn: true,
      identCodeTime: 30,
      identCodeShow: false,
      codeTimeOut: null,
      forget: {
        phone: '',
        identCode: '',
        password: {
          text: '',
          showPass: false
        },
        vPassword: {
          text: '',
          showPass: false
        },
        emStatus: 0,
        emText: ''
      }
    }
  },
  methods: {
    resShowPass (type, val) {
      this[type][val].showPass = !this[type][val].showPass
    },
    resCheckPhone () {
      let type = 'forget'
      if (!setRegExp(this[type].phone, 'phone')) {
        this[type].emStatus = 1
        this[type].emText = '手机号码格式不正确'
      } else {
        axios.post('/checkPhone', {
          phone: this[type].phone
        }).then(res => {
          if (res.data.data === 0) {
            this.forgetBtn = true
            this[type].emStatus = 1
            this[type].emText = '此手机号码尚未注册过,请先注册'
            this.identCodeBtn = true
          } else if (res.data.data === 1) {
            this.forgetBtn = false
            this[type].emStatus = 0
            this[type].emText = ''
            this.identCodeBtn = false
          }
        }).catch(e => {
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    resIdentCode () {
      axios.post('/sendMessage', {
        phone: this.forget.phone
      }).then(res => {
        this.identCodeTime = 60
        this.identCodeShow = true
        this.identCodeBtn = true
        this.timeOut()
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    timeOut () {
      this.codeTimeOut = setTimeout(() => {
        if (this.identCodeTime === 0) {
          clearTimeout(this.codeTimeOut)
          this.identCodeBtn = false
          this.identCodeShow = false
          return
        }
        this.identCodeTime--
        this.timeOut()
      }, 1000)
    },
    resForget () {
      let type = 'forget'
      if (this[type].phone === '') {
        this[type].emStatus = 1
        this[type].emText = '请填写手机号'
      } else if (!setRegExp(this[type].phone, 'phone')) {
        this[type].emStatus = 1
        this[type].emText = '手机号码格式不正确'
      } else if (this[type].phone === '') {
        this[type].emStatus = 2
        this[type].emText = '请填写6位验证码'
      } else if (!setRegExp(this[type].identCode, 'regCode')) {
        this[type].emStatus = 2
        this[type].emText = '验证码错误'
      } else if (this[type].password.text === '') {
        this[type].emStatus = 3
        this[type].emText = '请填写密码'
      } else if (!setRegExp(this[type].password.text, 'password')) {
        this[type].emStatus = 3
        this[type].emText = '密码长度8~20位,必须包含大写字母,小写字母,数字'
      } else if (this[type].vPassword.text === '') {
        this[type].emStatus = 4
        this[type].emText = '请再次输入密码'
      } else if (this[type].password.text !== this[type].vPassword.text) {
        this[type].emStatus = 4
        this[type].emText = '俩次输入密码不一致'
      } else {
        this[type].emStatus = 0
        this[type].emText = ''
        axios.post('/register/2', {
          phone: this.forget.phone,
          password: this.forget.password.text,
          identCode: this.forget.identCode
        }).then(res => {
          this.$Message.success({
            content: '密码重置成功,快去登录吧',
            duration: 2,
            onClose: () => {
              setTimeout(() => {
                this.$router.push({
                  path: '/login'
                })
              })
            }
          })
        }).catch(e => {
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._center_mid {
    @include bc;
    width: 60%;
    min-width: 600px;
    ._phone, ._identCode, ._password, ._vPassword {
      padding-top: 20px;
      font-size: 14px;
      ._label {
        height: 20px;
        line-height: 20px;
      }
      ._labelFor {
        border-bottom:1px solid #ddd;
        position: relative;
        ._icon {
          position: absolute;
          right: 30px;
          top: 6px;
        }
        ._input {
          width: 70%;
          border: none;
          letter-spacing: 1px;
          font-size: 14px;
          color: #666;
          height: 32px;
          line-height: 32px;
          background: transparent;
        }
        ._input:focus {
          box-shadow: none;
          outline: 0px;
        }
      }
      ._em {
        padding-top: 5px;
        height: 22px;
        line-height: 22px;
        color: #ff7a7a;
        font-size: 10px;
      }
    }
    ._registerBtn {
       @include btn(#126eaf, 180px, 16px, 40px);
       @include boxShadow(0 1px 6px -1px #bbb);
       @include borderRadius(4px);
       font-weight: 800;
    }
    ._registerBtn._disabled {
      @include btn(#ccc, 180px, 16px, 40px);
    }
    ._identCodeBtn {
      @include btn(#126eaf, 70px, 14px, 28px);
      @include boxShadow(0 1px 6px -1px #bbb);
      @include borderRadius(3px);
      float: right;
    }
    ._identCodeBtn._disabled {
      @include btn(#ccc, 70px, 14px, 28px);
    }
    ._identCodeTime {
      float: right;
      height: 32px;
      line-height: 32px;
      margin-right: 10px;
      color: #ff7a7a;
    }
  }
}
</style>
