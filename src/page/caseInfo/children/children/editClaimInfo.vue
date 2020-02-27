<template>
  <div class="_editClaimInfo">
    <Row>
      <Col span="22" offset="1">
        <Row class="_labelFor">
          <Col span="24" class="_label">申请人<b class="_b">*</b></Col>
          <Col span="24">
            <Select :value="1">
              <Option :value="1">{{claimData.propName}}</Option>
            </Select>
          </Col>
          <!-- <Col span="24">
            <Select v-model="claimData.requestName">
              <Option v-for="item in propArrName" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Col> -->
          <Col span="24" class="_em"><span v-show="emInfo.status===1" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">请求内容<b class="_b">*</b></Col>
          <Col span="24">
            <textarea class="_textarea" v-model="claimData.content" rows="8"></textarea>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===2" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="12" class="_label mb5">请求金额(元)<b class="_b">*</b></Col>
          <Col span="12" class="_label mb5">
            <span class="hand fr" style="color: #126eaf;" @click="resAction('arbi', null)">仲裁费计算</span>
          </Col>
          <Col span="24">
            <Input v-model="claimData.disputeFee" @on-change="dispMoney"/>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===3" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addClaimBtn}" v-bind:disabled="addClaimBtn" @click="saveClick">保 存</button></Col>
    </Row>
    <res-arbi-counter v-if="alertObj.arbi" @alertConfirm="alertCanc('arbi')" @alertCancel="alertCanc('arbi')"></res-arbi-counter>
  </div>
</template>

<script>
import axios from 'axios'
import resArbiCounter from '@/page/filing/children/children/resArbiCounter'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'edit_claim_info',
  components: { resArbiCounter },
  props: ['caseId', 'propArrName', 'editClaiData'],
  data () {
    return {
      addClaimBtn: false,
      emInfo: {
        status: 0,
        text: ''
      },
      alertObj: {
        arbi: false
      },
      dispSwitch: false,
      claimData: JSON.parse(JSON.stringify(this.editClaiData))
    }
  },
  methods: {
    dispMoney () {
      if (this.claimData.disputeFee === null || this.claimData.disputeFee === '') {
        this.emInfo.status = 3
        this.emInfo.text = '请填写请求金额！可以为 0'
        this.dispSwitch = true
      } else if (!setRegExp(this.claimData.disputeFee, 'money')) {
        this.emInfo.status = 3
        this.emInfo.text = '请输入正确金额格式 例: 10.00 或 10;范围(0~9999999)'
        this.dispSwitch = true
      } else {
        this.emInfo.status = 0
        this.emInfo.text = ''
        this.dispSwitch = false
      }
    },
    saveClick () {
      if (this.claimData.content === '') {
        this.$Message.error({
          content: '请求内容不能为空！',
          duration: 5
        })
      } else {
        if (this.dispSwitch) {
          this.$Message.error({
            content: this.emInfo.text,
            duration: 5
          })
        } else {
          this.sendAjax()
        }
      }
    },
    sendAjax () {
      axios.post('/case/updateRequestOrFact/1', {
        caseid: this.caseId,
        id: this.claimData.id,
        requestName: this.claimData.requestName,
        content: this.claimData.content,
        disputeFee: this.claimData.disputeFee
      }).then(res => {
        this.$emit('saveClick')
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    cancClick () {
      this.$emit('cancClick')
    },
    resAction (type, data) {
      switch (type) {
        case 'arbi':
          this.alertObj.arbi = true
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'arbi':
          this.alertObj.arbi = false
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._editClaimInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 12px;
  ._labelFor {
    ._label {
      height: 20px;
      line-height: 20px;
      ._b {
        color: #ff7a7a;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    ._textarea {
      @include borderRadius(4px);
      width: 100%;
      padding: 5px 8px;
      resize: none;
      border: 1px solid #dddee1;
      outline: none;
      transition: all .2s ease-in-out;
    }
    ._textarea:hover {
      @include boxShadow(0 0 0 1px rgba(45,140,240,.2));
      border-color: #57a3f3;
      outline: 0;
    }
    ._em {
      height: 16px;
      line-height: 16px;
      color: #ff7a7a;
      font-size: 8px;
      span {
        float: right;
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
  ._saveBtn._disabled {
    @include btn(#ccc, 90px, 14px, 32px);
  }
  ._cancelBtn:focus,._saveBtn:focus {
    outline: 0px;
  }
}
</style>
