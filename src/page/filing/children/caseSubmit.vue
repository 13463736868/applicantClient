<template>
  <div class="caseSubmit">
    <Row class="_labelFor">
      <Col span="3" class="_label">案件类型<b class="_b">*</b></Col>
      <Col span="4">
        <Select v-model="caseTypeStatus" @on-change="resAction('change_subm')" :disabled="parentCaseId !== null || (caseTypeId !== null && caseTypeId !== 'null')">
          <Option :disabled="item.status === 2" v-for="item in caseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="3" offset="1" class="_label">选择仲裁机构<b class="_b">*</b></Col>
      <Col span="4">
        <Select v-model="committeeStatus" :disabled="arbId !== null && arbId !== 'null'">
          <Option :disabled="item.state === 2" v-for="item in caseMap[caseTypeStatus]" :value="item.arbId" :key="item.arbId">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col span="4">
        <Row>
          <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="saveClick">仲 裁</button></Col>
        </Row>
      </Col>
      <Col span="4" offset="1">
        <Row>
          <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addHash}" v-bind:disabled="addHash" @click="hashClick">固 化</button></Col>
        </Row>
      </Col>
    </Row>
    <alert-tip :alertShow="alertShow.hash" @alertCancel="alertCanc('hash')" @alertConfirm="hashSave" alertTitle="提示" alertText="固化后证据不允许删除，确定要固化吗？"></alert-tip>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import alertTip from '@/components/common/alertTip'

