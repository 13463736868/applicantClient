<template>
  <div class="_comInfo">
    <Row v-if="infoData.type === 1">
      <Col class="_listL" span="15">
        <Row>
          <Col span="22" offset="1">
            <p><span class="mr10">姓名 :</span><span v-text="infoData.name"></span><span class="_icon"><Icon class="_edit" type="edit" @click="editInfo(infoData.id)"></Icon><Icon @click="delInfo(infoData.id)" class="_del" type="close-circled"></Icon></span></p>
            <p><span class="mr10" v-text="objInfo.idcardArr[infoData.idcardType === null?0:infoData.idcardType]"></span><span v-text="infoData.idcard"></span></p>
            <p><span class="mr10">送达手机 :</span><span v-text="infoData.phone"></span></p>
            <p><span class="mr10">送达邮箱 :</span><span v-text="infoData.email"></span></p>
            <p><span class="mr10">联系地址 :</span><span v-text="infoData.adress"></span></p>
          </Col>
        </Row>
      </Col>
      <Col class="_listR clearfix" span="8" offset="1">
        <Icon class="_iconLeft" type="arrow-left-b" @click="imgPrev"></Icon>
        <div class="_imgBox">
          <img class="_fileImg" :src="infoData.fileList[fileIndex].filepath" alt="" :title="'点击查看: '+infoData.fileList[fileIndex].filename" @click="seeImg(infoData.fileList[fileIndex].filepath)">
        </div>
        <Icon class="_iconRight" type="arrow-right-b" @click="imgNext"></Icon>
      </Col>
    </Row>
    <Row v-else-if="infoData.type === 2">
      <Col>2</Col>
    </Row>
    <Row v-else-if="infoData.type === 3">
      <Col>3</Col>
    </Row>
    <Row v-else-if="infoData.type === 4">
      <Col>4</Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'com_info',
  props: ['infoData'],
  data () {
    return {
      fileIndex: 0,
      objInfo: {
        idcardArr: ['未知证件 :', '身份证 :', '军官证 :', '户口簿 :', '实习律师证 :', '律师职业证 :', '护照 :', '驾照 :']
      }
    }
  },
  computed: {
    fileNum () {
      return this.infoData.fileList.length - 1
    }
  },
  methods: {
    editInfo (id) {
      this.$emit('editInfo', id)
    },
    delInfo (id) {
      this.$emit('delInfo', id)
    },
    imgPrev () {
      if (this.fileIndex === 0) {
        this.fileIndex = this.fileNum
      } else {
        this.fileIndex--
      }
    },
    imgNext () {
      if (this.fileIndex === this.fileNum) {
        this.fileIndex = 0
      } else {
        this.fileIndex++
      }
    },
    seeImg (path) {
      window.open(path, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._comInfo {
  margin-top: 10px;
  ._listL, ._listR {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
  }
  ._listL {
    padding: 10px 0;
    p {
      height: 28px;
      line-height: 28px;
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
        margin-left: 15px;
      }
    }
  }
  ._listR {
    position: relative;
    ._iconLeft, ._iconRight {
      @include hand;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 26px;
      color: #126eaf;
    }
    ._iconLeft {
      left: 5px;
    }
    ._iconRight {
      right: 5px;
    }
    ._imgBox {
      overflow: hidden;
      width: 84%;
      height: 160px;
      margin: 0 auto;
      ._fileImg {
      @include hand;
      clear: both;
      display: block;
      margin: auto;
      width: 100%;
      height: 100%;
    }
    }
  }
}
</style>
