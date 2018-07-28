<template>
  <div class="filing">
    <head-top>
      <span class="f36 fcf">立案申请</span>
    </head-top>
    <div class="_center">
      <Row>
        <Col span="4" offset="2" class="tc">申请人</Col>
        <Col span="16" class="tc">申请人</Col>
      </Row>
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
