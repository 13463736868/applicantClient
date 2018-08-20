<template>
  <div class="filing">
    <head-top :isRegister="true">
      <span class="f36 fcf">立案申请</span>
    </head-top>
    <alert-tip :alertShow="alertShow" @alertCancel="alertCancel" @alertConfirm="alertConfirm" alertTitle="提示" alertText="是否确定直接申请立案？">
    </alert-tip>
    <div class="_center pr">
      <spin-comp :spinShow="spinShow">
        <div>正在提交仲裁...</div>
      </spin-comp>
      <Row>
        <Col span="4" offset="1" class="_center_left not_s">
          <router-link v-for="item in menuClaim" :to='{path: "/filing" + item.url}' :key="item.id" tag="li" v-text="item.text"></router-link>
        </Col>
        <Col span="17" class="_center_right">
          <router-view></router-view>
          <case-submit @saveClick="caseSubInfo"></case-submit>
        </Col>
      </Row>
    </div>
    <alert-tip :alertShow="alertShowSub" @alertCancel="caseSubCanc" @alertConfirm="caseSubSave" alertTitle="提示" alertText="确定提交仲裁吗？"></alert-tip>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import headTop from '@/components/header/head'
import alertTip from '@/components/common/alertTip'
import spinComp from '@/components/common/spin'
import caseSubmit from '@/page/filing/children/caseSubmit'

export default {
  name: 'filing',
  components: { headTop, alertTip, spinComp, caseSubmit },
  data () {
    return {
      spinShow: false,
      alertShow: false,
      alertShowSub: false,
      committeeCode: null,
      caseInfo: null,
      menuClaim: [
        {
          id: '0',
          text: '申请人',
          url: '/proposer'
        },
        {
          id: '1',
          text: '被申请人',
          url: '/respondent'
        },
        {
          id: '2',
          text: '请求',
          url: '/claimItems'
        },
        {
          id: '3',
          text: '证据',
          url: '/evidences'
        }
      ]
    }
  },
  created () {
    if (this.caseId === '') {
      this.alertShow = true
    } else {
      this.resCaseInfo(this.caseId)
    }
  },
  computed: {
    ...mapGetters([
      'caseId'
    ])
  },
  methods: {
    ...mapActions([
      'setCaseId',
      'setCaseInfo'
    ]),
    resCaseInfo (id) {
      axios.post('/case/details', {
        id: this.caseId
      }).then(res => {
        this.caseInfo = res.data.data
        this.setCaseInfo(res.data.data)
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    alertCancel () {
      this.$Message.info({
        content: '将在2秒后返回上个页面',
        duration: 2,
        onClose: () => {
          setTimeout(() => {
            this.alertShow = false
            this.$router.go(-1)
          })
        }
      })
    },
    alertConfirm () {
      axios.post('/case/new').then(res => {
        this.alertShow = false
        window.localStorage.setItem('caseId', res.data.data.id)
        this.setCaseId(res.data.data.id)
        this.resCaseInfo(res.data.data.id)
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    caseSubInfo (code) {
      this.alertShowSub = true
      this.committeeCode = code
    },
    caseSubSave () {
      this.spinShow = true
      axios.post('/case/submit', {
        caseId: this.caseId,
        commissionType: this.committeeCode
      }).then(res => {
        this.spinShow = false
        this.alertShowSub = false
        this.$Message.success({
          content: '提交仲裁成功,将跳转到我的案件',
          duration: 2,
          onClose: () => {
            setTimeout(() => {
              this.$router.push({
                path: '/home'
              })
            })
          }
        })
      }).catch(e => {
        this.spinShow = false
        this.alertShowSub = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    caseSubCanc () {
      this.alertShowSub = false
      this.committeeCode = null
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
  ._center_left {
    text-align: left;
    li {
      @include hand;
      margin-left: 75px;
      margin-bottom: 8px;
      padding-left: 8px;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      border-left: 4px solid transparent;
    }
    li.router-link-exact-active {
      border-left: 4px solid #1a2b58;
      padding-left: 8px;
    }
  }
}
</style>
