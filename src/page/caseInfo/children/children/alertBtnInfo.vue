<template>
  <div class="_alertBtnInfo" v-if="alertShow">
    <Modal
      v-model="alertShow"
      :title="alertTitle"
      :mask-closable="false"
      :closable="false"
      class="not_s">
      <div>
        <slot></slot>
      </div>
      <div slot="footer">
        <Button type="ghost" size="large" @click="alertCancel">取消</Button>
        <Button v-if="isSaveBtn !== true" type="primary" size="large" @click="alertConfirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'alert_btn_info',
  props: ['alertShow', 'alertTitle', 'isSaveBtn'],
  data () {
    return {}
  },
  methods: {
    alertConfirm () {
      this.$emit('alertConfirm')
    },
    alertCancel () {
      this.$emit('alertCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin';
._alertBtnInfo {
  ._textarea {
    @include borderRadius(4px);
    width: 100%;
    padding: 5px 8px;
    resize: none;
    border: 1px solid #dddee1;
    outline: none;
    transition: all .2s ease-in-out;
  }
  ._textarea:hover {
    @include boxShadow(0 0 0 1px rgba(45,140,240,.2));
    border-color: #57a3f3;
    outline: 0;
  }
}
</style>
