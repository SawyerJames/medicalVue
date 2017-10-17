<template>
  <div class="search-other">
    <user></user>
    <!-- 用户缴费信息查询 -->
    <div class="search-other-title">
      <span>用户缴费信息</span>
    </div>
    <!-- 缴费信息 -->
    <div class="search-other-msg">
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
        <span class="search-model-title">缴费金额</span>
        <span class="search-model-msg">{{search.money}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">统筹区名称</span>
        <span class="search-model-msg">{{search.company}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">险种名称</span>
        <span class="search-model-msg">{{search.medicalType}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">缴费年度</span>
        <span class="search-model-msg">{{search.incomeYear}}</span>
      </div>
      <div class="search-model">
        <span class="search-model-title">上一年度待遇期至何时</span>
        <span class="search-model-msg">{{search.oldYear}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import user from "@/components/user"
  export default {
    name: 'search-other',
    data () {
      return {
        search: {
          nickName: "张添",
          sex: "男",
          idCard: "220202199402222222",
          birthday: "1994.13.14",
          money: "1500.00",
          company: "长春市南关区医保局",
          medicalType: "医疗保险",
          incomeYear: "2017-2018",
          oldYear: "2017.02.11"
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
        console.log("调用方法加载数据2");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*外层容器*/
  .search-other{
    background: #EDF2F5;
    font-size: .875rem;
  }
  /*缴费信息 标题*/
  .search-other-title{
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
  /*缴费信息 内容*/
  .search-other-msg{
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

