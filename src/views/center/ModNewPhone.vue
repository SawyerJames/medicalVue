<template>
    <div class="modNewPhone flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <!-- 身份证号解绑 -->
        <div class="modNewPhone-model flexRow borderBox">
            <span>新手机号</span>
            <input type="tel" v-model="newPhone.phone" v-on:input="getCodeFun(newPhone.phone)" maxlength="11" placeholder="请输入新手机号码"></input>
        </div>
        <!-- 输入验证码 -->
        <div class="modNewPhone-model flexRow borderBox noBorder">
            <input type="text" maxlength="6" v-model="newPhone.verification" placeholder="请输入6位验证码"></input>
            <!-- 获取验证码伪装 -->
            <p v-if="showVerFlag" class="verificationBtn borderBox">点击获取验证码</p>
            <!-- 获取验证码按钮 -->
            <button type="button" @click="getCode()" :disabled="!showVer" v-else class="verificationBtn">
                <span v-show="showVer">点击获取验证码</span>
                <span v-show="!showVer" class="count">重新获取({{count}}s)</span>
            </button>
        </div>
        <button type="button" @click="subPhone" class="btn">提交</button>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'ModNewPhone',
    data() {
        return {
            loading: false,
            newPhone: {
                phone: '',
                verification: ''
            },
            validate: '',
            // 验证码
            showVer: true,
            count: '',
            timer: null,
            TIME_COUNT: 60,
            showVerFlag: true,
            // 报错弹窗
            errShow: false,
            errTxt: '',
        }
    },
    activated() {
        document.title = "修改联系方式";
        this.validate = '';
    },
    methods: {
        // 获取验证码
        getCode() {
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
                    this.newPhone,
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
        // 显示获取验证码点击函数
        getCodeFun(val) {
            var phoneRe = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!phoneRe.test(val)) return;
            if (phoneRe.test(val)) {
                this.showVerFlag = false;
            }
        },
        // 提交手机号
        subPhone() {
            var verification = this.newPhone.verification,
                newPhone = this.newPhone.phone,
                phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/,
                verificationRe = /^\d{6}$/,
                that = this;
            if (!phoneRe.test(newPhone)) {
                this.validate = "手机号格式不正确"
            } else {
                if (!verificationRe.test(verification)) {
                    this.validate = "验证码格式不正确"
                } else {
                    this.validate = ''
                    this.loading = true;
                    // 发送验证码
                    this.$tools.PostDataToServer(
                        this,
                        this.API.modNewPhone,
                        this.newPhone,
                        function success(res) {
                            that.loading = false;
                            var resData = res.data;
                            // 如果成功，跳转至首页：并进行认证判断
                            if (resData.State.Code == 1) {
                                that.$router.replace('/center');
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
            }
        }
    }
}
</script>
<style type="text/css" scoped>
.modNewPhone {
    -ms-align-items: center;
    align-items: center;
}


/*列表栏样式封装*/

.modNewPhone-model {
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

.modNewPhone-model>span {
    color: #5f5f5f;
    background: #EFEFEF;
    padding: .2rem .75rem;
    border-radius: .2rem;
    margin-right: 1rem;
}

.modNewPhone-model input {
    height: 2rem;
    outline: none;
    border-radius: .2rem;
    border: 1px solid #ddd;
}


/*手机验证码*/

.modNewPhone .verificationBtn {
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
