<template>
  <div class="fileDowload">
    <head-top :isRegister="false" headType="fileDowload">
      <span class="f36 fcf">文件下载</span>
    </head-top>
    <div class="_center">
      <file-req v-if="showObj.fileReq" @alertConfirm="alertSave('findReq', ...arguments)"></file-req>
      <file-list v-if="showObj.fileList" :fileData="reqData"></file-list>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import fileReq from '@/page/fileDowload/children/fileReq'
import fileList from '@/page/fileDowload/children/fileList'

export default {
  name: 'fileDowload',
  components: { headTop, fileReq, fileList },
  data () {
    return {
      showObj: {
        fileReq: true,
        fileList: false
      },
      reqData: null
    }
  },
  methods: {
    alertSave (type, data) {
      this.reqData = data
      this.showObj.fileReq = false
      this.showObj.fileList = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
}
</style>
