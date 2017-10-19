<template>
  <div class="o-detail">
    <h1>{{this.detail.Title}}</h1>
    <p class="msg">{{this.detail.city}}{{this.detail.Createtime}}</p>
    <img class="titleImg" :src="this.detail.Image">
    <div class="msgContent" v-html="this.detail.Content"></div>
  </div>
</template>

<script type="text/javascript">
export default{
  name: 'o-detail',
  created(){
    document.body.style.background = "#FFF";
  },
  data (){
    return {
      detail: [],
    }
  },
  mounted () {
    this.$nextTick (function () {
      var Id = this.$route.params.id;
      this.getOmsgDetail(Id);
    })
  },
  methods: {
    getOmsgDetail: function (Id){
      var that = this;
      // 加载数据
      this.$tools.GetDataFromServer(
        this,
        'http://123.206.9.224/wap/Socsecurity/SocsecurityInfo/id/'+Id,
        function success (res) {
          var resData = res.data;
          if (resData.State.Code === 1) {
            that.detail = resData.SocsecurityInfo;
            that.detail.Image = 'http://123.206.9.224' + that.detail.Image;
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
  .o-detail{
    width: 100%;
    padding: 5%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  h1{
    text-align: center;
  }
  .titleImg{
    width: 100%;
    border-radius: .2rem;
    margin-bottom: 1rem;
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
  .msgContent img {
    width: 100%;
    margin: .5rem 0;
  }
</style>
