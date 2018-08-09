<template>
  <div class="_editPropInfo">
    <span>editPropInfo</span><span v-text="caseId"></span>
  </div>
</template>

<script>
export default {
  name: 'edit_prop_info',
  props: ['caseId', 'editPropData'],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
