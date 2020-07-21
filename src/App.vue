<template>
    <div id="app">
        <Topbar/>
        <router-view class="view-container"/>
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
            Tabbar, player,Topbar
        },
    }
</script>
<style lang="less">
    @import "//at.alicdn.com/t/font_1934153_zxld48ngt5.css";

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
        padding-top: 1.4rem;
    }

</style>
