<template>
  <div class="notice">
    <!-- 报错弹窗 -->
    <div class="errorMask" v-if="errShow"></div>
    <div class="errorWin" v-if="errShow">
      <img src="../assets/common/ErrLoading.gif">
      <p>{{errTxt}}</p>
    </div>
    <div class="banner">
      <img src="../assets/notice/banner.jpg"/>
    </div>
    <!-- 新闻列表 -->
    <ul class="n-list">
      <router-link tag="li" class="n-detail" :to="{name: 'n-detail',params: {id: item.Id}}" v-for="(item,index) in notice">
        <div>
          <img src="../assets/notice/noticeIcon.png">
          <span>{{item.Title}}</span>
        </div>
        <span>{{item.Createtime}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'notice',
    data () {
      return {
        notice: [],
        errShow: false,
        errTxt: ''
      }
    },
    activated (){
      this.getNoticeList();
    },
    methods: {
      getNoticeList (){
        var that = this;
        // 加载数据
        this.$tools.GetDataFromServer(
          this,
          process.env.API_HOST + 'Client/NoticeList',
          function success (res) {
            var resData = res.data;
            if (resData.State.Code == 1) {
              that.notice = resData.NoticeInfo.Itemlist;
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
  .notice{
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
  /*banner*/
  .banner{
    width: 100%;
  }
  .banner img {
    width: 100%;
  }
  /* 新闻内容 */
  .n-list {
    width: 100%;
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
  }
  .n-detail{
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 1rem 5%;
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
  .n-detail>div{
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -ms-align-items: flex-start;
    align-items: flex-start;
  }
  .n-detail>div img{
    width: 1.3rem;
    margin-right: .5rem;
  }
  .n-detail>div span{
    font-size: .875rem;
    color: #4C4C4C;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .n-detail>span{
    font-size: .75rem;
    color: #9B9B9B;
    margin-top: .5rem;
    -ms-align-self: flex-end;
    align-self: flex-end;
  }
  .n-detail:last-child{
    border-bottom: none;
  }
</style>
