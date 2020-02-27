<template>
  <div class="_agenInfo">
    <Row>
      <Col class="_listL" span="14">
        <Row>
          <Col span="22" offset="1">
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">姓名 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.name"></span>
                  <span class="_icon">
                    <Icon @click="seeInfo" class="_see" type="eye"></Icon>
                    <template v-if="myCaseState === 3 || myCaseState === '3'">
                      <Icon @click="editInfo" class="_edit" type="edit" title="修改"></Icon>
                      <Icon @click="uploadImg(infoData.id)" class="_uploadImg" type="upload" title="上传附件"></Icon>
                    </template>
                  </span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10" v-text="idcardName"></span></Col>
                <Col span="18">
                  <span v-text="infoData.idcard"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">送达手机 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.phone"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">送达邮箱 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.email"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">联系地址 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.address"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">委托人姓名 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.propName"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">授权委托书 :</span></Col>
                <Col span="18">
                  <span v-if="infoData.authorizeBook !== undefined && infoData.authorizeBook !== null" @click="seeFile(infoData.authorizeBook.filepath)" class="_autBook" v-text="infoData.authorizeBook.filename.length > 30 ? infoData.authorizeBook.filename.substr(0, 30) + '...' : infoData.authorizeBook.filename"></span>
                </Col>
              </Row>
            </p>
          </Col>
        </Row>
      </Col>
      <Col class="_listR clearfix not_s" span="9" offset="1">
        <div v-if="isShowFile">
          <!-- <Icon @click="dowImg(infoData.fileList[fileIndex].id)" class="_dowImg" type="archive"></Icon> -->
          <Icon class="_iconLeft" type="chevron-left" @click="imgPrev"></Icon>
          <div class="_imgBox">
            <template v-if="myCaseState === 3 || myCaseState === '3'">
              <img class="_fileImg _height" :class="{'_iconImg':isImgClass}" :src="fileImgSrc" alt="" :title="'点击查看: '+fileName" @click="seeImg(filePath)">
              <Button style="background:#156FAE;border:1" long type="primary" size="small" @click="uploadImg(infoData.id)">上 传</Button>
            </template>
            <template v-else>
              <img class="_fileImg _heightS" :class="{'_iconImg':isImgClass}" :src="fileImgSrc" alt="" :title="'点击查看: '+fileName" @click="seeImg(filePath)">
            </template>
          </div>
          <Icon class="_iconRight" type="chevron-right" @click="imgNext"></Icon>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import regi from '@/config/regiType.js'

export default {
  name: 'agen_info',
  props: ['infoData'],
  data () {
    return {
      fileIndex: 0,
      idcardList: []
    }
  },
  beforeUpdate () {
    if (this.fileIndex > this.fileNum) {
      this.fileIndex = this.infoData.fileList.length - 1
    }
  },
  created () {
    this.cardList()
  },
  computed: {
    ...mapGetters([
      'myCaseState'
    ]),
    idcardName () {
      for (let k in this.idcardList) {
        if (this.idcardList[k].itemValue === this.infoData.idcardType) {
          return this.idcardList[k].item + ' :'
        }
      }
      return '未知证件 :'
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
        return require('../../static/images/file_icon.png')
      } else if (_img.indexOf(exte) !== -1) {
        return this.infoData.fileList[_index].filepath
      } else if (_doc.indexOf(exte) !== -1) {
        return require('../../static/images/doc_icon.png')
      } else if (_pdf.indexOf(exte) !== -1) {
        return require('../../static/images/pdf_icon.png')
      } else {
        return require('../../static/images/file_icon.png')
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
    seeFile (path) {
      window.open(path, '_blank')
    },
    cardList () {
      axios.post('/dictionary/personIdcardType').then(res => {
        this.idcardList = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    editInfo () {
      this.$emit('editInfo')
    },
    uploadImg (id) {
      this.$emit('uploadImg', id)
    },
    seeInfo () {
      this.$emit('seeInfo')
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
    },
    dowImg (id) {
      window.open(regi.api + '/file/dowload/' + id, '_blank')
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
    ._autBook {
      @include hand;
      color: #126eaf;
    }
    p {
      padding: 5px 0;
    }
    ._icon {
      float: right;
      ._edit {
        @include hand;
        font-size: 16px;
        color: #126eaf;
        margin-left: 10px;
      }
      ._uploadImg {
        @include hand;
        font-size: 18px;
        color: #126eaf;
        margin-left: 10px;
      }
      ._see {
        @include hand;
        font-size: 18px;
        color: #126eaf;
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
    ._dowImg {
      @include hand;
      position: absolute;
      font-size: 18px;
      color: #126eaf;
      right: 6px;
      top: 12px;
    }
    ._imgBox {
      overflow: hidden;
      width: 84%;
      height: 218px;
      margin: 0 auto;
      ._height {
        height: 70%;
      }
      ._heightS {
        height: 85%;
      }
      ._fileImg {
        @include hand;
        clear: both;
        display: block;
        margin: 16px auto;
        width: 96%;
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
