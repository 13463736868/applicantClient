<template>
  <div class="endCaseInfo">
    <div class="_endCase">
      <div class="_top">裁决书</div>
      <div v-if="endCaseD !== null" v-for="(item, index) in endCaseD" :key="index">
        <end-info :infoData="item"></end-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import endInfo from '@/page/caseInfo/children/children/endInfo'

export default {
  name: 'endCaseInfo',
  props: ['caseLineType', 'caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { endInfo },
  data () {
    return {
      endCaseD: null
    }
  },
  created () {
    if (this.caseId !== '') {
      this.resCase()
    }
  },
  methods: {
    resCase () {
      axios.post('/case/settleItem', {
        id: this.caseId,
        caseLineType: this.caseLineType
      }).then(res => {
        this.endCaseD = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.endCaseInfo {
  ._endCase {
    padding-bottom: 60px;
  }
  ._endCase ._top {
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
