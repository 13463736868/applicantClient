<template>
  <div class="paymentInfo">
    <head-top :isRegister="true">
      <span class="f36 fcf">缴费单查询</span>
    </head-top>
    <div class="_center pr">
      <Row v-if="publicData !== null">
        <Col span="14" offset="5">
          <div class="_payment">
            <div class="_top">缴费单详情</div>
            <div class="_mid">
              <p><b>支付方式：</b><span v-text="publicData.paymentStyleName"></span></p>
              <p><b>金额：</b><span v-text="publicData.costTotal"></span> 元</p>
              <p><b>缴费状态：</b></p>
              <Row class="_line">
                <Col class="_record" span="1">
                  <Icon color="#126eaf" type="record"></Icon>
                </Col>
                <Col class="_bL" span="10">
                  <b></b>
                </Col>
                <Col class="_record" span="1">
                  <Icon color="#164D84" type="record"></Icon>
                </Col>
                <Col class="_bR" span="10">
                  <b></b>
                </Col>
                <Col class="_record" span="1">
                  <Icon color="#1a2b58" type="record"></Icon>
                </Col>
              </Row>
              <Row class="_text">
                <Col span="9">
                  <p>确认付款</p>
                  <span v-text="publicData.createTime"></span>
                </Col>
                <Col class="tc" span="5">
                  <p>进行中</p>
                </Col>
                <Col class="tr" span="9">
                  <p>完成缴费</p>
                  <span v-text="publicData.createTime"></span>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div class="_payList clearfix">
          <Row>
            <Col span="24" class="pl20 pr20">
              <Table ref="table" stripe border align="center" :loading="payList.loading" :columns="payList.header" :data="payList.bodyList"></Table>
            </Col>
          </Row>
          <!-- <div>
            <button class="_exportBtn" @click="exportData">导出数据</button>
          </div> -->
        </div>
        <div class="_page clearfix">
          <Row>
            <Col span="12" offset="6" class="tc">
              <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import headTop from '@/components/header/head'
import regi from '@/config/regiType.js'

export default {
  name: 'payment_info',
  components: { headTop },
  props: [],
  data () {
    return {
      publicData: null,
      dataObj: null,
      payList: {
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
            title: '代理人',
            key: 'proxyName',
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
            title: '仲裁收费(元)',
            key: 'cost',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, params.row.cost + ' 元')
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
    if (this.paymentInfoId !== '') {
      this.publicData = JSON.parse(this.paymentInfoId)
      this.resPayment()
    } else {
      this.goPaymentSlip()
    }
  },
  beforeDestroy () {
    this.setPaymentInfoId('')
  },
  computed: {
    ...mapGetters([
      'paymentInfoId'
    ])
  },
  methods: {
    ...mapActions([
      'setPaymentInfoId',
      'setMyCaseId',
      'setMyCaseOldId',
      'setMyCaseState',
      'setGoPaymentCaseIds',
      'setMyCaseShowBtn',
      'setMyCasePartieType',
      'setMyCaseCrossE'
    ]),
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resPayment()
    },
    resPayment () {
      axios.post('/payment/details', {
        id: this.publicData.id,
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize
      }).then(res => {
        let _data = res.data.data
        this.payList.bodyList = _data.dataList
        this.pageObj.total = _data.totalCount
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    exportData () {
      axios.post('/person/paymentDetail/build', this.dataObj).then(res => {
        this.dowPdf(res.data.data)
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    dowPdf (fileId) {
      window.open(regi.api + '/file/dowload/' + fileId, '_blank')
    },
    goPaymentSlip () {
      this.$router.push({
        path: '/paymentSlip'
      })
    },
    goCaseInfo (index) {
      this.setMyCaseId(this.payList.bodyList[index].id)
      window.localStorage.setItem('myCaseId', this.payList.bodyList[index].id)
      this.setMyCaseOldId(this.payList.bodyList[index].oldId)
      window.localStorage.setItem('myCaseOldId', this.payList.bodyList[index].oldId)
      this.setMyCaseState(this.payList.bodyList[index].state)
      window.localStorage.setItem('myCaseState', this.payList.bodyList[index].state)
      this.setMyCaseShowBtn(this.payList.bodyList[index].showBtn)
      window.localStorage.setItem('myCaseShowBtn', JSON.stringify(this.payList.bodyList[index].showBtn))
      this.setMyCasePartieType(this.payList.bodyList[index].partieType)
      window.localStorage.setItem('myCasePartieType', this.payList.bodyList[index].partieType)
      this.setMyCaseCrossE(this.payList.bodyList[index].crossExamination)
      window.localStorage.setItem('myCaseCrossE', this.payList.bodyList[index].crossExamination)
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
  ._payment {
    padding-bottom: 60px;
    ._top {
      @include backgroundLine(right, #1a2b58, #126eaf);
      @include borderRadius(5px);
      text-align: center;
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 20px;
    }
    ._mid {
      @include borderRadius(3px);
      @include boxShadow(0 1px 6px -1px #bbb);
      background: #fff;
      margin-top: 10px;
      padding: 10px 5px 10px 30px;
      p {
        padding: 5px 0;
        span {
          margin-left: 10px;
        }
      }
      ._line {
        text-align: center;
        ._record {
          line-height: 22px;
        }
        ._bL b {
          @include backgroundLine(right, #126eaf, #164D84);
        }
        ._bR b {
          @include backgroundLine(right, #164D84, #1a2b58);
        }
        b {
          display: inline-block;
          width: 100%;
          height: 3px;
          vertical-align: middle;
        }
      }
    }
  }
  ._payList {
    padding-bottom: 20px;
    ._exportBtn {
      @include btn(#126eaf, 90px, 14px, 32px);
      @include boxShadow(0 1px 6px -1px #bbb);
      @include borderRadius(4px);
      float: right;
      margin-right: 20px;
      margin-top: 20px;
    }
  }
  ._page {
    padding-bottom: 60px;
  }
}
</style>
