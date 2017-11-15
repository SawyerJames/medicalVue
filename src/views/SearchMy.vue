<template>
  <div class="search-my">
    <!-- 报错弹窗 -->
    <div class="errorMask" v-if="errShow"></div>
    <div class="errorWin" v-if="errShow">
      <img src="../assets/common/ErrLoading.gif">
      <p>{{errTxt}}</p>
    </div>
    <!-- 个人综合信息查询 -->
    <div class="search-my-title">
      <span>个人综合信息</span>
    </div>
    <!-- 综合信息 -->
    <div class="search-my-msg">
      <div class="search-model">
        <div>
          <span class="search-model-title">姓名</span>
          <span class="search-model-msg">{{search.username}}</span>
        </div>
        <div>
          <span class="search-model-title">性别</span>
          <span class="search-model-msg" v-if="search.sex == '1'">男</span>
          <span class="search-model-msg" v-else-if="search.sex == '2'">女</span>
        </div>
      </div>
      <div class="search-model">
        <span class="search-model-title">身份证号</span>
        <span class="search-model-msg">{{search.card}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">出生日期</span>
        <span class="search-model-msg">{{search.birthday}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">联系电话</span>
        <span class="search-model-msg">{{search.phone}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">地址</span>
        <span class="search-model-msg">{{search.address}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">单位名称<span class="search-model-titleFlag"></span></span>
        <span class="search-model-msg">{{search.company_name1}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">用户类型</span>
        <span class="search-model-msg" v-if="search.user_type == '1'">职工</span>
        <span class="search-model-msg" v-if="search.user_type == '2'">居民</span>
        <span class="search-model-msg" v-if="search.user_type == '3'">其他</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">待遇截止日期</span>
        <span class="search-model-msg">{{search.currentdeadline}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">账户余额<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.balance}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">历年收入<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.oldyearincome}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">本年收入<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.nowyearincome}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">本年支出<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.nowexpenditure}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">险种信息<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.insurance_info}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">参保险种<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.insured_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import user from "@/components/user"
  export default {
    name: 'search-my',
    data () {
      return {
        search: {},
        errShow: false,
        errTxt: ''
      }
    },
    mounted () {
      this.$nextTick(function (){
        var that = this;
        this.$tools.GetDataFromServer(
          this,
          process.env.API_HOST + 'Client/IntegratedInfo',
          function success (res) {
            var resData = res.data;
            if (resData.State.Code == 1) {
              that.search = resData.Info;
            }
            if (resData.State.Code != 1) {
              that.errShow = true;
              that.errTxt = '数据库没有您的信息'
              var errLoading = setTimeout(function (){
                that.errShow = false;
                that.errTxt = ''
                clearTimeout(errLoading);
              },2000)
            }
          },
          function error (err){
            that.errShow = true;
            that.errTxt = '出现错误，请重新加载'
            var errLoading = setTimeout(function (){
              that.errShow = false;
              that.errTxt = ''
              clearTimeout(errLoading);
            },2000)
          }
        );
      });
    },
    components: {
      user
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*外层容器*/
  .search-my{
    background: #fff;
    font-size: .875rem;
  }
  /*个人综合信息 标题*/
  .search-my-title{
    color: #015480;
    font-weight: bold;
    width: 90%;
    height: 3rem;
    margin: 0 auto;
    padding: 0 2.5%;
    border-radius: .4rem .4rem 0 0;
    border-bottom: 1px solid #015480;
    background: #fff;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: center;
    align-items: center;
  }
  /*个人综合信息 内容*/
  .search-my-msg{
    width: 90%;
    margin: 0 auto 1rem;
    padding: .5rem 2.5%;
    border-radius: 0 0 .4rem .4rem;
    background: #fff;
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
  /*模块样式*/
  .search-model{
    margin: .25rem 0;
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
  .search-model-title{
    color: #015480;
    margin-right: .5rem;
  }
  .search-model-titleFlag{
    font-size: .75rem;
  }
  .search-model-msg{
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
    background: #efefed;
    border-radius: 1rem;
    padding: 1px .75rem;
    color: #484848;
    font-size: .75rem;
  }
</style>
