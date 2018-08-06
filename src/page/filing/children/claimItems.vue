<template>
  <div class="claimItems">
    <div class="_claim">
      <div class="_top">仲裁请求</div>
      <add-icon v-if="addClaimShow" :imgStatus="2" addText="添加仲裁请求" @addClick="addClaim"></add-icon>
    </div>
    <div class="_reason">
      <div class="_top">事实与理由</div>
      <add-icon v-if="addReasShow" :imgStatus="2" addText="添加事实与理由" @addClick="addReas"></add-icon>
    </div>
    <div class="_applicationBook">
      <div class="_top">仲裁申请书</div>
      <add-icon v-if="addApplShow" :imgStatus="3" addText="上传申请书" @addClick="addAppl"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'

export default {
  name: 'claimItems',
  props: [],
  components: { addIcon },
  data () {
    return {
      addClaimShow: true,
      addReasShow: true,
      addApplShow: true
    }
  },
  created () {
    if (this.caseInfo !== null) {
      console.log('渲染数据')
    }
  },
  computed: {
    ...mapGetters([
      'caseInfo'
    ])
  },
  methods: {
    addClaim () {
      console.log('添加仲裁请求')
    },
    addReas () {
      console.log('添加事实与理由')
    },
    addAppl () {
      console.log('上传申请书')
    }
  },
  watch: {
    caseInfo: function (val) {
      console.log('渲染数据')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.claimItems {
  width: 83%;
  ._reason, ._applicationBook {
    padding-top: 60px;
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
