<template>
  <div>
    <div class="pr">
      <spin-comp :spinShow="spinShow"></spin-comp>
      <Row>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">搜索</label>
        </Col>
        <Col span="4">
          <Input v-model="search.text" icon="ios-search-strong" class="_search" @on-click="resChangeStatus('sear')" @keyup.enter.native="resChangeStatus('sear')" placeholder="案件编号 / 申请人 / 被申请人"></Input>
        </Col>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">案件类型</label>
        </Col>
        <Col span="3">
          <Select v-model="caseTypeStatus" @on-change="resChangeStatus('caseType')">
            <Option value="all" key="all">全部</Option>
            <Option :disabled="item.status === 2" v-for="item in caseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">仲裁委</label>
        </Col>
        <Col span="3">
          <Select v-model="committee" @on-change="resChangeStatus()">
            <Option value="all" key="all">全部</Option>
            <Option v-for="item in caseMap[caseTypeStatus]" :value="item.arbId" :key="item.arbId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">案件状态</label>
        </Col>
        <Col span="3">
          <Select v-model="caseStatus" @on-change="resChangeStatus('caseStatus')">
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
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import spinComp from '@/components/common/spin'

export default {
  name: 'home',
  components: { spinComp },
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
            title: '案件类型',
            key: 'caseTypeName',
            align: 'center'
          },
          {
            title: '提交仲裁委',
            key: 'arbitrationName',
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
          }
        ],
        bodyList: []
      },
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      caseTypeList: [],
      caseTypeStatus: 'all',
      caseMap: {},
      committee: 'all'
    }
  },
  created () {
    this.dictionary('caseState')
    this.dictionary('caseTypeList')
    this.resMineList()
  },
  methods: {
    ...mapActions([
      'setMyCaseId',
      'setMyCaseOldId',
      'setMyCaseState',
      'setGoPaymentCaseIds',
      'setGoPaymentArbiId',
      'setMyCaseShowBtn',
      'setMyCasePartieType',
      'setMyCaseCrossE'
    ]),
    dictionary (type) {
      switch (type) {
        case 'caseState':
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
          break
        case 'caseTypeList':
          axios.post('/caseType/arbitration/list').then(res => {
            this.caseMap['all'] = res.data.data
          }).catch(e => {
            this.$Message.error({
              content: '错误信息:' + e + ' 稍后再试',
              duration: 5
            })
          })
          axios.post('/caseType/list').then(res => {
            let _dataList = res.data.data
            this.caseTypeList = _dataList.map((a, b) => {
              let _o = {}
              _o.value = a.id
              _o.label = a.caseTypeName
              _o.status = a.status
              this.caseMap[a.id] = a.arbitrationList
              return _o
            })
          }).catch(e => {
            this.$Message.error({
              content: '错误信息:' + e + ' 稍后再试',
              duration: 5
            })
          })
          break
      }
    },
    resMineList () {
      this.spinShow = true
      axios.post('/case/appliedCases', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize,
        keyword: this.search.text,
        caseState: this.caseStatus,
        arbitrationId: this.committee === 'all' ? null : this.committee,
        caseTypeId: this.caseTypeStatus === 'all' ? null : this.caseTypeStatus
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
    resChangeStatus (type) {
      if (type === 'caseType') {
        this.committee = 'all'
        if (this.caseTypeStatus === 'all') {
          this.caseStatus = 0
        }
      }
      if (type === 'sear') {
        this.committee = 'all'
        this.caseTypeStatus = 'all'
        this.caseStatus = 0
      } else {
        if ([0, 13, 14, 15].indexOf(this.caseStatus) === -1) {
          // if (this.caseTypeStatus === 'all') {
          //   this.$Message.warning({
          //     content: '请先选择一个案件类型, 案件类型不能为全部',
          //     duration: 5
          //   })
          //   return false
          // }
          if (this.committee === 'all') {
            this.$Message.warning({
              content: '请先选择一个仲裁委, 仲裁委不能为全部',
              duration: 5
            })
            return false
          }
        }
      }
      this.pageObj.pageNum = 1
      this.resMineList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resMineList()
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
._search {
  max-width: 450px;
  margin-bottom: 20px;
}
._caseList {
  margin-bottom: 20px;
}
._enDow {
  color: #337BB5
}
</style>
