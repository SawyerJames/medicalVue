<template>
  <div class="pay-my">
    <div class="pay-my-true" v-if="search.flag">
      <div class="pay-my-model">
        <span class="userMsg-name">张天天</span>
        <span>险别种类：<span class="userMsg-kind">医疗保险</span></span>
      </div>
      <div class="pay-my-model">
        <span>您应缴费<span class="userMsg-kind">医疗保险</span>费：<span class="model-text">5500.00元</span></span>
      </div>
      <div class="pay-my-model">
        <span>待遇期：2017-7-1至2018-7-1</span>
      </div>
      <button class="pay-my-submit">立即缴费</button>
    </div>
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
        search:{
          flag: true
        }
      }
    },
    created(){
      document.body.style.background = "#FFF";
    },
    // el未挂载->获取缴费信息
    mounted () {
      this.$nextTick(function (){

      });
    }
  }
</script>·
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pay-my,.pay-my-true{
    font-size: .875rem;
    margin-top: .2rem;
    width: 90%;
    padding: 0 5%;
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
    margin: .7rem auto 0;
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
