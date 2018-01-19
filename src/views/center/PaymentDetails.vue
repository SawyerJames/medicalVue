<template>
    <div class="paymentDetails">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <div class="topHack"></div>
        <!-- 循环缴费明细 -->
        <div class="paymentListTitle flexRow borderBox">
            <p>姓名</p>
            <p>医保类型</p>
            <p>缴费金额</p>
        </div>
        <div v-for="item in paymentList" class="paymentList flexCol">
            <div class="paymentList_top flexRow">
                <p>{{item.UserName}}</p>
                <p>{{item.InsuranceType}}</p>
                <p>{{item.PaymentAmount}} 元</p>
            </div>
            <p class="paymentList_bottom">{{item.CreateTime}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'paymentDetails',
    data() {
        return {
            loading: true,
            paymentList: [],
            // 错误提示弹窗
            errShow: false,
            errTxt: ''
        }
    },
    activated() {
        document.title = "缴费明细查询";
        this.getPaymentList();
    },
    methods: {
        getPaymentList() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.getPaymentList,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    if (resData.State.Code == 1) {
                        that.paymentList = resData.PaymentInfo.Itemlist;
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
.smallUser {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
}

.topHack {
    height: 2.5rem;
    width: 100%;
    background: none;
}

.paymentListTitle {
    width: 100%;
    height: 2.5rem;
    font-size: .875rem;
    background: #edf2f5;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 5.375rem;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
}

.paymentListTitle p {
    width: 33%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #9cd1e3;
    color: #305f89;
}

/* 缴费查询循环体 */

.paymentList {
    width: 100%;
    margin: 1rem auto;
    text-align: center;
    border-bottom: 1px solid #ddd;
    border-radius: .2rem;
    font-size: .875rem;
}

.paymentList .paymentList_top {
    width: 100%;
    height: 1.5rem;
    align-items: center;
}

.paymentList .paymentList_top p {
    width: 33.3%;
    text-align: center;
}

.paymentList .paymentList_bottom {
    width: 94%;
    height: 100%;
    text-align: center;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: right;
    font-size: .75rem;
    color: #919191;
}
</style>
