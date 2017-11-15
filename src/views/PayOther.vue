<template>
    <div class="pay-other clearfix">
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <!-- 报错弹窗 -->
        <div class="errorMask" v-if="errShow"></div>
        <div class="errorWin" v-if="errShow">
            <img src="../assets/common/ErrLoading.gif">
            <p>{{errTxt}}</p>
        </div>
        <!-- 添加代缴信息 -->
        <div :class="['pay-other-addBtn',{payAddBtnTrue : !payButton}]" @click="showForm">
            <img src="../assets/pay/add.png" alt="添加代缴人">
            <span>添加代缴信息</span>
        </div>
        <!-- 代缴信息填写表单 -->
        <form class="pay-other-msg" v-if="formConfig">
            <div class="pay-other-model clearfix">
                <span class="userMsg-title">姓名
          <input type="text" class="pay-other-form  pay-form-name" placeholder="请输入信息" v-model="payOther.username"></input>
        </span>
                <span class="userMsg-title pay-float">关系
          <select class="pay-other-form" name="relative" v-model="payOther.relationship">
            <option selected value="0">父子</option>
            <option value="1">父女</option>
            <option value="2">母子</option>
            <option value="3">母女</option>
          </select>
        </span>
            </div>
            <div class="pay-other-model">
                <span class="userMsg-title">身份证号
          <input type="tel" class="pay-other-form" placeholder="请输入18位身份证号码" minlength="18" maxlength="18" v-model="payOther.card"></input>
        </span>
            </div>
        </form>
        <!-- 代缴信息按钮：点击发送数据并查询数据 -->
        <button :class="['pay-other-confirmBtn',{payConfirmBtnTrue: formConfig}]" v-if='formConfig' type="button" @click='showPayComfirm'>
            <img src="../assets/pay/true.png" alt="确认">
            <span>确认</span>
        </button>
        <!-- 查询数据success：返回支付弹窗 -->
        <div class="pay-other-successWin" v-if="showComfirm" v-for="item in getPayOther">
            <!-- 如果需要代缴: 弹出查询信息并弹出立即缴费 -->
            <div class="pay-other-true" v-if="showComfirm_true">
                <div class="pay-other-model">
                    <span class="userMsg-title">姓名
            <span class="userMsg-kind">{{item.username}}</span>
                    </span>
                    <span class="userMsg-title">险别种类
            <span class="userMsg-kind">{{item.insurance_type1}}</span>
                    </span>
                </div>
                <div class="pay-other-model">
                    <span class="userMsg-title">身份证号
            <span class="userMsg-kind">{{item.card}}</span>
                    </span>
                </div>
                <div class="pay-other-model">
                    <h1 class="userMsg-title">应缴金额</h1>
                    <span>您应缴费
            <span class="userMsg-kind">{{item.insurance_type1}}</span>费：
                    <span class="model-text">{{item.payment_amount}}元</span>
                    </span>
                </div>
                <div class="pay-other-model noBorder">
                    <span class="userMsg-title">待遇期
            <span class="userMsg-kind">{{item.valid_period}}</span>
                    </span>
                </div>
                <button class="pay-other-submit" @click="payOtherGo" v-if="item.ispay == 1">立即缴费</button>
            </div>
            <!-- 如果不需要代缴 弹出没有缴费选择框-->
            <div class="noPay" v-else>
                <img src="../assets/common/noData.png" alt="无数据">
                <span>您没有任何保险费用需要交纳！</span>
            </div>
        </div>
        <!-- 查询数据error：返回错误弹窗 -->
        <div class="pay-other-errorWin" v-if="showError">
            <img src="../assets/common/noData.png" alt="信息不存在">
            <div>
                <p>您输入的代缴人不存在</p>
                <p>请重新核实身份信息</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pay-other',
    data() {
        return {
            // 样式控制
            showComfirm: false,
            showComfirm_true: false,
            showError: false,
            formConfig: false,
            payButton: true,
            // 输入数据
            payOther: {
                username: '',
                relationship: 0,
                card: '',
                status: 2
            },
            // axios数据
            getPayOther: [],
            // 报错弹窗
            errShow: false,
            errTxt: '',
            validate: ''
        }
    },
    mounted() {
        this.$nextTick(function (){
          this.getOtherData();
        })
    },
    methods: {
        // 加载需要缴费的人的数据
        getOtherData() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                process.env.API_HOST + 'Client/InsteadPayList',
                function success(res) {
                    var resData = res.data;
                    if (resData.State.Code == 1) {
                        // 加载数据
                        that.getPayOther = resData.Info;
                        // 开启展示弹窗
                        that.showComfirm = true;
                        that.showComfirm_true = true;
                    }
                },
                function error(err) {
                    return
                }
            )
        },
        // 开启表单
        showForm() {
            // 开启表单
            this.formConfig = true;
            // 关闭代缴人按钮
            this.payButton = false;
            // 关闭弹窗
            this.showComfirm = false;
            this.showComfirm_true = false;
            this.showError = false;
        },
        // 数据逻辑弹窗：验证信息，获取数据
        showPayComfirm() {
            // 正则
            var nameRe = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                idCardRe = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            // 定义变量
            var name = this.payOther.username,
                idCard = this.payOther.card;
            var that = this;
            // 开启验证
            if (!nameRe.test(name)) {
                this.validate = "姓名格式不正确"
            }
            if (!idCardRe.test(idCard)) {
                this.validate = "身份证号码格式不正确"
            }
            if (nameRe.test(name) && idCardRe.test(idCard)) {
                this.validate = '';
                // 获取数据：改变页面逻辑
                this.$tools.PostDataToServer(
                    this,
                    process.env.API_HOST + 'Client/PaymentInfo',
                    this.payOther,
                    function success(res) {
                        var resData = res.data;
                        // 正常缴费
                        if (resData.State.Code == 1) {
                            // 关闭表单
                            that.formConfig = false;
                            // 开启展示弹窗
                            that.showComfirm = true;
                            that.showComfirm_true = true;
                            // 关闭错误弹窗
                            that.showError = false;
                            // 打开代缴人按钮
                            that.payButton = true;
                            // 堆栈数据
                            that.getPayOther.push(resData.Info);
                        }
                        // 没有查询到人
                        if (resData.State.Code == 0) {
                            that.payButton = false;
                            // 关闭表单
                            that.formConfig = false;
                            // 关闭展示弹窗
                            that.showComfirm = false;
                            that.showComfirm_true = false;
                            // 定时器开启错误弹窗1.5s;
                            that.showError = true;
                            var errorTime = setTimeout(function() {
                                that.showError = false;
                                // 重新开启代缴信息填写按钮
                                that.formConfig = true;
                                // 清空填写的数据
                                that.payOther.userName = '';
                                that.payOther.card = '';
                                clearTimeout(errorTime);
                            }, 1500);
                        }
                        // 没有要支付的款项时
                        if (resData.Info.payment_amount == '' || resData.Info.payment_amount == null) {
                            // 关闭表单
                            that.formConfig = false;
                            // 开启展示弹窗
                            that.showComfirm = true;
                            that.showComfirm_true = false;
                            // 关闭错误弹窗
                            that.showError = false;
                            var noPayTime = setTimeout(function() {
                                // 重新开启添加代缴人按钮
                                that.showComfirm = false;
                                that.payButton = true;
                                // 清空填写的数据
                                that.payOther.userName = '';
                                that.payOther.card = '';
                                clearTimeout(noPayTime);
                            }, 1500);
                        }
                    },
                    // 错误提示
                    function error(err) {
                        that.errShow = true;
                        that.errTxt = '出现错误，请重新加载'
                        var errLoading = setTimeout(function() {
                            that.errShow = false;
                            that.errTxt = ''
                            clearTimeout(errLoading);
                        }, 2000);
                    }
                )
            }
        },
        // 微信缴费
        payOtherGo() {
            // 配置URL
            var url = 'Client/WechatPayment';
            var numCard = this.payOther.card;
            this.postCall(url, {
                status: 2,
                card: numCard
            });
        },
        // 模拟表单
        postCall(url, params, target) {
            // 创建隐藏表单
            var tempForm = document.createElement("form");
            tempForm.action = url;
            tempForm.method = "post";
            tempForm.style.display = "none";
            if (target) {
                tempForm.target = target;
            }
            // 配置参数
            for (var x in params) {
                var opt = document.createElement("input");
                opt.name = x;
                opt.value = params[x];
                tempForm.appendChild(opt);
            }
            // 提交及移除表单
            var opt = document.createElement("input");
            opt.type = "submit";
            tempForm.appendChild(opt);
            document.body.appendChild(tempForm);
            tempForm.submit();
            document.body.removeChild(tempForm);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*pay-other common*/

.pay-other {
    font-size: .875rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}


/*支付弹窗*/

.pay-other-successWin {
    border: 1px solid #ddd;
    font-size: .875rem;
    margin: 1rem auto;
    width: 80%;
    padding: 5%;
    border-radius: .5rem;
    -webkit-box-shadow: 1px 1px 10px 1px #E5E5E5;
    box-shadow: 1px 1px 10px 1px #E5E5E5;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}

.pay-other-model {
    padding: .7rem 0;
    border-bottom: 1px dashed #ddd;
}

.pay-other-model:last-child {
    border: none;
    margin-bottom: 0;
}

.pay-other .noBorder {
    border: none;
}

.userMsg-name {
    font-weight: bold;
    font-size: 1rem;
    margin-right: 1rem;
}

.userMsg-title {
    color: #31679C;
    font-weight: bold;
}

.userMsg-kind {
    color: #5F5F5F;
    background: #EFEFEF;
    padding: 2px .5rem;
    margin: .5rem;
    border-radius: 1rem;
    font-weight: normal;
}

.pay-other-submit {
    width: 100%;
    height: 2.5rem;
    border: none;
    border-radius: .25rem;
    background: #C1E3D5;
    color: #31679C;
    font-weight: bold;
    font-size: 1rem;
    outline: none;
    letter-spacing: 1px;
}

.pay-other-submit:active {
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
    background: #6CD1A7;
}


/*没有交纳费用是提供的数据*/

.noPay {
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -ms-align-items: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
}

.noPay img {
    width: 4rem;
    margin: 1rem 0;
}


/*添加代缴人按钮*/

.pay-other-addBtn {
    width: 80%;
    height: 5rem;
    margin: 2rem auto;
    background: #ABDDF1;
    border-radius: .5rem;
    color: #31679C;
    letter-spacing: 1px;
    padding-bottom: .5rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    text-align: center;
}

.pay-other-addBtn img {
    width: 3rem;
    margin: .5rem 0;
}

.payAddBtnTrue {
    display: none;
}


/*代缴信息填写表单*/

.pay-other-msg {
    width: 90%;
    margin: 0 auto;
}

.pay-other-form {
    border: none;
    margin: 0 .5rem;
    background: #EFEFEF;
    color: #5F5F5F;
    padding: 2px .5rem;
    border-radius: 1rem;
    font-weight: normal;
    outline: none;
}

.pay-other-msg .pay-form-name {
    width: 5rem;
}

.pay-other-confirmBtn {
    width: 0%;
    height: 5.5rem;
    border: none;
    border-radius: .5rem;
    background: #C1E3D5;
    color: #31679C;
    letter-spacing: 1px;
    padding-bottom: .5rem;
    margin: 0 auto;
    outline: none;
    -webkit-transition: width .2s;
    -o-transition: width .2s;
    transition: width .2s;
    text-align: center;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -ms-align-items: center;
    align-items: center;
}

.pay-other-confirmBtn img {
    display: none;
}

.pay-other-confirmBtn span {
    display: none;
}

.payConfirmBtnTrue {
    width: 80%;
    margin: 1rem auto 2rem;
    -webkit-transition: width .2s;
    -o-transition: width .2s;
    transition: width .2s;
}

.payConfirmBtnTrue img {
    display: block;
    width: 3rem;
    margin: .5rem auto .2rem;
}

.payConfirmBtnTrue span {
    display: block;
    font-size: 1rem;
    font-weight: bold;
    color: #31679C;
}

.payConfirmBtnTrue:active {
    background: #85D6B4
}


/*信息查询失败返回弹窗*/

.pay-other-errorWin {
    position: fixed;
    width: 76%;
    left: 50%;
    top: 50%;
    margin-left: -40%;
    border: 1px solid #ddd;
    border-radius: .3rem;
    background: #fff;
    padding: 2%;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
    z-index: 10;
}

.pay-other-errorWin img {
    display: inline-block;
    width: 3rem;
    height: 3rem;
}


/*表单验证*/

.validate {
    position: fixed;
    width: 100%;
    height: 2rem;
    background: #3591CF;
    z-index: 9999;
    top: 0;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: .875rem;
}
</style>
