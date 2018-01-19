<template>
    <div class="register flexCol">
        <!-- 错误提示，预加载组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <img class="logo" src="../../assets/register/logo.png">
        <!-- 请求弹窗 -->
        <div class="mask" v-if="mask"></div>
        <div class="loading flexCol" v-if="successLoading">
            <img v-if="imgLoading" src="../../assets/common/Heart.gif">
            <p v-if="txtLoading">认证成功！</p>
        </div>
        <div class="loading flexCol" v-if="errLoading">
            <img v-if="imgLoading" src="../../assets/common/Heart.gif">
            <p v-if="txtLoading">认证失败！</p>
            <p v-if="txtLoading">验证码不正确</p>
        </div>
        <!-- 手机验证表单 -->
        <form class="flexCol">
            <h1 class="borderBox">验证手机号码</h1>
            <!-- 获取验证码逻辑 -->
            <div class="register-model flexRow">
                <span class="register-title">联系方式</span>
                <span class="register-msg">{{user.phone}}</span>
            </div>
            <!-- 输入验证码 -->
            <div class="register-model flexRow">
                <span class="register-title">验证号码</span>
                <input type="tel" name="verification" maxlength="6" placeholder="请输入验证码" v-model.trim="user.verification"></input>
                <!-- 获取验证码按钮 -->
                <button type="button" @click="getCode(phone)" :disabled="!showVer" class="verificationBtn borderBox">
                    <span v-show="showVer">获取验证码</span>
                    <span v-show="!showVer" class="count">重新获取({{count}}s)</span>
                </button>
            </div>
            <!-- 按钮组 -->
            <div class="register-model flexRow">
                <input type="button" @click="exitRegister" class="btn exitBtn" value="取消"></input>
                <input type="button" @click="submitForm" class="btn" value="立即认证"></input>
            </div>
        </form>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'phoneRegister',
    data() {
        return {
            loading: false,
            user: {
                phone: '',
                verification: ''
            },
            validate: '',
            // 验证码
            showVer: true,
            count: '',
            timer: null,
            TIME_COUNT: 60,
            // 报错弹窗
            errShow: false,
            errTxt: '',
            // 提交表单后弹窗
            successLoading: false,
            errLoading: false,
            mask: false,
            imgLoading: false,
            txtLoading: false
        }
    },
    activated() {
        document.title = "智慧医保信息认证";
        // 每次加载自动获取手机号
        this.user.phone = this.$route.params.phone;
    },
    methods: {
        // 表单提交
        submitForm() {
            var phone = this.user.phone,
                verification = this.user.verification;
            // 正则
            var phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/,
                verificationRe = /^\d{6}$/;
            var that = this;

            // 开启验证
            if (!phoneRe.test(phone)) {
                this.validate = "手机号码格式不正确"
            }
            if (!verificationRe.test(verification)) {
                this.validate = "验证码格式不正确"
            }
            // 验证通过后发起请求
            if (phoneRe.test(phone) && verificationRe.test(verification)) {
                this.validate = '';
                this.loading = true;
                this.$tools.PostDataToServer(
                    this,
                    this.API.phoneRegister,
                    this.user,
                    function success(res) {
                        that.loading = false;
                        var resData = res.data;
                        // 如果成功，返回页面并刷新
                        if (resData.State.Code == 1) {
                            // 展示loading弹窗
                            that.successLoading = true;
                            that.mask = true;
                            that.imgLoading = true;

                            // loading 图片定时器
                            var showImg = setTimeout(function() {
                                that.imgLoading = false;
                                that.txtLoading = true;
                                clearTimeout(showImg);
                            }, 1500);

                            // 定时器3s后关闭
                            var showLoading = setTimeout(function() {
                                that.successLoading = false;
                                that.mask = false;
                                that.txtLoading = false;
                                // 跳转页面
                                location.replace(document.referrer);
                                clearTimeout(showLoading);
                            }, 3000);
                        }
                        // 如果失败，清空表单
                        if (resData.State.Code == 0) {
                            // 展示loading弹窗
                            that.errLoading = true;
                            that.mask = true
                            that.imgLoading = true;

                            // loading 图片定时器
                            var showImg = setTimeout(function() {
                                that.imgLoading = false;
                                that.txtLoading = true;
                                clearTimeout(showImg);
                            }, 1500);

                            // 定时器3s后关闭
                            var showLoading = setTimeout(function() {
                                that.errLoading = false;
                                that.mask = false;
                                that.txtLoading = false;
                                clearTimeout(showLoading);
                            }, 3000)
                        }
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
        },
        // 获取验证码
        getCode(phone) {
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
                    this.user,
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
        // 取消登录
        exitRegister() {
            // 返回首页
            this.$router.push('/');
        }
    }
}
</script>
<style type="text/css" scoped>
.register {
    position: fixed;
    height: 100%;
    width: 100%;
    background: url('../../assets/register/registerBg.png');
    -webkit-background-size: 100%;
    background-size: 100%;
    z-index: 111;
    -ms-align-items: center;
    align-items: center;
}

.logo {
    width: 4rem;
    margin: 1rem auto 1rem;
}


/*基础模板*/

.register-model {
    width: 95%;
    height: 2.5rem;
    margin: .2rem auto;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.register-model:last-child,
.register-model.noBorder {
    border: none;
}


/*表单样式*/

.register form {
    width: 85%;
    height: auto;
    margin: 0 auto;
    background: #fff;
    border-radius: .5rem .5rem 0 0;
    -ms-align-items: center;
    align-items: center;
}

.register form h1 {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    padding-left: 5%;
    font-size: .875rem;
    text-align: left;
    color: #fff;
    border-radius: .5rem .5rem 0 0;
    background: #5BB2F7;
}


/*表单input 通用样式*/

.register-model .register-title {
    font-size: .875rem;
    font-weight: bold;
    color: #2D739B;
    width: 4rem;
    margin-left: 1rem;
}

.register-model input[type="text"],
.register-model input[type="tel"],
.register-model .register-msg {
    min-width: 6rem;
    height: 2.5rem;
    outline: none;
    border: none;
    background: rgba(255, 255, 255, .7);
    font-size: .875rem;
    color: #4F4F4F;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}

.register-model .register-msg {
    line-height: 2rem;
}


/*获取验证码 按钮*/

.register .verificationBtn {
    min-width: 6rem;
    margin: 0 .5rem;
    padding: .2rem .5rem;
    font-size: .75rem;
    outline: none;
    border: none;
    background: #83C4F0;
    text-align: center;
    color: #fff;
}


/*按钮组*/

.register .btn{
    width: 45%;
}

.register .exitBtn {
    background: #C8C8C8;
}


/*弹窗*/

.register .loading {
    position: fixed;
    z-index: 10000;
    width: 8rem;
    height: 8rem;
    top: 25%;
    left: 50%;
    margin-left: -4rem;
    background: #fff;
    border-radius: .3rem;
    color: #3591CF;
    font-weight: bold;
    font-size: .875rem;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}

.register .loading img {
    width: 4rem;
    height: 4rem;
}
</style>
