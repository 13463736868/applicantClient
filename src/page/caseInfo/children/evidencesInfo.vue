<template>
  <div class="evidencesInfo">
    <div class="_evidences">
      <div class="_top">申请人证据</div>
      <div v-if="evidData !== null" v-for="(item, index) in evidData" :key="index">
        <evid-info :infoData="item"></evid-info>
      </div>
    </div>
    <div class="_revEvidences">
      <div class="_top">被申请人证据</div>
      <div v-if="revEvidData !== null" v-for="(item, index) in revEvidData" :key="index">
        <evid-info :infoData="item"></evid-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import evidInfo from '@/page/caseInfo/children/children/evidInfo'

export default {
  name: 'evidencesInfo',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { evidInfo },
  data () {
    return {
      evidData: null,
      revEvidData: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resEvid()
      }
    }
  },
  computed: {
    ...mapGetters([
      'myCaseCrossE'
    ]),
    resEvidUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectByCaseId/4'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/4'
      }
    },
    resEvidUrlId () {
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
    resEvid () {
      axios.post(this.resEvidUrl, this.resEvidUrlId).then(res => {
        this.evidData = res.data.data.evidenceList
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
      axios.post('/case/queryRespEvidence', {
        id: this.caseId
      }).then(res => {
        this.revEvidData = res.data.data
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
.evidencesInfo {
  ._evidences {
    padding-bottom: 60px;
  }
  ._evidences ._top, ._revEvidences ._top{
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
