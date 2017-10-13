<template>
  <div class="pay-other clearfix">
    <!-- 代缴信息填写表单 -->
    <form class="pay-other-msg" v-if="formConfig">
      <div class="pay-other-model clearfix">
        <span class="userMsg-title">姓名
          <input type="text" class="pay-other-form  pay-form-name" placeholder="请输入信息"></input>
        </span>
        <span class="userMsg-title pay-float">关系
          <select class="pay-other-form" name="" id="">
            <option value="0">父子</option>
            <option value="1">父女</option>
            <option value="2">母子</option>
            <option value="3">母女</option>
          </select>
        </span>
      </div>
      <div class="pay-other-model">
        <span class="userMsg-title">身份证号
          <input type="number" class="pay-other-form" placeholder="请输入18位身份证号码"></input>
        </span>
      </div>
    </form>

    <!-- 代缴信息按钮：点击发送数据并查询数据 -->
    <button :class="['pay-other-confirmBtn',{payConfirmBtnTrue: formConfig}]" type="submit">
      <img src="../assets/pay/true.png" alt="确认">
      <span>确认</span>
    </button>

    <!-- 查询数据success：返回支付弹窗 -->
    <div class="pay-other-successWin" v-if="aaa">
      <!-- 如果需要代缴 -->
      <div class="pay-other-true" v-if="bbb">
        <div class="pay-other-model">
          <span class="userMsg-title">姓名
            <span class="userMsg-kind">王博博</span>
          </span>
          <span class="userMsg-title">险别种类
            <span class="userMsg-kind">医疗保险</span>
          </span>
        </div>
        <div class="pay-other-model">
          <span class="userMsg-title">身份证号
            <span class="userMsg-kind">2202021991020112132</span>
          </span>
        </div>
        <div class="pay-other-model">
          <h1 class="userMsg-title">应缴金额</h1>
          <span>您应缴费
            <span class="userMsg-kind">医疗保险</span>费：
            <span class="model-text">5500.00元</span>
          </span>
        </div>
        <div class="pay-other-model noBorder">
          <span class="userMsg-title">待遇期
            <span class="userMsg-kind">2017-7-1至2018-7-1</span>
          </span>
        </div>
        <button class="pay-other-submit">立即缴费</button>
      </div>

      <!-- 如果不需要代缴 -->
      <div class="noPay" v-else>
        <img src="../assets/common/noData.png" alt="无数据">
        <span>您没有任何保险费用需要交纳！</span>
      </div>
    </div>

    <!-- 查询数据error：返回错误弹窗 -->
    <div class="pay-other-errorWin" v-if="ccc">
      <img src="../assets/common/noData.png" alt="信息不存在">
      <div>
        <p>您输入的代缴人不存在</p>
        <p>请重新核实身份信息</p>
      </div>
    </div>

    <!-- 添加代缴信息 -->
    <div :class="['pay-other-addBtn',{payAddBtnTrue : formConfig}]" @click="showForm">
      <img src="../assets/pay/add.png" alt="添加代缴人">
      <span>添加代缴信息</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pay-other',
    data () {
      return {
        aaa: false,
        bbb: false,
        ccc: false,
        formConfig: false
      }
    },
    methods:{
      showForm () {
        this.formConfig = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*pay-other common*/
  .pay-other{
    font-size: .875rem;
  }
/*支付弹窗*/
  .pay-other-successWin{
    border: 1px solid #ddd;
    font-size: .875rem;
    margin: .7rem auto 0;
    width: 80%;
    padding: 5%;
    border-radius: .5rem;
    -webkit-box-shadow: 1px 1px 10px 1px #E5E5E5;
    box-shadow: 1px 1px 10px 1px #E5E5E5;
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
  .pay-other-model{
    padding:  .7rem 0;
    border-bottom: 1px dashed #ddd;
  }
  .pay-other-model:last-child{
    border: none;
    margin-bottom: 0;
  }
  .pay-other .noBorder{
    border: none;
  }
  .userMsg-name{
    font-weight: bold;
    font-size: 1rem;
    margin-right: 1rem;
  }
  .userMsg-title{
    color: #31679C;
    font-weight: bold;
  }
  .userMsg-kind{
    color: #5F5F5F;
    background: #EFEFEF;
    padding: 2px .5rem;
    margin: .5rem;
    border-radius: 1rem;
    font-weight: normal;
  }
  .pay-other-submit{
    width: 100%;
    height: 2.5rem;
    border: none;
    border-radius: .25rem;
    background: #C1E3D5;
    color: #31679C;
    font-weight: bold;
    font-size: 1rem;
    outline: none;
    letter-spacing: 1px;
  }
  .pay-other-submit:active{
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
  /*添加代缴人按钮*/
  .pay-other-addBtn{
    width: 80%;
    height: 5rem;
    margin: -2rem auto 0;
    background: #ABDDF1;
    border-radius: .5rem;
    color: #31679C;
    letter-spacing: 1px;
    padding-bottom: .5rem;
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
    text-align: center;
  }
  .pay-other-addBtn img{
    width: 3rem;
    margin: .5rem 0;
  }
  .payAddBtnTrue{
    display: none;
  }
  /*代缴信息填写表单*/
  .pay-other-msg{
    width: 90%;
    margin: 0 auto;
  }
  .pay-other-form{
    border: none;
    margin: 0 .5rem;
    background: #EFEFEF;
    color: #5F5F5F;
    padding: 2px .5rem;
    border-radius: 1rem;
    font-weight: normal;
    outline: none;
  }
  .pay-other-msg .pay-form-name{
    width: 5rem;
  }
  .pay-other-confirmBtn{
    width: 0%;
    height: 5.5rem;
    border: none;
    border-radius: .5rem;
    background: #C1E3D5;
    color: #31679C;
    letter-spacing: 1px;
    padding-bottom: .5rem;
    margin:0 auto;
    outline: none;
    -webkit-transition: width .2s;
    -o-transition: width .2s;
    transition: width .2s;
    text-align: center;
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
  }
  .pay-other-confirmBtn img{
    display: none;
  }
  .pay-other-confirmBtn span{
    display: none;
  }
  .payConfirmBtnTrue{
    width: 80%;
    -webkit-transition: width .2s;
    -o-transition: width .2s;
    transition: width .2s;
  }
  .payConfirmBtnTrue img{
    display: block;
    width: 3rem;
    margin: .5rem auto .2rem;
  }
  .payConfirmBtnTrue span{
    display: block;
    font-size: 1rem;
    font-weight: bold;
    color: #31679C;
  }
  .payConfirmBtnTrue:active{
    background: #85D6B4
  }
  /*信息查询失败返回弹窗*/
  .pay-other-errorWin{
    position: fixed;
    width: 76%;
    left: 50%;
    top: 50%;
    margin-left: -40%;
    border: 1px solid #ddd;
    border-radius: .3rem;
    background: #fff;
    padding: 2%;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
    z-index: 10;
  }
  .pay-other-errorWin img{
    display: inline-block;
    width: 3rem;
    height: 3rem;
  }
</style>
