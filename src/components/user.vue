<template>
  <div class="user">
    <div class="user-msg">
      <img class="avatar" v-if="userFlag" src="../assets/index/userDefault.png">
      <img class="avatar" v-else :src="userMsg.avatar">
      <router-link v-if="userFlag" class="registerBtn" tag="button" to="/center">点我认证</router-link>
      <span v-else>{{ userMsg.nickName }}</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default{
  data () {
    return{
      userFlag: true,
      userMsg:{
          avatar: require('../assets/tabBar/index.png'),
          nickName: "sawyerJames"
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
    height: 16rem;
    background: url(../assets/bg/indexBg.png);
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
    background:rgba(87,169,202,0.5);
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
</style>
