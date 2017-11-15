<template>
  <div class="user">
    <!-- flag为true，未认证 -->
    <div class="user-msg" v-if="userFlag">
      <img class="avatar" src="../assets/index/userDefault.png">
      <keep-alive><router-link v-if="userFlag" class="registerBtn" tag="button" to="/register">点我认证</router-link></keep-alive>
    </div>
    <!-- flag为false，信息认证 -->
    <div class="user-msgTrue" v-else>
      <div class="user-msgTrue-user">
        <div>
          <router-link to="user"><img class="avatar" :src="userMsg.HeadImgUrl"></router-link>
          <span :class="[{ boy : userMsg.sex === '1'},{ girl : userMsg.sex === '2'}]"></span>
          <span>{{userMsg.username}}</span>
        </div>
        <keep-alive>
          <router-link to="user" tag="div">
            <img class="zhanghu" src="../assets/user/zhanghu.png">
            <img class="renzheng" src="../assets/user/renzheng.png">
          </router-link>
        </keep-alive>
      </div>
      <div class="user-msgTrue-model">
        <span>保险类型</span>
        <span>{{userMsg.medical_type}}</span>
      </div>
      <div class="user-msgTrue-model">
        <span>待遇期</span>
        <span>{{userMsg.currentdeadline}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default{
  data () {
    return{
      userFlag: '',
      userMsg:{}
    }
  },
  mounted () {
    this.$nextTick(function (){
      // 挂载前请求数据，判断认证，提交父组件参数popflag
      var that = this;
      this.$tools.GetDataFromServer(
        this,
        // process.env.API_HOST + 'Client/Certification',
        'http://hx.jltengfang.com/wap/Client/Certification',
        function success (res) {
          var resData = res.data;
          // 有数据存在
          if (resData.State.Code == 1) {
            // 认证通过
            if (resData.Info.Certification == 1) {
              that.userFlag = false;
              // 将认证信息存入全局状态中
              that.$store.state.userFlag = false;
              that.userMsg = resData.Info;
              /*向index组件抛出当前的认证状态*/
              that.$emit('flag',false);
            }
            // 认证不通过
            if (resData.Info.Certification != 1) {
              that.userFlag = true;
              // 将认证信息存入全局状态中
              that.$store.state.userFlag = true;
              /*向index组件抛出当前的认证状态*/
              that.$emit('flag',true);
            }
          }
          // 没有数据存在：认证不通过
          if (resData.State.Code != 1) {
            that.userFlag = true;
            // 将认证信息存入全局状态中
            that.$store.state.userFlag = true;
            /*向index组件抛出当前的认证状态*/
            that.$emit('flag',true);
          }
        },
        // 认证不通过
        function error (err){
          that.userFlag = true;
          // 将认证信息存入全局状态中
          that.$store.state.userFlag = true;
          /*向index组件抛出当前的认证状态*/
          that.$emit('flag',true);
        }
      );
    });
  }
}
</script>

<style type="text/css" scoped>
  .user{
    width: 100%;
    height: 13rem;
    background: #fff;
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
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .user-msg{
    width: 100%;
    height: 100%;
    background: url(../assets/user/userFalseBg.png);
    -webkit-background-size: 100%;
    background-size: 100%;
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
    border: .2rem solid #BFE6F2;
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
    background: url(../assets/user/bg.jpg);
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
    /*color: #3291CF;*/
    font-size: 1rem;
    font-weight: bold;
    margin: 5% auto;
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
