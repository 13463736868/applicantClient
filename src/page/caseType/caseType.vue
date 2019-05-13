<template>
  <div class="caseType">
    <head-top :isRegister="true">
      <span class="f36 fcf">案件类型管理</span>
    </head-top>
    <div class="_center pr">
      <spin-comp :spinShow="spinShow"></spin-comp>
      <Row class="pb20">
        <Col span="2">
          <label class="lh32 f16 fc6 fr mr15">搜索</label>
        </Col>
        <Col span="8">
          <Input v-model="search.text" icon="ios-search-strong" class="_search" @on-click="resSearch" @keyup.enter.native="resSearch" placeholder="案件类型名称"></Input>
        </Col>
        <Col span="2" class="tc" offset="9">
          <Button type="primary" @click="resDocDow">下载通用模版</Button>
        </Col>
        <Col span="2" class="tc">
          <Button type="primary" @click="resAdd">添加</Button>
        </Col>
      </Row>
      <div class="_caseType clearfix">
        <Row>
          <Col span="24" class="pl20 pr20">
            <Table stripe border align="center" :loading="caseTypeList.loading" :columns="caseTypeList.header" :data="caseTypeList.bodyList"></Table>
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
    <alert-btn-info :isSaveBtn="true" :alertShow="alertObj.add" @alertSumbit="addSave('addAndSubmit')" @alertConfirm="addSave('add')" @alertCancel="alertCanc('add')" alertTitle="操作">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>案件类型名称：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="alertObj.caseTypeName"></Input>
        </Col>
      </Row>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertObj.sub" :isSubBtn="true" @alertConfirm="subSave" @alertCancel="alertCanc('sub')" alertTitle="操作">
      <p>确定要提交审核吗?</p>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/page/caseType/children/alertBtnInfo'
import regi from '@/config/regiType.js'

export default {
  name: 'case_type',
  components: { headTop, spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: true,
      search: {
        text: ''
      },
      caseTypeList: {
        loading: false,
        header: [
          {
            title: '案件类型名称',
            key: 'caseTypeName',
            align: 'center'
          },
          {
            title: '案件类型编码',
            key: 'caseTypeCode',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.status === 1 ? '未提交' : (params.row.status === 2 ? '已提交' : ''))
            }
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return this.renderBtn(h, params)
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
      alertObj: {
        add: false,
        caseTypeName: '',
        sub: false,
        caseTypeCode: ''
      }
    }
  },
  created () {
    this.resCaseList()
  },
  methods: {
    renderBtn (h, params) {
      let _obj = params.row
      if (_obj.status === 1) {
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
                this.goSubmit(params.index)
              }
            }
          }, '提交')
        ])
      } else if (_obj.status === 2 && _obj.importTemplateUrl !== null) {
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
                window.open(_obj.importTemplateUrl, '_blank')
              }
            }
          }, '下载模版')
        ])
      } else {
        return h('div', [
        ])
      }
    },
    resCaseList () {
      this.spinShow = true
      axios.post('/caseType/list', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize,
        caseTypeName: this.search.text
      }).then(res => {
        let _data = res.data.data
        this.caseTypeList.bodyList = _data.dataList === null ? [] : _data.dataList
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
    resSearch () {
      this.pageObj.pageNum = 1
      this.resCaseList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resCaseList()
    },
    resAdd () {
      this.alertObj.add = true
    },
    goSubmit (index) {
      this.alertObj.caseTypeCode = this.caseTypeList.bodyList[index].caseTypeCode
      this.alertObj.caseTypeName = this.caseTypeList.bodyList[index].caseTypeName
      this.alertObj.sub = true
    },
    subSave () {
      axios.post('/caseType/submit', {
        caseTypeName: this.alertObj.caseTypeName,
        caseTypeCode: this.alertObj.caseTypeCode
      }).then(res => {
        this.alertCanc('sub')
        this.resCaseList()
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
      }).catch(e => {
        this.alertCanc('sub')
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    addSave (type) {
      if (this.alertObj.caseTypeName === '') {
        this.$Message.error({
          content: '案件类型名称不能为空',
          duration: 5
        })
        return false
      }
      this.alertObj.add = false
      axios.post('/caseType/' + type, {
        caseTypeName: this.alertObj.caseTypeName
      }).then(res => {
        this.alertCanc('add')
        this.resCaseList()
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
      }).catch(e => {
        this.alertCanc('add')
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resDocDow () {
      window.open(regi.api + '/file/templet/dowload/2', '_blank')
    },
    alertCanc (type) {
      switch (type) {
        case 'add':
          this.alertObj.add = false
          this.alertObj.caseTypeName = ''
          break
        case 'sub':
          this.alertObj.sub = false
          this.alertObj.caseTypeName = ''
          this.alertObj.caseTypeCode = ''
          break
        default:
          break
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
  }
  ._caseType {
    margin-bottom: 20px;
  }
}
._labelFor {
  margin-bottom: 10px;
  p {
    padding: 7px 0;
  }
  ._span {
    color: #ff7a7a;
    vertical-align: text-top;
  }
}
</style>
