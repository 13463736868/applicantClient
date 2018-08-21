<template>
  <div class="evidences">
    <div class="_evidences">
      <div class="_top">我的证据</div>
      <div v-if="evidShow.list" class="_listResp">
        <div v-if="evidData !== null" v-for="(item, index) in evidData" :key="index">
          <evid-info :infoData="item" @delInfo="delEvidInfo"></evid-info>
        </div>
      </div>
      <div v-if="evidShow.add">
        <add-evid-info :caseId="caseId" :fileType="['jpg','jpeg','png','pdf']" uploadUrl="/api/case/evidenceAdd" @saveClick="addEvidSave" @cancClick="changeView('listEvid')"></add-evid-info>
      </div>
      <add-icon v-if="evidShow.addBtn" :imgStatus="2" addText="添加证据" @addClick="changeView('addEvid')"></add-icon>
    </div>
    <alert-tip :alertShow="alertShowEvid" @alertCancel="delEvidCanc" @alertConfirm="delEvidSave" alertTitle="提示" alertText="确定要删除这个证据项吗？">
    </alert-tip>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import alertTip from '@/components/common/alertTip'
import addIcon from '@/components/common/addIcon'
import evidInfo from '@/page/filing/children/children/evidInfo'
import addEvidInfo from '@/page/filing/children/children/addEvidInfo'

export default {
  name: 'evidences',
  props: [],
  components: { alertTip, addIcon, evidInfo, addEvidInfo },
  data () {
    return {
      alertShowEvid: false,
      evidShow: {
        list: false,
        add: false,
        addBtn: true
      },
      evidData: [],
      delEvidId: null
    }
  },
  created () {
    if (this.caseInfo !== null) {
      this.evidData = this.caseInfo.evidenceList
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
    addEvidSave (_obj) {
      this.evidData.push(_obj)
      this.setFiling({type: 'evidenceList', data: this.evidData})
      this.changeView('listEvid')
      this.$Message.success({
        content: '添加成功',
        duration: 2
      })
    },
    delEvidInfo (_id) {
      this.alertShowEvid = true
      this.delEvidId = _id
    },
    delEvidSave () {
      axios.post('/case/evidenceDelete', {
        caseid: this.caseId,
        id: this.delEvidId
      }).then(res => {
        for (let k in this.evidData) {
          if (this.evidData[k].id === this.delEvidId) {
            this.evidData.splice(k, 1)
            this.setFiling({type: 'evidenceList', data: this.evidData})
            this.alertShowEvid = false
            this.$Message.success({
              content: '删除成功',
              duration: 2
            })
            return
          }
        }
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    delEvidCanc () {
      this.alertShowEvid = false
      this.delEvidId = null
    },
    createList () {
      if (this.evidData.length === 0) {
        this.evidShow.list = false
      } else {
        this.evidShow.list = true
      }
    },
    changeView (type) {
      if (type === 'listEvid') {
        if (this.evidData.length === 0) {
          this.evidShow.list = false
        } else {
          this.evidShow.list = true
        }
        this.evidShow.add = false
        this.evidShow.addBtn = true
      } else if (type === 'addEvid') {
        this.evidShow.list = false
        this.evidShow.add = true
        this.evidShow.addBtn = false
      }
    }
  },
  watch: {
    caseInfo: function (val) {
      if (val !== null) {
        this.evidData = this.caseInfo.evidenceList
        this.createList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.evidences {
  ._evidences {
    padding-bottom: 60px;
  }
  ._evidences ._top{
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
