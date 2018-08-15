<template>
  <div class="evidences">
    <div class="_evidences">
      <div class="_top">我的证据</div>
      <add-icon v-if="addEvidShow" :imgStatus="2" addText="添加证据" @addClick="addEvid"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import addIcon from '@/components/common/addIcon'

export default {
  name: 'evidences',
  props: [],
  components: { addIcon },
  data () {
    return {
      addEvidShow: true
    }
  },
  created () {
    if (this.caseInfo !== null) {
      console.log('渲染数据')
    }
  },
  computed: {
    ...mapGetters([
      'caseId',
      'caseInfo'
    ])
  },
  methods: {
    ...mapActions([
      'setFiling'
    ]),
    addEvid () {
      console.log('添加证据')
    }
  },
  watch: {
    caseInfo: function (val) {
      if (val !== null) {
        console.log('渲染数据')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.evidences {
  width: 83%;
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
