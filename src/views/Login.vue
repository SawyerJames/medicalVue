<template>
  <div class="">
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        data_userinfo: {
          string_account: '',
          string_password: ''
        }
      }
    },
    mounted: function () {
      this.loaded()
    },
    methods: {
      loaded: function () {
      },
      Login: function () {
        let self = this
        this.$tools.PostDataToServer(
          this,
          this.$server_root + '/User/Login',
          {
            Account: this.data_userinfo.string_account,
            Password: this.data_userinfo.string_password
          },
          function success (response) {
            if (response.data.State.Code === 1) {
              self.$tools.SetCookie('UserId', response.data.UserInfo.Id)
              self.$tools.SetCookie('UserToken', response.data.UserInfo.Token)
              self.$tools.CheckToken(self)
            } else {
              self.$message.error(response.data.State.Message)
            }
          },
          function error (error) {
            console.log(error)
          }
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
