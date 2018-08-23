<template>
  <div class="proposerInfo">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <div v-if="propData !== null" v-for="(item, index) in propData" :key="index">
        <prop-info :infoData="item" @seeInfo="seePropInfo(item)"></prop-info>
      </div>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div v-if="agenData !== null"  v-for="(item, index) in agenData" :key="index">
        <agen-info :infoData="item" @seeInfo="seeAgenInfo(item)"></agen-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import propInfo from '@/page/caseInfo/children/children/propInfo'
import agenInfo from '@/page/caseInfo/children/children/agenInfo'

export default {
  name: 'proposerInfo',
  props: ['caseId', 'caseOldId', 'caseState'],
  components: { propInfo, agenInfo },
  data () {
    return {
      propData: null,
      agenData: null
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
        this.propData = res.data.data.propList
        this.agenData = res.data.data.proxyList
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    seePropInfo (obj) {
      console.log('查看申请人')
    },
    seeAgenInfo (obj) {
      console.log('查看代理人')
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
}
</style>
