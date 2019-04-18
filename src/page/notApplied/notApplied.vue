<template>
  <div class="notApplied">
    <head-top :isRegister="true">
      <span class="f36 fcf">待申请案件</span>
    </head-top>
    <div class="_center pr">
      <spin-comp :spinShow="spinShow"></spin-comp>
      <Row>
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">搜索</label>
        </Col>
        <Col span="8">
          <Input v-model="search.text" icon="ios-search-strong" class="_search" @on-click="resSearch" @keyup.enter.native="resSearch" placeholder="案件编号 / 申请人 / 被申请人"></Input>
        </Col>
        <Col span="2" offset="2">
          <label class="lh32 f16 fc6 fr mr15">状态</label>
        </Col>
        <Col span="6">
          <Select v-model="perfectStatus" style="width:200px" @on-change="resChangeStatus()">
            <Option v-for="item in perfectStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <Button type="primary" @click="resAddUpload">批量导入</Button>
        </Col>
        <Col span="2">
          <Button type="primary" @click="resSubmit">批量提交</Button>
        </Col>
      </Row>
      <div class="_caseList clearfix">
        <Row>
          <Col span="24" class="pl20 pr20">
            <Table stripe border align="center" :loading="caseList.loading" :columns="caseList.header" :data="caseList.bodyList"></Table>
          </Col>
        </Row>
      </div>
      <div class="_page clearfix">
        <Row>
          <Col span="12" offset="6" class="tc">
            <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
          </Col>
        </Row>
      </div>
    </div>
    <alert-tip :alertShow="alertShowSub" @alertCancel="caseDelCanc" @alertConfirm="caseDelSave" alertTitle="提示" alertText="确定要删除这个案件吗？"></alert-tip>
    <alert-btn-info :isCancBtn="true" :isSaveBtn="true" :alertShow="alertShow.addcase" alertTitle="操作">
      <Row>
        <Col span="12"><span class="lh24" v-text="alertShow.text"></span></Col>
        <Col span="12" class="tr"><span class="lh24 hand _step" @click="resChangeStep" v-text="alertShow.btnText"></span></Col>
      </Row>
      <Row>
        <Col v-if="alertShow.stepNum === 1" span="24">
          <upload-book childName="上传excel文件" :dowShow="true" :fileType="['xls','xlsx']" :uploadUrl="resUploadUrlA" @dowDoc="dowDocBook" @saveClick="excSave" @cancClick="alertCanc('addC')"></upload-book>
        </Col>
        <Col v-if="alertShow.stepNum === 2" span="24">
          <upload-book childName="上传zip压缩文件" :dowShow="true" :fileType="['zip']" :uploadUrl="resUploadUrlB"  @dowDoc="dowDocBookB" @saveClick="zipSave" @cancClick="alertCanc('addC')"></upload-book>
        </Col>
      </Row>
    </alert-btn-info>
    <alert-btn-info :isSaveBtn="true" :alertShow="alertShow.info" @alertCancel="alertCanc('info')" alertTitle="批量导入状态">
      <Row>
        <Col span="24" class="pl20 pr20">
          <Table stripe align="center" :loading="seleList.loading" :columns="seleList.header" :data="seleList.bodyList"></Table>
        </Col>
      </Row>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.submit" @alertCancel="alertCanc('submit')" @alertConfirm="submitSave" alertTitle="提示">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>选择仲裁机构：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="alertShow.committee">
            <Option v-for="item in alertShow.committeeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>案件类型：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="caseTypeStatus">
            <Option v-for="item in caseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'
import alertTip from '@/components/common/alertTip'
import alertBtnInfo from '@/components/common/alertBtnInfo'
import uploadBook from '@/page/notApplied/children/uploadBook'
import regi from '@/config/regiType.js'

