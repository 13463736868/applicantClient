<template>
  <div class="endCaseInfo">
    <div class="_endCase">
      <div class="_top">结案</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'endCaseInfo',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.endCaseInfo {
  width: 83%;
  ._endCase {
    padding-bottom: 40px;
  }
  ._endCase ._top{
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
