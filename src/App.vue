<template>
    <div id="app">
        <Topbar>
            <div class="circle" @click.stop="open" v-if="$route.name=='find'" slot="right">
                <van-circle size=".64rem" color="#C20C0C"  :value="this.$store.state.playProgress">
                    <img :class="{'pause': !playing}" :src="this.$store.state.currentThumb">
                </van-circle>
            </div>
            <div class="circle" v-if="$route.name=='video'" slot="right">
<!--                <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />-->
                <van-circle size=".64rem" color="#C20C0C"  :value="this.$store.state.playProgress">
                    <img :class="{'pause': !playing}" :src="this.$store.state.currentThumb">
                </van-circle>
            </div>
        </Topbar>
<!--        <keep-alive includ="find">-->
            <router-view class="view-container"
                         :class="{'notopbar':!$route.meta.showTopbar,'notabbar':!$route.meta.showTabbar}"/>
<!--        </keep-alive>-->
        <player/>
        <Tabbar/>
    </div>
</template>
<script>
    import Topbar from '@/components/topbar'
    import Tabbar from '@/components/tabbar'
    import player from '@/components/player'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                radio: 1
            }
        },
        components: {
            Tabbar, player, Topbar
        },
        computed: {
            ...mapGetters([
                'playing',
            ])
        },
        methods: {
            open() {
                this.setFullScreen(true)
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            }),
        }
    }
</script>
<style lang="less">
    /*@import "//at.alicdn.com/t/font_1934153_swfdpazxop.css";*/
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    .aaa {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .view-container {
        width: 100%;
        height: 100%;
        padding-bottom: 1.2rem;
        padding-top: 1.1rem;

        &.notopbar {
            padding-top: 0;
        }

        &.notabbar {
            padding-bottom: 0;
        }
    }

    .circle {
        margin-right: 12px;
        width: 32px;
        height: 32px;

        .van-circle {
            padding: 3px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                animation: rotate 10s linear infinite;

                &.pause {
                    animation-play-state: paused;
                }
            }
        }
    }
</style>
