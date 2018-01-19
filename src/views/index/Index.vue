<template>
    <div class="index">
        <!-- 个人信息模块 -->
        <keep-alive>
            <user @flag="flagPop" @type="typePop"></user>
        </keep-alive>
        <router-view></router-view>
        <!-- 医保管理 -->
        <div v-if="tabMana">
            <span class="medical-title">医保管理</span>
            <ul class="medical-manage flexRow">
                <router-link tag="li" class="flexCol" :to="{path: list_1}">
                    <img src="../../assets/index/mid-search.png">
                    <span>医保查询</span>
                </router-link>
                <router-link tag="li" class="flexCol" :to="{path: list_2}" v-if="userType == 2">
                    <img src="../../assets/index/mid-pay.png">
                    <span>个人缴费</span>
                </router-link>
                <router-link tag="li" class="flexCol" :to="{path: list_3}">
                    <img src="../../assets/index/mid-notice.png">
                    <span>代缴保费</span>
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
    data() {
        return {
            userFlag: '',
            userType: '',
            list_1: "search",
            list_2: "pay-my",
            list_3: "pay-other",
            tabMana: true
        }
    },
    // 挂载前通过全局属性改写用户类型
    beforeMount() {
        if (this.$store.state.userType == '职工') {
            this.userType = 1;
        }
        if (this.$store.state.userType == '居民' || this.$store.state.userType == 1) {
            this.userType = 2;
        }
    },
    mounted() {
        //认证标志
        this.flagPop();
    },
    activated() {
        document.title = "智慧医保缴费平台";
    },
    watch: {
        "$route": "fetchDate"
    },
    methods: {
        // 接受的子组件传递参数data->认证标志, 进行全局缓存，进一步判断
        flagPop(data) {
            this.$store.state.userFlag = data;
            this.userFlag = data;
            // 如果认证为true，则不通过，为注册页
            if (this.userFlag == true) {
                this.list_1 = 'register';
                this.list_2 = 'register';
                this.list_3 = 'register';
            }
            // 如果认证通过，开通相应权限
            if (this.userFlag == false) {
                // 判断用户类型，医保个人缴费跳转不同页面
                if (this.userType == 1) {
                    this.list_1 = "search-my"
                } else {
                    this.list_1 = 'search';
                }
                this.list_2 = 'pay-my';
                this.list_3 = 'pay-other';
            }
        },
        // 检测路由：判断是否需要隐藏otherMsg组件
        fetchDate() {
            if (this.$route.name == 'search') {
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
.index {
    width: 100%;
}

.medical-manage {
    width: 100%;
    height: 6.5rem;
    border-bottom: .5rem solid #EDF2F5;
    justify-content: space-around;
}

.medical-manage li {
    width: 33.3%;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}

.medical-manage li img {
    height: 2.5rem;
    margin-bottom: .5rem;
}

.medical-manage li span {
    font-size: .875rem;
    font-weight: bold;
    color: #31679C;
}

.medical-title {
    display: block;
    margin: 1rem 5% 0;
    font-size: .875rem;
    color: #8C8C8C;
}
</style>
