<template>
  <div class="respondentInfo">
    <div class="_respondent">
      <div class="_top">被申请人</div>
      <div v-if="respData !== null" v-for="(item, index) in respData" :key="index">
        <prop-info :infoData="item" @seeInfo="seeRespInfo(item)"></prop-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import propInfo from '@/page/caseInfo/children/children/propInfo'

export default {
  name: 'respondentInfo',
  props: ['caseId', 'caseOldId', 'caseState'],
  components: { propInfo },
  data () {
    return {
      respData: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      this.resResp()
    }
  },
  methods: {
    resResp () {
      axios.post('/case/selectObjectByCaseId/2', {
        caseId: this.caseOldId
      }).then(res => {
        this.respData = res.data.data.respList
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    seeRespInfo (obj) {
      console.log('查看被申请人')
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
