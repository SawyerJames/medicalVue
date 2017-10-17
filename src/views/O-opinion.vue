<template>
  <div class="o-opinion">
    <h5>请提出您的宝贵意见</h5>
    <!-- 意见表单 -->
    <form action="" method="get">
      <textarea class="opinion-textarea" placeholder="点击编辑，非常感谢您的宝贵意见，我们会酌情考虑，不断优化我们的服务" name="opinion"></textarea>
      <button type="submit" class="opinion-sub">提交确认</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'o-opinion',
    created(){
      document.body.style.background = "#FFF";
    },
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .o-opinion{
    width: 100%;
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
  .o-opinion h5{
    padding-left: 5%;
    margin: 1rem 0;
    color: #305f89;
    letter-spacing: 1px;
  }
  form{
    width: 90%;
    margin: 0 auto;
    font-size: .875rem;
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
  .opinion-textarea{
    width: 100%;
    height: 15rem;
    padding: .5rem;
    outline: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #305f89;
    -webkit-box-shadow: 1px 1px 10px 1px #E6E6E6;
    box-shadow: 1px 1px 10px 1px #E6E6E6;
    margin-bottom: 2rem;
  }
  .opinion-sub{
    color: #fff;
    width: 40%;
    height: 2.5rem;
    margin: 0 auto;
    outline: none;
    border: none;
    background: #305f89;
    border-radius: .3rem;
    -webkit-box-shadow: 1px 1px 10px 1px #C5C5C5;
    box-shadow: 1px 1px 10px 1px #C5C5C5;
  }
</style>
