<template>
  <div class="respondent">
    <div class="_respondent">
      <div class="_top">被申请人</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'respondent',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.respondent {
  width: 83%;
  ._respondent {
    padding-bottom: 40px;
  }
  ._respondent ._top{
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
