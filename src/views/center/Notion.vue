<template>
    <div class="notion flexRow">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <div class="notion-item borderBox flexRow">
            <span>民族：</span>
            <!-- 民族循环 -->
            <select name="notion" class="info" v-model="notion.notion" id="notion">
                <option v-for="item in notionList" :value="item.name">{{item.name}}</option>
            </select>
        </div>
        <!-- 提交按钮 -->
        <button class="btn" @click="postAdd">完成</button>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'notion',
    data() {
        return {
            loading: false,
            // 民族信息
            notion: {
                notion: '请选择民族'
            },
            notionList: [{"name":"请选择民族"},{"name":"汉族"},{"name":"蒙古族"},{"name":"回族"},{"name":"藏族"},{"name":"维吾尔族"},{"name":"苗族"},{"name":"彝族"},{"name":"壮族"},{"name":"布依族"},{"name":"朝鲜族"},{"name":"满族"},{"name":"侗族"},{"name":"瑶族"},{"name":"白族"},{"name":"土家族"},{"name":"哈尼族"},{"name":"哈萨克族"},{"name":"傣族"},{"name":"黎族"},{"name":"傈僳族"},{"name":"佤族"},{"name":"畲族"},{"name":"高山族"},{"name":"拉祜族"},{"name":"水族"},{"name":"东乡族"},{"name":"纳西族"},{"name":"景颇族"},{"name":"柯尔克孜族"},{"name":"土族"},{"name":"达斡尔族"},{"name":"仫佬族"},{"name":"羌族"},{"name":"布朗族"},{"name":"撒拉族"},{"name":"毛难族"},{"name":"仡佬族"},{"name":"锡伯族"},{"name":"阿昌族"},{"name":"普米族"},{"name":"塔吉克族"},{"name":"怒族"},{"name":"乌孜别克族"},{"name":"俄罗斯族"},{"name":"鄂温克族"},{"name":"崩龙族"},{"name":"保安族"},{"name":"裕固族"},{"name":"京族"},{"name":"塔塔尔族"},{"name":"独龙族"},{"name":"鄂伦春族"},{"name":"赫哲族"},{"name":"门巴族"},{"name":"珞巴族"},{"name":"基诺族"}],
            // 表单验证
            validate: '',
            // 民族验证
            notionSuccess: false,
            // 报错弹窗
            errShow: false,
            errTxt: ''
        }
    },
    activated() {
        document.title = "修改民族信息";
    },
    methods: {
        // 检测民族
        checkNotion() {
            if (this.notion.notion == '请选择民族' || this.notion.notion == '') {
                this.validate = '请选择正确的民族'
            } else {
                this.notionSuccess = true;
            }
        },
        // 验证&数据传输
        postAdd() {
            this.checkNotion();
            // 校验
            if (this.notionSuccess) {
                this.validate = '';
                this.loading = true;
                var that = this;
                // 传输数据
                this.$tools.PostDataToServer(
                    this,
                    this.API.notion,
                    this.notion,
                    function success(res) {
                        that.loading = false;
                        var resData = res.data;
                        // 如果成功，跳转至手机验证页面
                        if (resData.State.Code == 1) {
                            that.$router.replace('/user');
                        }
                    },
                    // 如果失败，清空表单
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
}
</script>
<style type="text/css" scoped>
.notion {
    flex-direction: column;
    -ms-align-items: center;
    align-items: center;
}


/*地址模块*/

.notion-item {
    width: 100%;
    height: 3rem;
    padding: 0 5%;
    border-bottom: 1px solid #eee;
    font-size: .875rem;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.notion-item span {
    width: 4rem;
}

.notion-item select {
    height: 2rem;
    border-radius: .2rem;
    border: 1px solid #ddd;
    outline: none;
    color: #606060;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}

.btn {
    width: 65%;
}
</style>
