<template>
    <div class="center flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 个人信息认证 -->
        <router-link to="/user" class="center-model flexRow borderBox">
            <span>个人信息</span>
            <div>
                <img class="phoneTrue" src="../../assets/common/arrow.png">
            </div>
        </router-link>
        <!-- 个人信息认证 -->
        <router-link to="/paymentDetails" class="center-model flexRow borderBox">
            <span>缴费明细</span>
            <div>
                <img class="phoneTrue" src="../../assets/common/arrow.png">
            </div>
        </router-link>
        <!-- 个人信息认证 -->
        <router-link :to="{name:'security',params:{userMsg:userMsg}}" class="center-model flexRow borderBox">
            <span>账户与安全</span>
            <div>
                <img class="phoneTrue" src="../../assets/common/arrow.png">
            </div>
        </router-link>
        <!-- 个人信息认证 -->
        <router-link :to="{name:'unbundIdcard',params:{userMsg:userMsg}}" class="center-model flexRow borderBox">
            <span>退出当前账户</span>
            <div>
                <img class="phoneTrue" src="../../assets/common/arrow.png">
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'center',
    data() {
        return {
            loading: true,
            userMsg: {},
            // 错误提示弹窗
            errShow: false,
            errTxt: ''
        }
    },
    activated() {
        document.title = "个人中心";
        this.getUserList();
    },
    methods: {
        getUserList() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.basicInfo,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    if (resData.State.Code == 1) {
                        that.userMsg = resData.Info;
                    }
                },
                function error(err) {
                    that.loading = false;
                    that.errShow = true;
                    that.errTxt = '出现错误，请重新加载';
                    var errLoading = setTimeout(function() {
                        that.errShow = false;
                        that.errTxt = ''
                        clearTimeout(errLoading);
                    }, 1600)
                }
            )
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
    width: 100%;
}

/*列表栏样式封装*/

.center-model {
    width: 100%;
    padding: 0 5%;
    height: 4rem;
    font-size: .875rem;
    background: #fff;
    border-bottom: 1px solid #ddd;
    margin: 0 auto;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.center-model>div {
    font-size: .875rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: center;
    align-items: center;
}

.center-model>span {
    color: #5f5f5f;
    font-size: .875rem;
    background: #EFEFEF;
    padding: .2rem .75rem;
    border-radius: .2rem;
}


/*图片处理*/

.arrow {
    width: 1rem;
    margin-left: .5rem;
}

.phoneTrue {
    height: 1rem;
    margin-left: .5rem;
}
</style>
