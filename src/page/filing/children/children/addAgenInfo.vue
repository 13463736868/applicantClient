<template>
  <div class="_addAgenInfo">
    <Row>
      <Col span="10" offset="1">
        <Row class="_labelFor">
          <Col span="24" class="_label">姓名<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model="agenData.name"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===11" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
          <Col span="24">
            <Select v-model="agenData.idcardType">
              <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===12" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model="agenData.idcard"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===13" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">工作单位<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model="agenData.organization"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===14" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
      <Col span="10" offset="2">
        <Row class="_labelFor">
          <Col span="24" class="_label">委托人<b class="_b">*</b></Col>
          <Col span="24">
            <Select v-model="agenData.propId">
              <Option v-for="item in propArrName" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===21" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model="agenData.phone"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===22" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">送达邮箱<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model="agenData.email"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===23" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">联系地址<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model="agenData.address"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===24" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addAgenBtn}" v-bind:disabled="addAgenBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'add_agen_info',
  props: ['caseId', 'propArrName'],
  data () {
    return {
      addAgenBtn: false,
      emInfo: {
        status: 0,
        text: ''
      },
      idcardList: [],
      agenData: {
        idcardType: null,
        idcard: '',
        organization: '',
        propId: null,
        phone: '',
        name: '',
        email: '',
        address: ''
      }
    }
  },
  created () {
    this.cardList()
  },
  methods: {
    cardList () {
      axios.post('/dictionary/personIdcardType').then(res => {
        let _dataList = res.data.data
        let _select = []
        for (let k in _dataList) {
          let _o = {}
          _o.value = _dataList[k].itemValue
          _o.label = _dataList[k].item
          _select.push(_o)
        }
        this.idcardList = _select
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    saveClick () {
      if (this.agenData.name === '' || this.agenData.idcardType === null || this.agenData.idcard === '' || this.agenData.organization === '' || this.agenData.propId === null || this.agenData.phone === '' || this.agenData.email === '' || this.agenData.address === '') {
        if (this.agenData.name === '') {
          this.emInfo.status = 11
          this.emInfo.text = '请输入姓名'
        } else if (this.agenData.idcardType === null) {
          this.emInfo.status = 12
          this.emInfo.text = '请选择证件类型'
        } else if (this.agenData.idcard === '') {
          this.emInfo.status = 13
          this.emInfo.text = '请输入证件号码'
        } else if (this.agenData.organization === '') {
          this.emInfo.status = 14
          this.emInfo.text = '请输入工作单位'
        } else if (this.agenData.propId === null) {
          this.emInfo.status = 21
          this.emInfo.text = '请选择委托人'
        } else if (this.agenData.phone === '') {
          this.emInfo.status = 22
          this.emInfo.text = '请输入手机号'
        } else if (this.agenData.email === '') {
          this.emInfo.status = 23
          this.emInfo.text = '请输入邮箱地址'
        } else if (this.agenData.address === '') {
          this.emInfo.status = 24
          this.emInfo.text = '请输入联系地址'
        }
      } else {
        if (!setRegExp(this.agenData.name, 'name')) {
          this.emInfo.status = 11
          this.emInfo.text = '请输入正确姓名格式'
        } else if (!setRegExp(this.agenData.idcard, 'idcard')) {
          this.emInfo.status = 13
          this.emInfo.text = '请输入正确证件号码格式'
        } else if (!setRegExp(this.agenData.organization, 'company')) {
          this.emInfo.status = 14
          this.emInfo.text = '请输入正确单位名称'
        } else if (!setRegExp(this.agenData.phone, 'phone')) {
          this.emInfo.status = 21
          this.emInfo.text = '请输入正确手机格式'
        } else if (!setRegExp(this.agenData.email, 'email')) {
          this.emInfo.status = 22
          this.emInfo.text = '请输入正确邮箱格式'
        } else if (!setRegExp(this.agenData.address, 'address')) {
          this.emInfo.status = 23
          this.emInfo.text = '请输入正确地址格式'
        } else {
          this.emInfo.status = 0
          this.emInfo.text = ''
          this.sendAjax()
        }
      }
    },
    sendAjax () {
      axios.post('/proxy/add', {
        caseId: this.caseId,
        propId: this.agenData.propId,
        propName: this.agenData.propName,
        idcardType: this.agenData.idcardType,
        idcard: this.agenData.idcard,
        phone: this.agenData.phone,
        name: this.agenData.name,
        organization: this.agenData.organization,
        email: this.agenData.email,
        address: this.agenData.address
      }).then(res => {
        if (res.data.data.fileList === null) {
          res.data.data.fileList = []
        }
        if (typeof res.data.data.propName === 'string') {
          res.data.data.propName = res.data.data.propName - 0
        }
        this.$emit('saveClick', res.data.data)
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    cancClick () {
      this.$emit('cancClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._addAgenInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 12px;
  ._labelFor {
    ._label {
      height: 20px;
      line-height: 20px;
      ._b {
        color: #ff7a7a;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    ._input {
      border-bottom:1px solid #ddd;
      input {
        width: 100%;
        border: none;
        letter-spacing: 1px;
        font-size: 12px;
        color: #666;
        height: 32px;
        line-height: 32px;
        background: transparent;
      }
      input:focus {
        box-shadow: none;
        outline: 0px;
      }
    }
    ._em {
      height: 16px;
      line-height: 16px;
      color: #ff7a7a;
      font-size: 8px;
      span {
        float: right;
      }
    }
  }
  ._cancelBtn {
    @include btn(#fff, 90px, 14px, 32px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
    color: #126eaf;
  }
  ._saveBtn {
    @include btn(#126eaf, 90px, 14px, 32px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
  }
  ._saveBtn._disabled {
    @include btn(#ccc, 90px, 14px, 32px);
  }
  ._cancelBtn:focus,._saveBtn:focus {
    outline: 0px;
  }
}
</style>
