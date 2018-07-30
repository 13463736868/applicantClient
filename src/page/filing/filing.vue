<template>
  <div class="filing">
    <head-top :isRegister="true">
      <span class="f36 fcf">立案申请</span>
    </head-top>
    <div class="_center">
      <Row>
        <Col span="4" offset="1" class="_center_left not_s">
          <router-link v-for="item in menuClaim" :to='{path: "/filing" + item.url}' :key="item.id" tag="li" v-text="item.text"></router-link>
        </Col>
        <Col span="17" class="_center_right">
          <router-view></router-view>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'

export default {
  name: 'filing',
  components: { headTop },
  data () {
    return {
      menuClaim: [
        {
          id: '0',
          text: '申请人',
          url: '/proposer'
        },
        {
          id: '1',
          text: '被申请人',
          url: '/respondent'
        },
        {
          id: '2',
          text: '请求',
          url: '/claimItems'
        },
        {
          id: '3',
          text: '证据',
          url: '/evidences'
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
  @include mw(1080px);
  @include bc;
  padding-top: 40px;
  ._center_left {
    text-align: left;
    li {
      @include hand;
      margin-left: 75px;
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
