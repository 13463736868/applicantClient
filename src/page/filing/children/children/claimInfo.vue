<template>
  <div class="_claimInfo">
    <Row>
      <Col class="_listL" span="24">
        <Row>
          <Col span="22" offset="1">
            <p>
              <span class="mr10">申请人姓名 :</span>
              <span v-text="requestName"></span>
              <span class="_icon">
                <Icon @click="editInfo(infoData.id)" class="_edit" type="edit"></Icon>
                <Icon @click="delInfo(infoData.id)" class="_del" type="close-circled"></Icon>
              </span>
            </p>
            <p>
              <span class="mr10">请求项内容 :</span>
              <span v-text="infoData.content"></span>
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'claim_info',
  props: ['infoData', 'propArrName'],
  data () {
    return {}
  },
  computed: {
    requestName () {
      for (let k in this.propArrName) {
        if (this.propArrName[k].value === this.infoData.requestName) {
          return this.propArrName[k].label
        }
      }
    }
  },
  methods: {
    editInfo (id) {
      this.$emit('editInfo', id)
    },
    delInfo (id) {
      this.$emit('delInfo', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._claimInfo {
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
      ._edit {
        @include hand;
        font-size: 16px;
        color: #126eaf
      }
      ._del {
        @include hand;
        font-size: 17px;
        color: #ff7a7a;
        margin-left: 10px;
      }
    }
  }
}
</style>
