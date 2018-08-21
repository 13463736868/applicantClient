<template>
  <div class="myCaseSub">
    <Row class="_labelFor">
      <Col v-if="btnShow.avoidShow" span="12">
        <Row>
          <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="avoidClick">申请仲裁员回避</button></Col>
        </Row>
      </Col>
      <Col v-if="btnShow.retractShow" span="12">
        <Row>
          <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="retractClick">撤回案件</button></Col>
        </Row>
      </Col>
      <Col v-if="btnShow.selectShow" span="12">
        <Row>
          <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="selectClick">选择仲裁员</button></Col>
        </Row>
      </Col>
      <Col v-if="btnShow.replClick" span="12">
        <Row>
          <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="replClick">补正</button></Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>

export default {
  name: 'my_case_sub',
  props: ['caseId', 'caseOldId', 'caseState'],
  data () {
    return {
      addSubmit: false,
      btnShow: {
        avoidShow: false,
        retractShow: false,
        selectShow: false,
        replClick: false
      },
      stateA: [1, 2, '1', '2'],
      stateB: [3, 6, '3', '6'],
      stateCA: [4, '4'],
      stateCB: [5, '5'],
      stateD: [7, '7']
    }
  },
  created () {
    if (this.stateA.indexOf(this.caseState) !== -1) {
      this.btnShow.retractShow = true
    } else if (this.stateCA.indexOf(this.caseState) !== -1) {
      this.btnShow.retractShow = true
      this.btnShow.selectShow = true
    } else if (this.stateCB.indexOf(this.caseState) !== -1) {
      this.btnShow.retractShow = true
      this.btnShow.avoidShow = true
    } else if (this.stateD.indexOf(this.caseState) !== -1) {
      this.btnShow.replClick = true
    }
  },
  methods: {
    avoidClick () {
      console.log('申请仲裁员回避')
    },
    retractClick () {
      console.log('撤回案件')
    },
    selectClick () {
      console.log('选择仲裁员')
    },
    replClick () {
      console.log('补证')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.myCaseSub {
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
    ._saveBtn {
      @include btn(#126eaf, 140px, 13px, 40px);
      @include boxShadow(0 1px 6px -1px #bbb);
      @include borderRadius(4px);
    }
    ._saveBtn._disabled {
      @include btn(#ccc, 140px, 13px, 40px);
    }
    ._saveBtn:focus {
      outline: 0px;
    }
  }
}
</style>
