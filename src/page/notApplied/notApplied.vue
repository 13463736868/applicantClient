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
          <Input v-model="search.text" icon="ios-search-strong" placeholder="" class="_search" @on-click="resSearch" @keyup.enter.native="resSearch"></Input>
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
        </Row>
          <Col span="12" offset="6" class="tc">
            <Page :total="pageObj.total" :current="pageObj.pageNum" :page-size="pageObj.pageSize" show-elevator show-total @on-change="reschangePage"></Page>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import headTop from '@/components/header/head'
import spinComp from '@/components/common/spin'

export default {
  name: 'notApplied',
  components: { headTop, spinComp },
  data () {
    return {
      spinShow: true,
      search: {
        text: ''
      },
      caseList: {
        loading: false,
        header: [
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
      }
    }
  },
  created () {
    this.resPrepareList()
  },
  methods: {
    ...mapActions([
      'setCaseId'
    ]),
    resPrepareList () {
      this.spinShow = true
      axios.post('/case/prepareList', {
        pageIndex: (this.pageObj.pageNum - 1) * this.pageObj.pageSize,
        pageSize: this.pageObj.pageSize,
        keyword: this.search.text
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
    goCaseSee (index) {
      this.setCaseId(this.caseList.bodyList[index].id)
      window.localStorage.setItem('caseId', this.caseList.bodyList[index].id)
      this.$router.push({
        path: '/filing'
      })
    },
    resCaseDel (index) {
      axios.post('/case/delete', {
        id: this.caseList.bodyList[index].id
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
      console.log('案件删除操作')
    },
    resSearch () {
      this.pageObj.pageNum = 1
      this.resPrepareList()
    },
    reschangePage (page) {
      this.pageObj.pageNum = page
      this.resPrepareList()
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
</style>
