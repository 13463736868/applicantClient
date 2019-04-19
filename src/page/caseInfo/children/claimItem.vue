<template>
  <div class="claimInfo">
    <div class="_claim">
      <div class="_top">仲裁请求</div>
      <div v-if="claimData !== null" v-for="(item, index) in claimData" :key="index">
        <claim-info :infoData="item"></claim-info>
      </div>
    </div>
    <div class="_reason">
      <div class="_top">事实与理由</div>
      <div v-if="reasData !== null">
        <reas-info :infoData="reasData"></reas-info>
      </div>
    </div>
    <div class="_applicationBook">
      <div class="_top">仲裁申请书</div>
      <div v-if="applData !== null">
        <appl-info :infoData="applData"></appl-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import claimInfo from '@/page/caseInfo/children/children/claimInfo'
import reasInfo from '@/page/caseInfo/children/children/reasInfo'
import applInfo from '@/page/caseInfo/children/children/applInfo'

export default {
  name: 'claimItem',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { claimInfo, reasInfo, applInfo },
  data () {
    return {
      claimData: null,
      reasData: null,
      applData: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resClaim()
      }
    }
  },
  computed: {
    resClaimUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectByCaseId/3'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/3'
      }
    },
    resClaimUrlId () {
      if (this.partieType === 1) {
        let _data = {}
        _data.caseId = this.caseOldId
        return _data
      } else if (this.partieType === 2) {
        let _data = {}
        _data.id = this.caseId
        _data.oldId = this.caseOldId
        return _data
      }
    }
  },
  methods: {
    resClaim () {
      axios.post(this.resClaimUrl, this.resClaimUrlId).then(res => {
        this.claimData = res.data.data.requestList
        this.reasData = res.data.data.requestReasons
        this.applData = res.data.data.arbRequisitionFile
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
.claimInfo {
  ._reason, ._applicationBook {
    padding-top: 60px;
  }
  ._applicationBook {
    padding-bottom: 60px;
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
