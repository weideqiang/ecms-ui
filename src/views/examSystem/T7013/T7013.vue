<template>
  <el-main>
    <br>
    <el-form
      ref="form"
      :model="ruleForm"
      :rules="rules"
      class="demo-form-inline"
      label-width="100px"
      size="small">
      <el-row>
        <el-col :span="20" :offset="4">
          <el-form-item label="文章题目：" prop="TITLE">
            <el-input
              v-model="ruleForm.TITLE"
              style="width: 50%"
              type="TITLE"
              placeholder="文章题目"
              clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="4">
          <el-form-item label="文章内容：" prop="CONTENT">
            <el-input
              v-model="ruleForm.CONTENT"
              :autosize="{ minRows: 2, maxRows: 20}"
              style="width: 50%"
              type="textarea"
              placeholder="文章内容"
              clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="4">
          <el-form-item label="字符数：" prop="CHARNUMBER">
            <el-input
              :disabled="true"
              v-model="ruleForm.CHARNUMBER"
              style="width: 50%"
              type="TITLE"
              placeholder="字符数"
              clearable/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="8" offset="10">
        <el-button class="btn701301" size="small" type="primary" @click="qingKong">清空</el-button>
        <el-button class="btn701301" size="small" type="primary" @click="baoCun">保存</el-button>
        <el-button class="btn701301" size="small" type="primary" @click="tuiChu">退出</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T7013',
  data() {
    const validateCONTENT = (rule, value, callback) => {
      var str = value.replace(/[\u4e00-\u9fa5]/g, 'aa')
      this.ruleForm.CHARNUMBER = str.length
      this.CHARNUMBER1 = str.length
      callback()
    }
    return {
      CHARNUMBER1: '', // 字节数
      maxCharQuestionId: '',
      ruleForm: {
        TITLE: '', // 文章题目
        CONTENT: '', // 文章内容
        CHARNUMBER: '' // 字符数
      },
      rules: {
        TITLE: [
          { required: true, message: '请输入文章题目', trigger: 'blur' }
        ],
        CONTENT: [
          { required: false, message: '请输入文章内容', trigger: 'blur' },
          { trigger: 'change', validator: validateCONTENT }
        ]
      },
      CurrentBranchNo: '', // 机构号
      CurrentSystemDate: '', // 当前系统日期
      CurrentUserNo: '', // 柜员号
      numQuestionTitles: []
    }
  },
  mounted: function() {
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
          console.log('机构号:' + res.data.CurrentBranchNo)
          console.log('当前系统日期:' + res.data.CurrentSystemDate)
          console.log('柜员号:' + res.data.CurrentUserNo)
        })
  },
  methods: {
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    qingKong() {
      this.ruleForm.CONTENT = ''
      this.ruleForm.CHARNUMBER = ''
    },
    baoCun: function() {
      console.log('baoCun')
      this.$refs.form.validate(valid => {
        if (valid) {
          this.save()
        }
      })
    },
    save() {
      console.log('save')
      if (this.ruleForm.CONTENT === '') {
        this.$message({
          showClose: true,
          message: '文章内容不能为空',
          type: 'warning'
        })
      } else {
        this.$http(this.$examSystemMngApi.getMaxCharQuestionId, '') // 此处调用自己的Api接口方法
          .then(
            res => {
              const resdata = res.data.data.data
              if (resdata.TrxCode === '000000') {
                if (resdata.TrxMessage === 'SUCCESS') {
                  console.log('rxID:' + resdata.TrxID)
                  this.maxCharQuestionId = resdata.TrxID
                  var myDate = new Date()
                  var H = myDate.getHours()
                  if (H < 10) {
                    H = '0' + myDate.getHours().toString()
                  } else {
                    H = myDate.getHours().toString()
                  }
                  var m = myDate.getMinutes().toString()
                  if (m < 10) {
                    m = '0' + myDate.getMinutes().toString()
                  } else {
                    m = myDate.getMinutes().toString()
                  }
                  var s = myDate.getSeconds().toString()
                  if (s < 10) {
                    s = '0' + myDate.getSeconds().toString()
                  } else {
                    s = myDate.getSeconds().toString()
                  }
                  var time = H + m + s
                  const map = {
                    'ID': this.maxCharQuestionId,
                    'TITLE': this.ruleForm.TITLE,
                    'CONTENT': this.ruleForm.CONTENT,
                    'MODBRNO': this.CurrentBranchNo,
                    'MODTLRNO': this.CurrentUserNo,
                    'CHARNUMBER': this.CHARNUMBER1,
                    'TIMESTAMP': this.CurrentSystemDate + time // 后台日期加当前日期
                  }
                  console.log('map:' + JSON.stringify(map))
                  const params = { 'ruleForm': JSON.stringify(map), 'ControllerID': 'T7013' }
                  this.$http(this.$examSystemMngApi.commonInsertMethod, params) // 此处调用自己的Api接口方法
                    .then(
                      res => {
                        const resdata1 = res.data.data
                        if (resdata1.code === 'SUCCESS') {
                          console.log('resdata1.data.TrxCode:' + resdata1.data.TrxCode)
                          if (resdata1.data.TrxCode === '000000') {
                            this.$message({
                              showClose: true,
                              message: '文字题库录入成功',
                              type: 'success'
                            })
                            this.$router.push({
                              path: this.redirect || '/dashboard'
                            })
                          } else {
                            this.$message({
                              showClose: true,
                              message: '错误信息 : ' + resdata1.data.TrxMessage,
                              type: 'warning'
                            })
                          }
                        } else {
                          this.$message({
                            showClose: true,
                            message: '错误信息 : ' + res.data.message,
                            type: 'warning'
                          })
                        }
                      },
                      error => {
                        console.log(error)
                      }
                    )
                } else {
                  console.log('错误信息3')
                  this.$message({
                    showClose: true,
                    message: '错误信息 : ' + resdata.data.TrxMessage,
                    type: 'warning'
                  })
                }
              } else {
                this.tableData = []
                console.log('错误信息4')
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.TrxMessage,
                  type: 'warning'
                })
              }
            },
            error => {
              console.log(error)
            }
          )
      }
    },
    tuiChu() {
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/public.css";
  .rowClass7013 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass7013Button {
    width: 70%;
    margin-left: 100px;
  }
  .btn701301 {
    margin-right: 25px;
  }
</style>
