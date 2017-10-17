<template>
  <div class="search-my">
    <user></user>
    <!-- 个人综合信息查询 -->
    <div class="search-my-title">
      <span>个人综合信息</span>
    </div>
    <!-- 综合信息 -->
    <div class="search-my-msg">
      <div class="search-model">
        <div>
          <span class="search-model-title">姓名</span>
          <span class="search-model-msg">{{search.nickName}}</span>
        </div>
        <div>
          <span class="search-model-title">性别</span>
          <span class="search-model-msg">{{search.sex}}</span>
        </div>
      </div>
      <div class="search-model">
        <span class="search-model-title">身份证号</span>
        <span class="search-model-msg">{{search.idCard}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">出生日期</span>
        <span class="search-model-msg">{{search.birthday}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">单位名称<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.conpany}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">联系电话</span>
        <span class="search-model-msg">{{search.phone}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">用户类型</span>
        <span class="search-model-msg">{{search.user}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">待遇截止日期</span>
        <span class="search-model-msg">{{search.lastTime}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">账户余额<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.money}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">历年收入<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.oldIncome}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">本年收入<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.income}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">本年支出<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.expenditure}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">参保险种<span class="search-model-titleFlag">(职工相关)</span></span>
        <span class="search-model-msg">{{search.medicalType}}</span>
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
        search: {
          nickName: "张添",
          sex: "男",
          idCard: "220202199402222222",
          birthday: "1994.13.14",
          conpany: "吉林省腾放科技有限公司",
          phone: "13894892758",
          user: "普通职工",
          lastTime: "2017.02.11",
          money: "1500.00",
          oldIncome: "1800.00",
          income: "1000.00",
          expenditure: "2839.50",
          medicalType: "医疗保险"
        }
      }
    },
    created(){
      document.body.style.background = "#EDF2F5";
    },
    mounted () {
      this.$nextTick(function (){
        this.loadData();
      });
    },
    components: {
      user
    },
    methods: {
      loadData () {
        console.log("调用方法加载数据");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*html hack*/
  html{
    background: #EDF2F5 !important;
  }
  /*外层容器*/
  .search-my{
    background: #EDF2F5;
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
