<template>
  <div class="userInfo">
    <head-top :isRegister="true">
      <span class="f36 fcf">身份绑定信息</span>
    </head-top>
    <div class="_center">
      <span class="f20 bc fc4">身份绑定信息</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import headTop from '@/components/header/head'

export default {
  name: 'userInfo',
  components: { headTop },
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
