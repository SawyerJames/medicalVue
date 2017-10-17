<template>
  <div class="user">
    <!-- flag为true，未认证 -->
    <div class="user-msg" v-if="userFlag">
      <img class="avatar" src="../assets/index/userDefault.png">
      <router-link v-if="userFlag" class="registerBtn" tag="button" to="/register">点我认证</router-link>
    </div>
    <!-- flag为false，信息认证 -->
    <div class="user-msgTrue" v-else>
      <div class="user-msgTrue-user">
        <div>
          <img class="avatar" :src="userMsg.avatar">
          <span :class="userMsg.sex ? 'boy':'girl'"></span>
          <span>{{userMsg.nickName}}</span>
        </div>
        <div>
          <img class="zhanghu" src="../assets/user/zhanghu.png">
          <img class="renzheng" src="../assets/user/renzheng.png">
        </div>
      </div>
      <div class="user-msgTrue-model">
        <span>保险类型</span>
        <span>{{userMsg.medicalType}}</span>
      </div>
      <div class="user-msgTrue-model">
        <span>待遇期</span>
        <span>{{userMsg.expire}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default{
  data () {
    return{
      userFlag: true,
      userMsg:{
          avatar: require('../assets/user/user.png'),
          nickName: "sawyerJames",
          medicalType: "医疗保险",
          expire: "2017-01-01至2018-01-01",
          sex: 0
      }
    }
  },
  methods: {
  }
}
</script>

<style type="text/css" scoped>
  .user{
    width: 100%;
    height: 14.5rem;
    background: url(../assets/user/userBg.png);
    -webkit-background-size: cover;
    background-size: cover;
    border-bottom: 1rem solid #EDF2F5;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
  }
  .user-msg{
    width: 90%;
    height: 70%;
    background: url(../assets/user/userFalseBg.png);
    -webkit-background-size: 100%;
    background-size: 100%;
    border-radius: .5rem;
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
  .avatar{
    width: 5rem;
    height: 5rem;
    margin-bottom: 1rem;
    border-radius: 5rem;
  }
  .registerBtn{
    height: 1.5rem;
    width: 5rem;
    background: #F7F7F7;
    border-radius: .2rem;
    border: none;
    -webkit-box-shadow: 0px 0px 10px 2px #ddd inset;
    box-shadow: 0px 0px 10px 2px #ddd inset;
    font-size: .875rem;
    font-weight: bold;
    color: #E44855;
    letter-spacing: 1px;
    outline: none;
  }
  /*信息验证通过后的user模块*/
  .user-msgTrue{
    width: 100%;
    height: 100%;
    font-size: .875rem;
    background: url(../assets/user/bg.png);
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
  }
  /*用户信息*/
  .user-msgTrue-user{
    width: 90%;
    margin: 10% auto 5%;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
  }
  .user-msgTrue-user>div{
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
  }
  .user-msgTrue-user>div .avatar{
    width: 4rem;
    height: 4rem;
    border-radius: 4rem;
    margin: 0 .5rem 0 0;
  }
  .user-msgTrue-user>div .zhanghu{
    height: 1.2rem;
    margin-right: .5rem;
  }
  .user-msgTrue-user>div .renzheng{
    height: 1.2rem;
  }
  /*性别选择*/
  .boy{
    width: 1.2rem;
    height: 1.2rem;
    background: url(../assets/user/boy.png);
    -webkit-background-size: 100%;
    background-size: 100%;
    margin-right: .5rem;
  }
  .girl{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .5rem;
    background: url(../assets/user/girl.png);
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  /*保险类型、待遇期模板样式*/
  .user-msgTrue-model{
    width: 90%;
    margin: 0 auto 1rem;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }
  .user-msgTrue-model span:first-child{
    color: #31679C;
    width: 4rem;
  }
  .user-msgTrue-model span:last-child{
    padding: 1px .875rem;
    border-radius: 1rem;
    background: #F8F8F8;
    color: #484848;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
  }
  .user-msgTrue-model:last-child{
    margin-bottom: 0;
  }
</style>
