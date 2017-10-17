<template>
  <div class="center-user">
    <!-- 上半部头像选项卡 -->
    <div class="center-user-top">
      <img :src="userMsg.avatar">
      <span>{{userMsg.nickName}} · 个人信息</span>
    </div>
    <!-- 下半部个人详细信息 -->
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_name.png">
        <span class="center-user-model-title">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名</span>
      </div>
      <div>
        <span>{{userMsg.trueName}}</span>
        <img class="center-user-model-flag" src="../assets/user/nameTrue.png">
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_sex.png">
        <span class="center-user-model-title">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别</span>
      </div>
      <div>
        <span>{{userMsg.sex}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_add.png">
        <span class="center-user-model-title">住&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp址</span>
      </div>
      <div>
        <span>{{userMsg.address}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_birthday.png">
        <span class="center-user-model-title">出生日期</span>
      </div>
      <div>
        <span>{{userMsg.birthday}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_phone.png">
        <span class="center-user-model-title">联系电话</span>
      </div>
      <div>
        <span>{{userMsg.phone}}</span>
      </div>
    </div>
    <div class="center-user-model">
      <div>
        <img src="../assets/user/u_idCard.png">
        <span class="center-user-model-title">身份证号</span>
      </div>
      <div>
        <span>{{userMsg.idCard}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'center-user',
    created(){
      document.body.style.background = "#FFF";
    },
    data () {
      return {
        userMsg: {
          nickName: "sawyerJames",
          phone: "13894892758",
          idCard: "220202199402222222",
          avatar: require('../assets/user/user.png'),
          birthday: "1994-02-11",
          sex: "男",
          trueName: "张天天",
          address: "吉林省吉林市中海国际社区"
        }
      }
    }
  }
</script>

<style type="text/css">
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
  }
  .center-user-model>div{
    width: 100%;
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
