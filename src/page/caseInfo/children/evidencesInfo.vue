<template>
  <div class="evidencesInfo">
    <div class="_evidences">
      <div class="_top">申请人证据</div>
      <div v-if="evidObj.list">
        <div v-if="evidData !== null" v-for="(item, index) in evidData" :key="index">
          <evid-info :caseLineType="caseLineType" :infoData="item"></evid-info>
        </div>
      </div>
      <div v-if="evidObj.add">
        <add-evid-info :caseId="caseId" :caseOldId="caseOldId" :partieType="partieType" :fileType="['jpg','jpeg','png','pdf']" :uploadUrl="uploadUrl" :uploadFileUrl="uploadFileUrl" @saveClick="actionSave('addEvidSave')" @cancClick="changeView('listEvid')"></add-evid-info>
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
        <add-evid-info :caseId="caseId" :caseOldId="caseOldId" :partieType="partieType" :fileType="['jpg','jpeg','png','pdf']" :uploadUrl="uploadUrl" :uploadFileUrl="uploadFileUrl" @saveClick="actionSave('addRevEvidSave')" @cancClick="changeView('listRevEvid')"></add-evid-info>
      </div>
      <div v-if="partieType === 2 && myCaseCrossE === 1">
        <add-icon v-if="revEvidObj.addBtn" :imgStatus="2" addText="添加证据" @addClick="changeView('addRevEvid')"></add-icon>
      </div>
    </div>
    <div class="_question">
      <div class="_top">问题清单</div>
      <div v-if="questionObj.list">
        <div v-for="(item, index) in questionData" :key="index">
          <question-info :infoData="item"></question-info>
        </div>
      </div>
      <template v-if="stateList.indexOf(caseState) !== -1 && myCaseCrossE === 1">
        <div v-if="questionObj.add">
          <add-ques-info :caseId="caseId" :caseOldId="caseOldId" :partieType="partieType" :fileType="['pdf']" :uploadUrl="uploadUrlQues" :uploadFileUrl="uploadFileUrlQues" @saveClick="actionSave('addQuesSave')" @cancClick="changeView('listQues')"></add-ques-info>
        </div>
        <div>
          <add-icon v-if="questionObj.addBtn" :imgStatus="2" addText="上传问题清单" @addClick="changeView('addQues')"></add-icon>
        </div>
      </template>
    </div>
    <div class="_defence">
      <div class="_top">答辩</div>
      <div v-if="defenceObj.list">
        <div v-for="(item, index) in dataList" :key="index">
          <defence-info v-if="item.replyOpinion !== null" :infoData="item" :seeType="1"></defence-info>
        </div>
      </div>
      <template>
        <div v-if="defenceObj.add">
          <add-defence-info :caseId="caseId" :partieType="partieType" :addType="1" @saveClick="actionSave('addDefenSave')" @cancClick="changeView('defenceObj')"></add-defence-info>
        </div>
        <div v-if="myCaseCrossE === 1">
          <add-icon v-if="defenceObj.addBtn" :imgStatus="2" addText="添加答辩" @addClick="changeView('addDefen')"></add-icon>
        </div>
      </template>
    </div>
    <div class="_defence">
      <div class="_top">最后陈述</div>
      <div v-if="descrObj.list">
        <div v-for="(item, index) in dataList" :key="index">
          <defence-info v-if="item.finalStatement !== null" :infoData="item"  :seeType="3"></defence-info>
        </div>
      </div>
      <template>
        <div v-if="descrObj.add">
          <add-defence-info :caseId="caseId" :partieType="partieType" :addType="3" @saveClick="actionSave('addDescrSave')" @cancClick="changeView('descrObj')"></add-defence-info>
        </div>
        <div v-if="myCaseCrossE === 1">
          <add-icon v-if="descrObj.addBtn" :imgStatus="2" addText="最后陈述" @addClick="changeView('addDescr')"></add-icon>
        </div>
      </template>
    </div>
    <div class="_defence">
      <div class="_top">调解与和解</div>
      <div v-if="mediateObj.list">
        <div v-for="(item, index) in dataList" :key="index">
          <defence-info v-if="item.mediateCompromise !== null" :infoData="item" :seeType="2"></defence-info>
        </div>
      </div>
      <template>
        <div v-if="mediateObj.add">
          <add-defence-info :caseId="caseId" :partieType="partieType" :addType="2" @saveClick="actionSave('addMediateSave')" @cancClick="changeView('mediateObj')"></add-defence-info>
        </div>
        <div v-if="myCaseCrossE === 1">
          <add-icon v-if="mediateObj.addBtn" :imgStatus="2" addText="调解与和解" @addClick="changeView('addMediate')"></add-icon>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'
import evidInfo from '@/page/caseInfo/children/children/evidInfo'
import addEvidInfo from '@/page/caseInfo/children/children/addEvidInfo'
import questionInfo from '@/page/caseInfo/children/children/questionInfo'
import addQuesInfo from '@/page/caseInfo/children/children/addQuesInfo'
import defenceInfo from '@/page/caseInfo/children/children/defenceInfo'
import addDefenceInfo from '@/page/caseInfo/children/children/addDefenceInfo'
import regi from '@/config/regiType.js'

