<template>
  <div class="fileList">
    <Row class="mb20">
      <Col span="24" class="pl20 pr20">
        <Table stripe border align="center" :loading="caseList.loading" :columns="caseList.header" :data="caseList.bodyList"></Table>
      </Col>
    </Row>
    <Row>
      <Col span="12" offset="6">
        <Table stripe align="center" :loading="seleList.loading" :columns="seleList.header" :data="seleList.bodyList"></Table>
      </Col>
    </Row>
    <Row class="pt15 pb20" v-if="dowZipShow">
      <Col span="6" offset="12" class="tc">
        <Button type="primary" size="small" @click="dowZip">一键下载</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import regi from '@/config/regiType.js'

export default {
  name: 'fileList',
  props: ['fileData'],
  data () {
    return {
      dowZipShow: false,
      caseList: {
        loading: false,
        header: [
          {
            title: '案号',
            key: 'caseCode',
            minWidth: 26,
            align: 'center'
          },
          {
            title: '案件编号',
            key: 'id',
            minWidth: 26,
            align: 'center'
          },
          {
            title: '申请人',
            key: 'applicantName',
            align: 'center'
          },
          {
            title: '被申请人',
            key: 'respondentName',
            align: 'center'
          },
          {
            title: '代理人',
            key: 'proxyName',
            align: 'center'
          },
          {
            title: '提交时间',
            key: 'createTime',
            minWidth: 30,
            align: 'center'
          },
          {
            title: '受理时间',
            key: 'acceptTime',
            minWidth: 30,
            align: 'center'
          },
          {
            title: '案件状态',
            key: 'caseAction',
            align: 'center'
          }
        ],
        bodyList: []
      },
      seleList: {
        loading: false,
        header: [
          {
            title: '文件名称',
            key: 'filename',
            align: 'center'
          },
          {
            title: '操作',
            key: 'id',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.seeDoc(params.row.filepath)
                    }
                  }
                }, '预览'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.dowDoc(params.row)
                    }
                  }
                }, '下载')
              ])
            }
          }
        ],
        bodyList: [],
        fileIds: []
      }
    }
  },
  created () {
    if (this.fileData !== null) {
      this.caseList.bodyList = [this.fileData.casesData]
      this.seleList.bodyList = this.fileData.fileUploads
      if (this.seleList.bodyList.length !== 0) {
        this.seleList.bodyList.forEach(item => {
          this.seleList.fileIds.push(item.id)
        })
        this.dowZipShow = true
      }
    }
  },
  methods: {
    seeDoc (path) {
      window.open(path, '_blank')
    },
    dowDoc (_data) {
      window.open(regi.api + '/file/downloadSimpleFile?fileName=' + _data.filename + '&filePath=' + _data.filepath, '_blank')
    },
    dowZip () {
      let _fileIds = this.seleList.fileIds.join(',')
      window.open(regi.api + '/file/downloadFileZip?fileIds=' + _fileIds, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