export default {
  name: 'notApplied',
  components: { headTop, alertTip, spinComp, alertBtnInfo, uploadBook },
  data () {
    return {
      alertShowSub: false,
      caseDelId: null,
      spinShow: true,
      search: {
        text: ''
      },
      caseList: {
        loading: false,
        header: [
          {
            title: '选择',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return this.renderCheck(h, params)
            }
          },
          {
            title: '案件编号',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    this.goCaseSee(params.index)
                  }
                }
              }, params.row.id)
            }
          },
          {
            title: '合同编号',
            key: 'contractNo',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.contractNo === null ? '' : params.row.contractNo)
            }
          },
          {
            title: '申请人',
            key: 'propName',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.propName === null ? '' : params.row.propName)
            }
          },
          {
            title: '被申请人',
            key: 'respName',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.respName === null ? '' : params.row.respName)
            }
          },
          {
            title: '创建时间',
            key: 'createtime',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.createtime === null ? '' : params.row.createtime)
            }
          },
          {
            title: '是否完善',
            key: 'isPerfect',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.isPerfect === 2 ? '否' : (params.row.isPerfect === 1 ? '是' : '未知'))
            }
          },
          {
            title: '操作',
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.goCaseSee(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.resCaseDel(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        bodyList: []
      },
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      alertShow: {
        addcase: false,
        text: '第一步：',
        stepNum: 1,
        info: false,
        idsList: [],
        submit: false,
        committee: '',
        committeeList: [],
        btnText: '下一步'
      },
      seleList: {
        loading: false,
        header: [
          {
            title: '文件名称',
            key: 'file',
            align: 'center'
          },
          {
            title: '状态',
            key: 'desc',
            align: 'center'
          }
        ],
        bodyList: []
      },
      perfectStatusList: [],
      perfectStatus: 0,
      caseTypeList: [],
      caseTypeStatus: '',
      caseMap: {}
    }
  },
  created () {
    this.dictionary()
    this.resPrepareList()
    this.resCaseType()
  },
  computed: {
    resUploadUrlA () {
      return regi.api + '/caseImport/import'
    },
    resUploadUrlB () {
      return regi.api + '/file/upload/zipFile'
    }
  },
  methods: {
    ...mapActions([
      'setCaseId'
    ]),
    renderCheck (h, params) {
      let _obj = params.row
      if (_obj.isPerfect === 1) {
        if (this.alertShow.idsList.indexOf(_obj.id) === -1) {
          return h('div', [
            h('Icon', {
              props: {
                type: 'android-checkbox-outline-blank',
                size: '16'
              },
              style: {
                color: '#2d8cf0',
                cursor: 'pointer',
                verticalAlign: 'text-top'
              },
              on: {
                click: () => {
                  this.seleArrChange(params.index, true)
                }
              }
            })
          ])
        } else {
          return h('div', [
            h('Icon', {
              props: {
                type: 'android-checkbox',
                size: '16'
              },
              style: {
                color: '#2d8cf0',
                cursor: 'pointer',
                verticalAlign: 'text-top'
              },
              on: {
                click: () => {
                  this.seleArrChange(params.index, false)
                }
              }
            })
          ])
        }
      } else {
        return h('div', [
        ])
      }
    },
    seleArrChange (index, bool) {
      let info = this.caseList.bodyList[index]
      if (bool) {
        if (this.alertShow.idsList.indexOf(info.id) === -1) {
          if (this.alertShow.idsList.length >= 10) {
            this.$Message.error({
              content: '最多只能选择十个案件',
              duration: 5
            })
            return false
          } else {
            this.alertShow.idsList.push(info.id)
          }
        }
      } else {
        if (this.alertShow.idsList.indexOf(info.id) !== -1) {
          this.alertShow.idsList.splice(this.alertShow.idsList.indexOf(info.id), 1)
        }
      }
    },
    resDictionary (itemGroup) {
      axios.post('/dictionary/' + itemGroup).then(res => {
        let _dataList = res.data.data
        let _select = []
        for (let k in _dataList) {
          let _o = {}
          _o.value = _dataList[k].itemValue
          _o.label = _dataList[k].item
          _select.push(_o)
        }
        this.alertShow.committeeList = _select
        this.alertShow.committee = this.alertShow.committeeList === '' ? '' : this.alertShow.committeeList[0].value
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    dictionary () {
      axios.post('/dictionary/perfectType').then(res => {
        let _dataList = res.data.data
        let _select = []
        for (let k in _dataList) {
          let _o = {}
          _o.value = _dataList[k].itemValue
          _o.label = _dataList[k].item
          _select.push(_o)
        }
        this.perfectStatusList = _select
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resPrepareList () {
      this.spinShow = true
      axios.post('/case/prepareList', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize,
        keyword: this.search.text,
        perfectType: this.perfectStatus
      }).then(res => {
        let _data = res.data.data
        this.caseList.bodyList = _data.dataList === null ? [] : _data.dataList
        this.pageObj.total = _data.totalCount
        this.spinShow = false
      }).catch(e => {
        this.spinShow = false
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resChangeStatus () {
      this.pageObj.pageNum = 1
      this.resPrepareList()
    },
    goCaseSee (index) {
      this.setCaseId(this.caseList.bodyList[index].id)
      window.localStorage.setItem('caseId', this.caseList.bodyList[index].id)
      this.$router.push({
        path: '/filing'
      })
    },
    resCaseDel (index) {
      this.alertShowSub = true
      this.caseDelId = this.caseList.bodyList[index].id
    },
    caseDelSave () {
      this.alertShowSub = false
      axios.post('/case/delete', {
        id: this.caseDelId
      }).then(res => {
        this.resSearch()
        this.$Message.success({
          content: '删除成功',
          duration: 2
        })
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    caseDelCanc () {
      this.alertShowSub = false
      this.caseDelId = null
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.resPrepareList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resPrepareList()
    },
    dowDocBook () {
      window.open(regi.api + '/file/templet/dowload/2', '_blank')
    },
    dowDocBookB () {
      window.open(regi.api + '/file/templet/dowload/4', '_blank')
    },
    resAddUpload () {
      this.alertShow.addcase = true
    },
    excSave (obj) {
      this.$Message.success({
        content: '' + obj + '',
        duration: 5
      })
      this.alertShow.text = '第二步：'
      this.alertShow.stepNum = 2
      this.alertShow.btnText = '上一步'
    },
    zipSave (obj) {
      this.alertCanc('addC')
      if (obj === null || obj === []) {
      } else {
        this.seleList.bodyList = obj
        this.alertShow.info = true
      }
    },
    resSubmit () {
      if (this.alertShow.idsList.length === 0) {
        this.$Message.error({
          content: '请先选择一个已经完善的案件',
          duration: 5
        })
      } else {
        this.resDictionary('commissionType')
        this.alertShow.submit = true
      }
    },
    submitSave () {
      this.alertCanc('submit')
      this.spinShow = true
      let caseTypeCode = this.caseTypeStatus === '' ? null : this.caseTypeStatus
      let caseTypeName = this.caseMap[this.caseTypeStatus] === '' ? null : this.caseMap[this.caseTypeStatus]
      axios.post('/case/submit', {
        caseId: JSON.stringify(this.alertShow.idsList),
        commissionType: this.alertShow.committee,
        caseTypeCode: caseTypeCode,
        caseTypeName: caseTypeName
      }).then(res => {
        this.alertShow.idsList = []
        this.spinShow = false
        this.resChangeStatus()
        this.$Message.success({
          content: res.data.message,
          duration: 10,
          closable: true
        })
      }).catch(e => {
        this.spinShow = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resCaseType () {
      axios.post('/caseType/list', {
        pageIndex: 0,
        pageSize: 999
      }).then(res => {
        let _dataList = res.data.data.dataList
        this.caseTypeList = _dataList.map((a, b) => {
          let _o = {}
          _o.value = a.caseTypeCode
          _o.label = a.caseTypeName
          this.caseMap[_o.value] = _o.label
          return _o
        })
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resChangeStep () {
      if (this.alertShow.stepNum === 1) {
        this.alertShow.text = '第二步：'
        this.alertShow.stepNum = 2
        this.alertShow.btnText = '上一步'
      } else if (this.alertShow.stepNum === 2) {
        this.alertShow.text = '第一步：'
        this.alertShow.stepNum = 1
        this.alertShow.btnText = '下一步'
      }
    },
    alertCanc (type) {
      if (type === 'addC') {
        this.alertShow.addcase = false
        this.alertShow.text = '第一步：'
        this.alertShow.stepNum = 1
        this.alertShow.btnText = '下一步'
      } else if (type === 'info') {
        this.alertShow.info = false
        this.seleList.bodyList = []
        this.resChangeStatus()
      } else if (type === 'submit') {
        this.alertShow.submit = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._center {
  background: transparent;
  width: 80%;
  @include mw(1180px);
  @include bc;
  padding-top: 40px;
  ._search {
    max-width: 450px;
    margin-bottom: 20px;
  }
  ._caseList {
    margin-bottom: 20px;
  }
}
._labelFor {
  margin-bottom: 10px;
  p {
    padding: 7px 0;
  }
  ._span {
    vertical-align: middle;
    color: #ff7a7a;
  }
}
._step {
  color: #337BB5;
}
</style>
