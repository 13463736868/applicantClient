<template>
  <div class="rightArbi">
    <div class="_arbiInfo">
      <div class="_top">仲裁委信息</div>
      <div class="_mid">
        <Row v-if="arbiInfoShow">
          <Col span="22" offset="1">
            <div class="_logo">
              <img class="_img" :src="arbiInfo.loginLogoUrl" alt="">
              <div class="f14 pt5"><b v-text="arbiInfo.name"></b></div>
              <div><b v-text="arbiInfo.enName"></b></div>
            </div>
            <p>
              <Row>
                <Col class="tr" span="6"><span class="mr10"><b>电话 :</b></span></Col>
                <Col span="18">
                  <ul v-for="(item, index) in arbiInfo.phone.split(',')" :key="index">
                    <li class="mr10" v-text="item"></li>
                  </ul>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="6"><span class="mr10"><b>地址 :</b></span></Col>
                <Col span="18">
                  <span class="mr10" v-text="arbiInfo.address"></span>
                </Col>
              </Row>
            </p>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_caseInfo">
      <div class="_top">案件信息</div>
      <div class="_mid">
        <Row v-if="dataInfoShow">
          <Col span="22" offset="1">
            <p>
              <Row>
                <Col class="tr" span="10"><span class="mr10"><b>仲裁机构 :</b></span></Col>
                <Col span="14">
                  <span class="mr10" v-text="dataInfo.carbitrationNameode"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="10"><span class="mr10"><b>案件案号 :</b></span></Col>
                <Col span="14">
                  <span class="mr10" v-text="dataInfo.code"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="10"><span class="mr10"><b>纠纷类型 :</b></span></Col>
                <Col span="14">
                  <span class="mr10" v-text="dataInfo.caseType"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="10"><span class="mr10"><b>案件状态 :</b></span></Col>
                <Col span="14">
                  <span class="mr10" v-text="dataInfo.caseState"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="10"><span class="mr10"><b>仲裁员 :</b></span></Col>
                <Col span="14">
                  <span class="mr10" v-text="dataInfo.arbitratorName"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="10"><span class="mr10"><b>秘书 :</b></span></Col>
                <Col span="14">
                  <span class="mr10" v-text="dataInfo.secretaryName"></span>
                </Col>
              </Row>
            </p>
            <p>
              <Row>
                <Col class="tr" span="10"><span class="mr10"><b>电话 :</b></span></Col>
                <Col span="14">
                  <span class="mr10" v-text="dataInfo.secretaryPhone"></span>
                </Col>
              </Row>
            </p>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_myCaseSub">
      <Row v-if="myCaseState === '3' || myCaseState === 3">
        <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="reSubClick">重新提交仲裁委</button></Col>
      </Row>
      <Row v-if="myCaseShowBtn !== null">
        <Col v-if="myCaseShowBtn.debarbArbitrator === 1" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="avoidClick">申请仲裁员回避</button></Col>
          </Row>
        </Col>
        <Col v-if="myCaseShowBtn.revocation === 1" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="retractClick">撤回案件</button></Col>
          </Row>
        </Col>
        <Col v-if="myCaseShowBtn.changeArbitrator === 1" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="selectClick">选择仲裁员</button></Col>
          </Row>
        </Col>
        <Col v-if="myCaseShowBtn.applyCorrect === 1" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="replClick">申请补正</button></Col>
          </Row>
        </Col>
        <Col v-if="myCaseShowBtn.counterclaim === 1" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="counteClick">反请求</button></Col>
          </Row>
        </Col>
        <Col v-if="myCaseShowBtn.rightOfJurisdiction === 1" span="24">
          <Row>
            <Col class="tc" span="20" offset="2"><button class="_saveBtn" :class="{'_disabled':addSubmit}" v-bind:disabled="addSubmit" @click="rightOfJClick">管辖权异议</button></Col>
          </Row>
        </Col>
      </Row>
    </div>
    <alert-btn-info :alertShow="alertShow.reSub" @alertConfirm="reSubSave" @alertCancel="alertCanc('reSub')" alertTitle="重新提交仲裁委">
      <p>确定要重新提交仲裁委吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.avoi" @alertConfirm="avoiSave" @alertCancel="alertCanc('avoi')" alertTitle="申请仲裁员回避">
      <Row class="pb10" v-if="dataObj.avoiObj !== null">
        <Col span="22" offset="1">
          <span><b>{{dataObj.avoiObj.nameArr[1] || dataObj.avoiObj.nameArr[2] ? '首席' : '独任'}}仲裁员： </b></span>
          <span v-if="dataObj.avoiObj.nameArr[0]"><span class="ml5 mr5" v-text="dataObj.avoiObj.nameArr[0]"></span><Checkbox v-model="dataObj.avoiObj.statusArr[0]"></Checkbox></span>
        </Col>
        <Col span="22" offset="1" v-if="dataObj.avoiObj.nameArr[1]">
          <span><b>其他仲裁员：</b></span>
          <span><span class="ml5 mr5" v-text="dataObj.avoiObj.nameArr[1]"></span><Checkbox v-model="dataObj.avoiObj.statusArr[1]"></Checkbox></span>
        </Col>
        <Col span="22" offset="1" v-if="dataObj.avoiObj.nameArr[2]">
          <span><b>其他仲裁员：</b></span>
          <span><span class="ml5 mr5" v-text="dataObj.avoiObj.nameArr[2]"></span><Checkbox v-model="dataObj.avoiObj.statusArr[2]"></Checkbox></span>
        </Col>
      </Row>
      <Input v-model="dataObj.avoi" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请输入原因..." />
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.repl" @alertConfirm="replSave" @alertCancel="alertCanc('repl')" alertTitle="申请补正">
      <Input v-model="dataObj.repl" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请输入原因..." />
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.coun" @alertConfirm="counSave" @alertCancel="alertCanc('coun')" alertTitle="申请反请求">
      <p>确定要申请反请求吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.righ" @alertConfirm="righSave" @alertCancel="alertCanc('righ')" alertTitle="申请管辖权异议">
      <Input v-model="dataObj.righ" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请输入原因..." />
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.retr" @alertConfirm="retrSave" @alertCancel="alertCanc('retr')" alertTitle="申请撤回案件">
      <spin-comp :spinShow="spinShow">
        <div v-if="progressText !== null" v-text="progressText"></div>
      </spin-comp>
      <p style="padding-bottom:10px;">确定要申请撤回案件吗？</p>
      <Upload
        ref="upload"
        name="file"
        type="drag"
        :action="resAction"
        :with-credentials="true"
        :show-upload-list="false"
        :format="['jpg','jpeg','png','doc','docx','pdf']"
        :max-size="10240"
        :data="retrData"
        :on-format-error="resFormError"
        :on-exceeded-size="resSizeError"
        :before-upload="resBefoUpload"
        :on-progress="resProgress"
        :on-success="resSuccess"
        :on-error="resError"
      >
        <div class="_text" style="padding:20px 0;">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p v-if="dataObj.retr === null" v-text="'请上传撤回申请书 ( 上传类型只支持 jpg、jpeg、png、doc、docx、pdf )'"></p>
          <div v-if="dataObj.retr !== null" v-text="dataObj.retr.name"></div>
        </div>
      </Upload>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.sele" @alertConfirm="seleSave" @alertCancel="alertCanc('sele')" alertTitle="选择仲裁员">
      <Row class="mb5">
        <Col span="3" offset="1">
          <label class="lh25 f12 fb fl mr15">搜 索 :</label>
        </Col>
        <Col span="8">
          <Input :maxlength="15" size="small" v-model.trim="searchText" icon="ios-search-strong" placeholder=""></Input>
        </Col>
      </Row>
      <Row class="pb10" v-if="seleShow">
        <Col span="20" offset="1">
          <span><b>首席仲裁员： </b></span>
          <span v-if="seleArrName[0]"><span class="ml5" v-text="seleArrName[0]"></span><Icon @click="resSeleDel(0)" class="ml5 hand" color="#ed3f14" type="close"></Icon></span>
        </Col>
        <Col span="20" offset="1">
          <span><b>其他仲裁员：</b></span>
          <span v-if="seleArrName[1]"><span class="ml5" v-text="seleArrName[1]"></span><Icon @click="resSeleDel(1)" class="ml5 hand" color="#ed3f14" type="close"></Icon></span>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="pl20 pr20">
          <Table stripe align="center" :loading="seleList.loading" :columns="seleList.header" :data="seleList.bodyList"></Table>
        </Col>
      </Row>
      <Row>
        <Col span="12" offset="6" class="tc pt10">
          <Page simple :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-total @on-change="reschangePage"></Page>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/page/caseInfo/children/children/alertBtnInfo'
