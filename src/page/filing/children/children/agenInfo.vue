<template>
  <div class="_agenInfo">
    <Row>
      <Col class="_listL" span="14">
        <Row>
          <Col span="22" offset="1">
            <p>
              <span class="mr10">姓名 :</span>
              <span v-text="infoData.name"></span>
              <span class="_icon">
                <Icon @click="editInfo(infoData.id)" class="_edit" type="edit"></Icon>
                <Icon @click="uploadImg(infoData.id)" class="_uploadImg" type="upload"></Icon>
                <Icon @click="delInfo(infoData.id)" class="_del" type="close-circled"></Icon>
              </span>
            </p>
            <p><span class="mr10" v-text="objInfo.idcardArr[infoData.idcardType === null?0:infoData.idcardType]"></span><span v-text="infoData.idcard"></span></p>
            <p><span class="mr10">送达手机 :</span><span v-text="infoData.phone"></span></p>
            <p><span class="mr10">送达邮箱 :</span><span v-text="infoData.email"></span></p>
            <p><span class="mr10">联系地址 :</span><span v-text="infoData.address"></span></p>
            <p><span class="mr10">委托人姓名 :</span><span v-text="showPropName"></span></p>
          </Col>
        </Row>
      </Col>
      <Col class="_listR clearfix not_s" span="9" offset="1">
        <div v-if="isShowFile">
          <Icon @click="delImg(infoData.id, infoData.fileList[fileIndex].id)" class="_delImg" type="close-circled"></Icon>
          <Icon class="_iconLeft" type="chevron-left" @click="imgPrev"></Icon>
          <div class="_imgBox">
            <img class="_fileImg" :class="{'_iconImg':isImgClass}" :src="fileImgSrc" alt="" :title="'点击查看: '+fileName" @click="seeImg(filePath)">
          </div>
          <Icon class="_iconRight" type="chevron-right" @click="imgNext"></Icon>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>

export default {
  name: 'agen_info',
  props: ['infoData', 'propArrName'],
  data () {
    return {
      fileIndex: 0,
      objInfo: {
        idcardArr: ['未知证件 :', '身份证 :', '军官证 :', '户口簿 :', '实习律师证 :', '律师职业证 :', '护照 :', '驾照 :']
      }
    }
  },
  beforeUpdate () {
    if (this.fileIndex > this.fileNum) {
      this.fileIndex = this.infoData.fileList.length - 1
    }
  },
  computed: {
    showPropName () {
      if (this.propArrName === null || this.propArrName === []) {
        return ''
      } else {
        for (let k in this.propArrName) {
          if (this.propArrName[k].value === this.infoData.propId) {
            return this.propArrName[k].label
          }
        }
        return ''
      }
    },
    isShowFile () {
      if (this.fileNum > -1) {
        return true
      } else {
        return false
      }
    },
    fileNum () {
      return this.infoData.fileList.length - 1
    },
    fileName () {
      let _index = this.fileIndex
      if (_index > this.fileNum) {
        _index = this.fileNum
      }
      return this.infoData.fileList[_index].filename
    },
    filePath () {
      let _index = this.fileIndex
      if (_index > this.fileNum) {
        _index = this.fileNum
      }
      return this.infoData.fileList[_index].filepath
    },
    fileImgSrc () {
      let exte = null
      let _img = ['bmp', 'jpg', 'jpeg', 'png', 'gif']
      let _doc = ['doc', 'docx', 'docm', 'dotm', 'dot']
      let _pdf = ['pdf']
      let _index = this.fileIndex
      if (_index > this.fileNum) {
        _index = this.fileNum
      }
      if (this.infoData.fileList[_index].filename !== null) {
        exte = this.infoData.fileList[_index].filename.split('.').pop().toLowerCase()
      }
      if (exte === null) {
        return '../../static/images/file_icon.png'
      } else if (_img.indexOf(exte) !== -1) {
        return this.infoData.fileList[_index].filepath
      } else if (_doc.indexOf(exte) !== -1) {
        return '../../static/images/doc_icon.png'
      } else if (_pdf.indexOf(exte) !== -1) {
        return '../../static/images/pdf_icon.png'
      } else {
        return '../../static/images/file_icon.png'
      }
    },
    isImgClass () {
      let exte = null
      let _img = ['bmp', 'jpg', 'jpeg', 'png', 'gif']
      let _index = this.fileIndex
      if (_index > this.fileNum) {
        _index = this.fileNum
      }
      if (this.infoData.fileList[_index].filename !== null) {
        exte = this.infoData.fileList[_index].filename.split('.').pop().toLowerCase()
      }
      if (exte === null) {
        return true
      } else if (_img.indexOf(exte) !== -1) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    editInfo (id) {
      this.$emit('editInfo', id)
    },
    uploadImg (id) {
      this.$emit('uploadImg', id)
    },
    delInfo (id) {
      this.$emit('delInfo', id)
    },
    delImg (id, fileId) {
      this.$emit('delImg', {id: id, fileId: fileId})
    },
    imgPrev () {
      if (this.fileNum === -1) {
        return
      }
      if (this.fileIndex === 0) {
        this.fileIndex = this.fileNum
      } else {
        this.fileIndex--
      }
    },
    imgNext () {
      if (this.fileNum === -1) {
        return
      }
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
._agenInfo {
  margin-top: 10px;
  ._listL, ._listR {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
  }
  ._listL {
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
      ._uploadImg {
        @include hand;
        font-size: 18px;
        color: #126eaf;
        margin-left: 10px;
      }
      ._del {
        @include hand;
        font-size: 17px;
        color: #ff7a7a;
        margin-left: 10px;
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
      font-size: 20px;
      color: #126eaf;
    }
    ._iconLeft {
      left: 7px;
    }
    ._iconRight {
      right: 7px;
    }
    ._delImg {
      @include hand;
      position: absolute;
      font-size: 17px;
      color: #ff7a7a;
      right: 7px;
      top: 5px;
    }
    ._imgBox {
      overflow: hidden;
      width: 84%;
      height: 188px;
      margin: 0 auto;
      ._fileImg {
        @include hand;
        clear: both;
        display: block;
        margin: 14px auto;
        width: 96%;
        height: 85%;
      }
      ._fileImg._iconImg {
        @include hand;
        margin: 32px auto;
        width: 50%;
        height: 60%;
      }
    }
  }
}
</style>
