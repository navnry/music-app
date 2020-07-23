<template>
    <div id="app">
        <Topbar/>
        <keep-alive includ="find">
            <router-view class="view-container"
                         :class="{'notopbar':!$route.meta.showTopbar,'notabbar':!$route.meta.showTabbar}"/>
        </keep-alive>
        <player/>
        <Tabbar/>
    </div>
</template>
<script>
    import Topbar from '@/components/topbar'
    import Tabbar from '@/components/tabbar'
    import player from '@/components/player'

    export default {
        data() {
            return {
                radio: 1
            }
        },
        components: {
            Tabbar, player, Topbar
        },
    }
</script>
<style lang="less">
    @import "//at.alicdn.com/t/font_1934153_swfdpazxop.css";

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
        overflow-y: auto;
        overflow-x: hidden;
        padding-bottom: 1.4rem;
        padding-top: 1.1rem;

        &.notopbar {
            padding-top: 0;
        }

        &.notabbar {
            padding-bottom: 0;
        }
    }

</style>
