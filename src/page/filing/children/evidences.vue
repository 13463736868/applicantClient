<template>
  <div class="evidences">
    <div class="_evidences">
      <div class="_top">我的证据</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'evidences',
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
