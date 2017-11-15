<template>
  <div class="o-detail">
    <h1>{{detail.Title}}</h1>
    <p class="msg">{{detail.city}}{{detail.Createtime}}</p>
    <img class="titleImg" :src="detail.Image" v-if="detail.Image">
    <div class="msgContent" v-html="detail.Content"></div>
  </div>
</template>

<script type="text/javascript">
export default{
  name: 'o-detail',
  data (){
    return {
      detail: [],
    }
  },
  activated (){
    // 接收o-msg路由传递的参数id
    var Id = this.$route.params.id;
    // 调用方法+id，循环列表
    this.getOmsgDetail(Id);
  },
  deactivated (){
    this.detail = [];
  },
  methods: {
    getOmsgDetail: function (Id){
      var that = this;
      // 加载数据
      this.$tools.GetDataFromServer(
        this,
        process.env.API_HOST + 'Client/SocsecurityInfo/id/'+Id,
        function success (res) {
          var resData = res.data;
          if (resData.State.Code === 1) {
            that.detail = resData.SocsecurityInfo;
            that.detail.Image = 'http://hx.jltengfang.com' + that.detail.Image;
          }
        },
        function error (err){
          return
        }
      )
    }
  }
}
</script>

<style type="text/css" scoped>
  .o-detail{
    width: 100%;
    padding: 5%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .o-detail h1{
    text-align: left;
    border-bottom: .2rem dashed #ddd;
    padding-bottom: 1rem;
    font-size: 1rem;
  }
  .msgContent{
    width: 100%;
    font-size: .875rem;
    color: #474747;
  }
  .msgContent p{
    text-indent: 1.5rem;
    line-height: 1.2rem;
    /*英文断行*/
    word-wrap:break-word;
    word-break:break-all;
  }
  .o-detail .titleImg{
    width: 100%;
    border-radius: .2rem;
    margin-bottom: 1rem;
  }
</style>
