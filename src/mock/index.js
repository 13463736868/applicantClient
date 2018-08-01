'use strict'
import Mock from 'mockjs'

const Random = Mock.Random

Mock.setup({
  timeout: 1000
})

const login = () => {
  let data = {
    id: '23244124',
    companyid: null,
    phone: null,
    password: null,
    state: null,
    userType: 1,
    identCode: null,
    token: 'sdf345dfg4567dfgh56',
    verify: -1,
    verifyDesc: '尚未完善信息描述',
    userTypeDesc: '个人用户类型描述'
  }
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

const identCode = () => {
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
Mock.mock('/api/identCode', 'post', identCode)
Mock.mock('/api/user/query', 'get', productData)
