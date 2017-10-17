<template>
  <div class="register">
    <!-- 上半屏展示图片 -->
    <div class="register-top">
      <span></span>
    </div>
    <form action="" method="post">
      <div class="register-model">
        <span>姓名</span>
        <input type="text" name="userName" placeholder="请输入姓名"></input>
      </div>
      <div class="register-model">
        <span>性别</span>
        <div>
          <input type="radio" name="sex" value="boy">先生</input>
          <input type="radio" name="sex" value="girl">女士</input>
        </div>
      </div>
      <div class="register-model">
        <span>验证码</span>
        <input type="number" name="verification" placeholder="请输入验证码"></input>
      </div>
      <div class="register-model">
        <span>联系电话</span>
        <input type="number" name="phone" placeholder="请输入联系电话"></input>
      </div>
      <div class="register-model">
        <span>身份证号</span>
        <input type="number" name="idCard" placeholder="请输入身份证号"></input>
      </div>
      <div class="register-model">
        <span>出生日期</span>
        <input type="text" name="birthday"></input>
      </div>
      <button type="button" class="formSubmitBtn">立即注册</button>
    </form>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'register',
    created(){
      document.body.style.background = "#FFF";
    },
    data () {
      return {

      }
    }
  }
</script>

<style type="text/css">
  .register-top{
    width: 100%;
    height: 10rem;
    background: url(../assets/user/register.png);
    -webkit-background-size: 100%;
    background-size: 100%;
    margin-bottom: 1rem;
  }
  form{
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
  .register-model{
    width: 90%;
    height: 2.5rem;
    margin: 0 5%;
    font-size: .875rem;
    border-bottom: 1px solid #3291CF;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
  }
  .register-model>input{
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
    outline: none;
    padding: 0 .5rem;
    font-size: .75rem;
    border: none;
  }
  .register-model div{
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
  }
  .register-model div input{
    outline: none;
    margin: .5rem;
  }
  .register-model span{
    color: #5F5F5F;
    width: 3.5rem;
    background: #efefef;
    padding: 1px .5rem;
    border-radius: .5rem;
    margin-right: 1rem;
  }
  form .formSubmitBtn{
    width: 40%;
    height: 2rem;
    line-height: 2rem;
    font-size: .875rem;
    color: #fff;
    background: #3291CF;
    margin: 2rem auto 0;
    border: none;
    border-radius: 2rem;
    outline: none;
  }
</style>
