<template>
    <div class="modPhone flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <!-- 上半部头像选项卡 -->
        <div class="modPhone-model flexRow borderBox">
            <span>当前用户</span>
            <p>{{userMsg.username}}</p>
        </div>
        <!-- 身份证号解绑 -->
        <div class="modPhone-model flexRow borderBox">
            <span>当前手机号码</span>
            <p>{{userMsg.phone}}</p>
        </div>
        <!-- 输入验证码 -->
        <div class="modPhone-model flexRow borderBox noBorder">
            <input type="text" maxlength="6" v-model="verification" placeholder="请输入6位验证码"></input>
            <!-- 获取验证码按钮 -->
            <button type="button" @click="getCode()" :disabled="!showVer" class="verificationBtn borderBox">
                <span v-show="showVer">点击获取验证码</span>
                <span v-show="!showVer" class="count">重新获取({{count}}s)</span>
            </button>
        </div>
        <button type="button" @click="subPhone" class="modPhoneBtn">提交</button>
        <p class="sign">如原手机号不能接受短信，请通过
            <router-link to="/appealPhone" class="appealBtn">申诉修改</router-link>
        </p>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'modPhone',
    data() {
        return {
            loading: false,
            userMsg: {},
            validate: '',
            // 验证码
            showVer: true,
            count: '',
            timer: null,
            TIME_COUNT: 60,
            // 输入的验证码
            verification: '',
            // 抛出信息
            userPhoneMsg: {
                phone: '',
                verification: ''
            },
            // 报错弹窗
            errShow: false,
            errTxt: '',
        }
    },
    activated() {
        document.title = "修改联系方式";
        this.validate = '';
        this.userPhoneMsg = {};
        this.verification = '';
        this.userMsg = this.$route.params.userMsg;
    },
    methods: {
        // 获取验证码
        getCode(phone) {
            // 明文传输
            this.userPhoneMsg.phone = this.userMsg.phones;
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
                    this.userPhoneMsg,
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
        // 提交手机号
        subPhone() {
            var verification = this.verification,
                verificationRe = /^\d{6}$/,
                that = this;
            // 将要抛出的信息打包成对象
            this.userPhoneMsg.verification = this.verification;
            // 验证
            if (!verificationRe.test(verification)) {
                this.validate = "验证码格式不正确"
            } else {
                this.validate = '';
                this.loading = true;
                // 发送验证码
                this.$tools.PostDataToServer(
                    this,
                    this.API.modPhone,
                    this.userPhoneMsg,
                    function success(res) {
                        that.loading = false;
                        var resData = res.data;
                        // 如果成功，跳转至首页：并进行认证判断
                        if (resData.State.Code == 1) {
                            that.$router.replace('/modNewPhone');
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
.modPhone {
    -ms-align-items: center;
    align-items: center;
}


/*列表栏样式封装*/

.modPhone-model {
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

.modPhone-model>span {
    color: #5f5f5f;
    background: #EFEFEF;
    padding: .2rem .75rem;
    border-radius: .2rem;
    margin-right: 1rem;
}

.modPhone-model input {
    outline: none;
    border-radius: .2rem;
    border: 1px solid #ddd;
    height: 2rem;
}


/*手机验证码*/

.modPhone .verificationBtn {
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

.modPhoneBtn {
    background: #3591cf;
    border: none;
    border-radius: .2rem;
    color: #fff;
    width: 90%;
    height: 2.5rem;
    margin: 2rem auto 0;
    outline: none;
}


/*申诉修改*/

.sign {
    width: 90%;
    text-align: right;
}

.appealBtn {
    font-weight: bold;
    margin-left: .3rem;
    color: #E50000;
}
</style>
