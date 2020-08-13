<template>
    <div class="tabbar" v-if="$route.meta.showTabbar">
        <div class="tabbar-wrap">
            <router-link v-for="(item,index) in tabbarList" :key="index"
                         class="tabbar-item"
                         :to="item.path"
                         active-class="isActive">
                <i class="iconfont" :class="item.iconclass"></i>
                <span>{{item.name}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabbar",
        data() {
            return {
                tabbarList: [
                    {name: "发现", iconclass: 'icon-logo-dark1', path: "/find"},
                    {name: "视频", iconclass: 'icon-shipin1', path: "/video"},
                    {name: "我的", iconclass: 'icon-yinyue', path: "/mine"},
                    {name: "云村", iconclass: 'icon-yonghu', path: "/village"},
                    {name: "账号", iconclass: 'icon-yonghu1', path: "/user"}
                ]
            }

        },
        methods: {},
    }
</script>

<style scoped lang="less">
    .tabbar {
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0px;
        left: 0px;
        overflow: hidden;

        z-index: 9;


        .tabbar-wrap {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: .15rem 0;
            z-index: 0;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: hsla(0, 0%, 100%, .6);
                backdrop-filter: blur(10px);
                z-index: -1;
            }

            .tabbar-item {
                flex: 1;
                width: 100%;
                height: 100%;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;

                i {
                    display: block;
                    text-align: center;
                    width: 100%;
                    font-size: .36rem;
                    padding: .05rem 0;
                }

                span {
                    font-size: .24rem;
                }
                &.isActive {
                    color: #C20C0C;
                }
            }
        }
    }




    a {
        text-decoration: none;
        color: #333;
    }

    a, a:hover, a:active, a:visited, a:link, a:focus {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        outline: none;
        background: none;
        text-decoration: none;
    }
</style>
