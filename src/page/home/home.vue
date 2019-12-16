<template>
  <div class="home">
    <head-top :isRegister="true">
      <span class="f36 fcf">{{tabStatus === 'applList' ? '我的案件' : '被申请案件'}}</span>
    </head-top>
    <Tabs v-model="tabStatus" class="_center">
      <TabPane name="applList" label="我的案件">
        <case-list></case-list>
      </TabPane>
      <TabPane name="respList" label="被申请案件">
        <resp-list></resp-list>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import caseList from '@/page/home/children/caseList'
import respList from '@/page/home/children/respList'

export default {
  name: 'home',
  components: { headTop, caseList, respList },
  data () {
    return {
      tabStatus: 'applList'
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
  padding-bottom: 40px;
}
</style>
