'use strict'
// regiType 1 线上;2 本地(个人注册)  anyang:/upcase ;src/axios;src/router;index.html
const regiType = 1
const api = '/api'
const type = 'QingYang'
const infoMap = {
  'QingYang': {
    indexName: '庆阳仲裁委网络立案系统',
    loginName: '庆阳',
    name: '中国庆阳仲裁委员会',
    excName: 'QingYang Arbitration Commission',
    tel: '0934-8232372',
    address: '甘肃省庆阳市西峰区南大街51号',
    goRoom: '',
    note: '前后不分离,去掉进入庭室,记录功能'
  },
  'AnYang': {
    name: '中国安阳仲裁委员会',
    excName: 'AnYang Arbitration Commission',
    tel: '0372-5369110',
    address: '河南省安阳市文峰区文峰大道559号',
    goRoom: 'https://wlzc.anyang.gov.cn/view/index.html#/',
    note: '前后分离,打包需要注意:代理信息,服务器路径前缀client,接口地址前缀upcase,以及路由信息base,图片信息'
  },
  'YanCheng': {
    loginName: '盐城',
    name: '中国盐城仲裁委员会',
    excName: 'YanCheng Arbitration Commission',
    tel: '0515-88123589',
    address: '江苏省盐城市人民南路106号',
    goRoom: 'https://trialonline.yczcw.com.cn:3004/view/index.html#/',
    note: '前后不分离,注释掉zip上传俩处地方'
  },
  'HuiZhou': {
    name: '惠州信用便民仲裁服务中心',
    excName: 'HuiZhou Credit Arbitration Center',
    tel: '0752-2112666',
    address: '广东省惠州市惠城区鹅岭南路车世界广场三楼A区',
    goRoom: 'https://yun.youzhengkeji.com:3004/view/index.html#/',
    note: '前后不分离'
  },
  'YouZheng': {
    name: '中国某某仲裁委员会',
    excName: 'XxxXxx Arbitration Commission',
    tel: '0xxx-xxxxxxxx',
    address: '某某市xxx路xxx号',
    goRoom: 'https://yun.youzhengkeji.com:3004/view/index.html#/',
    note: '演示'
  },
  'Laiwu': {
    name: '中国莱芜仲裁委员会',
    excName: 'LaiWu Arbitration Commission',
    tel: '0634-5878177',
    address: '山东省莱芜市龙潭大街001号',
    goRoom: 'https://yun.youzhengkeji.com:3004/view/index.html#/',
    note: '莱芜演示'
  },
  'HaErBin': {
    name: '中国哈尔滨仲裁委员会',
    excName: 'HARBIN ARBITRATION COMMISSION',
    tel: '0451-82815701',
    address: '黑龙江省哈尔滨市道里区抚顺街1号',
    goRoom: '',
    note: '哈尔滨部署演示'
  },
  'QingDao': {
    loginName: '青岛',
    name: '青岛仲裁委员会',
    excName: 'Qingdao Arbitration Commission',
    tel: '0532－85768569',
    address: '青岛市崂山区同安路886号',
    goRoom: '',
    note: '青岛部署演示'
  },
  'ZhongWei': {
    indexName: '中卫仲裁委员会网络仲裁立案平台',
    loginName: '中卫',
    name: '中卫仲裁委员会',
    excName: 'Zhongwei Arbitration Commission',
    tel: '0955-7674885',
    address: '宁夏回族自治区中卫市文萃北街13号',
    goRoom: '',
    note: '中卫部署演示'
  },
  'HeFei': {
    loginName: '合肥',
    name: '合肥仲裁委员会',
    excName: 'HeFei Arbitration Commission',
    tel: '0551-62648826',
    address: '安徽省合肥市阜阳路17号',
    goRoom: '',
    note: '合肥部署演示'
  },
  'ChiFeng': {
    loginName: '赤峰',
    name: '赤峰仲裁委员会',
    excName: 'ChiFeng Arbitration Commission',
    tel: '0476-8369302',
    address: '内蒙古自治区赤峰市红山区昭乌达路71号13楼1304',
    goRoom: '',
    note: '赤峰部署演示'
  },
  'HaiNan': {
    loginName: '海南',
    name: '海南国际仲裁院',
    excName: 'HaiNan Arbitration Commission',
    tel: '0898-68571768',
    address: '海南省海口市和平大道20号鹏晖国际大厦十一层、十二层',
    goRoom: '',
    note: '海南部署演示'
  }
}
const dataMap = infoMap[type]

export default {
  type,
  regiType,
  api,
  dataMap
}
