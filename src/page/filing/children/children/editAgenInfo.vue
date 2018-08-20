<template>
  <div class="_editAgenInfo">
    <Row>
      <Col span="23" offset="1" class="_type">
        <span class="mr20">代理人属性</span>
        <RadioGroup v-model="agenData.type">
          <Radio :label="1">律师代理</Radio>
          <Radio :label="2">公民代理</Radio>
          <Radio :label="3">职员</Radio>
        </RadioGroup>
      </Col>
      <Row>
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">姓名<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="agenData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===11" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="agenData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===12" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="agenData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===13" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">工作单位<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="agenData.organization"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===14" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">委托人<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="agenData.propId">
                <Option v-for="item in propArrName" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===21" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="agenData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===22" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱</Col>
            <Col span="24" class="_input"><input type="text" v-model="agenData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===23" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址</Col>
            <Col span="24" class="_input"><input type="text" v-model="agenData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===24" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':editAgenBtn}" v-bind:disabled="editAgenBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'edit_agen_info',
  props: ['caseId', 'propArrName', 'editAgenData'],
  data () {
    return {
      editAgenBtn: false,
      emInfo: {
        status: 0,
        text: ''
      },
      idcardList: [
        {
          value: 1,
          label: '身份证'
        },
        {
          value: 2,
          label: '军官证'
        },
        {
          value: 3,
          label: '户口薄'
        },
        {
          value: 4,
          label: '实习律师证'
        },
        {
          value: 5,
          label: '律师职业证'
        },
        {
          value: 6,
          label: '护照'
        },
        {
          value: 7,
          label: '驾照'
        }
      ],
      agenData: JSON.parse(JSON.stringify(this.editAgenData))
    }
  },
  methods: {
    saveClick () {
      // console.log('type?_regExg_ajax')
      axios.post('/proxy/update', {
        caseId: this.caseId,
        id: this.agenData.id,
        propId: this.agenData.propId,
        propName: this.agenData.propName,
        type: this.agenData.type,
        idcardType: this.agenData.idcardType,
        idcard: this.agenData.idcard,
        phone: this.agenData.phone,
        name: this.agenData.name,
        organization: this.agenData.organization,
        email: this.agenData.email,
        address: this.agenData.address
      }).then(res => {
        if (typeof res.data.data.propName === 'string') {
          res.data.data.propName = res.data.data.propName - 0
        }
        this.$emit('saveClick', res.data.data)
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
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
._editAgenInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 12px;
  ._type {
    margin-bottom: 10px;
    height: 24px;
    line-height: 24px;
  }
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
    ._input {
      border-bottom:1px solid #ddd;
      input {
        width: 100%;
        border: none;
        letter-spacing: 1px;
        font-size: 12px;
        color: #666;
        height: 32px;
        line-height: 32px;
        background: transparent;
      }
      input:focus {
        box-shadow: none;
        outline: 0px;
      }
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
