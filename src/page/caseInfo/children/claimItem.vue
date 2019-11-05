<template>
  <div class="claimInfo">
    <div class="_claim">
      <div class="_top">仲裁请求</div>
        <div v-if="claimShow.list && claimData !== null" v-for="(item, index) in claimData" :key="index">
          <claim-info :infoData="item" :propArrName="propDataName" @editInfo="editClaiInfo(item)"></claim-info>
        </div>
      <div v-if="claimShow.edit">
        <edit-claim-info :caseId="caseId" :propArrName="propDataName" :editClaiData="editClaiData" @saveClick="alertSave('editClaim')" @cancClick="changeView('listClaim')"></edit-claim-info>
      </div>
    </div>
    <div class="_reason">
      <div class="_top">事实与理由</div>
      <div v-if="reasShow.list && reasData !== null">
        <reas-info :infoData="reasData" @editInfo="changeView('editReas')"></reas-info>
      </div>
      <div v-if="reasShow.edit">
        <edit-reas-info :caseId="caseId" :editReasData="reasData" @saveClick="alertSave('editReas')" @cancClick="changeView('listReas')"></edit-reas-info>
      </div>
    </div>
    <div class="_applicationBook">
      <div class="_top">仲裁申请书</div>
      <div v-if="applShow.list && applData !== null">
        <appl-info :infoData="applData" @editInfo="changeView('editAppl')"></appl-info>
      </div>
      <div v-if="applShow.edit">
        <upload-appl-book :caseId="caseId" :fileType="['pdf']" :uploadUrl="uploadUrl" @saveClick="alertSave('editAppl')" @cancClick="changeView('listAppl')"></upload-appl-book>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { resMess } from '@/components/common/mixin.js'
import claimInfo from '@/page/caseInfo/children/children/claimInfo'
import editClaimInfo from '@/page/caseInfo/children/children/editClaimInfo'
import reasInfo from '@/page/caseInfo/children/children/reasInfo'
import editReasInfo from '@/page/caseInfo/children/children/editReasInfo'
import applInfo from '@/page/caseInfo/children/children/applInfo'
import uploadApplBook from '@/page/caseInfo/children/children/uploadApplBook'
import regi from '@/config/regiType.js'

export default {
  name: 'claimItem',
  mixins: [resMess],
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { claimInfo, editClaimInfo, reasInfo, editReasInfo, applInfo, uploadApplBook },
  data () {
    return {
      claimShow: {
        list: false,
        edit: false
      },
      reasShow: {
        list: false,
        edit: false
      },
      applShow: {
        list: false,
        edit: false
      },
      propData: [],
      claimData: null,
      editClaiData: {},
      reasData: null,
      applData: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resProp()
        this.resClaim()
      }
    }
  },
  computed: {
    uploadUrl () {
      return regi.api + '/case/updateRequestOrFact/3'
    },
    resPropUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectById/1'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/1'
      }
    },
    resClaimUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectById/3'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/3'
      }
    },
    resUrlId () {
      let _data = {}
      _data.caseId = this.caseOldId
      _data.id = this.caseId
      return _data
    },
    propDataName () {
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
      return _nameArr
    }
  },
  methods: {
    resProp () {
      axios.post(this.resPropUrl, this.resUrlId).then(res => {
        this.propData = res.data.data.propList
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e)
      })
    },
    resClaim () {
      axios.post(this.resClaimUrl, this.resUrlId).then(res => {
        this.claimData = res.data.data.requestList
        this.reasData = res.data.data.requestReasons
        this.applData = res.data.data.arbRequisitionFile
        this.changeView('createList')
      }).catch(e => {
        this.resMessage('error', '错误信息:' + e)
      })
    },
    editClaiInfo (_obj) {
      this.editClaiData = _obj
      this.changeView('editClaim')
    },
    changeView (type) {
      switch (type) {
        case 'createList':
          if (this.claimData.length === 0) {
            this.claimShow.list = false
          } else {
            this.claimShow.list = true
          }
          if (this.reasData !== null) {
            this.reasShow.list = true
          } else {
            this.reasShow.list = false
          }
          if (this.applData !== null) {
            this.applShow.list = true
          } else {
            this.applShow.list = false
          }
          break
        case 'listClaim':
          if (this.claimData.length === 0) {
            this.claimShow.list = false
          } else {
            this.claimShow.list = true
          }
          this.claimShow.edit = false
          break
        case 'editClaim':
          this.claimShow.list = false
          this.claimShow.edit = true
          break
        case 'listReas':
          if (this.reasData !== null) {
            this.reasShow.list = true
          } else {
            this.reasShow.list = false
          }
          this.reasShow.edit = false
          break
        case 'editReas':
          this.reasShow.list = false
          this.reasShow.edit = true
          break
        case 'listAppl':
          if (this.applData !== null) {
            this.applShow.list = true
          } else {
            this.applShow.list = false
          }
          this.applShow.edit = false
          break
        case 'editAppl':
          this.applShow.list = false
          this.applShow.edit = true
          break
      }
    },
    alertSave (type) {
      switch (type) {
        case 'editClaim':
          this.resClaim()
          this.changeView('listClaim')
          this.resMessage('success', '修改成功')
          break
        case 'editReas':
          this.resClaim()
          this.changeView('listReas')
          this.resMessage('success', '修改成功')
          break
        case 'editAppl':
          this.resClaim()
          this.changeView('listAppl')
          this.resMessage('success', '修改成功')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.claimInfo {
  ._reason, ._applicationBook {
    padding-top: 60px;
  }
  ._applicationBook {
    padding-bottom: 60px;
  }
  ._claim ._top, ._reason ._top, ._applicationBook ._top{
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
