<template>
  <div class="archiveHome">
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
          <DatePicker transfer class="wmax" format="yyyy-MM-dd" @on-change="changeDate" confirm @on-clear="clearDate" @on-ok="resSearch" type="daterange" placeholder="起止时间"></DatePicker>
        </Col>
        <Col span="2" offset="1">
          <label class="lh32 f16 fc6 fr mr15">案件状态</label>
        </Col>
        <Col span="4">
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
            <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage" @on-page-size-change="reschangePageSize" show-sizer></Page>
          </Col>
        </Row>
      </div>
    </div>
    <alert-btn-info :alertShow="retrObj.alertShow" @alertConfirm="retrSave" @alertCancel="alertCanc('retr')" alertTitle="申请撤回案件">
      <p>确认要撤回立案申请吗？</p>
    </alert-btn-info>
    <res-reason v-if="alertObj.resReason" :resPropsData="alertObj.resReasonData" @alertConfirm="alertCanc('resReason')" @alertCancel="alertCanc('resReason')"></res-reason>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { resPage } from '@/components/common/mixin.js'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/page/caseInfo/children/children/alertBtnInfo'
import resReason from '@/page/home/children/children/resReason'

export default {
  name: 'archiveHome',
  mixins: [resPage],
  components: { spinComp, alertBtnInfo, resReason },
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
                    this.goCaseInfo(params.row)
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
        alertShow: false
      },
      retrDObj: null,
      alertObj: {
        code: false,
        resReason: false,
        resReasonData: null
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
  methods: {
    ...mapActions([
      'setMyCaseListInfo',
      'setMyCaseShowBtn',
      'setMyCaseCrossE'
    ]),
    renderOperation (h, params) {
      if (params.row.state === 1) {
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
      } else if (params.row.state === 4) {
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
                this.resAction('resReason', params.row)
              }
            }
          }, '查看驳回原因')
        ])
      } else {
        return h('div', [
        ])
      }
    },
    dictionary () {
      axios.post('/dictionary/caseUnderLineState').then(res => {
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
      axios.post('/caseUnderLine/mine', {
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
      this.retrDObj = this.caseList.bodyList[index].id
    },
    retrSave () {
      axios.post('/caseUnderLine/withdrawCaseUnderLine', {
        caseId: this.retrDObj
      }).then(res => {
        this.alertCanc('retr')
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
        this.resMineList()
      }).catch(e => {
        this.alertCanc('retr')
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resAction (type, data) {
      switch (type) {
        case 'resReason':
          this.alertObj.resReasonData = {
            reason: data.decisionReason
          }
          this.alertObj.resReason = true
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'retr':
          this.retrObj.alertShow = false
          this.retrDObj = null
          break
        case 'resReason':
          this.alertObj.resReason = false
          this.alertObj.resReasonData = null
          break
      }
    },
    goCaseInfo (obj) {
      let _o = {
        caseLineType: 2,
        id: obj.id,
        oldId: obj.oldId,
        state: obj.state,
        partieType: obj.partieType
      }
      this.setMyCaseListInfo(_o)
      window.localStorage.setItem('myCaseListInfo', JSON.stringify(_o))
      this.setMyCaseShowBtn(obj.showBtn)
      window.localStorage.setItem('myCaseShowBtn', JSON.stringify(obj.showBtn))
      this.setMyCaseCrossE(obj.crossExamination)
      window.localStorage.setItem('myCaseCrossE', obj.crossExamination)
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
  width: 100%;
  @include mw(1180px);
  @include bc;
  padding-top: 20px;
  ._search {
    max-width: 450px;
    margin-bottom: 20px;
  }
  ._caseList {
    margin-bottom: 20px;
  }
}
</style>
