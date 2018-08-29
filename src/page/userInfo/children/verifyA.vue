<template>
  <div class="verifyAInfo">
    <div class="_aInfo">
      <div class="_top">资料信息</div>
      <div class="_mid">
        <Row v-if="userType === 1">
          <Col span="10" offset="1">
            <Row class="_labelFor">
              <Col span="24" class="_label">真实姓名<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.name"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===111" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
              <Col span="24">
                <Select v-model="userAInfo.idcardType">
                  <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===112" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.idcard"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===113" v-text="emInfo.text"></span></Col>
            </Row>
          </Col>
          <Col span="10" offset="2">
            <Row class="_labelFor">
              <Col span="24" class="_label">性别<b class="_b">*</b></Col>
              <Col span="24" class="_type">
                <RadioGroup v-model="userAInfo.sex">
                  <Radio :label="1">男</Radio>
                  <Radio :label="2">女</Radio>
                </RadioGroup>
              </Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===121" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">联系邮箱</Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.email"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===122" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">联系地址</Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.address"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===123" v-text="emInfo.text"></span></Col>
            </Row>
          </Col>
        </Row>
        <Row v-else-if="userType === 2">
          <Col span="10" offset="1">
            <Row class="_labelFor">
              <Col span="24" class="_label">公司名称<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input v-model="userAInfo.name" type="text"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===211" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">营业执照号码<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input v-model="userAInfo.code" type="text"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===212" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">公司地址<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input v-model="userAInfo.address" type="text"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===213" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">公司行业<b class="_b">*</b></Col>
              <Col span="24">
                <Select v-model="userAInfo.trade">
                  <Option v-for="item in tradeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===214" v-text="emInfo.text"></span></Col>
            </Row>
          </Col>
          <Col span="10" offset="2">
            <Row class="_labelFor">
              <Col span="24" class="_label">法定人姓名<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.legal"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===221" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
              <Col span="24">
                <Select v-model="userAInfo.idcardType">
                  <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===222" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.idcard"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===223" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">公司人数<b class="_b">*</b></Col>
              <Col span="24">
                <Select v-model="userAInfo.scale">
                  <Option v-for="item in scaleList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===224" v-text="emInfo.text"></span></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_aFile">
      <div class="_top">附件信息</div>
      <div class="_mid">
        <Row v-if="userType === 1">
          <form ref="_formA">
            <Col span="10" offset="1">
              <img class="_imgA" :src="imgUrl.fileA" ref="fileA">
              <input type="file" class="_file" @change="fileAChange" accept="image/*">
            </Col>
            <Col span="10" offset="2">
              <img class="_imgB" :src="imgUrl.fileB" ref="fileB">
              <input type="file" class="_file" @change="fileBChange" accept="image/*">
            </Col>
            <Col class="pt20" span="10" offset="7" ref="fileC">
              <img class="_imgC" :src="imgUrl.fileC">
              <input type="file" class="_file" @change="fileCChange" accept="image/*">
            </Col>
          </form>
        </Row>
        <Row v-else-if="userType === 2">
          <form ref="_formB">
            <Col span="10" offset="1">
              <img class="_imgA" :src="imgUrl.fileA" ref="fileA">
              <input type="file" class="_file" @change="fileAChange" accept="image/*">
            </Col>
            <Col span="10" offset="2">
              <img class="_imgB" :src="imgUrl.fileB" ref="fileB">
              <input type="file" class="_file" @change="fileBChange" accept="image/*">
            </Col>
            <Col class="pt20" span="10" offset="1" ref="fileC">
              <img class="_imgC" :src="imgUrl.fileC">
              <input type="file" class="_file" @change="fileCChange" accept="image/*">
            </Col>
            <Col class="pt20" span="10" offset="2" ref="fileD">
              <img class="_imgD" :src="imgUrl.fileD">
              <input type="file" class="_file" @change="fileDChange" accept="image/*">
            </Col>
          </form>
        </Row>
        <Upload
          ref="upload"
          name="file"
          type="drag"
          :action="uploadUrl"
          :with-credentials="true"
          :show-upload-list="false"
          :data="uploadData"
          :on-success="resSuccess"
          :on-error="resError"
          ></Upload>
      </div>
    </div>
    <Row class="pb30">
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">重 置</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addInfoBtn}" v-bind:disabled="addInfoBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'verify_a_info',
  props: [ 'userType' ],
  data () {
    return {
      uploadUrl: '',
      uploadNum: 0,
      addInfoBtn: false,
      emInfo: {
        status: 0,
        text: ''
      },
      idcardList: [],
      tradeList: [],
      scaleList: [],
      userAInfo: {},
      userAInfoA: {
        name: '',
        idcardType: null,
        idcard: '',
        address: '',
        sex: null,
        birthdayString: '',
        email: ''
      },
      userAInfoB: {
        name: '',
        code: '',
        address: '',
        trade: null,
        scale: null,
        contacts: '',
        legal: '',
        idcardType: null,
        idcard: '',
        email: ''
      },
      fileObj: {},
      fileObjA: {
        fileA: null,
        fileB: null,
        fileC: null
      },
      fileObjB: {
        fileA: null,
        fileB: null,
        fileC: null,
        fileD: null
      },
      imgUrl: {
        fileA: '../../../static/images/idcardF.png',
        fileB: '../../../static/images/idcardB.png',
        fileC: '../../../static/images/idcardP.png',
        fileD: '../../../static/images/enterpriseCard.png'
      }
    }
  },
  created () {
    this.cardList()
    if (this.userType === 1) {
      this.uploadUrl = '/api/person/perfect/1'
      this.userAInfo = this.userAInfoA
      this.fileObj = this.fileObjA
      this.uploadNum = 3
    } else if (this.userType === 2) {
      this.dictionary()
      this.uploadUrl = '/api/person/perfect/company/1'
      this.userAInfo = this.userAInfoB
      this.fileObj = this.fileObjB
      this.uploadNum = 4
    }
  },
  computed: {
    uploadData () {
      return this.userAInfo
    }
  },
  methods: {
    ...mapActions([
      'setUserState'
    ]),
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
    dictionary () {
      axios.all([axios.post('/dictionary/tradeType'), axios.post('/dictionary/companyNumber')]).then(axios.spread((resO, resT) => {
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
        this.tradeList = _selectO
        this.scaleList = _selectT
      })).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    readerF (type) {
      if (window.FileReader) {
        let _this = this
        let _reader = new FileReader()
        _reader.readAsDataURL(this.fileObj[type])
        _reader.onload = () => {
          _this.imgUrl[type] = _reader.result
        }
      }
    },
    fileAChange (e) {
      let _file = e.target.files[0]
      if (e.target.files.length <= 0) {
      } else if (_file.type.indexOf('image/') === -1) {
        this.$Message.error({
          content: '请重新选择,文件类型必须是图片',
          duration: 2
        })
      } else if (_file.size > 2097152) {
        this.$Message.error({
          content: '请修改文件大小,文件不能超过2MB',
          duration: 2
        })
      } else {
        this.fileObj.fileA = _file
        this.readerF('fileA')
      }
    },
    fileBChange (e) {
      let _file = e.target.files[0]
      if (e.target.files.length <= 0) {
      } else if (_file.type.indexOf('image/') === -1) {
        this.$Message.error({
          content: '请重新选择,文件类型必须是图片',
          duration: 2
        })
      } else if (_file.size > 2097152) {
        this.$Message.error({
          content: '请修改文件大小,文件不能超过2MB',
          duration: 2
        })
      } else {
        this.fileObj.fileB = _file
        this.readerF('fileB')
      }
    },
    fileCChange (e) {
      let _file = e.target.files[0]
      if (e.target.files.length <= 0) {
      } else if (_file.type.indexOf('image/') === -1) {
        this.$Message.error({
          content: '请重新选择,文件类型必须是图片',
          duration: 2
        })
      } else if (_file.size > 2097152) {
        this.$Message.error({
          content: '请修改文件大小,文件不能超过2MB',
          duration: 2
        })
      } else {
        this.fileObj.fileC = _file
        this.readerF('fileC')
      }
    },
    fileDChange (e) {
      let _file = e.target.files[0]
      if (e.target.files.length <= 0) {
      } else if (_file.type.indexOf('image/') === -1) {
        this.$Message.error({
          content: '请重新选择,文件类型必须是图片',
          duration: 2
        })
      } else if (_file.size > 2097152) {
        this.$Message.error({
          content: '请修改文件大小,文件不能超过2MB',
          duration: 2
        })
      } else {
        this.fileObj.fileD = _file
        this.readerF('fileD')
      }
    },
    resSuccess (res, file) {
      this.uploadNum--
      if (this.uploadNum === 0) {
        if (res.flag === false) {
          this.$Message.error({
            content: '错误信息:' + res.message + '',
            duration: 5
          })
        } else {
          this.$Message.success({
            content: '文件上传成功',
            duration: 2
          })
          let _data = {}
          _data.userType = res.data.data.userType
          _data.userTypeDesc = res.data.data.userTypeDesc
          _data.verify = res.data.data.verify
          _data.verifyDesc = res.data.data.verifyDesc
          if (window.localStorage) {
            let loc = window.localStorage
            loc.setItem('userInfo', JSON.stringify(_data))
          }
          this.setUserInfo(_data)
        }
      }
    },
    resError (e, file) {
      this.uploadNum--
      if (this.uploadNum === 0) {
        this.$Message.error({
          content: '错误信息:' + e.status + ' 稍后再试',
          duration: 5
        })
      }
    },
    cancClick () {
      if (this.userType === 1) {
        this.fileObj = {
          fileA: null,
          fileB: null,
          fileC: null
        }
        this.uploadNum = 3
        this.$refs._formA.reset()
      } else if (this.userType === 2) {
        this.fileObj = {
          fileA: null,
          fileB: null,
          fileC: null,
          fileD: null
        }
        this.uploadNum = 4
        this.$refs._formB.reset()
      }
      this.imgUrl = {
        fileA: '../../../static/images/idcardF.png',
        fileB: '../../../static/images/idcardB.png',
        fileC: '../../../static/images/idcardP.png',
        fileD: '../../../static/images/enterpriseCard.png'
      }
    },
    saveClick () {
      if (this.userType === 1) {
        if (this.userAInfo.name === '' || this.userAInfo.idcardType === null || this.userAInfo.idcard === '' || this.userAInfo.address === '' || this.userAInfo.sex === null || this.userAInfo.email === '') {
          if (this.userAInfo.name === '') {
            this.emInfo.status = 111
            this.emInfo.text = '请输入真实姓名'
          } else if (this.userAInfo.idcardType === null) {
            this.emInfo.status = 112
            this.emInfo.text = '请选择证件类型'
          } else if (this.userAInfo.idcard === '') {
            this.emInfo.status = 113
            this.emInfo.text = '请输入证件号码'
          } else if (this.userAInfo.sex === null) {
            this.emInfo.status = 121
            this.emInfo.text = '请选择性别'
          } else if (this.userAInfo.email === '') {
            this.emInfo.status = 122
            this.emInfo.text = '请输入邮箱地址'
          } else if (this.userAInfo.address === '') {
            this.emInfo.status = 123
            this.emInfo.text = '请输入联系地址'
          }
        } else {
          if (!setRegExp(this.userAInfo.name, 'name')) {
            this.emInfo.status = 111
            this.emInfo.text = '请输入正确名字格式'
          } else if (!setRegExp(this.userAInfo.idcard, 'idcard' + this.userAInfo.idcardType)) {
            this.emInfo.status = 113
            this.emInfo.text = '请输入正确证件号码格式'
          } else if (!setRegExp(this.userAInfo.email, 'email')) {
            this.emInfo.status = 122
            this.emInfo.text = '请输入正确邮箱格式'
          } else if (!setRegExp(this.userAInfo.address, 'address')) {
            this.emInfo.status = 123
            this.emInfo.text = '请输入正确地址格式'
          } else {
            this.emInfo.status = 0
            this.emInfo.text = ''
            this.sendAjax()
          }
        }
      } else if (this.userType === 2) {
        if (this.userAInfo.name === '' || this.userAInfo.code === '' || this.userAInfo.address === '' || this.userAInfo.trade === null || this.userAInfo.legal === '' || this.userAInfo.idcardType === null || this.userAInfo.idcard === '' || this.userAInfo.scale === null) {
          if (this.userAInfo.name === '') {
            this.emInfo.status = 211
            this.emInfo.text = '请输入公司名称'
          } else if (this.userAInfo.code === '') {
            this.emInfo.status = 212
            this.emInfo.text = '请输入营业执照号码'
          } else if (this.userAInfo.address === '') {
            this.emInfo.status = 213
            this.emInfo.text = '请输入公司地址'
          } else if (this.userAInfo.trade === null) {
            this.emInfo.status = 214
            this.emInfo.text = '请选择公司行业'
          } else if (this.userAInfo.legal === '') {
            this.emInfo.status = 221
            this.emInfo.text = '请输入法定人姓名'
          } else if (this.userAInfo.idcardType === null) {
            this.emInfo.status = 222
            this.emInfo.text = '请选择证件类型'
          } else if (this.userAInfo.idcard === '') {
            this.emInfo.status = 223
            this.emInfo.text = '请输入证件号码'
          } else if (this.userAInfo.scale === null) {
            this.emInfo.status = 224
            this.emInfo.text = '请选择公司人数'
          }
        } else {
          if (!setRegExp(this.userAInfo.name, 'company')) {
            this.emInfo.status = 211
            this.emInfo.text = '请输入正确公司名称格式'
          } else if (!setRegExp(this.userAInfo.code, 'entityNo1')) {
            this.emInfo.status = 212
            this.emInfo.text = '请输入正确营业执照格式'
          } else if (!setRegExp(this.userAInfo.address, 'address')) {
            this.emInfo.status = 213
            this.emInfo.text = '请输入正确地址格式'
          } else if (!setRegExp(this.userAInfo.legal, 'name')) {
            this.emInfo.status = 221
            this.emInfo.text = '请输入正确名字格式'
          } else if (!setRegExp(this.userAInfo.idcard, 'idcard' + this.userAInfo.idcardType)) {
            this.emInfo.status = 223
            this.emInfo.text = '请输入正确证件号码格式'
          } else {
            this.emInfo.status = 0
            this.emInfo.text = ''
            this.sendAjax()
          }
        }
      }
    },
    sendAjax () {
      if (this.userType === 1) {
        this.uploadNum = 3
      } else if (this.userType === 2) {
        this.uploadNum = 4
      }
      for (let k in this.fileObj) {
        if (this.fileObj[k] === null) {
          this.$Message.warning({
            content: '附件信息不能为空',
            duration: 5
          })
          return
        }
      }
      for (let k in this.fileObj) {
        let item = this.fileObj[k]
        this.$refs.upload.post(item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.verifyAInfo {
  ._aFile {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._aInfo ._top, ._aFile ._top {
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._aInfo ._mid, ._aFile ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 20px 10px;
  }
  ._aInfo ._mid {
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
      ._type {
        height: 32px;
        line-height: 32px;
        border-bottom:1px solid #ddd;
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
  }
  ._aFile ._mid {
    text-align: center;
    ._imgA, ._imgB {
      width: 303px;
      height: 192px;
    }
    ._imgC, ._imgD {
      width: 303px;
      height: 432px;
    }
    ._file {
      @include center;
      @include hand;
      width: 303px;
      height: 96%;
      opacity: 0;
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
