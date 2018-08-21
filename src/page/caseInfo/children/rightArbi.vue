<template>
  <div class="rightArbi">
    <div class="_arbiInfo">
      <div class="_top">仲裁委信息</div>
      <div class="_mid">
        <Row>
          <Col span="22" offset="1">
            <div class="_logo">
              <img :src="logo.url" alt="">
              <div class="f14 pt5"><b>中国盐城仲裁委员会</b></div>
              <div><b>YanCheng Arbitration Commission</b></div>
            </div>
            <p>
              <span class="mr10"><b>电话 :</b></span>
              <span class="mr10">0515-88123589</span>
            </p>
            <p>
              <span class="mr10"><b>地址 :</b></span>
              <span class="mr10">江苏省盐城市人民南路106号</span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
    <div class="_caseInfo">
      <div class="_top">案件信息</div>
      <div class="_mid">
        <Row>
          <Col span="22" offset="1">
            <p>
              <span class="mr10"><b>仲裁机构 :</b></span>
              <span class="mr10">盐城仲裁委</span>
            </p>
            <p>
              <span class="mr10"><b>纠纷类型 :</b></span>
              <span class="mr10">民间借贷</span>
            </p>
            <p>
              <span class="mr10"><b>案件案号 :</b></span>
              <span class="mr10">盐仲WL201800040号</span>
            </p>
            <p>
              <span class="mr10"><b>案件状态 :</b></span>
              <span class="mr10">已撤回</span>
            </p>
            <p>
              <span class="mr10"><b>立案秘书姓名 :</b></span>
              <span class="mr10">刘二蛋</span>
            </p>
            <p>
              <span class="mr10"><b>立案秘书电话 :</b></span>
              <span class="mr10">13454545454</span>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'right_arbi',
  props: ['caseState'],
  data () {
    return {
      logo: {
        url: '../../static/images/logoR.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
.rightArbi {
  padding-left: 6px;
  ._caseInfo {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ._arbiInfo ._top, ._caseInfo ._top {
    @include backgroundLine(right, #1a2b58, #126eaf);
    @include borderRadius(5px);
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
  }
  ._arbiInfo ._mid, ._caseInfo ._mid {
    @include borderRadius(3px);
    @include boxShadow(0 1px 6px -1px #bbb);
    margin-top: 10px;
    background: #fff;
    padding: 10px 0;
    p {
      padding: 5px 0;
    }
  }
  ._logo {
    padding: 5px 0;
    text-align: center;
  }
}
</style>
