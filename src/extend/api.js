// API接口地址
const api = process.env.API_HOST;

// 接口配置
const API = {
  // 基础信息
  basicInfo : api + 'Client/BasicInfo',
  // 用户详细信息
  userInfo: api + 'Station/UserInfo',

  // user组件
  user: api + 'Client/Certification',
  // 地址相关 (二次接收、获取列表、抛出地址)
  doubleGetAdd: api + 'Station/AddressConversion',
  getAdd: api + 'Station/ThreeLinkage/parentid/',
  postAdd: api + 'Station/SaveAddress',

  // 上传照片
  postImg: api + 'Station/HandleBase64',

  // 获取验证码
  getCode: api + 'Station/VerificationCode',

  // 修改手机相关
  modPhone: api + 'Station/VerificationOldPhone',
  modNewPhone: api + 'Station/ModifyNewPhone',

  // 民族相关
  notion: api + 'Station/ModifyEthnic',

  // 缴费列表
  getPaymentList: api + 'Station/PaymentDetails',

  // 解除绑定
  unbund: api + 'Station/UnbindCard',

  // 通知公告
  noticeList: api + 'Station/NoticeList',
  noticeInfo: api + 'Station/NoticeInfo/id/',
  opinion: api + 'Station/Opinion',

  // 支付相关
  getMyPay: api + 'Client/PaymentInfo',
  payMay: api + 'Station/WechatPayment?status=1',
  getOther: api + 'Station/InsteadList',
  addOther: api + 'Station/AddInstead',
  seeOther: api + 'Station/InsteadInfo',
  payOther: api + 'Station/WechatPayment',
  unbundOther: api + 'Station/DelInstead',

  // 注册相关
  register: api + 'Client/Register',
  phoneRegister: api + 'Station/VerifyPhone',

  // 搜索相关
  searchMy: api + 'Client/IntegratedInfo',
  searchOther: api + 'Client/PaymentInfo/status/1'
};
export default API;
