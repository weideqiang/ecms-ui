<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <el-row>
              <div class="card-panel-title">
                开卡
              </div>
            </el-row>
            <el-row :gutter="16">
              <el-col :xs="8" :sm="8" :lg="8">
                <div class="card-panel-context">
                  笔数:{{ num }}
                </div>
              </el-col>
              <el-col :xs="16" :sm="16" :lg="16">
                平均操作时长:{{ avgTime }}
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :xs="8" :sm="8" :lg="8">
                全行排名:{{ orderInQh }}
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                分行排名:{{ orderInFh }}
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                网点排行:{{ orderInWd }}
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <el-row>
              <div class="card-panel-title">
                取款
              </div>
            </el-row>
            <el-row :gutter="16">
              <el-col :xs="8" :sm="8" :lg="8">
                <div class="card-panel-context">
                  笔数:{{ num }}
                </div>
              </el-col>
              <el-col :xs="16" :sm="16" :lg="16">
                平均操作时长:{{ avgTime }}
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :xs="8" :sm="8" :lg="8">
                全行排名:{{ orderInQh }}
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                分行排名:{{ orderInFh }}
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                网点排行:{{ orderInWd }}
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <el-row>
              <div class="card-panel-title">
                存款
              </div>
            </el-row>
            <el-row :gutter="16">
              <el-col :xs="8" :sm="8" :lg="8">
                <div class="card-panel-context">
                  笔数:{{ num }}
                </div>
              </el-col>
              <el-col :xs="16" :sm="16" :lg="16">
                平均操作时长:{{ avgTime }}
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :xs="8" :sm="8" :lg="8">
                全行排名:{{ orderInQh }}
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                分行排名:{{ orderInFh }}
              </el-col>
              <el-col :xs="8" :sm="8" :lg="8">
                网点排行:{{ orderInWd }}
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      num: 236,
      avgTime: 126,
      orderInQh: 36,
      orderInFh: 32,
      orderInWd: 29
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border-radius: 5px;
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        text-align: left;
        .card-panel-title{
          text-align: left;
          padding-bottom: 10px;
        }
        .card-panel-context{
          padding-bottom: 10px;
        }
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
