<template>
  <div class="_propInfo">
    <Row>
      <Col class="_listL" span="14">
        <Row v-if="infoData.type === 1">
          <Col span="22" offset="1">
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">姓名 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.name"></span>
                  <span class="_icon">
                    <Icon @click="seeInfo" class="_see" type="eye"></Icon>
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
          </Col>
        </Row>
        <Row v-else-if="infoData.type === 2">
          <Col span="22" offset="1">
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">企业名 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.enterpriseName"></span>
                  <span class="_icon">
                    <Icon @click="seeInfo" class="_see" type="eye"></Icon>
                  </span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10" v-text="priseName"></span></Col>
                <Col span="18">
                  <span v-text="infoData.enterpriseIdcard"></span>
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
          </Col>
        </Row>
        <Row v-else-if="infoData.type === 3">
          <Col span="22" offset="1">
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">名称 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.enterpriseName"></span>
                  <span class="_icon">
                    <Icon @click="seeInfo" class="_see" type="eye"></Icon>
                  </span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10" v-text="priseName"></span></Col>
                <Col span="18">
                  <span v-text="infoData.enterpriseIdcard"></span>
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
          </Col>
        </Row>
        <Row v-else-if="infoData.type === 4">
          <Col span="22" offset="1">
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10">组织名称 :</span></Col>
                <Col span="18">
                  <span v-text="infoData.enterpriseName"></span>
                  <span class="_icon">
                    <Icon @click="seeInfo" class="_see" type="eye"></Icon>
                  </span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="5"><span class="mr10" v-text="priseName"></span></Col>
                <Col span="18">
                  <span v-text="infoData.enterpriseIdcard"></span>
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
          </Col>
        </Row>
      </Col>
      <Col class="_listR clearfix not_s" span="9" offset="1">
        <div v-if="isShowFile">
          <!-- <Icon @click="dowImg(infoData.fileList[fileIndex].id)" class="_dowImg" type="archive"></Icon> -->
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
import axios from 'axios'
import regi from '@/config/regiType.js'

export default {
  name: 'prop_info',
  props: ['infoData'],
  data () {
    return {
      fileIndex: 0,
      idcardList: [],
      enterpriseList: []
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
    idcardName () {
      for (let k in this.idcardList) {
        if (this.idcardList[k].itemValue === this.infoData.idcardType) {
          return this.idcardList[k].item + ' :'
        }
      }
      return '未知证件 :'
    },
    priseName () {
      for (let k in this.enterpriseList) {
        if (this.enterpriseList[k].itemValue === this.infoData.enterpriseType) {
          return this.enterpriseList[k].item + ' :'
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
    cardList () {
      axios.all([axios.post('/dictionary/enterpriseIdcardType'), axios.post('/dictionary/personIdcardType')]).then(axios.spread((resO, resT) => {
        this.enterpriseList = resO.data.data
        this.idcardList = resT.data.data
      })).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    seeInfo () {
      this.$emit('seeInfo')
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
    },
    dowImg (id) {
      window.open(regi.api + '/file/dowload/' + id, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._propInfo {
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
      ._see {
        @include hand;
        font-size: 18px;
        color: #126eaf
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
      top: 9px;
    }
    ._imgBox {
      overflow: hidden;
      width: 84%;
      height: 162px;
      margin: 0 auto;
      ._fileImg {
        @include hand;
        clear: both;
        display: block;
        margin: 12px auto;
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
