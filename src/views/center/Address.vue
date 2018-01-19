<template>
    <div class="address flexCol">
        <!-- 错误提示，预加载，头像组件 -->
        <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
        <loading v-if="loading"></loading>
        <smallUser></smallUser>
        <!-- 验证提示 -->
        <h1 class="validate" v-if="validate">{{validate}}</h1>
        <div class="add-item flexRow borderBox">
            <span>省：</span>
            <select name="province" class="info" v-model="province" @change='changePro(province)'>
                <option v-for="(item,index) in addProList" v-bind:value="item.Id">{{item.Name}}</option>
            </select>
        </div>
        <div class="add-item flexRow borderBox">
            <span>市：</span>
            <select name="city" class="info" v-model="city" @change='changeCity(city)'>
                <option v-for="(item,index) in addCityList" v-bind:value="item.Id">{{item.Name}}</option>
            </select>
        </div>
        <div class="add-item flexRow borderBox">
            <span>区：</span>
            <select name="area" class="info" v-model="area" @change='changeArea()'>
                <option v-for="(item,index) in addAreaList" v-bind:value="item.Id">{{item.Name}}</option>
            </select>
        </div>
        <div class="add-item flexRow borderBox add-area">
            <textarea class="textarea borderBox" v-model="details" placeholder="请填写您的详细地址"></textarea>
        </div>
        <button class="btn" @click="postAdd">完成</button>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'address',
    data() {
        return {
            loading: true,
            resData: '',
            // 地址三级联动信息
            addProList: {},
            addCityList: {},
            addAreaList: {},
            // 地址信息
            province: '',
            city: '',
            area: '',
            details: '',
            // 准备抛出的地址信息
            address: {
                province: '',
                city: '',
                area: '',
                address: '',
            },
            // 表单验证
            validate: '',
            // 地址验证
            addressSuccess: {
                proSu: false,
                citySu: false,
                countySu: false,
                detailsSu: false
            },
            // 报错弹窗
            errShow: false,
            errTxt: '',
            parentid: 100000,
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.getProList();
            this.activateGetAddress();
        });
    },
    // 每次退出组件初始化组件
    activated() {
        document.title = "添加地址";
        this.loading = true;
        // 认证制空
        this.addressSuccess.proSu = false;
        this.addressSuccess.citySu = false;
        this.addressSuccess.countySu = false;
        this.addressSuccess.detailsSu = false;
        // 访问二次加载接口
        this.activateGetAddress();
    },
    methods: {
        // 二次加载地址信息
        activateGetAddress() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.doubleGetAdd,
                function success(res) {
                    that.loading = false;
                    var resData = res.data.Info;
                    that.province = resData.Province;
                    that.city = resData.City;
                    that.area = resData.Area;
                    that.details = resData.Address;
                },
                function error(err) {
                    that.loading = false;
                    that.errShow = true;
                    that.errTxt = '出现错误，请重新加载'
                    var errLoading = setTimeout(function() {
                        that.errShow = false;
                        that.errTxt = ''
                        clearTimeout(errLoading);
                    }, 2000)
                }
            )
        },
        // 触发省->市联动：清空其他信息
        changePro(id) {
            this.parentid = id;
            this.addAreaList = {};
            this.details = '';
            this.getCityList();
        },
        // 触发市->区联动：清空其他信息
        changeCity(id) {
            this.parentid = id;
            this.details = '';
            this.getAreaList();
        },
        changeArea() {
            this.details = '';
        },
        // 三级联动获取：省
        getProList() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.getAdd + this.parentid,
                function success(res) {
                    that.loading = false;
                    var resData = res.data;
                    that.addProList = resData.AreaInfo.Itemlist;
                },
                function error(err) {
                    that.loading = false;
                    that.errShow = true;
                    that.errTxt = '出现错误，请重新加载'
                    var errLoading = setTimeout(function() {
                        that.errShow = false;
                        that.errTxt = ''
                        clearTimeout(errLoading);
                    }, 2000)
                }
            )
        },
        // 三级联动获取：市
        getCityList() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.getAdd + this.parentid,
                function success(res) {
                    var resData = res.data;
                    that.addCityList = resData.AreaInfo.Itemlist;
                },
                function error(err) {
                    that.errShow = true;
                    that.errTxt = '出现错误，请重新加载'
                    var errLoading = setTimeout(function() {
                        that.errShow = false;
                        that.errTxt = ''
                        clearTimeout(errLoading);
                    }, 2000)
                }
            )
        },
        // 三级联动获取：区
        getAreaList() {
            var that = this;
            // 加载数据
            this.$tools.GetDataFromServer(
                this,
                this.API.getAdd + this.parentid,
                function success(res) {
                    var resData = res.data;
                    that.addAreaList = resData.AreaInfo.Itemlist;
                },
                function error(err) {
                    that.errShow = true;
                    that.errTxt = '出现错误，请重新加载'
                    var errLoading = setTimeout(function() {
                        that.errShow = false;
                        that.errTxt = ''
                        clearTimeout(errLoading);
                    }, 2000)
                }
            )
        },
        // 检测三级联动
        checkPro() {
            if (this.province == '') {
                this.validate = '请选择正确省份'
            } else {
                this.address.province = this.province;
                this.addressSuccess.proSu = true;
            }
        },
        checkCity() {
            if (this.city == '') {
                this.validate = '请选择正确市区'
            } else {
                this.address.city = this.city;
                this.addressSuccess.citySu = true;
            }
        },
        checkCounty() {
            if (this.area == '') {
                this.validate = '请选择正确县区'
            } else {
                this.address.area = this.area;
                this.addressSuccess.countySu = true;
            }
        },
        checkDetails() {
            if (this.details == '') {
                this.validate = '请填写详细地址'
            } else {
                this.address.address = this.details;
                this.addressSuccess.detailsSu = true;
            }
        },
        // 验证&数据传输
        postAdd() {
            this.checkPro();
            // 校验
            if (this.addressSuccess.proSu) {
                this.checkCity()
                if (this.addressSuccess.citySu) {
                    this.checkCounty()
                    if (this.addressSuccess.countySu) {
                        this.checkDetails()
                        if (this.addressSuccess.detailsSu) {
                            this.validate = '';
                            var that = this;
                            this.loading = true;
                            // 传输数据
                            this.$tools.PostDataToServer(
                                this,
                                this.API.postAdd,
                                this.address,
                                function success(res) {
                                    that.loading = false;
                                    var resData = res.data;
                                    // 如果成功，跳转至手机验证页面
                                    if (resData.State.Code == 1) {
                                        that.$router.replace('/user');
                                    }
                                },
                                // 如果失败，清空表单
                                function error(err) {
                                    that.loading = false;
                                    that.errShow = true;
                                    that.errTxt = '出现错误，请重新加载'
                                    var errLoading = setTimeout(function() {
                                        that.errShow = false;
                                        that.errTxt = ''
                                        clearTimeout(errLoading);
                                    }, 2000)
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
</script>
<style type="text/css" scoped>
.address {
    -ms-align-items: center;
    align-items: center;
}


/*地址模块*/

.add-item {
    width: 100%;
    height: 3rem;
    padding: 0 5%;
    border-bottom: 1px solid #eee;
    font-size: .875rem;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
}

.add-item span {
    width: 4rem;
}

.add-item select {
    height: 2rem;
    border-radius: .2rem;
    border: 1px solid #ddd;
    outline: none;
    color: #606060;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    flex: 1;
}


/*详细地址*/

.add-area .textarea {
    width: 100%;
    height: 4rem;
    font-size: .875rem;
    margin: .5rem auto;
    border: 1px solid #ddd;
    outline: none;
    border-radius: .2rem;
    padding: 1% 2%;
}

.add-area {
    height: auto;
    border-bottom: none;
}

.btn {
    width: 65%;
}
</style>
