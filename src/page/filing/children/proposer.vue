<template>
  <div class="proposer">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <div v-if="propShow.list" class="_listProp">
        <div v-if="propData !== null" v-for="(item, index) in propData" :key="index">
          <prop-info :infoData="item" @editInfo="editPropInfo(item)" @uploadImg="uploadPropImg" @delInfo="delPropInfo" @delImg="delPropImg"></prop-info>
        </div>
      </div>
      <div v-if="propShow.add">
        <add-prop-info :addType="1" :caseId="caseId" @saveClick="addPropSave" @cancClick="changeView('listProp')"></add-prop-info>
      </div>
      <div v-if="propShow.edit">
        <edit-prop-info :editType="1" :caseId="caseId" :editPropData="editPropData" @saveClick="editPropSave" @cancClick="changeView('listProp')"></edit-prop-info>
      </div>
      <div v-if="propShow.upload">
        <upload-annex :caseId="caseId" :infoId="uploadPropId" :fileType="['jpg','jpeg','png']" :uploadUrl="uploadUrlA" @saveClick="uploadPropSave" @cancClick="changeView('listProp')"></upload-annex>
      </div>
      <add-icon v-if="propShow.addBtn" :imgStatus="1" addText="添加申请人" @addClick="changeView('addProp')"></add-icon>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div v-if="agenShow.list" class="_listAgen">
        <div v-if="agenData !== null" v-for="(item, index) in agenData" :key="index">
          <agen-info :infoData="item" :propArrName="propDataName" @editInfo="editAgenInfo(item)" @uploadImg="uploadAgenImg" @delInfo="delAgenInfo" @delImg="delAgenImg"></agen-info>
        </div>
      </div>
      <div v-if="agenShow.add">
        <add-agen-info :caseId="caseId" :propArrName="propDataName" @saveClick="addAgenSave" @cancClick="changeView('listAgen')"></add-agen-info>
      </div>
      <div v-if="agenShow.edit">
        <edit-agen-info :caseId="caseId" :propArrName="propDataName" :editAgenData="editAgenData" @saveClick="editAgenSave" @cancClick="changeView('listAgen')"></edit-agen-info>
      </div>
      <div v-if="agenShow.upload">
        <upload-annex :caseId="caseId" :infoId="uploadAgenId" :fileType="['jpg','jpeg','png']" :uploadUrl="uploadUrlC" @saveClick="uploadAgenSave" @cancClick="changeView('listAgen')"></upload-annex>
      </div>
      <add-icon v-if="agenShow.addBtn" :imgStatus="1" addText="添加代理人" @addClick="changeView('addAgen')"></add-icon>
    </div>
    <alert-tip :alertShow="alertShowProp" @alertCancel="delPropCanc" @alertConfirm="delPropSave" alertTitle="提示" alertText="确定要删除这条记录吗？">
    </alert-tip>
    <alert-tip :alertShow="alertShowPropImg" @alertCancel="delPropImgCanc" @alertConfirm="delPropImgSave" alertTitle="提示" alertText="确定要删除这个附件吗？">
    </alert-tip>
    <alert-tip :alertShow="alertShowAgen" @alertCancel="delAgenCanc" @alertConfirm="delAgenSave" alertTitle="提示" alertText="确定要删除这条记录吗？">
    </alert-tip>
    <alert-tip :alertShow="alertShowAgenImg" @alertCancel="delAgenImgCanc" @alertConfirm="delAgenImgSave" alertTitle="提示" alertText="确定要删除这个附件吗？">
    </alert-tip>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import alertTip from '@/components/common/alertTip'
import addIcon from '@/components/common/addIcon'
import propInfo from '@/page/filing/children/children/propInfo'
import addPropInfo from '@/page/filing/children/children/addPropInfo'
import editPropInfo from '@/page/filing/children/children/editPropInfo'
import uploadAnnex from '@/page/filing/children/children/uploadAnnex'
import agenInfo from '@/page/filing/children/children/agenInfo'
import addAgenInfo from '@/page/filing/children/children/addAgenInfo'
import editAgenInfo from '@/page/filing/children/children/editAgenInfo'
import regi from '@/config/regiType.js'

