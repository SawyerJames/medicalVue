<template>
    <div class="center">
        <!-- 微信查询tab 两个选项卡 -->
        <div v-if="tabSearch">
            <div class="searchTab flexRow">
                <router-link tag="div" to="/search-my" class="searchTab-li borderBox flexCol">
                    <img :src="searchTabList.imgUrl_my">
                    <span>{{searchTabList.msg_my}}</span>
                </router-link>
                <router-link tag="div" to="/search-other" class="searchTab-li borderBox flexCol">
                    <img :src="searchTabList.imgUrl_user">
                    <span>{{searchTabList.msg_user}}</span>
                </router-link>
            </div>
            <!-- 其他信息 -->
            <otherMsg></otherMsg>
        </div>
    </div>
</template>
<script>
import user from "@/components/user.vue"
import otherMsg from "@/components/otherMsg.vue"
export default {
    name: 'search',
    data() {
        return {
            searchTabList: {
                imgUrl_user: require('@/assets/search/search-other.png'),
                imgUrl_my: require('@/assets/search/search-my.png'),
                msg_user: "用户缴费信息查询",
                msg_my: "个人综合信息查询"
            },
            tabSearch: true,
            userType: ''
        }
    },
    activated() {
        document.title = "智慧医保信息查询";
    },
    components: {
        user,
        otherMsg
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchTab {
    width: 100%;
    height: auto;
    padding: 1rem 0;
    border-bottom: .7rem solid #EDF2F5;
    justify-content: space-around;
    -ms-align-items: center;
    align-items: center;
}

.searchTab-li {
    width: 50%;
    height: 100%;
    background: #fff;
    color: #9D9D9D;
    border-right: 1px solid #E5E5E5;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}

.searchTab-li:last-child {
    border: none;
}

.searchTab-li img {
    width: 2.5rem;
    margin-bottom: .5rem;
}

.searchTab-li span {
    font-size: .875rem;
}
</style>
