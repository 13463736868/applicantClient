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
        <edit-prop-info :caseId="caseId" :editPropData="editPropData" @saveClick="editPropSave" @cancClick="changeView('listProp')"></edit-prop-info>
      </div>
      <div v-if="propShow.upload">
        <upload-prop :caseId="caseId"></upload-prop>
      </div>
      <add-icon v-if="propShow.addBtn" :imgStatus="1" addText="添加申请人" @addClick="changeView('addProp')"></add-icon>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div v-if="agenShow.list" class="_listAgen">
        <div v-if="agenData !== null" v-for="(item, index) in agenData" :key="index">
          <prop-info :infoData="item" @editInfo="editAgenInfo(item)" @uploadImg="uploadAgenImg" @delInfo="delAgenInfo" @delImg="delAgenImg"></prop-info>
        </div>
      </div>
      <div v-if="agenShow.add">
        <add-agen-info :caseId="caseId" :propArrName="propDataName" @saveClick="addAgenSave" @cancClick="changeView('listAgen')"></add-agen-info>
      </div>
      <div v-if="agenShow.edit">
        <edit-agen-info :caseId="caseId" :propArrName="propDataName" :editAgenData="editAgenData" @saveClick="editAgenSave" @cancClick="changeView('listAgen')"></edit-agen-info>
      </div>
      <add-icon v-if="agenShow.addBtn" :imgStatus="1" addText="添加代理人" @addClick="changeView('addAgen')"></add-icon>
    </div>
    <alert-tip :alertShow="alertShowProp" @alertCancel="delPropCanc" @alertConfirm="delPropSave" alertTitle="提示" alertText="确定要删除这条记录吗？">
    </alert-tip>
    <alert-tip :alertShow="alertShowAgen" @alertCancel="delAgenCanc" @alertConfirm="delAgenSave" alertTitle="提示" alertText="确定要删除这条记录吗？">
    </alert-tip>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import alertTip from '@/components/common/alertTip'
import addIcon from '@/components/common/addIcon'
import propInfo from '@/page/filing/children/children/propInfo'
import addPropInfo from '@/page/filing/children/children/addPropInfo'
import editPropInfo from '@/page/filing/children/children/editPropInfo'
import uploadProp from '@/page/filing/children/children/uploadProp'
import addAgenInfo from '@/page/filing/children/children/addAgenInfo'
import editAgenInfo from '@/page/filing/children/children/editAgenInfo'

export default {
  name: 'proposer',
  props: [],
  components: { alertTip, addIcon, propInfo, addPropInfo, editPropInfo, uploadProp, addAgenInfo, editAgenInfo },
  data () {
    return {
      alertShowProp: false,
      alertShowAgen: false,
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
      delAgenId: null
    }
  },
  created () {
    if (this.caseInfo !== null) {
      this.propData = this.caseInfo.propList
      this.agenData = this.caseInfo.proxyList
      this.createList()
    }
  },
  computed: {
    ...mapGetters([
      'caseId',
      'caseInfo'
    ]),
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
    addPropSave (_obj) {
      this.propData.push(_obj)
      this.setFiling({type: 'propList', data: this.propData})
      this.changeView('listProp')
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
          this.changeView('listProp')
          return
        }
      }
    },
    uploadPropImg (id) {
      console.log(id)
      this.changeView('uploadProp')
    },
    delPropInfo (id) {
      this.alertShowProp = true
      this.delPropId = id
    },
    delPropSave () {
      // console.log(ajax_del)
      for (let k in this.propData) {
        if (this.propData[k].id === this.delPropId) {
          this.propData.splice(k, 1)
          this.setFiling({type: 'propList', data: this.propData})
          this.alertShowProp = false
          return
        }
      }
    },
    delPropCanc () {
      this.alertShowProp = false
      this.delPropId = null
    },
    delPropImg (_obj) {
      console.log(_obj)
    },
    addAgenSave (_obj) {
      this.agenData.push(_obj)
      this.setFiling({type: 'proxyList', data: this.agenData})
      this.changeView('listAgen')
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
          return
        }
      }
    },
    uploadAgenImg (id) {
      console.log(id)
    },
    delAgenInfo (id) {
      this.alertShowAgen = true
      this.delAgenId = id
    },
    delAgenSave () {
      // console.log(ajax_del)
      for (let k in this.agenData) {
        if (this.agenData[k].id === this.delAgenId) {
          this.agenData.splice(k, 1)
          this.setFiling({type: 'proxyList', data: this.agenData})
          this.alertShowAgen = false
          return
        }
      }
    },
    delAgenCanc () {
      this.alertShowAgen = false
      this.delAgenId = null
    },
    delAgenImg (_obj) {
      console.log(_obj)
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
      this.propData = val.propList
      this.agenData = this.caseInfo.proxyList
      this.createList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.proposer {
  width: 83%;
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
