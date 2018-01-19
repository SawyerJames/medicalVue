<template>
    <div class="search-my">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 个人综合信息查询 -->
        <div class="search-my-title flexRow">
            <span>个人综合信息</span>
        </div>
        <!-- 综合信息：userType：1为职工，userType：2为居民 -->
        <!-- 职工和居民都会有的共用信息 -->
        <div class="search-my-msg flexCol">
            <div class="search-model flexRow">
                <div>
                    <span class="search-model-title">姓名</span>
                    <span class="search-model-msg">{{search.username}}</span>
                </div>
                <div>
                    <span class="search-model-title">性别</span>
                    <span class="search-model-msg" v-if="search.sex == '1'">男</span>
                    <span class="search-model-msg" v-else-if="search.sex == '2'">女</span>
                </div>
            </div>
            <div class="search-model flexRow">
                <span class="search-model-title">身份证号</span>
                <span class="search-model-msg">{{search.card}}</span>
            </div>
            <div class="search-model flexRow">
                <span class="search-model-title">联系电话</span>
                <span class="search-model-msg">{{search.phone}}</span>
            </div>
            <!-- 共用信息结束 -->
            <div class="search-model flexRow" v-if="userType == 2">
                <span class="search-model-title">待遇期</span>
                <span class="search-model-msg">{{search.currentdeadline}}</span>
            </div>
            <!-- 以上为居民信息结束 -->
            <!-- 职工特有信息开始 -->
            <div class="search-model flexRow" v-if="userType == 1">
                <span class="search-model-title">账户余额</span>
                <span class="search-model-msg">{{search.balance}}元</span>
            </div>
            <div class="search-model flexRow" v-if="userType == 1">
                <span class="search-model-title">历年收入</span>
                <span class="search-model-msg">{{search.oldyearincome}}元</span>
            </div>
            <div class="search-model flexRow" v-if="userType == 1">
                <span class="search-model-title">本年收入</span>
                <span class="search-model-msg">{{search.nowyearincome}}元</span>
            </div>
            <div class="search-model flexRow" v-if="userType == 1">
                <span class="search-model-title">本年支出</span>
                <span class="search-model-msg">{{search.nowexpenditure}}元</span>
            </div>
            <div class="search-model flexRow" v-if="userType == 1">
                <span class="search-model-title">当前状态</span>
                <span class="search-model-msg">{{search.insurance_info}}</span>
            </div>
            <div class="search-model flexRow" v-if="userType == 1">
                <span class="search-model-title">参保险种</span>
                <span class="search-model-msg">{{search.insured_name}}</span>
            </div>
            <!-- 参保地为居民与职工共有 -->
            <div class="search-model flexRow">
                <span class="search-model-title">参保地</span>
                <span class="search-model-msg">{{search.address}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'search-my',
    data() {
        return {
            search: {},
            errShow: false,
            errTxt: '',
            userType: '',
            loading: true
        }
    },
    activated() {
        document.title = "个人综合信息查询";
        // 用户类型判断
        var userType = this.$store.state.userType;
        if (userType == '职工') {
            this.userType = 1;
        }
        if (userType == '居民' || userType == '') {
            this.userType = 2;
        }
        // 调取数据接口
        var that = this;
        this.$tools.GetDataFromServer(
            this,
            this.API.searchMy,
            function success(res) {
                var resData = res.data;
                that.loading = false;
                if (resData.State.Code == 1) {
                    that.search = resData.Info;
                }
                if (resData.State.Code != 1) {
                    that.errShow = true;
                    that.errTxt = '数据库没有您的信息'
                    var errLoading = setTimeout(function() {
                        that.errShow = false;
                        that.errTxt = ''
                        clearTimeout(errLoading);
                    }, 2000)
                }
            },
            function error(err) {
                that.loading = false;
                that.errShow = true;
                that.errTxt = '出现错误，请重新加载'
                var errLoading = setTimeout(function() {
                    that.errShow = false;
                    that.errTxt = ''
                    clearTimeout(errLoading);
                }, 2000)
            }
        );
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*外层容器*/

.search-my {
    background: #fff;
    font-size: .875rem;
}


/*个人综合信息 标题*/

.search-my-title {
    color: #015480;
    font-weight: bold;
    width: 90%;
    height: 3rem;
    margin: 0 auto;
    padding: 0 2.5%;
    border-radius: .4rem .4rem 0 0;
    border-bottom: 1px solid #015480;
    background: #fff;
    -ms-align-items: center;
    align-items: center;
}


/*个人综合信息 内容*/

.search-my-msg {
    width: 90%;
    margin: 0 auto 1rem;
    padding: .5rem 2.5%;
    border-radius: 0 0 .4rem .4rem;
    background: #fff;
}


/*模块样式*/

.search-model {
    margin: .5rem 0;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.search-model-title {
    color: #015480;
    margin-right: .5rem;
}

.search-model-titleFlag {
    font-size: .875rem;
}

.search-model-msg {
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
    background: #efefed;
    border-radius: 1rem;
    padding: 1px .75rem;
    color: #484848;
    font-size: .875rem;
}
</style>
