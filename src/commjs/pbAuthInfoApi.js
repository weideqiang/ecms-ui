const serviceModule = {
  // 获取业务量统计信息-对公
  getPbAuthYwNumInfo: { // 查询并登记排班业务量信息
    url: '/PbUserInfo/queryUpMonthPbInfo',
    method: 'post'
  },
  NextMothAuthYwInfoMaking: { // 次月排班信息生成
    url: '/PbUserInfo/NextMothAuthYwInfoMaking',
    method: 'post'
  },
  updatepb_auth_predicted_monthByMonth: { // 更新次月排版信息-按月
    url: '/PbUserInfo/updatepb_auth_predicted_monthByMonth',
    method: 'post'
  },
  updatepb_auth_predicted_monthByDay: { // 更新次月排版信息-按日
    url: '/PbUserInfo/updatepb_auth_predicted_monthByDay',
    method: 'post'
  },
  updatepb_pb_class_info_personNum: { // 更新排班班次信息
    url: '/PbUserInfo/updatepb_pb_class_info_personNum',
    method: 'post'
  },
  selectpb_class_info: { // 查询排班班次信息
    url: '/PbUserInfo/selectpb_class_info',
    method: 'post'
  },
  pb_starting_GandC: { // 开始排班
    url: '/PbUserInfo/pb_starting_GandC',
    method: 'post'
  },
  delete_pb_infoByDate: { // 清除排班信息
    url: '/PbUserInfo/delete_pb_infoByDate',
    method: 'post'
  },
  selectpb_auth_history_month_avgBymonth: { // 查询排班历史同步信息
    url: '/PbUserInfo/selectpb_auth_history_month_avgBymonth',
    method: 'post'
  },
  selectpb_auth_predicted_month_avgBymonth: { // 查询排班次月预估信息-按月
    url: '/PbUserInfo/selectpb_auth_predicted_month_avgBymonth',
    method: 'post'
  },
  querryTellerEfficiacyPerDayBymonth: { // 查询排班次月预估信息-按日
    url: '/PbUserInfo/querryTellerEfficiacyPerDayBymonth',
    method: 'post'
  },
  updatepb_auth_predicted_monthByEfficiacy: { // 根据柜员效能更新柜员人数
    url: '/PbUserInfo/updatepb_auth_predicted_monthByEfficiacy',
    method: 'post'
  }
}

const pbAuthInfoApi = { ...serviceModule }

export default pbAuthInfoApi
