<template>
  <div class="index">
    <!-- 个人信息模块 -->
    <keep-alive><user @flag="flagPop"></user></keep-alive>
    <router-view></router-view>
    <!-- 医保管理 -->
    <div v-if = "tabMana">
      <span class="medical-title">医保管理</span>
      <ul class="medical-manage">
        <router-link tag="li" :to="{path: list_1}">
          <img src="../assets/index/mid-search.png">
          <span>微信查询</span>
        </router-link>
        <router-link tag="li" :to="{path: list_2}">
          <img src="../assets/index/mid-pay.png">
          <span>微信缴费</span>
        </router-link>
        <router-link tag="li" :to="{path: list_3}">
          <img src="../assets/index/mid-notice.png">
          <span>通知公告</span>
        </router-link>
      </ul>
      <!-- 其他信息 -->
      <otherMsg></otherMsg>
    </div>
  </div>
</template>

<script>
  import user from "@/components/user.vue"
  import otherMsg from "@/components/otherMsg.vue"
  export default {
    name: 'index',
    data () {
      return {
        userFlag: '',
        list_1: "search",
        list_2: "pay",
        list_3: "notice",
        tabMana: true,
      }
    },
    mounted () {
      this.$nextTick(function (){
        // 调用方法flagPop
        this.flagPop();
      });
    },
    watch: {
      "$route": "fetchDate"
    },
    methods: {
      // 接受的子组件传递参数flag->认证标志，进行全局缓存，进一步判断
      flagPop(flag){
        this.$store.state.userFlag = flag;
        this.userFlag = flag;
        // 如果认证为true，则不通过，为注册页
        if (flag == true ) {
          this.list_1 = 'register';
          this.list_2 = 'register';
        }
        // 如果认证通过，开通相应权限
        if (flag == false) {
          this.list_1 = 'search';
          this.list_2 = 'pay';
        }
      },
      fetchDate(){
        if (this.$route.name == 'search' || this.$route.name == 'pay-my') {
          this.tabMana = false;
        }
        if (this.$route.name == 'Index') {
          this.tabMana = true;
        }
      }
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
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .medical-manage li{
    width: 33.3%;
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
