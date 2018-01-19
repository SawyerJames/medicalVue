<template>
    <div class="center-user">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 下半部个人详细信息 -->
        <div class="center-user-model borderBox flexRow">
            <div>
                <span class="center-user-model-title">姓名</span>
            </div>
            <div>
                <span>{{userMsg.UserName}}</span>
            </div>
        </div>
        <div class="center-user-model borderBox flexRow">
            <div>
                <span class="center-user-model-title">身份证号</span>
            </div>
            <div>
                <span>{{userMsg.IDcard}}</span>
            </div>
        </div>
        <div class="center-user-model borderBox flexRow">
            <div>
                <span class="center-user-model-title">联系电话</span>
            </div>
            <div>
                <span>{{userMsg.Phone}}</span>
            </div>
        </div>
        <div class="center-user-model borderBox flexRow" v-if="userType == 1">
            <div>
                <span class="center-user-model-title">单位名称</span>
            </div>
            <div>
                <span>{{userMsg.Company}}</span>
            </div>
        </div>
        <!-- 详细信息 -->
        <h3 class="detailMsg borderBox">详细信息（同步医保信息, 请正确填写）</h3>
        <!-- 民族 -->
        <div class="center-user-model borderBox flexRow">
            <div v-if="!userMsg.Ethnic">
                <span class="center-user-model-title">民族</span>
            </div>
            <div class="center-user-model-msg borderBox flexRow">
                <span calss="center-msg-detail flexRow flexWrap" v-show="userMsg.Ethnic">{{userMsg.Ethnic}}</span>
                <span else>&nbsp</span>
                <router-link to="/notion" tag="button" v-if="userMsg.Ethnic" type="button" class="msg-btn">修改</router-link>
                <router-link to="/notion" tag="button" class="msg-btn" v-else>点击填写民族</router-link>
            </div>
        </div>
        <!-- 地址修改与添加 -->
        <div class="center-user-model borderBox flexRow noBorder">
            <div v-if="!userMsg.Address">
                <span class="center-user-model-title">住址</span>
            </div>
            <div class="center-user-model-msg borderBox flexRow">
                <span calss="center-msg-detail flexRow flexWrap" v-if="userMsg.Address">{{userMsg.Address}}</span>
                <span else>&nbsp</span>
                <router-link to="/address" tag="button" v-if="userMsg.Address" type="button" class="msg-btn">修改</router-link>
                <router-link to="/address" tag="button" class="msg-btn" v-else>点击填写住址</router-link>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'user',
    data() {
        return {
            loading: true,
            userMsg: {},
            userType: '',
            // 错误提示弹窗
            errShow: false,
            errTxt: ''
        }
    },
    activated() {
        document.title = "详细个人信息";
        // 用户类型判断
        var userType = this.$store.state.userType;
        if (userType == '职工') {
            this.userType = 1;
        }
        if (userType == '居民' || userType == '') {
            this.userType = 2;
        }
        this.getUserList();
    },
    methods: {
        getUserList: function() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.userInfo,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    if (resData.State.Code == 1) {
                        that.userMsg = resData.MemberInfo;
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
            )
        }
    }
}
</script>
<style type="text/css" scoped>
.center-user {
    font-size: .875rem;
}

/*个人信息模板化样式*/

.center-user-model {
    width: 100%;
    padding: 0 5%;
    min-height: 3rem;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.center-user-model-title {
    padding: 1px .5rem;
    background: #EFEFEF;
    color: #5F5F5F;
    border-radius: .2rem;
    min-width: 4rem;
    text-align: center;
}

.center-user-model>div {
    width: 100%;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: center;
    align-items: center;
}

.center-user-model>div img {
    height: 1.2rem;
    margin: 0 .5rem 0 1rem;
}

.center-user-model>div:last-child span {
    font-size: .875rem;
    margin: 1rem 0;
}


/*详细信息*/

.center-user-model-msg {
    width: 100%;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.center-user-model-msg .center-msg-detail {
    height: 100%;
    overflow: hidden;
    -ms-align-items: center;
    align-items: center;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}

.detailMsg {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    color: #666666;
    padding-left: 1rem;
    background: #eee;
}

.msg-btn {
    min-width: 3rem;
    color: #fff;
    font-size: .875rem;
    padding: .2rem .5rem;
    border: none;
    border-radius: .2rem;
    background: #7DC5DC;
    outline: none;
    margin-left: 2rem;
}
</style>
