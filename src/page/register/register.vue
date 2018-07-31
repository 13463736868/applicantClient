<template>
  <div class="register">
    <head-top :isRegister="false">
      <span class="f36 fcf">注册</span>
    </head-top>
    <div class="_center">
      <div class="_center_mid not_s">
        <Row>
          <Col span="24" class="tc pb15">注册为</Col>
        </Row>
        <Row class="pb20">
          <Col span="8" offset="4" class="_selectBtn" :class="{'_active':registerType}" @click.native="resChange('company')"><Icon type="checkmark" class="_icon" size="20"></Icon>企业用户</Col>
          <Col span="8" class="_selectBtn" :class="{'_active':!registerType}" @click.native="resChange('personal')"><Icon type="checkmark" class="_icon" size="20"></Icon>个人用户</Col>
        </Row>
        <div class="_company" v-show="registerType">
          <div class="_phone">
            <Row>
              <Col span="8" offset="4" class="_label">手机号码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor"><input type="text" class="_input" v-model.trim="company.phone" @change="resCheckPhone"></Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="company.emStatus===1" v-text="company.emText"></span></Col>
            </Row>
          </div>
          <div class="_identCode">
            <Row>
              <Col span="8" offset="4" class="_label">验证码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input type="text" class="_input" v-model.trim="company.identCode">
                <button class="_identCodeBtn" :class="{'_disabled':identCodeBtn}" v-bind:disabled="identCodeBtn" @click="resIdentCode">获 取</button>
                <span class="_identCodeTime" v-show="identCodeShow" v-text="identCodeTime + 's'"></span>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="company.emStatus===2" v-text="company.emText"></span></Col>
            </Row>
          </div>
          <div class="_password">
            <Row>
              <Col span="8" offset="4" class="_label">密码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input :type="company.password.showPass === true?'text':'password'" class="_input" v-model="company.password.text">
                <Icon size="22" class="hand _icon" :type="company.password.showPass === true?'eye':'eye-disabled'" @click="resShowPass('company','password')"></Icon>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="company.emStatus===3" v-text="company.emText"></span></Col>
            </Row>
          </div>
          <div class="_vPassword">
            <Row>
              <Col span="8" offset="4" class="_label">确认密码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input :type="company.vPassword.showPass === true?'text':'password'" class="_input" v-model="company.vPassword.text">
                <Icon size="22" class="hand _icon" :type="company.vPassword.showPass === true?'eye':'eye-disabled'" @click="resShowPass('company','vPassword')"></Icon>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="company.emStatus===4" v-text="company.emText"></span></Col>
            </Row>
          </div>
        </div>
        <div class="_personal" v-show="!registerType">
          <div class="_phone">
            <Row>
              <Col span="8" offset="4" class="_label">手机号码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor"><input type="text" class="_input" v-model.trim="personal.phone" @change="resCheckPhone"></Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="personal.emStatus===1" v-text="personal.emText"></span></Col>
            </Row>
          </div>
          <div class="_identCode">
            <Row>
              <Col span="8" offset="4" class="_label">验证码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input type="text" class="_input" v-model.trim="personal.identCode">
                <button class="_identCodeBtn" :class="{'_disabled':identCodeBtn}" v-bind:disabled="identCodeBtn" @click="resIdentCode">获 取</button>
                <span class="_identCodeTime" v-show="identCodeShow" v-text="identCodeTime + 's'"></span>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="personal.emStatus===2" v-text="personal.emText"></span></Col>
            </Row>
          </div>
          <div class="_password">
            <Row>
              <Col span="8" offset="4" class="_label">密码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input :type="personal.password.showPass === true?'text':'password'" class="_input" v-model="personal.password.text">
                <Icon size="22" class="hand _icon" :type="personal.password.showPass === true?'eye':'eye-disabled'" @click="resShowPass('personal','password')"></Icon>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="personal.emStatus===3" v-text="personal.emText"></span></Col>
            </Row>
          </div>
          <div class="_vPassword">
            <Row>
              <Col span="8" offset="4" class="_label">确认密码</Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_labelFor">
                <input :type="personal.vPassword.showPass === true?'text':'password'" class="_input" v-model="personal.vPassword.text">
                <Icon size="22" class="hand _icon" :type="personal.vPassword.showPass === true?'eye':'eye-disabled'" @click="resShowPass('personal','vPassword')"></Icon>
              </Col>
            </Row>
            <Row>
              <Col span="16" offset="4" class="_em"><span v-show="personal.emStatus===4" v-text="personal.emText"></span></Col>
            </Row>
          </div>
        </div>
        <Row class="pb10 pt20">
          <Col span="24" class="tc"><button class="_registerBtn" :class="{'_disabled':registerBtn}" v-bind:disabled="registerBtn" @click="resRegister">注 册</button></Col>
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
  name: 'register',
  components: { headTop },
  data () {
    return {
      registerType: true,
      registerBtn: true,
      identCodeBtn: true,
      identCodeTime: 30,
      identCodeShow: false,
      codeTimeOut: null,
      company: {
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
      },
      personal: {
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
    resChange (type) {
      if (type === 'company') {
        if (this.registerType !== true) {
          this.registerType = !this.registerType
          this.personal.phone = ''
          this.personal.identCode = ''
          this.personal.password.text = ''
          this.personal.password.showPass = false
          this.personal.vPassword.text = ''
          this.personal.vPassword.showPass = false
          this.personal.emStatus = 0
          this.personal.emText = ''
          if (this.codeTimeOut !== null) {
            clearTimeout(this.codeTimeOut)
          }
          this.registerBtn = true
          this.identCodeBtn = true
          this.identCodeShow = false
        }
      } else if (type === 'personal') {
        if (this.registerType !== false) {
          this.registerType = !this.registerType
          this.company.phone = ''
          this.company.identCode = ''
          this.company.password.text = ''
          this.company.password.showPass = false
          this.company.vPassword.text = ''
          this.company.vPassword.showPass = false
          this.company.emStatus = 0
          this.company.emText = ''
          if (this.codeTimeOut !== null) {
            clearTimeout(this.codeTimeOut)
          }
          this.registerBtn = true
          this.identCodeBtn = true
          this.identCodeShow = false
        }
      }
    },
    resShowPass (type, val) {
      this[type][val].showPass = !this[type][val].showPass
    },
    resCheckPhone () {
      let type = ''
      if (this.registerType) {
        type = 'company'
      } else {
        type = 'personal'
      }
      if (!setRegExp(this[type].phone, 'phone')) {
        this[type].emStatus = 1
        this[type].emText = '手机号码格式不正确'
      } else {
        axios.post('/checkPhone', {
          phone: this[type].phone
        }).then(res => {
          if (res.data.data === 1) {
            this.registerBtn = true
            this[type].emStatus = 1
            this[type].emText = '此手机号码已经注册过,您可直接登录,如忘记密码返回点击找回'
            this.identCodeBtn = true
          } else {
            this.registerBtn = false
            this[type].emStatus = 0
            this[type].emText = ''
            this.identCodeBtn = false
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
    resIdentCode () {
      this.identCodeTime = 30
      this.identCodeShow = true
      this.identCodeBtn = true
      this.timeOut()
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
    resRegister () {
      let type = ''
      if (this.registerType) {
        type = 'company'
      } else {
        type = 'personal'
      }
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
        this[type].emText = '密码长度6~20位,只能包含数字,字母,下划线'
      } else if (this[type].vPassword.text === '') {
        this[type].emStatus = 4
        this[type].emText = '请再次输入密码'
      } else if (this[type].password.text !== this[type].vPassword.text) {
        this[type].emStatus = 4
        this[type].emText = '俩次输入密码不一致'
      } else {
        this[type].emStatus = 0
        this[type].emText = ''
        console.log('注册')
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
    ._selectBtn {
      @include hand;
      background: #fff;
      padding:10px 10px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      position: relative;
      ._icon {
        position:absolute;
        left: 30px;
        top: 14px;
        color: #fff;
      }
    }
    ._selectBtn._active {
      @include boxShadow(0 1px 6px -1px #bbb);
      background: #126EAE;
      color: #fff;
    }
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
