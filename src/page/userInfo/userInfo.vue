<template>
  <div class="userInfo">
    <head-top :isRegister="true">
      <span class="f36 fcf">身份绑定信息</span>
    </head-top>
    <div class="_center">
      <Row>
        <Col span="14" offset="5">
          <div v-if="userInfo.verify === '-1'">
            <verify-a :userType="userInfo.userType"></verify-a>
          </div>
          <div v-else-if="userInfo.verify === '0'">
            <verify-b></verify-b>
          </div>
          <div v-else-if="userInfo.verify === '1'">
            <verify-c :userType="userInfo.userType"></verify-c>
          </div>
          <div v-else-if="userInfo.verify === '2'">
            <verify-d :userType="userInfo.userType" :desc="userInfo.verifyDesc"></verify-d>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    console.log(this.userInfo)
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
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
