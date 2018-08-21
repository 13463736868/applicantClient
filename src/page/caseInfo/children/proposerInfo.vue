<template>
  <div class="proposerInfo">
    <div class="_proposer">
      <div class="_top">申请人</div>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'proposerInfo',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.proposerInfo {
  ._agent {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._proposer ._top, ._agent ._top{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
