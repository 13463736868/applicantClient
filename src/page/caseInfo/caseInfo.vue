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
          <router-view></router-view>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'

export default {
  name: 'caseInfo',
  components: { headTop },
  data () {
    return {
      menuClaim: [
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
          id: '3',
          text: '请求和答辩',
          url: '/claimInfo'
        },
        {
          id: '4',
          text: '反请求和答辩',
          url: '/revClaimInfo'
        },
        {
          id: '5',
          text: '证据和质证',
          url: '/evidencesInfo'
        },
        {
          id: '6',
          text: '送达',
          url: '/sendInfo'
        },
        {
          id: '7',
          text: '结案',
          url: '/endCaseInfo'
        }
      ]
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
  ._center_left {
    text-align: left;
    li {
      @include hand;
      margin-left: 75px;
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
