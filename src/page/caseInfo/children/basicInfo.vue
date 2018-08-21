<template>
  <div class="basicInfo">
    <div class="_basic">
      <div class="_top">基本信息</div>
    </div>
    <div class="_progress">
      <div class="_top">案件进度信息</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basicInfo',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.basicInfo {
  ._progress {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._basic ._top, ._progress ._top{
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
