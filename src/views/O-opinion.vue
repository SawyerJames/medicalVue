<template>
  <div class="o-opinion">
    <!-- 请求弹窗 -->
    <div class="mask" v-if="mask"></div>
    <div class="loading" v-if="successLoading">
      <img v-if="imgLoading" src="../assets/common/opinionLoad.gif">
      <p v-if="txtLoading">提交成功！</p>
    </div>
    <div class="loading" v-if="errLoading">
      <img v-if="imgLoading" src="../assets/common/opinionLoad.gif">
      <p v-if="txtLoading">提交失败！<p>没有填写任何内容</p></p>
    </div>
    <h5>请提出您的宝贵意见</h5>
    <!-- 意见表单 -->
    <form action="" method="get">
      <textarea class="opinion-textarea" placeholder="点击编辑，非常感谢您的宝贵意见，我们会酌情考虑，不断优化我们的服务" name="opinion" v-model.trim="opinionContent.content"></textarea>
      <button type="button" @click="submit" class="opinion-sub">提交确认</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'o-opinion',
    data(){
      return{
        opinionContent: {
          content: ''
        },
        // 提交表单后弹窗
        successLoading: false,
        errLoading: false,
        mask: false,
        imgLoading: false,
        txtLoading: false,
      }
    },
    methods: {
      submit(){
        var that = this;
        /*如果意见反馈不为空*/
        if (this.opinionContent != '') {
          this.$tools.PostDataToServer(
            this,
            process.env.API_HOST + 'Client/Opinion',
            this.opinionContent,
            function success (res) {
              // 展示loading弹窗
              that.successLoading = true;
              that.mask = true;
              that.imgLoading = true;
              // loading 图片定时器
              var showImg = setTimeout(function(){
                that.imgLoading = false;
                that.txtLoading = true;
                clearTimeout(showImg);
              },1000);

              // 定时器2s后关闭
              var showLoading = setTimeout(function(){
                that.successLoading = false;
                that.mask = false;
                that.txtLoading = false;
                that.opinionContent = '';
                // 跳转页面
                that.$router.push({path:'/'})
                clearTimeout(showLoading);
              },2000);
            },
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
              },1000);

              // 定时器3s后关闭
              var showLoading = setTimeout(function (){
                that.errLoading = false;
                that.mask = false;
                that.txtLoading = false;
                clearTimeout(showLoading);
              },1000)
            }
          )
        }
        else{
          // 展示loading弹窗
          this.errLoading = true;
          this.mask = true;
          this.imgLoading = false;
          that.txtLoading = true;

          // 定时器3s后关闭
          var showLoading = setTimeout(function (){
            that.errLoading = false;
            that.mask = false;
            that.txtLoading = false;
            clearTimeout(showLoading);
          },1500)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .o-opinion{
    width: 100%;
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
  .o-opinion h5{
    padding-left: 5%;
    margin: 1rem 0;
    color: #305f89;
    letter-spacing: 1px;
    -ms-align-self: flex-start;
    align-self: flex-start;
  }
  form{
    width: 90%;
    margin: 0 auto;
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
  }
  .opinion-textarea{
    width: 100%;
    height: 15rem;
    padding: .5rem;
    outline: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: .5rem;
    border: 1px solid #305f89;
    -webkit-box-shadow: 1px 1px 10px 1px #E6E6E6;
    box-shadow: 1px 1px 10px 1px #E6E6E6;
    margin-bottom: 2rem;
  }
  .opinion-sub{
    color: #fff;
    width: 40%;
    height: 2.5rem;
    margin: 0 auto;
    outline: none;
    border: none;
    background: #305f89;
    border-radius: .3rem;
    -webkit-box-shadow: 1px 1px 10px 1px #C5C5C5;
    box-shadow: 1px 1px 10px 1px #C5C5C5;
  }
  /*弹窗*/
  .mask{
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
  }
  .loading{
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
  .loading img{
    width: 5rem;
    height: 5rem;
  }
</style>
