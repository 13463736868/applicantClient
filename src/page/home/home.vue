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
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'

export default {
  name: 'home',
  components: { headTop, spinComp },
  data () {
    return {
      spinShow: true,
      search: {
        text: ''
      },
      caseStatusList: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '已提交'
        },
        {
          value: 2,
          label: '待缴费'
        },
        {
          value: 3,
          label: '不受理'
        },
        {
          value: 4,
          label: '已立案'
        },
        {
          value: 5,
          label: '审理中'
        },
        {
          value: 6,
          label: '已撤回'
        },
        {
          value: 7,
          label: '已结案'
        }
      ],
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
      }
    }
  },
  created () {
    this.resMineList()
  },
  methods: {
    ...mapActions([
      'setMyCaseId',
      'setMyCaseOldId',
      'setMyCaseState',
      'setGoPaymentOldId'
    ]),
    renderOperation (h, params) {
      if (params.row.state === 1 || params.row.state === 4) {
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
      } else if (params.row.state === 2) {
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
      } else if (params.row.state === 5) {
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
      console.log('撤回案件按钮')
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
