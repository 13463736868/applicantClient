<template>
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
      <div class="_phone">
        <Row>
          <Col span="8" offset="4" class="_label">证件类型</Col>
        </Row>
        <Row>
          <Col span="16" offset="4" class="_labelFor">
            <Select v-model="forget.idcardType">
              <Option :value="0">身份证</Option>
              <Option :value="1">户口薄</Option>
              <Option :value="2">营业执照</Option>
              <Option :value="3">护照</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div class="_phone">
        <Row>
          <Col span="8" offset="4" class="_label">证件号码</Col>
        </Row>
        <Row>
          <Col span="16" offset="4" class="_labelFor"><input type="text" class="_input" v-model.trim="forget.idCard" @blur="idCardBlur"></Col>
        </Row>
        <Row>
          <Col span="16" offset="4" class="_em"><span v-show="forget.emStatus===3" v-text="forget.emText"></span></Col>
        </Row>
      </div>
      <div class="_phone">
        <Row>
          <Col span="8" offset="4" class="_label">案号</Col>
        </Row>
        <Row>
          <Col span="16" offset="4" class="_labelFor"><input type="text" class="_input" v-model.trim="forget.caseId"></Col>
        </Row>
        <Row>
          <Col span="16" offset="4" class="_em"><span v-show="forget.emStatus===4" v-text="forget.emText"></span></Col>
        </Row>
      </div>
    </div>
    <Row class="pb10 pt20">
      <Col span="24" class="tc"><button class="_registerBtn" :class="{'_disabled':forgetBtns}" v-bind:disabled="forgetBtns" @click="resForget">确 定</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'fileReq',
  data () {
    return {
      dispSwitch: false,
      forgetBtn: true,
      identCodeBtn: true,
      identCodeTime: 30,
      identCodeShow: false,
      codeTimeOut: null,
      forget: {
        phone: '',
        identCode: '',
        idcardType: 0,
        idCard: '',
        caseId: '',
        emStatus: 0,
        emText: ''
      }
    }
  },
  computed: {
    forgetBtns () {
      if (this.forgetBtn || this.forget.phone === '' || this.forget.identCode === '' || this.forget.idCard === '' || this.forget.caseId === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    resCheckPhone () {
      let type = 'forget'
      if (!setRegExp(this[type].phone, 'phone')) {
        this[type].emStatus = 1
        this[type].emText = '手机号码格式不正确'
        this.forgetBtn = true
        this.identCodeBtn = true
        this.identCodeShow = false
      } else {
        this.forgetBtn = false
        this[type].emStatus = 0
        this[type].emText = ''
        this.identCodeBtn = false
      }
    },
    resIdentCode () {
      if (this.dispSwitch) {
        return false
      }
      this.dispSwitch = true
      axios.post('/sendMessage', {
        phone: this.forget.phone
      }).then(res => {
        this.dispSwitch = false
        this.identCodeTime = 60
        this.identCodeShow = true
        this.identCodeBtn = true
        this.timeOut()
      }).catch(e => {
        this.dispSwitch = false
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
    idCardBlur () {
      let type = 'forget'
      if (this[type].idCard === '') {
        this[type].emStatus = 3
        this[type].emText = '证件号码不能为空'
      } else if ((this[type].idcardType === 0 || this[type].idcardType === 1) && !setRegExp(this[type].idCard, 'idcard')) {
        this[type].emStatus = 3
        this[type].emText = '证件号码格式不正确'
      } else if ((this[type].idcardType === 2) && !setRegExp(this[type].idCard, 'entityNo1')) {
        this[type].emStatus = 3
        this[type].emText = '证件号码格式不正确'
      } else if ((this[type].idcardType === 3) && !setRegExp(this[type].idCard, 'idcard5xx')) {
        this[type].emStatus = 3
        this[type].emText = '证件号码格式不正确'
      } else {
        this[type].emStatus = 0
        this[type].emText = ''
      }
    },
    resForget () {
      let type = 'forget'
      if (this[type].phone === '') {
        this[type].emStatus = 1
        this[type].emText = '请填写手机号'
      } else if (!setRegExp(this[type].phone, 'phone')) {
        this[type].emStatus = 1
        this[type].emText = '手机号码格式不正确'
      } else if (this[type].idCard === '') {
        this[type].emStatus = 3
        this[type].emText = '请填写证件号码'
      } else if ((this[type].idcardType === 0 || this[type].idcardType === 1) && !setRegExp(this[type].idCard, 'idcard')) {
        this[type].emStatus = 3
        this[type].emText = '证件号码格式不正确'
      } else if ((this[type].idcardType === 2) && !setRegExp(this[type].idCard, 'entityNo1')) {
        this[type].emStatus = 3
        this[type].emText = '证件号码格式不正确'
      } else if (this[type].caseId === '') {
        this[type].emStatus = 2
        this[type].emText = '请填写案号'
      } else {
        this[type].emStatus = 0
        this[type].emText = ''
        axios.post('/file/findCaseFileByCaseId', {
          phone: this.forget.phone,
          code: this.forget.identCode,
          type: this.forget.idcardType + 1,
          idCard: this.forget.idCard,
          caseId: this.forget.caseId
        }).then(res => {
          this.$emit('alertConfirm', res.data.data)
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
@import '../../../style/mixin';
._center_mid {
  @include bc;
  width: 60%;
  min-width: 600px;
  ._phone, ._identCode {
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
</style>
