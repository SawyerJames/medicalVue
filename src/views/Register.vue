<template>
  <div class="register">
    <!-- 验证提示 -->
    <h1 class="validate" v-if="validate">{{validate}}</h1>
    <img class="logo" src="../assets/register/logo.png">
    <!-- 请求弹窗 -->
    <div class="mask" v-if="mask"></div>
    <div class="loading" v-if="successLoading">
      <img v-if="imgLoading" src="../assets/common/Heart.gif">
      <p v-if="txtLoading">注册成功！</p>
    </div>
    <div class="loading" v-if="errLoading">
      <img v-if="imgLoading" src="../assets/common/Heart.gif">
      <p v-if="txtLoading">注册失败！</p>
      <p v-if="txtLoading">请核对个人信息</p>
    </div>
    <!-- 表单 -->
    <form>
      <!-- 姓名 -->
      <div class="register-model">
        <input type="text" name="userName" maxlength="4" placeholder="请输入姓名" v-model.trim="user.name"></input>
      </div>
      <!-- 性别 -->
      <div class="register-model">
        <span class="res_sexTitle">性别</span>
        <div class="res_sex">
          <div :class="{'sexChoose':sexBoy}">
            <input type="radio" @click="chooseSex(1)" value="1" v-model="user.gender"></input>
            <span>先生</span>
          </div>
          <div :class="{'sexChoose':sexGirl}">
            <input type="radio" @click="chooseSex(2)" value="2" v-model="user.gender"></input>
            <span>女士</span>
          </div>
        </div>
      </div>
      <!-- 获取验证码逻辑 -->
      <div class="register-model">
        <input type="tel" name="phone" maxlength="11" v-on:input="getCodeFun(user.phone)" placeholder="请输入联系电话" v-model.trim="user.phone"></input>
        <!-- 获取验证码伪装 -->
        <span v-if="showVerFlag" class="verificationBtn">获取验证码</span>
        <!-- 获取验证码按钮 -->
        <button type="button" @click="getCode(user.phone)" :disabled="!showVer" v-else class="verificationBtn">
         <span v-show="showVer">获取验证码</span>
         <span v-show="!showVer" class="count">重新获取({{count}}s)</span>
        </button>
      </div>
      <!-- 输入验证码 -->
      <div class="register-model">
        <input type="tel" name="verification" maxlength="6" placeholder="请输入验证码" v-model.trim="user.verification"></input>
      </div>
      <!-- 身份证码 -->
      <div class="register-model">
        <input type="tel" name="idCard" maxlength="18" placeholder="请输入身份证号" v-model.trim="user.idCard"></input>
      </div>
      <!-- 日期选择器 -->
      <div class="register-model">
        <el-date-picker
          v-model="user.birthday"
          type="date"
          placeholder="请选择出生日期"
          :picker-options="pickerOptions"
          @change="dateChange">
        </el-date-picker>
      </div>
      <input type="button" @click="submitForm" class="formSubmitBtn" value="立即注册"></input>
    </form>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'register',
    mounted () {
      this.$nextTick(function (){
      });
    },
    data () {
      return {
        // 日期选择器
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        user: {
          name: '',
          sex: '1',
          phone: '',
          verification: '',
          idCard: '',
          birthday: ''
        },
        formData: {
          phone:'',
          code:'',
        },
        validate: '',
        // 性别
        sexBoy: true,
        sexGirl: false,
        // 验证码
        showVer: true,
        count: '',
        timer: null,
        TIME_COUNT: 10,
        showVerFlag: true,
        // 提交表单后弹窗
        successLoading: false,
        errLoading: false,
        mask: false,
        imgLoading: false,
        txtLoading: false
      }
    },
    methods: {
      // 表单提交
      submitForm () {
        var name = this.user.name,
            phone = this.user.phone,
            verification = this.user.verification,
            idCard = this.user.idCard,
            birthday = this.user.birthday;
        // 正则
        var nameRe = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/,
            idCardRe = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            verificationRe = /^\d{6}$/;
        var that = this;

        // 开启验证
        if (!nameRe.test(name)) {
          this.validate = "姓名格式不正确"
        }
        if (!phoneRe.test(phone)) {
          this.validate = "手机号码格式不正确"
        }
        if (!idCardRe.test(idCard)) {
          this.validate = "身份证号码格式不正确"
        }
        if (!verificationRe.test(verification)) {
          this.validate = "验证码不正确"
        }
        if (birthday === '') {
          this.validate = "未选择出生日期"
        }
        // 验证通过后发起请求
        if (nameRe.test(name)&&phoneRe.test(phone)&&idCardRe.test(idCard)&&verificationRe.test(verification)&&birthday!=''&&birthday!=undefined) {
          this.validate = '';
          this.$tools.PostDataToServer(
            this,
            process.env.API_HOST + 'Client/Register',
            this.user,
            function success (res) {
              var resData = res.data;
              // 如果成功，返回页面并刷新
              if (resData.State.Code == 1) {
                // 展示loading弹窗
                that.successLoading = true;
                that.mask = true;
                that.imgLoading = true;

                // loading 图片定时器
                var showImg = setTimeout(function(){
                  that.imgLoading = false;
                  that.txtLoading = true;
                  clearTimeout(showImg);
                },1500);

                // 定时器3s后关闭
                var showLoading = setTimeout(function(){
                  that.successLoading = false;
                  that.mask = false;
                  that.txtLoading = false;
                  // 跳转页面
                  location.replace(document.referrer);
                  clearTimeout(showLoading);
                },3000);
              }
              // 如果失败，清空表单
              if (resData.State.Code == 0) {
                // 展示loading弹窗
                that.errLoading = true;
                that.mask = true
                that.imgLoading = true;

                // loading 图片定时器
                var showImg = setTimeout(function(){
                  that.imgLoading = false;
                  that.txtLoading = true;
                  clearTimeout(showImg);
                },1500);

                // 定时器3s后关闭
                var showLoading = setTimeout(function (){
                  that.errLoading = false;
                  that.mask = false;
                  that.txtLoading = false;
                  clearTimeout(showLoading);
                },3000)
              }
            },
            // 如果失败，清空表单
            function error (err){
              // 展示loading弹窗
              that.errLoading = true;
              that.mask = true
              that.imgLoading = true;

              // loading 图片定时器
              var showImg = setTimeout(function(){
                that.imgLoading = false;
                that.txtLoading = true;
                clearTimeout(showImg);
              },1500);

              // 定时器3s后关闭
              var showLoading = setTimeout(function (){
                that.errLoading = false;
                that.mask = false;
                that.txtLoading = false;
                clearTimeout(showLoading);
              },3000)
            }
          )
        }
      },
      // 选择性别
      chooseSex (val) {
        if (val === 1) {
          this.sexBoy = true;
          this.sexGirl = false;
          this.user.sex = '1';
        }
        if (val === 2){
          this.sexBoy = false;
          this.sexGirl = true;
          this.user.sex = '2';
        }
      },
      // 获取验证码
      getCode(phone){
        // 如果不为空的定时器
        if (!this.timer) {
            // 开始计数
            this.count = this.TIME_COUNT;
            this.showVer = false;
            // 定时器读秒
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= this.TIME_COUNT) {
                this.count--;
              } else {
                this.showVer = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
            // 开始发送验证码
        }
      },
      // 显示获取验证码点击函数
      getCodeFun (val) {
        var phoneRe = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!phoneRe.test(this.user.phone)) return;
        if (phoneRe.test(this.user.phone)) {
          this.showVerFlag = false;
        }
      },
      dateChange(val) {
        this.user.birthday = val;
      }
    }
  }