export default {
  name: 'case_submit',
  components: { alertTip },
  data () {
    return {
      addSubmit: false,
      addHash: false,
      caseTypeList: [],
      caseTypeStatus: null,
      committeeStatus: null,
      caseMap: {},
      caseNameMap: {},
      alertShow: {
        hash: false
      }
    }
  },
  created () {
    this.resCaseType()
    this.resSelect()
  },
  computed: {
    ...mapGetters([
      'caseTypeId',
      'arbId',
      'caseInfo',
      'userInfo',
      'userState'
    ]),
    parentCaseId () {
      return this.caseInfo === null ? null : this.caseInfo.parentCaseId
    }
    // caseTypeStatus: {
    //   get: function () {
    //     return this.caseInfo !== null ? JSON.parse(JSON.stringify(this.caseInfo.type)) : ''
    //   },
    //   set: function () {
    //   }
    // },
    // committeeStatus: {
    //   get: function () {
    //     return this.caseInfo !== null ? JSON.parse(JSON.stringify(this.caseInfo.arbitrationId)) : ''
    //   },
    //   set: function () {
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'setFiling',
      'setUserState'
    ]),
    resSelect () {
      if (this.caseTypeId === null || this.caseTypeId === 'null') {
        this.caseTypeStatus = this.caseInfo !== null ? JSON.parse(JSON.stringify(this.caseInfo.type)) : ''
      } else {
        this.caseTypeStatus = this.caseTypeId
      }
      if (this.arbId === null || this.arbId === 'null') {
        this.committeeStatus = this.caseInfo !== null ? JSON.parse(JSON.stringify(this.caseInfo.arbitrationId)) : ''
      } else {
        this.committeeStatus = this.arbId
      }
      if (typeof this.caseTypeStatus === 'string' && this.caseTypeStatus !== '') {
        this.caseTypeStatus = this.caseTypeStatus - 0
      }
      if (typeof this.committeeStatus === 'string' && this.committeeStatus !== '') {
        this.committeeStatus = this.committeeStatus - 0
      }
    },
    saveClick () {
      this.resReg()
      // if (this.userState === null) {
      //   if (this.userInfo.verify === '1') {
      //     this.resReg()
      //   } else {
      //     axios.post('/person/checkState').then(res => {
      //       if (res.data.data.verify === '1') {
      //         if (window.localStorage) {
      //           let loc = window.localStorage
      //           loc.setItem('userState', JSON.stringify(res.data.data))
      //         }
      //         this.setUserState(res.data.data)
      //         this.resReg()
      //       } else {
      //         this.$Message.error({
      //           content: '请先完善通过身份绑定信息',
      //           duration: 5
      //         })
      //       }
      //     }).catch(e => {
      //       this.$Message.error({
      //         content: '错误信息:' + e + ' 稍后再试',
      //         duration: 5
      //       })
      //     })
      //   }
      // } else {
      //   if (this.userState.verify === '1') {
      //     this.resReg()
      //   } else {
      //     axios.post('/person/checkState').then(res => {
      //       if (res.data.data.verify === '1') {
      //         if (window.localStorage) {
      //           let loc = window.localStorage
      //           loc.setItem('userState', JSON.stringify(res.data.data))
      //         }
      //         this.setUserState(res.data.data)
      //         this.resReg()
      //       } else {
      //         this.$Message.error({
      //           content: '请先完善通过身份绑定信息',
      //           duration: 5
      //         })
      //       }
      //     }).catch(e => {
      //       this.$Message.error({
      //         content: '错误信息:' + e + ' 稍后再试',
      //         duration: 5
      //       })
      //     })
      //   }
      // }
    },
    resReg () {
      if (this.caseInfo.propList.lenght === 0) {
        this.$Message.error({
          content: '请填写申请人',
          duration: 5
        })
      } else if (this.caseInfo.respList.length === 0) {
        this.$Message.error({
          content: '请填写被申请人',
          duration: 5
        })
      } else if (this.caseInfo.requestList.length === 0) {
        this.$Message.error({
          content: '请填写被请求项',
          duration: 5
        })
      } else if (this.caseInfo.requestReasons === null) {
        this.$Message.error({
          content: '请填写事实与理由',
          duration: 5
        })
      } else if (this.caseInfo.arbRequisitionFile === null) {
        this.$Message.error({
          content: '请上传仲裁申请书',
          duration: 5
        })
      } else if (this.caseInfo.evidenceList.length === 0) {
        this.$Message.error({
          content: '请填写证据',
          duration: 5
        })
      } else {
        if (this.caseTypeStatus === '') {
          this.$Message.error({
            content: '案件类型不能为空',
            duration: 5
          })
          return false
        }
        if (this.committeeStatus === '') {
          this.$Message.error({
            content: '提交仲裁委不能为空',
            duration: 5
          })
          return false
        }
        this.$emit('saveClick', {committeeId: this.committeeStatus, caseTypeId: this.caseTypeStatus === 0 ? '' : this.caseTypeStatus})
      }
    },
    hashClick () {
      if (this.caseTypeStatus === '') {
        this.$Message.error({
          content: '案件类型不能为空',
          duration: 5
        })
        return false
      }
      if (this.committeeStatus === '') {
        this.$Message.error({
          content: '提交仲裁委不能为空',
          duration: 5
        })
        return false
      }
      this.alertShow.hash = true
    },
    hashSave () {
      this.alertShow.hash = false
      this.addHash = true
      axios.post('/case/solidifyHash', {
        caseId: this.caseInfo.id,
        arbId: this.committeeStatus
      }).then(res => {
        this.addHash = false
        this.changeEviden()
        this.alertCanc('hash')
        this.$Message.success({
          content: res.data.message,
          duration: 2
        })
      }).catch(e => {
        this.addHash = false
        this.alertCanc('hash')
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    changeEviden () {
      for (let k in this.caseInfo.evidenceList) {
        if (this.caseInfo.evidenceList[k].isSolidify !== 1) {
          this.caseInfo.evidenceList[k].isSolidify = 1
        }
      }
      this.setFiling({type: 'evidenceList', data: JSON.parse(JSON.stringify(this.caseInfo.evidenceList))})
    },
    resAction (type) {
      if (type === 'change_subm') {
        this.committeeStatus = ''
      }
    },
    resCaseType () {
      axios.post('/caseType/arbitration/list').then(res => {
        this.caseMap[0] = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
      axios.post('/caseType/list').then(res => {
        let _dataList = res.data.data
        let _once = {
          id: 0,
          caseTypeName: '请选择',
          status: 1
        }
        _dataList.unshift(_once)
        this.caseTypeList = _dataList.map((a, b) => {
          let _o = {}
          _o.value = a.id
          _o.label = a.caseTypeName
          _o.status = a.status
          if (a.id !== 0) {
            this.caseMap[a.id] = a.arbitrationList
            this.caseNameMap[a.id] = a.caseTypeName
          } else {
            if (this.caseTypeId === null || this.caseTypeId === 'null') {
              this.caseTypeStatus = a.id
            }
          }
          return _o
        })
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    alertCanc (type) {
      this.alertShow[type] = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.caseSubmit {
  ._labelFor {
    padding-bottom: 30px;
    ._label {
      height: 30px;
      line-height: 30px;
      ._b {
        color: #ff7a7a;
        margin-left: 5px;
        vertical-align: middle;
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
    ._saveBtn._disabled {
      @include btn(#ccc, 90px, 14px, 32px);
    }
    ._cancelBtn:focus,._saveBtn:focus {
      outline: 0px;
    }
  }
}
</style>
