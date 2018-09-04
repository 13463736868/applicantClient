<template>
  <div class="home">
    <head-top :isRegister="true">
      <span class="f36 fcf">我的案件</span>
    </head-top>
    <div class="_center pr">
      <spin-comp :spinShow="spinShow"></spin-comp>
      <Row>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">搜索</label>
        </Col>
        <Col span="8">
          <Input v-model="search.text" icon="ios-search-strong" placeholder="" class="_search" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
        </Col>
        <Col span="8">
          <label class="lh32 f16 fc6 fr mr15">案件状态</label>
        </Col>
        <Col span="6">
          <Select v-model="caseStatus" style="width:200px" @on-change="resChangeStatus()">
            <Option v-for="item in caseStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <div class="_caseList clearfix">
        <Row>
          <Col span="24" class="pl20 pr20">
            <Table stripe border align="center" :loading="caseList.loading" :columns="caseList.header" :data="caseList.bodyList"></Table>
          </Col>
        </Row>
      </div>
      <div class="_page clearfix">
        <Row>
          <Col span="12" offset="6" class="tc">
            <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
          </Col>
        </Row>
      </div>
    </div>
    <alert-btn-info :alertShow="retrObj.alertShow" @alertConfirm="retrSave" @alertCancel="alertCanc" alertTitle="申请撤回案件">
      <spin-comp :spinShow="retrObj.spinShow">
        <div v-if="retrObj.progressText !== null" v-text="retrObj.progressText"></div>
      </spin-comp>
      <p style="padding-bottom:10px;">确定要申请撤回案件吗？</p>
      <Upload
        ref="upload"
        name="file"
        type="drag"
        action="/api/case/withdraw"
        :with-credentials="true"
        :show-upload-list="false"
        :format="['jpg','jpeg','png','doc','docx','pdf']"
        :max-size="10240"
        :data="retrData"
        :on-format-error="resFormError"
        :on-exceeded-size="resSizeError"
        :before-upload="resBefoUpload"
        :on-progress="resProgress"
        :on-success="resSuccess"
        :on-error="resError"
      >
        <div class="_text" style="padding:20px 0;">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p v-if="retrObj.fileObj === null" v-text="'请上传撤回申请书 ( 上传类型只支持 jpg、jpeg、png、doc、docx、pdf )'"></p>
          <div v-if="retrObj.fileObj !== null" v-text="retrObj.fileObj.name"></div>
        </div>
      </Upload>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/page/caseInfo/children/children/alertBtnInfo'

