<template>
  <div class="pr _addAgenInfo">
    <Row>
      <Col span="10" offset="1">
        <Row class="_labelFor">
          <Col span="24" class="_label">姓名<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model.trim="agenData.name"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===11" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">民族<b class="_b">*</b></Col>
          <Col span="24">
            <Select v-model="agenData.nation">
              <Option v-for="item in nationList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===12" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
          <Col span="24">
            <Select v-model="agenData.idcardType">
              <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===13" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model.trim="agenData.idcard"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===14" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">工作单位<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model.trim="agenData.organization"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===15" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
      <Col span="10" offset="2">
        <Row class="_labelFor">
          <Col span="24" class="_label">性别<b class="_b">*</b></Col>
          <Col span="24" class="_inputR">
            <RadioGroup v-model="agenData.sex">
              <Radio :label="1">男</Radio>
              <Radio :label="2">女</Radio>
            </RadioGroup>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===21" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">委托人<b class="_b">*</b></Col>
          <Col span="24">
            <Select v-model="agenData.propId">
              <Option v-for="item in propArrName" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===22" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model.trim="agenData.phone"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===23" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">送达邮箱<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model.trim="agenData.email"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===24" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">联系地址<b class="_b">*</b></Col>
          <Col span="24" class="_input"><input type="text" v-model.trim="agenData.address"></Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===25" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
    </Row>
      <add-agen-appl-book :caseId="caseId" :fileType="['jpg','jpeg','png','pdf']" :uploadUrl="uploadUrl" :uploadFileUrl="uploadFileUrl" @saveClick="addApplBookSave" @delFileClick="delFileSave"></add-agen-appl-book>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addAgenBtn}" v-bind:disabled="addAgenBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import addAgenApplBook from '@/page/filing/children/children/addAgenApplBook'
import setRegExp from '@/config/regExp.js'
import regi from '@/config/regiType.js'

export default {
  name: 'add_agen_info',
  components: { addAgenApplBook },
  props: ['caseId', 'propArrName'],
  data () {
    return {
      addBtnSwt: false,
      addAgenBtn: false,
      emInfo: {
        status: 0,
        text: ''
      },
      idcardList: [],
      nationList: [],
      agenData: {
        idcardType: null,
        idcard: '',
        organization: '',
        propId: null,
        phone: '',
        name: '',
        email: '',
        address: '',
        nation: null,
        birthdayStr: '',
        sex: null,
        fileId: null
      }
    }
  },
  created () {
    this.cardList()
  },
  computed: {
    uploadUrl () {
      return '/case/evidenceAdd'
    },
    uploadFileUrl () {
      return regi.api + '/file/upload'
    }
  },
  methods: {
    delFileSave () {
      this.agenData.fileId = null
    },
    addApplBookSave (id) {
      this.agenData.fileId = id
    },
    cardList () {
      axios.all([axios.post('/dictionary/personIdcardType'), axios.post('/dictionary/nationName')]).then(axios.spread((resO, resT) => {
        let _dataOList = resO.data.data
        let _selectO = []
        let _dataTList = resT.data.data
        let _selectT = []
        for (let k in _dataOList) {
          let _o = {}
          _o.value = _dataOList[k].itemValue
          _o.label = _dataOList[k].item
          _selectO.push(_o)
        }
        for (let v in _dataTList) {
          let _t = {}
          _t.value = _dataTList[v].itemValue
          _t.label = _dataTList[v].item
          _selectT.push(_t)
        }
        this.idcardList = _selectO
        this.nationList = _selectT
      })).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    saveClick () {
      if (this.agenData.name === '' || this.agenData.nation === null || this.agenData.idcardType === null || this.agenData.idcard === '' || this.agenData.organization === '' || this.agenData.sex === null || this.agenData.propId === null || this.agenData.phone === '' || this.agenData.email === '' || this.agenData.address === '') {
        if (this.agenData.name === '') {
          this.emInfo.status = 11
          this.emInfo.text = '请输入姓名'
        } else if (this.agenData.nation === null) {
          this.emInfo.status = 12
          this.emInfo.text = '请选择民族'
        } else if (this.agenData.idcardType === null) {
          this.emInfo.status = 13
          this.emInfo.text = '请选择证件类型'
        } else if (this.agenData.idcard === '') {
          this.emInfo.status = 14
          this.emInfo.text = '请输入证件号码'
        } else if (this.agenData.organization === '') {
          this.emInfo.status = 15
          this.emInfo.text = '请输入工作单位'
        } else if (this.agenData.sex === null) {
          this.emInfo.status = 21
          this.emInfo.text = '请选择性别'
        } else if (this.agenData.propId === null) {
          this.emInfo.status = 22
          this.emInfo.text = '请选择委托人'
        } else if (this.agenData.phone === '') {
          this.emInfo.status = 23
          this.emInfo.text = '请输入手机号'
        } else if (this.agenData.email === '') {
          this.emInfo.status = 24
          this.emInfo.text = '请输入邮箱地址'
        } else if (this.agenData.address === '') {
          this.emInfo.status = 25
          this.emInfo.text = '请输入联系地址'
        }
      } else {
        if (!setRegExp(this.agenData.name, 'name')) {
          this.emInfo.status = 11
          this.emInfo.text = '请输入正确姓名格式'
        } else if (!setRegExp(this.agenData.idcard, 'idcard')) {
          this.emInfo.status = 14
          this.emInfo.text = '请输入正确证件号码格式'
        } else if (!setRegExp(this.agenData.organization, 'company')) {
          this.emInfo.status = 15
          this.emInfo.text = '请输入正确单位名称'
        } else if (!setRegExp(this.agenData.phone, 'phone')) {
          this.emInfo.status = 23
          this.emInfo.text = '请输入正确手机格式'
        } else if (!setRegExp(this.agenData.email, 'email')) {
          this.emInfo.status = 24
          this.emInfo.text = '请输入正确邮箱格式'
        } else if (!setRegExp(this.agenData.address, 'address')) {
          this.emInfo.status = 25
          this.emInfo.text = '请输入正确地址格式'
        } else if (this.agenData.fileId === null) {
          this.$Message.error({
            content: '请上传授权委托书',
            duration: 5
          })
        } else {
          this.agenData.birthdayStr = this.agenData.idcard.substr(6, 4) + '-' + this.agenData.idcard.substr(10, 2) + '-' + this.agenData.idcard.substr(12, 2)
          this.emInfo.status = 0
          this.emInfo.text = ''
          this.sendAjax()
        }
      }
    },
    sendAjax () {
      if (this.addBtnSwt) {
        return false
      }
      this.addBtnSwt = true
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
        address: this.agenData.address,
        nation: this.agenData.nation,
        birthdayStr: this.agenData.birthdayStr,
        sex: this.agenData.sex,
        fileId: this.agenData.fileId
      }).then(res => {
        if (res.data.data.fileList === null) {
          res.data.data.fileList = []
        }
        if (typeof res.data.data.propName === 'string') {
          res.data.data.propName = res.data.data.propName - 0
        }
        this.addBtnSwt = false
        this.$emit('saveClick', res.data.data)
      }).catch(e => {
        this.addBtnSwt = false
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
    ._inputR {
      padding: 6px 0;
      border-bottom:1px solid #ddd;
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
