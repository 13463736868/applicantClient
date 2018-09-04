<template>
  <div class="rightArbi">
    <div class="_arbiInfo">
      <div class="_top">仲裁委信息</div>
      <div class="_mid">
        <Row>
          <Col span="22" offset="1">
            <div class="_logo">
              <img :src="logo.url" alt="">
              <div class="f14 pt5"><b>中国盐城仲裁委员会</b></div>
              <div><b>YanCheng Arbitration Commission</b></div>
            </div>
            <p>
              <span class="mr10"><b>电话 :</b></span>
              <span class="mr10">0515-88123589</span>
            </p>
            <p>
              <span class="mr10"><b>地址 :</b></span>
              <span class="mr10">江苏省盐城市人民南路106号</span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_caseInfo">
      <div class="_top">案件信息</div>
      <div class="_mid">
        <Row v-if="dataInfoShow">
          <Col span="22" offset="1">
            <p>
              <span class="mr10"><b>仲裁机构 :</b></span>
              <span class="mr10" v-text="dataInfo.carbitrationNameode"></span>
            </p>
            <p>
              <span class="mr10"><b>案件案号 :</b></span>
              <span class="mr10" v-text="dataInfo.code"></span>
            </p>
            <p>
              <span class="mr10"><b>纠纷类型 :</b></span>
              <span class="mr10" v-text="dataInfo.caseType"></span>
            </p>
            <p>
              <span class="mr10"><b>案件状态 :</b></span>
              <span class="mr10" v-text="dataInfo.caseState"></span>
            </p>
            <p>
              <span class="mr10"><b>仲裁员 :</b></span>
              <span class="mr10" v-text="dataInfo.arbitratorName"></span>
            </p>
            <p>
              <span class="mr10"><b>秘书 :</b></span>
              <span class="mr10" v-text="dataInfo.secretaryName"></span>
            </p>
            <p>
              <span class="mr10"><b>电话 :</b></span>
              <span class="mr10" v-text="dataInfo.secretaryPhone"></span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_myCaseSub">
      <Row>
        <Col v-if="btnShow.avoidShow" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="avoidClick">申请仲裁员回避</button></Col>
          </Row>
        </Col>
        <Col v-if="btnShow.retractShow" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="retractClick">撤回案件</button></Col>
          </Row>
        </Col>
        <Col v-if="btnShow.selectShow" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="selectClick">选择仲裁员</button></Col>
          </Row>
        </Col>
        <Col v-if="btnShow.replClick" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="replClick">补正</button></Col>
          </Row>
        </Col>
        <Col v-if="btnShow.counterclaim" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="counteClick">反请求</button></Col>
          </Row>
        </Col>
        <Col v-if="btnShow.rightOfJ" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="rightOfJClick">管辖权异议</button></Col>
          </Row>
        </Col>
      </Row>
    </div>
    <alert-btn-info :alertShow="alertShow.avoi" @alertConfirm="avoiSave" @alertCancel="alertCanc('avoi')" alertTitle="申请仲裁员回避">
      <Input v-model="dataObj.avoi" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请输入原因..." />
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.repl" @alertConfirm="replSave" @alertCancel="alertCanc('repl')" alertTitle="申请补证">
      <Input v-model="dataObj.repl" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请输入原因..." />
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.coun" @alertConfirm="counSave" @alertCancel="alertCanc('coun')" alertTitle="申请反请求">
      <p>确定要申请反请求吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.righ" @alertConfirm="righSave" @alertCancel="alertCanc('righ')" alertTitle="申请管辖权异议">
      <Input v-model="dataObj.righ" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请输入原因..." />
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.retr" @alertConfirm="retrSave" @alertCancel="alertCanc('retr')" alertTitle="申请撤回案件">
      <spin-comp :spinShow="spinShow">
        <div v-if="progressText !== null" v-text="progressText"></div>
      </spin-comp>
      <p style="padding-bottom:10px;">确定要申请撤回案件吗？</p>
      <Upload
        ref="upload"
        name="file"
        type="drag"
        action="/api/case/withdraw"
        :with-credentials="true"
        :show-upload-list="false"
        :format="['jpg','jpeg','png','doc','docx','pdf']"
        :max-size="10240"
        :data="retrData"
        :on-format-error="resFormError"
        :on-exceeded-size="resSizeError"
        :before-upload="resBefoUpload"
        :on-progress="resProgress"
        :on-success="resSuccess"
        :on-error="resError"
      >
        <div class="_text" style="padding:20px 0;">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p v-if="dataObj.retr === null" v-text="'请上传撤回申请书 ( 上传类型只支持 jpg、jpeg、png、doc、docx、pdf )'"></p>
          <div v-if="dataObj.retr !== null" v-text="dataObj.retr.name"></div>
        </div>
      </Upload>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/page/caseInfo/children/children/alertBtnInfo'

