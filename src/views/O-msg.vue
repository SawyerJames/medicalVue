<template>
  <div class="o-msg">
    <!-- 报错弹窗 -->
    <div class="errorMask" v-if="errShow"></div>
    <div class="errorWin" v-if="errShow">
      <img src="../assets/common/ErrLoading.gif">
      <p>{{errTxt}}</p>
    </div>
    <ul>
      <!-- msgFlag(唯一)：大图展示标志，true时展示其div，false时其他循环体过滤掉已经展示的大图广告 -->
      <!-- 路由统一为o-detail，通过传递专属id到下级页面进行判断加载数据 -->
      <router-link tag="li" :to="{name:'o-detail',params: {id: item.Id}}"  v-for="(item,index) in msgTop" class="msgFlagTrue">
        <!-- 图片来源于后台数据 -->
        <img :src="item.Image">
        <span>{{item.Title}}</span>
      </router-link>
      <!-- 普通循环：广告消息 -->
      <router-link tag="li" :to="{name:'o-detail',params: {id: item.Id}}" v-if="!item.msgFlag"  class="msgModel" v-for="(item,index) in msg">
        <!-- 循环体：标题及图片 -->
        <div>
          <span>{{item.Title}}</span>
          <img v-if="item.Image" :src="item.Image">
        </div>
        <!-- 日期 -->
        <span>{{item.Createtime}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'o-msg',
    data () {
      return {
        msg: [],
        msgTop: [],
        errShow: false,
        errTxt: ''
      }
    },
    activated (){
        // 调用方法获取列表
        this.getOmsgList();
    },
    methods: {
      getOmsgList: function (){
        var that = this;
        // 加载数据
        this.$tools.GetDataFromServer(
          this,
          process.env.API_HOST + 'Client/SocsecurityList',
          function success (res) {
            var resData = res.data;
            if (resData.State.Code === 1) {
              that.msgTop = resData.Top;
              that.msg = resData.SocsecurityInfo.Itemlist;
              that.msg.forEach(function(item){
                item.Image = 'http://hx.jltengfang.com' + item.Image;
              });
              that.msgTop.forEach(function(item){
                item.Image = 'http://hx.jltengfang.com' + item.Image;
              });
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
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.o-msg{
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
}
/*大图广告*/
.msgFlagTrue{
  width: 100%;
  height: 12rem;
}
.msgFlagTrue img{
  width: 100%;
  height: 10rem;
}
.msgFlagTrue span{
  display: block;
  height: 2rem;
  line-height: 2rem;
  width: 90%;
  padding: 0 5%;
  background: #CBE7F2;
  margin: -4px auto 0;
  text-align: center;
  color: #31679C;
  font-size: .875rem;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/*列表模板样式*/
.msgModel{
  width: 100%;
  height: auto;
  padding: 5%;
  font-size: .75rem;
  border-bottom: 1px solid #ddd;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
  justify-content: space-between;
}
.msgModel>div img{
  width: 6rem !important;
  height: 3rem !important;
  border-radius: .2rem;
}
.msgModel>div{
  margin-bottom: 1rem;
  display: box;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-align-items: flex-start;
  align-items: flex-start;
  justify-content: space-between;
}
.msgModel>div span{
  font-size: .875rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.msgModel>span{
  line-height: 0rem;
  -ms-align-self: flex-end;
  align-self: flex-end;
  color: #9B9B9B;
}
</style>
