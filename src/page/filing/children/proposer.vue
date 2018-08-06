<template>
  <div class="proposer">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <add-icon v-if="addPropShow" :imgStatus="1" addText="添加申请人" @addClick="addProp"></add-icon>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <add-icon v-if="addAgenShow" :imgStatus="1" addText="添加代理人" @addClick="addAgen"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'

export default {
  name: 'proposer',
  props: [],
  components: { addIcon },
  data () {
    return {
      addPropShow: true,
      addAgenShow: true
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
    addProp () {
      console.log('添加申请人')
    },
    addAgen () {
      console.log('添加代理人')
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
