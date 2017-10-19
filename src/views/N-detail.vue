<template>
  <div class="n-detail">
    <h1>{{this.detail.Title}}</h1>
    <p class="msg">{{this.detail.city}}{{this.detail.Createtime}}</p>
    <div class="msgContent" v-html="this.detail.Content"></div>
  </div>
</template>

<script type="text/javascript">
export default{
  name: 'n-detail',
  created(){
    document.body.style.background = "#FFF";
  },
  data (){
    return {
      detail: []
    }
  },
  mounted () {
    this.$nextTick (function () {
      var Id = this.$route.params.id;
      this.getNoticeDetail(Id);
    })
  },
  methods: {
    getNoticeDetail: function (Id){
      var that = this;
      // 加载数据
      this.$tools.GetDataFromServer(
        this,
        'http://123.206.9.224/wap/Notice/NoticeInfo/id/'+Id,
        function success (res) {
          var resData = res.data;
          if (resData.State.Code === 1) {
            that.detail = resData.NoticeInfo
          }
        },
        function error (err){
          console.log(2222);
        }
      )
    }
  }
}
</script>

<style type="text/css">
  .n-detail{
    width: 100%;
    padding: 5%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  h1{
    text-align: center;
  }
  .msg{
    font-size: .75rem;
    margin: 1rem auto;
    text-align: center;
    color: #767676;
  }
  .msgContent{
    width: 100%;
    font-size: .875rem;
    color: #474747;
  }
  .msgContent p{
    text-indent: 1.5rem;
    line-height: 1.2rem;
  }
  .msgContent img{
    width: 100%;
    border-radius: .2rem;
    margin: .5rem 0;
  }
</style>
