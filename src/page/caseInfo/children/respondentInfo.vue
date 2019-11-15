<template>
  <div class="respondentInfo">
    <div class="_respondent">
      <div class="_top">被申请人</div>
      <div v-if="respShow.list">
        <div v-if="respData !== null" v-for="(item, index) in respData" :key="index">
          <prop-info :infoData="item" @editInfo="editRespInfo(item)" @uploadImg="uploadRespImg" @seeInfo="seeRespInfo(item)"></prop-info>
        </div>
      </div>
      <div v-if="respShow.see">
        <see-prop-info :seePropData="seeRespData" @saveClick="alertSave('seeResp')"></see-prop-info>
      </div>
      <div v-if="respShow.edit">
        <edit-prop-info :editType="2" :caseId="caseId" :editPropData="editRespData" @saveClick="alertSave('editResp')" @cancClick="changeView('listResp')"></edit-prop-info>
      </div>
      <div v-if="respShow.upload">
        <upload-annex :caseId="caseId" :infoId="uploadRespId" :fileType="['jpg','jpeg','png']" :uploadUrl="uploadUrlB" @saveClick="alertSave('uploadResp')" @cancClick="changeView('listResp')"></upload-annex>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { resMess } from '@/components/common/mixin.js'
import propInfo from '@/page/caseInfo/children/children/propInfo'
import seePropInfo from '@/page/caseInfo/children/children/seePropInfo'
import editPropInfo from '@/page/caseInfo/children/children/editPropInfo'
import uploadAnnex from '@/page/caseInfo/children/children/uploadAnnex'
import regi from '@/config/regiType.js'

export default {
  name: 'respondentInfo',
  mixins: [resMess],
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { propInfo, seePropInfo, editPropInfo, uploadAnnex },
  data () {
    return {
      respData: null,
      seeRespData: null,
      respShow: {
        list: true,
        see: false,
        edit: false,
        upload: false
      },
      editRespData: {},
      uploadRespId: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resResp()
      }
    }
  },
  computed: {
    resRespUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectById/2'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/2'
      }
    },
    resRespUrlId () {
      let _data = {}
      _data.caseId = this.caseOldId
      _data.id = this.caseId
      return _data
    },
    uploadUrlB () {
      return regi.api + '/party/updatePartyOrFile/2'
    }
  },
  methods: {
    resResp () {
      axios.post(this.resRespUrl, this.resRespUrlId).then(res => {
        this.respData = res.data.data.respList
        this.changeView('createList')
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e)
      })
    },
    seeRespInfo (obj) {
      this.seeRespData = obj
      this.changeView('seeResp')
      this.respShow.list = false
      this.respShow.see = true
    },
    editRespInfo (_obj) {
      this.editRespData = _obj
      this.changeView('editResp')
    },
    uploadRespImg (id) {
      this.uploadRespId = id
      this.changeView('uploadResp')
    },
    changeView (type) {
      switch (type) {
        case 'createList':
          if (this.respData.length === 0) {
            this.respShow.list = false
          } else {
            this.respShow.list = true
          }
          break
        case 'listResp':
          if (this.respData !== null) {
            this.respShow.list = true
          } else {
            this.respShow.list = false
          }
          this.respShow.edit = false
          this.respShow.see = false
          this.respShow.upload = false
          break
        case 'seeResp':
          this.respShow.list = false
          this.respShow.see = true
          break
        case 'editResp':
          this.respShow.list = false
          this.respShow.edit = true
          break
        case 'uploadResp':
          this.respShow.list = false
          this.respShow.upload = true
          break
      }
    },
    alertSave (type) {
      switch (type) {
        case 'seeResp':
          this.seeRespData = null
          this.respShow.list = true
          this.respShow.see = false
          break
        case 'editResp':
        case 'uploadResp':
          this.resResp()
          this.changeView('listResp')
          this.resMessage('success', '修改成功')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.respondentInfo {
  ._respondent {
    padding-bottom: 60px;
  }
  ._respondent ._top{
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
