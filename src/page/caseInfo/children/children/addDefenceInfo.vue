<template>
  <div class="_addDefenceInfo">
    <Row>
      <Col span="22" offset="1" class="mb20">
        <Row class="_labelFor">
          <Col span="4" class="_label">{{resPartyType}}<b class="_b">*</b></Col>
          <Col span="20" class="_input"><Input :autosize="{minRows: 5,maxRows: 7}" v-model.trim="replyOpinion" type="textarea" :placeholder="'输入'+resText+'...'" /></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>
<script>
import axios from 'axios'
import { resMess } from '@/components/common/mixin.js'
export default {
  name: 'add_defence_info',
  mixins: [resMess],
  props: ['caseId', 'partieType', 'addType'],
  data () {
    return {
      addBtnSwt: false,
      replyOpinion: null
    }
  },
  computed: {
    resPartyType () {
      if (this.partyType === 1) {
        return '申请人'
      } else if (this.partyType === 2) {
        return '被申请人'
      } else {
        return ''
      }
    }
  },
  methods: {
    cancClick () {
      this.$emit('cancClick')
    },
    saveClick () {
      if (this.replyOpinion === null) {
        if (this.addType === 1) {
          this.resMessage('error', '请填写答辩描述')
        } else if (this.addType === 3) {
          this.resMessage('error', '请填写最后陈述')
        } else if (this.addType === 2) {
          this.resMessage('error', '请填写调解与和解')
        }
      } else {
        if (this.addBtnSwt) {
          return false
        }
        this.addBtnSwt = true
        let url = '/case/submitOpinion/' + this.addType
        let query = {
          caseId: this.caseId,
          partyType: this.partieType
        }
        if (this.addType === 1) {
          query.replyOpinion = this.replyOpinion
        } else if (this.addType === 3) {
          query.finalStatement = this.replyOpinion
        } else if (this.addType === 2) {
          query.mediateCompromise = this.replyOpinion
        }
        axios.post(url, query).then(res => {
          this.addBtnSwt = false
          this.$emit('saveClick', res.data.data)
        }).catch(e => {
          this.addBtnSwt = false
          this.resMessage('error', '错误信息:' + e)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._addDefenceInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 12px;
  ._labelFor {
    ._del {
      color: #ff7a7a;
      margin-left: 10px;
    }
    ._item {
      color: #126eaf;
      height: 29px;
      line-height: 29px;
    }
    ._label {
      padding: 5px 0;
      ._b {
        color: #ff7a7a;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    ._text {
      padding: 30px 0;
    }
    ._input {
      border-bottom:1px solid #ddd;
      input {
        width: 100%;
        border: none;
        letter-spacing: 1px;
        font-size: 12px;
        color: #666;
        height: 29px;
        line-height: 29px;
        background: transparent;
      }
      input:focus {
        box-shadow: none;
        outline: 0px;
      }
    }
    ._radio {
      height: 29px;
      line-height: 29px;
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
