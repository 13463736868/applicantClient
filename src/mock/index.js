'use strict'
import Mock from 'mockjs'

const Random = Mock.Random

Mock.setup({
  timeout: 1000
})

const login = () => {
  let data = 'as34ed6yhu8u4fg5y7u39o39'
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const checkPhone = () => {
  let data = 1
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const productData = () => {
  let data = []
  for (let i = 0; i < 20; i++) {
    let _data = {
      name: Random.cname(),
      date: Random.date('yyyy-mm-dd'),
      content: Random.csentence(3, 10)
    }
    data.push(_data)
  }
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

Mock.mock('/api/login', 'post', login)
Mock.mock('/api/checkPhone', 'post', checkPhone)
Mock.mock('/api/user/query', 'get', productData)
