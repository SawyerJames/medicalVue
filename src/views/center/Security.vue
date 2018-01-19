<template>
    <div class="security">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <smallUser></smallUser>
        <!-- 身份证号解绑 -->
        <div class="security-model borderBox flexRow">
            <span>身份证号</span>
            <div class="flexRow">
                <span>{{userMsg.card}}</span>
                <router-link :to="{name: 'unbundIdcard',params: {userMsg: userMsg}}" tag="button">解绑</router-link>
            </div>
        </div>
        <!-- 手机号修改 -->
        <div class="security-model borderBox flexRow">
            <span>联系方式</span>
            <div class="flexRow">
                <span>{{userMsg.phone}}</span>
                <router-link :to="{name: 'modPhone',params: {userMsg: userMsg}}" tag="button">修改</router-link>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'security',
    data() {
        return {
            userMsg: {},
            errShow: false,
            errTxt: ''
        }
    },
    activated() {
        document.title = "账户与安全";
        this.userMsg = this.$route.params.userMsg;
    }
}
</script>
<style type="text/css" scoped>
/*列表栏样式封装*/

.security-model {
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

.security-model>div {
    font-size: .875rem;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}

.security-model>span {
    color: #5f5f5f;
    font-size: .875rem;
    background: #EFEFEF;
    padding: .2rem .75rem;
    border-radius: .2rem;
    margin-right: 1rem;
}

.security-model button {
    min-width: 3rem;
    color: #fff;
    font-size: .875rem;
    padding: .2rem .5rem;
    border: none;
    border-radius: .2rem;
    background: #7DC5DC;
    outline: none;
}
</style>
