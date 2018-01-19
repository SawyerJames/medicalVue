<template>
    <!-- 错误提示弹窗 -->
    <div>
        <div class="mask" v-if="errShow"></div>
        <div class="errorWin" v-if="errShow">
            <img src="../assets/common/ErrLoading.gif">
            <p>{{errTxt}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: ['errShow', 'errTxt'],
    // 监听数据
    watch: {
        errShow: function(val, oldval) {
            var that = this;
            // 1.5s隐藏弹窗
            var hideAlert = setTimeout(function() {
                that.errShow = false;
                that.errTxt = '';
                clearTimeout(hideAlert);
            }, 1500)
        },
        errTxt: function(val, oldval) {
            return val;
        }
    }
}
</script>
<style type="text/css" scoped></style>
