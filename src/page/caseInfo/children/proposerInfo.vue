<template>
  <div class="proposerInfo">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <div class="_mid">

      </div>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div class="_mid">

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'proposerInfo',
  props: ['caseId', 'caseOldId', 'caseState'],
  data () {
    return {
      dataProp: null,
      dataProxy: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      this.resProp()
    }
  },
  methods: {
    resProp () {
      axios.post('/case/selectObjectByCaseId/1', {
        caseId: this.caseOldId
      }).then(res => {
        this.dataProp = res.data.data.propList
        this.dataProxy = res.data.data.proxyList
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
.proposerInfo {
  ._agent {
    padding-top: 60px;
    padding-bottom: 60px;
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
  ._proposer ._mid, ._agent ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    margin-top: 10px;
    padding: 10px 0;
    p {
      padding: 10px 5px;
    }
  }
}
</style>
