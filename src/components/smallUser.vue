<template>
    <div class="small-user">
      <div class="small-user-msgTrue-user">
        <div class="small-left">
          <router-link to="user"><img class="avatar" :src="userMsg.HeadImgUrl"></router-link>
          <span :class="[{ boy : userMsg.sex === '1'},{ girl : userMsg.sex === '2'}]"></span>
          <span>{{userMsg.username}}</span>
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
      var that = this;
      this.$tools.GetDataFromServer(
        this,
        this.API.basicInfo,
        // process.env.API_HOST + 'Client/BasicInfo',
        function success (res) {
          var resData = res.data;
          // 有数据存在
          if (resData.State.Code == 1) {
              that.userMsg = resData.Info;
          }
        },
        // 认证不通过
        function error (err){
          return;
        }
      );
    });
  }
}
</script>

<style type="text/css" scoped>
  .small-user{
    width: 100%;
    padding: 0 5%;
    font-size: .875rem;
    background: url(../assets/user/bg.jpg);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    /*flex*/
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
  }
  /*用户信息*/
  .small-user-msgTrue-user{
    width: 100%;
    font-size: 1rem;
    font-weight: bold;
    margin: 1rem auto;
    /*flex*/
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
  }
  .small-user-msgTrue-user .small-left{
    /*flex*/
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
  }
  /*头像*/
  .small-user-msgTrue-user .small-left .avatar{
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    margin: 0 .5rem 0 0;
    border: 1px solid #ddd;
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
</style>
