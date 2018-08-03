<template>
  <div class="proposer">
    <div class="_proposer">
      <div class="_top">申请人</div>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'proposer',
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
.proposer {
  width: 83%;
  ._proposer,._agent {
    padding-bottom: 40px;
  }
  ._agent {
    padding-top: 60px;
  }
  ._proposer ._top, ._agent ._top{
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
