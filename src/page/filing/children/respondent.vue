<template>
  <div class="respondent">
    <div class="_respondent">
      <div class="_top">被申请人</div>
      <div v-if="respShow.list" class="_listResp">
        <div v-if="respData !== null" v-for="(item, index) in respData" :key="index">
          <prop-info :infoData="item" @editInfo="editRespInfo(item)" @uploadImg="uploadRespImg" @delInfo="delRespInfo" @delImg="delRespImg"></prop-info>
        </div>
      </div>
      <div v-if="respShow.add">
        <add-prop-info :addType="2" :caseId="caseId" @saveClick="addRespSave" @cancClick="changeView('listResp')"></add-prop-info>
      </div>
      <div v-if="respShow.edit">
        <edit-prop-info :caseId="caseId" :editPropData="editRespData" @saveClick="editRespSave" @cancClick="changeView('listResp')"></edit-prop-info>
      </div>
      <div v-if="respShow.upload">
        <upload-prop :caseId="caseId"></upload-prop>
      </div>
      <add-icon v-if="respShow.addBtn" :imgStatus="1" addText="添加被申请人" @addClick="changeView('addResp')"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import addIcon from '@/components/common/addIcon'
import propInfo from '@/page/filing/children/children/propInfo'
import addPropInfo from '@/page/filing/children/children/addPropInfo'
import editPropInfo from '@/page/filing/children/children/editPropInfo'
import uploadProp from '@/page/filing/children/children/uploadProp'

export default {
  name: 'respondent',
  props: [],
  components: { addIcon, propInfo, addPropInfo, editPropInfo, uploadProp },
  data () {
    return {
      respShow: {
        list: false,
        add: false,
        edit: false,
        upload: false,
        addBtn: true
      },
      respData: [],
      editRespData: {}
    }
  },
  created () {
    if (this.caseInfo !== null) {
      this.respData = this.caseInfo.respList
      this.createList()
    }
  },
  computed: {
    ...mapGetters([
      'caseId',
      'caseInfo'
    ])
  },
  methods: {
    ...mapActions([
      'setFiling'
    ]),
    addRespSave (_obj) {
      this.respData.push(_obj)
      this.setFiling({type: 'respList', data: this.respData})
      this.changeView('listResp')
    },
    editRespInfo (_obj) {
      this.editRespData = _obj
      this.changeView('editResp')
    },
    editRespSave (_obj) {
      for (let k in this.respData) {
        if (this.respData[k].id === _obj.id) {
          this.respData[k] = JSON.parse(JSON.stringify(_obj))
          this.setFiling({type: 'respList', data: this.respData})
          this.changeView('listResp')
          return
        }
      }
    },
    uploadRespImg (id) {
      console.log(id)
    },
    delRespInfo (id) {
      console.log(id)
    },
    delRespImg (_obj) {
      console.log(_obj)
    },
    createList () {
      if (this.respData.length === 0) {
        this.respShow.list = false
      } else {
        this.respShow.list = true
      }
    },
    changeView (type) {
      if (type === 'listResp') {
        if (this.respData.length === 0) {
          this.respShow.list = false
        } else {
          this.respShow.list = true
        }
        this.respShow.add = false
        this.respShow.edit = false
        this.respShow.upload = false
        this.respShow.addBtn = true
      } else if (type === 'addResp') {
        this.respShow.list = false
        this.respShow.add = true
        this.respShow.addBtn = false
      } else if (type === 'editResp') {
        this.respShow.list = false
        this.respShow.edit = true
        this.respShow.addBtn = false
      } else if (type === 'uploadResp') {
        this.respShow.list = false
        this.respShow.upload = true
        this.respShow.addBtn = false
      }
    }
  },
  watch: {
    caseInfo: function (val) {
      this.respData = val.respList
      this.createList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.respondent {
  width: 83%;
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
