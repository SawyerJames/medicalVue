<template>
    <div class="errorRegister flexCol">
        <img class="logo" src="../../assets/register/logo.png">
        <!-- 表单 -->
        <form class="flexCol">
            <h1 class="borderBox">用户实名信息认证</h1>
            <!-- 内容 -->
            <div class="errorRegister-model flexRow">
                <div>
                    <p>抱歉, 未查询到您的参保信息!</p>
                    <p>请尝试重新填写</p>
                    <p>或提交补充信息进行人工审核</p>
                </div>
            </div>
            <!-- 按钮组 -->
            <div class="errorRegister-model flexRow">
                <router-link to="/Register" tag="button" class=".btn exitBtn">重新填写</router-link>
                <router-link to="/addRegister" tag="button" class=".btn">补充信息</router-link>
            </div>
        </form>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'errorRegister',
    activated() {
        document.title = "实名信息认证";
    }
}
</script>
<style type="text/css" scoped>
.errorRegister {
    position: fixed;
    height: 100%;
    width: 100%;
    background: url('../../assets/register/registerBg.png');
    -webkit-background-size: 100%;
    background-size: 100%;
    z-index: 111;
    -ms-align-items: center;
    align-items: center;
}

.logo {
    width: 4rem;
    margin: 1rem auto 1rem;
}


/*表单样式*/

.errorRegister form {
    width: 85%;
    height: auto;
    margin: 0 auto;
    background: #fff;
    border-radius: .5rem .5rem 0 0;
    -ms-align-items: center;
    align-items: center;
}

.errorRegister form h1 {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    padding-left: 5%;
    font-size: .875rem;
    text-align: left;
    color: #fff;
    border-radius: .5rem .5rem 0 0;
    background: #5BB2F7;
}


/*基础模板*/

.errorRegister-model {
    width: 95%;
    height: auto;
    margin: .2rem auto;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.errorRegister-model:last-child {
    border: none;
}

.errorRegister-model div {
    width: 100%;
    text-align: center;
}

.errorRegister-model div p {
    margin: .75rem auto;
    font-size: .875rem;
}


/*按钮组*/

.Btn {
    width: 45%;
}

.exitBtn {
    background: #C8C8C8;
}
</style>
