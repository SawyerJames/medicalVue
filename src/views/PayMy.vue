<template>
  <div class="pay-my">
    <!-- 报错弹窗 -->
    <div class="errorMask" v-if="errShow"></div>
    <div class="errorWin" v-if="errShow">
      <img src="../assets/common/ErrLoading.gif">
      <p>{{errTxt}}</p>
    </div>
    <div class="pay-my-true" v-if="flag">
      <div class="pay-my-model">
        <span class="userMsg-name">{{payMsg.username}}</span>
        <span>险别种类：<span class="userMsg-kind">{{payMsg.insurance_type1}}</span></span>
      </div>
      <div class="pay-my-model">
        <span>您应缴费<span class="userMsg-kind">{{payMsg.payment_amount}}</span>费：<span class="model-text">{{payMsg.payment_amount}}元</span></span>
      </div>
      <div class="pay-my-model">
        <span>待遇期：{{payMsg.valid_period}}</span>
      </div>
      <button class="pay-my-submit" @click="payMy">立即缴费</button>
    </div>
    <!-- 没有数据时 -->
    <div class="noPay" v-else>
      <img src="../assets/common/noData.png" alt="无数据">
      <span>您没有任何保险费用需要交纳！</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pay-my',
    data () {
      return{
        flag: true,
        // 获取数据
        payMsg: {},
        // 报错弹窗
        errShow: false,
        errTxt: '',
        // axios数据
        postData: {
          status: 1
        }
      }
    },
    mounted () {
      this.$nextTick(function (){
        this.getPayMsg();
      });
    },
    methods: {
      // 发送数据
      payMy () {
        window.location.href = 'Client/WechatPayment/status/1';
      },
      // 请求数据
      getPayMsg: function(){
        var that = this;
        // 加载数据
        this.$tools.PostDataToServer(
          this,
          process.env.API_HOST + 'Client/PaymentInfo',
          this.postData,
          function success (res) {
            var resData = res.data;
            if (resData.State.Code == 1) {
              that.payMsg = resData.Info;
            }
            if (resData.Info.payment_amount == '' || resData.Info.payment_amount == null){
              that.flag = false;
            }
          },
          function error (err){
            that.errShow = true;
            that.errTxt = '出现错误，请重新加载'
            var errLoading = setTimeout(function (){
              that.errShow = false;
              that.errTxt = ''
              clearTimeout(errLoading);
            },2000);
          }
        )
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pay-my,.pay-my-true{
    font-size: .875rem;
    margin-top: .2rem;
    width: 90%;
    padding: 0 5%;
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
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
  }
  .pay-my-true{
    border: 1px solid #ddd;
    font-size: .875rem;
    margin: 1rem auto;
    border-radius: .5rem;
  }
  .pay-my-model{
    padding: .5rem 0;
    border-bottom: 1px dashed #ddd;
  }
  .pay-my-model:last-child{
    margin-bottom: 0;
    border-bottom: none;
  }
  .userMsg-name{
    font-weight: bold;
    font-size: 1rem;
    margin-right: 1rem;
  }
  .userMsg-kind{
    color: #5F5F5F;
    background: #EFEFEF;
    padding: 2px .5rem;
    margin: .5rem;
    border-radius: 1rem;
  }
  .pay-my-submit{
    height: 2.5rem;
    border: none;
    border-radius: .25rem;
    background: #C1E3D5;
    color: #31679C;
    font-weight: bold;
    font-size: 1rem;
    margin: .5rem 0;
    outline: none;
    letter-spacing: 1px;
  }
  .pay-my-submit:active{
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
    background: #6CD1A7;
  }
  /*没有交纳费用是提供的数据*/
  .noPay{
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
    -ms-align-items: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
  }
  .noPay img{
    width: 4rem;
    margin: 1rem 0;
  }
</style>
