<template>
  <div class="notApplied">
    <head-top>
      <span class="f36 fcf">待申请案件</span>
    </head-top>
    <div class="_center">
      <Row>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">搜索</label>
        </Col>
        <Col span="8">
          <Input v-model="search.text" icon="ios-search-strong" placeholder="" class="_search" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
        </Col>
      </Row>
      <div class="_caseList clearfix">
        </Row>
          <Col span="24">
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
import axios from 'axios'
import headTop from '@/components/header/head'

export default {
  name: 'notApplied',
  components: { headTop },
  data () {
    return {
      search: {
        text: ''
      },
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
                    this.goCaseSee(params.index)
                  }
                }
              }, params.row.caseNo)
            }
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
            title: '创建时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operating',
            align: 'center',
            render: (h, params) => {
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
                      this.goCaseSee(params.index)
                    }
                  }
                }, '查看'),
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
                      this.resCaseDel(params.index)
                    }
                  }
                }, '删除')
              ])
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
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '2',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '3',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '4',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '5',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '6',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '7',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '8',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '9',
            createTime: '2018-07-07',
            operating: ''
          },
          {
            caseNo: '0000000001',
            caseNum: '(2018)穗州网案字第19555号',
            proposer: '王钢蛋',
            respondent: '李铁柱',
            disputeType: '借款合同纠纷',
            caseStatus: '1',
            createTime: '2018-07-07',
            operating: ''
          }
        ]
      },
      pageObj: {
        total: 100,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    axios.get('/user/query').then(res => {
      console.log(res)
    }).catch(e => {
      // 加一个 alertText 组件
      console.log(e)
    })
  },
  methods: {
    goCaseSee (index) {
      console.log('案件查看操作')
    },
    resCaseDel (index) {
      console.log('案件删除操作')
    },
    resSearch () {
      console.log(this.search.text)
      // 获取列表方法
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      // 获取列表方法
      console.log(page)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1080px);
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
