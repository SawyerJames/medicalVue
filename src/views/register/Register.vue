<template>
    <div class="register flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <img class="logo" src="../../assets/register/logo.png">
        <!-- 表单 -->
        <form class="flexCol">
            <h1 class="borderBox">用户实名信息认证</h1>
            <!-- 姓名 -->
            <div class="register-model flexRow">
                <span>您的姓名</span>
                <input type="text" name="userName" maxlength="4" placeholder="请输入姓名" v-model.trim="user.name"></input>
            </div>
            <!-- 身份证码 -->
            <div class="register-model flexRow">
                <span>身份证号</span>
                <input type="text" name="idCard" maxlength="18" placeholder="请输入身份证号" v-model.trim="user.idCard"></input>
            </div>
            <!-- 联系电话 -->
            <div class="register-model flexRow">
                <span>联系方式</span>
                <input type="tel" name="phone" maxlength="11" placeholder="请输入联系电话" v-model.trim="user.phone"></input>
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
    name: 'register',
    data() {
        return {
            user: {
                name: '',
                idCard: '',
                phone: ''
            },
            validate: '',
            //错误提示框
            errShow: false,
            errTxt: ''
        }
    },
    // 移除组件后清除表单
    activated() {
        document.title = "智慧医保信息认证";
        this.user.name = '';
        this.user.idCard = '';
        this.user.phone = '';
    },
    methods: {
        // 表单提交
        submitForm() {
            var name = this.user.name,
                phone = this.user.phone,
                idCard = this.user.idCard;
            // 正则
            var nameRe = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/,
                idCardRe = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            var that = this;

            // 开启验证
            if (!nameRe.test(name)) {
                this.validate = "姓名格式不正确"
            }
            if (!phoneRe.test(phone)) {
                this.validate = "手机号码格式不正确"
            }
            if (!idCardRe.test(idCard)) {
                this.validate = "身份证号码格式不正确"
            }
            // 验证通过后发起请求
            if (nameRe.test(name) && phoneRe.test(phone) && idCardRe.test(idCard)) {
                this.validate = '';
                this.$tools.PostDataToServer(
                    this,
                    this.API.register,
                    this.user,
                    function success(res) {
                        var resData = res.data;
                        // 如果成功，跳转至手机验证页面
                        if (resData.State.Code == 1) {
                            that.$router.replace({
                                name: 'phoneRegister',
                                params: {
                                    phone: that.user.phone
                                }
                            });
                        }
                        // 如果失败，跳转至补充信息页面
                        if (resData.State.Code == 0) {
                            that.$router.replace('/errorRegister');
                        }
                    },
                    // 如果失败，清空表单
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

.register-model:last-child {
    border: none;
}


/*表单input 通用样式*/

.register-model span {
    font-size: .875rem;
    font-weight: bold;
    color: #2D739B;
    width: 4rem;
    margin-left: 1rem;
}

.register-model input[type="text"],
.register-model input[type="tel"] {
    width: auto;
    height: auto;
    outline: none;
    border: none;
    background: rgba(255, 255, 255, .7);
    font-size: .875rem;
    border-radius: .2rem;
    color: #4F4F4F;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}


/*按钮组*/

.register .btn{
    width: 45%;
}

.register .exitBtn {
    background: #C8C8C8;
}
</style>