</script>

<style type="text/css" scoped>
  .register{
    min-height: 90%;
    width: 100%;
    background: url(../assets/register/registerBg.jpg);
    -webkit-background-size: 100%;
    background-size: 100%;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -ms-align-items: center;
    align-items: center;
  }
  .logo{
    width: 4rem;
    margin: 1rem auto 1rem;
  }
  /*表单样式*/
  .register form{
    width: 70%;
    margin: 0 auto;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -ms-align-items: center;
    align-items: center;
  }
  /*基础模板*/
  .register-model{
    width: 100%;
    height: 2rem;
    margin: .6rem 0;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
  }
  /*表单input 通用样式*/
  .register-model input[type="text"],.register-model input[type="tel"],.res_birthdayChoose{
    width: 100%;
    height: 2.5rem;
    outline: none;
    border: none;
    background: rgba(255,255,255,.7);
    padding: 2%;
    font-size: .875rem;
    border-radius: .2rem;
    color: #4F4F4F;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /*生日选择样式*/
  .register .el-date-editor.el-input{
    width: 100%;
    min-width: 7rem;
    background: rgba(255,255,255,.7);
    border-radius: .2rem;
  }
  .register .el-input__inner{
    background: none !important;
    color: #4F4F4F !important;
    font-size: .875rem !important;
  }
  /*获取验证码 按钮*/
  .register .verificationBtn{
    min-width: 6rem;
    margin-left: .5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: .875rem;
    outline: none;
    border: none;
    border-radius: .2rem;
    background: #83C4F0;
    text-align: center;
    color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /*立即注册 按钮*/
  .register .formSubmitBtn{
    margin: 2rem auto 1rem;
    width:100%;
    height: 2.5rem;
    font-size: .875rem;
    outline: none;
    border: none;
    border-radius: .2rem;
    background: #3591CF;
    color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /*性别选择器：样式*/
  .register-model .res_sex{
    font-size: .875rem;
    height: 2.5rem;
    border-radius: .2rem;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
  }
  .register-model .res_sex>div{
    width: 100%;
    background: #FF8787;
    border-radius: .2rem;
    position: relative;
    z-index: 1;
    margin: 0 .2rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
  }
  .register-model .res_sex>div:last-child{
    margin-right: 0;
  }
  .register-model .res_sex>div span{
    color: #fff;
    position: absolute;
    width: 100%;
    height: 2.5rem;
    z-index: 0;
    left: 50%;
    top: 0;
    margin-left: -50%;
    text-align: center;
    line-height: 2.5rem;
  }
  .register-model .res_sex input[type="radio"]{
    margin: 0 .2rem;
    width: 100%;
    height: 2.5rem;
    outline: none;
    opacity: 0;
    z-index: 111;
  }
  .register-model .res_sexTitle{
    height: 2.5rem;
    min-width: 4rem;
    line-height: 2.5rem;
    font-size: .875rem;
    border-radius: .2rem;
    background: rgba(255,255,255,.7);
    margin-right: 1rem;
    padding:0 2%;
    color: #818181;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .register-model .res_sex>div.sexChoose{
    background: #3591CF;
  }
  /*表单验证*/
  .register .validate{
    position: fixed;
    width: 100%;
    height: 2rem;
    background: #3591CF;
    z-index: 1;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: .875rem;
  }
  /*弹窗*/
  .register .mask{
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
  }
  .register .loading{
    position: fixed;
    z-index: 10000;
    width: 8rem;
    height: 8rem;
    top: 25%;
    left: 50%;
    margin-left: -4rem;
    background: #fff;
    border-radius: .3rem;
    color: #3591CF;
    font-weight: bold;
    font-size: .875rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
  }
  .register .loading img{
    width: 4rem;
    height: 4rem;
  }
</style>
