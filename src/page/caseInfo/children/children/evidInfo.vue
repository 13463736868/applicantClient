<template>
  <div class="_evidInfo">
    <Row>
      <Col class="_listL" span="24">
        <Row>
          <Col span="22" offset="1">
            <p>
              <Row>
                <Col class="tr" span="3"><span class="mr10">证据项名称 :</span></Col>
                <Col span="20">
                  <span v-text="infoData.name"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="3"><span class="mr10">有无原件 :</span></Col>
                <Col span="20">
                  <span v-if="infoData.state === 1">有</span>
                  <span v-else-if="infoData.state === 2">无</span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="3"><span class="mr10">证据项描述 :</span></Col>
                <Col span="20">
                  <span v-text="infoData.memo"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="3"><span class="mr10">附件名称 :</span></Col>
                <Col span="20">
                  <p class="_file" v-for="(item, index) in infoData.fileUploads" :key="index" :title="'点击查看: '+item.filename" @click="seeFile(item.filepath)">{{item.filename.length > 50 ? item.filename.substr(0, 50) + '...' : item.filename}}</p>
                </Col>
              </Row>
                <!-- <Icon @click="dowInfo(infoData.fileid)" class="_dow" type="archive"></Icon> -->
            </p>
            <p>
              <Row>
                <Col class="tr" span="3"><span class="mr10">固化状态 :</span></Col>
                <Col span="20">
                  <span v-if="infoData.isSolidify === 1" style="color:#19be6b;">证据固化一致</span>
                  <span v-else-if="infoData.isSolidify === 2" style="color:#ed3f14;">证据固化不一致</span>
                  <span v-else-if="infoData.isSolidify === 3" style="color:#ff9900;">证据未固化</span>
                  <span v-else-if="infoData.isSolidify === 4" style="color:#19be6b;">证据未固化 ( 补充证据 )</span>
                  <span v-else-if="infoData.isSolidify === null" style="color:#ff9900;">证据未固化</span>
                </Col>
              </Row>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import regi from '@/config/regiType.js'

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
      window.open(regi.api + '/file/dowload/' + id, '_blank')
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
      word-break: break-all;
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
      color: #337BB5;
      margin-right: 60px;
    }
  }
}
</style>
