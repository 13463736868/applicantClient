<template>
  <div class="verifyCInfo">
    <div class="_cInfo">
      <div class="_top">资料信息</div>
      <div class="_mid">
        <p>审核通过</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verify_c_info',
  props: [],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.verifyCInfo {
  ._cInfo ._top,{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._cInfo ._mid{
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 10px;
  }
}
</style>
