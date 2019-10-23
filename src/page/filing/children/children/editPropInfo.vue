<template>
  <div class="_editPropInfo">
    <Row>
      <Col span="23" offset="1" class="_type">
        <span class="mr20">当事人属性</span>
        <RadioGroup v-model="propData.type" @on-change="changeType">
          <Radio :label="1">自然人</Radio>
          <Radio :label="2">企业</Radio>
          <Radio :label="3">个体户</Radio>
          <Radio :label="4">其他组织</Radio>
        </RadioGroup>
      </Col>
      <Row v-if="propData.type === 1">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">姓名<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===111" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">民族<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.nation">
                <Option v-for="item in nationList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===112" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===113" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===114" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">性别<b class="_b">*</b></Col>
            <Col span="24" class="_inputR">
              <RadioGroup v-model="propData.sex">
                <Radio :label="1">男</Radio>
                <Radio :label="2">女</Radio>
              </RadioGroup>
            </Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===121" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===122" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===123" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===124" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
      <Row v-else-if="propData.type === 2">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">企业名称<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseName" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===211" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.enterpriseType">
                <Option v-for="item in enterpriseList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseIdcard" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===213" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.linkMan"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===214" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===215" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">法定代表人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===221" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型</Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===223" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===224" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===225" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
      <Row v-else-if="propData.type === 3">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">名称<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseName" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===311" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.enterpriseType">
                <Option v-for="item in enterpriseList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseIdcard" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===313" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.linkMan"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===314" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===315" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">经营者</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===321" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型</Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===323" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===324" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===325" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
      <Row v-else-if="propData.type === 4">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">组织名称<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseName" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===411" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.enterpriseType">
                <Option v-for="item in enterpriseList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseIdcard" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===413" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.linkMan"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===414" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===415" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">负责人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===421" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型</Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===423" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===424" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===425" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':editPropBtn}" v-bind:disabled="editPropBtn" @click="saveClick">保 存</button></Col>
    </Row>
    <get-prop-code v-if="propCode" :resPhone="propData.phone" :resEmail="propData.email" :phoneShow="propCodeObj.phoneShow" :emailShow="propCodeObj.emailShow" @alertConfirm="alertSave('propCode', ...arguments)" @alertCancel="alertCanc('propCode')"></get-prop-code>
  </div>
</template>

