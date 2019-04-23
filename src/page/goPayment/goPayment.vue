<template>
  <div class="goPayment">
    <head-top :isRegister="true">
      <span class="f36 fcf">缴 费</span>
    </head-top>
    <div class="_center pr">
      <Row>
        <Col span="24" class="pl20 pr20 pb20">
          <Table stripe border align="center" :loading="caseList.loading" :columns="caseList.header" :data="caseList.bodyList"></Table>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <div class="_payment">
            <div class="_top">对公转帐</div>
            <p class="_caption">请在15日内，根据下面金额预交案件仲裁费用，对公转账后对账周期一般为3个工作日（周末、节假日顺延）。</p>
            <div v-if="dataObj !== null" class="_mid">
              <Row>
                <Col span="22" offset="1">
                  <Row>
                    <Col class="_label" span="11">
                      <p>开户银行：</p>
                      <p v-text="dataObj.bank"></p>
                    </Col>
                    <Col class="_label" span="11" offset="2">
                      <p>开户名称：</p>
                      <p v-text="dataObj.accountName"></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col class="_label" span="11">
                      <p>帐户：</p>
                      <p v-text="dataObj.account"></p>
                    </Col>
                    <Col class="_label" span="11" offset="2">
                      <p>仲裁费(合计)：</p>
                      <p v-text="costTotal === 0 ? '' : costTotal + ' 元'"></p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          <Row class="pb40">
            <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="goHome">返 回</button></Col>
            <Col class="tc" span="10" offset="2"><button class="_saveBtn" @click="addPayment">确认已交费</button></Col>
          </Row>
        </Col>
      </Row>
    </div>
    <alert-btn-info :isCancBtn="true" :isSaveBtn="true" :alertShow="alertShow.addP" alertTitle="操作">
      <Row>
        <Col span="24">
          <upload-book :arbiId="arbiId" :caseIds="caseIds" :costTotal="costTotal" :moneyTotal="moneyTotal" childName="上传缴费凭证文件" :fileType="['jpg','jpeg','png', 'pdf']" :uploadUrl="resAddpUrl" @saveClick="addpSave" @cancClick="alertCanc('addP')"></upload-book>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import headTop from '@/components/header/head'
import alertBtnInfo from '@/components/common/alertBtnInfo'
import uploadBook from '@/page/goPayment/children/uploadBook'
import regi from '@/config/regiType.js'

export default {
  name: 'go_payment',
  components: { headTop, alertBtnInfo, uploadBook },
  props: [],
  data () {
    return {
      caseIds: null,
      arbiId: null,
      dataObj: null,
      costTotal: 0,
      moneyTotal: 0,
      spinShow: false,
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
            title: '仲裁费用(元)',
            key: 'cost',
            minWidth: 30,
            align: 'center',
            render: (h, params) => {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  fontWeight: '700'
                }
              }, params.row.cost)
            }
          }
        ],
        bodyList: []
      },
      alertShow: {
        addP: false
      }
    }
  },
  created () {
    if (this.goPaymentCaseIds !== '' && this.goPaymentArbiId !== '') {
      this.caseIds = this.goPaymentCaseIds
      this.arbiId = this.goPaymentArbiId
      this.resMineList()
      this.resPayment()
    } else {
      this.goHome()
    }
  },
  beforeDestroy () {
    this.setGoPaymentCaseIds('')
    this.setGoPaymentArbiId('')
  },
  computed: {
    ...mapGetters([
      'goPaymentCaseIds',
      'goPaymentArbiId'
    ]),
    resAddpUrl () {
      return regi.api + '/payment/add'
    }
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
    resMineList () {
      this.spinShow = true
      axios.post('/case/mine', {
        pageIndex: 0,
        pageSize: 999,
        keyword: '',
        caseState: 2,
        caseIds: this.caseIds,
        arbitrationId: this.arbiId
      }).then(res => {
        let _data = res.data.data
        this.caseList.bodyList = _data.dataList === null ? [] : _data.dataList
        this.rescostTotal()
        this.spinShow = false
      }).catch(e => {
        this.spinShow = false
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    rescostTotal () {
      let _costNum = 0
      let _moneyNum = 0
      this.caseList.bodyList.forEach((a) => {
        _costNum += (a.cost - 0)
        _moneyNum += (a.money - 0)
      })
      this.costTotal = _costNum.toFixed(2)
      this.moneyTotal = _moneyNum.toFixed(2)
    },
    resPayment () {
      axios.post('/case/payFee', {
        arbitrationId: this.arbiId
      }).then(res => {
        this.dataObj = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    addPayment () {
      this.alertShow.addP = true
    },
    addpSave (obj) {
      this.$Message.success({
        content: '缴费单号:' + obj,
        duration: 10,
        closable: true
      })
      this.goHome()
    },
    goHome () {
      this.$router.push({
        path: '/home'
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
    alertCanc (type) {
      if (type === 'addP') {
        this.alertShow.addP = false
      }
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
    padding-bottom: 30px;
    ._top {
      @include backgroundLine(right, #1a2b58, #126eaf);
      @include borderRadius(5px);
      text-align: center;
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 20px;
    }
    ._caption {
      padding: 20px 0;
      text-align: center;
      color: #126eaf;
      font-weight: 700;
    }
    ._mid {
      @include borderRadius(3px);
      @include boxShadow(0 1px 6px -1px #bbb);
      background: #fff;
      margin-top: 10px;
      padding: 10px 0 20px;
      ._label {
        border-bottom: 1px solid #eee;
        p {
          padding: 10px 0 5px;
          font-size: 12px;
        }
        p:first-child {
          font-weight: 700;
        }
      }
    }
  }
  ._cancelBtn {
    @include btn(#fff, 90px, 14px, 32px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
    color: #126eaf;
  }
  ._saveBtn {
    @include btn(#126eaf, 90px, 14px, 32px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
  }
}
</style>
