<template>
  <div class="center-user">
    <!-- 报错弹窗 -->
    <div class="errorMask" v-if="errShow"></div>
    <div class="errorWin" v-if="errShow">
      <img src="../assets/common/ErrLoading.gif">
      <p>{{errTxt}}</p>
    </div>
    <!-- 上半部头像选项卡 -->
    <div class="center-user-top">
      <img :src="userMsg.HeadImgUrl">
      <span>{{userMsg.WechatName}} · 个人信息</span>
    </div>
    <!-- 下半部个人详细信息 -->
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_name.png">
        <span class="center-user-model-title">姓名</span>
      </div>
      <div>
        <span>{{userMsg.UserName}}</span>
        <img class="center-user-model-flag" src="../assets/user/nameTrue.png">
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_sex.png">
        <span class="center-user-model-title">性别</span>
      </div>
      <div>
        <span>{{userMsg.Sex}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_idCard.png">
        <span class="center-user-model-title">身份证号</span>
      </div>
      <div>
        <span>{{userMsg.IDcard}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_add.png">
        <span class="center-user-model-title">家庭住址</span>
      </div>
      <div>
        <span>{{userMsg.Address}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_idCard.png">
        <span class="center-user-model-title">公司地址</span>
      </div>
      <div>
        <span>{{userMsg.Company}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_birthday.png">
        <span class="center-user-model-title">出生日期</span>
      </div>
      <div>
        <span>{{userMsg.Birthday}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_phone.png">
        <span class="center-user-model-title">联系电话</span>
      </div>
      <div>
        <span>{{userMsg.Phone}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'user',
    data (){
      return{
        userMsg: {},
        errShow: false,
        errTxt: ''
      }
    },
    mounted () {
      this.$nextTick (function () {
        this.getUserList();
      })
    },
    methods: {
      getUserList: function (){
        var that = this;
        // 加载数据
        this.$tools.GetDataFromServer(
          this,
          process.env.API_HOST + 'Client/UserInfo',
          function success (res) {
            var resData = res.data;
            if (resData.State.Code == 1) {
              that.userMsg = resData.MemberInfo;
            }
          },
          function error (err){
            that.errShow = true;
            that.errTxt = '出现错误，请重新加载'
            var errLoading = setTimeout(function (){
              that.errShow = false;
              that.errTxt = ''
              clearTimeout(errLoading);
            },2000)
          }
        )
      }
    }
  }
</script>

<style type="text/css" scoped>
  .center-user{
    font-size: .875rem;
  }
  .center-user-top{
    width: 100%;
    height: 10rem;
    background: url(../assets/user/userFalseBg.png);
    -webkit-background-size: 100%;
    background-size: 100%;
    color: #31679C;
    font-weight: bold;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
  }
  .center-user-top img{
    width: 4rem;
    height: 4rem;
    border-radius: 4rem;
    border: 2px solid #FFFFFF;
    margin-bottom: .5rem;
  }
  /*个人信息模板化样式*/
  .center-user-model{
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid #ddd;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
  }
  .center-user-model-title{
    padding: 1px .5rem;
    background: #EFEFEF;
    color: #5F5F5F;
    border-radius: 1rem;
    min-width: 4rem;
    text-align: center;
  }
  .center-user-model>div{
    width: 100%;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }
  .center-user-model>div img{
    height: 1.2rem;
    margin: 0 .5rem 0 1rem;
  }
  .center-user-model>div:last-child span{
    font-size: .75rem;
  }
  /*认证信息*/
  .center-user-model>div .center-user-model-flag{
    height: 1rem;
  }
</style>
