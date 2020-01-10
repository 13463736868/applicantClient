<template>
  <div class="resArbiCounter">
    <alert-btn-info :alertShow="alertShow" :isSaveBtn="true" @alertConfirm="alertSave" @alertCancel="alertCanc" alertTitle="仲裁费计算">
      <Row class="_labelFor">
        <Col span="4" offset="1">
          <p class="fc6 tr">
            <b>说明:</b>
          </p>
        </Col>
        <Col span="16" offset="1">
          <p class="fca">因小数位四舍五入顺序的不同，以上计算结果与本会立案部门的计算结果可能会略有差异，以立案部门的计算为准。</p>
          <p class="unit"><b>单位:元</b></p>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="4" offset="1" class="tr">
          <p><span class="_span">*</span><b>标的额：</b></p>
        </Col>
        <Col span="16" offset="1">
          <Input v-model.trim="resData.counter" placeholder="请输入争议金额（单位：元）"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="4" offset="1" class="tr">
          <p><b>受理费：</b></p>
        </Col>
        <Col span="16" offset="1">
          <Input class="disableBox" disabled v-model="resData.acceptFee"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="4" offset="1" class="tr">
          <p><b>处理费：</b></p>
        </Col>
        <Col span="16" offset="1">
          <Input class="disableBox" disabled v-model="resData.handleFee"></Input>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="4" offset="1" class="tr">
          <p><b>合  计：</b></p>
        </Col>
        <Col span="16" offset="1">
          <Input class="disableBox" disabled v-model="resData.total"></Input>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>
<script>
import axios from 'axios'
import alertBtnInfo from '@/components/common/alertBtnInfo'
import { resMess, resTimeOut } from '@/components/common/mixin.js'
import setRegExp from '@/config/regExp.js'

export default {
  name: 'resArbiCounter',
  mixins: [resMess, resTimeOut],
  components: { alertBtnInfo },
  data () {
    return {
      alertShow: true,
      resData: {
        counter: 0,
        acceptFee: 0,
        handleFee: 0,
        total: 0
      }
    }
  },
  created () {
    this.$watch('resData.counter', this.debounce(this.resGetMoney, 1000))
  },
  methods: {
    resGetMoney () {
      if (this.resData.counter === '') {
        this.resMessage('error', '请输入金额不能为空')
      } else if (!setRegExp(this.resData.counter, 'money')) {
        this.resMessage('error', '请输入正确金额格式 例: 10.00 或 10;范围(0~9999999999)')
      } else if (this.resData.counter === null || this.resData.counter === 0) {
        this.resMessage('error', '输入金额不能为0')
      } else {
        axios.post('/case/findArbitrationFee', {
          money: this.resData.counter
        }).then(res => {
          let _data = res.data.data
          this.resData.acceptFee = _data
          this.resData.total = _data
        }).catch(e => {
          this.resMessage('error', '错误信息:' + e + ' 稍后再试')
        })
      }
    },
    alertSave () {
      this.$emit('alertConfirm')
    },
    alertCanc () {
      this.$emit('alertCancel')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin';
._labelFor {
  margin-bottom: 10px;
  p {
    padding: 7px 0;
  }
  ._span {
    color: #ff7a7a;
  }
  .unit {
    padding:0;
    text-align:right
  }
}
</style>
<style lang="scss">
.disableBox .ivu-select-selection,.disableBox .ivu-input-disabled {
  background-color: #fff;
  color: #515a6e
}
</style>
