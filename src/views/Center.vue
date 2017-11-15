<template>
  <div class="center">
    <!-- 报错弹窗 -->
    <div class="errorMask" v-if="errShow"></div>
    <div class="errorWin" v-if="errShow">
      <img src="../assets/common/ErrLoading.gif">
      <p>{{errTxt}}</p>
    </div>
    <!-- 个人中心-路由跳转详情页 -->
    <router-link :to="{name:'user'}" class="center-model center-model-main">
      <div class="center-model-main-div">
        <div>
          <img class="avatar" :src="userMsg.HeadImgUrl">
          <!-- img -->
        </div>
        <div>
          <p>{{userMsg.username}}</p>
          <p>{{userMsg.phone}}</p>
        </div>
      </div>
      <img class="arrow" src="../assets/common/arrow_white.png">
    </router-link>
    <!-- 手机号码： 动态绑定 -->
    <div class="center-model">
      <span>手机号码认证</span>
      <div>
        <span>{{userMsg.phone}}</span>
        <img class="phoneTrue" src="../assets/user/phoneTrue.png">
      </div>
    </div>
    <!-- 身份信息：动态绑定 -->
    <div class="center-model">
      <span>身份信息认证</span>
      <div>
        <span>{{userMsg.card}}</span>
        <img class="phoneTrue" src="../assets/user/nameTrue.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'center',
    data () {
      return {
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
          process.env.API_HOST + 'Client/BasicInfo',
          function success (res) {
            var resData = res.data;
            if (resData.State.Code == 1) {
              that.userMsg = resData.Info;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .center{
    width: 100%;
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
  /*列表栏样式封装*/
  .center-model{
    width: 100%;
    padding: 0 5%;
    height: 4rem;
    font-size: .875rem;
    background: #fff;
    border-bottom: 1px solid #ddd;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
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
  .center-model>div{
    font-size: .75rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }
  .center-model>span{
    color: #5f5f5f;
    font-size: .75rem;
    background: #EFEFEF;
    padding: .2rem .75rem;
    border-radius: 1rem;
  }
  /*第一栏主控:样式修正*/
  .center-model-main{
    background: #7DC5DC;
    height: 5rem;
    border-bottom: none;
    color: #fff;
  }
  .center-model-main>div p:first-child{
    font-size: .875rem;
    margin-bottom: 3px;
  }
  /*图片处理*/
  .arrow{
    width: 1rem;
    margin-left: .5rem;
  }
  .avatar{
    width: 3rem;
    height: 3rem;
    border-radius: .3rem;
    border: 2px solid #BFE6F2;
    margin-right: .5rem;
  }
  .nameTrue,.phoneTrue{
    height: 1rem;
    margin-left: .5rem;
  }
</style>
