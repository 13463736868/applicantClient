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
    <div class="_reasonRev">
      <div class="_top">事实与理由 (反请求)</div>
      <div v-if="dataObj !== null">
        <reas-info :infoData="dataObj"></reas-info>
      </div>
    </div>
    <div class="_applicationBookRev">
      <div class="_top">仲裁申请书 (反请求)</div>
      <div v-if="dataObj !== null">
        <appl-info :infoData="dataObj"></appl-info>
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
      applData: null,
      dataObj: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resClaim()
        this.resResClaim()
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
    },
    resResClaim () {
      axios.post('/case/queryRespRequest', {
        id: this.caseId,
        caseId: this.caseOldId
      }).then(res => {
        this.dataObj = res.data.data
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
  ._applicationBook, ._claim, ._reason {
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
  ._reasonRev {
    padding-bottom: 60px;
  }
  ._applicationBookRev {
    padding-bottom: 60px;
  }
  ._reasonRev ._top, ._applicationBookRev ._top{
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
