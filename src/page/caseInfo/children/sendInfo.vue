<template>
  <div class="sendInfo">
    <div class="_infoStatus">
      <div class="_top">信息状态</div>
      <div class="_mid">
        <Row>
          <Col span="24" class="">
            <Table ref="table" stripe align="center" :loading="sendInfoList.loading" :columns="sendInfoList.header" :data="sendInfoList.bodyList"></Table>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_emailWarn">
      <div class="_top">电子邮件送达</div>
      <div class="_mid">
        <Row>
          <Col span="24" class="">
            <Table ref="table" stripe align="center" :loading="emailWarnList.loading" :columns="emailWarnList.header" :data="emailWarnList.bodyList"></Table>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_smsWarn">
      <div class="_top">短信提醒</div>
      <div class="_mid">
        <Row>
          <Col span="24" class="">
            <Table ref="table" stripe align="center" :loading="smsWarnList.loading" :columns="smsWarnList.header" :data="smsWarnList.bodyList"></Table>
          </Col>
        </Row>
      </div>
    </div>
    <alert-see-info :alertShow="alertShowSub" @alertConfirm="seeInfoSave" alertTitle="查看">
      <div v-if="alertShowSub">
        <Row>
          <Col span="6">
            <p class="p5 tr"><b>接收者姓名：</b></p>
          </Col>
          <Col span="16">
            <p class="p5" v-text="alertObj.name"></p>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <p class="p5 tr"><b v-text="alertObj.type"></b></p>
          </Col>
          <Col span="16">
            <p class="p5" v-text="alertObj.eOrS"></p>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <p class="p5 tr"><b>发送时间：</b></p>
          </Col>
          <Col span="16">
            <p class="p5" v-text="alertObj.time"></p>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <p class="p5 tr"><b>发送内容：</b></p>
          </Col>
          <Col span="16">
            <p class="p5" v-text="alertObj.content"></p>
          </Col>
        </Row>
      </div>
    </alert-see-info>
  </div>
</template>

<script>
import axios from 'axios'
import alertSeeInfo from '@/page/caseInfo/children/children/alertSeeInfo'

export default {
  name: 'sendInfo',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { alertSeeInfo },
  data () {
    return {
      alertShowSub: false,
      alertObj: {
        type: null,
        name: null,
        eOrS: null,
        time: null,
        content: null
      },
      sendInfoList: {
        loading: false,
        header: [
          {
            title: '当事人 (申请人)',
            key: 'name',
            align: 'center'
          },
          {
            title: '送达名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '送达时间',
            key: 'sendTime',
            align: 'center'
          }
        ],
        bodyList: []
      },
      emailWarnList: {
        loading: false,
        header: [
          {
            title: '接收者 (被申请人邮箱)',
            key: 'toName',
            align: 'center',
            minWidth: 70,
            render: (h, params) => {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, params.row.toName + ' (' + params.row.sendTo + ')')
            }
          },
          {
            title: '送达名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '送达时间',
            key: 'sendtime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.resSeeEInfo('email', params.index)
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        bodyList: []
      },
      smsWarnList: {
        loading: false,
        header: [
          {
            title: '接收者 (被申请人手机)',
            key: 'toName',
            align: 'center',
            minWidth: 70,
            render: (h, params) => {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, params.row.toName + ' (' + params.row.receiver + ')')
            }
          },
          {
            title: '送达名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '送达时间',
            key: 'sendtime',
            align: 'center'
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.resSeeEInfo('sms', params.index)
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        bodyList: []
      }
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      this.resSendInfo()
    }
  },
  methods: {
    resSendInfo () {
      axios.post('/case/findNoticeList', {
        id: this.caseId,
        messageType: 'sms'
      }).then(res => {
        this.sendInfoList.bodyList = res.data.data === null ? [] : res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
      axios.post('/case/findEmailMessageList', {
        caseId: this.caseId
      }).then(res => {
        this.emailWarnList.bodyList = res.data.data === null ? [] : res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
      axios.post('/case/findSmsMessageList', {
        caseId: this.caseId
      }).then(res => {
        this.smsWarnList.bodyList = res.data.data === null ? [] : res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resSeeEInfo (type, index) {
      if (type === 'email') {
        this.alertObj.type = '接收者邮箱：'
        this.alertObj.name = this.emailWarnList.bodyList[index].toName
        this.alertObj.eOrS = this.emailWarnList.bodyList[index].sendTo
        this.alertObj.time = this.emailWarnList.bodyList[index].sendtime
        this.alertObj.content = this.emailWarnList.bodyList[index].content
      } else if (type === 'sms') {
        this.alertObj.type = '接收者手机：'
        this.alertObj.name = this.smsWarnList.bodyList[index].toName
        this.alertObj.eOrS = this.smsWarnList.bodyList[index].receiver
        this.alertObj.time = this.smsWarnList.bodyList[index].sendtime
        this.alertObj.content = this.smsWarnList.bodyList[index].content
      }
      this.alertShowSub = true
    },
    seeInfoSave () {
      this.alertShowSub = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.sendInfo {
  ._emailWarn, ._smsWarn {
    padding-top: 60px;
  }
  ._smsWarn {
    padding-bottom: 60px;
  }
  ._infoStatus ._top, ._emailWarn ._top, ._smsWarn ._top {
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._infoStatus ._mid, ._emailWarn ._mid, ._smsWarn ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
  }
}
</style>
