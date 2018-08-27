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
              <Col span="24" class="_em"><span></span></Col>
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
              <Col span="24" class="_label">送达邮箱</Col>
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
              <Col span="24" class="_em"><span></span></Col>
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
              <Col span="24" class="_em"><span></span></Col>
            </Row>
          </Col>
          <Col span="10" offset="2">
            <Row class="_labelFor">
              <Col span="24" class="_label">法定人姓名<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.legal"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===223" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
              <Col span="24">
                <Select v-model="userAInfo.idcardType">
                  <Option v-for="item in idcardList" :value="item.value" :key="item.value" v-text="item.label"></Option>
                </Select>
              </Col>
              <Col span="24" class="_em"><span></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
              <Col span="24" class="_input"><input type="text" v-model="userAInfo.idcard"></Col>
              <Col span="24" class="_em"><span v-show="emInfo.status===225" v-text="emInfo.text"></span></Col>
            </Row>
            <Row class="_labelFor">
              <Col span="24" class="_label">公司人数<b class="_b">*</b></Col>
              <Col span="24">
                <Select v-model="userAInfo.scale">
                  <Option v-for="item in scaleList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </Col>
              <Col span="24" class="_em"><span></span></Col>
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

export default {
  name: 'verify_a_info',
  props: [ 'userType' ],
  data () {
    return {
      uploadUrl: '',
      uploadData: null,
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
    } else if (this.userType === 2) {
      this.dictionary()
      this.uploadUrl = '/api/person/perfect/company/1'
      this.userAInfo = this.userAInfoB
      this.fileObj = this.fileObjB
    }
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
      // 记录个数 然后全部成功后 返回正在审核
      console.log(res)
    },
    resError (e, file) {
      // 记录个数 然后失败后重新上传
      console.log(e)
    },
    cancClick () {
      if (this.userType === 1) {
        this.fileObj = this.fileObjA
        this.$refs._formA.reset()
      } else if (this.userType === 2) {
        this.fileObj = this.fileObjB
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
      // console.log('regExg')
      this.uploadData = this.userAInfo
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
