<template>
  <div class="home">
    <head-top :isRegister="true">
      <span class="f36 fcf">我的案件</span>
    </head-top>
    <div class="_center">
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
        </Row>
          <Col span="24" class="pl20 pr20">
            <Table stripe border align="center" :loading="caseList.loading" :columns="caseList.header" :data="caseList.bodyList"></Table>
          </Col>
        </Row>
      </div>
      <div class="_page clearfix">
        </Row>
          <Col span="12" offset="6" class="tc">
            <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.size" show-elevator show-total @on-change="reschangePage"></Page>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import headTop from '@/components/header/head'

export default {
  name: 'home',
  components: { headTop },
  data () {
    return {
      search: {
        text: ''
      },
      caseStatusList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '已提交',
          label: '已提交'
        },
        {
          value: '不受理',
          label: '不受理'
        },
        {
          value: '预审通过',
          label: '预审通过'
        },
        {
          value: '待缴费',
          label: '待缴费'
        },
        {
          value: '已缴费',
          label: '已缴费'
        },
        {
          value: '已立案',
          label: '已立案'
        },
        {
          value: '审核中',
          label: '审核中'
        },
        {
          value: '已结案',
          label: '已结案'
        },
        {
          value: '撤回申请',
          label: '撤回申请'
        }
      ],
      caseStatus: '全部',
      caseList: {
        loading: false,
        header: [
          {
            title: '案件编号',
            key: 'caseNo',
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
              }, params.row.caseNo)
            }
          },
          {
            title: '案号',
            key: 'caseNum',
            align: 'center'
          },
          {
            title: '申请人',
            key: 'proposer',
            align: 'center'
          },
          {
            title: '被申请人',
            key: 'respondent',
            align: 'center'
          },
          {
            title: '纠纷类型',
            key: 'disputeType',
            align: 'center'
          },
          {
            title: '案件状态',
            key: 'caseStatus',
            align: 'center',
            render: (h, params) => {
              return h('span', {}, this.renderCaseStatus(params.row.caseStatus))
            }
          },
          {
            title: '申请时间',
            key: 'applicationTime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operating',
            align: 'center',
            render: (h, params) => {
              return this.renderOperation(h, params)
            }
          }
        ],
        bodyList: [
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '1',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '2',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '3',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '4',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '5',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '6',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '7',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '8',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '9',
            applicationTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '1',
            applicationTime: '2018-07-07',
            operating: ''
          }
        ]
      },
      pageObj: {
        total: 100,
        pageNum: 1,
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
  },
  methods: {
    renderCaseStatus (caseStatus) {
      if (caseStatus === '1') {
        return '已提交'
      } else if (caseStatus === '2') {
        return '不受理'
      } else if (caseStatus === '3') {
        return '预审通过'
      } else if (caseStatus === '4') {
        return '待缴费'
      } else if (caseStatus === '5') {
        return '已交费'
      } else if (caseStatus === '6') {
        return '已立案'
      } else if (caseStatus === '7') {
        return '审核中'
      } else if (caseStatus === '8') {
        return '已结案'
      } else if (caseStatus === '9') {
        return '撤回申请'
      } else {
        return '无法识别状态'
      }
    },
    renderOperation (h, params) {
      if (params.row.caseStatus === '4') {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                this.goPayment(params.index)
              }
            }
          }, '去缴费')
        ])
      } else if (params.row.caseStatus === '7') {
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
      } else {
        return h('div', [
          // h('Button', {
          //   props: {
          //     type: 'primary',
          //     size: 'small'
          //   },
          //   style: {
          //     marginRight: '5px'
          //   },
          //   on: {
          //     click: () => {
          //       this.goCourtRomm(params.index)
          //     }
          //   }
          // }, '进入庭室'),
          // h('Button', {
          //   props: {
          //     type: 'primary',
          //     size: 'small'
          //   },
          //   on: {
          //     click: () => {
          //       this.goPayment(params.index)
          //     }
          //   }
          // }, '去缴费')
        ])
      }
    },
    resSearch () {
      console.log(this.search.text)
      // 获取列表方法
    },
    resChangeStatus () {
      console.log(this.caseStatus)
      // 获取列表方法
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      // 获取列表方法
      console.log(page)
    },
    goCourtRoom (index) {
      console.log(this.caseList.bodyList[index])
    },
    goPayment (index) {
      console.log(this.caseList.bodyList[index])
    },
    goCaseInfo (index) {
      console.log(this.caseList.bodyList[index].caseNo, this.caseList.bodyList[index].caseStatus)
      console.log('案件查看操作-先把案件号存到store.xxCaseNo')
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
