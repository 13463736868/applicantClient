<template>
  <div class="revClaimInfo">
    <div class="_reason">
      <div class="_top">选择仲裁员</div>
      <div v-if="dataObj !== false">
        <res-sele-arbi :caseId="caseId" :partieType="partieType"></res-sele-arbi>
      </div>
    </div>
  </div>
</template>

<script>
import resSeleArbi from '@/page/caseInfo/children/children/resSeleArbi'

export default {
  name: 'revClaimItem',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { resSeleArbi },
  data () {
    return {
      dataObj: false
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      this.dataObj = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.revClaimInfo {
  ._reason {
    padding-bottom: 60px;
  }
  ._reason ._top{
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