export default {
  name: 'home',
  components: { headTop, spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: true,
      search: {
        text: ''
      },
      caseStatusList: [],
      caseStatus: 0,
      caseList: {
        loading: false,
        header: [
          {
            title: '案件编号',
            key: 'oldId',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    this.goCaseInfo(params.index)
                  }
                }
              }, params.row.oldId)
            }
          },
          {
            title: '案号',
            key: 'code',
            align: 'center'
          },
          {
            title: '申请人',
            key: 'applicantName',
            align: 'center'
          },
          {
            title: '被申请人',
            key: 'respondentName',
            align: 'center'
          },
          {
            title: '纠纷类型',
            key: 'caseType',
            align: 'center'
          },
          {
            title: '案件状态',
            key: 'caseState',
            align: 'center'
          },
          {
            title: '申请时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return this.renderOperation(h, params)
            }
          }
        ],
        bodyList: []
      },
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      retrObj: {
        alertShow: false,
        progressText: null,
        fileObj: null,
        spinShow: false
      },
      retrDObj: null
    }
  },
  created () {
    this.dictionary()
    this.resMineList()
  },
  computed: {
    retrData () {
      let _data = {}
      _data.caseId = this.retrDObj
      return _data
    }
  },
  methods: {
    ...mapActions([
      'setMyCaseId',
      'setMyCaseOldId',
      'setMyCaseState',
      'setGoPaymentOldId',
      'setMyCaseShowBtn',
      'setMyCasePartieType',
      'setMyCaseCrossE'
    ]),
    renderOperation (h, params) {
      let _revocation = params.row.showBtn.revocation
      if (params.row.state === 2) {
        if (_revocation === 1) {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.goPayment(params.index)
                }
              }
            }, '去缴费'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.resCancCase(params.index)
                }
              }
            }, '撤回')
          ])
        } else {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.goPayment(params.index)
                }
              }
            }, '去缴费')
          ])
        }
      } else if (params.row.state === 5) {
        if (_revocation === 1) {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.goCourtRoom(params.index)
                }
              }
            }, '进入庭室'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.resCancCase(params.index)
                }
              }
            }, '撤回')
          ])
        } else {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.goCourtRoom(params.index)
                }
              }
            }, '进入庭室')
          ])
        }
      } else {
        if (_revocation === 1) {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.resCancCase(params.index)
                }
              }
            }, '撤回')
          ])
        } else {
          return h('div', [
          ])
        }
      }
    },
    dictionary () {
      axios.post('/dictionary/caseState').then(res => {
        let _dataList = res.data.data
        let _select = []
        for (let k in _dataList) {
          let _o = {}
          _o.value = _dataList[k].itemValue
          _o.label = _dataList[k].item
          _select.push(_o)
        }
        this.caseStatusList = _select
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resMineList () {
      this.spinShow = true
      axios.post('/case/mine', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize,
        keyword: this.search.text,
        caseState: this.caseStatus
      }).then(res => {
        let _data = res.data.data
        this.caseList.bodyList = _data.dataList === null ? [] : _data.dataList
        this.pageObj.total = _data.totalCount
        this.spinShow = false
      }).catch(e => {
        this.spinShow = false
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.resMineList()
    },
    resChangeStatus () {
      this.pageObj.pageNum = 1
      this.resMineList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resMineList()
    },
    resCancCase (index) {
      this.retrObj.alertShow = true
      this.retrDObj = this.caseList.bodyList[index].oldId
    },
    resFormError () {
      this.$Message.error({
        content: '文件格式错误只支持 jpg、jpeg、png、doc、docx、pdf',
        duration: 5
      })
    },
    resSizeError () {
      this.$Message.error({
        content: '文件不能超过10MB',
        duration: 5
      })
    },
    resBefoUpload (file) {
      this.retrObj.fileObj = file
      return false
    },
    resProgress (event, file) {
      let _percent = event.percent
      if (_percent === 100) {
        this.retrObj.progressText = 99 + '%'
      } else {
        this.retrObj.progressText = Math.floor(event.percent) + '%'
      }
    },
    resSuccess (res, file) {
      if (res.flag === false) {
        this.retrObj.spinShow = false
        this.alertCanc('retr')
        this.$Message.error({
          content: '错误信息:' + res.message + ' 稍后再试',
          duration: 5
        })
      } else {
        this.retrObj.progressText = '100%'
        this.retrObj.spinShow = false
        this.alertCanc('retr')
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
        this.resMineList()
      }
    },
    resError (error, file) {
      this.retrObj.spinShow = false
      this.alertCanc('retr')
      this.$Message.error({
        content: '错误信息:' + error.status + ' 稍后再试',
        duration: 5
      })
    },
    retrSave () {
      this.retrObj.spinShow = true
      if (this.retrObj.fileObj === null) {
        axios.post('/case/withdraw', this.retrData).then(res => {
          this.retrObj.spinShow = false
          this.alertCanc('retr')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
          this.resMineList()
        }).catch(e => {
          this.retrObj.spinShow = false
          this.alertCanc('retr')
          this.$Message.error({
            content: '错误信息:' + e.status + ' 稍后再试',
            duration: 5
          })
        })
      } else {
        this.$refs.upload.post(this.retrObj.fileObj)
      }
    },
    alertCanc () {
      this.retrObj.alertShow = false
      this.retrObj.fileObj = null
      this.retrDObj = null
    },
    goCourtRoom (index) {
      console.log(this.caseList.bodyList[index])
    },
    goPayment (index) {
      this.setGoPaymentOldId(this.caseList.bodyList[index].oldId)
      window.localStorage.setItem('goPaymentOldId', this.caseList.bodyList[index].oldId)
      this.$router.push({
        path: '/goPayment'
      })
    },
    goCaseInfo (index) {
      this.setMyCaseId(this.caseList.bodyList[index].id)
      window.localStorage.setItem('myCaseId', this.caseList.bodyList[index].id)
      this.setMyCaseOldId(this.caseList.bodyList[index].oldId)
      window.localStorage.setItem('myCaseOldId', this.caseList.bodyList[index].oldId)
      this.setMyCaseState(this.caseList.bodyList[index].state)
      window.localStorage.setItem('myCaseState', this.caseList.bodyList[index].state)
      this.setMyCaseShowBtn(this.caseList.bodyList[index].showBtn)
      window.localStorage.setItem('myCaseShowBtn', JSON.stringify(this.caseList.bodyList[index].showBtn))
      this.setMyCasePartieType(this.caseList.bodyList[index].partieType)
      window.localStorage.setItem('myCasePartieType', this.caseList.bodyList[index].partieType)
      this.setMyCaseCrossE(this.caseList.bodyList[index].crossExamination)
      window.localStorage.setItem('myCaseCrossE', this.caseList.bodyList[index].crossExamination)
      this.$router.push({
        path: '/caseInfo'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._search {
    max-width: 450px;
    margin-bottom: 20px;
  }
  ._caseList {
    margin-bottom: 20px;
  }
}
</style>
