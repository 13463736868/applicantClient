<template>
  <div class="caseSubmit">
    <Row class="_labelFor">
      <Col span="4" class="_label">选择仲裁机构<b class="_b">*</b></Col>
      <Col span="8">
        <Select v-model="committeeStatus">
          <Option v-for="item in committeeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="12">
        <Row>
          <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="saveClick">仲 裁</button></Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'case_submit',
  data () {
    return {
      addSubmit: false,
      committeeList: [],
      committeeStatus: ''
    }
  },
  created () {
    this.resDictionary('commissionType')
  },
  computed: {
    ...mapGetters([
      'caseInfo',
      'userInfo'
    ])
  },
  methods: {
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
      if (this.userInfo.verify === '1') {
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
          this.$emit('saveClick', this.committeeStatus)
        }
      } else {
        this.$Message.error({
          content: '请先完善身份绑定信息',
          duration: 5
        })
      }
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
