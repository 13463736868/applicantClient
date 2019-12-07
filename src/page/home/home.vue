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
        <Col span="6">
          <Input v-model="search.text" icon="ios-search-strong" class="_search" @on-click="resSearch" @keyup.enter.native="resSearch" placeholder="案件编号 / 申请人 / 被申请人 / 案由"></Input>
        </Col>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">时间</label>
        </Col>
        <Col span="4">
          <DatePicker class="wmax" format="yyyy-MM-dd" @on-change="changeDate" confirm @on-clear="clearDate" @on-ok="resSearch" type="datetimerange" placeholder="起始时间"></DatePicker>
        </Col>
        <Col span="2" offset="1">
          <label class="lh32 f16 fc6 fr mr15">案件状态</label>
        </Col>
        <Col span="4">
          <Select v-model="caseStatus" style="width:200px" @on-change="resChangeStatus()">
            <Option v-for="item in caseStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="2" offset="1">
          <Button type="primary" @click="resPayment">批量缴费</Button>
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
            <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage" @on-page-size-change="reschangePageSize" show-sizer></Page>
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
        :action="resAction"
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
    <alert-btn-info :alertShow="alertObj.code" @alertConfirm="codeSave" @alertCancel="alertCode" alertTitle="请输入验证码">
      <p class="pb5">验证码已发送至手机: <b class="ml5" v-text="codePhone"></b></p>
      <p><span>验证码：</span><Input class="ml10" v-model="roomCode" placeholder="6位数字验证码" style="width: 100px" /></p>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { resPage } from '@/components/common/mixin.js'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/page/caseInfo/children/children/alertBtnInfo'
import setRegExp from '@/config/regExp.js'
import regi from '@/config/regiType.js'

