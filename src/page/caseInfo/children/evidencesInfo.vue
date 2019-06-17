<template>
  <div class="evidencesInfo">
    <div class="_evidences">
      <div class="_top">申请人证据</div>
      <div v-if="evidObj.list">
        <div v-if="evidData !== null" v-for="(item, index) in evidData" :key="index">
          <evid-info :infoData="item"></evid-info>
        </div>
      </div>
      <div v-if="evidObj.add">
        <add-evid-info :caseId="caseId" :caseOldId="caseOldId" :partieType="partieType" :fileType="['jpg','jpeg','png','pdf']" :uploadUrl="uploadUrl" :uploadFileUrl="uploadFileUrl" @saveClick="addEvidSave" @cancClick="changeView('listEvid')"></add-evid-info>
      </div>
      <div v-if="partieType === 1 && myCaseCrossE === 1">
        <add-icon v-if="evidObj.addBtn" :imgStatus="2" addText="添加证据" @addClick="changeView('addEvid')"></add-icon>
      </div>
    </div>
    <div class="_revEvidences">
      <div class="_top">被申请人证据</div>
      <div v-if="revEvidObj.list">
        <div v-if="revEvidData !== null" v-for="(item, index) in revEvidData" :key="index">
          <evid-info :infoData="item"></evid-info>
        </div>
      </div>
      <div v-if="revEvidObj.add">
        <add-evid-info :caseId="caseId" :caseOldId="caseOldId" :partieType="partieType" :fileType="['jpg','jpeg','png','pdf']" :uploadUrl="uploadUrl" :uploadFileUrl="uploadFileUrl" @saveClick="addRevEvidSave" @cancClick="changeView('listRevEvid')"></add-evid-info>
      </div>
      <div v-if="partieType === 2 && myCaseCrossE === 1">
        <add-icon v-if="revEvidObj.addBtn" :imgStatus="2" addText="添加证据" @addClick="changeView('addRevEvid')"></add-icon>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'
import evidInfo from '@/page/caseInfo/children/children/evidInfo'
import addEvidInfo from '@/page/caseInfo/children/children/addEvidInfo'
import regi from '@/config/regiType.js'

export default {
  name: 'evidencesInfo',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { addIcon, evidInfo, addEvidInfo },
  data () {
    return {
      evidObj: {
        list: false,
        add: false,
        addBtn: true
      },
      revEvidObj: {
        list: false,
        add: false,
        addBtn: true
      },
      evidData: null,
      revEvidData: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resEvid()
        this.resRevEvid()
      }
    }
  },
  computed: {
    ...mapGetters([
      'myCaseCrossE'
    ]),
    uploadUrl () {
      return '/case/supplyEvidence'
    },
    uploadFileUrl () {
      return regi.api + '/file/upload'
    },
    resEvidUrl () {
      if (this.partieType === 1) {
        return '/case/selectObjectByCaseId/4'
      } else if (this.partieType === 2) {
        return '/case/selectObjectById/4'
      }
    },
    resEvidUrlId () {
      if (this.partieType === 1) {
        let _data = {}
        _data.caseId = this.caseOldId
        _data.id = this.caseId
        return _data
      } else if (this.partieType === 2) {
        let _data = {}
        _data.id = this.caseId
        _data.oldId = this.caseOldId
        return _data
      }
    }
  },
  methods: {
    resEvid () {
      axios.post(this.resEvidUrl, this.resEvidUrlId).then(res => {
        this.evidData = res.data.data.evidenceList
        if (this.evidData !== null) {
          if (this.evidData.length === 0) {
            this.evidObj.list = false
          } else {
            this.evidObj.list = true
          }
        } else {
          this.evidObj.list = false
        }
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resRevEvid () {
      axios.post('/case/queryRespEvidence', {
        id: this.caseId,
        oldId: this.caseOldId
      }).then(res => {
        this.revEvidData = res.data.data
        if (this.revEvidData !== null) {
          if (this.revEvidData.length === 0) {
            this.revEvidObj.list = false
          } else {
            this.revEvidObj.list = true
          }
        } else {
          this.revEvidObj.list = false
        }
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    addEvidSave () {
      this.resEvid()
      this.changeView('listEvid')
      this.$Message.success({
        content: '添加成功',
        duration: 2
      })
    },
    addRevEvidSave () {
      this.resRevEvid()
      this.changeView('listRevEvid')
      this.$Message.success({
        content: '添加成功',
        duration: 2
      })
    },
    changeView (type) {
      if (type === 'addEvid') {
        this.evidObj.list = false
        this.evidObj.add = true
        this.evidObj.addBtn = false
      } else if (type === 'listEvid') {
        this.evidObj.list = true
        this.evidObj.add = false
        this.evidObj.addBtn = true
      } else if (type === 'addRevEvid') {
        this.revEvidObj.list = false
        this.revEvidObj.add = true
        this.revEvidObj.addBtn = false
      } else if (type === 'listRevEvid') {
        this.revEvidObj.list = true
        this.revEvidObj.add = false
        this.revEvidObj.addBtn = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.evidencesInfo {
  ._evidences {
    padding-bottom: 60px;
  }
  ._revEvidences {
    padding-bottom: 60px;
  }
  ._evidences ._top, ._revEvidences ._top{
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
