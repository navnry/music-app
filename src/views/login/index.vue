<template>
    <div class="login-index">

        <div class="icon">
            <div class="wrap">
                <div class="icon_wrap">
                    <img src="../../assets/images/icon_163.png" alt="">
                </div>
                <div class="icon_text">
                    <p>网易云音乐</p>
                </div>
            </div>
        </div>
        <div class="btn">
            <div class="phone-login">
                <van-button type="default" round block text="立即登录" @click="toLogin"/>
            </div>
            <div class="experience"></div>
        </div>
        <div class="tips" :class="{'ani':ani}">
            <van-checkbox @change="changeChecked" icon-size=".2rem" checked-color="#cdcdcd" v-model="checked">同意
            </van-checkbox>
            <a href="javascript:;">《服务条款》</a>
            <a href="javascript:;">《隐私政策》</a>
            <a href="javascript:;">《儿童隐私政策》</a>
            <a href="javascript:;">《中国移动认证服务协议》</a>
        </div>

        <Login ref="loginshow"></Login>
    </div>

</template>

<script>
    import Login from './components/login'
    import {Toast} from 'vant'
    export default {
        name: "login",
        data() {
            return {
                checked: false,
                ani: false
            }
        },
        components: {
            Login,Toast
        },
        mounted() {

        },
        methods: {
            changeChecked(val) {
                // console.log(val);
            },
            toLogin() {
                if (!this.checked) {
                    this.ani = true
                    Toast("请先勾选同意 《服务条款》、《隐私政策》、《儿童隐私政策》、《中国移动认证服务协议》")
                    setTimeout(() => {
                        this.ani = false
                    }, 400)
                } else {
                    this.$refs.loginshow.show()
                }
            }
        }
    }
</script>

<style lang="less">


    .login-index {
        background-color: #d43c33;

        /*.wrap {*/
        /*    width: 100%;*/
        /*    height: 100%;*/
        /*}*/

        .icon {

            width: 100%;
            height: 70%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            .icon_wrap {
                width: 90px;
                height: 90px;
                background-color: #C20C0C;
                border-radius: 50%;
                padding: 10px;
                position: relative;
                margin: 0 auto 10px;


                img {
                    display: block;
                    width: 100%;
                }


            }

            .icon_text {
                p {
                    text-align: center;
                    font-size: 26px;
                    color: #e5e5e5;
                    /*font-weight: bold;*/
                }
            }

        }

        .btn {
            padding: 0 50px;
            margin: 15px 0;
        }

        .tips {
            padding: 0 45px;
            font-size: 11px;
            text-align: center;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            &.ani {
                animation: move .5s;
            }

            .van-checkbox__label {
                color: #e9e9e9;
                line-height: normal;
                margin-left: 5px;
            }

            a {
                color: #e9e9e9;
            }
        }
    }


    @keyframes move {
        0% {
            transform: translateX(-5px);
        }

        20% {
            transform: translateX(5px);
        }
        40% {
            transform: translateX(-5px);
        }
        60% {
            transform: translateX(5px);
        }
        80% {
            transform: translateX(-5px);
        }
        100% {
            transform: translateX(5px);
        }

    }
</style>
