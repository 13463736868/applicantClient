<template>
  <div class="caseInfo">
    <head-top :isRegister="true">
      <span class="f36 fcf">案件详情</span>
    </head-top>
    <div class="_center">
      <Row>
        <Col span="4" offset="1" class="_center_left not_s">
          <router-link v-for="item in menuClaim" :to='{path: "/caseInfo" + item.url}' :key="item.id" tag="li" v-text="item.text"></router-link>
        </Col>
        <Col span="14" class="_center_right">
          <router-view :caseId="myCaseId" :caseOldId="myCaseOldId" :caseState="myCaseState" :partieType="myCasePartieType"></router-view>
        </Col>
        <Col span="4">
          <right-arbi :caseId="myCaseId" :caseOldId="myCaseOldId" :caseState="myCaseState" :partieType="myCasePartieType"></right-arbi>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import headTop from '@/components/header/head'
import rightArbi from '@/page/caseInfo/children/rightArbi'

export default {
  name: 'caseInfo',
  components: { headTop, rightArbi },
  data () {
    return {
      menuClaim: [],
      menuClaimA: [
        {
          id: '0',
          text: '基本信息',
          url: '/basicInfo'
        },
        {
          id: '1',
          text: '申请方',
          url: '/proposerInfo'
        },
        {
          id: '2',
          text: '被申请方',
          url: '/respondentInfo'
        },
        {
          id: '4',
          text: '仲裁员选定',
          url: '/revClaimItem'
        },
        {
          id: '3',
          text: '请求答辩(反请求答辩)',
          url: '/claimItem'
        },
        {
          id: '5',
          text: '仲裁审理',
          url: '/evidencesInfo'
        }
      ],
      menuClaimB: [
        {
          id: '0',
          text: '基本信息',
          url: '/basicInfo'
        },
        {
          id: '1',
          text: '申请方',
          url: '/proposerInfo'
        },
        {
          id: '2',
          text: '被申请方',
          url: '/respondentInfo'
        },
        {
          id: '4',
          text: '仲裁员选定',
          url: '/revClaimItem'
        },
        {
          id: '3',
          text: '请求答辩(反请求答辩)',
          url: '/claimItem'
        },
        {
          id: '5',
          text: '仲裁审理',
          url: '/evidencesInfo'
        },
        {
          id: '6',
          text: '送达',
          url: '/sendInfo'
        }
      ],
      menuClaimC: [
        {
          id: '0',
          text: '基本信息',
          url: '/basicInfo'
        },
        {
          id: '1',
          text: '申请方',
          url: '/proposerInfo'
        },
        {
          id: '2',
          text: '被申请方',
          url: '/respondentInfo'
        },
        {
          id: '4',
          text: '仲裁员选定',
          url: '/revClaimItem'
        },
        {
          id: '3',
          text: '请求答辩(反请求答辩)',
          url: '/claimItem'
        },
        {
          id: '5',
          text: '仲裁审理',
          url: '/evidencesInfo'
        },
        {
          id: '6',
          text: '裁决书',
          url: '/endCaseInfo'
        },
        {
          id: '7',
          text: '送达',
          url: '/sendInfo'
        }
      ],
      menuClaimD: [
        {
          id: '0',
          text: '基本信息',
          url: '/basicInfo'
        },
        {
          id: '1',
          text: '申请方',
          url: '/proposerInfo'
        },
        {
          id: '2',
          text: '被申请方',
          url: '/respondentInfo'
        },
        {
          id: '4',
          text: '仲裁员选定',
          url: '/revClaimItem'
        },
        {
          id: '3',
          text: '请求答辩(反请求答辩)',
          url: '/claimItem'
        },
        {
          id: '5',
          text: '仲裁审理',
          url: '/evidencesInfo'
        },
        {
          id: '6',
          text: '裁决书',
          url: '/endCaseInfo'
        }
      ],
      stateA: [1, 2, 3, 9, '1', '2', '3', '9'],
      stateB: [4, 5, 99, '4', '5', '99'],
      stateC: [7, 98, '7', '98'],
      stateD: [6, '6']
    }
  },
  created () {
    if (this.myCaseId === '' || this.myCaseOldId === '') {
      this.$router.push({
        path: '/home'
      })
      return
    }
    if (this.stateA.indexOf(this.myCaseState) !== -1) {
      this.menuClaim = this.menuClaimA
    } else if (this.stateB.indexOf(this.myCaseState) !== -1) {
      this.menuClaim = this.menuClaimB
    } else if (this.stateC.indexOf(this.myCaseState) !== -1) {
      this.menuClaim = this.menuClaimC
    } else if (this.stateD.indexOf(this.myCaseState) !== -1) {
      this.menuClaim = this.menuClaimD
    } else {
      this.menuClaim = this.menuClaimA
    }
  },
  computed: {
    ...mapGetters([
      'myCaseId',
      'myCaseOldId',
      'myCaseState',
      'myCasePartieType'
    ])
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
  ._center_left {
    text-align: left;
    li {
      @include hand;
      margin-left: 30px;
      margin-bottom: 8px;
      padding-left: 8px;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      border-left: 4px solid transparent;
    }
    li.router-link-exact-active {
      border-left: 4px solid #1a2b58;
      padding-left: 8px;
    }
  }
}
</style>
