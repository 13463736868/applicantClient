<template>
  <div class="_applInfo">
    <Row>
      <Col class="_listL" span="24">
        <Row>
          <Col span="22" offset="1">
            <p>
              <span class="mr10 _file" v-text="infoData.filename" :title="'点击查看: '+infoData.filename" @click="seeFile(infoData.filepath)"></span>
              <!-- <span class="_icon">
                <Icon @click="dowInfo(infoData.id)" class="_dow" type="archive"></Icon>
              </span> -->
              <span class="_icon" v-if="myCaseState === 3 || myCaseState === '3'">
                <Icon @click="editInfo" class="_edit" type="edit"></Icon>
              </span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import regi from '@/config/regiType.js'

export default {
  name: 'appl_info',
  props: ['infoData'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'myCaseState'
    ])
  },
  methods: {
    editInfo () {
      this.$emit('editInfo')
    },
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
._applInfo {
  margin-top: 10px;
  ._listL {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    padding: 10px 0;
    p {
      padding: 5px 0;
    }
    ._file {
      @include hand;
      color: #337BB5;
    }
    ._icon {
      float: right;
      ._dow {
        @include hand;
        font-size: 18px;
        color: #126eaf;
        margin-left: 10px;
      }
      ._edit {
        @include hand;
        font-size: 16px;
        color: #126eaf
      }
    }
  }
}
</style>
