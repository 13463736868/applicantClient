<template>
  <div class="paymentSlip">
    <head-top :isRegister="true">
      <span class="f36 fcf">交费单查询</span>
    </head-top>
    <div class="_center pr">
      <spin-comp :spinShow="spinShow"></spin-comp>
      <Row>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">搜索</label>
        </Col>
        <Col span="8">
          <Input v-model="search.text" icon="ios-search-strong" class="_search" @on-click="resSearch" @keyup.enter.native="resSearch" placeholder="交费单号"></Input>
        </Col>
        <!-- <Col span="8">
          <label class="lh32 f16 fc6 fr mr15">仲裁委</label>
        </Col>
        <Col span="6">
          <Select v-model="committeeStatus" style="width:200px" @on-change="resChangeStatus()">
            <Option v-for="item in committeeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col> -->
      </Row>
      <div class="_payList clearfix">
        <Row>
          <Col span="24" class="pl20 pr20">
            <Table stripe border align="center" :loading="payList.loading" :columns="payList.header" :data="payList.bodyList"></Table>
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
    <alert-btn-info :alertShow="alertShow.canc" @alertCancel="alertCanc('canc')" @alertConfirm="cancSave" alertTitle="提示">
      <p>确定要撤回这个交费批次吗？</p>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/components/common/alertBtnInfo'

export default {
  name: 'paymentSlip',
  components: { headTop, spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: true,
      search: {
        text: ''
      },
      committeeList: [],
      committeeStatus: '',
      payList: {
        loading: false,
        header: [
          {
            title: '交费单号',
            key: 'paymentNumber',
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
              }, params.row.paymentNumber)
            }
          },
          {
            title: '订单状态',
            key: 'statusName',
            align: 'center'
          },
          {
            title: '案件个数',
            key: 'caseNum',
            align: 'center'
          },
          {
            title: '提交时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '总支付金额(元)',
            key: 'costTotal',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, params.row.costTotal + ' 元')
            }
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              if (params.row.status === 1) {
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
                        this.seeFile(params.row.filepath)
                      }
                    }
                  }, '查看交费凭证'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.resCanc(params.index)
                      }
                    }
                  }, '撤回')
                ])
              } else {
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
                        this.seeFile(params.row.filepath)
                      }
                    }
                  }, '查看交费凭证')
                ])
              }
            }
          }
        ],
        bodyList: []
      },
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      alertShow: {
        canc: false,
        id: null
      }
    }
  },
  created () {
    this.resDictionary('commissionType')
  },
  methods: {
    ...mapActions([
      'setPaymentInfoId'
    ]),
    resDictionary (itemGroup) {
      axios.post('/dictionary/' + itemGroup).then(res => {
        let _dataList = res.data.data
        let _select = []
        for (let k in _dataList) {
          let _o = {}
          _o.value = _dataList[k].itemValue
          _o.label = _dataList[k].item
          _select.push(_o)
        }
        this.committeeList = _select
        this.committeeStatus = this.committeeList === '' ? '' : this.committeeList[0].value
        this.resPayList()
      }).catch(e => {
        if (this.spinShow) {
          this.spinShow = false
        }
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resPayList () {
      this.spinShow = true
      axios.post('/payment/list', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize,
        paymentNumber: this.search.text,
        commissionType: this.committeeStatus
      }).then(res => {
        let _data = res.data.data
        this.payList.bodyList = _data.dataList === null ? [] : _data.dataList
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
    goPaymentInfo (index) {
      this.setPaymentInfoId(JSON.stringify(this.payList.bodyList[index]))
      window.localStorage.setItem('paymentInfoId', JSON.stringify(this.payList.bodyList[index]))
      this.$router.push({
        path: '/paymentInfo'
      })
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.resPayList()
    },
    resChangeStatus () {
      this.pageObj.pageNum = 1
      this.resPayList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resPayList()
    },
    seeFile (path) {
      window.open(path, '_blank')
    },
    resCanc (index) {
      this.alertShow.id = this.payList.bodyList[index].id
      this.alertShow.canc = true
    },
    cancSave () {
      this.alertShow.canc = false
      axios.post('/payment/withdraw', {
        id: this.alertShow.id
      }).then(res => {
        this.resSearch()
        this.$Message.success({
          content: '撤回成功',
          duration: 2
        })
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    alertCanc (type) {
      if (type === 'canc') {
        this.alertShow.id = null
        this.alertShow.canc = false
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
  ._search {
    max-width: 450px;
    margin-bottom: 20px;
  }
  ._payList {
    margin-bottom: 20px;
  }
}
</style>
