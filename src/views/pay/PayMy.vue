<template>
    <div class="pay-my flexCol borderBox">
        <!-- 错误提示，信息提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <alert :alert="alert" :title="title" :text="text"></alert>
        <!-- 医保缴费 -->
        <div class="pay-my-true flexCol borderBox" v-if="flag">
            <div class="pay-my-model">
                <span class="userMsg-name">{{payMsg.username}}</span>
                <span>险别种类：<span class="userMsg-kind">{{payMsg.insurance_type1}}</span></span>
            </div>
            <div class="pay-my-model">
                <span>您应缴费：<span class="model-text">{{payMsg.payment_amount}}元</span></span>
            </div>
            <div class="pay-my-model">
                <span>待遇截至日期：{{payMsg.valid_period}}</span>
            </div>
            <button class="btn" @click="payMy">立即缴费</button>
        </div>
        <!-- 没有数据时 -->
        <div class="pay-my-true" v-else>
            <div class="pay-my-model">
                <span class="userMsg-name">{{payMsg.username}}</span>
                <span>险别种类：<span class="userMsg-kind">{{payMsg.insurance_type1}}</span></span>
            </div>
            <div class="pay-my-model">
                <span>您已完成本年度缴费，不需再次缴纳</span>
            </div>
            <div class="pay-my-model">
                <span>待遇截至日期：{{payMsg.valid_period}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pay-my',
    data() {
        return {
            // alert弹窗
            alert: false,
            title: '',
            text: '',
            // 弹窗完毕
            loading: true,
            flag: true,
            // 获取数据
            payMsg: {},
            // 报错弹窗
            errShow: false,
            errTxt: '',
            // axios数据
            postData: {
                status: 1
            }
        }
    },
    activated() {
        document.title = "智慧医保个人缴费";
        // 每次进入查询一次，金额是否为空，为空则无需再次缴费
        this.getPayMsg();
    },
    methods: {
        // 发送数据
        payMy() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.payMay,
                function success(res) {
                    var resData = res.data;
                    that.weixinPay(resData);
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
            );
        },
        /**
         * @method :微信支付方法
         * @param data
         */
        weixinPay(data) {
            var that = this;
            if (typeof WeixinJSBridge == "undefined") { //微信浏览器内置对象。参考微信官方文档
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady(data), false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady(data));
                    document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady(data));
                }
            } else {
                that.onBridgeReady(data);
            }
        },
        /**
         * @method 支付费用方法
         * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
         */
        onBridgeReady(data) {
            var that = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": data.appId, //公众号名称，由商户传入
                    "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                    "nonceStr": data.nonceStr, //随机串
                    "package": data.package,
                    "signType": data.signType, //微信签名方式：
                    "paySign": data.paySign //微信签名
                },
                function(res) {
                    that.loading = true;
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        that.getPayMsg();
                    } else {
                        that.loading = false;
                        that.alert = true;
                        that.title = "支付失败";
                        that.text = "此次支付不成功";
                    }
                }
            );
        },
        // 请求数据
        getPayMsg() {
            var that = this;
            // 加载数据
            this.$tools.PostDataToServer(
                this,
                this.API.getMyPay,
                this.postData,
                function success(res) {
                    var resData = res.data;
                    that.loading = false;
                    if (resData.State.Code == 1) {
                        that.payMsg = resData.Info;
                        that.flag = true;
                    }else{
                        that.payMsg = resData.Info;
                        that.flag = false;
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
                    }, 2000);
                }
            )
        },
        testBtn() {
            this.flag = false;
        }
    }
}
</script>
<style scoped>
.pay-my,
.pay-my-true {
    font-size: .875rem;
    width: 100%;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}

.pay-my-true {
    width: 90%;
    padding: 0 5%;
    border: 1px solid #ddd;
    font-size: .875rem;
    margin: 1rem auto;
    border-radius: .5rem;
}

.pay-my-model {
    padding: .5rem 0;
    border-bottom: 1px dashed #ddd;
}

.pay-my-model:last-child {
    margin-bottom: 0;
    border-bottom: none;
}

.userMsg-name {
    font-weight: bold;
    font-size: .875rem;
    margin-right: 1rem;
}

.userMsg-kind {
    color: #5F5F5F;
    background: #EFEFEF;
    padding: 2px .5rem;
    margin: .5rem;
    border-radius: 1rem;
}

.btn {
    width: 100%;
}
</style>
