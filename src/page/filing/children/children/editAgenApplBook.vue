<template>
  <div class="_addAgenApplBook">
    <spin-comp :spinShow="spinShow">
      <div v-if="progressText !== null" v-text="progressText"></div>
    </spin-comp>
    <Row>
      <Col span="22" offset="1">
        <Row class="_labelFor" v-if="fileList.length !== 0">
          <Col span="4" class="_label">授权委托书<b class="_b">*</b></Col>
          <Col span="16" class="_input">
            <Row>
              <Col span="12" class="_item" v-for="item in fileList" :key="item.id"><span class="hand" :title="item.filename" @click="seeFile(item.filepath)">{{item.filename.length > 25 ? item.filename.substr(0, 20) + '...' : item.filename}}</span><Icon @click="delFile(item.id)" class="_del hand" type="close-circled"></Icon></Col>
            </Row>
          </Col>
        </Row>
        <Row class="_labelFor" v-if="fileIdList.length === 0">
          <Col span="24" class="_label">授权委托书<b class="_b">*</b></Col>
          <Col span="24">
            <Upload
              ref="upload"
              name="file"
              type="drag"
              :action="uploadFileUrl"
              :with-credentials="true"
              :show-upload-list="false"
              :format="fileType"
              :max-size="10240"
              :on-format-error="resFormError"
              :on-exceeded-size="resSizeError"
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
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import spinComp from '@/components/common/spin'
export default {
  name: 'add_agen_appl_book',
  components: { spinComp },
  props: ['caseId', 'uploadUrl', 'uploadFileUrl', 'fileType', 'editApplBookData'],
  data () {
    return {
      spinShow: false,
      progressText: null,
      fileList: [],
      fileIdList: [],
      fileObj: null
    }
  },
  created () {
    if (this.editApplBookData !== null) {
      this.fileList.push(JSON.parse(JSON.stringify(this.editApplBookData)))
      this.fileIdList.push(this.editApplBookData.id)
    }
  },
  methods: {
    delFile (id) {
      for (let k in this.fileList) {
        if (this.fileList[k].id === id) {
          this.fileList.splice(k, 1)
          this.fileIdList.splice(k, 1)
          this.$emit('delFileClick')
          this.$Message.success({
            content: '删除成功',
            duration: 2
          })
          return
        }
      }
    },
    seeFile (path) {
      window.open(path, '_blank')
    },
    resFormError (file) {
      this.spinShow = false
      this.$Message.error({
        content: '文件格式错误只支持 ' + this.fileType,
        duration: 5
      })
      this.fileObj = null
    },
    resSizeError (file) {
      this.spinShow = false
      this.$Message.error({
        content: '文件不能超过10MB',
        duration: 5
      })
      this.fileObj = null
    },
    resBefoUpload (file) {
      this.fileObj = file
      this.spinShow = true
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
      this.spinShow = false
      this.fileObj = null
      if (res.flag === false) {
        this.$Message.error({
          content: '错误信息:' + res.message + '',
          duration: 5
        })
      } else {
        if (this.fileIdList.indexOf(file.response.data.id) === -1) {
          this.fileList.push(file.response.data)
          this.fileIdList.push(file.response.data.id)
          this.$Message.success({
            content: '文件上传成功',
            duration: 1,
            onClose: () => {
              setTimeout(() => {
                this.$emit('saveClick', file.response.data.id)
              })
            }
          })
        }
      }
    },
    resError (error, file) {
      this.spinShow = false
      this.$Message.error({
        content: '错误信息:' + error.status + ' 稍后再试',
        duration: 5
      })
    },
    cancClick () {
      this.$emit('cancClick')
    }
  }
}
</script>
<style lang="scss" scoped>
._addAgenApplBook {
  ._del {
    color: #ff7a7a;
    margin-left: 10px;
  }
  ._item {
    color: #126eaf;
    height: 29px;
    line-height: 29px;
  }
  ._label {
    padding: 5px 0;
    ._b {
      color: #ff7a7a;
      margin-left: 5px;
      vertical-align: middle;
    }
  }
  ._text {
    padding: 20px 0;
  }
  ._input {
    border-bottom:1px solid #ddd;
  }
  padding-bottom: 20px;
}
</style>