export default {
  name: 'right_arbi',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: false,
      progressText: null,
      logo: {
        url: '../../static/images/logoR.png'
      },
      dataInfoShow: false,
      dataInfo: null,
      addSubmit: false,
      btnShow: {
        avoidShow: false,
        retractShow: false,
        selectShow: false,
        replClick: false,
        counterclaim: false,
        rightOfJ: false
      },
      alertShow: {
        avoi: false,
        retr: false,
        sele: false,
        repl: false,
        coun: false,
        righ: false
      },
      dataObj: {
        avoi: null,
        retr: null,
        sele: null,
        repl: null,
        coun: null,
        righ: null
      }
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      this.resCaseItem()
    }
    if (this.myCaseShowBtn !== null) {
      this.isShowBtn()
    }
  },
  computed: {
    ...mapGetters([
      'myCaseShowBtn'
    ]),
    retrData () {
      let _data = {}
      _data.caseId = this.caseOldId
      return _data
    }
  },
  methods: {
    ...mapActions([
      'setCaseId',
      'setMyCaseShowBtn'
    ]),
    resCaseItem () {
      axios.post('/case/queryCaseItem', {
        id: this.caseId
      }).then(res => {
        this.dataInfo = res.data.data
        this.dataInfoShow = true
      }).catch(e => {
        this.dataInfoShow = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    isShowBtn () {
      // this.btnShow.avoidShow = true
      // this.btnShow.retractShow = true
      // this.btnShow.selectShow = true
      // this.btnShow.replClick = true
      // this.btnShow.counterclaim = true
      // this.btnShow.rightOfJ = true
      if (this.myCaseShowBtn.debarbArbitrator === 1) {
        this.btnShow.avoidShow = true
      }
      if (this.myCaseShowBtn.revocation === 1) {
        this.btnShow.retractShow = true
      }
      if (this.myCaseShowBtn.changeArbitrator === 1) {
        this.btnShow.selectShow = true
      }
      if (this.myCaseShowBtn.applyCorrect === 1) {
        this.btnShow.replClick = true
      }
      if (this.myCaseShowBtn.counterclaim === 1) {
        this.btnShow.counterclaim = true
      }
      if (this.myCaseShowBtn.rightOfJurisdiction === 1) {
        this.btnShow.rightOfJ = true
      }
    },
    avoidClick () {
      this.alertShow.avoi = true
    },
    avoiSave () {
      if (this.dataObj.avoi === null) {
        this.$Message.warning({
          content: '回避原因不能为空',
          duration: 5
        })
      } else if (this.dataObj.avoi === '') {
        this.$Message.warning({
          content: '回避原因不能为空',
          duration: 5
        })
      } else {
        axios.post('/case/applyAvoid', {
          id: this.caseId,
          reason: this.dataObj.avoi,
          partyType: this.partieType
        }).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.debarbArbitrator = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.alertCanc('avoi')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.alertCanc('avoi')
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    retractClick () {
      this.alertShow.retr = true
    },
    resFormError () {
      this.$Message.error({
        content: '文件格式错误只支持 jpg、jpeg、png、doc、docx、pdf',
        duration: 5
      })
    },
    resSizeError () {
      this.$Message.error({
        content: '文件不能超过10MB',
        duration: 5
      })
    },
    resBefoUpload (file) {
      this.dataObj.retr = file
      return false
    },
    resProgress (event, file) {
      let _percent = event.percent
      if (_percent === 100) {
        this.progressText = 99 + '%'
      } else {
        this.progressText = Math.floor(event.percent) + '%'
      }
    },
    resSuccess (res, file) {
      if (res.flag === false) {
        this.spinShow = false
        this.alertCanc('retr')
        this.$Message.error({
          content: '错误信息:' + res.message + ' 稍后再试',
          duration: 5
        })
      } else {
        this.progressText = '100%'
        this.spinShow = false
        this.alertCanc('retr')
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
      }
    },
    resError (error, file) {
      this.spinShow = false
      this.alertCanc('retr')
      this.$Message.error({
        content: '错误信息:' + error.status + ' 稍后再试',
        duration: 5
      })
    },
    retrSave () {
      this.spinShow = true
      if (this.dataObj.retr === null) {
        axios.post('/case/withdraw', this.retrData).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.revocation = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.spinShow = false
          this.alertCanc('retr')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.spinShow = false
          this.alertCanc('retr')
          this.$Message.error({
            content: '错误信息:' + e.status + ' 稍后再试',
            duration: 5
          })
        })
      } else {
        this.$refs.upload.post(this.dataObj.retr)
      }
    },
    selectClick () {
      console.log('选择仲裁员')
    },
    replClick () {
      this.alertShow.repl = true
    },
    replSave () {
      if (this.dataObj.repl === null) {
        this.$Message.warning({
          content: '补证原因不能为空',
          duration: 5
        })
      } else if (this.dataObj.repl === '') {
        this.$Message.warning({
          content: '补证原因不能为空',
          duration: 5
        })
      } else {
        axios.post('/case/applyAdditions', {
          caseId: this.caseOldId,
          reason: this.dataObj.repl,
          partyType: this.partieType
        }).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.applyCorrect = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.alertCanc('repl')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.alertCanc('repl')
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    counteClick () {
      this.alertShow.coun = true
    },
    counSave () {
      axios.post('/case/counterclaim', {
        id: this.caseId
      }).then(res => {
        this.alertCanc('coun')
        window.localStorage.setItem('caseId', res.data.data.id)
        this.setCaseId(res.data.data.id)
        this.$router.push({
          path: '/filing'
        })
      }).catch(e => {
        this.alertCanc('coun')
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    rightOfJClick () {
      this.alertShow.righ = true
    },
    righSave () {
      if (this.dataObj.righ === null) {
        this.$Message.warning({
          content: '管辖权异议原因不能为空',
          duration: 5
        })
      } else if (this.dataObj.righ === '') {
        this.$Message.warning({
          content: '管辖权异议原因不能为空',
          duration: 5
        })
      } else {
        axios.post('/case/dissidence', {
          id: this.caseId,
          reason: this.dataObj.righ
        }).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.rightOfJurisdiction = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.alertCanc('righ')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.alertCanc('righ')
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    alertCanc (type) {
      this.alertShow[type] = false
      this.dataObj[type] = null
    }
  },
  watch: {
    myCaseShowBtn: function (val) {
      if (val !== null) {
        this.isShowBtn()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.rightArbi {
  padding-left: 6px;
  ._caseInfo {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._arbiInfo ._top, ._caseInfo ._top {
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._arbiInfo ._mid, ._caseInfo ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    margin-top: 10px;
    background: #fff;
    padding: 10px 0;
    p {
      padding: 5px 0;
    }
  }
  ._myCaseSub {
    ._saveBtn {
      @include btn(#126eaf, 140px, 13px, 40px);
      @include boxShadow(0 1px 6px -1px #bbb);
      @include borderRadius(4px);
      margin-bottom: 20px;
    }
    ._saveBtn._disabled {
      @include btn(#ccc, 140px, 13px, 40px);
    }
    ._saveBtn:focus {
      outline: 0px;
    }
  }
  ._logo {
    padding: 5px 0;
    text-align: center;
  }
}
</style>
