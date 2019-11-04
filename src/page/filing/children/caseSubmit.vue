<template>
  <div class="caseSubmit">
    <Row class="_labelFor">
      <!-- <Col span="3" class="_label">仲裁机构<b class="_b">*</b></Col>
      <Col span="4">
        <Select disabled v-model="committeeStatus">
          <Option v-for="item in committeeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col> -->
      <Col span="3" class="_label">案件类型<b class="_b">*</b></Col>
      <Col span="8">
        <Select v-model="caseTypeStatus">
          <Option v-for="item in caseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="5" offset="2">
        <Row>
          <Col class="tr" span="24"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="saveClick">仲 裁</button></Col>
        </Row>
      </Col>
      <Col span="5" offset="1">
        <Row>
          <Col class="tr" span="24"><button class="_saveBtn" :class="{'_disabled':addHash}" v-bind:disabled="addHash" @click="hashClick">固 化</button></Col>
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
      committeeList: [],
      committeeStatus: '',
      caseTypeList: [],
      caseTypeStatus: '',
      caseMap: {},
      alertShow: {
        hash: false
      }
    }
  },
  created () {
    this.resDictionary('commissionType')
    this.resCaseType()
  },
  computed: {
    ...mapGetters([
      'caseInfo',
      'userInfo',
      'userState'
    ])
  },
  methods: {
    ...mapActions([
      'setFiling',
      'setUserState'
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
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    saveClick () {
      if (this.userState === null) {
        if (this.userInfo.verify === '1') {
          this.resReg()
        } else {
          axios.post('/person/checkState').then(res => {
            if (res.data.data.verify === '1') {
              if (window.localStorage) {
                let loc = window.localStorage
                loc.setItem('userState', JSON.stringify(res.data.data))
              }
              this.setUserState(res.data.data)
              this.resReg()
            } else {
              this.$Message.error({
                content: '请先完善通过身份绑定信息',
                duration: 5
              })
            }
          }).catch(e => {
            this.$Message.error({
              content: '错误信息:' + e + ' 稍后再试',
              duration: 5
            })
          })
        }
      } else {
        if (this.userState.verify === '1') {
          this.resReg()
        } else {
          axios.post('/person/checkState').then(res => {
            if (res.data.data.verify === '1') {
              if (window.localStorage) {
                let loc = window.localStorage
                loc.setItem('userState', JSON.stringify(res.data.data))
              }
              this.setUserState(res.data.data)
              this.resReg()
            } else {
              this.$Message.error({
                content: '请先完善通过身份绑定信息',
                duration: 5
              })
            }
          }).catch(e => {
            this.$Message.error({
              content: '错误信息:' + e + ' 稍后再试',
              duration: 5
            })
          })
        }
      }
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
      } else if (this.caseTypeStatus === '') {
        this.$Message.error({
          content: '请选择案件类型',
          duration: 5
        })
      } else {
        this.$emit('saveClick', {committeeStatus: this.committeeStatus, caseTypeCode: this.caseTypeStatus, caseTypeName: this.caseMap[this.caseTypeStatus]})
      }
    },
    hashClick () {
      this.alertShow.hash = true
    },
    hashSave () {
      this.alertShow.hash = false
      this.addHash = true
      axios.post('/case/solidifyHash', {
        caseId: this.caseInfo.id
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
    resCaseType () {
      axios.post('/caseType/list', {
        pageIndex: 0,
        pageSize: 999
      }).then(res => {
        let _dataList = res.data.data.dataList
        this.caseTypeList = _dataList.map((a, b) => {
          let _o = {}
          _o.value = a.caseTypeCode
          _o.label = a.caseTypeName
          this.caseMap[_o.value] = _o.label
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
