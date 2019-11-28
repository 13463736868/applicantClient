<template>
  <div class="pr _uploadApplBook">
    <spin-comp :spinShow="spinShow">
      <div v-if="progressText !== null" v-text="progressText"></div>
    </spin-comp>
    <Row>
      <Col span="24">
        <Row class="_labelFor">
          <Row v-if="docShow">
            <Col span="4">
              <span>案件类型：</span>
            </Col>
            <Col span="7">
              <Select v-model="caseTypeAll" size="small" @on-change="resAction('caseType')">
                <Option v-for="item in caseTypeAllList" :title="item.label" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4" offset="2">
              <span>仲裁委：</span>
            </Col>
            <Col span="7">
              <Select v-model="committee" size="small" @on-change="resAction('committee')">
                <Option :disabled="item.state === 2" v-for="item in caseMap[caseTypeAll]" :title="item.name" :value="item.arbId" :key="item.arbId">{{ item.name }}</Option>
              </Select>
            </Col>
          </Row>
          <Col span="12" class="_label"><span v-text="childName"></span><b class="_b">*</b></Col>
          <Col span="10" offset="2" class="_label" v-if="docShow && committee !== null && committee !== undefined">
            <span class="hand _blue" v-if="caseTypeUrl !== null" @click="resDoc"><Icon class="mr5" type="ios-information-outline" size="14" color="#ff7a7a"/>模版下载</span>
            <span class="_red" v-else>暂无此案件类型模版</span>
          </Col>
          <Col v-if="dowShow" span="12" class="_label tr"><span class="_enDow hand" @click="dowDoc"><Icon class="mr5" type="ios-information-outline" size="14" color="#ff7a7a"/>批量导入用户模版下载</span></Col>
          <Col span="24">
            <Upload
              ref="upload"
              name="file"
              type="drag"
              :action="uploadUrl"
              :with-credentials="true"
              :show-upload-list="false"
              :format="fileType"
              :max-size="1024000"
              :data="dataObj"
              :on-format-error="resFormError"
              :on-exceeded-size="resSzieError"
              :before-upload="resBefoUpload"
              :on-progress="resProgress"
              :on-success="resSuccess"
              :on-error="resError"
            >
              <div class="_text">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p v-if="fileObj === null" v-text="'上传类型只支持 '+fileType"></p>
                <div v-if="fileObj !== null" v-text="fileObj.name"></div>
              </div>
            </Upload>
          </Col>
          <Col span="24" class="_em"><span v-show="emInfo.status===2" v-text="emInfo.text"></span></Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addFileBtn}" v-bind:disabled="addFileBtn" @click="saveClick">上 传</button></Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import spinComp from '@/components/common/spin'

export default {
  name: 'upload_appl_book',
  components: { spinComp },
  props: ['uploadUrl', 'fileType', 'childName', 'dowShow', 'docShow'],
  data () {
    return {
      spinShow: false,
      progressText: null,
      emInfo: {
        status: 0,
        text: ''
      },
      data: {},
      fileObj: null,
      caseTypeAllList: [],
      caseTypeAll: null,
      committee: null,
      caseMap: {},
      caseCodeMap: {},
      caseTypeUrl: null
    }
  },
  created () {
    if (this.docShow) {
      this.resCaseType()
    }
  },
  computed: {
    dataObj () {
      let _a = {}
      if (this.docShow) {
        _a.caseType = this.caseTypeAll
        _a.arbitrationId = this.committee
        return _a
      } else {
        return _a
      }
    },
    addFileBtn () {
      if (this.fileObj === null) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    resDoc () {
      window.open(this.caseTypeUrl, '_blank')
    },
    resAction (type) {
      if (type === 'caseType') {
        this.committee = null
      } else if (type === 'committee' && this.committee !== null && this.committee !== undefined) {
        axios.post('/caseType/queryTemplateUrl', {
          caseTypeCode: this.caseCodeMap[this.caseTypeAll],
          arbId: this.committee
        }).then(res => {
          if (res.data.data !== null && res.data.data !== '') {
            this.caseTypeUrl = res.data.data
          } else {
            this.caseTypeUrl = null
          }
        }).catch(e => {
          this.$Message.error({
            content: '错误信息:' + e + ' 稍后再试',
            duration: 5
          })
        })
      }
    },
    resCaseType () {
      axios.post('/caseType/list').then(res => {
        let _dataList = res.data.data === null ? [] : res.data.data
        this.caseTypeAllList = _dataList.map((a, b) => {
          let _o = {}
          _o.value = a.id
          _o.label = a.caseTypeName
          _o.status = a.status
          this.caseMap[a.id] = a.arbitrationList
          this.caseCodeMap[a.id] = a.caseTypeCode
          return _o
        })
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resFormError (file) {
      this.spinShow = false
      this.$Message.error({
        content: '文件格式错误只支持 ' + this.fileType,
        duration: 5
      })
    },
    resSzieError (file) {
      this.spinShow = false
      this.$Message.error({
        content: '文件不能超过200MB',
        duration: 5
      })
    },
    resBefoUpload (file) {
      this.fileObj = file
      return false
    },
    resProgress (event, file) {
      let _percent = event.percent
      if (_percent === 100) {
        this.progressText = 99 + '%'
      } else {
        this.progressText = Math.floor(event.percent) + '%'
      }
    },
    resSuccess (res, file) {
      this.progressText = '100%'
      this.fileObj = null
      this.spinShow = false
      if (res.flag === false) {
        this.$Message.error({
          content: '错误信息:' + res.message + '',
          duration: 5
        })
      } else {
        this.$Message.success({
          content: '文件上传成功',
          duration: 1,
          onClose: () => {
            setTimeout(() => {
              this.$emit('saveClick', file.response.data)
            })
          }
        })
      }
    },
    resError (error, file) {
      this.spinShow = false
      this.$Message.error({
        content: '错误信息:' + error.status + ' 稍后再试',
        duration: 5
      })
    },
    saveClick () {
      if (this.docShow && this.caseTypeAll === null) {
        this.$Message.warning({
          content: '请先选择一个案件类型',
          duration: 5
        })
        return false
      } else {
        this.spinShow = true
        this.$refs.upload.post(this.fileObj)
      }
    },
    cancClick () {
      this.$emit('cancClick')
    },
    dowDoc () {
      this.$emit('dowDoc')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._uploadApplBook {
  @include borderRadius(3px);
  // @include boxShadow(0 1px 6px -1px #bbb);
  // margin-top: 10px;
  padding: 0 15px;
  background: #fff;
  font-size: 12px;
  ._labelFor {
    ._label {
      padding: 5px 0;
      ._b {
        color: #ff7a7a;
        margin-left: 5px;
        vertical-align: sub;
      }
      ._enDow {
        color: #337BB5
      }
    }
    ._text {
      padding: 30px 0;
    }
    ._em {
      height: 16px;
      line-height: 16px;
      color: #ff7a7a;
      font-size: 8px;
      span {
        float: right;
      }
    }
  }
  ._cancelBtn {
    @include btn(#fff, 90px, 14px, 32px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
    color: #126eaf;
  }
  ._saveBtn {
    @include btn(#126eaf, 90px, 14px, 32px);
    @include boxShadow(0 1px 6px -1px #bbb);
    @include borderRadius(4px);
  }
  ._saveBtn._disabled {
    @include btn(#ccc, 90px, 14px, 32px);
  }
  ._cancelBtn:focus,._saveBtn:focus {
    outline: 0px;
  }
  ._blue {
    color: #337BB5;
  }
  ._red {
    color: #ff7a7a;
  }
}
</style>
