<template>
  <div class="proposer">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <div v-if="listPropShow" class="_listProp">
        <div v-if="propData !== null" v-for="(item, index) in propData" :key="index">
          <com-info :infoData="item" @editInfo="editPropInfo" @delInfo="delPropInfo"></com-info>
        </div>
      </div>
      <add-icon v-if="addPropShow" :imgStatus="1" addText="添加申请人" @addClick="addProp"></add-icon>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div v-if="listAgenShow" class="_listAgen">
        <div v-if="agenData !== null" v-for="(item, index) in agenData" :key="index">
          <com-info :infoData="item" @editInfo="editAgenInfo" @delInfo="delAgenInfo"></com-info>
        </div>
      </div>
      <add-icon v-if="addAgenShow" :imgStatus="1" addText="添加代理人" @addClick="addAgen"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'
import comInfo from '@/page/filing/children/children/comInfo'

export default {
  name: 'proposer',
  props: [],
  components: { addIcon, comInfo },
  data () {
    return {
      listPropShow: false,
      addPropShow: true,
      listAgenShow: false,
      addAgenShow: true,
      propData: {},
      agenData: {}
    }
  },
  created () {
    if (this.caseInfo !== null) {
      console.log(this.caseInfo.propList)
      this.propData = this.caseInfo.propList
      this.agenData = this.caseInfo.proxyList
      this.createList()
    }
  },
  computed: {
    ...mapGetters([
      'caseInfo'
    ])
  },
  methods: {
    addProp () {
      console.log('添加申请人')
    },
    editPropInfo (id) {
      console.log(id)
    },
    delPropInfo (id) {
      console.log(id)
    },
    addAgen () {
      console.log('添加代理人')
    },
    editAgenInfo (id) {
      console.log(id)
    },
    delAgenInfo (id) {
      console.log(id)
    },
    createList () {
      if (this.propData.length === 0) {
        this.listPropShow = false
      } else {
        this.listPropShow = true
      }
      if (this.agenData.length === 0) {
        this.listAgenShow = false
      } else {
        this.listAgenShow = true
      }
    }
  },
  watch: {
    caseInfo: function (val) {
      console.log(val.propList)
      this.propData = val.propList
      this.agenData = this.caseInfo.proxyList
      this.createList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.proposer {
  width: 83%;
  ._agent {
    padding-top: 60px;
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
