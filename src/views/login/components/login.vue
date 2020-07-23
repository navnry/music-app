<template>
    <transition name="van-slide-right">
        <div class="login" v-show="loginShow">
            <div class="top van-hairline--bottom">
                <div class="wrap">
                    <div class="bakc"><i @click="back" class="iconfont icon-fanhui2"></i></div>
                    <div class="title"><p>手机号登录</p></div>
                </div>
            </div>
            <div class="login-form">
                <div class="wrap">
                    <div class="tip"><p>未注册手机号登录后将自动创建账号</p></div>
                    <van-field @input="inputing" v-model="phone" type="tel" label="手机号码" placeholder="请输入手机号码"/>
                    <van-button :disabled="btndisabled" round class="btn" block color="#d43c33" @click="toLogin">下一步
                    </van-button>
                </div>
            </div>
            <Password
                    :phoneNumber="phone"
                    :phoneIsRegister="phoneIsRegister"
                    ref="passwordShow"
            />
        </div>
    </transition>
</template>

<script>
    import {debounce, throttle} from "@/utils/config"
    import Password from './password'
    import {Notify} from 'vant'
    import api from "@/api"

    export default {
        name: "login",
        data() {
            return {
                loginShow: false,
                btndisabled: true,
                phone: '',
                phoneIsRegister: false
            }
        },
        components: {
            Notify, Password
        },
        created() {

        },
        methods: {
            inputing() {
                this.$watch('phone', debounce((newVal) => {
                    let reg = /^1[0-9]{10}$/
                    if (newVal == '' || newVal.length <= 10 || !reg.test(newVal)) {
                        Notify({type: 'danger', message: '请输入正确的手机号！'});
                        this.btndisabled = true
                        return false
                    } else {
                        Notify({type: 'success', message: '手机号码输入正确！'});
                        this.btndisabled = false
                        this.phone = newVal
                    }
                }, 1000))
            },

            toLogin() {
                api.phoneRegisteredFn(this.phone).then(res => {
                    if (res.status == "200") {
                        if (res.data.exist == "1") {
                            // console.log("手机号已注册");
                            this.phoneIsRegister = true
                            this.$refs.passwordShow.show()
                        } else {
                            // console.log("手机号未注册");
                            this.phoneIsRegister = false
                            this.$refs.passwordShow.show()
                        }
                    }
                })
            },
            show() {
                this.loginShow = true
            },
            back() {
                this.loginShow = false
            },
        }
    }
</script>

<style scoped lang="less">
    .login {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        top: 0;

        .top {
            height: 50px;

            .wrap {
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0 12px;

                .title {
                    flex: 1;
                    text-align: center;
                    margin-right: 20px;
                }
            }
        }

        .login-form {
            margin-top: 30px;

            .wrap {
                padding: 0 12px;

                .tip {
                    font-size: 12px;
                    color: #888888;
                    padding: 10px 0;
                }

                .btn {
                    margin-top: 10px;
                }
            }
        }

    }
</style>
