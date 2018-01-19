<template>
    <div class="OtherUserAdd flexCol">
        <!-- 错误提示，预加载组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <!-- 头部 -->
        <div class="small-header"></div>
        <!-- 代缴信息填写表单 -->
        <form class="pay-other-msg flexCol">
            <div class="pay-other-model flexRow">
                <span class="userMsg-title">姓名</span>
                <span class="userMsg-kind">
                  <input type="text" class="pay-other-form  pay-form-name" placeholder="请输入信息" v-model="OtherUser.username"></input>
                </span>
            </div>
            <div class="pay-other-model flexRow">
                <span class="userMsg-title">关系</span>
                <span class="userMsg-kind">
                  <select class="pay-other-form" name="relative" v-model="OtherUser.relationship">
                      <option disabled value="请选择与被缴人关系">请选择与被缴人关系</option>
                      <option value="父女">父女</option>
                      <option value="父子">父子</option>
                      <option value="母子">母子</option>
                      <option value="母女">母女</option>
                      <option value="朋友">朋友</option>
                    </select>
                </span>
            </div>
            <div class="pay-other-model flexRow">
                <span class="userMsg-title">身份证号</span>
                <span class="userMsg-kind">
                  <input type="tel" class="pay-other-form" placeholder="请输入18位身份证号码" minlength="18" maxlength="18" v-model="OtherUser.card"></input>
                </span>
            </div>
            <div class="pay-other-model flexRow">
                <span class="userMsg-title">联系方式</span>
                <span class="userMsg-kind">
                    <input type="tel" class="pay-other-form" placeholder="请输入11位手机号码" minlength="11" maxlength="11" v-model="OtherUser.phone"></input>
                </span>
            </div>
            <!-- 代缴信息按钮：点击发送数据并查询数据 -->
            <button class="btn" type="button" @click='showPayComfirm'>确认</button>
        </form>
        <!-- 查询数据error：返回错误弹窗 -->
        <div class="pay-other-errorWin flexRow" v-if="showError">
            <img src="../../assets/common/noData.png" alt="信息不存在">
            <div>
                <p>{{errTxt}}</p>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'OtherUserAdd',
    data() {
        return {
            loading: false,
            // 输入数据
            OtherUser: {
                username: '',
                relationship: "请选择与被缴人关系",
                card: '',
                phone: '',
                status: 2
            },
            // 报错弹窗
            errShow: false,
            errTxt: '',
            validate: ''
        }
    },
    activated() {
        document.title = "添加被代缴人";
        this.validate = '';
        // 清空填写的信息
        this.OtherUser.username = '';
        this.OtherUser.card = '';
        this.OtherUser.phone = '';
        this.OtherUser.relationship = "请选择与被缴人关系";
    },
    methods: {
        // 数据逻辑弹窗：验证信息，获取数据
        showPayComfirm() {
            // 正则
            var nameRe = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
                idCardRe = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            // 定义变量
            var name = this.OtherUser.username,
                idCard = this.OtherUser.card,
                phone = this.OtherUser.phone;
            var that = this;
            // 开启验证
            if (!nameRe.test(name)) {
                this.validate = "姓名格式不正确"
            } else {
                if (this.relationship == "请选择与被缴人关系") {
                    this.validate = "请选择与被缴人关系"
                } else {
                    if (!idCardRe.test(idCard)) {
                        this.validate = "身份证号码格式不正确"
                    } else {
                        if (!phoneRe.test(phone)) {
                            this.validate = "手机号码格式不正确"
                        } else {
                            // 所有验证均通过后
                            if (nameRe.test(name) && idCardRe.test(idCard) && phoneRe.test(phone)) {
                                this.validate = '';
                                this.loading = true;
                                // 发送数据
                                this.$tools.PostDataToServer(
                                    this,
                                    this.API.addOther,
                                    this.OtherUser,
                                    function success(res) {
                                        var resData = res.data;
                                        that.loading = false;
                                        if (resData.State.Code == 1) {
                                            // 跳转到常用代缴人，会重新加载常用代缴人接口
                                            that.$router.replace('/pay-other');
                                        }
                                        // 没有查询到人
                                        if (resData.State.Code == 0) {
                                            // 清空填写的信息
                                            that.OtherUser.username = '';
                                            that.OtherUser.card = '';
                                            that.OtherUser.phone = '';
                                            that.OtherUser.relationship = "请选择与被缴人关系";
                                            // 错误提示
                                            that.errShow = true;
                                            that.errTxt = resData.Message;
                                            var errLoading = setTimeout(function() {
                                                that.errShow = false;
                                                that.errTxt = ''
                                                clearTimeout(errLoading);
                                            }, 2000);
                                        }
                                    },
                                    // 错误提示
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
                }
            }
        },
    }
}
</script>
<style type="text/css" scoped>
.OtherUserAdd {
    font-size: .875rem;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}


/*代缴信息填写表单*/

.pay-other-msg {
    border: 1px solid #ddd;
    font-size: .875rem;
    margin: 1rem auto .5rem;
    width: 80%;
    padding: 0 5%;
    border-radius: .5rem;
}

.pay-other-model {
    width: 100%;
    height: 2rem;
    -ms-align-items: center;
    align-items: center;
    padding: .25rem 0;
    border-bottom: 1px dashed #ddd;
}

.pay-other-model:last-child {
    border: none;
    margin-bottom: 0;
}

.pay-other-model .noBorder {
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
    border-radius: .2rem;
    font-weight: normal;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}


/*一些表单填写样式*/

.pay-other-form {
    border: none;
    background: #EFEFEF;
    color: #5F5F5F;
    padding: 2px .5rem;
    border-radius: 1rem;
    font-weight: normal;
    outline: none;
}

.btn {
    width: 100%;
}


/*信息查询失败返回弹窗*/

.pay-other-errorWin {
    position: fixed;
    width: 76%;
    left: 50%;
    top: 30%;
    margin-left: -40%;
    border: 1px solid #ddd;
    border-radius: .3rem;
    background: #fff;
    padding: 2%;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
    z-index: 10;
}

.pay-other-errorWin img {
    display: inline-block;
    width: 3rem;
    height: 3rem;
}
</style>
