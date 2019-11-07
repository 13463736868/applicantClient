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

export const resTimeOut = {
  methods: {
    debounce (fn, idle) {
      let setTm
      if (!idle || idle <= 0) return fn
      return () => {
        clearTimeout(setTm)
        setTm = setTimeout(fn.bind(this, ...arguments), idle)
      }
    }
  }
}
