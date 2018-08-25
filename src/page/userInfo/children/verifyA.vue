<template>
  <div class="verifyAInfo">
    <div class="_aInfo">
      <div class="_top">资料信息</div>
      <div class="_mid">
        <p>未完善</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verify_a_info',
  props: [],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.verifyAInfo {
  ._aInfo ._top,{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._aInfo ._mid{
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 10px;
  }
}
</style>
