<template>
  <div class="home">
    <head-top :isRegister="true">
      <span class="f36 fcf">我的案件</span>
    </head-top>
    <div class="_center pr">
      <Tabs v-model="tabStatus">
        <TabPane label="在线程序" name="onlineHome">
          <online-home></online-home>
        </TabPane>
        <TabPane label="线下程序" name="archiveHome">
          <archive-home></archive-home>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import archiveHome from '@/page/home/children/archiveHome'
import onlineHome from '@/page/home/children/onlineHome'

export default {
  name: 'home',
  components: { headTop, archiveHome, onlineHome },
  data () {
    return {
      tabStatus: 'onlineHome'
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
}
</style>
