<template>
    <div class="pay-other clearfix flexCol">
        <!-- 错误提示，预加载组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <!-- 上方头部 -->
        <div class="small-header"></div>
        <!-- 常用人 -->
        <div class="payCommonList" v-for="item in getPayOtherList">
            <div class="payCommon flexRow borderBox">
                <div>
                    <span>{{item.UserName}}</span>
                    <span class="payCommon_bgStyle">{{item.IdCard}}</span>
                </div>
                <router-link :to="{name: 'payOtherSee',params: {msg: item}}" tag="button" type="button" class="payCommonSee">查看</router-link>
            </div>
        </div>
        <!-- 添加代缴信息按钮 -->
        <router-link to="/payOtherAdd" tag="button" type="button" class="btn">新增被代缴人信息</router-link>
    </div>
</template>
<script>
export default {
    name: 'pay-other',
    data() {
        return {
            loading: true,
            // axios数据
            getPayOtherList: [],
            // 报错弹窗
            errShow: false,
            errTxt: '',
            validate: ''
        }
    },
    activated() {
        this.loading = true;
        document.title = "智慧医保代缴保费";
        this.getOtherData();
    },
    methods: {
        // 加载常用联系人的数据
        getOtherData() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.getOther,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    if (resData.State.Code == 1) {
                        // 加载数据
                        that.getPayOtherList = resData.InsteadList.Itemlist;
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
        }
    }
}
</script>
<style scoped>
/*pay-other common*/

.pay-other {
    font-size: .875rem;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}


/*常用联系人*/

.payCommonList {
    width: 100%;
    height: auto;
}

.payCommon {
    width: 100%;
    height: 2.5rem;
    padding: 0 5%;
    font-size: .875rem;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.payCommon_bgStyle {
    background: #efefed;
    border-radius: 1rem;
    padding: 1px .75rem;
    color: #484848;
    font-size: .875rem;
}

.payCommonSee {
    color: #fff;
    padding: .2rem .5rem;
    border: none;
    border-radius: .2rem;
    background: #7DC5DC;
    outline: none;
}

/*添加信息按钮*/

.btn {
    width: 50%;
}
</style>
