'use strict'
import Mock from 'mockjs'
// import Json from '@/mock/data.js'

// const Random = Mock.Random

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

Mock.mock('/api/login', 'post', login)
