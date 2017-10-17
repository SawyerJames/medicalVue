<template>
  <div class="pay">
    <!-- 个人信息组件 -->
    <user></user>
    <!-- 微信缴费组件: 默认为个人缴费 -->
    <div class="payTab">
      <router-link tag="div" v-for="(item,index) in payTabList" :to="{path: item.path}" :class="['payTab-li',{choosePayTab: currentIndex === index }]" @click.native="touchPayBar(index)">
        <img :src="item.imgUrl">
        <span>{{item.msg}}</span>
      </router-link>
    </div>
    <!-- 子路由展示 -->
    <router-view></router-view>
  </div>
</template>

<script>
  import user from '@/components/user'
  export default {
    name: 'pay',
    data () {
      return {
        payTabList: [
          {
            path: "/pay-my",
            imgUrl: require('../assets/pay/pay-my.png'),
            msg: "缴费信息"
          },
          {
            path: "/pay-other",
            imgUrl: require('../assets/pay/pay-other.png'),
            msg: "代缴保费"
          }
        ],
        currentIndex: 0
      }
    },
    created(){
      document.body.style.background = "#FFF";
    },
    methods: {
      touchPayBar (index) {
        this.currentIndex = index;
      }
    },
    components: {
      user
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*user Hack 去掉1rem边框*/
  .user{
    border-bottom: none;
  }
  .payTab{
    width: 100%;
    height: 9rem;
    border-bottom: .7rem solid #EDF2F5;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
  }
  .payTab-li:first-child{
    margin-right: 2px;
  }
  .payTab-li{
    width: 50%;
    height: 7rem;
    border-radius: .2rem;
    background: #EFEFEF;
    color: #9D9D9D;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
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
  .payTab-li img{
    width: 2.5rem;
    margin-bottom: .5rem;
  }
  .payTab-li span{
    font-size: .875rem;
  }
  .choosePayTab{
    background: #fff;
    border: 1px dashed #E5F7FF;
    -webkit-box-shadow: 1px 1px 10px 2px #CCEFFF;
    box-shadow: 1px 1px 10px 2px #CCEFFF;
    color: #31679C;
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
  }
</style>
