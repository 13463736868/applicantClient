<template>
  <div class="register">
    <head-top :isRegister="false">
      <span class="f36 fcf">注册</span>
    </head-top>
    <div class="_center">
      <div class="_center_mid">
        <Row>
          <Col span="24" class="tc pt10 pb10">注册为</Col>
        </Row>
        <Row>
          <Col span="8" offset="4" class="_selectBtn" :class="{'_active':registerType}" @click.native="resChange('company')"><Icon type="checkmark" class="_icon" size="20"></Icon>企业用户</Col>
          <Col span="8" class="_selectBtn" :class="{'_active':!registerType}" @click.native="resChange('personal')"><Icon type="checkmark" class="_icon" size="20"></Icon>个人用户</Col>
        </Row>
        <div class="_company" v-show="registerType">
          <Row>
            <Col span="8" offset="4">企业用户</Col>
          </Row>
        </div>
        <div class="_personal" v-show="!registerType">
          <Row>
            <Col span="8" offset="4">个人用户</Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'

export default {
  name: 'register',
  components: { headTop },
  data () {
    return {
      registerType: true
    }
  },
  methods: {
    resChange (type) {
      if (type === 'company') {
        if (this.registerType !== true) {
          this.registerType = !this.registerType
        }
      } else if (type === 'personal') {
        if (this.registerType !== false) {
          this.registerType = !this.registerType
        }
      }
      console.log(this.registerType)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1080px);
  @include bc;
  padding-top: 40px;
  ._center_mid {
    @include bc;
    width: 50%;
    height: 500px;
    background: #ddd;
    ._selectBtn {
      @include hand;
      background: #fff;
      padding:10px 10px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      position: relative;
      ._icon {
        position:absolute;
        left: 30px;
        top: 14px;
        color: #fff;
      }
    }
    ._selectBtn._active {
      @include boxShadow(0 1px 6px -1px #bbb);
      background: #126EAE;
      color: #fff;
    }
  }
}
</style>
