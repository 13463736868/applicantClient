<template>
  <div class="userInfo">
    <head-top :isRegister="true">
      <span class="f36 fcf">身份绑定信息</span>
    </head-top>
    <div class="_center">
      <Row v-if="userState !== null">
        <Col span="14" offset="5">
          <div v-if="userState.verify === '-1'">
            <verify-a :userType="userState.userType"></verify-a>
          </div>
          <div v-else-if="userState.verify === '0'">
            <verify-b></verify-b>
          </div>
          <div v-else-if="userState.verify === '1'">
            <verify-c :userType="userState.userType"></verify-c>
          </div>
          <div v-else-if="userState.verify === '2'">
            <verify-d :userType="userState.userType" :desc="userState.verifyDesc"></verify-d>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import headTop from '@/components/header/head'
import verifyA from '@/page/userInfo/children/verifyA'
import verifyB from '@/page/userInfo/children/verifyB'
import verifyC from '@/page/userInfo/children/verifyC'
import verifyD from '@/page/userInfo/children/verifyD'

export default {
  name: 'userInfo',
  components: { headTop, verifyA, verifyB, verifyC, verifyD },
  data () {
    return {}
  },
  created () {
    this.resState()
  },
  computed: {
    ...mapGetters([
      'userState'
    ])
  },
  methods: {
    ...mapActions([
      'setUserState'
    ]),
    resState () {
      axios.post('/person/checkState').then(res => {
        if (window.localStorage) {
          let loc = window.localStorage
          loc.setItem('userState', JSON.stringify(res.data.data))
        }
        this.setUserState(res.data.data)
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e.status + ' 稍后再试',
          duration: 5
        })
      })
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
}
</style>
