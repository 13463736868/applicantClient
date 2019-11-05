export const resMess = {
  methods: {
    resMessage (type, text) {
      this.$Message[type]({
        content: text,
        duration: type === 'success' ? 2 : 5
      })
    }
  }
}

export const resPage = {
  methods: {
    reschangePageSize (obj) {
      this.pageObj.pageSize = obj
      this.resSearch()
    }
  }
}
