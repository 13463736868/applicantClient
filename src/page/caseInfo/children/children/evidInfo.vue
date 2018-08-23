<template>
  <div class="_evidInfo">
    <Row>
      <Col class="_listL" span="24">
        <Row>
          <Col span="22" offset="1">
            <p>
              <span class="mr10">证据项名称 :</span>
              <span v-text="infoData.name"></span>
            </p>
            <p>
              <span class="mr10">是否有原件 :</span>
              <span v-if="infoData.state === 1">是</span>
              <span v-else-if="infoData.state === 2">否</span>
            </p>
            <p>
              <span class="mr10">证据项描述 :</span>
              <span v-text="infoData.memo"></span>
            </p>
            <p>
              <span class="mr10">附件名称 :</span>
              <span class="_file" v-text="infoData.fileName" :title="'点击查看: '+infoData.fileName" @click="seeFile(infoData.filePath)"></span>
              <span class="_icon">
                <Icon @click="dowInfo(infoData.fileid)" class="_dow" type="archive"></Icon>
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'evid_info',
  props: ['infoData'],
  data () {
    return {}
  },
  methods: {
    seeFile (path) {
      window.open(path, '_blank')
    },
    dowInfo (id) {
      window.open('/api/file/dowload/' + id, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._evidInfo {
  margin-top: 10px;
  ._listL {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    padding: 10px 0;
    p {
      padding: 5px 0;
    }
    ._icon {
      float: right;
      ._dow {
        @include hand;
        font-size: 18px;
        color: #126eaf;
        margin-left: 10px;
      }
    }
    ._file {
      @include hand;
      color: #337BB5
    }
  }
}
</style>
