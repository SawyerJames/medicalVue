<template>
    <div class="n-detail borderBox">
        <!-- 预加载组件 -->
        <loading v-if="loading"></loading>
        <h1>{{detail.Title}}</h1>
        <span class="msg">{{detail.city}}{{detail.Createtime}}</span>
        <div class="msgContent" v-html="detail.Content"></div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'n-detail',
    data() {
        return {
            loading: true,
            detail: []
        }
    },
    activated() {
        document.title = "智慧医保通知公告";
        this.loading = true;
        this.detail = '';
        // 由路由notice传参id，并重新赋值
        var Id = this.$route.params.id;
        //调用获取详细信息方法，传递参数判断
        this.getNoticeDetail(Id);
    },
    methods: {
        getNoticeDetail: function(Id) {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.noticeInfo + Id,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    if (resData.State.Code == 1) {
                        that.detail = resData.NoticeInfo
                    }
                },
                function error(err) {
                    return
                }
            )
        }
    }
}
</script>
<style type="text/css" scoped>
.n-detail {
    width: 100%;
    padding: 5%;
}

.n-detail h1 {
    text-align: left;
    border-bottom: .2rem dashed #ddd;
    padding-bottom: 1rem;
    font-size: 1rem;
}

.msgContent {
    width: 100%;
    font-size: .875rem;
    color: #474747;
}

.msgContent p {
    text-indent: 1.5rem;
    line-height: 1.2rem;
    /*英文断行*/
    word-wrap: break-word;
    word-break: break-all;
}
</style>
