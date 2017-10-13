<template>
  <div id="app">
    <router-view></router-view>
    <!-- tabBar container -->
    <div class="tabHack"></div>
    <ul class="tabBarContainer">
      <!-- router list-for -->
      <router-link v-for="(item,index) in tabBarList" @click.native="touchBar(index)" tag="li" class="tabBar" :to="{path: item.path}">
        <!-- tabBar icon & msg -->
        <img v-if="index === isIndex" :src="item.imgUrlChoose">
        <img v-else :src="item.imgUrl">
        <span>{{item.msg}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 引入初始化样式文件
import './css/reset.css'
import './css/media.css'

export default {
  name: 'app',
  data () {
    return {
      tabBarList: [
        {
          path: "/",
          imgUrl: require('./assets/tabBar/index.png'),
          imgUrlChoose: require('./assets/tabBar/indexChoose.png'),
          msg: "首页"
        },
        {
          path: "notice",
          imgUrl: require('./assets/tabBar/about.png'),
          imgUrlChoose: require('./assets/tabBar/aboutChoose.png'),
          msg: "关于我们"
        },
        {
          path: "center",
          imgUrl: require('./assets/tabBar/center.png'),
          imgUrlChoose: require('./assets/tabBar/centerChoose.png'),
          msg: "个人中心"
        }
      ],
      isIndex: 0
    }
  },
  // 控制tabBar
  methods: {
    touchBar (index) {
      this.isIndex = index;
    }
  }
}
</script>

<style>
  /*tabBar common*/
  .tabBarContainer{
    width: 100%;
    height: 4.375rem;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ddd;
    background: #fff;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .tabBar{
    width: 33.3%;
    height: 100%;
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
  .tabBar img{
    width: 2rem;
    height: 2rem;
    margin-bottom: .1rem;
  }
  .tabBar span{
    font-size: .875rem;
    color: #31679C;
  }
  .tabHack{
    width: 100%;
    height: 4.375rem;
  }
</style>
