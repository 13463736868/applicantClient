<template>
  <div class="claimItems">
    <div class="_claim">
      <div class="_top">仲裁请求</div>
    </div>
    <div class="_reason">
      <div class="_top">事实与理由</div>
    </div>
    <div class="_applicationBook">
      <div class="_top">仲裁申请书</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'claimItems',
  props: [],
  data () {
    return {}
  },
  created () {
    if (this.caseInfo !== null) {
      console.log('渲染数据')
    }
  },
  computed: {
    ...mapGetters([
      'caseInfo'
    ])
  },
  watch: {
    caseInfo: function (val) {
      console.log('渲染数据')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.claimItems {
  width: 83%;
  ._claim, ._reason, ._applicationBook {
    padding-bottom: 40px;
  }
  ._reason, ._applicationBook {
    padding-top: 60px;
  }
  ._claim ._top, ._reason ._top, ._applicationBook ._top{
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
