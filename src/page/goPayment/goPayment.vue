<template>
  <div class="goPayment">
    <head-top :isRegister="true">
      <span class="f36 fcf">缴 费</span>
    </head-top>
    <div class="_center pr">
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
                      <p>帐户：</p>
                      <p v-text="dataObj.account"></p>
                    </Col>
                    <Col class="_label" span="11" offset="2">
                      <p>仲裁费：</p>
                      <p v-text="dataObj.money + ' 元'"></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col class="_label" span="11">
                      <p>开户名称：</p>
                      <p v-text="dataObj.accountName"></p>
                    </Col>
                    <Col class="_label" span="11" offset="2">
                      <p>立案秘书：</p>
                      <p v-text="dataObj.name"></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col class="_label" span="11">
                      <p>开户银行：</p>
                      <p v-text="dataObj.bank"></p>
                    </Col>
                    <Col class="_label" span="11" offset="2">
                      <p>电话：</p>
                      <p v-text="dataObj.phone"></p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import headTop from '@/components/header/head'

export default {
  name: 'go_payment',
  components: { headTop },
  props: [],
  data () {
    return {
      oldId: null,
      dataObj: null
    }
  },
  created () {
    if (this.goPaymentOldId) {
      this.oldId = this.goPaymentOldId
      this.resPayment()
    }
  },
  beforeDestroy () {
    this.setGoPaymentOldId('')
  },
  computed: {
    ...mapGetters([
      'goPaymentOldId'
    ])
  },
  methods: {
    ...mapActions([
      'setGoPaymentOldId'
    ]),
    resPayment () {
      axios.post('/case/payFee', {
        caseId: this.oldId
      }).then(res => {
        this.dataObj = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
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
}
</style>
