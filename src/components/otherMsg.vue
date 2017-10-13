<template>
  <div class="otherMsg">
    <router-link tag="div" to="/notice">
      <div>
        <img class="o-icon" src="../assets/index/o-msg.png">
        <span>其他相关社保信息</span>
      </div>
      <img class="o-icon" src="../assets/common/arrow.png">
    </router-link>
    <router-link tag="div" to="/o-opinion">
      <div>
        <img class="o-icon" src="../assets/index/o-opinion.png">
        <span>意见反馈</span>
      </div>
      <img class="o-icon" src="../assets/common/arrow.png">
    </router-link>
  </div>
</template>

<script type="text/javascript">
</script>

<style type="text/css" scoped>
  .otherMsg{
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
  .otherMsg>div{
    width: 80%;
    height: 3rem;
    padding: 0 10%;
    border-bottom: 1px solid #ddd;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
  }
  .otherMsg>div:first-child{
    margin-top: .5rem;
  }
  .otherMsg>div>div{
    font-size: .875rem;
    color: #8C8C8C;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }
  .otherMsg .o-icon{
    width: 1.3rem;
    height: 1.3rem;
  }
  .otherMsg span{
    margin-left: .5rem;
  }
</style>
