<template>
  <div class="respondentInfo">
    <div class="_respondent">
      <div class="_top">被申请人</div>
      <div v-if="respShow.list">
        <div v-if="respData !== null" v-for="(item, index) in respData" :key="index">
          <prop-info :infoData="item" @seeInfo="seeRespInfo(item)"></prop-info>
        </div>
      </div>
      <div v-if="respShow.see">
        <see-prop-info :seePropData="seeRespData" @saveClick="seeRespSave"></see-prop-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import propInfo from '@/page/caseInfo/children/children/propInfo'
import seePropInfo from '@/page/caseInfo/children/children/seePropInfo'

export default {
  name: 'respondentInfo',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType', 'caseLineType'],
  components: { propInfo, seePropInfo },
  data () {
    return {
      respData: null,
      seeRespData: null,
      respShow: {
        list: true,
        see: false
      }
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resResp()
      }
    }
  },
  computed: {
    resRespUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectByCaseId/2'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/2'
      }
    },
    resRespUrlId () {
      if (this.partieType === 1) {
        let _data = {}
        _data.caseId = this.caseOldId
        _data.caseLineType = this.caseLineType
        return _data
      } else if (this.partieType === 2) {
        let _data = {}
        _data.id = this.caseId
        _data.caseLineType = this.caseLineType
        return _data
      }
    }
  },
  methods: {
    resResp () {
      axios.post(this.resRespUrl, this.resRespUrlId).then(res => {
        this.respData = res.data.data.respList
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    seeRespInfo (obj) {
      this.seeRespData = obj
      this.respShow.list = false
      this.respShow.see = true
    },
    seeRespSave () {
      this.seeRespData = null
      this.respShow.list = true
      this.respShow.see = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.respondentInfo {
  ._respondent {
    padding-bottom: 60px;
  }
  ._respondent ._top{
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