import regi from '@/config/regiType.js'

export default {
  name: 'right_arbi',
  props: ['caseId', 'caseOldId', 'caseState', 'partieType'],
  components: { spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: false,
      progressText: null,
      logo: {
        url: require('../../static/images/logoR.png')
      },
      arbiInfoShow: false,
      arbiInfo: null,
      dataInfoShow: false,
      dataInfo: null,
      addSubmit: false,
      alertShow: {
        avoi: false,
        retr: false,
        sele: false,
        repl: false,
        coun: false,
        righ: false,
        reSub: false
      },
      dataObj: {
        avoi: null,
        avoiObj: null,
        retr: null,
        sele: null,
        repl: null,
        coun: null,
        righ: null,
        reSub: false
      },
      seleList: {
        loading: false,
        header: [
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '擅长领域',
            key: 'professional',
            align: 'center'
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return this.renderCheck(h, params)
            }
          }
        ],
        bodyList: []
      },
      seleArr: [],
      seleArrName: [],
      pageObj: {
        total: 0,
        pageNum: 1,
        pageSize: 5
      },
      searchText: ''
    }
  },
  created () {
    if (this.caseId !== '' && this.caseOldId !== '') {
      this.resCaseItem()
      this.resArbiItem()
    }
    this.$watch('searchText', this.debounce(this.resSearch, 1000))
  },
  computed: {
    ...mapGetters([
      'myCaseState',
      'myCaseShowBtn'
    ]),
    dataMap () {
      return regi.dataMap
    },
    resAction () {
      return regi.api + '/case/withdraw'
    },
    retrData () {
      let _data = {}
      _data.caseId = this.caseOldId
      return _data
    },
    seleShow () {
      if (this.dataInfo === null) {
        return false
      } else {
        if (this.dataInfo.money === null) {
          return false
        } else if (this.dataInfo.money < 1000000) {
          return false
        } else if (this.dataInfo.money >= 1000000) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'setCaseId',
      'setMyCaseShowBtn'
    ]),
    renderCheck (h, params) {
      let _id = params.row.id
      if (this.seleArr.indexOf(_id) === -1) {
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
    },
    resCaseItem () {
      axios.post('/case/queryCaseItem', {
        id: this.caseId
      }).then(res => {
        this.dataInfo = res.data.data
        this.dataInfoShow = true
      }).catch(e => {
        this.dataInfoShow = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    resArbiItem () {
      axios.post('/case/findArbitrationItem', {
        oldId: this.caseOldId
      }).then(res => {
        this.arbiInfo = res.data.data
        this.arbiInfoShow = true
      }).catch(e => {
        this.arbiInfoShow = false
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    reSubClick () {
      this.alertShow.reSub = true
    },
    reSubSave () {
      axios.post('/case/reSubmitCase', {
        caseId: this.caseId
      }).then(res => {
        this.alertCanc('reSub')
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
        this.$router.push({
          path: '/home'
        })
      }).catch(e => {
        this.alertCanc('reSub')
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    avoidClick () {
      axios.post('/case/selectArbitrator', {
        pageIndex: 0,
        pageSize: 10,
        id: this.caseId
      }).then(res => {
        let _res = res.data.data.dataList
        this.dataObj.avoiObj = {}
        this.dataObj.avoiObj.idArr = []
        this.dataObj.avoiObj.nameArr = []
        this.dataObj.avoiObj.statusArr = []
        for (let k in _res) {
          this.dataObj.avoiObj.idArr.push(_res[k].id)
          this.dataObj.avoiObj.nameArr.push(_res[k].name)
          this.dataObj.avoiObj.statusArr.push(false)
        }
        if (this.dataObj.avoiObj.idArr !== []) {
          this.alertShow.avoi = true
        } else {
          this.$Message.warning({
            content: '获取仲裁员列表出错,请稍后再试',
            duration: 5
          })
        }
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    avoiSave () {
      if (this.dataObj.avoi === null) {
        this.$Message.warning({
          content: '回避原因不能为空',
          duration: 5
        })
      } else if (this.dataObj.avoi === '') {
        this.$Message.warning({
          content: '回避原因不能为空',
          duration: 5
        })
      } else {
        if (this.dataObj.avoiObj.idArr.length < 2) {
          if (this.dataObj.avoiObj.statusArr[0] === false) {
            this.$Message.warning({
              content: '请先勾选一个仲裁员',
              duration: 5
            })
          } else {
            axios.post('/case/applyAvoid', {
              id: this.caseId,
              reason: this.dataObj.avoi,
              partyType: this.partieType,
              ids: this.dataObj.avoiObj.idArr.join(',')
            }).then(res => {
              let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
              _showBtnObj.debarbArbitrator = 0
              this.setMyCaseShowBtn(_showBtnObj)
              window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
              this.alertCanc('avoi')
              this.$Message.success({
                content: '操作成功',
                duration: 2
              })
            }).catch(e => {
              this.alertCanc('avoi')
              this.$Message.error({
                content: '错误信息:' + e,
                duration: 5
              })
            })
          }
        } else if (this.dataObj.avoiObj.idArr.length > 2) {
          if (this.dataObj.avoiObj.statusArr[0] === false && this.dataObj.avoiObj.statusArr[1] === false && this.dataObj.avoiObj.statusArr[2] === false) {
            this.$Message.warning({
              content: '最少选择一个仲裁员进行回避',
              duration: 5
            })
          } else {
            if (this.dataObj.avoiObj.statusArr[0] === false) {
              this.dataObj.avoiObj.idArr[0] = -1
            }
            if (this.dataObj.avoiObj.statusArr[1] === false) {
              this.dataObj.avoiObj.idArr[1] = -1
            }
            if (this.dataObj.avoiObj.statusArr[2] === false) {
              this.dataObj.avoiObj.idArr[2] = -1
            }
            axios.post('/case/applyAvoid', {
              id: this.caseId,
              reason: this.dataObj.avoi,
              partyType: this.partieType,
              ids: this.dataObj.avoiObj.idArr.join(',')
            }).then(res => {
              let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
              _showBtnObj.debarbArbitrator = 0
              this.setMyCaseShowBtn(_showBtnObj)
              window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
              this.alertCanc('avoi')
              this.$Message.success({
                content: '操作成功',
                duration: 2
              })
            }).catch(e => {
              this.alertCanc('avoi')
              this.$Message.error({
                content: '错误信息:' + e,
                duration: 5
              })
            })
          }
        } else {
          this.$Message.warning({
            content: '仲裁员人数有误，请稍后再试',
            duration: 5
          })
        }
      }
    },
    retractClick () {
      this.alertShow.retr = true
    },
    resFormError () {
      this.$Message.error({
        content: '文件格式错误只支持 jpg、jpeg、png、doc、docx、pdf',
        duration: 5
      })
    },
    resSizeError () {
      this.$Message.error({
        content: '文件不能超过10MB',
        duration: 5
      })
    },
    resBefoUpload (file) {
      this.dataObj.retr = file
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
      if (res.flag === false) {
        this.spinShow = false
        this.alertCanc('retr')
        this.$Message.error({
          content: '错误信息:' + res.message + ' 稍后再试',
          duration: 5
        })
      } else {
        let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
        _showBtnObj.revocation = 0
        this.setMyCaseShowBtn(_showBtnObj)
        window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
        this.progressText = '100%'
        this.spinShow = false
        this.alertCanc('retr')
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
      }
    },
    resError (error, file) {
      this.spinShow = false
      this.alertCanc('retr')
      this.$Message.error({
        content: '错误信息:' + error.status + ' 稍后再试',
        duration: 5
      })
    },
    retrSave () {
      this.spinShow = true
      if (this.dataObj.retr === null) {
        axios.post('/case/withdraw', this.retrData).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.revocation = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.spinShow = false
          this.alertCanc('retr')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.spinShow = false
          this.alertCanc('retr')
          this.$Message.error({
            content: '错误信息:' + e + ' 稍后再试',
            duration: 5
          })
        })
      } else {
        this.$refs.upload.post(this.dataObj.retr)
      }
    },
    debounce (fn, idle) {
      let setTm
      if (!idle || idle <= 0) return fn
      return () => {
        clearTimeout(setTm)
        setTm = setTimeout(fn.bind(this, ...arguments), idle)
      }
    },
    resSearch () {
      if (!this.seleShow) {
        this.seleArr = ['']
        this.seleArrName = ['']
      } else {
        this.seleArr = ['', '']
        this.seleArrName = ['', '']
      }
      this.pageObj.pageNum = 1
      this.resArbitrator()
    },
    selectClick () {
      this.pageObj.pageNum = 1
      this.seleArr = this.seleShow === true ? ['', ''] : ['']
      this.seleArrName = this.seleShow === true ? ['', ''] : ['']
      this.alertShow.sele = true
      this.resArbitrator()
    },
    resArbitrator () {
      axios.post('/case/selectArbitrator', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize,
        keyword: this.searchText
      }).then(res => {
        this.seleList.bodyList = res.data.data.dataList === null ? [] : res.data.data.dataList
        this.pageObj.total = res.data.data.totalCount
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resArbitrator()
    },
    resSeleDel (num) {
      this.seleArr[num] = ''
      this.seleArrName[num] = ''
      this.resArbitrator()
    },
    seleArrChange (index, bool) {
      let _id = this.seleList.bodyList[index].id
      let _name = this.seleList.bodyList[index].name
      let _num = this.seleShow === true ? '二' : '一'
      if (bool) {
        if (this.seleArr.indexOf(_id) === -1) {
          let _t = false
          for (let k in this.seleArr) {
            if (this.seleArr[k] === '') {
              this.seleArr[k] = _id
              this.seleArrName[k] = _name
              this.seleArr.splice(k, 0)
              this.seleArrName.splice(k, 0)
              _t = true
              break
            }
          }
          if (!_t) {
            this.$Message.error({
              content: '仲裁员最多只能选择' + _num + '位！',
              duration: 5
            })
          }
        }
      } else {
        if (this.seleArr.indexOf(_id) !== -1) {
          this.seleArrName.splice(this.seleArr.indexOf(_id), 1, '')
          this.seleArr.splice(this.seleArr.indexOf(_id), 1, '')
        }
      }
    },
    seleSave () {
      if (this.seleArr.length === 0) {
        this.$Message.success({
          content: '请选择仲裁员',
          duration: 5
        })
      } else {
        axios.post('/case/appointArbitrator', {
          caseId: this.caseId,
          ids: this.seleArr.join(','),
          partyType: this.partieType
        }).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.changeArbitrator = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.pageObj.pageNum = 1
          this.seleArr = []
          this.alertCanc('sele')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.pageObj.pageNum = 1
          this.seleArr = []
          this.alertCanc('sele')
          this.$Message.error({
            content: '错误信息:' + e + ' 稍后再试',
            duration: 5
          })
        })
      }
    },
    replClick () {
      this.alertShow.repl = true
    },
    replSave () {
      if (this.dataObj.repl === null) {
        this.$Message.warning({
          content: '补正原因不能为空',
          duration: 5
        })
      } else if (this.dataObj.repl === '') {
        this.$Message.warning({
          content: '补正原因不能为空',
          duration: 5
        })
      } else {
        axios.post('/case/applyAdditions', {
          caseId: this.caseId,
          reason: this.dataObj.repl,
          partyType: this.partieType
        }).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.applyCorrect = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.alertCanc('repl')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.alertCanc('repl')
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    counteClick () {
      this.alertShow.coun = true
    },
    counSave () {
      axios.post('/case/counterclaim', {
        id: this.caseId
      }).then(res => {
        this.alertCanc('coun')
        window.localStorage.setItem('caseId', res.data.data.id)
        this.setCaseId(res.data.data.id)
        this.$router.push({
          path: '/filing'
        })
      }).catch(e => {
        this.alertCanc('coun')
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    rightOfJClick () {
      this.alertShow.righ = true
    },
    righSave () {
      if (this.dataObj.righ === null) {
        this.$Message.warning({
          content: '管辖权异议原因不能为空',
          duration: 5
        })
      } else if (this.dataObj.righ === '') {
        this.$Message.warning({
          content: '管辖权异议原因不能为空',
          duration: 5
        })
      } else {
        axios.post('/case/dissidence', {
          id: this.caseId,
          reason: this.dataObj.righ
        }).then(res => {
          let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
          _showBtnObj.rightOfJurisdiction = 0
          this.setMyCaseShowBtn(_showBtnObj)
          window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
          this.alertCanc('righ')
          this.$Message.success({
            content: '操作成功',
            duration: 2
          })
        }).catch(e => {
          this.alertCanc('righ')
          this.$Message.error({
            content: '错误信息:' + e,
            duration: 5
          })
        })
      }
    },
    alertCanc (type) {
      this.alertShow[type] = false
      this.dataObj[type] = null
      if (type === 'sele') {
        this.seleArr = []
        this.seleArrName = []
        this.searchText = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.rightArbi {
  padding-left: 6px;
  ._caseInfo {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._arbiInfo ._top, ._caseInfo ._top {
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._arbiInfo ._mid, ._caseInfo ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    margin-top: 10px;
    background: #fff;
    padding: 10px 0;
    p {
      padding: 5px 0;
    }
  }
  ._myCaseSub {
    ._saveBtn {
      @include btn(#126eaf, 140px, 13px, 40px);
      @include boxShadow(0 1px 6px -1px #bbb);
      @include borderRadius(4px);
      margin-bottom: 20px;
    }
    ._saveBtn._disabled {
      @include btn(#ccc, 140px, 13px, 40px);
    }
    ._saveBtn:focus {
      outline: 0px;
    }
  }
  ._logo {
    padding: 5px 0;
    text-align: center;
  }
}
</style>
