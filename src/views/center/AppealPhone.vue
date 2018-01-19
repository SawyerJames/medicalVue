<template>
    <div class="appealPhone flexCol">
        <!-- 错误提示，预加载，信息提示、头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <div class="small-header"></div>
        <alert :alert="alert" :title="title" :text="text"></alert>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <!-- 图片上传 slot插槽增加样式 -->
        <uploadImg @popBaseImg="popBaseImg_1">
            <img src="../../assets/register/idcard_1.png">
            <p>请上传手持身份证照(正面)</p>
            <img src="../../assets/common/add.png">
        </uploadImg>
        <uploadImg @popBaseImg="popBaseImg_2">
            <img src="../../assets/register/idcard_2.png">
            <p>请上传手持身份证照(反面)</p>
            <img src="../../assets/common/add.png">
        </uploadImg>
        <button @click="upload" class="btn">提交审核</button>
    </div>
</template>
<script type="text/javascript">
import uploadImg from '@/components/uploadImg'
export default {
    name: 'appealPhone',
    data() {
        return {
            loading: false,
            img: {
                baseImage_front: '',
                baseImage_back: ''
            },
            // 提示框
            passWin: false,
            // 报错弹窗
            errShow: false,
            errTxt: '',
            validate: '',
            // 信息提示弹窗
            alert: false,
            title: '',
            text: ''
        }
    },
    // 移除组件后清除表单
    activated() {
        document.title = "手机申诉审核认证";
        this.passWin = false;
        this.img.baseImage_front = '';
        this.img.baseImage_back = '';
        this.validate = '';
    },
    methods: {
        // 图片上传
        popBaseImg_1(baseImg) {
            this.img.baseImage_front = baseImg;
        },
        popBaseImg_2(baseImg) {
            this.img.baseImage_back = baseImg;
        },
        // 图片上传接口
        upload() {
            if (this.img.baseImage_front == undefined || this.img.baseImage_back == undefined) {
                this.validate = '上传信息不完整，缺少照片'
            } else {
                this.validate = '';
                this.loading = true;
                var that = this;
                this.$tools.PostDataToServer(
                    this,
                    this.API.postImg,
                    this.img,
                    function success(res) {
                        that.loading = false;
                        var resData = res.data;
                        // 如果成功，显示提示框1.5s后跳转至首页
                        if (resData.State.Code == 1) {
                            that.alert = true;
                            that.title = "用户实名信息认证";
                            that.text = "<p>您的审核已提交,</p>" + "<p>审核结果将会通过微信平台消息推送给您,</p>" + "<p>请注意查看</p>";
                            // 定时器跳转页面
                            var pass = setTimeout(function() {
                                that.$router.replace('/');
                                clearTimeout(pass);
                            }, 1500);
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
    },
    components: {
        uploadImg
    }
}
</script>
<style type="text/css" scoped>
.small-header {
    margin-bottom: 1rem;
}

.appealPhone {
    width: 100%;
    -ms-align-items: center;
    align-items: center;
}

.btn {
    width: 45%;
}
</style>
