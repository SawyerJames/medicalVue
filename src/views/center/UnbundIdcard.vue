<template>
    <div class="unbund flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <!-- 上半部头像选项卡 -->
        <div class="unbund-model borderBox flexRow">
            <span>当前用户</span>
            <p>{{userMsg.username}}</p>
        </div>
        <!-- 身份证号解绑 -->
        <div class="unbund-model borderBox flexRow">
            <span>当前身份证号码</span>
            <p>{{userMsg.card}}</p>
        </div>
        <!-- 身份证号解绑 -->
        <div class="unbund-model borderBox flexRow">
            <span>当前手机号码</span>
            <p>{{userMsg.phone}}</p>
        </div>
        <!-- 输入验证码 -->
        <div class="unbund-model borderBox flexRow noBorder">
            <input type="text" maxlength="6" v-model="postMsg.verification" placeholder="请输入6位验证码"></input>
            <!-- 获取验证码按钮 -->
            <button type="button" @click="getCode()" :disabled="!showVer" class="verificationBtn borderBox">
                <span v-show="showVer">点击获取验证码</span>
                <span v-show="!showVer" class="count">重新获取({{count}}s)</span>
            </button>
        </div>
        <button type="button" @click="unbund" class="btn">确定解绑</button>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'unbundIdcard',
    data() {
        return {
            loading: false,
            // 继承个人信息
            userMsg: {},
            // 验证
            validate: '',
            // 验证码
            showVer: true,
            count: '',
            timer: null,
            TIME_COUNT: 60,
            // 拼装信息
            postMsg: {
                card: '',
                verification: '',
                phone: ''
            },
            // 报错弹窗
            errShow: false,
            errTxt: '',
        }
    },
    activated() {
        document.title = "退出当前账户";
        this.userMsg = this.$route.params.userMsg;
        this.validate = '';
    },
    methods: {
        // 获取验证码
        getCode(phone) {
            var that = this;
            this.postMsg.phone = this.userMsg.phones;
            // 如果不为空的定时器
            if (!this.timer) {
                // 开始计数
                this.count = this.TIME_COUNT;
                this.showVer = false;
                // 定时器读秒
                this.timer = setInterval(() => {
                        if (this.count > 1 && this.count <= this.TIME_COUNT) {
                            this.count--;
                        } else {
                            this.showVer = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                    // 开始获取验证码
                this.$tools.PostDataToServer(
                    this,
                    this.API.getCode,
                    this.postMsg,
                    function success(res) {
                        console.log(res);
                    },
                    function error(err) {
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
        },
        // 解绑
        unbund() {
            var verification = this.postMsg.verification,
                verificationRe = /^\d{6}$/,
                that = this;
            // 拼装信息准备抛出
            this.postMsg.card = this.userMsg.cards;
            this.postMsg.phone = this.userMsg.phones;
            if (!verificationRe.test(verification)) {
                this.validate = "验证码格式不正确"
            } else {
                this.validate = '';
                this.loading = true;
                // 发送验证码
                this.$tools.PostDataToServer(
                    this,
                    this.API.unbund,
                    this.postMsg,
                    function success(res) {
                        that.loading = false;
                        var resData = res.data;
                        // 如果成功，跳转至首页：并进行认证判断
                        if (resData.State.Code == 1) {
                            window.location.href = process.env.API_HOST;
                        }
                        // 如果失败，出现弹窗
                        if (resData.State.Code == 0) {}
                    },
                    // 如果失败，清空表单
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
}
</script>
<style type="text/css" scoped>
.unbund {
    -ms-align-items: center;
    align-items: center;
}


/*列表栏样式封装*/

.unbund-model {
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

.unbund-model>span {
    color: #5f5f5f;
    background: #EFEFEF;
    padding: .2rem .75rem;
    border-radius: .2rem;
    margin-right: 1rem;
}

.unbund-model input {
    outline: none;
    border-radius: .2rem;
    border: 1px solid #ddd;
    height: 2rem;
}


/*手机验证码*/

.unbund .verificationBtn {
    min-width: 8rem;
    padding: .5rem;
    font-size: .875rem;
    outline: none;
    border: none;
    border-radius: .2rem;
    background: #7DC5DC;
    text-align: center;
    color: #fff;
}

.btn {
    width: 90%;
}
</style>
