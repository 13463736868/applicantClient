<template>
  <div class="resSeleArbi">
    <Row>
      <Col class="_listL" span="24">
         <Row class="mb20 mt10">
          <Col span="3" offset="1">
            <label class="lh25 f12 fb fl mr15">搜 索 :</label>
          </Col>
          <Col span="8">
            <Input :maxlength="15" size="small" v-model.trim="searchText" icon="ios-search-strong" placeholder=""></Input>
          </Col>
        </Row>
        <Row class="pb10" v-if="seleShow">
          <Col span="20" offset="1">
            <span><b>主 裁： </b></span>
            <span v-if="seleArrName[0]"><span class="ml5" v-text="seleArrName[0]"></span><Icon @click="resSeleDel(0)" class="ml5 hand" color="#ed3f14" type="close"></Icon></span>
          </Col>
          <Col span="20" offset="1">
            <span><b>边 裁：</b></span>
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
        <div v-if="myCaseShowBtn !== null" class="tr pr20">
          <Button v-if="myCaseShowBtn.changeArbitrator === 1" type="primary" size="large" @click="seleSave">确定</Button>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import { resTimeOut } from '@/components/common/mixin.js'

export default {
  name: 'resSeleArbi',
  mixins: [resTimeOut],
  props: ['caseId', 'partieType'],
  data () {
    return {
      dataInfo: false,
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
            key: 'sign',
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
      this.selectClick()
      this.resArbitrator()
    }
    this.$watch('searchText', this.debounce(this.resSearch, 1000))
  },
  computed: {
    ...mapGetters([
      'myCaseShowBtn'
    ]),
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
      'setMyCaseShowBtn'
    ]),
    resCaseItem () {
      axios.post('/case/queryCaseItem', {
        id: this.caseId
      }).then(res => {
        this.dataInfo = res.data.data
      }).catch(e => {
        this.$Message.error({
          content: '错误信息:' + e,
          duration: 5
        })
      })
    },
    renderCheck (h, params) {
      let _id = params.row.id
      if (this.myCaseShowBtn.changeArbitrator === 1) {
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
      }
    },
    resSearch () {
      if (!this.seleShow) {
        this.seleArr = []
        this.seleArrName = []
      }
      this.pageObj.pageNum = 1
      this.resArbitrator()
    },
    selectClick () {
      this.pageObj.pageNum = 1
      this.seleArr = this.seleShow === true ? ['', ''] : ['']
      this.seleArrName = this.seleShow === true ? ['', ''] : ['']
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
      for (var i = 0; i < this.seleArr.length; i++) {
        if (this.seleArr[i] === '') {
          this.$Message.success({
            content: '请选择仲裁员',
            duration: 5
          })
          return false
        }
      }
      axios.post('/case/appointArbitrator', {
        caseId: this.caseId,
        ids: this.seleArr.join(','),
        partyType: this.partieType
      }).then(res => {
        let _showBtnObj = JSON.parse(JSON.stringify(this.myCaseShowBtn))
        _showBtnObj.changeArbitrator = 0
        this.setMyCaseShowBtn(_showBtnObj)
        window.localStorage.setItem('myCaseShowBtn', JSON.stringify(_showBtnObj))
        this.selectClick()
        this.$Message.success({
          content: '操作成功',
          duration: 2
        })
      }).catch(e => {
        this.selectClick()
        this.$Message.error({
          content: '错误信息:' + e + ' 稍后再试',
          duration: 5
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.resSeleArbi {
  margin-top: 10px;
  ._listL {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    background: #fff;
    padding: 10px 0;
  }
}
</style>
