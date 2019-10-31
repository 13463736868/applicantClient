<template>
  <div class="updatePhone">
    <head-top :isRegister="true">
      <span class="f36 fcf">变更资料</span>
    </head-top>
    <div class="_center">
      <Row v-if="userInfo !== null">
        <Col span="14" offset="5">
          <div class="_ones">
            <div class="_top">基本信息</div>
            <div class="_mid">
              <Row>
                <Col span="22" offset="1">
                  <Row>
                    <Col class="_label" span="11">
                      <p>登录名：</p>
                      <p v-text="userInfo.phone"></p>
                    </Col>
                    <Col class="_label" span="11" offset="2">
                      <p>手机号：</p>
                      <p v-text="userInfo.mobile"></p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row class="pt20">
                <Col span="11" offset="12" class="tc"><button class="_editPassBtn" @click="resAction('updatePhone', null)">变更手机号</button></Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <res-update-phone v-if="alertObj.update" :resPhone="alertObj.phone" @alertConfirm="alertSave('updatePhone')" @alertCancel="alertCanc('updatePhone')"></res-update-phone>
  </div>
</template>

<script>
import axios from 'axios'
import {removeToken} from '@/cookies'
import { mapGetters } from 'vuex'
import headTop from '@/components/header/head'
import resUpdatePhone from '@/page/updatePhone/children/resUpdatePhone'

export default {
  name: 'updatePhone',
  components: { headTop, resUpdatePhone },
  data () {
    return {
      alertObj: {
        update: false,
        phone: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    resAction (type, data) {
      switch (type) {
        case 'updatePhone':
          this.alertObj.phone = this.userInfo.mobile
          this.alertObj.update = true
          break
      }
    },
    alertSave (type) {
      switch (type) {
        case 'updatePhone':
          this.alertObj.update = false
          this.alertObj.phone = null
          this.alertSave('loginOut')
          break
        case 'loginOut':
          axios.post('/SignOut').then(res => {
            if (window.localStorage) {
              let loc = window.localStorage
              loc.removeItem('userInfo')
              loc.removeItem('userState')
            }
            removeToken()
            this.$router.replace({
              path: '/login'
            })
          }).catch(e => {
            if (window.localStorage) {
              let loc = window.localStorage
              loc.removeItem('userInfo')
              loc.removeItem('userState')
            }
            removeToken()
            this.$router.replace({
              path: '/login'
            })
            this.$Message.error({
              content: '错误信息:' + e + ' 稍后再试',
              duration: 5
            })
          })
          break
      }
    },
    alertCanc (type) {
      switch (type) {
        case 'updatePhone':
          this.alertObj.update = false
          this.alertObj.phone = null
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._ones {
    padding-bottom: 60px;
  }
  ._ones ._top{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._ones ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 10px 0 20px;
  }
  ._ones ._mid {
    ._label {
      border-bottom: 1px solid #eee;
      p {
        padding: 10px 0 5px;
        font-size: 12px;
      }
      p:first-child {
        font-weight: 700;
      }
    }
  }
  ._editPassBtn {
    @include btn(#126eaf, 100px, 13px, 34px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
  }
  ._editPassBtn:focus {
    outline: 0px;
  }
}
</style>
