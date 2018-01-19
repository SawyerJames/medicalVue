<template>
    <div>
        <div class="mask" v-if="alert"></div>
        <div class="alert_win" v-if="alert">
            <h1 class="alert_title">{{title}}</h1>
            <div class="alert_text borderBox flexCol" v-html="text"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: ['alert', 'title', 'text'],
    // 监听数据
    watch: {
        alert: function(val, oldval) {
            var that = this;
            // 1.5s隐藏弹窗
            var hideAlert = setTimeout(function() {
                that.alert = false;
                that.title = '';
                that.text = '';
                clearTimeout(hideAlert);
            }, 1500)
        },
        text: function(val, oldval) {
            return val;
        },
        title: function(val, oldval) {
            return val;
        }
    }
}
</script>
<style type="text/css" scoped>
.alert_win {
    width: 12rem;
    min-height: 8rem;
    background: #fff;
    border-radius: .5rem .5rem 0 0;
    z-index: 10000000;
    position: fixed;
    top: 30%;
    left: 50%;
    margin-left: -6rem;
}

.alert_title {
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 5%;
    color: #fff;
    background: #5bb2f7;
    border-radius: .5rem .5rem 0 0;
}

.alert_text {
    width: 100%;
    padding: .5rem;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}
</style>
