<template>
  <div class="agreementModal">
    <Modal
      v-model="alertShow"
      title="提示"
      :mask-closable="false"
      :closable="false"
      class="not_s"
      width="800">
      <div>
        <Row class="pb20">
          <Col span="22" offset="1" class="tc">
            <h2>诚信仲裁提示书</h2>
          </Col>
        </Row>
        <Row>
          <Col span="22" offset="1">
            <p class="contentIndent">根据《中华人民共和国仲裁法》及有关司法解释的规定，当事人及其他仲裁参与人在仲裁过程中需严格遵守诚实信用原则，严禁虚假仲裁、恶意仲裁和滥用仲裁的行为，现将当事人及其他仲裁参与人的诚信义务提示如下：</p>
            <p class="contentIndent">
              第一条当事人及其他仲裁参与人在仲裁过程中应遵循诚实信用的原则。
            </p>
            <p class="contentIndent">
              第二条当事人及其他仲裁参与人应当遵守开庭规则。
            </p>
            <p class="contentIndent">
              第三条当事人及其他仲裁参与人不得虚构事实，进行虚假仲裁和恶意仲裁。
            </p>
            <p class="contentIndent">
              第四条当事人及其他仲裁参与人应保证向仲裁庭的陈述、提交的住址、联系方式、仲裁文书上的签名、捺印、盖章、证据材料真实准确。
            </p>
            <p class="contentIndent">
              第五条当事人及其他仲裁参与人应依法定程序行使仲裁权利，不应滥用提出管辖异议、申请回避、申请延期、申请鉴定、重复提交相同证据、重复申请调查等方式故意拖延仲裁进程或以无故拒绝提供送达地址、联系电话，拒绝领取法律文书等方式消极应对仲裁。当事人及其他仲裁参与人的住址、联系方式变动，应及时书面报告本委或者仲裁庭。
            </p>
            <p class="contentIndent">
              第六条本委实行内、外部人员干预案件处理的记录曝光和责任追究制度，当事人及其他仲裁参与人如果通过本委内、外部人员或机构就案件审理进行信访、打招呼、批条子、递材料或借助媒体炒作、诬告等方式干预或过问案件处理的，仲裁庭将认为是对仲裁庭公正仲裁的不信赖，是对仲裁庭独立审案的干扰，仲裁庭将对其不诚信行为记录在案，存入正卷。
            </p>
            <p class="contentIndent">
              第七条当事人及其他仲裁参与人不得有以下行为：
            </p>
            <p class="contentIndent">
              （一）冒充他人提起仲裁或参加仲裁；
            </p>
            <p class="contentIndent">
              （二）作虚假证言或以伪造、毁灭重要证据方式妨碍仲裁庭审理案件；
            </p>
            <p class="contentIndent">
              （三）恶意串通，企图通过仲裁、调解等方式侵害他人合法权益；
            </p>
            <p class="contentIndent">
              （四）以暴力、威胁、贿买方法阻止证人作证或者指使、贿买、胁迫他人作伪证；
            </p>
            <p class="contentIndent">
              （五）以欺骗、胁迫等非法手段使申请人撤回仲裁申请；
            </p>
            <p class="contentIndent">
              （六）对仲裁工作人员、仲裁参与人、证人、翻译人员、鉴定人、勘验人进行侮辱、诽谤、诬陷、殴打或者打击报复；
            </p>
            <p class="contentIndent">
              （七）当事人及其他仲裁参与人违背诚信仲裁义务的，将依据《中华人民共和国民事诉讼法》、《中华人民共和国仲裁法》及有关司法解释的规定承担仲裁不利后果及相应法律责任。同时，本委可将当事人及其他仲裁参与人在仲裁中不诚信的情况通告其工作、生活或业务相关联的单位、管理部门，并将不诚信情况录入社会征信系统，根据情况向有关部门提出司法建议，通过媒体等公共平台向社会公众发布。
            </p>
          </Col>
        </Row>
        <Row class="pt20">
          <Col span="5" offset="18">
            <p class="endName">
              海 南 仲 裁 委 员 会
            </p>
          </Col>
        </Row>
      </div>
      <!--  -->
      <div slot="footer">
        <Button size="large" @click="alertCancel">取消</Button>
        <Button type="primary" size="large" @click="alertConfirm" v-if="false">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'agreement-modal',
  data () {
    return {
      alertShow: true
    }
  },
  methods: {
    alertConfirm (type) {
      this.$emit('alertConfirm')
    },
    alertCancel () {
      this.$emit('alertCancel')
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  font-size: 15px;
  line-height: 2

}
.contentIndent{
  text-indent: 2em;
}
</style>
