<template>
  <div class="sendInfo">
    <div class="_infoStatus">
      <div class="_top">信息状态</div>
    </div>
    <div class="_emailWarn">
      <div class="_top">电子邮件送达</div>
    </div>
    <div class="_smsWarn">
      <div class="_top">短信提醒</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sendInfo',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.sendInfo {
  ._emailWarn, ._smsWarn {
    padding-top: 60px;
  }
  ._infoStatus ._top, ._emailWarn ._top, ._smsWarn ._top{
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
