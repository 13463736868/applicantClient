<template>
  <div class="_addReasInfo">
    <Row>
      <Col span="22" offset="1">
        <Row class="_labelFor">
          <Col span="24" class="_label">事实与理由<b class="_b">*</b></Col>
          <Col span="24">
            <textarea class="_textarea" v-model="reasData.content" rows="8"></textarea>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===1" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addReasBtn}" v-bind:disabled="addReasBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add_reas_info',
  props: ['caseId'],
  data () {
    return {
      addBtnSwt: false,
      addReasBtn: false,
      emInfo: {
        status: 0,
        text: ''
      },
      reasData: {
        content: ''
      }
    }
  },
  methods: {
    saveClick () {
      if (this.reasData.content === '') {
        this.$Message.error({
          content: '请填写事实与理由',
          duration: 5
        })
      } else {
        if (this.addBtnSwt) {
          return false
        }
        this.addBtnSwt = true
        axios.post('/case/requestUpdate/2', {
          caseid: this.caseId,
          content: this.reasData.content
        }).then(res => {
          this.addBtnSwt = false
          this.$emit('saveClick', res.data.data)
        }).catch(e => {
          this.addBtnSwt = false
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    cancClick () {
      this.$emit('cancClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._addReasInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 10px 0;
  background: #fff;
  font-size: 12px;
  ._labelFor {
    ._label {
      height: 28px;
      line-height: 28px;
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
