<template>
  <div class="proposer">
    <div class="_proposer">
      <div class="_top">申请人</div>
      <div v-if="listPropShow" class="_center">
        <div v-if="propData.type !== null" v-for="(item, index) in propData" :key="index">
          <Row v-if="item.type === 1" class="_list">
            <Col class="_listL" span="15">
              <Row>
                <Col span="22" offset="1">
                  <p><span class="mr10">姓名 :</span><span v-text="item.name"></span><span class="_icon"><Icon class="_edit" type="edit" @click="editProp(item.id)"></Icon><Icon @click="delProp(item.id)" class="_del" type="close-circled"></Icon></span></p>
                  <p><span class="mr10" v-text="propObj.idcardArr[item.idcardType === null?0:item.idcardType]"></span><span v-text="item.idcard"></span></p>
                  <p><span class="mr10">送达手机 :</span><span v-text="item.phone"></span></p>
                  <p><span class="mr10">送达邮箱 :</span><span v-text="item.email"></span></p>
                  <p><span class="mr10">联系地址 :</span><span v-text="item.adress"></span></p>
                </Col>
              </Row>
            </Col>
            <Col class="_listR clearfix" span="8" offset="1">
              <img class="_fileImg" :src="item.fileList[0].filepath" alt="" title="点击查看大图" @click="seeImg(item.fileList[0].filepath)">
            </Col>
          </Row>
          <Row v-else-if="item.type === 2">
            <Col>2</Col>
          </Row>
          <Row v-else-if="item.type === 3">
            <Col>3</Col>
          </Row>
          <Row v-else-if="item.type === 4">
            <Col>4</Col>
          </Row>
        </div>
      </div>
      <add-icon v-if="addPropShow" :imgStatus="1" addText="添加申请人" @addClick="addProp"></add-icon>
    </div>
    <div class="_agent">
      <div class="_top">代理人</div>
      <div v-if="listAgenShow" class="_center">
        111
      </div>
      <add-icon v-if="addAgenShow" :imgStatus="1" addText="添加代理人" @addClick="addAgen"></add-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import addIcon from '@/components/common/addIcon'

export default {
  name: 'proposer',
  props: [],
  components: { addIcon },
  data () {
    return {
      listPropShow: false,
      addPropShow: true,
      listAgenShow: false,
      addAgenShow: true,
      propData: {},
      propObj: {
        idcardArr: ['未知证件 :', '身份证 :', '军官证 :', '户口簿 :', '实习律师证 :', '律师职业证 :', '护照 :', '驾照 :']
      }
    }
  },
  created () {
    if (this.caseInfo !== null) {
      console.log(this.caseInfo.propList)
      this.propData = this.caseInfo.propList
      this.createList()
    }
  },
  computed: {
    ...mapGetters([
      'caseInfo'
    ])
  },
  methods: {
    seeImg (path) {
      window.open(path, '_blank')
    },
    addProp () {
      console.log('添加申请人')
    },
    editProp (id) {
      console.log(id)
    },
    delProp (id) {
      console.log(id)
    },
    addAgen () {
      console.log('添加代理人')
    },
    editAgen (id) {
      console.log(id)
    },
    delAgen (id) {
      console.log(id)
    },
    createList () {
      if (this.caseInfo.propList.length === 0) {
        this.listPropShow = false
      } else {
        this.listPropShow = true
      }
      if (this.caseInfo.proxyList.length === 0) {
        this.listAgenShow = false
      } else {
        this.listAgenShow = true
      }
    }
  },
  watch: {
    caseInfo: function (val) {
      console.log(val.propList)
      this.propData = val.propList
      this.createList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.proposer {
  width: 83%;
  ._agent {
    padding-top: 60px;
  }
  ._proposer ._top, ._agent ._top{
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._list {
    margin-top: 10px;
    ._listL, ._listR {
      @include borderRadius(3px);
      @include boxShadow(0 1px 6px -1px #bbb);
      background: #fff;
    }
    ._listL {
      padding: 10px 0;
      p {
        height: 28px;
        line-height: 28px;
      }
      ._icon {
        float: right;
        ._edit {
          @include hand;
          font-size: 16px;
          color: #126eaf
        }
        ._del {
          @include hand;
          font-size: 17px;
          color: #ff7a7a;
          margin-left: 15px;
        }
      }
    }
    ._listR {
      overflow: hidden;
      ._fileImg {
        @include hand;
        clear: both;
        display: block;
        margin: auto;
        height: 160px;
      }
    }
  }
}
</style>
