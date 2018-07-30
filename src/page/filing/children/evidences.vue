<template>
  <div class="evidences">
    <div class="_evidences">
      <div class="_top">我的证据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'evidences',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.evidences {
  width: 83%;
  ._evidences {
    padding-bottom: 40px;
  }
  ._evidences ._top{
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
