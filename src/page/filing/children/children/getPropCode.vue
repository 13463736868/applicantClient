<template>
  <div class="resUpdatPhone">
    <alert-btn-info :alertShow="alertShow" @alertConfirm="alertSave" @alertCancel="alertCanc" alertTitle="操作">
      <Row class="_labelFor" v-if="phoneShow">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>手机号（验证）：</b></p>
        </Col>
        <Col span="16">
          <p v-text="resPhone"></p>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="phoneShow">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>验证码：</b></p>
        </Col>
        <Col span="8">
          <Input v-model.trim="resData.phoneCode"></Input>
        </Col>
        <Col span="8">
          <button class="_phoneCodeBtn" :class="{'_disabled':phoneCodeBtn}" v-bind:disabled="phoneCodeBtn" @click="resCode('phone', resPhone)">获 取</button>
          <span class="_phoneCodeTime" v-show="phoneCodeShow" v-text="phoneCodeTime + 's'"></span>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="emailShow">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>送达邮箱（验证）：</b></p>
        </Col>
        <Col span="16">
          <p v-text="resEmail"></p>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="emailShow">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>邮箱验证码：</b></p>
        </Col>
        <Col span="8">
          <Input v-model.trim="resData.emailCode"></Input>
        </Col>
        <Col span="8">
          <button class="_phoneCodeBtn" :class="{'_disabled':emailCodeBtn}" v-bind:disabled="emailCodeBtn" @click="resCode('email', resEmail)">获 取</button>
          <span class="_phoneCodeTime" v-show="emailCodeShow" v-text="emailCodeTime + 's'"></span>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>
<script>
import axios from 'axios'
import alertBtnInfo from '@/components/common/alertBtnInfo'
import { resMess } from '@/components/common/mixin.js'

export default {
  name: 'resUpdatPhone',
  mixins: [resMess],
  props: ['resPhone', 'resEmail', 'phoneShow', 'emailShow'],
  components: { alertBtnInfo },
  data () {
    return {
      alertShow: true,
      phoneCodeBtn: true,
      phoneCodeTime: 60,
      phoneCodeShow: false,
      phoneTimeOut: null,
      emailCodeBtn: true,
      emailCodeTime: 60,
      emailCodeShow: false,
      emailTimeOut: null,
      resData: {
        phoneCode: '',
        emailCode: ''
      }
    }
  },
  created () {
    if (this.phoneShow) {
      this.phoneCodeBtn = false
    }
    if (this.emailShow) {
      this.emailCodeBtn = false
    }
  },
  methods: {
    resCode (type, val) {
      axios.post('/sendMessage', {
        phone: val
      }).then(res => {
        if (type === 'phone') {
          this.phoneCodeTime = 60
          this.phoneCodeShow = true
          this.phoneCodeBtn = true
          this.timeOutP()
        } else {
          this.emailCodeTime = 60
          this.emailCodeShow = true
          this.emailCodeBtn = true
          this.timeOutE()
        }
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e + ' 稍后再试')
      })
    },
    timeOutP () {
      this.phoneTimeOut = setTimeout(() => {
        if (this.phoneCodeTime === 0) {
          clearTimeout(this.phoneTimeOut)
          this.phoneCodeBtn = false
          this.phoneCodeShow = false
          return
        }
        this.phoneCodeTime--
        this.timeOutP()
      }, 1000)
    },
    timeOutE () {
      this.emailTimeOut = setTimeout(() => {
        if (this.emailCodeTime === 0) {
          clearTimeout(this.emailTimeOut)
          this.emailCodeBtn = false
          this.emailCodeShow = false
          return
        }
        this.emailCodeTime--
        this.timeOutE()
      }, 1000)
    },
    alertSave () {
      if (this.phoneShow && this.resData.phoneCode === '') {
        this.resMessage('error', '请输入短信验证码')
      } else if (this.emailShow && this.resData.emailCode === '') {
        this.resMessage('error', '请输入邮件验证码')
      } else {
        this.$emit('alertConfirm', this.resData)
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
._phoneCodeBtn {
  @include btn(#126eaf, 70px, 14px, 32px);
  @include boxShadow(0 1px 6px -1px #bbb);
  @include borderRadius(3px);
  float: right;
}
._phoneCodeBtn._disabled {
  @include btn(#ccc, 70px, 14px, 32px);
}
._phoneCodeTime {
  float: right;
  height: 32px;
  line-height: 32px;
  margin-right: 10px;
  color: #ff7a7a;
}
</style>
