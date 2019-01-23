<template>
  <div class="paymentInfo">
    <head-top :isRegister="true">
      <span class="f36 fcf">缴费单查询</span>
    </head-top>
    <div class="_center pr">
      <Row v-if="dataObj !== null">
        <Col span="14" offset="5">
          <div class="_payment">
            <div class="_top">缴费单详情</div>
            <div class="_mid">
              <p><b>支付方式：</b><span>对公转账</span></p>
              <p><b>金额：</b><span v-text="dataObj.cost"></span> 元</p>
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
                  <span v-text="dataObj.acceptTime"></span>
                </Col>
                <Col class="tc" span="5">
                  <p>进行中</p>
                </Col>
                <Col class="tr" span="9">
                  <p>完成缴费</p>
                  <span v-text="dataObj.acceptTime"></span>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row v-if="dataObj !== null">
        <div class="_payList clearfix">
          <Row>
            <Col span="24" class="pl20 pr20">
              <Table ref="table" stripe border align="center" :loading="payList.loading" :columns="payList.header" :data="payList.bodyList"></Table>
            </Col>
          </Row>
          <div>
            <button class="_exportBtn" @click="exportData">导出数据</button>
          </div>
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
      id: null,
      dataObj: null,
      payList: {
        loading: false,
        header: [
          {
            title: '序号',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '0' + (params.index + 1))
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
            title: '提交申请时间',
            key: 'createtime',
            align: 'center'
          },
          {
            title: '审核通过时间',
            key: 'acceptTime',
            align: 'center'
          },
          {
            title: '收款方',
            key: 'receivables',
            align: 'center'
          },
          {
            title: '仲裁收费',
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
      }
    }
  },
  created () {
    if (this.paymentInfoId) {
      this.id = this.paymentInfoId
      this.resPayment()
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
      'setPaymentInfoId'
    ]),
    resPayment () {
      axios.post('/person/paymentDetail', {
        caseId: this.id
      }).then(res => {
        this.dataObj = res.data.data[0]
        this.payList.bodyList = res.data.data
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
    padding-bottom: 60px;
    ._exportBtn {
      @include btn(#126eaf, 90px, 14px, 32px);
      @include boxShadow(0 1px 6px -1px #bbb);
      @include borderRadius(4px);
      float: right;
      margin-right: 20px;
      margin-top: 20px;
    }
  }
}
</style>
