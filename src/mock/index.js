'use strict'
import Mock from 'mockjs'
import Json from '@/mock/data.js'

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

const details = () => {
  let data = Json.details
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const prepareList = () => {
  let data = Json.prepareList
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const caseNew = () => {
  let data = Json.caseNew
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const partyAdd = () => {
  let data = Json.partyAdd
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const proxyAdd = () => {
  let data = Json.proxyAdd
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const partyUpdate = () => {
  let data = Json.partyUpdate
  return {
    flag: true,
    data: data,
    code: '000000',
    message: null
  }
}

const proxyUpdate = () => {
  let data = Json.proxyUpdate
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
Mock.mock('/api/case/details', 'post', details)
Mock.mock('/api/case/prepareList', 'post', prepareList)
Mock.mock('/api/case/new', 'post', caseNew)
Mock.mock('/api/party/add/1', 'post', partyAdd)
Mock.mock('/api/party/add/2', 'post', partyAdd)
Mock.mock('/api/proxy/add', 'post', proxyAdd)
Mock.mock('/api/party/update', 'post', partyUpdate)
Mock.mock('/api/proxy/update', 'post', proxyUpdate)
Mock.mock('/api/user/query', 'post', productData)
