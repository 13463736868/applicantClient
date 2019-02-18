<template>
  <div class="caseType">
    <head-top :isRegister="true">
      <span class="f36 fcf">案件类型管理</span>
    </head-top>
    <div class="_center pr">
      <spin-comp :spinShow="spinShow"></spin-comp>
      <Row class="pb20">
        <Col span="2" class="tc" offset="21">
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
    <alert-btn-info :alertShow="alertObj.add"  @alertConfirm="addSave" @alertCancel="alertCanc('add')" alertTitle="操作">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>案件类型名称：</b></p>
        </Col>
        <Col span="16">
          <Input v-model="alertObj.caseTypeName"></Input>
        </Col>
      </Row>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/components/common/alertBtnInfo'

export default {
  name: 'case_type',
  components: { headTop, spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: true,
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
        caseTypeName: ''
      }
    }
  },
  created () {
    this.resCaseList()
  },
  methods: {
    resCaseList () {
      this.spinShow = true
      axios.post('/caseType/list', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize
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
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resCaseList()
    },
    resAdd () {
      this.alertObj.add = true
    },
    addSave () {
      if (this.alertObj.caseTypeName === '') {
        this.$Message.error({
          content: '案件类型名称不能为空',
          duration: 5
        })
        return false
      }
      this.alertObj.add = false
      axios.post('/caseType/add', {
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
    alertCanc (type) {
      switch (type) {
        case 'add':
          this.alertObj.add = false
          this.alertObj.caseTypeName = ''
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
    margin-bottom: 20px;
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
