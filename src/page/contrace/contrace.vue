<template>
  <div class="contrace">
    <head-top :isRegister="true">
      <span class="f36 fcf">合作列表管理</span>
    </head-top>
    <div class="_center pr">
      <spin-comp :spinShow="spinShow"></spin-comp>
      <Row class="mb20">
        <Col span="2" offset="22">
          <Button type="primary" @click="resAdd">添加</Button>
        </Col>
      </Row>
      <div class="_payList clearfix">
        <Row>
          <Col span="24" class="pl20 pr20">
            <Table stripe border align="center" :loading="payList.loading" :columns="payList.header" :data="payList.bodyList"></Table>
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
    <alert-btn-info :alertShow="alertShow.add" @alertCancel="alertCanc('add')" @alertConfirm="addSave" alertTitle="操作">
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>合作公司：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="arbiId" filterable @on-query-change="resChangeQuer">
            <Option v-for="item in arbiListFilter" :value="item.id" :key="item.id">{{ item.orgName }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>合同类型：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="caseTypeId">
            <Option :disabled="item.status === 2" v-for="item in caseTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>有效期：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="longTerm">
            <Option :value="1" :key="1">长期</Option>
            <Option :value="2" :key="2">时间段</Option>
          </Select>
        </Col>
      </Row>
      <template v-if="longTerm === 2">
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>开始日期：</b></p>
          </Col>
          <Col span="16">
            <DatePicker class="wmax" @on-change="changeDateStart" type="date" confirm placeholder="请选择开始日期"></DatePicker>
          </Col>
        </Row>
        <Row class="_labelFor">
          <Col span="6" offset="1">
            <p><span class="_span">*</span><b>结束日期：</b></p>
          </Col>
          <Col span="16">
            <DatePicker class="wmax" @on-change="changeDateEnd" type="date" confirm placeholder="请选择结束日期"></DatePicker>
          </Col>
        </Row>
      </template>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.state" @alertCancel="alertCanc('state')" @alertConfirm="stateSave" alertTitle="提示">
      <p v-if="alertShow.stateN === 1">确定要启用吗？</p>
      <p v-if="alertShow.stateN === 2">确定要停用吗？</p>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.del" @alertCancel="alertCanc('del')" @alertConfirm="delSave" alertTitle="提示">
      <p>确定要删除这个合作关系吗？</p>
    </alert-btn-info>
  </div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'
import alertBtnInfo from '@/components/common/alertBtnInfo'

export default {
  name: 'contrace',
  components: { headTop, spinComp, alertBtnInfo },
  data () {
    return {
      spinShow: true,
      payList: {
        loading: false,
        header: [
          {
            title: '合作单位',
            key: 'orgName',
            align: 'center'
          },
          {
            title: '接收管理员',
            key: 'masterName',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '合同类型',
            key: 'casetypeName',
            align: 'center'
          },
          {
            title: '有效期',
            key: 'longTerm',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.longTerm === 1 ? '长期' : (params.row.longTerm === 2 ? params.row.beginTime.substr(0, 10) + ' ~ ' + params.row.endTime.substr(0, 10) : '未知状态'))
            }
          },
          {
            title: '审核状态',
            key: 'zt',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.zt === 1 ? '待审核' : (params.row.zt === 2 || params.row.zt === 0 ? '审核通过' : (params.row.zt === 3 ? '审核未通过' : '未知状态')))
            }
          },
          {
            title: '状态',
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h('span', {
              }, params.row.state === 1 ? '启用' : (params.row.state === 2 ? '停用' : '未知状态'))
            }
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              if (params.row.zt === 1 || params.row.zt === 3) {
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
                        this.resEdit(params.index)
                      }
                    }
                  }, '修改'),
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
                        this.resDel(params.index)
                      }
                    }
                  }, '删除'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.resState(params.index)
                      }
                    }
                  }, params.row.state === 1 ? '停用' : (params.row.state === 2 ? '启用' : '未知'))
                ])
              } else {
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
                        this.resDel(params.index)
                      }
                    }
                  }, '删除'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.resState(params.index)
                      }
                    }
                  }, params.row.state === 1 ? '停用' : (params.row.state === 2 ? '启用' : '未知'))
                ])
              }
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
      arbiId: null,
      arbiList: [],
      arbiListFilter: [],
      caseTypeId: null,
      caseTypeList: [],
      longTerm: null,
      beginTime: '',
      endTime: '',
      alertShow: {
        del: false,
        id: null,
        add: false,
        state: false,
        stateN: null
      }
    }
  },
  created () {
    this.resPayList()
  },
  methods: {
    resPayList () {
      this.spinShow = true
      axios.post('/MaCustomerTypeUserController/list', {
        pageNum: this.pageObj.pageNum,
        pageSize: this.pageObj.pageSize
      }).then(res => {
        let _data = res.data.data
        this.payList.bodyList = _data.dataList === null ? [] : _data.dataList
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
      this.resPayList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resPayList()
    },
    resChangeQuer (querys) {
      let query = querys.replace(/(^\s*)|(\s*$)/g, '')
      if (query === '') {
        this.arbiListFilter = []
      } else {
        this.arbiListFilter = this.arbiList.filter(a => a.orgName === query)
      }
    },
    changeDateStart (val) {
      this.beginTime = val
    },
    changeDateEnd (val) {
      this.endTime = val
    },
    resEdit (index) {
      let _obj = this.payList.bodyList[index]
      this.arbiId = _obj.orgId
      this.caseTypeId = _obj.casetypeId
      this.longTerm = _obj.longTerm
      this.alertShow.id = _obj.id
      this.resAdd()
    },
    resAdd () {
      axios.post('/caseType/list').then(res => {
        let _dataList = res.data.data
        this.caseTypeList = _dataList.map((a, b) => {
          let _o = {}
          _o.value = a.id
          _o.label = a.caseTypeName
          _o.status = a.status
          return _o
        })
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
      axios.post('/MaCustomerTypeUserController/orglist').then(res => {
        this.arbiList = res.data.data
        this.arbiListFilter = this.arbiList.filter(a => a.id === this.arbiId)
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
      this.alertShow.add = true
    },
    addSave () {
      if (this.arbiId === null || this.arbiId === undefined) {
        this.$Message.warning({
          content: '请先选择一个合作公司',
          duration: 5
        })
        return false
      } else if (this.caseTypeId === null || this.caseTypeId === undefined) {
        this.$Message.warning({
          content: '请先选择一个合同类型',
          duration: 5
        })
        return false
      } else if (this.longTerm === null) {
        this.$Message.warning({
          content: '请先选择一个有效期',
          duration: 5
        })
        return false
      } else if (this.longTerm === 2) {
        if (this.beginTime === '') {
          this.$Message.warning({
            content: '请先选择开始日期',
            duration: 5
          })
        } else if (this.endTime === '') {
          this.$Message.warning({
            content: '请先选择结束日期',
            duration: 5
          })
        } else {
          let beginT = this.beginTime.substr(0, 10).split('-').join('')
          let endT = this.endTime.substr(0, 10).split('-').join('')
          if (endT - beginT < 0) {
            this.$Message.warning({
              content: '结束时间不能小于开始时间',
              duration: 5
            })
          } else {
            this.addSaves()
          }
        }
      } else {
        this.addSaves()
      }
    },
    addSaves () {
      let _data = {
        orgId: this.arbiId,
        casetypeId: this.caseTypeId,
        longTerm: this.longTerm
      }
      if (this.alertShow.id !== null) {
        _data.id = this.alertShow.id
      }
      if (this.longTerm === 2) {
        _data.beginTime = this.beginTime + ' 00:00:00'
        _data.endTime = this.endTime + ' 23:59:59'
      }
      this.alertShow.add = false
      axios.post('/MaCustomerTypeUserController/add/' + (this.alertShow.id === null ? '1' : '2'), _data).then(res => {
        this.resSearch()
        this.alertCanc('add')
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
    resState (index) {
      this.alertShow.id = this.payList.bodyList[index].id
      this.alertShow.stateN = this.payList.bodyList[index].state === 1 ? 2 : 1
      this.alertShow.state = true
    },
    stateSave () {
      axios.post('/MaCustomerTypeUserController/updateState', {
        id: this.alertShow.id,
        state: this.alertShow.stateN
      }).then(res => {
        this.resSearch()
        this.alertCanc('state')
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resDel (index) {
      this.alertShow.id = this.payList.bodyList[index].id
      this.alertShow.del = true
    },
    delSave () {
      this.alertShow.del = false
      axios.post('/MaCustomerTypeUserController/delete', {
        id: this.alertShow.id
      }).then(res => {
        this.resSearch()
        this.alertCanc('del')
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
    alertCanc (type) {
      switch (type) {
        case 'state':
          this.alertShow.id = null
          this.alertShow.stateN = null
          this.alertShow.state = false
          break
        case 'del':
          this.alertShow.id = null
          this.alertShow.del = false
          break
        case 'add':
          this.alertShow.add = false
          this.arbiId = null
          this.caseTypeId = null
          this.arbiList = []
          this.arbiListFilter = []
          this.caseTypeList = []
          this.longTerm = null
          this.alertShow.id = null
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
  ._payList {
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
</style>
