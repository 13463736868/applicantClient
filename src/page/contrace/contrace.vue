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
          <Select v-model="arbiId" @on-change="resChangeArbi('change')">
            <Option v-for="item in arbiList" :value="item.id" :key="item.id">{{ item.orgName }}</Option>
          </Select>
        </Col>
      </Row>
      <Row class="_labelFor" v-if="arbiId !== null">
        <Col span="6" offset="1">
          <p><span class="_span">*</span><b>公司旗下人员：</b></p>
        </Col>
        <Col span="16">
          <Select v-model="compUserId">
            <Option v-for="item in compUserList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Col>
      </Row>
    </alert-btn-info>
    <alert-btn-info :alertShow="alertShow.del" @alertCancel="alertCanc('del')" @alertConfirm="delSave" alertTitle="提示">
      <p>确定要删除这个合作关系吗</p>
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
            title: '接收员工',
            key: 'masterName',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center'
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
                    on: {
                      click: () => {
                        this.resDel(params.index)
                      }
                    }
                  }, '删除')
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
                        this.resDel(params.row.filepath)
                      }
                    }
                  }, '删除')
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
      compUserId: null,
      compUserList: [],
      alertShow: {
        del: false,
        id: null,
        add: false
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
    resChangeArbi (type) {
      if (type === 'change') {
        this.compUserId = null
      }
      axios.post('/MaCustomerTypeUserController/queryMauser', {
        id: this.arbiId
      }).then(res => {
        this.compUserList = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    },
    resEdit (index) {
      let _obj = this.payList.bodyList[index]
      this.arbiId = _obj.orgid
      this.compUserId = _obj.masterId
      this.alertShow.id = _obj.id
      this.resAdd()
      this.resChangeArbi('edit')
    },
    resAdd () {
      axios.post('/MaCustomerTypeUserController/orglist').then(res => {
        this.arbiList = res.data.data
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
      } else if (this.compUserId === null || this.compUserId === undefined) {
        this.$Message.warning({
          content: '请先选择公司旗下人员',
          duration: 5
        })
        return false
      } else {
        let _data = {
          orgid: this.arbiId,
          mauserid: this.compUserId
        }
        if (this.alertShow.id !== null) {
          _data.id = this.alertShow.id
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
          this.$Message.error({
            content: '错误信息:' + e + ' 稍后再试',
            duration: 5
          })
        })
      }
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
        case 'del':
          this.alertShow.id = null
          this.alertShow.del = false
          break
        case 'add':
          this.alertShow.add = false
          this.arbiId = null
          this.compUserId = null
          this.arbiList = []
          this.compUserList = []
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
