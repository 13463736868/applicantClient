<template>
  <div class="claimItems">
    <div class="_claim">
      <div class="_top">仲裁请求</div>
      <div v-if="claimShow.caption" class="_caption">
        <p>1：仲裁申请应分项填写，多个仲裁请求的请点击增加请求按钮，按提示分别填写各项仲裁。</p>
        <p>2：请尽量明确各项仲裁请求的金额，若请求金额需计算至不特定期间（如暂计至清偿之日），请明确计算方式，并明确暂计至申请之日的具体金额。</p>
        <p>3：申请人需预缴仲裁费，若请求仲裁费由被申请人承担，请在仲裁请求中明确。</p>
        <p>4：多个被申请人的，若各申请项针对不同被申请人，请予以明确。</p>
      </div>
      <div v-if="claimShow.list" class="listClaim">
        <div v-if="claimData !== null" v-for="(item, index) in claimData" :key="index">
          <claim-info :infoData="item" :propArrName="propDataName" @editInfo="editClaiInfo(item)" @delInfo="delClaiInfo"></claim-info>
        </div>
      </div>
      <div v-if="claimShow.add">
        <add-claim-info :caseId="caseId" :propArrName="propDataName" @saveClick="addClaiSave" @cancClick="changeView('listClaim')"></add-claim-info>
      </div>
      <div v-if="claimShow.edit">
        <edit-claim-info :caseId="caseId" :propArrName="propDataName" :editClaiData="editClaiData" @saveClick="editClaiSave" @cancClick="changeView('listClaim')"></edit-claim-info>
      </div>
      <add-icon v-if="claimShow.addBtn" :imgStatus="2" addText="添加仲裁请求" @addClick="changeView('addClaim')"></add-icon>
    </div>
    <div class="_reason">
      <div class="_top">事实与理由</div>
      <div v-if="reasShow.list">
        <reas-info :infoData="reasData" @editInfo="changeView('editReas')"></reas-info>
      </div>
      <div v-if="reasShow.add">
        <add-reas-info :caseId="caseId" @saveClick="updateReasSave" @cancClick="changeView('listReas')"></add-reas-info>
      </div>
      <div v-if="reasShow.edit">
        <edit-reas-info :caseId="caseId" :editReasData="reasData" @saveClick="updateReasSave" @cancClick="changeView('listReas')"></edit-reas-info>
      </div>
      <add-icon v-if="reasShowBtn" :imgStatus="2" addText="添加事实与理由" @addClick="changeView('addReas')"></add-icon>
    </div>
    <div class="_applicationBook">
      <div class="_top">仲裁申请书</div>
      <add-icon v-if="applShowBtn" :imgStatus="3" addText="上传申请书" @addClick="addAppl"></add-icon>
    </div>
    <alert-tip :alertShow="alertShowClai" @alertCancel="delClaiCanc" @alertConfirm="delClaiSave" alertTitle="提示" alertText="确定要删除这条记录吗？">
    </alert-tip>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import alertTip from '@/components/common/alertTip'
import addIcon from '@/components/common/addIcon'
import claimInfo from '@/page/filing/children/children/claimInfo'
import addClaimInfo from '@/page/filing/children/children/addClaimInfo'
import editClaimInfo from '@/page/filing/children/children/editClaimInfo'
import reasInfo from '@/page/filing/children/children/reasInfo'
import addReasInfo from '@/page/filing/children/children/addReasInfo'
import editReasInfo from '@/page/filing/children/children/editReasInfo'