export default {
  name: 'proposer',
  props: [],
  components: { alertTip, addIcon, propInfo, addPropInfo, editPropInfo, uploadAnnex, agenInfo, addAgenInfo, editAgenInfo },
  data () {
    return {
      alertShowProp: false,
      alertShowAgen: false,
      alertShowPropImg: false,
      alertShowAgenImg: false,
      propShow: {
        list: false,
        add: false,
        edit: false,
        upload: false,
        addBtn: true
      },
      agenShow: {
        list: false,
        add: false,
        edit: false,
        upload: false,
        addBtn: true
      },
      propData: [],
      agenData: [],
      editPropData: {},
      editAgenData: {},
      delPropId: null,
      delAgenId: null,
      delPropImgObj: null,
      delAgenImgObj: null,
      uploadPropId: null,
      uploadAgenId: null,
      propDataName: []
    }
  },
  created () {
    if (this.caseInfo !== null) {
      this.propData = this.caseInfo.propList
      this.agenData = this.caseInfo.proxyList
      this.createList()
      this.resPropArrName()
    }
  },
  computed: {
    ...mapGetters([
      'caseId',
      'caseInfo'
    ]),
    uploadUrlA () {
      return regi.api + '/file/uploadParty/1'
    },
    uploadUrlC () {
      return regi.api + '/file/uploadParty/3'
    }
  },
  methods: {
    ...mapActions([
      'setFiling'
    ]),
    addPropSave (_obj) {
      this.propData.push(_obj)
      this.setFiling({type: 'propList', data: this.propData})
      this.resPropArrName()
      this.changeView('listProp')
      this.$Message.success({
        content: '添加成功',
        duration: 2
      })
    },
    editPropInfo (_obj) {
      this.editPropData = _obj
      this.changeView('editProp')
    },
    editPropSave (_obj) {
      for (let k in this.propData) {
        if (this.propData[k].id === _obj.id) {
          this.propData[k] = JSON.parse(JSON.stringify(_obj))
          this.setFiling({type: 'propList', data: this.propData})
          this.resPropArrName()
          this.changeView('listProp')
          this.$Message.success({
            content: '修改成功',
            duration: 2
          })
          return
        }
      }
    },
    uploadPropImg (id) {
      this.uploadPropId = id
      this.changeView('uploadProp')
    },
    uploadPropSave (_obj) {
      this.changeView('listProp')
      for (let k in this.propData) {
        if (this.propData[k].id === _obj.id) {
          this.propData[k].fileList.unshift(JSON.parse(JSON.stringify(_obj.fileObj)))
          this.setFiling({type: 'propList', data: this.propData})
          this.$Message.success({
            content: '上传成功',
            duration: 2
          })
          return
        }
      }
    },
    delPropInfo (id) {
      this.alertShowProp = true
      this.delPropId = id
    },
    delPropSave () {
      axios.post('/party/delete/1', {
        caseId: this.caseId,
        id: this.delPropId
      }).then(res => {
        for (let k in this.propData) {
          if (this.propData[k].id === this.delPropId) {
            this.propData.splice(k, 1)
            this.setFiling({type: 'propList', data: this.propData})
            this.resPropArrName()
            this.alertShowProp = false
            this.$Message.success({
              content: '删除成功',
              duration: 2
            })
            return
          }
        }
      }).catch(e => {
        this.alertShowProp = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    delPropCanc () {
      this.alertShowProp = false
      this.delPropId = null
    },
    delPropImg (_obj) {
      this.alertShowPropImg = true
      this.delPropImgObj = _obj
    },
    delPropImgSave () {
      axios.post('/file/deleteFileUpload', {
        caseId: this.caseInfo.id,
        id: this.delPropImgObj.fileId
      }).then(res => {
        for (let k in this.propData) {
          if (this.propData[k].id === this.delPropImgObj.id) {
            for (let v in this.propData[k].fileList) {
              if (this.propData[k].fileList[v].id === this.delPropImgObj.fileId) {
                this.propData[k].fileList.splice(v, 1)
                this.setFiling({type: 'propList', data: this.propData})
                this.changeView('delPropImg')
                this.alertShowPropImg = false
                this.$Message.success({
                  content: '删除成功',
                  duration: 2
                })
                return
              }
            }
          }
        }
      }).catch(e => {
        this.alertShowPropImg = false
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    delPropImgCanc () {
      this.alertShowPropImg = false
      this.delPropImgObj = null
    },
    addAgenSave (_obj) {
      this.agenData.push(_obj)
      this.setFiling({type: 'proxyList', data: this.agenData})
      this.changeView('listAgen')
      this.$Message.success({
        content: '添加成功',
        duration: 2
      })
    },
    editAgenInfo (_obj) {
      this.editAgenData = _obj
      this.changeView('editAgen')
    },
    editAgenSave (_obj) {
      for (let k in this.agenData) {
        if (this.agenData[k].id === _obj.id) {
          this.agenData[k] = JSON.parse(JSON.stringify(_obj))
          this.setFiling({type: 'proxyList', data: this.agenData})
          this.changeView('listAgen')
          this.$Message.success({
            content: '修改成功',
            duration: 2
          })
          return
        }
      }
    },
    uploadAgenImg (id) {
      this.uploadAgenId = id
      this.changeView('uploadAgen')
    },
    uploadAgenSave (_obj) {
      this.changeView('listAgen')
      for (let k in this.agenData) {
        if (this.agenData[k].id === _obj.id) {
          this.agenData[k].fileList.unshift(JSON.parse(JSON.stringify(_obj.fileObj)))
          this.setFiling({type: 'proxyList', data: this.agenData})
          this.$Message.success({
            content: '上传成功',
            duration: 2
          })
          return
        }
      }
    },
    delAgenInfo (id) {
      this.alertShowAgen = true
      this.delAgenId = id
    },
    delAgenSave () {
      axios.post('/proxy/delete', {
        caseId: this.caseId,
        id: this.delAgenId
      }).then(res => {
        for (let k in this.agenData) {
          if (this.agenData[k].id === this.delAgenId) {
            this.agenData.splice(k, 1)
            this.setFiling({type: 'proxyList', data: this.agenData})
            this.alertShowAgen = false
            this.$Message.success({
              content: '删除成功',
              duration: 2
            })
            return
          }
        }
      }).catch(e => {
        this.alertShowAgen = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    delAgenCanc () {
      this.alertShowAgen = false
      this.delAgenId = null
    },
    delAgenImg (_obj) {
      this.alertShowAgenImg = true
      this.delAgenImgObj = _obj
    },
    delAgenImgSave () {
      axios.post('/file/deleteFileUpload', {
        caseId: this.caseInfo.id,
        id: this.delAgenImgObj.fileId
      }).then(res => {
        for (let k in this.agenData) {
          if (this.agenData[k].id === this.delAgenImgObj.id) {
            for (let v in this.agenData[k].fileList) {
              if (this.agenData[k].fileList[v].id === this.delAgenImgObj.fileId) {
                this.agenData[k].fileList.splice(v, 1)
                this.setFiling({type: 'proxyList', data: this.agenData})
                this.changeView('delAgenImg')
                this.alertShowAgenImg = false
                this.$Message.success({
                  content: '删除成功',
                  duration: 2
                })
                return
              }
            }
          }
        }
      }).catch(e => {
        this.alertShowAgenImg = false
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    delAgenImgCanc () {
      this.alertShowAgenImg = false
      this.delAgenImgObj = null
    },
    resPropArrName () {
      let _nameArr = []
      let _typeArr = [2, 3, 4]
      for (let k in this.propData) {
        let _obj = {}
        if (this.propData[k].type === 1) {
          _obj.label = this.propData[k].name
          _obj.value = this.propData[k].id
          _nameArr.push(_obj)
        } else if (_typeArr.indexOf(this.propData[k].type) !== -1) {
          _obj.label = this.propData[k].enterpriseName
          _obj.value = this.propData[k].id
          _nameArr.push(_obj)
        }
      }
      this.propDataName = _nameArr
    },
    createList () {
      if (this.propData.length === 0) {
        this.propShow.list = false
      } else {
        this.propShow.list = true
      }
      if (this.agenData.length === 0) {
        this.agenShow.list = false
      } else {
        this.agenShow.list = true
      }
    },
    changeView (type) {
      if (type === 'listProp') {
        if (this.propData.length === 0) {
          this.propShow.list = false
        } else {
          this.propShow.list = true
        }
        this.propShow.add = false
        this.propShow.edit = false
        this.propShow.upload = false
        this.propShow.addBtn = true
      } else if (type === 'addProp') {
        this.propShow.list = false
        this.propShow.add = true
        this.propShow.addBtn = false
      } else if (type === 'editProp') {
        this.propShow.list = false
        this.propShow.edit = true
        this.propShow.addBtn = false
      } else if (type === 'uploadProp') {
        this.propShow.list = false
        this.propShow.upload = true
        this.propShow.addBtn = false
      } else if (type === 'delPropImg') {
        this.propShow.list = false
        setTimeout(() => {
          this.propShow.list = true
        }, 500)
      } else if (type === 'delAgenImg') {
        this.agenShow.list = false
        setTimeout(() => {
          this.agenShow.list = true
        }, 500)
      } else if (type === 'listAgen') {
        if (this.agenData.length === 0) {
          this.agenShow.list = false
        } else {
          this.agenShow.list = true
        }
        this.agenShow.add = false
        this.agenShow.edit = false
        this.agenShow.upload = false
        this.agenShow.addBtn = true
      } else if (type === 'addAgen') {
        this.agenShow.list = false
        this.agenShow.add = true
        this.agenShow.addBtn = false
      } else if (type === 'editAgen') {
        this.agenShow.list = false
        this.agenShow.edit = true
        this.agenShow.addBtn = false
      } else if (type === 'uploadAgen') {
        this.agenShow.list = false
        this.agenShow.upload = true
        this.agenShow.addBtn = false
      }
    }
  },
  watch: {
    caseInfo: function (val) {
      if (val !== null) {
        this.propData = val.propList
        this.agenData = val.proxyList
        this.createList()
        this.resPropArrName()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.proposer {
  ._agent {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._proposer ._top, ._agent ._top{
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
