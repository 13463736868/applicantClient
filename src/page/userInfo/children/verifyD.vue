<template>
  <div class="verifyDInfo">
    <div class="_dInfo">
      <div class="_top">资料信息</div>
      <div class="_mid">
        <p>资料信息审核失败（失败原因：<span v-text="desc"></span>）...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verify_d_info',
  props: [ 'desc' ],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.verifyDInfo {
  ._dInfo ._top,{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._dInfo ._mid{
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 10px;
    p {
      padding: 20px 0;
      text-align: center;
      font-size: 18px;
      color: #126eaf;
    }
  }
}
</style>