export default {
  name: 'home',
  mixins: [resPage],
  components: { headTop, spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: true,
      search: {
        text: '',
        startTime: '',
        endTime: ''
      },
      caseStatusList: [],
      caseStatus: 0,
      caseList: {
        loading: false,
        header: [
          {
            title: '选择',
            key: 'id',
            align: 'center',
            maxWidth: 80,
            renderHeader: (h, params) => {
              return this.renderAllSele(h, params)
            },
            render: (h, params) => {
              return this.renderCheck(h, params)
            }
          },
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
            minWidth: 26,
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
            minWidth: 30,
            align: 'center'
          },
          {
            title: '开庭时间',
            key: 'beginTime',
            minWidth: 30,
            align: 'center'
          },
          {
            title: '操作',
            key: 'id',
            minWidth: 40,
            align: 'center',
            render: (h, params) => {
              return this.renderOperation(h, params)
            }
          }
        ],
        bodyList: [],
        seleMap: {}
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
      retrDObj: null,
      roomPhone: null,
      roomId: null,
      roomPartie: null,
      roomCode: null,
      alertObj: {
        code: false
      },
      alertShow: {
        idsList: []
      }
    }
  },
  created () {
    this.dictionary()
    this.resMineList()
  },
  computed: {
    resAction () {
      return regi.api + '/case/withdraw'
    },
    retrData () {
      let _data = {}
      _data.caseId = this.retrDObj
      return _data
    },
    codePhone () {
      if (this.roomPhone === null) {
        return ''
      } else {
        let _phone = this.roomPhone.substr(0, 3) + '****' + this.roomPhone.substr(7)
        return _phone
      }
    }
  },
  methods: {
    ...mapActions([
      'setMyCaseId',
      'setMyCaseOldId',
      'setMyCaseState',
      'setGoPaymentCaseIds',
      'setMyCaseShowBtn',
      'setMyCasePartieType',
      'setMyCaseCrossE'
    ]),
    renderAllSele (h, params) {
      return h('div', [
        h('span', {
          style: {
            cursor: 'pointer',
            userSelect: 'none'
          },
          on: {
            click: () => {
              this.resAllSele()
            }
          }
        }, '全选')
      ])
    },
    resAllSele () {
      if (this.caseList.seleMap[this.pageObj.pageNum] === undefined) {
        this.caseList.seleMap[this.pageObj.pageNum] = true
      } else {
        this.caseList.seleMap[this.pageObj.pageNum] = !this.caseList.seleMap[this.pageObj.pageNum]
      }
      this.caseList.bodyList.forEach((item, index) => {
        let _obj = item
        if (_obj.state === 2) {
          this.seleArrChange(index, this.caseList.seleMap[this.pageObj.pageNum])
        }
      })
    },
    renderCheck (h, params) {
      let _obj = params.row
      if (_obj.state === 2) {
        if (this.alertShow.idsList.indexOf(_obj.id) === -1) {
          return h('div', [
            h('Icon', {
              props: {
                type: 'android-checkbox-outline-blank',
                size: '16'
              },
              style: {
                color: '#2d8cf0',
                cursor: 'pointer',
                verticalAlign: 'text-top'
              },
              on: {
                click: () => {
                  this.seleArrChange(params.index, true)
                }
              }
            })
          ])
        } else {
          return h('div', [
            h('Icon', {
              props: {
                type: 'android-checkbox',
                size: '16'
              },
              style: {
                color: '#2d8cf0',
                cursor: 'pointer',
                verticalAlign: 'text-top'
              },
              on: {
                click: () => {
                  this.seleArrChange(params.index, false)
                }
              }
            })
          ])
        }
      } else {
        return h('div', [
        ])
      }
    },
    seleArrChange (index, bool) {
      let info = this.caseList.bodyList[index]
      if (bool) {
        if (this.alertShow.idsList.indexOf(info.id) === -1) {
          if (this.alertShow.idsList.length >= 10) {
            this.$Message.error({
              content: '最多只能选择十个案件',
              duration: 5
            })
            return false
          } else {
            this.alertShow.idsList.push(info.id)
          }
        }
      } else {
        if (this.alertShow.idsList.indexOf(info.id) !== -1) {
          this.alertShow.idsList.splice(this.alertShow.idsList.indexOf(info.id), 1)
        }
      }
    },
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
          if (params.row.beginTime === null || params.row.beginTime === '') {
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
                    this.resCancCase(params.index)
                  }
                }
              }, '撤回'),
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
          if (params.row.beginTime === null || params.row.beginTime === '') {
            return h('div', [
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
        caseState: this.caseStatus,
        startTime: this.search.startTime,
        endTime: this.search.endTime
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
      this.caseList.seleMap = {}
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
      this.retrObj.fileObj = null
    },
    resSizeError () {
      this.$Message.error({
        content: '文件不能超过10MB',
        duration: 5
      })
      this.retrObj.fileObj = null
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
            content: '错误信息:' + e + ' 稍后再试',
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
    getFormatDate () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strD = date.getDate()
      let hour = date.getHours()
      let minu = date.getMinutes()
      let sec = date.getSeconds()
      let time = ''
      if (month < 10) {
        month = '0' + month
      }
      if (strD < 10) {
        strD = '0' + strD
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minu < 10) {
        minu = '0' + minu
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      time = year + '-' + month + '-' + strD + ' ' + hour + ':' + minu + ':' + sec
      return time
    },
    goCourtRoom (index) {
      let _info = this.caseList.bodyList[index]
      let newTime = this.getFormatDate()
      let newD = newTime.substr(0, 10).split('-').join('')
      let newT = (newTime.substr(11, 2) - 0) * 60 + (newTime.substr(14, 2) - 0)
      let beginTime = _info.beginTime
      let beginD = beginTime.substr(0, 10).split('-').join('')
      let beginT = (beginTime.substr(11, 2) - 0) * 60 + (beginTime.substr(14, 2) - 0)
      if (newD !== beginD) {
        this.$Message.warning({
          content: '只能在开庭前半小时内进入',
          duration: 5
        })
      } else if (beginT - newT > 30) {
        this.$Message.warning({
          content: '只能在开庭前半小时内进入',
          duration: 5
        })
      } else {
        if (_info.partieType === 1 || _info.partieType === 2) {
          axios.post('/sendPartyPhoneIdectCode', {
            id: _info.id,
            oldId: _info.oldId,
            partieType: _info.partieType
          }).then(res => {
            if (res.data.data === 'phone') {
              this.roomId = _info.id
              this.roomPartie = _info.partieType
              this.goCourtRoomS()
            } else {
              this.roomPhone = res.data.data
              this.roomId = _info.id
              this.roomPartie = _info.partieType
              this.goRoomCode()
            }
          }).catch(e => {
            this.$Message.error({
              content: '错误信息:' + e + ' 稍后再试',
              duration: 5
            })
          })
        } else {
          this.$Message.error({
            content: '错误信息:用户案件类型未知',
            duration: 5
          })
        }
      }
    },
    goRoomCode () {
      this.alertObj.code = true
    },
    alertCode () {
      this.alertObj.code = false
      this.roomPhone = null
      this.roomId = null
      this.roomPartie = null
      this.roomCode = null
    },
    codeSave () {
      if (this.roomCode === null || this.roomCode === '') {
        this.$Message.warning({
          content: '请输入6位数字验证码',
          duration: 5
        })
      } else if (!setRegExp(this.roomCode, 'regCode')) {
        this.$Message.warning({
          content: '验证码输入有误,请重新输入',
          duration: 5
        })
      } else {
        axios.post('/checkIdentCode', {
          phone: this.roomPhone,
          identCode: this.roomCode
        }).then(res => {
          this.alertObj.code = false
          this.goCourtRoomS()
        }).catch(e => {
          this.$Message.error({
            content: '错误信息:' + e + ' 稍后再试',
            duration: 5
          })
        })
      }
    },
    resPayment () {
      if (this.alertShow.idsList.length === 0) {
        this.$Message.error({
          content: '请先选择一个案件',
          duration: 5
        })
      } else {
        this.setGoPaymentCaseIds(JSON.stringify(this.alertShow.idsList))
        window.localStorage.setItem('goPaymentCaseIds', JSON.stringify(this.alertShow.idsList))
        this.$router.push({
          path: '/goPayment'
        })
      }
    },
    goCourtRoomS () {
      let _id = this.roomId
      let _partieType = this.roomPartie === 1 ? 3 : (this.roomPartie === 2 ? 2 : '')
      axios.post('/encryption', {
        params: _id + '$' + _partieType
      }).then(res => {
        this.alertCode()
        window.open('' + res.data.data, '_blank')
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    goPayment (index) {
      let _arr = []
      _arr.push(this.caseList.bodyList[index].id)
      this.setGoPaymentCaseIds(JSON.stringify(_arr))
      window.localStorage.setItem('goPaymentCaseIds', JSON.stringify(_arr))
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
    },
    changeDate (val) {
      this.search.startTime = val[0]
      this.search.endTime = val[1]
    },
    clearDate () {
      this.search.startTime = ''
      this.search.endTime = ''
      this.resSearch()
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
