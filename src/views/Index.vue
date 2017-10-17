<template>
  <div class="index">
    <!-- 个人信息模块 -->
    <user></user>
    <!-- 医保管理 -->
    <span class="medical-title">医保管理</span>
    <ul class="medical-manage">
      <router-link tag="li" to="/search">
        <img src="../assets/index/mid-search.png">
        <span>微信查询</span>
      </router-link>
      <router-link tag="li" to="/pay">
        <img src="../assets/index/mid-pay.png">
        <span>微信缴费</span>
      </router-link>
      <router-link tag="li" to="/notice">
        <img src="../assets/index/mid-notice.png">
        <span>通知公告</span>
      </router-link>
    </ul>
    <!-- 下部其他信息模块 -->
    <otherMsg></otherMsg>
  </div>
</template>

<script>
  import user from "@/components/user.vue"
  import otherMsg from "@/components/otherMsg.vue"
  export default {
    name: 'index',
    data () {
      return {

      }
    },
    created(){
      document.body.style.background = "#FFF";
    },
    methods: {

    },
    components: {
      user,
      otherMsg
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{
    width: 100%;
  }
  .medical-manage{
    width: 100%;
    height: 8rem;
    border-bottom: 1rem solid #EDF2F5;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .medical-manage li{
    width: 33.3%;
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
  .medical-manage li img{
    height: 3rem;
    margin-bottom: .5rem;
  }
  .medical-manage li span{
    font-size: .875rem;
    font-weight: bold;
    color: #31679C;
  }
  .medical-title{
    display: block;
    margin: 1rem 0 0 5%;
    font-size: .875rem;
    color: #8C8C8C;
  }
</style>
