<template>
  <div class="verifyBInfo">
    <div class="_bInfo">
      <div class="_top">资料信息</div>
      <div class="_mid">
        <p>资料信息正在审核中（审核周期3个工作日,周末,节假日顺延）...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verify_b_info',
  props: [],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.verifyBInfo {
  ._bInfo ._top{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._bInfo ._mid{
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
