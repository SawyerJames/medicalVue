<template>
    <div class="o-opinion flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <!-- 请求弹窗 -->
        <div class="mask" v-if="mask"></div>
        <div class="loading flexCol" v-if="successLoading">
            <img v-if="imgLoading" src="../../assets/common/opinionLoad.gif">
            <p v-if="txtLoading">提交成功！</p>
        </div>
        <!-- 头部：reset定制样式 -->
        <div class="small-header borderBox">
            <h1>请提出您的宝贵意见</h1>
        </div>
        <!-- 意见表单 -->
        <form class="flexCol">
            <textarea class="opinion-textarea borderBox" placeholder="点击编辑，非常感谢您的宝贵意见，我们会认真对待，不断优化我们的服务" name="opinion" v-model.trim="opinionContent.content"></textarea>
            <button type="button" @click="submit" class="btn">提交确认</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'o-opinion',
    data() {
        return {
            opinionContent: {
                content: ''
            },
            // 提交表单后弹窗
            successLoading: false,
            mask: false,
            imgLoading: false,
            txtLoading: false,
            // 报错弹窗
            errShow: false,
            errTxt: '',
            validate: ''
        }
    },
    activated() {
        document.title = "智慧医保意见反馈";
        this.opinionContent.content = '';
        this.validate = '';
    },
    methods: {
        submit() {
            var that = this;
            if (this.opinionContent.content == '') {
                this.validate = "您还没有输入任何建议或意见";
            }
            /*如果意见反馈不为空*/
            if (this.opinionContent.content != '') {
                this.validate = '';
                this.$tools.PostDataToServer(
                    this,
                    this.API.opinion,
                    this.opinionContent,
                    function success(res) {
                        // 展示loading弹窗
                        that.successLoading = true;
                        that.mask = true;
                        that.imgLoading = true;
                        // loading 图片定时器
                        var showImg = setTimeout(function() {
                            that.imgLoading = false;
                            that.txtLoading = true;
                            clearTimeout(showImg);
                        }, 1000);

                        // 定时器2s后关闭
                        var showLoading = setTimeout(function() {
                            that.successLoading = false;
                            that.mask = false;
                            that.txtLoading = false;
                            that.opinionContent.content = '';
                            // 跳转页面
                            that.$router.replace({
                                path: '/'
                            })
                            clearTimeout(showLoading);
                        }, 2000);
                    },
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
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.o-opinion {
    width: 100%;
    -ms-align-items: center;
    align-items: center;
}

.o-opinion h5 {
    padding-left: 5%;
    margin: 1rem 0;
    color: #305f89;
    letter-spacing: 1px;
    -ms-align-self: flex-start;
    align-self: flex-start;
}

.small-header {
    height: 2rem;
    line-height: 2rem;
    padding-left: 5%;
    text-align: left;
    font-size: .875rem;
    color: #fff;
}

form {
    width: 90%;
    margin: 1rem auto;
    font-size: .875rem;
}

.opinion-textarea {
    width: 100%;
    height: 15rem;
    padding: .5rem;
    outline: none;
    border-radius: .5rem;
    border: 1px solid #3591cf;
    margin-bottom: 2rem;
}

.btn {
    width: 50%;
}

.loading {
    position: fixed;
    z-index: 10000;
    width: 8rem;
    height: 8rem;
    top: 25%;
    left: 50%;
    margin-left: -4rem;
    background: none;
    border-radius: .3rem;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.8rem;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}

.loading img {
    width: 5rem;
    height: 5rem;
}
</style>
