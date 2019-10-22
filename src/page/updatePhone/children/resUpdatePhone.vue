<template>
  <div class="resUpdatPhone">
    <alert-btn-info :alertShow="alertShow" @alertConfirm="alertSave" @alertCancel="alertCanc" alertTitle="操作">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>旧手机号：</b></p>
        </Col>
        <Col span="16">
          <p v-text="resPhone"></p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>旧密码：</b></p>
        </Col>
        <Col span="16">
          <Input v-model.trim="resData.oldPassword"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>新手机号：</b></p>
        </Col>
        <Col span="16">
          <Input v-model.trim="resData.newPhone" @on-blur="resCheckPhone"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>短信验证码：</b></p>
        </Col>
        <Col span="8">
          <Input v-model.trim="resData.identCode"></Input>
        </Col>
        <Col span="8">
          <button class="_identCodeBtn" :class="{'_disabled':identCodeBtn}" v-bind:disabled="identCodeBtn" @click="resIdentCode">获 取</button>
          <span class="_identCodeTime" v-show="identCodeShow" v-text="identCodeTime + 's'"></span>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>
<script>
import axios from 'axios'
import alertBtnInfo from '@/components/common/alertBtnInfo'
import { resMess } from '@/components/common/mixin.js'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'resUpdatPhone',
  mixins: [resMess],
  props: ['resPhone'],
  components: { alertBtnInfo },
  data () {
    return {
      alertShow: true,
      identCodeBtn: true,
      identCodeTime: 60,
      identCodeShow: false,
      codeTimeOut: null,
      resData: {
        oldPhone: '',
        oldPassword: '',
        newPhone: '',
        newPassword: '',
        identCode: ''
      }
    }
  },
  methods: {
    resCheckPhone () {
      if (this.resData.newPhone === '') {
        return false
      } else if (!setRegExp(this.resData.newPhone, 'phone')) {
        this.resMessage('error', '手机号码格式不正确')
        clearTimeout(this.codeTimeOut)
        this.identCodeTime = 60
        this.identCodeShow = true
        this.identCodeBtn = true
      } else {
        axios.post('/checkPhone', {
          phone: this.user.phone
        }).then(res => {
          if (res.data.data === 0) {
            this.identCodeBtn = false
          } else if (res.data.data === 1) {
            this.resMessage('error', '手机号已存在')
          }
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      }
    },
    resIdentCode () {
      axios.post('/sendMessage', {
        phone: this.resData.newPhone
      }).then(res => {
        this.identCodeTime = 60
        this.identCodeShow = true
        this.identCodeBtn = true
        this.timeOut()
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
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
    alertSave () {
      if (this.resData.oldPassword === '') {
        this.resMessage('error', '请输入旧密码')
      } else if (!setRegExp(this.resData.newPhone, 'phone')) {
        this.resMessage('error', '手机号码格式不正确')
      } else if (this.resData.identCode === '') {
        this.resMessage('error', '请输入短信验证码')
      } else {
        axios.post('/updateAccount', {
          oldPhone: this.resPhone,
          oldPassword: this.resData.oldPassword,
          newPhone: this.resData.newPhone,
          newPassword: this.resData.oldPassword,
          identCode: this.resData.identCode
        }).then(res => {
          this.resMessage('success', '修改成功，请重新登录')
          setTimeout(() => {
            this.$emit('alertConfirm')
          }, 1000)
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      }
    },
    alertCanc () {
      this.$emit('alertCancel')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin';
._labelFor {
  margin-bottom: 10px;
  p {
    padding: 7px 0;
  }
  ._span {
    color: #ff7a7a;
  }
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
</style>
