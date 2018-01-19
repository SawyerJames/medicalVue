<template>
    <div class="payOtherSee flexCol">
        <!-- 错误提示，预加载组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <!-- 解绑弹窗 -->
        <div class="mask" v-if="confirmShow"></div>
        <div class="UserUnbund_window flexCol" v-if="confirmShow">
            <h1 class="borderBox">是否确定解绑此人？</h1>
            <div class="flexRow">
                <button type="button" class="canBtn btn" @click="cancelUnbund">取消</button>
                <button type="button" class="btn" @click="successUnbund">确定</button>
            </div>
        </div>
        <!-- 头部 -->
        <div class="small-header">
            <p class="unbundUser" @click="unbundUser">解除绑定</p>
        </div>
        <!-- 缴费详情 -->
        <div class="OtherUserMsg flexCol">
            <div class="otherUser-model flexRow">
                <span class="userMsg-title">姓名</span>
                <span class="userMsg-kind">{{userMoreMsg.UserName}}</span>
            </div>
            <div class="otherUser-model flexRow">
                <span class="userMsg-title">与本人关系</span>
                <span class="userMsg-kind">{{userMoreMsg.RelationShip}}</span>
            </div>
            <div class="otherUser-model flexRow">
                <span class="userMsg-title">身份证号</span>
                <span class="userMsg-kind">{{userMoreMsg.IdCard}}</span>
            </div>
            <div class="otherUser-model flexRow">
                <span class="userMsg-title">联系方式</span>
                <span class="userMsg-kind">{{userMoreMsg.Phone}}</span>
            </div>
            <div class="otherUser-model flexRow" v-if="getOtherUser.IsPay == 0">
                <span class="userMsg-title">险别种类</span>
                <span class="userMsg-kind">{{userMoreMsg.type}}</span>
            </div>
            <div class="otherUser-model flexRow" v-if="getOtherUser.IsPay == 0">
                <span class="userMsg-title">应缴金额</span>
                <span class="userMsg-kind">{{userMoreMsg.total_fee}}元</span>
            </div>
            <div class="otherUser-model flexRow noBorder" v-if="getOtherUser.IsPay == 0">
                <span class="userMsg-title">待遇截止日期</span>
                <span class="userMsg-kind">{{userMoreMsg.valid_period}}</span>
            </div>
            <div class="otherUser-model flexRow noBorder" v-if="getOtherUser.IsPay == 1">
                <span class="userMsg-title">待遇期</span>
                <span class="userMsg-kind">{{userMoreMsg.currentdeadline}}</span>
            </div>
            <button class="btn" @click="payOtherGo" type="button" v-if="getOtherUser.IsPay == 0">立即缴费</button>
            <div class="noPay flexRow" v-if="getOtherUser.IsPay == 1">
                <span>已完成本年度费用交纳，无需再次缴纳！</span>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import loading from "@/components/loading"
export default {
    name: 'payOtherSee',
    data() {
        return {
            loading: true,
            userMoreMsg: {},
            getOtherUser: {
                IsPay: '',
                IdCard: '',
                UserName: '',
                status: 2
            },
            // 解绑弹窗
            confirmShow: false,
            // 报错弹窗
            errShow: false,
            errTxt: ''
        }
    },
    activated() {
        document.title = "查看被代缴人";
        // 由路由传参id，使用id进行信息查询
        this.getOtherUser.IsPay = this.$route.params.msg.IsPay;
        this.getOtherUser.IdCard = this.$route.params.msg.IdCard;
        this.getOtherUser.UserName = this.$route.params.msg.UserName;
        this.getUserMoreMsg();
    },
    methods: {
        // 查询更多信息
        getUserMoreMsg() {
            var that = this;
            this.$tools.PostDataToServer(
                this,
                this.API.seeOther,
                this.getOtherUser,
                function success(res) {
                    var resData = res.data;
                    that.loading = false;
                    if (resData.State.Code == 1) {
                        that.userMoreMsg = resData.Info;
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
        },
        // 发送数据
        payOtherGo() {
            var that = this;
            // 加载数据
            this.$tools.PostDataToServer(
                this,
                this.API.payOther,
                this.getOtherUser,
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
        weixinPay (data) {
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
        onBridgeReady (data) {
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
                        that.getUserMoreMsg();
                    } else {
                        that.loading = false;
                        alert("支付失败");
                    }
                }
            );
        },
        // 解除绑定被代缴人：弹窗与解绑
        cancelUnbund() {
            this.confirmShow = false;
        },
        successUnbund() {
            var that = this;
            this.loading = true;
            this.$tools.PostDataToServer(
                this,
                this.API.unbundOther,
                this.getOtherUser,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    // 如果成功，跳转至
                    if (resData.State.Code == 1) {
                        that.$router.replace('/pay-other');
                    }
                },
                // 如果失败，清空表单
                function error(err) {
                    that.errShow = true;
                    that.loading = false;
                    that.errTxt = '出现错误，请重新加载'
                    var errLoading = setTimeout(function() {
                        that.errShow = false;
                        that.errTxt = ''
                        clearTimeout(errLoading);
                    }, 2000)
                }
            )
        },
        unbundUser() {
            this.confirmShow = true;
        }
    },
    components: {
        loading
    }
}
</script>
<style type="text/css" scoped>
.small-header {
    height: 2rem;
}


/*解绑信息*/

.unbundUser {
  width: 95%;
  text-align: right;
  color: #fff;
  line-height: 2rem;
  font-size: .875rem;
}


/*pay-other common*/

.payOtherSee {
    font-size: .875rem;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}


/*具体信息模板*/

.OtherUserMsg {
    border: 1px solid #ddd;
    font-size: .875rem;
    margin: 1rem auto .5rem;
    width: 80%;
    padding: 0 5%;
    border-radius: .5rem;
}

.otherUser-model {
    width: 100%;
    min-height: 2rem;
    -ms-align-items: center;
    align-items: center;
    padding: .25rem 0;
    border-bottom: 1px dashed #ddd;
}

.otherUser-model:last-child {
    border: none;
    margin-bottom: 0;
}

.otherUser-model .noBorder {
    border-bottom: none;
}


/*信息标题*/

.userMsg-title {
    color: #31679C;
    font-weight: bold;
    width: 6rem;
}


/*信息内容*/

.userMsg-kind {
    color: #5F5F5F;
    background: #EFEFEF;
    padding: 2px .5rem;
    margin: .5rem;
    border-radius: .2rem;
    font-weight: normal;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}

.btn {
    width: 100%;
}


/*没有交纳费用是提供的数据*/

.noPay {
    margin-bottom: 1rem;
    text-align: center;
    font-weight: bold;
    -ms-align-items: center;
    align-items: center;
}


/*解绑弹窗*/

.UserUnbund_window {
    color: #fff;
    position: fixed;
    width: 15rem;
    height: 8rem;
    background: #fff;
    margin-left: -7.5rem;
    left: 50%;
    top: 30%;
    border-radius: .5rem .5rem 0 0;
    z-index: 9999;
    -ms-align-items: center;
    align-items: center;
}

.UserUnbund_window h1 {
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

.UserUnbund_window div {
    width: 100%;
    height: 5rem;
    -ms-align-items: center;
    align-items: center;
    justify-content: space-around;
}

.UserUnbund_window .btn {
    width: 45%;
}

.UserUnbund_window .canBtn {
    background: #C8C8C8;
}
</style>