export default {
  name: 'claimItems',
  props: [],
  components: { alertTip, addIcon, claimInfo, addClaimInfo, editClaimInfo, reasInfo, addReasInfo, editReasInfo },
  data () {
    return {
      alertShowClai: false,
      claimShow: {
        list: false,
        add: false,
        edit: false,
        addBtn: true,
        caption: true
      },
      reasShow: {
        list: false,
        add: false,
        edit: false,
        addBtn: true
      },
      applShow: {
        list: false,
        add: false,
        addBtn: true
      },
      propData: [],
      claimData: [],
      editClaiData: {},
      delClaiId: null,
      reasData: null,
      applData: {}
    }
  },
  created () {
    if (this.caseInfo !== null) {
      this.propData = this.caseInfo.propList
      this.claimData = this.caseInfo.requestList
      this.reasData = this.caseInfo.requestReasons
      this.applData = this.caseInfo.arbRequisitionFile
      this.createList()
    }
  },
  computed: {
    ...mapGetters([
      'caseId',
      'caseInfo'
    ]),
    reasShowBtn () {
      if (this.reasShow.list === true || this.reasShow.add === true || this.reasShow.edit === true) {
        return false
      } else {
        return true
      }
    },
    applShowBtn () {
      if (this.applShow.list === true || this.applShow.add === true) {
        return false
      } else {
        return true
      }
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
    ...mapActions([
      'setFiling'
    ]),
    addClaiSave (_obj) {
      this.claimData.push(_obj)
      this.setFiling({type: 'requestList', data: this.claimData})
      this.changeView('listClaim')
    },
    editClaiInfo (_obj) {
      this.editClaiData = _obj
      this.changeView('editClaim')
    },
    editClaiSave (_obj) {
      for (let k in this.claimData) {
        if (this.claimData[k].id === _obj.id) {
          this.claimData[k] = JSON.parse(JSON.stringify(_obj))
          this.setFiling({type: 'requestList', data: this.claimData})
          this.changeView('listClaim')
          return
        }
      }
    },
    delClaiInfo (id) {
      this.alertShowClai = true
      this.delClaiId = id
    },
    delClaiSave () {
      axios.post('/case/requestDelete', {
        caseId: this.caseId,
        id: this.delClaiId
      }).then(res => {
        for (let k in this.claimData) {
          if (this.claimData[k].id === this.delClaiId) {
            this.claimData.splice(k, 1)
            this.setFiling({type: 'requestList', data: this.claimData})
            this.alertShowClai = false
            return
          }
        }
      }).catch(e => {
        console.log(e)
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    delClaiCanc () {
      this.alertShowClai = false
      this.delClaiId = null
    },
    updateReasSave (_obj) {
      this.reasData = JSON.parse(JSON.stringify(_obj))
      this.setFiling({type: 'requestReasons', data: this.reasData})
      this.changeView('listReas')
    },
    addAppl () {
      console.log('上传申请书')
    },
    createList () {
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
    },
    changeView (type) {
      if (type === 'listClaim') {
        if (this.claimData.length === 0) {
          this.claimShow.list = false
        } else {
          this.claimShow.list = true
        }
        this.claimShow.add = false
        this.claimShow.edit = false
        this.claimShow.addBtn = true
        this.claimShow.caption = true
      } else if (type === 'addClaim') {
        this.claimShow.list = false
        this.claimShow.add = true
        this.claimShow.addBtn = false
        this.claimShow.caption = false
      } else if (type === 'editClaim') {
        this.claimShow.list = false
        this.claimShow.edit = true
        this.claimShow.addBtn = false
        this.claimShow.caption = false
      } else if (type === 'listReas') {
        if (this.reasData !== null) {
          this.reasShow.list = true
        } else {
          this.reasShow.list = false
        }
        this.reasShow.add = false
        this.reasShow.edit = false
        this.reasShow.addBtn = false
      } else if (type === 'addReas') {
        this.reasShow.list = false
        this.reasShow.add = true
        this.reasShow.addBtn = false
      } else if (type === 'editReas') {
        this.reasShow.list = false
        this.reasShow.edit = true
        this.reasShow.addBtn = false
      }
    }
  },
  watch: {
    caseInfo: function (val) {
      this.propData = val.propList
      this.claimData = val.requestList
      this.reasData = val.requestReasons
      this.applData = val.arbRequisitionFile
      this.createList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.claimItems {
  width: 83%;
  ._reason, ._applicationBook {
    padding-top: 60px;
  }
  ._applicationBook {
    padding-bottom: 60px;
  }
  ._claim ._top, ._reason ._top, ._applicationBook ._top {
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._caption {
    color: #999;
    padding-top: 15px;
    padding-bottom: 5px;
    p {
      padding: 5px 0;
    }
  }
}
</style>
