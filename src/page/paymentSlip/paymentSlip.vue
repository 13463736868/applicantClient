<template>
  <div class="paymentSlip">
    <head-top :isRegister="true">
      <span class="f36 fcf">缴费单查询</span>
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
          <label class="lh32 f16 fc6 fr mr15">仲裁委</label>
        </Col>
        <Col span="6">
          <Select v-model="committeeStatus" style="width:200px" @on-change="resChangeStatus()">
            <Option v-for="item in committeeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <div class="_payList clearfix">
        </Row>
          <Col span="24" class="pl20 pr20">
            <Table stripe border align="center" :loading="payList.loading" :columns="payList.header" :data="payList.bodyList"></Table>
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
  name: 'paymentSlip',
  data () {
    return {
      search: {
        text: ''
      },
      committeeList: [
        {
          value: '中国盐城仲裁委员会',
          label: '中国盐城仲裁委员会'
        }
      ],
      committeeStatus: '中国盐城仲裁委员会',
      payList: {
        loading: false,
        header: [
          {
            title: '缴费单号',
            key: 'payNum',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.goPaymentInfo(params.index)
                  }
                }
              }, params.row.payNum)
            }
          },
          {
            title: '支付时间',
            key: 'payTime',
            align: 'center'
          },
          {
            title: '支付方式',
            key: 'payManner',
            align: 'center'
          },
          {
            title: '收款方',
            key: 'beneficiary',
            align: 'center'
          },
          {
            title: '支付金额',
            key: 'payAmount',
            align: 'center'
          }
        ],
        bodyList: [
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
          },
          {
            payNum: 'DG0000000001',
            beneficiary: '中国盐城仲裁委员会',
            payManner: '对公转账',
            payTime: '2018-07-07',
            payAmount: '1500'
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
  components: {
    headTop
  },
  mounted () {
  },
  methods: {
    goPaymentInfo (index) {
      console.log(this.payList.bodyList[index])
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
  ._payList {
    margin-bottom: 20px;
  }
}
</style>
