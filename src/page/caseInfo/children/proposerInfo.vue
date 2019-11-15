<template>
  <div class="proposerInfo">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <div v-if="propShow.list">
        <div v-if="propData !== null" v-for="(item, index) in propData" :key="index">
          <prop-info :infoData="item" @editInfo="editPropInfo(item)" @uploadImg="uploadPropImg" @seeInfo="seePropInfo(item)"></prop-info>
        </div>
      </div>
      <div v-if="propShow.see">
        <see-prop-info :seePropData="seePropData" @saveClick="alertSave('seeProp')"></see-prop-info>
      </div>
      <div v-if="propShow.edit">
        <edit-prop-info :editType="1" :caseId="caseId" :editPropData="editPropData" @saveClick="alertSave('editProp')" @cancClick="changeView('listProp')"></edit-prop-info>
      </div>
      <div v-if="propShow.upload">
        <upload-annex :caseId="caseId" :infoId="uploadPropId" :fileType="['jpg','jpeg','png']" :uploadUrl="uploadUrlA" @saveClick="alertSave('uploadProp')" @cancClick="changeView('listProp')"></upload-annex>
      </div>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div v-if="agenShow.list">
        <div v-if="agenData !== null"  v-for="(item, index) in agenData" :key="index">
          <agen-info :infoData="item" @editInfo="editAgenInfo(item)" @uploadImg="uploadAgenImg" @seeInfo="seeAgenInfo(item)"></agen-info>
        </div>
      </div>
      <div v-if="agenShow.see">
        <see-agen-info :seeAgenData="seeAgenData" @saveClick="alertSave('seeAgen')"></see-agen-info>
      </div>
      <div v-if="agenShow.edit">
        <edit-agen-info :caseId="caseId" :propArrName="propDataName" :editAgenData="editAgenData" @saveClick="alertSave('editAgen')" @cancClick="changeView('listAgen')"></edit-agen-info>
      </div>
      <div v-if="agenShow.upload">
        <upload-annex :caseId="caseId" :infoId="uploadAgenId" :fileType="['jpg','jpeg','png']" :uploadUrl="uploadUrlC" @saveClick="alertSave('uploadAgen')" @cancClick="changeView('listAgen')"></upload-annex>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { resMess } from '@/components/common/mixin.js'
import propInfo from '@/page/caseInfo/children/children/propInfo'
import agenInfo from '@/page/caseInfo/children/children/agenInfo'
import seePropInfo from '@/page/caseInfo/children/children/seePropInfo'
import seeAgenInfo from '@/page/caseInfo/children/children/seeAgenInfo'
import editPropInfo from '@/page/caseInfo/children/children/editPropInfo'
import editAgenInfo from '@/page/caseInfo/children/children/editAgenInfo'
import uploadAnnex from '@/page/caseInfo/children/children/uploadAnnex'
import regi from '@/config/regiType.js'

export default {
  name: 'proposerInfo',
  mixins: [resMess],
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { propInfo, agenInfo, seePropInfo, seeAgenInfo, editPropInfo, editAgenInfo, uploadAnnex },
  data () {
    return {
      propData: null,
      agenData: null,
      seePropData: null,
      seeAgenData: null,
      propShow: {
        list: true,
        see: false,
        edit: false,
        upload: false
      },
      agenShow: {
        list: true,
        see: false,
        edit: false,
        upload: false
      },
      editPropData: {},
      editAgenData: {},
      uploadPropId: null,
      uploadAgenId: null,
      propDataName: []
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resProp()
      }
    }
  },
  computed: {
    resPropUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectById/1'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/1'
      }
    },
    resPropUrlId () {
      let _data = {}
      _data.caseId = this.caseOldId
      _data.id = this.caseId
      return _data
    },
    uploadUrlA () {
      return regi.api + '/party/updatePartyOrFile/1'
    },
    uploadUrlC () {
      return regi.api + '/proxy/updateProxyOrFile'
    }
  },
  methods: {
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
    resProp () {
      axios.post(this.resPropUrl, this.resPropUrlId).then(res => {
        this.propData = res.data.data.propList
        this.agenData = res.data.data.proxyList
        this.resPropArrName()
        this.changeView('createList')
      }).catch(e => {
        this.resMessage('error', '错误信息' + e)
      })
    },
    editPropInfo (_obj) {
      this.editPropData = _obj
      this.changeView('editProp')
    },
    uploadPropImg (id) {
      this.uploadPropId = id
      this.changeView('uploadProp')
    },
    editAgenInfo (_obj) {
      this.editAgenData = _obj
      this.changeView('editAgen')
    },
    uploadAgenImg (id) {
      this.uploadAgenId = id
      this.changeView('uploadAgen')
    },
    changeView (type) {
      switch (type) {
        case 'createList':
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
          break
        case 'listProp':
          if (this.propData !== null) {
            this.propShow.list = true
          } else {
            this.propShow.list = false
          }
          this.propShow.edit = false
          this.propShow.see = false
          this.propShow.upload = false
          break
        case 'seeProp':
          this.propShow.list = false
          this.propShow.see = true
          break
        case 'editProp':
          this.propShow.list = false
          this.propShow.edit = true
          break
        case 'uploadProp':
          this.propShow.list = false
          this.propShow.upload = true
          break
        case 'listAgen':
          if (this.agenData !== null) {
            this.agenShow.list = true
          } else {
            this.agenShow.list = false
          }
          this.agenShow.edit = false
          this.agenShow.see = false
          this.agenShow.upload = false
          break
        case 'seeAgen':
          this.agenShow.list = false
          this.agenShow.see = true
          break
        case 'editAgen':
          this.agenShow.list = false
          this.agenShow.edit = true
          break
        case 'uploadAgen':
          this.agenShow.list = false
          this.agenShow.upload = true
          break
      }
    },
    alertSave (type) {
      switch (type) {
        case 'seeProp':
          this.seePropData = null
          this.propShow.list = true
          this.propShow.see = false
          break
        case 'seeAgen':
          this.seeAgenData = null
          this.agenShow.list = true
          this.agenShow.see = false
          break
        case 'editProp':
        case 'uploadProp':
          this.resProp()
          this.changeView('listProp')
          this.resMessage('success', '修改成功')
          break
        case 'editAgen':
        case 'uploadAgen':
          this.resProp()
          this.changeView('listAgen')
          this.resMessage('success', '修改成功')
          break
      }
    },
    seePropInfo (obj) {
      this.seePropData = obj
      this.propShow.list = false
      this.propShow.see = true
    },
    seeAgenInfo (obj) {
      this.seeAgenData = obj
      this.agenShow.list = false
      this.agenShow.see = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.proposerInfo {
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
