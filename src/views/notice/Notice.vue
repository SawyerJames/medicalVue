<template>
    <div class="notice flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <!-- banner大图 -->
        <div class="banner">
            <img src="../../assets/notice/banner.jpg" />
        </div>
        <!-- 新闻列表 -->
        <ul class="n-list borderBox flexCol">
            <router-link tag="li" class="n-detail borderBox flexCol" :to="{name: 'n-detail',params: {id: item.Id}}" v-for="(item,index) in notice">
                <div class="flexRow">
                    <img src="../../assets/notice/noticeIcon.png">
                    <span>{{item.Title}}</span>
                </div>
                <span>{{item.Createtime}}</span>
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'notice',
    data() {
        return {
            loading: true,
            notice: [],
            // 错误提示弹窗
            errShow: false,
            errTxt: ''
        }
    },
    activated() {
        document.title = "智慧医保通知公告";
        this.getNoticeList();
    },
    methods: {
        getNoticeList() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.noticeList,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    if (resData.State.Code == 1) {
                        that.notice = resData.NoticeInfo.Itemlist;
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notice {
    width: 100%;
}


/*banner*/

.banner {
    width: 100%;
}

.banner img {
    width: 100%;
}


/* 新闻内容 */

.n-list {
    width: 100%;
}

.n-detail {
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 1rem 5%;
    justify-content: space-between;
}

.n-detail>div {
    -ms-align-items: flex-start;
    align-items: flex-start;
}

.n-detail>div img {
    width: 1.3rem;
    margin-right: .5rem;
}

.n-detail>div span {
    font-size: .875rem;
    color: #4C4C4C;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.n-detail>span {
    font-size: .75rem;
    color: #9B9B9B;
    margin-top: .5rem;
    -ms-align-self: flex-end;
    align-self: flex-end;
}

.n-detail:last-child {
    border-bottom: none;
}
</style>
