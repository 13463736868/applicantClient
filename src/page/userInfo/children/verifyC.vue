<template>
  <div class="verifyCInfo">
    <div class="_cInfo">
      <div class="_top">资料信息</div>
      <div class="_mid">
        <div v-if="seeShow">
          <Row v-if="userType === 1">
            <Col span="10" offset="1">
              <Row class="_labelFor">
                <Col span="24" class="_label">真实姓名<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="userAInfo.name"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="idcardName"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="userAInfo.idcard"></span></Col>
              </Row>
            </Col>
            <Col span="10" offset="2">
              <Row class="_labelFor">
                <Col span="24" class="_label">性别<b class="_b">*</b></Col>
                <Col span="24" class="_input">
                  <span v-if="userAInfo.sex === 1">男</span>
                  <span v-else-if="userAInfo.sex === 2">女</span>
                </Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">联系邮箱</Col>
                <Col span="24" class="_input"><span v-text="userAInfo.email"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">联系地址</Col>
                <Col span="24" class="_input"><p v-text="userAInfo.address" :title="userAInfo.address"></p></Col>
              </Row>
            </Col>
          </Row>
          <Row v-else-if="userType === 2">
            <Col span="10" offset="1">
              <Row class="_labelFor">
                <Col span="24" class="_label">公司名称<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="userAInfo.name"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">营业执照号码<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="userAInfo.code"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">公司地址<b class="_b">*</b></Col>
                <Col span="24" class="_input"><p v-text="userAInfo.address" :title="userAInfo.address"></p></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">公司行业<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="tradeName"></span></Col>
              </Row>
            </Col>
            <Col span="10" offset="2">
              <Row class="_labelFor">
                <Col span="24" class="_label">法定代表人姓名<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="userAInfo.legal"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="idcardName"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="userAInfo.idcard"></span></Col>
              </Row>
              <Row class="_labelFor">
                <Col span="24" class="_label">公司人数<b class="_b">*</b></Col>
                <Col span="24" class="_input"><span v-text="scaleName"></span></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div v-if="seeShow" class="_cFile">
      <div class="_top">附件信息</div>
      <div class="_mid">
        <Row v-if="userType === 1">
          <Col span="10" offset="1">
            <img class="_imgA" :src="imgUrl.fileA" @click="resSeeImg('fileA')">
          </Col>
          <Col span="10" offset="2">
            <img class="_imgB" :src="imgUrl.fileB" @click="resSeeImg('fileB')">
          </Col>
          <Col class="pt20" span="10" offset="7">
            <img class="_imgC" :src="imgUrl.fileC" @click="resSeeImg('fileC')">
          </Col>
        </Row>
        <Row v-else-if="userType === 2">
          <Col span="10" offset="1">
            <img class="_imgA" :src="imgUrl.fileA" @click="resSeeImg('fileA')">
          </Col>
          <Col span="10" offset="2">
            <img class="_imgB" :src="imgUrl.fileB" @click="resSeeImg('fileB')">
          </Col>
          <Col class="pt20" span="10" offset="1">
            <img class="_imgC" :src="imgUrl.fileC" @click="resSeeImg('fileC')">
          </Col>
          <Col class="pt20" span="10" offset="2">
            <img class="_imgD" :src="imgUrl.fileD" @click="resSeeImg('fileD')">
          </Col>
        </Row>
      </div>
    </div>
    <div class="_entrDoc" v-if="userType === 2">
      <div class="_top">授权委托书</div>
      <div class="_mid">
        <Row v-if="entrDocData !== null">
          <Col span="22" offset="1">
            <p>
              <span class="mr10 _file" v-text="entrDocData.filename" :title="'点击查看: '+ entrDocData.filename" @click="seeFile(entrDocData.filepath)"></span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'verify_c_info',
  props: [ 'userType' ],
  data () {
    return {
      entrDocData: null,
      seeShow: false,
      idcardList: [],
      tradeList: [],
      scaleList: [],
      userAInfo: {},
      imgUrl: {
        fileA: '',
        fileB: '',
        fileC: '',
        fileD: ''
      }
    }
  },
  created () {
    if (this.userType === 1) {
      this.cardList()
      this.resSee()
    } else if (this.userType === 2) {
      this.cardList()
      this.dictionary()
      this.resSee()
    }
    this.$Message.success({
      content: '恭喜您，信息已审核通过！',
      duration: 2
    })
  },
  computed: {
    resSeeUrl () {
      if (this.userType === 1) {
        return '/person/selectPerfect'
      } else if (this.userType === 2) {
        return '/person/selectPerfect/company'
      }
    },
    idcardName () {
      for (let k in this.idcardList) {
        if (this.idcardList[k].itemValue === this.userAInfo.idcardType) {
          return this.idcardList[k].item
        }
      }
      return '未知'
    },
    tradeName () {
      for (let k in this.tradeList) {
        if (this.tradeList[k].itemValue === this.userAInfo.trade) {
          return this.tradeList[k].item
        }
      }
      return '未知'
    },
    scaleName () {
      for (let k in this.scaleList) {
        if (this.scaleList[k].itemValue === this.userAInfo.scale) {
          return this.scaleList[k].item
        }
      }
      return '未知'
    }
  },
  methods: {
    resSee () {
      axios.post(this.resSeeUrl).then(res => {
        this.userAInfo = res.data.data
        if (this.userType === 1) {
          this.imgUrl.fileA = res.data.data.fileList[0].filepath
          this.imgUrl.fileB = res.data.data.fileList[1].filepath
          this.imgUrl.fileC = res.data.data.fileList[2].filepath
        } else if (this.userType === 2) {
          this.entrDocData = this.userAInfo.authorizeBook
          this.imgUrl.fileA = res.data.data.fileList[0].filepath
          this.imgUrl.fileB = res.data.data.fileList[1].filepath
          this.imgUrl.fileC = res.data.data.fileList[2].filepath
          this.imgUrl.fileD = res.data.data.fileList[3].filepath
        }
        this.seeShow = true
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    cardList () {
      axios.post('/dictionary/personIdcardType').then(res => {
        this.idcardList = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    dictionary () {
      axios.all([axios.post('/dictionary/tradeType'), axios.post('/dictionary/companyNumber')]).then(axios.spread((resO, resT) => {
        this.tradeList = resO.data.data
        this.scaleList = resT.data.data
      })).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resSeeImg (type) {
      window.open(this.imgUrl[type], '_blank')
    },
    seeFile (path) {
      window.open(path, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.verifyCInfo {
  ._cFile {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._entrDoc {
    padding-bottom: 60px;
  }
  ._cInfo ._top, ._cFile ._top, ._entrDoc ._top {
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._cInfo ._mid, ._cFile ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 20px 10px;
  }
  ._entrDoc ._mid{
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 10px;
    ._file {
      @include hand;
      color: #337BB5;
    }
  }
  ._cInfo ._mid {
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
        margin-bottom: 10px;
        border-bottom:1px solid #ddd;
        p {
          height: 32px;
          line-height: 32px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          width: 100%;
          letter-spacing: 1px;
          font-size: 12px;
          color: #666;
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }
  ._cFile ._mid {
    text-align: center;
    ._imgA, ._imgB {
      @include hand;
      width: 303px;
      height: 192px;
    }
    ._imgC, ._imgD {
      @include hand;
      width: 303px;
      height: 432px;
    }
  }
}
</style>