export default {
  name: 'evidencesInfo',
  props: ['caseLineType', 'caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { addIcon, evidInfo, addEvidInfo, questionInfo, addQuesInfo, defenceInfo, addDefenceInfo },
  data () {
    return {
      stateList: [4, 5, '4', '5'],
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
      questionObj: {
        list: false,
        add: false,
        addBtn: true
      },
      defenceObj: {
        list: false,
        add: false,
        addBtn: true
      },
      descrObj: {
        list: false,
        add: false,
        addBtn: true
      },
      mediateObj: {
        list: false,
        add: false,
        addBtn: true
      },
      evidData: null,
      revEvidData: null,
      questionData: null,
      dataList: null
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      if (this.partieType !== null) {
        this.resEvid()
        this.resRevEvid()
        this.resDefence(0)
        if (regi.type === 'ZhongWei' || regi.type === 'HeFei' || regi.type === 'ChiFeng') {
          this.resQuestion()
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'myCaseCrossE'
    ]),
    uploadUrlQues () {
      return '/case/uploadQuestionList'
    },
    uploadFileUrlQues () {
      return regi.api + '/case/uploadQuestionList'
    },
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
        _data.caseLineType = this.caseLineType
        return _data
      } else if (this.partieType === 2) {
        let _data = {}
        _data.id = this.caseId
        _data.caseLineType = this.caseLineType
        return _data
      }
    }
  },
  methods: {
    resDefence () {
      axios.post('/case/queryOpinion', {
        caseId: this.caseId
      }).then(res => {
        this.dataList = res.data.data
        if (this.dataList !== null) {
          if (this.dataList.length === 0) {
            this.defenceObj.list = false
            this.descrObj.list = false
            this.mediateObj.list = false
          } else {
            this.defenceObj.list = true
            this.descrObj.list = true
            this.mediateObj.list = true
          }
        } else {
          this.defenceObj.list = false
          this.descrObj.list = false
          this.mediateObj.list = false
        }
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resQuestion () {
      axios.post('/case/findCaseQusetionList', {
        caseId: this.caseId
      }).then(res => {
        this.questionData = res.data.data
        if (this.questionData !== null) {
          if (this.questionData.length === 0) {
            this.questionObj.list = false
          } else {
            this.questionObj.list = true
          }
        } else {
          this.questionObj.list = false
        }
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
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
        caseLineType: this.caseLineType
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
    actionSave (type) {
      switch (type) {
        case 'addEvidSave':
          this.resEvid()
          this.changeView('listEvid')
          this.$Message.success({
            content: '添加成功',
            duration: 2
          })
          break
        case 'addRevEvidSave':
          this.resRevEvid()
          this.changeView('listRevEvid')
          this.$Message.success({
            content: '添加成功',
            duration: 2
          })
          break
        case 'addQuesSave':
          this.resQuestion()
          this.changeView('listQues')
          this.$Message.success({
            content: '添加成功',
            duration: 2
          })
          break
        case 'addDefenSave':
          this.resDefence()
          this.changeView('defenceObj')
          this.$Message.success({
            content: '添加成功',
            duration: 2
          })
          break
        case 'addDescrSave':
          this.resDefence()
          this.changeView('descrObj')
          this.$Message.success({
            content: '添加成功',
            duration: 2
          })
          break
        case 'addMediateSave':
          this.resDefence()
          this.changeView('mediateObj')
          this.$Message.success({
            content: '添加成功',
            duration: 2
          })
          break
      }
    },
    changeView (type) {
      switch (type) {
        case 'addEvid':
          this.evidObj.list = false
          this.evidObj.add = true
          this.evidObj.addBtn = false
          break
        case 'listEvid':
          this.evidObj.list = true
          this.evidObj.add = false
          this.evidObj.addBtn = true
          break
        case 'addRevEvid':
          this.revEvidObj.list = false
          this.revEvidObj.add = true
          this.revEvidObj.addBtn = false
          break
        case 'listRevEvid':
          this.revEvidObj.list = true
          this.revEvidObj.add = false
          this.revEvidObj.addBtn = true
          break
        case 'addQues':
          this.questionObj.list = false
          this.questionObj.add = true
          this.questionObj.addBtn = false
          break
        case 'listQues':
          this.questionObj.list = true
          this.questionObj.add = false
          this.questionObj.addBtn = true
          break
        case 'defenceObj':
        case 'mediateObj':
        case 'descrObj':
          this[type].list = true
          this[type].add = false
          this[type].addBtn = true
          break
        case 'addDefen':
          this.defenceObj.list = false
          this.defenceObj.add = true
          this.defenceObj.addBtn = false
          break
        case 'addDescr':
          this.descrObj.list = false
          this.descrObj.add = true
          this.descrObj.addBtn = false
          break
        case 'addMediate':
          this.mediateObj.list = false
          this.mediateObj.add = true
          this.mediateObj.addBtn = false
          break
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
  ._question {
    padding-bottom: 60px;
  }
  ._defence {
    padding-bottom: 60px;
  }
  ._evidences ._top, ._revEvidences ._top, ._question ._top, ._defence ._top {
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
