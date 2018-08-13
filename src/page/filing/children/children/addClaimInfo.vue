<template>
  <div class="_addClaimInfo">
    <Row>
      <Col span="22" offset="1">
        <Row class="_labelFor">
          <Col span="24" class="_label">申请人<b class="_b">*</b></Col>
          <Col span="24">
            <Select v-model="claimData.requestName">
              <Option v-for="item in propArrName" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===1" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="24" class="_label">请求内容<b class="_b">*</b></Col>
          <Col span="24">
            <textarea class="_textarea" v-model="claimData.content" rows="8"></textarea>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===2" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addClaimBtn}" v-bind:disabled="addClaimBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add_claim_info',
  props: ['caseId', 'propArrName'],
  data () {
    return {
      addClaimBtn: false,
      emInfo: {
        status: 0,
        text: ''
      },
      claimData: {
        requestName: '',
        content: ''
      }
    }
  },
  methods: {
    saveClick () {
      // console.log('type?_regExg_ajax')
      axios.post('/case/requestAdd/1', {
        caseId: this.caseId,
        requestName: this.claimData.requestName,
        content: this.claimData.content
      }).then(res => {
        this.$emit('saveClick', res.data.data)
      }).catch(e => {
        console.log(e)
      })
    },
    cancClick () {
      this.$emit('cancClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._addClaimInfo {
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
