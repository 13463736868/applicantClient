<template>
  <div class="respondent">
    <div class="_respondent">
      <div class="_top">被申请人</div>
      <add-icon v-if="addRespShow" :imgStatus="1" addText="添加被申请人" @addClick="addResp"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'

export default {
  name: 'respondent',
  props: [],
  components: { addIcon },
  data () {
    return {
      addRespShow: true
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
    addResp () {
      console.log('添加被申请人')
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