<script>
import axios from 'axios'
import getPropCode from '@/page/filing/children/children/getPropCode'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'edit_prop_info',
  props: ['editType', 'caseId', 'editPropData'],
  components: { getPropCode },
  data () {
    return {
      addBtnSwt: false,
      editPropBtn: false,
      propCode: false,
      propCodeObj: {
        phoneShow: false,
        emailShow: false,
        fristPhone: '',
        fristEmail: ''
      },
      emInfo: {
        status: 0,
        text: ''
      },
      idcardList: [],
      enterpriseList: [],
      nationList: [],
      propData: JSON.parse(JSON.stringify(this.editPropData))
    }
  },
  created () {
    this.cardList()
    if (this.editType === 1) {
      this.propCodeObj.fristPhone = JSON.parse(JSON.stringify(this.propData.phone))
      this.propCodeObj.fristEmail = JSON.parse(JSON.stringify(this.propData.email))
    }
  },
  methods: {
    cardList () {
      axios.all([axios.post('/dictionary/enterpriseIdcardType'), axios.post('/dictionary/personIdcardType'), axios.post('/dictionary/nationName')]).then(axios.spread((resO, resT, resS) => {
        let _dataOList = resO.data.data
        let _selectO = []
        let _dataTList = resT.data.data
        let _selectT = []
        let _dataSList = resS.data.data
        let _selectS = []
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
        for (let n in _dataSList) {
          let _s = {}
          _s.value = _dataSList[n].itemValue
          _s.label = _dataSList[n].item
          _selectS.push(_s)
        }
        this.enterpriseList = _selectO
        this.idcardList = _selectT
        this.nationList = _selectS
      })).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    changeType () {
      this.propData.idcardType = null
      this.propData.idcard = null
      this.propData.phone = null
      this.propData.name = null
      this.propData.linkMan = null
      this.propData.enterpriseName = null
      this.propData.enterpriseType = null
      this.propData.enterpriseIdcard = null
      this.propData.email = null
      this.propData.address = null
      this.propData.nation = null
      this.propData.birthdayStr = null
      this.propData.sex = null
      this.propData.phoneIdentCode = null
      this.propData.emailIdentCode = null
      this.emInfo = {
        status: 0,
        text: ''
      }
    },
    saveClick () {
      if (this.propData.type === 1) {
        if (this.propData.name === '' || this.propData.nation === null || this.propData.idcardType === null || this.propData.idcard === '' || this.propData.sex === null || this.propData.phone === '' || this.propData.email === '' || this.propData.address === '') {
          if (this.propData.name === '') {
            this.emInfo.status = 111
            this.emInfo.text = '请输入姓名'
          } else if (this.propData.nation === null) {
            this.emInfo.status = 112
            this.emInfo.text = '请选择民族'
          } else if (this.propData.idcardType === null) {
            this.emInfo.status = 113
            this.emInfo.text = '请选择证件类型'
          } else if (this.propData.idcard === '') {
            this.emInfo.status = 114
            this.emInfo.text = '请输入证件号码'
          } else if (this.propData.sex === null) {
            this.emInfo.status = 121
            this.emInfo.text = '请选择性别'
          } else if (this.propData.phone === '') {
            this.emInfo.status = 122
            this.emInfo.text = '请输入手机号'
          } else if (this.propData.email === '') {
            this.emInfo.status = 123
            this.emInfo.text = '请输入邮箱地址'
          } else if (this.propData.address === '') {
            this.emInfo.status = 124
            this.emInfo.text = '请输入联系地址'
          }
        } else {
          if (!setRegExp(this.propData.name, 'name')) {
            this.emInfo.status = 111
            this.emInfo.text = '请输入正确名字格式'
          } else if (!setRegExp(this.propData.idcard, 'idcard')) {
            this.emInfo.status = 114
            this.emInfo.text = '请输入正确证件号码格式'
          } else if (!setRegExp(this.propData.phone, 'phone')) {
            this.emInfo.status = 122
            this.emInfo.text = '请输入正确手机格式'
          } else if (!setRegExp(this.propData.email, 'email')) {
            this.emInfo.status = 123
            this.emInfo.text = '请输入正确邮箱格式'
          } else if (!setRegExp(this.propData.address, 'address')) {
            this.emInfo.status = 124
            this.emInfo.text = '请输入正确地址格式'
          } else {
            this.propData.birthdayStr = this.propData.idcard.substr(6, 4) + '-' + this.propData.idcard.substr(10, 2) + '-' + this.propData.idcard.substr(12, 2)
            this.emInfo.status = 0
            this.emInfo.text = ''
            if (this.editType === 1) {
              this.getCode()
            } else {
              this.sendAjax()
            }
          }
        }
      } else if (this.propData.type === 2) {
        if (this.propData.enterpriseName === '' || this.propData.enterpriseType === null || this.propData.enterpriseIdcard === '' || this.propData.phone === '' || this.propData.email === '' || this.propData.address === '') {
          if (this.propData.enterpriseName === '') {
            this.emInfo.status = 211
            this.emInfo.text = '请输入企业名称'
          } else if (this.propData.enterpriseType === null) {
            this.emInfo.status = 212
            this.emInfo.text = '请选择证照类型'
          } else if (this.propData.enterpriseIdcard === '') {
            this.emInfo.status = 213
            this.emInfo.text = '请输入证照号码'
          } else if (this.propData.phone === '') {
            this.emInfo.status = 215
            this.emInfo.text = '请输入手机号'
          } else if (this.propData.email === '') {
            this.emInfo.status = 224
            this.emInfo.text = '请输入邮箱地址'
          } else if (this.propData.address === '') {
            this.emInfo.status = 225
            this.emInfo.text = '请输入联系地址'
          }
        } else {
          if (!setRegExp(this.propData.enterpriseName, 'company')) {
            this.emInfo.status = 211
            this.emInfo.text = '请输入正确名称格式'
          } else if (!setRegExp(this.propData.enterpriseIdcard, 'entityNo1')) {
            this.emInfo.status = 213
            this.emInfo.text = '请输入正确证件号码格式'
          } else if (!setRegExp(this.propData.phone, 'phone')) {
            this.emInfo.status = 215
            this.emInfo.text = '请输入正确手机格式'
          } else if (!setRegExp(this.propData.email, 'email')) {
            this.emInfo.status = 224
            this.emInfo.text = '请输入正确邮箱格式'
          } else if (!setRegExp(this.propData.address, 'address')) {
            this.emInfo.status = 225
            this.emInfo.text = '请输入正确地址格式'
          } else {
            if (this.propData.name === '' && this.propData.idcardType === null && this.propData.idcard === '') {
              if (this.propData.linkMan !== '' && !setRegExp(this.propData.linkMan, 'name')) {
                this.emInfo.status = 214
                this.emInfo.text = '请输入正确联系人姓名'
              } else {
                this.emInfo.status = 0
                this.emInfo.text = ''
                if (this.editType === 1) {
                  this.getCode()
                } else {
                  this.sendAjax()
                }
              }
            } else {
              if (this.propData.name === '') {
                this.emInfo.status = 221
                this.emInfo.text = '请输入法定代表人姓名'
              } else if (this.propData.idcardType === null) {
                this.emInfo.status = 222
                this.emInfo.text = '请选择证件类型'
              } else if (this.propData.idcard === '') {
                this.emInfo.status = 223
                this.emInfo.text = '请输入证件号码'
              } else if (!setRegExp(this.propData.name, 'name')) {
                this.emInfo.status = 221
                this.emInfo.text = '请输入正确名字格式'
              } else if (!setRegExp(this.propData.idcard, 'idcard')) {
                this.emInfo.status = 223
                this.emInfo.text = '请输入正确证件号码格式'
              } else if (this.propData.linkMan !== '' && !setRegExp(this.propData.linkMan, 'name')) {
                this.emInfo.status = 214
                this.emInfo.text = '请输入正确联系人姓名'
              } else {
                this.emInfo.status = 0
                this.emInfo.text = ''
                if (this.editType === 1) {
                  this.getCode()
                } else {
                  this.sendAjax()
                }
              }
            }
          }
        }
      } else if (this.propData.type === 3) {
        if (this.propData.enterpriseName === '' || this.propData.enterpriseType === null || this.propData.enterpriseIdcard === '' || this.propData.phone === '' || this.propData.email === '' || this.propData.address === '') {
          if (this.propData.enterpriseName === '') {
            this.emInfo.status = 311
            this.emInfo.text = '请输入名称'
          } else if (this.propData.enterpriseType === null) {
            this.emInfo.status = 312
            this.emInfo.text = '请选择证照类型'
          } else if (this.propData.enterpriseIdcard === '') {
            this.emInfo.status = 313
            this.emInfo.text = '请输入证照号码'
          } else if (this.propData.phone === '') {
            this.emInfo.status = 315
            this.emInfo.text = '请输入手机号'
          } else if (this.propData.email === '') {
            this.emInfo.status = 324
            this.emInfo.text = '请输入邮箱地址'
          } else if (this.propData.address === '') {
            this.emInfo.status = 325
            this.emInfo.text = '请输入联系地址'
          }
        } else {
          if (!setRegExp(this.propData.enterpriseName, 'company')) {
            this.emInfo.status = 311
            this.emInfo.text = '请输入正确名称格式'
          } else if (!setRegExp(this.propData.enterpriseIdcard, 'entityNo1')) {
            this.emInfo.status = 313
            this.emInfo.text = '请输入正确证件号码格式'
          } else if (!setRegExp(this.propData.phone, 'phone')) {
            this.emInfo.status = 315
            this.emInfo.text = '请输入正确手机格式'
          } else if (!setRegExp(this.propData.email, 'email')) {
            this.emInfo.status = 324
            this.emInfo.text = '请输入正确邮箱格式'
          } else if (!setRegExp(this.propData.address, 'address')) {
            this.emInfo.status = 325
            this.emInfo.text = '请输入正确地址格式'
          } else {
            if (this.propData.name === '' && this.propData.idcardType === null && this.propData.idcard === '') {
              if (this.propData.linkMan !== '' && !setRegExp(this.propData.linkMan, 'name')) {
                this.emInfo.status = 314
                this.emInfo.text = '请输入正确联系人姓名'
              } else {
                this.emInfo.status = 0
                this.emInfo.text = ''
                if (this.editType === 1) {
                  this.getCode()
                } else {
                  this.sendAjax()
                }
              }
            } else {
              if (this.propData.name === '') {
                this.emInfo.status = 321
                this.emInfo.text = '请输入经营者姓名'
              } else if (this.propData.idcardType === null) {
                this.emInfo.status = 322
                this.emInfo.text = '请选择证件类型'
              } else if (this.propData.idcard === '') {
                this.emInfo.status = 323
                this.emInfo.text = '请输入证件号码'
              } else if (!setRegExp(this.propData.name, 'name')) {
                this.emInfo.status = 321
                this.emInfo.text = '请输入正确名字格式'
              } else if (!setRegExp(this.propData.idcard, 'idcard')) {
                this.emInfo.status = 323
                this.emInfo.text = '请输入正确证件号码格式'
              } else if (this.propData.linkMan !== '' && !setRegExp(this.propData.linkMan, 'name')) {
                this.emInfo.status = 314
                this.emInfo.text = '请输入正确联系人姓名'
              } else {
                this.emInfo.status = 0
                this.emInfo.text = ''
                if (this.editType === 1) {
                  this.getCode()
                } else {
                  this.sendAjax()
                }
              }
            }
          }
        }
      } else if (this.propData.type === 4) {
        if (this.propData.enterpriseName === '' || this.propData.enterpriseType === null || this.propData.enterpriseIdcard === '' || this.propData.phone === '' || this.propData.email === '' || this.propData.address === '') {
          if (this.propData.enterpriseName === '') {
            this.emInfo.status = 411
            this.emInfo.text = '请输入企业名称'
          } else if (this.propData.enterpriseType === null) {
            this.emInfo.status = 412
            this.emInfo.text = '请选择证照类型'
          } else if (this.propData.enterpriseIdcard === '') {
            this.emInfo.status = 413
            this.emInfo.text = '请输入证照号码'
          } else if (this.propData.phone === '') {
            this.emInfo.status = 415
            this.emInfo.text = '请输入手机号'
          } else if (this.propData.email === '') {
            this.emInfo.status = 424
            this.emInfo.text = '请输入邮箱地址'
          } else if (this.propData.address === '') {
            this.emInfo.status = 425
            this.emInfo.text = '请输入联系地址'
          }
        } else {
          if (!setRegExp(this.propData.enterpriseName, 'company')) {
            this.emInfo.status = 411
            this.emInfo.text = '请输入正确名称格式'
          } else if (!setRegExp(this.propData.enterpriseIdcard, 'entityNo1')) {
            this.emInfo.status = 413
            this.emInfo.text = '请输入正确证件号码格式'
          } else if (!setRegExp(this.propData.phone, 'phone')) {
            this.emInfo.status = 415
            this.emInfo.text = '请输入正确手机格式'
          } else if (!setRegExp(this.propData.email, 'email')) {
            this.emInfo.status = 424
            this.emInfo.text = '请输入正确邮箱格式'
          } else if (!setRegExp(this.propData.address, 'address')) {
            this.emInfo.status = 425
            this.emInfo.text = '请输入正确地址格式'
          } else {
            if (this.propData.name === '' && this.propData.idcardType === null && this.propData.idcard === '') {
              if (this.propData.linkMan !== '' && !setRegExp(this.propData.linkMan, 'name')) {
                this.emInfo.status = 414
                this.emInfo.text = '请输入正确联系人姓名'
              } else {
                this.emInfo.status = 0
                this.emInfo.text = ''
                if (this.editType === 1) {
                  this.getCode()
                } else {
                  this.sendAjax()
                }
              }
            } else {
              if (this.propData.name === '') {
                this.emInfo.status = 421
                this.emInfo.text = '请输入负责人姓名'
              } else if (this.propData.idcardType === null) {
                this.emInfo.status = 422
                this.emInfo.text = '请选择证件类型'
              } else if (this.propData.idcard === '') {
                this.emInfo.status = 423
                this.emInfo.text = '请输入证件号码'
              } else if (!setRegExp(this.propData.name, 'name')) {
                this.emInfo.status = 421
                this.emInfo.text = '请输入正确名字格式'
              } else if (!setRegExp(this.propData.idcard, 'idcard')) {
                this.emInfo.status = 423
                this.emInfo.text = '请输入正确证件号码格式'
              } else if (this.propData.linkMan !== '' && !setRegExp(this.propData.linkMan, 'name')) {
                this.emInfo.status = 414
                this.emInfo.text = '请输入正确联系人姓名'
              } else {
                this.emInfo.status = 0
                this.emInfo.text = ''
                if (this.editType === 1) {
                  this.getCode()
                } else {
                  this.sendAjax()
                }
              }
            }
          }
        }
      }
    },
    getCode () {
      if (this.propCodeObj.fristPhone === this.propData.phone && this.propCodeObj.fristEmail === this.propData.email) {
        this.propData.phoneIdentCode = null
        this.propData.emailIdentCode = null
        this.sendAjax()
      } else {
        if (this.propCodeObj.fristPhone !== this.propData.phone) {
          this.propCodeObj.phoneShow = true
        } else {
          this.propCodeObj.phoneShow = false
        }
        if (this.propCodeObj.fristEmail !== this.propData.email) {
          this.propCodeObj.emailShow = true
        } else {
          this.propCodeObj.emailShow = false
        }
        this.propCode = true
      }
    },
    alertSave (type, ...val) {
      switch (type) {
        case 'propCode':
          this.propData.phoneIdentCode = val[0].phoneCode === '' ? null : val[0].phoneCode
          this.propData.emailIdentCode = val[0].emailCode === '' ? null : val[0].emailCode
          this.propCode = false
          this.sendAjax()
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'propCode':
          this.propCode = false
          break
      }
    },
    sendAjax () {
      if (this.addBtnSwt) {
        return false
      }
      this.addBtnSwt = true
      axios.post('/party/update/' + this.editType, {
        caseId: this.caseId,
        id: this.propData.id,
        type: this.propData.type,
        idcardType: this.propData.idcardType,
        idcard: this.propData.idcard,
        phone: this.propData.phone,
        name: this.propData.name,
        linkMan: this.propData.linkMan,
        enterpriseName: this.propData.enterpriseName,
        enterpriseType: this.propData.enterpriseType,
        enterpriseIdcard: this.propData.enterpriseIdcard,
        email: this.propData.email,
        address: this.propData.address,
        nation: this.propData.nation,
        birthdayStr: this.propData.birthdayStr,
        sex: this.propData.sex,
        phoneIdentCode: this.propData.phoneIdentCode,
        emailIdentCode: this.propData.emailIdentCode
      }).then(res => {
        this.$emit('saveClick', res.data.data)
        this.addBtnSwt = false
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
._editPropInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 12px;
  ._type {
    margin-bottom: 10px;
    height: 24px;
    line-height: 24px;
  }
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
