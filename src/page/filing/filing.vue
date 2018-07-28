<template>
  <div class="filing">
    <head-top>
      <span class="f36 fcf">立案申请</span>
    </head-top>
    <div class="_center">
      <span class="f20 bc fc4">立案申请</span>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'

export default {
  name: 'filing',
  data () {
    return {}
  },
  components: {
    headTop
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1080px);
  @include bc;
  padding-top: 40px;
}
</style>
