<template>
    <div id="app">
        <!-- loading页面加载 -->
        <div id="loading" v-if="loading">
            <div class="loadingBottom">
                <h1>智慧医保</h1>
                <img class="loadingImg" src="./assets/common/Heart.gif">
                <p>奋力加载...</p>
            </div>
        </div>
        <!-- 外层容器：包裹所有内容，loading控制显隐,v-show用来预加载-->
        <div v-show="!loading">
            <!-- 路由缓存&切换 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            <!-- tabBar 容器 -->
            <div class="tabHack"></div>
            <ul class="tabBarContainer">
                <!-- router list-for -->
                <router-link v-for="(item,index) in tabBarList" @click.native="touchBar(index)" tag="li" class="tabBar" :to="{path: item.path}" replace>
                    <!-- tabBar icon & msg -->
                    <img v-if="index === isIndex" :src="item.imgUrlChoose">
                    <img v-else :src="item.imgUrl">
                    <span>{{item.msg}}</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
// 引入初始化样式文件
import './css/reset.css'
import './css/media.css'
import './css/common.css'
export default {
    name: 'app',
    data() {
        return {
            tabBarList: [{
                path: "/",
                imgUrl: require('./assets/tabBar/index.png'),
                imgUrlChoose: require('./assets/tabBar/indexChoose.png'),
                msg: "首页"
            }, {
                path: "notice",
                imgUrl: require('./assets/tabBar/about.png'),
                imgUrlChoose: require('./assets/tabBar/aboutChoose.png'),
                msg: "关于我们"
            }, {
                path: "register",
                imgUrl: require('./assets/tabBar/center.png'),
                imgUrlChoose: require('./assets/tabBar/centerChoose.png'),
                msg: "个人中心"
            }],
            isIndex: 0,
            // 加载页面
            loading: true
        }
    },
    beforeCreate() {
        // 同步ajax获取用户认证状态
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get",'Check/IsSession',false);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // 如果授权成功，状态码为1，跳转到登录加载页
            if (xhr.responseText == 1 || xhr.responseText == "职工" || xhr.responseText == "居民") {
              that.$store.state.userType = xhr.responseText;
            }
            // 如果授权不成功，状态码不为1，跳转到Home页
            if (xhr.responseText == 0) {
              window.location.href = process.env.API_HOST + '/home';
            }
          }
        };
        // 进行ajax交互
        xhr.send();
    },
    created(){
      this.loadingGo();
    },
    // 监听路由
    watch: {
        "$route": "fetchDate"
    },
    // 控制tabBar
    methods: {
        // tabBar样式切换
        touchBar(index) {
            this.isIndex = index;
        },
        // 引导页：内部开始加载数据，数据加载完毕后关闭
        loadingGo() {
            var that = this;
            // 触发定时器函数
            var loadingTimer = setInterval(function() {
                // 获取全局状态码
                var flag = that.$store.state.userFlag
                    // 如果状态码不再等于undefined，说明数据加载完成
                if (flag != undefined) {
                    // 取消定时器，关闭loading，通过loadingHide函数改变路由认证
                    that.loadingHide();
                    clearInterval(loadingTimer);
                }
                // 最低时长为2s
            }, 2000);
        },
        // 加载页面结束：通过点击实现内部认证，改变路由状态？问题暂解决
        loadingHide() {
            this.loading = false;
            if (this.$store.state.userFlag == true) {
                this.tabBarList[2].path = 'register';
            }
            if (this.$store.state.userFlag == false) {
                this.tabBarList[2].path = 'center';
            }
        },
        // 修正返回键tab样式错乱bug
        fetchDate() {
            if (this.$route.name == 'Index') {
                this.isIndex =       0;
            }
        }
    }
}
</script>
<style>
body,
#app,
#app>div {
    height: 100%;
}
/*信息类新闻hack*/

.msgContent img {
    width: 100%;
    margin: .5rem 0;
    border-radius: .2rem;
    text-indent: 0rem !important;
}

.o-detail .msg,
.n-detail .msg {
    font-size: .75rem !important;
    margin: 1rem 0;
    text-align: left;
    color: #767676;
    display: inline-block;
    background: #eee;
    border-radius: .5rem;
    padding: .1rem .5rem;
}

/*tabBar common*/

.tabBarContainer {
    width: 100%;
    height: 4.375rem;
    position: fixed;
    bottom: 0;
    z-index: 10;
    border-top: 1px solid #ddd;
    background: #fff;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}

.tabBar {
    width: 33.3%;
    height: 100%;
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

.tabBar img {
    width: 2rem;
    height: 2rem;
    margin-bottom: .1rem;
}

.tabBar span {
    font-size: .875rem;
    color: #31679C;
}

.tabHack {
    width: 100%;
    height: 4.3rem;
}

#loading {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url(./assets/index/loadingBg.jpg);
    -webkit-background-size: 100%;
    background-size: 100%;
    top: 0;
    z-index: 9999;
    /*动画加载*/
    -webkit-animation-name: 'fade-in';
    -o-animation-name: 'fade-in';
    animation-name: 'fade-in';
    -webkit-animation-duration: 2s;
    -o-animation-duration: 2s;
    animation-duration: 2s;
    /*flex兼容布局*/
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
    justify-content: flex-end;
    -ms-align-items: center;
    align-items: center;
}

.loadingBottom {
    color: #fff;
    font-size: .75rem;
    /*flex兼容布局*/
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
}

.loadingImg {
    width: 3.5rem;
}

.loadingBottom h1 {
    color: #fff;
    font-size: 2rem;
    margin: 0 auto 1rem;
}

.loadingBottom p {
    margin-bottom: 3rem;
}


/*定义loading过渡动画*/

@keyframes fade-in {
    0% {
        -webkit-filter: sepia(100%);
        -o-filter: sepia(100%);
        filter: sepia(100%);
    }
    50% {
        -webkit-filter: sepia(50%);
        -o-filter: sepia(50%);
        filter: sepia(50%);
    }
    100% {
        -webkit-filter: sepia(0%);
        -o-filter: sepia(0%);
        filter: sepia(0%);
    }
}
</style>
