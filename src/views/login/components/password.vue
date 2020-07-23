<template>
    <transition name="van-slide-right">
        <div class="password" v-show="passwordShow">
            <div class="top van-hairline--bottom">
                <div class="wrap">
                    <div class="bakc"><i @click="back" class="iconfont icon-fanhui2"></i></div>
                    <div class="title"><p>手机号登录</p></div>
                </div>
            </div>
            <div>
                手机号码是{{phoneNumber}}
                <div v-show="phoneIsRegister">
                    <van-field v-model="passwords" type="password" label="密码"/>
                    <van-button round class="btn" block text="立即登录" color="#d43c33" @click="loginups"/>
                </div>
                <div v-show="!phoneIsRegister">
                    <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                    >
                        <template #button>
                            <van-button size="small" type="primary">发送验证码</van-button>

                        </template>
                    </van-field>
                    <van-button round class="btn" block text="立即登录" color="#d43c33"/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import api from "@/api"

    export default {
        name: "password",
        data() {
            return {
                passwordShow: false,
                sms: '',
                passwords: ''
            }
        },
        props: {
            phoneIsRegister: Boolean,
            phoneNumber: 0
        },
        methods: {
            show() {
                this.passwordShow = true
            },
            back() {
                this.passwordShow = false
            },
            loginups() {
                this._isSure(this.phoneNumber, this.passwords)
            },

            /**
             * 登录成功
             */
            success () {
                // loading 样式隐藏
                // this.LoadingEnd()
                // 存取登陆状态
                this._getLoginState()
            },

            _isSure(phone, pwd) {
                api.phoneLoginFn(phone, pwd)
                    .then(res => {
                        // console.log(res)
                        if (res.data.code === 200) {
                            this.success()
                        } else {

                        }
                    })
            },
            _getLoginState() {
                api.loginStatusFn()
                    .then(res => {
                        // 存取用户 id
                        let userId = res.data.profile.userId
                        if (res.data.code === 200) {
                            // 存取用户信息
                            let accountInfo = res.data.profile
                            // 成功登陆
                            // 修改状态为 1
                            this.$store.commit('LOGIN_STATE', 1)
                            // Vuex在用户刷新的时候loginState会回到默认值false
                            // 所以我们需要用到HTML5储存
                            // 我们设置一个名为loginState
                            localStorage.setItem('loginState', 1)
                            // 存入用户头像 昵称
                            localStorage.setItem('avatarUrl', accountInfo.avatarUrl)
                            localStorage.setItem('nickname', accountInfo.nickname)
                            // 存取用户 uid信息
                            this.$store.commit('ACCOUNT_UID', userId)
                            localStorage.setItem('accountUid', userId)
                            this._getUserDetail(userId)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            /**
             * 获取用户详情
             * 等级数据
             * 到获取完成之后跳转到发现页面
             * 刷新页面
             */
            _getUserDetail(uid) {
                api.userDetailFn(uid)
                    .then(res => {
                        const {data} = res
                        if (data.code === 200) {
                            this.$store.commit('SET_LEVEL', data.level)
                            localStorage.setItem('level', data.level)
                            // 跳转到发现页面
                            this.$router.push({path: '/find'})
                            console.log('跳转了')
                            // location.reload()
                        }
                    })
            },


        }
    }
</script>

<style scoped lang="less">
    .password {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #ffffff;

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
    }
</style>
