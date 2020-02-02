const serviceModule = {
  getQuestionInfo: { // 查询题目列表
    url: '/examSystem/getQuestionInfo',
    method: 'post'
  },
  commonInsertMethod: { // 题目列表增加数据
    url: '/examSystem/commonInsertMethod',
    method: 'post'
  },
  commonInsertMethodList: { // 题目列表增加数据（list）
    url: '/examSystem/commonInsertMethodList',
    method: 'post'
  },
  commonUpdateMethod: { // 修改题目列表数据
    url: '/examSystem/commonUpdateMethod',
    method: 'post'
  },
  commonUpdateMethodOne: { // 修改题目列表数据(T7010)
    url: '/examSystem/commonUpdateMethodOne',
    method: 'post'
  },
  commonDeleteMethod: { // 删除题目列表数据
    url: '/examSystem/commonDeleteMethod',
    method: 'post'
  },
  getTlrTestScoreSailing: { // 考试成绩查询
    url: '/examSystem/getTlrTestScoreSailing',
    method: 'post'
  },
  getTlrTestScore: { // 考试成绩查询
    url: '/examSystem/getTlrTestScore',
    method: 'post'
  },
  getTlrTestScoreTotalScore: { // 获取考生指定场次的分数
    url: '/examSystem/getTlrTestScoreTotalScore',
    method: 'post'
  },
  getTradeScoreInfo: { // 根据考生id、考试场次获取考生信息
    url: '/examSystem/getTradeScoreInfo',
    method: 'post'
  },
  insertEFS_EXAM_SELECTMANAGER: { // 登记策略管理
    url: '/examSystem/insertEFS_EXAM_SELECTMANAGER',
    method: 'post'
  },
  getTlrTestDetail: { // 获取考生的考试答题详细信息
    url: '/examSystem/getTlrTestDetail',
    method: 'post'
  },
  getQuestionInfoOne: { // 根据试题ID获取试题具体信息
    url: '/examSystem/getQuestionInfoOne',
    method: 'post'
  },
  getBranchInfoListByZoneNo: { // 获取机构列表-通过地区号
    url: '/examSystem/getBranchInfoListByZoneNo',
    method: 'post'
  },
  getBranchUserInfoByBranch: { // 获取学员列表-通过地区号
    url: '/examSystem/getBranchUserInfoByBranch',
    method: 'post'
  },
  getTradeSelectZoneno: { // 获取考试地区列表01
    url: '/examSystem/getTradeSelectZoneno',
    method: 'post'
  },
  getEFS_EXAM_TRXPARAM: { // 获取交易关注信息
    url: '/examSystem/getEFS_EXAM_TRXPARAM',
    method: 'post'
  },
  getPlanInfo: { // 获取符合条件的考试场次
    url: '/examSystem/getPlanInfo',
    method: 'post'
  },
  getCharQuestionTitle: { // 获取文章录入标题列表
    url: '/examSystem/getCharQuestionTitle',
    method: 'post'
  },
  getCharQuestion: { // 根据题库ID获取文字录入信息
    url: '/examSystem/getCharQuestion',
    method: 'post'
  },
  getMaxCharQuestionId: { // 获取文字录入最大题库编号
    url: '/examSystem/getMaxCharQuestionId',
    method: 'post'
  },
  getSelectManagerZoneno: { // 获取策略出处
    url: '/examSystem/getSelectManagerZoneno',
    method: 'post'
  },
  getSelectManagerZonenoSailing: { // 获取策略出处
    url: '/examSystem/getSelectManagerZonenoSailing',
    method: 'post'
  },
  getSelectManagerFromZoneno: { // 根据分行号获取策略出处
    url: '/examSystem/getSelectManagerFromZoneno',
    method: 'post'
  },
  getSelectManagerFromZonenoSailing: { // 根据分行号获取策略出处
    url: '/examSystem/getSelectManagerFromZonenoSailing',
    method: 'post'
  },
  getTradeSelectFromZoneno: { // 策略下拉列表查询1
    url: '/examSystem/getTradeSelectFromZoneno',
    method: 'post'
  },
  getSelectManagerInfo: { // 根据ID查询策略详细信息
    url: '/examSystem/getSelectManagerInfo',
    method: 'post'
  },
  getTradeSelectManagerInfo: { // 根据策略id查询交易考试策略信息
    url: '/examSystem/getTradeSelectManagerInfo',
    method: 'post'
  },
  createPlanSeq: { // 生成考试场次ID
    url: '/examSystem/createPlanSeq',
    method: 'post'
  },
  getQuestionByRandomAlgm: { // 随机出题
    url: '/examSystem/getQuestionByRandomAlgm',
    method: 'post'
  },
  getTradeQuestionByRandomAlgm: { // 随机获取交易信息
    url: '/examSystem/getTradeQuestionByRandomAlgm',
    method: 'post'
  },
  insertPlanPersionInfo: { // 将考试人员插入人员信息表中
    url: '/examSystem/insertPlanPersionInfo',
    method: 'post'
  },
  updateNumQuestion: { // 更新翻打凭条题库
    url: '/examSystem/updateNumQuestion',
    method: 'post'
  },
  insertPlanInfo: { // 插入考试场次基本信息
    url: '/examSystem/insertPlanInfo',
    method: 'post'
  },
  getMaxQuestionId: { // 根据题目类型，获取该类型最大id
    url: '/examSystem/getMaxQuestionId',
    method: 'post'
  },
  insertEFS_EXAM_BUSIQUESTION: { // 插入考试信息
    url: '/examSystem/insertEFS_EXAM_BUSIQUESTION',
    method: 'post'
  },
  countQuestion: { // 查询题干数量
    url: '/examSystem/countQuestion',
    method: 'post'
  },
  getQuestionInfo1: { // 查询题干信息
    url: '/examSystem/getQuestionInfo1',
    method: 'post'
  },
  getPlanInfoByAccDate: { // 根据考试人员id、考试日期、考试时间、考试类型获取考试场次信息
    url: '/examSystem/getPlanInfoByAccDate',
    method: 'post'
  },
  getTlrPlanInfo: { // 根据考生编号与考试场次获取题目信息1
    url: '/examSystem/getTlrPlanInfo',
    method: 'post'
  },
  getNumQuestionTitle: { // 获取翻打凭条题目列表
    url: '/examSystem/getNumQuestionTitle',
    method: 'post'
  },
  getNumQuestion: { // 根据题库ID获取凭条信息
    url: '/examSystem/getNumQuestion',
    method: 'post'
  },
  getAllPlanInfo: { // 获取所有考试场次信息
    url: '/examSystem/getAllPlanInfo',
    method: 'post'
  },
  cancelPlan: { // 考试场次作废
    url: '/examSystem/cancelPlan',
    method: 'post'
  },
  getTestPersionInfo: { // 查询未完成考试学员信息
    url: '/examSystem/getTestPersionInfo',
    method: 'post'
  },
  submitPlanInfo: { // 进行封场处理
    url: '/examSystem/submitPlanInfo',
    method: 'post'
  },
  submitPlanInfoDownLoadExl: { // 进行封场处理导出
    url: '/examSystem/submitPlanInfoDownLoadExl',
    method: 'post'
  },
  getMaxNumQuestionId: { // 获取翻打凭条最大题目编号
    url: '/examSystem/getMaxNumQuestionId',
    method: 'post'
  },
  addNumQuestion: { // 增加翻打凭条题库
    url: '/examSystem/addNumQuestion',
    method: 'post'
  },
  insertPlanTestInfo: { // 插入考试人员题目信息表
    url: '/examSystem/insertPlanTestInfo',
    method: 'post'
  }
}

const examSystemMngApi = { ...serviceModule }

export default examSystemMngApi
