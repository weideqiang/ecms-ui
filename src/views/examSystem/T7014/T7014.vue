<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <br>
        <el-row>
          <el-col :span="8" :offset="3">
            <el-form-item label="文章编号：" prop="numQuestionTitle">
              <el-select v-model="ruleForm.numQuestionTitle" placeholder="请选择" clearable>
                <el-option v-for="item in numQuestionTitles" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button size="small" type="primary" @click="chaXun">查询</el-button>
            <el-button size="small" type="primary" @click="qingKong">清空</el-button>
            <el-button size="small" type="primary" @click="baoCun">保存</el-button>
            <el-button size="small" type="primary" @click="tuiChu">退出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm1"
        :rules="rules1"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <br>
        <el-row >
          <el-col :span="13" :offset="3">
            <el-form-item label="文章题目：" prop="TITLE">
              <el-input
                v-model="ruleForm1.TITLE"
                style="width:100%;"
                type="TITLE"
                placeholder="文章题目"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13" :offset="3">
            <el-form-item label="文章内容：" prop="CONTENT">
              <el-input
                v-model="ruleForm1.CONTENT"
                :autosize="{ minRows: 2, maxRows: 20}"
                type="textarea"
                style="width: 100%;"
                placeholder="文章内容"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13" :offset="3">
            <el-form-item label="字符数：" prop="CHARNUMBER">
              <el-input
                :disabled="true"
                v-model="ruleForm1.CHARNUMBER"
                style="width: 100%;"
                type="TITLE"
                placeholder="字符数"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T7014',
  data() {
    const validateCONTENT = (rule, value, callback) => {
      var str = value.replace(/[\u4e00-\u9fa5]/g, 'aa')
      this.ruleForm1.CHARNUMBER = str.length
      this.CHARNUMBER1 = str.length
    }
    return {
      CHARNUMBER1: '', // 字节数
      wenZhangBianHAO: '', // 文章编号
      ruleForm: {
        numQuestionTitle: '' // 文章编号
      },
      rules: {
        numQuestionTitle: [
          { required: true, message: '请输入文章编号', trigger: 'change' }
        ]
      },
      ruleForm1: {
        TITLE: '', // 文章题目
        CONTENT: '', // 文章内容
        CHARNUMBER: '' // 字符数
      },
      rules1: {
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
        })
    this.$http(this.$examSystemMngApi.getCharQuestionTitle, '') // 此处调用自己的Api接口方法
      .then(
        res => {
          const resdata = res.data.data
          console.log('TrxMessage:' + resdata.TrxMessage)
          console.log('TrxCode:' + resdata.TrxCode)
          if (resdata.TrxCode === '000000') {
            if (resdata.TrxMessage === 'SUCCESS') {
              for (let i = 0; i < resdata.PageInfo.total; i++) {
                var map = {
                  value: resdata.PageInfo.list[i].ID,
                  label: resdata.PageInfo.list[i].TITLE
                }
                this.numQuestionTitles.push(map)
              }
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
  },
  methods: {
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    chaXun() {
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.pageNum = 1
      //     console.log('pageNum: ' + this.pageNum) // 点击第几页
      //     this.query()
      //   }
      // })
      if (this.ruleForm.numQuestionTitle === '') {
        this.$message({
          showClose: true,
          message: '文章编号不能为空',
          type: 'warning'
        })
      } else {
        this.query()
      }
    },
    query() {
      const params = { 'id': this.ruleForm.numQuestionTitle }
      this.$http(this.$examSystemMngApi.getCharQuestion, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                this.ruleForm1.CONTENT = resdata.PageInfo.list[0].CONTENT
                this.ruleForm1.CHARNUMBER = resdata.PageInfo.list[0].CHARNUMBER
                this.ruleForm1.TITLE = resdata.PageInfo.list[0].TITLE
                this.wenZhangBianHAO = resdata.PageInfo.list[0].ID
                this.CHARNUMBER1 = resdata.PageInfo.list[0].CHARNUMBER
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
    },
    qingKong() {
      this.ruleForm1.CONTENT = ''
      this.ruleForm1.CHARNUMBER = ''
    },
    baoCun() {
      if (this.ruleForm1.CONTENT === '') {
        this.$message({
          showClose: true,
          message: '文章内容不能为空',
          type: 'warning'
        })
      } else {
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
          'TITLE': this.ruleForm1.TITLE,
          'CONTENT': this.ruleForm1.CONTENT,
          'MODBRNO': this.CurrentBranchNo,
          'MODTLRNO': this.CurrentUserNo,
          'CHARNUMBER': this.CHARNUMBER1,
          'TIMESTAMP': this.CurrentSystemDate + time // 后台日期加当前日期
        }
        const consMap = {
          'ID': this.wenZhangBianHAO // 根据题目类型，获取该类型最大id
        }
        console.log('map:' + map)
        const params = { 'ruleForm': JSON.stringify(map), 'consMap': JSON.stringify(consMap), 'ControllerID': 'T7014' }
        console.log('params:' + params)
        this.$http(this.$examSystemMngApi.commonUpdateMethod, params) // 此处调用自己的Api接口方法
          .then(
            res => {
              const resdata = res.data.data
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
                  this.$message({
                    showClose: true,
                    message: '文字题库修改成功',
                    type: 'success'
                  })
                  this.$router.push({
                    path: this.redirect || '/dashboard'
                  })
                } else {
                  this.$message({
                    showClose: true,
                    message: '错误信息 : ' + resdata.data.TrxMessage,
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
  .rowClass7014 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
  }
  .rowClass7014Button {
    width: 70%;
    margin-left: 100px;
  }
</style>
