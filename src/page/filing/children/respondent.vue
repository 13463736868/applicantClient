<template>
  <div class="respondent">
    <div class="_respondent">
      <div class="_top">被申请人</div>
      <div v-if="listRespShow" class="_listResp">
        <div v-if="respData !== null" v-for="(item, index) in respData" :key="index">
          <com-info :infoData="item" @editInfo="editInfo" @delInfo="delInfo"></com-info>
        </div>
      </div>
      <add-icon v-if="addRespShow" :imgStatus="1" addText="添加被申请人" @addClick="addResp"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'
import comInfo from '@/page/filing/children/children/comInfo'

export default {
  name: 'respondent',
  props: [],
  components: { addIcon, comInfo },
  data () {
    return {
      listRespShow: false,
      addRespShow: true,
      respData: {}
    }
  },
  created () {
    if (this.caseInfo !== null) {
      this.respData = this.caseInfo.respList
      this.createList()
    }
  },
  computed: {
    ...mapGetters([
      'caseInfo'
    ])
  },
  methods: {
    addResp () {
      console.log('添加被申请人')
    },
    editInfo (id) {
      console.log(id)
    },
    delInfo (id) {
      console.log(id)
    },
    createList () {
      if (this.respData.length === 0) {
        this.listRespShow = false
      } else {
        this.listRespShow = true
      }
    }
  },
  watch: {
    caseInfo: function (val) {
      this.respData = val.respList
      this.createList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.respondent {
  width: 83%;
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
