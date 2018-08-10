<template>
  <div class="_addPropInfo">
    <Row>
      <Col span="23" offset="1" class="_type">
        <span class="mr20">当事人属性</span>
        <RadioGroup v-model="propData.type" @on-change="changeType">
          <Radio :label="1">自然人</Radio>
          <Radio :label="2">企业</Radio>
          <Radio :label="3">个体户</Radio>
          <Radio :label="4">其他组织</Radio>
        </RadioGroup>
      </Col>
      <Row v-if="propData.type === 1">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">姓名<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===111" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value" v-text="item.label"></Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===113" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===121" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===122" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===123" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
      <Row v-else-if="propData.type === 2">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">企业名称<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseName" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===211" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.enterpriseIdcard">
                <Option v-for="item in enterpriseList" :value="item.value" :key="item.value" v-text="item.label"></Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseIdcard" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===213" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.linkMan"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===214" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===215" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">法定代表人<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===221" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value" v-text="item.label"></Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===223" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===224" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===225" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
      <Row v-else-if="propData.type === 3">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">名称<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseName" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===311" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.enterpriseIdcard">
                <Option v-for="item in enterpriseList" :value="item.value" :key="item.value" v-text="item.label"></Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseIdcard" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===313" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.linkMan"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===314" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===315" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">经营者<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===321" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value" v-text="item.label"></Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===323" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===324" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===325" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
      <Row v-else-if="propData.type === 4">
        <Col span="10" offset="1">
          <Row class="_labelFor">
            <Col span="24" class="_label">组织名称<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseName" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===411" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.enterpriseIdcard">
                <Option v-for="item in enterpriseList" :value="item.value" :key="item.value" v-text="item.label"></Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证照号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input v-model="propData.enterpriseIdcard" type="text"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===413" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系人</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.linkMan"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===414" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达手机</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.phone"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===415" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
        <Col span="10" offset="2">
          <Row class="_labelFor">
            <Col span="24" class="_label">负责人<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.name"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===421" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件类型<b class="_b">*</b></Col>
            <Col span="24">
              <Select v-model="propData.idcardType">
                <Option v-for="item in idcardList" :value="item.value" :key="item.value" v-text="item.label"></Option>
              </Select>
            </Col>
            <Col span="24" class="_em"><span></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">证件号码<b class="_b">*</b></Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.idcard"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===423" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">送达邮箱</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.email"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===424" v-text="emInfo.text"></span></Col>
          </Row>
          <Row class="_labelFor">
            <Col span="24" class="_label">联系地址</Col>
            <Col span="24" class="_input"><input type="text" v-model="propData.address"></Col>
            <Col span="24" class="_em"><span v-show="emInfo.status===425" v-text="emInfo.text"></span></Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addPropBtn}" v-bind:disabled="addPropBtn" @click="saveClick">保 存</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'add_prop_info',
  props: ['caseId', 'addType'],
  data () {
    return {
      addPropBtn: false,
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
      enterpriseList: [
        {
          value: 1,
          label: '营业执照'
        },
        {
          value: 2,
          label: '组织机构代码'
        },
        {
          value: 3,
          label: '税务登记证'
        },
        {
          value: 4,
          label: '多证合一营业执照'
        }
      ],
      propData: {
        type: 1,
        idcardType: null,
        idcard: '',
        phone: '',
        name: '',
        linkMan: '',
        enterpriseName: '',
        enterpriseType: null,
        enterpriseIdcard: '',
        email: '',
        address: ''
      }
    }
  },
  methods: {
    changeType () {
      let _type = this.propData.type
      this.propData = {
        type: _type,
        idcardType: null,
        idcard: '',
        phone: '',
        name: '',
        linkMan: '',
        enterpriseName: '',
        enterpriseType: null,
        enterpriseIdcard: '',
        email: '',
        address: ''
      }
      this.emInfo = {
        status: 0,
        text: ''
      }
    },
    saveClick () {
      // console.log('type?_regExg_ajax')
      axios.post('/party/add/' + this.addType, {
        caseId: this.caseId,
        type: this.propData.type,
        idcardType: this.propData.idcardType,
        idcard: this.propData.idcard,
        phone: this.propData.phone,
        name: this.propData.name,
        linkMan: this.propData.linkMan,
        enterpriseName: this.propData.enterpriseName,
        enterpriseType: this.propData.enterpriseType,
        enterpriseIdcard: this.propData.enterpriseIdcard,
        email: this.propData.email,
        address: this.propData.address
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
._addPropInfo {
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
