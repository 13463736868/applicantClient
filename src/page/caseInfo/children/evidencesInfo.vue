<template>
  <div class="evidencesInfo">
    <div class="_evidences">
      <div class="_top">我的证据</div>
      <div v-if="evidData !== null" v-for="(item, index) in evidData" :key="index">
        <evid-info :infoData="item"></evid-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import evidInfo from '@/page/caseInfo/children/children/evidInfo'

export default {
  name: 'evidencesInfo',
  props: ['caseId', 'caseOldId', 'caseState'],
  components: { evidInfo },
  data () {
    return {
      evidData: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      this.resEvid()
    }
  },
  methods: {
    resEvid () {
      axios.post('/case/selectObjectByCaseId/4', {
        caseId: this.caseOldId
      }).then(res => {
        this.evidData = res.data.data.evidenceList
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
