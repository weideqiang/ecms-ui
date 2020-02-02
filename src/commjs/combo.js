const serviceModule = {
  userStatus: [{ // 用户状态下拉列表
    value: '0',
    label: '初始'
  }, {
    value: '1',
    label: '登录'
  }, {
    value: '2',
    label: '签退'
  }, {
    value: '3',
    label: '密码挂失'
  }],
  identType: [{ // 证件类型下拉列表
    value: '0',
    label: '0-身份证'
  }, {
    value: '1',
    label: '1-军官证'
  }, {
    value: '2',
    label: '2-户口簿'
  }, {
    value: '3',
    label: '3-护照'
  }, {
    value: '4',
    label: '4-返乡证'
  }, {
    value: '5',
    label: '5-士兵证'
  }, {
    value: '6',
    label: '6-台湾同胞来往内地通行证'
  }, {
    value: '7',
    label: '7-临时身份证'
  }, {
    value: '8',
    label: '8-外国人居留证'
  }, {
    value: '9',
    label: '9-警官证'
  }, {
    value: 'A',
    label: 'A-港澳居民来往内地通行证'
  }, {
    value: 'X',
    label: 'X-其他证件'
  }],
  gender: [{ // 性别下拉列表
    value: '0',
    label: '男'
  }, {
    value: '1',
    label: '女'
  }],
  loginTypes: [{ // 登录方式下拉列表
    value: '0',
    label: '密码'
  }, {
    value: '1',
    label: '指纹'
  }],
  statuss: [{ // 状态下拉列表
    value: '0',
    label: '禁用'
  }, {
    value: '1',
    label: '启用'
  }],
  CGFlags: [{ // 对公对私标志下拉列表
    value: 'C',
    label: '对公'
  }, {
    value: 'G',
    label: '对私'
  }],
  panDuanDaAn: [{ // 判断题答案
    value: '正确',
    label: '正确'
  }, {
    value: '错误',
    label: '错误'
  }],
  operationType: [{ // 对公对私标志下拉列表
    value: '0',
    label: '查询'
  }, {
    value: '1',
    label: '领取'
  }, {
    value: '2',
    label: '登记'
  }],
  operationType1: [{ // 对公对私标志下拉列表
    value: '0',
    label: '查询'
  }, {
    value: '2',
    label: '登记'
  }],
  czlb: [{ // 操作类别
    value: '0',
    label: '查询维护'
  }, {
    value: '1',
    label: '新增'
  }],
  tiXing: [{ // 题目类型
    value: '01',
    label: '单选'
  }, {
    value: '02',
    label: '多选'
  }, {
    value: '03',
    label: '判断'
  }],
  danXuanDaAn: [{ // 单选答案
    value: 'A',
    label: 'A'
  }, {
    value: 'B',
    label: 'B'
  }, {
    value: 'C',
    label: 'C'
  }, {
    value: 'D',
    label: 'D'
  }, {
    value: 'E',
    label: 'E'
  }],
  nanDu: [{ // 难度
    value: '1',
    label: '基础'
  }, {
    value: '2',
    label: '适中'
  }, {
    value: '3',
    label: '困难'
  }, {
    value: '4',
    label: '极难'
  }],
  kaoShiLeiXing: [{ // 考试类型
    value: '01',
    label: '业务知识'
  }, {
    value: '04',
    label: '交易操作'
  }],
  jiaoYiGuiShuDiQu: [{ // 交易归属地区
    value: '0000',
    label: '全行'
  }, {
    value: '0001',
    label: '哈尔滨分行'
  }],
  shiJuanLeiXing: [{ // 试卷类型
    value: '01',
    label: '随机试题'
  }, {
    value: '02',
    label: '统一试题'
  }, {
    value: '03',
    label: '指定试题'
  }, {
    value: '04',
    label: '试卷上传'
  }],
  changCiZhuangTai: [{ // 场次状态
    value: '1',
    label: '开场'
  }, {
    value: '2',
    label: '封场'
  }, {
    value: '3',
    label: '作废'
  }],
  yeWuLeiXing: [{ // 业务类型
    value: '01',
    label: '对私'
  }, {
    value: '02',
    label: '对公'
  }, {
    value: '03',
    label: '贷款'
  }, {
    value: '05',
    label: '规章制度'
  }],
  zhuangTai: [{ // 状态
    value: '0',
    label: '无效'
  }, {
    value: '1',
    label: '有效'
  }],
  HCBSTypes: [{ // 核查标识
    value: '0',
    label: '成功'
  }, {
    value: '1',
    label: '失败'
  }],
  YWZLTypes: [{ // 业务种类
    value: '01',
    label: '银行账户业务'
  }, {
    value: '02',
    label: '信贷及征信业务'
  }, {
    value: '03',
    label: '支付结算业务'
  }, {
    value: '04',
    label: '反洗钱业务'
  }],
  operationType2: [{ // 对公对私标志下拉列表
    value: '0',
    label: '查询'
  }, {
    value: '1',
    label: '登记'
  }, {
    value: '2',
    label: '维护'
  }],
  CSFS1: [{ // 传送方式
    value: '0',
    label: '人工送达'
  }, {
    value: '1',
    label: '电子送达'
  }],
  SFTBYWTypes: [{ // 是否停办业务
    value: '0',
    label: '是'
  }, {
    value: '1',
    label: '否'
  }],
  SHHSJGTypes: [{ // 事后核实结果
    value: '1',
    label: '核查一致'
  }, {
    value: '2',
    label: '核查不一致'
  }],
  YWCLJGTypes: [{ // 业务处理结果
    value: '1',
    label: '停办业务'
  }, {
    value: '2',
    label: '继续办理业务'
  }, {
    value: '3',
    label: '撤销'
  }, {
    value: '4',
    label: '其他'
  }],
  KZBZ1: [{ // 卡折标志
    value: '0',
    label: '批开卡'
  }, {
    value: '1',
    label: '预制卡（折）'
  }, {
    value: '2',
    label: '非批开业务'
  }],
  operationType3: [{ // 对公对私标志下拉列表
    value: '0',
    label: '查询'
  }, {
    value: '1',
    label: '领用'
  }, {
    value: '2',
    label: '启用'
  }, {
    value: '3',
    label: '停用'
  }, {
    value: '4',
    label: '上缴'
  }, {
    value: '5',
    label: '销毁'
  }, {
    value: '6',
    label: '交接'
  }],
  operationType4: [{ // 对公对私标志下拉列表
    value: '0',
    label: '查询'
  }, {
    value: '1',
    label: '收缴'
  }, {
    value: '2',
    label: '上缴'
  }],
  LBSBJGTypes: [{ // 脸部识别结果
    value: '0',
    label: '通过'
  }, {
    value: '1',
    label: '不通过'
  }],
  CounterfeitTheName: [{ // 假币（票）名称
    value: '1',
    label: '人民币'
  }, {
    value: '2',
    label: '美元'
  }, {
    value: '3',
    label: '汇票'
  }, {
    value: '4',
    label: '支票'
  }, {
    value: '5',
    label: '其他'
  }],
  HCJGTypes: [{ // 核查结果
    value: '0',
    label: '公民身份证号码与姓名一致，且存在照片'
  }, {
    value: '1',
    label: '号码与姓名一致，照片存在但不符'
  }, {
    value: '2',
    label: '号码与姓名一致，但照片不存在'
  }, {
    value: '3',
    label: '号码存在与姓名不匹配'
  }, {
    value: '4',
    label: '号码不存在'
  }, {
    value: '5',
    label: '其他'
  }],
  DocumentType: [{ // 证件类型
    value: 'A',
    label: '身份证'
  }, {
    value: 'B',
    label: '护照'
  }, {
    value: 'C',
    label: '户口簿'
  }, {
    value: 'D',
    label: '港澳居民来往内地通行证'
  }, {
    value: 'E',
    label: '台湾居民来往大陆通行证'
  }, {
    value: 'F',
    label: '临时身份证'
  }, {
    value: 'G',
    label: '军人证'
  }, {
    value: 'H',
    label: '警官证'
  }, {
    value: 'I',
    label: '外国人永久居留证'
  }, {
    value: 'J',
    label: '批文（个人）'
  }, {
    value: 'K',
    label: '学生证'
  }, {
    value: 'L',
    label: '其他（个人）'
  }, {
    value: 'M',
    label: '营业执照'
  }, {
    value: 'N',
    label: '批文（企业）'
  }, {
    value: 'O',
    label: '企业名称预先核准通知书'
  }, {
    value: 'P',
    label: '登记证书（机关法人、事业法人、社会团体、民办非企业组织）'
  }, {
    value: 'Q',
    label: '境外机构证明文件'
  }, {
    value: 'R',
    label: '其他（企业）'
  }, {
    value: 'T',
    label: '还乡证'
  }, {
    value: 'U',
    label: '台湾居民往大陆通行证'
  }, {
    value: 'V',
    label: '边民出入境通行证'
  }, {
    value: 'W',
    label: '士兵证'
  }, {
    value: 'X',
    label: '军事院校学员证'
  }, {
    value: 'Y',
    label: '军队离休干部荣誉证'
  }, {
    value: 'Z',
    label: '军官退休证'
  }, {
    value: 'a',
    label: '军人文职干部退休证'
  }, {
    value: 'b',
    label: '开户证明'
  }],
  FakeCharacteristics: [{
    value: '0',
    label: '机制'
  }, {
    value: '1',
    label: '拓印'
  }, {
    value: '2',
    label: '拼凑'
  }, {
    value: '3',
    label: '复印'
  }, {
    value: '4',
    label: '其他'
  }],
  accountOpenChanel: [{
    value: '0',
    label: '柜面'
  }, {
    value: '1',
    label: '预约开户'
  }],
  operationUnit: [{ // 对公对私标志下拉列表
    value: '0',
    label: '客户'
  }, {
    value: '1',
    label: '柜员'
  }],
  operationWays: [{ // 存款查询登记簿操作方式
    value: '0',
    label: '客户'
  }, {
    value: '1',
    label: '柜员'
  }, {
    value: '2',
    label: '有权机关'
  }, {
    value: '3',
    label: '全部'
  }],
  ChangCs: [{ // 场次
    value: 'a',
    label: '上午'
  }, {
    value: 'p',
    label: '下午'
  }],
  operationWays1: [{ // 票据交接登记簿操作方式
    value: '0',
    label: '提入'
  }, {
    value: '1',
    label: '提出'
  }],
  CZDWTypes1: [{// 操作单位
    value: '0',
    label: '客户'
  }, {
    value: '1',
    label: '柜员'
  }
  ],
  SQQD: [{
    value: '0',
    label: '0-上门核实面签'
  }, {
    value: '1',
    label: '1-上门核实'
  }],
  ZHXZ: [{ // 账户性质
    value: '1',
    label: '1-基本'
  }, {
    value: '2',
    label: '2-一般'
  }, {
    value: '3',
    label: '3-专用'
  }, {
    value: '4',
    label: '4-临时'
  }],
  GWYYKHSHZT: [{// 官网预约开户审核状态
    value: '1',
    label: '1-银行已受理'
  }, {
    value: '2',
    label: '2-银行审核通过'
  }, {
    value: '3',
    label: '3-拒绝'
  }, {
    value: '4',
    label: '4-开户'
  }, {
    value: '5',
    label: '5-上门审核面签'
  }, {
    value: '6',
    label: '6-交接资料'
  }, {
    value: '7',
    label: '7-报送资料'
  }, {
    value: '8',
    label: '8-已报送人民银行待核准'
  }, {
    value: '9',
    label: '9-人行核准已通知客户'
  }, {
    value: '11',
    label: '11-开户许可证带领取'
  }, {
    value: '12',
    label: '12-客户已领取'
  }],
  LYTypes1: [{// 来源
    value: '0',
    label: '0-ATM'
  }, {
    value: '1',
    label: '1-现金'
  }, {
    value: '2',
    label: '2-圈存机'
  }, {
    value: '3',
    label: '3-自助机'
  }],
  clientTypes: [{ // 客户类型
    value: 'I',
    label: 'I-个人'
  }, {
    value: 'C',
    label: 'C-对公'
  }, {
    value: 'D',
    label: 'D-贷记卡'
  }],
  bQueryNames: [{ // 证件类型
    value: 'A',
    label: 'A-身份证'
  }, {
    value: 'B',
    label: 'B-护照'
  }, {
    value: 'C',
    label: 'C-户口簿'
  }, {
    value: 'D',
    label: 'D-港澳居民往来内地通行证'
  }, {
    value: 'E',
    label: 'E-台湾居民来往大陆通行证'
  }, {
    value: 'F',
    label: 'F-临时身份证'
  }, {
    value: 'G',
    label: 'G-军人证'
  }, {
    value: 'H',
    label: 'H-警官证'
  }, {
    value: 'I',
    label: 'I-外国人永久居留证'
  }, {
    value: 'J',
    label: 'J-批文（个人)'
  }, {
    value: 'K',
    label: 'K-学生证'
  }, {
    value: 'L',
    label: 'L-其他 （个人)'
  }, {
    value: 'M',
    label: 'M-营业执照'
  }, {
    value: 'N',
    label: 'N-批文（企业）'
  }, {
    value: 'O',
    label: 'O-企业名称预先核准通知书'
  }, {
    value: 'P',
    label: 'P-登记证书（机关法人、事业法人、社会团体、民办非企业组织）'
  }, {
    value: 'Q',
    label: 'Q-境外机构证明文件'
  }, {
    value: 'R',
    label: 'R-其他（企业）'
  }, {
    value: 'T',
    label: 'T-还乡证'
  }, {
    value: 'U',
    label: 'U-台湾居民往大陆通知证'
  }, {
    value: 'V',
    label: 'V-边民出入境通行证'
  }, {
    value: 'W',
    label: 'W-士兵证'
  }, {
    value: 'X',
    label: 'X-军事院校学员证'
  }, {
    value: 'Y',
    label: 'Y-军队离休干部荣誉证'
  }, {
    value: 'Z',
    label: 'Z-军官退休证'
  }, {
    value: 'a',
    label: 'a-军人文职干部退休证'
  }, {
    value: 'b',
    label: 'b-开户证明'
  }],
  tradeTypes5520: [{// 5520交易类别
    value: '0',
    label: '上门核实面签'
  }, {
    value: '1',
    label: '上门核实'
  }
  ],
  tradeTypes5522: [{// 5522交易类别
    value: '0',
    label: '账户报送员报送'
  }, {
    value: '1',
    label: '直接报送'
  }
  ],
  tradeTypes5524: [{// 5524交易类别
    value: '0',
    label: '账户报送员报送'
  }, {
    value: '1',
    label: '直接领回'
  }
  ],
  tradeTypes5527: [{// 5527交易类别
    value: '0',
    label: '签到'
  }, {
    value: '1',
    label: '签退'
  }, {
    value: '2',
    label: '查询及维护'
  }, {
    value: '3',
    label: '登记日志'
  }, {
    value: '4',
    label: '权限维护'
  }
  ],
  tradeTypes5549: [{// 5549操作类型
    value: '0',
    label: '查询'
  }, {
    value: '1',
    label: '签约'
  }, {
    value: '2',
    label: '解约'
  }
  ],
  queryType5549: [{// 5549查询类型
    value: '0',
    label: '全部'
  }, {
    value: '1',
    label: '签约'
  }, {
    value: '2',
    label: '解约'
  }
  ],
  tradeTypes5550: [{// 5550操作类型
    value: '0',
    label: '查询'
  }, {
    value: '1',
    label: '登记'
  }
  ],
  HCFS: [{// 核查方式
    value: '0',
    label: '本人办理'
  }, {
    value: '1',
    label: '代理人办理'
  }, {
    value: '2',
    label: '单独核查'
  }, {
    value: '3',
    label: '核查失败录入辅助证件'
  }, {
    value: '4',
    label: '其他'
  }
  ],
  SFBZ: [{// 是否标志
    value: '0',
    label: '否'
  }, {
    value: '1',
    label: '是'
  }
  ],
  JSFSTypes5550: [{// 5550结算方式
    value: '0',
    label: '系统内转账'
  }, {
    value: '1',
    label: '小额支付系统'
  }, {
    value: '2',
    label: '大额支付系统'
  }, {
    value: '3',
    label: '同城'
  }, {
    value: '4',
    label: '现金'
  }, {
    value: '5',
    label: '网银'
  }
  ],
  BZTypes5550: [{// 5550币种
    value: 'CNY',
    label: 'CNY-人民币'
  }, {
    value: 'USD',
    label: 'USD-美元'
  }, {
    value: 'HKD',
    label: 'HKD-港币'
  }, {
    value: 'JPY',
    label: 'JPY-日元'
  }, {
    value: 'KRW',
    label: 'KRW-韩元'
  }, {
    value: 'GBP',
    label: 'GBP-英镑'
  }, {
    value: 'EUR',
    label: 'EUR-欧元'
  }, {
    value: 'CAD',
    label: 'CAD-加拿大元'
  }, {
    value: 'CHF',
    label: 'CHF-瑞士法郎'
  }, {
    value: 'SGD',
    label: 'SGD-新加坡元'
  }, {
    value: 'NZD',
    label: 'NZD-新西兰元'
  }, {
    value: 'SEK',
    label: 'SEK-瑞典克朗'
  }, {
    value: 'DKK',
    label: 'DKK-丹麦克朗'
  }, {
    value: 'NOK',
    label: 'NOK-挪威克朗'
  }, {
    value: 'AUD',
    label: 'AUD-澳大利亚元'
  }, {
    value: 'RUB',
    label: 'RUB-卢布'
  }
  ],
  PZLXTypes5550: [{ // 5550凭证类型
    value: '1',
    label: '1-财政授权支付凭证'
  }, {
    value: '5',
    label: '5-单位支票（外币）'
  }, {
    value: '731',
    label: '731-现金支票'
  }, {
    value: '732',
    label: '732-转账支票'
  }, {
    value: '739',
    label: '739-清分机转账支票'
  }, {
    value: '740',
    label: '740-电汇凭证'
  }, {
    value: '741',
    label: '741-汇票委托书'
  }, {
    value: '745',
    label: '745-银行承兑汇票'
  }, {
    value: '746',
    label: '746-支付申请划款凭证'
  }, {
    value: '765',
    label: '765-个人转账支票'
  }, {
    value: '769',
    label: '769-支付申请退款凭证'
  }, {
    value: '751',
    label: '751-央行现金支票'
  }, {
    value: '752',
    label: '752-央行转账支票'
  }, {
    value: '753',
    label: '753-其他商业银行现金支票'
  }, {
    value: '755',
    label: '755-其他商业银行转账支票'
  }, {
    value: '805',
    label: '805-结算业务凭证'
  }, {
    value: '806',
    label: '806-转账业务凭证'
  }, {
    value: '996',
    label: '996-财政授权支付凭证'
  }, {
    value: '999',
    label: '999-其他'
  }
  ],
  operationUints5551: [{// 5551客户类型
    value: '1',
    label: '1-个人'
  }, {
    value: '2',
    label: '2-对公'
  }, {
    value: '3',
    label: '3-全部'
  }
  ],
  CQLXTypes5551: [{// 5551存取类型
    value: '1',
    label: '现金存款'
  }, {
    value: '2',
    label: '现金取款'
  }, {
    value: '3',
    label: '转账存款'
  }, {
    value: '4',
    label: '转账取款'
  }
  ],
  CATRFLAGS: [{
    value: '0',
    label: '0-转账取款'
  }, {
    value: '1',
    label: '1-转账取款'
  }],
  operationTypes5553: [{// 5553操作类型
    value: '0',
    label: '0-查询'
  }, {
    value: '1',
    label: '1-入库'
  }, {
    value: '2',
    label: '2-调阅'
  }, {
    value: '3',
    label: '3-销毁'
  }
  ],
  BGQX5553: [{// 5553保管期限
    value: '00',
    label: '3年'
  }, {
    value: '01',
    label: '5年'
  }, {
    value: '02',
    label: '15年'
  }, {
    value: '03',
    label: '永久'
  }
  ],
  ZZTypes5554: [{// 5554轧帐类型
    value: '0',
    label: '0-柜员轧帐'
  }, {
    value: '1',
    label: '1-网点轧帐'
  }
  ],
  YwLChangeTypes2007: [{// 2007业务量浮动方式
    value: '0',
    label: '按月浮动'
  }, {
    value: '1',
    label: '按日浮动'
  }
  ],
  floatDirection2007: [{// 2007业务量浮动方向
    value: '0',
    label: '上升'
  }, {
    value: '1',
    label: '下降'
  }
  ],
  DfloatType2007: [{// 2007日业务量浮动方式
    value: '0',
    label: '比率'
  }, {
    value: '1',
    label: '业务量'
  }
  ],
  tradeType2007: [{// 2007日业类别
    value: 'G',
    label: '对私'
  }, {
    value: 'C',
    label: '对公'
  }
  ],
  operationTypes5555: [{// 5555查询类型
    value: '1',
    label: '开客户'
  }, {
    value: '2',
    label: '开销户'
  }
  ],
  LXTypes5555: [{// 5555查询类型
    value: '0',
    label: '销户'
  }, {
    value: '1',
    label: '开户'
  }
  ],
  certificateTypes: [{ // 存款查询登记簿凭证类型
    value: '738',
    label: '借记卡'
  }, {
    value: '734',
    label: '普通存折'
  }, {
    value: '735',
    label: '一本通'
  }, {
    value: '754',
    label: '定期一本通'
  }, {
    value: '737',
    label: '储蓄存单'
  }, {
    value: '748',
    label: '水费专用存折'
  }, {
    value: '747',
    label: '燃气费专用存折'
  }, {
    value: '757',
    label: '168存折'
  }],
  LWHCJGTypes: [{ // 联网核查结果
    value: '00',
    label: '公民身份号码与姓名一致，且存在照片'
  }, {
    value: '01',
    label: '号码与姓名一致，照片存在但不符'
  }, {
    value: '02',
    label: '号码与姓名一致，但照片不存在'
  }, {
    value: '03',
    label: '号码存在于姓名不匹配'
  }, {
    value: '04',
    label: '号码不存在'
  }, {
    value: '05',
    label: '其他'
  }],
  examSTATUS: [{// 考试状态
    value: '0',
    label: '无效'
  }, {
    value: '1',
    label: '有效'
  }
  ],
  YJ_TYPE: [{// 预警类型
    value: 'AGENT',
    label: '柜员代办'
  }, {
    value: 'YDKH',
    label: '异地开户'
  }
  ],
  YJ_STATUS: [{// 预警状态
    value: '0',
    label: '差错'
  }, {
    value: '1',
    label: '正常'
  }, {
    value: '2',
    label: '下发'
  }, {
    value: '3',
    label: '结束'
  }
  ],
  zoneInfos: [{// 地区类型
    value: '00',
    label: '总行'
  }, {
    value: '01',
    label: '长春'
  }, {
    value: '02',
    label: '吉林'
  }, {
    value: '03',
    label: '辽源'
  }, {
    value: '04',
    label: '通化'
  }, {
    value: '05',
    label: '松原'
  }, {
    value: '06',
    label: '延吉'
  }, {
    value: '07',
    label: '四平'
  }, {
    value: '08',
    label: '白城'
  }, {
    value: '09',
    label: '白山'
  }, {
    value: '10',
    label: '大连'
  }, {
    value: '11',
    label: '沈阳'
  }, {
    value: '99',
    label: '全行'
  }
  ],
  examTypes: [{// 考试类型
    value: '01',
    label: '业务知识'
  }, {
    value: '04',
    label: '交易操作'
  }
  ]
}

const combo = { ...serviceModule }

export default combo
