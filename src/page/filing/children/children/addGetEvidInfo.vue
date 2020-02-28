<template>
  <div class="pr _addEvidInfo">
    <spin-comp :spinShow="spinShow">
      <div v-if="progressText !== null" v-text="progressText"></div>
    </spin-comp>
    <Row>
      <Col span="22" offset="1">
        <Row class="_labelFor">
          <Col span="4" class="_label">证据项名称<b class="_b">*</b></Col>
          <Col span="16" class="_input"><input type="text" v-model.trim="data.name"></Col>
          <Col span="16" offset="4" class="_em"><span v-show="emInfo.status===1" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="4" class="_label">证明事项<b class="_b">*</b></Col>
          <Col span="16" class="_input"><input type="text" v-model.trim="data.memo"></Col>
          <Col span="16" offset="4" class="_em"><span v-show="emInfo.status===3" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" class="_label">该证据是否为证据原件<b class="_b">*</b></Col>
          <Col span="16" class="_radio">
            <RadioGroup v-model="data.state" @on-change="selectRadio">
              <Radio :label="1">是</Radio>
              <Radio :label="2">否</Radio>
            </RadioGroup>
          </Col>
          <Col span="16" offset="4" class="_em"><span v-show="emInfo.status===2" v-text="emInfo.text"></span></Col>
        </Row>
        <Row class="_labelFor">
          <Col span="4" class="_label">文件获取<b class="_b">*</b></Col>
          <Col span="16" class="">
            <template>
              <Row class="pb10" v-for="(item, index) in getFileList" :key="index">
                <Col span="14">
                  <p class="_item" v-if="item.isGet"><span class="hand" :title="item.fileObj.filename" @click="seeFile(item.fileObj.filepath)">{{item.fileObj.filename.length > 20 ? item.fileObj.filename.substr(0, 20) + '...' : item.fileObj.filename}}</span></p>
                  <Input v-else v-model="item.num" placeholder="请输入证据编号" />
                </Col>
                <Col span="4" style="padding-top:3px;">
                  <Button v-if="!item.isGet" class="ml10" type="primary" size="small" @click="resAction('resGetFile', item)">提取</Button>
                </Col>
                <Col span="6" class="tr p5">
                  <Icon v-if="item.isGet" size="20" class="fl ml10 hand" color="#19be6b" type="checkmark-circled"></Icon>
                  <Icon v-if="!item.isGet && index" size="20" class="fl ml10 hand" color="#ed3f14" type="close-circled" @click="resAction('del', index)"></Icon>
                  <Icon v-if="!index" size="20" class="hand" color="#2d8cf0" type="plus-circled" @click="resAction('add', null)"></Icon>
                </Col>
              </Row>
            </template>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col class="tc" span="10" offset="1"><button class="_cancelBtn" @click="cancClick">取 消</button></Col>
      <Col class="tc" span="10" offset="2"><button class="_saveBtn" :class="{'_disabled':addFileBtn}" v-bind:disabled="addFileBtn" @click="saveClick">保 存</button></Col>
    </Row>
    <alert-btn-info :alertShow="alertShow.select" @alertConfirm="alertSave" @alertCancel="alertCanc" alertTitle="提示">
      <p>当事人应当为自己的仲裁请求承担举证责任，您提交的证据不是证据原件，您将为此承担相应的法律风险</p>
      <div class="pt5 tr">
        <Checkbox v-model="agree">我已阅读并同意</Checkbox>
      </div>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/page/caseInfo/children/children/alertBtnInfo'

export default {
  name: 'add_evid_info',
  components: { spinComp, alertBtnInfo },
  props: ['caseId', 'uploadUrl', 'uploadFileUrl', 'fileType'],
  data () {
    return {
      agree: false,
      alertShow: {
        select: false
      },
      spinShow: false,
      fileNum: 0,
      progressText: null,
      emInfo: {
        status: 0,
        text: ''
      },
      data: {
        caseid: this.caseId,
        name: '',
        state: null,
        memo: ''
      },
      addBtnSwt: false,
      fileIdList: [],
      getFileList: [
        {
          num: '',
          isGet: 0,
          fileObj: null
        }
      ]
    }
  },
  computed: {
    addFileBtn () {
      if (this.fileIdList.length === 0 || this.data.name === '' || this.data.state === null || this.data.memo === '' || this.addBtnSwt === true) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    alertCanc () {
      this.alertShow.select = false
      this.data.state = 1
      this.agree = false
    },
    alertSave () {
      if (this.agree === false) {
        this.$Message.error({
          content: '请先勾选阅读并同意',
          duration: 5
        })
        return false
      } else {
        this.alertShow.select = false
        this.agree = false
      }
    },
    selectRadio () {
      if (this.data.state === 2) {
        this.alertShow.select = true
      }
    },
    seeFile (path) {
      window.open(path, '_blank')
    },
    resAction (type, _data) {
      switch (type) {
        case 'add':
          let _o = {
            num: '',
            isGet: 0,
            fileObj: null
          }
          this.getFileList.push(_o)
          break
        case 'del':
          this.getFileList.splice(_data, 1)
          break
        case 'resGetFile':
          if (_data.num.length !== 0) {
            this.resAjax(_data.num)
          } else {
            this.$Message.error({
              content: '请输入证据编号',
              duration: 5
            })
          }
          break
      }
    },
    resAjax (ids) {
      this.spinShow = true
      axios.post('/case/getFilesByEvidenceNumbers', {
        evidenceNumbers: ids
      }).then(res => {
        this.spinShow = false
        for (let k in this.getFileList) {
          if (this.getFileList[k].num === ids) {
            this.getFileList[k].fileObj = res.data.data[0]
            this.getFileList[k].isGet = 1
            if (this.fileIdList.indexOf(res.data.data[0].id) === -1) {
              this.fileIdList.push(res.data.data[0].id)
            }
          }
        }
      }).catch(e => {
        this.spinShow = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    saveClick () {
      if (this.addBtnSwt) {
        return false
      }
      this.addBtnSwt = true
      axios.post(this.uploadUrl, {
        caseid: this.caseId,
        name: this.data.name,
        state: this.data.state,
        memo: this.data.memo,
        fileIds: JSON.stringify(this.fileIdList)
      }).then(res => {
        this.$Message.success({
          content: '文件上传成功',
          duration: 1,
          onClose: () => {
            this.addBtnSwt = false
            setTimeout(() => {
              this.$emit('saveClick', res.data.data)
            })
          }
        })
      }).catch(e => {
        this.addBtnSwt = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    cancClick () {
      this.$emit('cancClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._addEvidInfo {
  @include borderRadius(3px);
  @include boxShadow(0 1px 6px -1px #bbb);
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  font-size: 12px;
  ._labelFor {
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
      padding: 30px 0;
    }
    ._input {
      border-bottom:1px solid #ddd;
      input {
        width: 100%;
        border: none;
        letter-spacing: 1px;
        font-size: 12px;
        color: #666;
        height: 29px;
        line-height: 29px;
        background: transparent;
      }
      input:focus {
        box-shadow: none;
        outline: 0px;
      }
    }
    ._radio {
      height: 29px;
      line-height: 29px;
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
  ._tipsText{
    color: #126eaf;
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
}
</style>
